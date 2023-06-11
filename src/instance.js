function getInstanceJs() {
  return class extends C3.SDKInstanceBase {
    constructor(inst, properties) {
      super(inst);

      this.defaultAxisDeadzone = 0.2;
      this.defaultJoystickDeadzone = 0.2;
      this.defaultControlScheme = "";
      this.autoSwitchControlScheme = true;

      if (properties) {
        this.defaultAxisDeadzone = properties[0];
        this.defaultJoystickDeadzone = properties[1];
        this.defaultControlScheme = properties[2];
        this.autoSwitchControlScheme = properties[3];
      }

      this.digitalInputData = new Map();
      this.axisInputData = new Map();
      this.joystickInputData = new Map();
      this.playerData = new Map();
      this.wireData = new Map();

      this.lastDigitalInput = "";
      this.lastPlayer = null;
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    LoadFromJson(o) {
      // load state for savegames
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }

    // ======= UTILS =======

    Clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    ForEveryPlayer(callback) {
      for (const [key, value] of this.playerData) {
        callback(key, value);
      }
    }

    // ======= PLAYERS =======

    AssertPlayerExists(player) {
      if (!this.playerData.has(player)) {
        this.playerData.set(player, {
          controlSchemes: new Map(),
          autoSwitchControlScheme: this.autoSwitchControlScheme,
        });
      }
    }

    SetAutoSwitchControlScheme(player, autoSwitch) {
      this.AssertPlayerExists(player);
      this.playerData.get(player).autoSwitchControlScheme = autoSwitch;
    }

    GetAutoSwitchControlScheme(player) {
      this.AssertPlayerExists(player);
      return this.playerData.get(player).autoSwitchControlScheme;
    }

    GetPlayerActiveControlScheme(player) {
      this.AssertPlayerExists(player);
      for (const [key, value] of this.playerData.get(player).controlSchemes) {
        if (this.GetControlSchemeEnabled(player, key)) {
          return key;
        }
      }
      return this.defaultControlScheme;
    }

    SchemeOrPlayerActiveControlScheme(controlScheme, player) {
      return typeof controlScheme === "string"
        ? controlScheme
        : this.GetPlayerActiveControlScheme(player);
    }

    // ======= DIGITAL INPUTS =======

    AssertDigitalInputExists(inputName) {
      if (!this.digitalInputData.has(inputName)) {
        this.digitalInputData.set(inputName, {
          statePerPlayer: new Map(),
        });
      }
    }

    AssertDigitalInputHasPlayer(inputName, player) {
      this.AssertDigitalInputExists(inputName);
      this.AssertPlayerExists(player);
      if (!this.digitalInputData.get(inputName).statePerPlayer.has(player)) {
        this.digitalInputData
          .get(inputName)
          .statePerPlayer.set(player, new Map());
      }
    }

    AssertDigitalInputPlayerHasControlScheme(inputName, player, controlScheme) {
      this.AssertDigitalInputHasPlayer(inputName, player);
      if (
        !this.digitalInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .has(controlScheme)
      ) {
        this.digitalInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .set(controlScheme, false);
      }
    }

    GetDigitalInputState(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertDigitalInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      return this.digitalInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme);
    }

    IsAnyDigitalInputDown(player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertPlayerExists(player);
      for (const [key, value] of this.digitalInputData) {
        if (this.GetDigitalInputState(key, player, controlScheme)) {
          return true;
        }
      }
      return false;
    }

    SetDigitalInputState(
      inputName,
      player,
      controlScheme,
      state,
      preventAutoSwitch = false
    ) {
      this.AssertDigitalInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      this.digitalInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, state);

      if (this.GetAutoSwitchControlScheme(player) && !preventAutoSwitch) {
        if (state) {
          this.SwithToControlScheme(player, controlScheme);
        }
      }
    }

    // ======= AXIS INPUTS =======

    AssertAxisInputExists(inputName) {
      if (!this.axisInputData.has(inputName)) {
        this.axisInputData.set(inputName, {
          statePerPlayer: new Map(),
          usesDefaultDeadzone: true,
          deadzone: this.defaultAxisDeadzone,
        });
      }
    }

    AssertAxisInputHasPlayer(inputName, player) {
      this.AssertAxisInputExists(inputName);
      if (!this.axisInputData.get(inputName).statePerPlayer.has(player)) {
        this.axisInputData.get(inputName).statePerPlayer.set(player, new Map());
      }
    }

    AssertAxisInputPlayerHasControlScheme(inputName, player, controlScheme) {
      this.AssertAxisInputHasPlayer(inputName, player);
      if (
        !this.axisInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .has(controlScheme)
      ) {
        this.axisInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .set(controlScheme, 0);
      }
    }

    GetAxisInputState(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      return this.axisInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme);
    }

    SetAxisInputState(
      inputName,
      player,
      controlScheme,
      state,
      preventAutoSwitch = false
    ) {
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      this.axisInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, state);

      if (this.GetAutoSwitchControlScheme(player) && !preventAutoSwitch) {
        let deadzone = this.GetAxisInputDeadzone(inputName);
        if (Math.abs(state) > deadzone) {
          this.SwithToControlScheme(player, controlScheme);
        }
      }
    }

    SetAxisInputDeadzone(inputName, deadzone) {
      this.AssertAxisInputExists(inputName);
      let usesDefaultDeadzone = false;
      if (
        deadzone === null ||
        deadzone === undefined ||
        deadzone < 0 ||
        deadzone > 1
      ) {
        deadzone = this.defaultAxisDeadzone;
        usesDefaultDeadzone = true;
      }
      this.axisInputData.get(inputName).usesDefaultDeadzone =
        usesDefaultDeadzone;
      this.axisInputData.get(inputName).deadzone = deadzone;
    }

    GetAxisInputDeadzone(inputName) {
      this.AssertAxisInputExists(inputName);
      return this.axisInputData.get(inputName).deadzone;
    }

    GetAxisInputUsesDefaultDeadzone(inputName) {
      this.AssertAxisInputExists(inputName);
      return this.axisInputData.get(inputName).usesDefaultDeadzone;
    }

    IsAxisOutsideDeadzone(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      let deadzone = this.GetAxisInputDeadzone(inputName);
      let state = this.GetAxisInputState(inputName, player, controlScheme);
      return Math.abs(state) > deadzone;
    }

    IsAnyAxisOutsideDeadzone(player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertPlayerExists(player);
      for (const [key, value] of this.axisInputData) {
        if (this.IsAxisOutsideDeadzone(key, player, controlScheme)) {
          return true;
        }
      }
      return false;
    }

    // ======= JOYSTICK INPUTS =======

    AssertJoystickInputExists(inputName) {
      if (!this.joystickInputData.has(inputName)) {
        this.joystickInputData.set(inputName, {
          statePerPlayer: new Map(),
          usesDefaultDeadzone: true,
          deadzone: this.defaultJoystickDeadzone,
        });
      }
    }

    AssertJoystickInputHasPlayer(inputName, player) {
      this.AssertJoystickInputExists(inputName);
      if (!this.joystickInputData.get(inputName).statePerPlayer.has(player)) {
        this.joystickInputData
          .get(inputName)
          .statePerPlayer.set(player, new Map());
      }
    }

    AssertJoystickInputPlayerHasControlScheme(
      inputName,
      player,
      controlScheme
    ) {
      this.AssertJoystickInputHasPlayer(inputName, player);
      if (
        !this.joystickInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .has(controlScheme)
      ) {
        this.joystickInputData
          .get(inputName)
          .statePerPlayer.get(player)
          .set(controlScheme, {
            x: 0,
            y: 0,
          });
      }
    }

    GetJoystickInputState(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      return this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme);
    }

    SetJoystickInputState(
      inputName,
      player,
      controlScheme,
      x,
      y,
      preventAutoSwitch = false
    ) {
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, {
          x,
          y,
        });

      if (this.GetAutoSwitchControlScheme(player) && !preventAutoSwitch) {
        let deadzone = this.GetJoystickInputDeadzone(inputName);
        if (Math.sqrt(x * x + y * y) > deadzone) {
          this.SwithToControlScheme(player, controlScheme);
        }
      }
    }

    SetJoystickInputStateX(inputName, player, controlScheme, x) {
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      let y = this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme).y;
      this.SetJoystickInputState(inputName, player, controlScheme, x, y);
    }

    SetJoystickInputStateY(inputName, player, controlScheme, y) {
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      let x = this.joystickInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .get(controlScheme).x;
      this.SetJoystickInputState(inputName, player, controlScheme, x, y);
    }

    SetJoystickInputDeadzone(inputName, deadzone) {
      this.AssertJoystickInputExists(inputName);
      let usesDefaultDeadzone = false;
      if (
        deadzone === null ||
        deadzone === undefined ||
        deadzone < 0 ||
        deadzone > 1
      ) {
        deadzone = this.defaultJoystickDeadzone;
        usesDefaultDeadzone = true;
      }
      this.joystickInputData.get(inputName).usesDefaultDeadzone =
        usesDefaultDeadzone;
      this.joystickInputData.get(inputName).deadzone = deadzone;
    }

    GetJoystickInputDeadzone(inputName) {
      this.AssertJoystickInputExists(inputName);
      return this.joystickInputData.get(inputName).deadzone;
    }

    GetJoystickInputUsesDefaultDeadzone(inputName) {
      this.AssertJoystickInputExists(inputName);
      return this.joystickInputData.get(inputName).usesDefaultDeadzone;
    }

    IsJoystickOutsideDeadzone(inputName, player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      this.AssertJoystickInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      let deadzone = this.GetJoystickInputDeadzone(inputName);
      let state = this.GetJoystickInputState(inputName, player, controlScheme);
      return Math.sqrt(state.x * state.x + state.y * state.y) > deadzone;
    }

    IsAnyJoystickOutsideDeadzone(player, controlScheme) {
      controlScheme = this.SchemeOrPlayerActiveControlScheme(
        controlScheme,
        player
      );
      for (let inputName of this.joystickInputData.keys()) {
        if (this.IsJoystickOutsideDeadzone(inputName, player, controlScheme)) {
          return true;
        }
      }
      return false;
    }

    // ======= CONTROL SCHEMES =======

    AssertControlSchemeExists(player, controlScheme) {
      this.AssertPlayerExists(player);
      let playerData = this.playerData.get(player);
      if (!playerData.controlSchemes.has(controlScheme)) {
        playerData.controlSchemes.set(controlScheme, {
          enabled: controlScheme === this.defaultControlScheme,
        });
      }
    }

    GetControlSchemeEnabled(player, controlScheme) {
      this.AssertControlSchemeExists(player, controlScheme);
      let playerData = this.playerData.get(player);
      return playerData.controlSchemes.get(controlScheme).enabled;
    }

    SetControlSchemeEnabled(player, controlScheme, enabled) {
      this.AssertControlSchemeExists(player, controlScheme);
      let playerData = this.playerData.get(player);
      playerData.controlSchemes.get(controlScheme).enabled = enabled;
    }

    SwithToControlScheme(player, controlScheme) {
      this.SetControlSchemeEnabled(player, controlScheme, true);
      let playerData = this.playerData.get(player);
      // Disable all other control schemes that are auto managed
      for (const [key, value] of playerData.controlSchemes) {
        if (key !== controlScheme) {
          this.SetControlSchemeEnabled(player, key, false);
        }
      }
    }

    // ======= ACES =======
    _DoSetDownInput(name, player, scheme, preventAutoSwitch) {
      this.curValue = this.GetDigitalInputState(name, player, scheme);
      if (!this.curValue) {
        this.SetDigitalInputState(
          name,
          player,
          scheme,
          true,
          preventAutoSwitch
        );
        if (this.GetControlSchemeEnabled(player, scheme)) {
          this.lastDigitalInput = name;
          this.lastPlayer = player;
          this.Trigger(self.C3.Plugins.skymen_better_input_manager.Cnds.OnDown);
          this.Trigger(
            self.C3.Plugins.skymen_better_input_manager.Cnds.OnAnyDown
          );
        }
      }
    }
    _SetDownInput(name, player, scheme, preventAutoSwitch) {
      if (player >= 0) {
        this._DoSetDownInput(name, player, scheme, preventAutoSwitch);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetDownInput(name, key, scheme, preventAutoSwitch);
        });
      }
    }
    _DoSetUpInput(name, player, scheme) {
      this.curValue = this.GetDigitalInputState(name, player, scheme);
      if (this.curValue) {
        this.SetDigitalInputState(name, player, scheme, false);
        if (this.GetControlSchemeEnabled(player, scheme)) {
          this.lastDigitalInput = name;
          this.lastPlayer = player;
          this.Trigger(self.C3.Plugins.skymen_better_input_manager.Cnds.OnUp);
          this.Trigger(
            self.C3.Plugins.skymen_better_input_manager.Cnds.OnAnyUp
          );
        }
      }
    }
    _SetUpInput(name, player, scheme) {
      if (player >= 0) {
        this._DoSetUpInput(name, player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetUpInput(name, key, scheme);
        });
      }
    }
    _DoSimulateDownInput(name, player) {
      this.lastDigitalInput = name;
      this.lastPlayer = player;
      this.Trigger(self.C3.Plugins.skymen_better_input_manager.Cnds.OnDown);
      this.Trigger(self.C3.Plugins.skymen_better_input_manager.Cnds.OnAnyDown);
    }
    _SimulateDownInput(name, player) {
      if (player >= 0) {
        this._DoSimulateDownInput(name, player);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSimulateDownInput(name, key);
        });
      }
    }
    _DoSimulateUpInput(name, player) {
      this.lastDigitalInput = name;
      this.lastPlayer = player;
      this.Trigger(self.C3.Plugins.skymen_better_input_manager.Cnds.OnUp);
      this.Trigger(self.C3.Plugins.skymen_better_input_manager.Cnds.OnAnyUp);
    }
    _SimulateUpInput(name, player) {
      if (player >= 0) {
        this._DoSimulateUpInput(name, player);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSimulateUpInput(name, key);
        });
      }
    }
    _DoSetAxisValue(name, value, player, scheme, preventAutoSwitch) {
      value = this.Clamp(value, -1, 1);
      this.SetAxisInputState(name, player, scheme, value, preventAutoSwitch);
    }
    _SetAxisValue(name, value, player, scheme, preventAutoSwitch) {
      if (player >= 0) {
        this._DoSetAxisValue(name, value, player, scheme, preventAutoSwitch);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetAxisValue(name, value, key, scheme, preventAutoSwitch);
        });
      }
    }
    _DoSetJoystickValue(name, x, y, player, scheme, preventAutoSwitch) {
      x = this.Clamp(x, -1, 1);
      y = this.Clamp(y, -1, 1);
      this.SetJoystickInputState(name, player, scheme, x, y, preventAutoSwitch);
    }
    _SetJoystickValue(name, x, y, player, scheme, preventAutoSwitch) {
      if (player >= 0) {
        this._DoSetJoystickValue(name, x, y, player, scheme, preventAutoSwitch);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetJoystickValue(name, x, y, key, scheme, preventAutoSwitch);
        });
      }
    }
    _DoSetJoystickValueX(name, x, player, scheme, preventAutoSwitch) {
      x = this.Clamp(x, -1, 1);
      this.SetJoystickInputStateX(name, player, scheme, x, preventAutoSwitch);
    }
    _SetJoystickValueX(name, x, player, scheme, preventAutoSwitch) {
      if (player >= 0) {
        this._DoSetJoystickValueX(name, x, player, scheme, preventAutoSwitch);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetJoystickValueX(name, x, key, scheme, preventAutoSwitch);
        });
      }
    }
    _DoSetJoystickValueY(name, y, player, scheme, preventAutoSwitch) {
      y = this.Clamp(y, -1, 1);
      this.SetJoystickInputStateY(name, player, scheme, y, preventAutoSwitch);
    }
    _SetJoystickValueY(name, y, player, scheme, preventAutoSwitch) {
      if (player >= 0) {
        this._DoSetJoystickValueY(name, y, player, scheme, preventAutoSwitch);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetJoystickValueY(name, y, key, scheme, preventAutoSwitch);
        });
      }
    }
    _SetControlScheme(scheme, player) {
      if (player >= 0) {
        this.SwithToControlScheme(player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this.SwithToControlScheme(key, scheme);
        });
      }
    }
    _SetAutoSwitchControlScheme(player, value) {
      if (player >= 0) {
        this.SetAutoSwitchControlScheme(player, value);
      } else {
        this.ForEveryPlayer((key) => {
          this.SetAutoSwitchControlScheme(key, value);
        });
        this.autoSwitchControlScheme = value;
      }
    }
    _SetDefaultAxisDeadzone(value) {
      value = this.Clamp(value, 0, 1);
      this.defaultAxisDeadzone = value;
    }
    _SetDefaultJoystickDeadzone(value) {
      value = this.Clamp(value, 0, 1);
      this.defaultJoystickDeadzone = value;
    }
    _SetAxisDeadzone(name, value) {
      value = this.Clamp(value, -1, 1);
      this.SetAxisInputDeadzone(name, value);
    }
    _SetJoystickDeadzone(name, value) {
      value = this.Clamp(value, -1, 1);
      this.SetJoystickInputDeadzone(name, value);
    }
    _WireTo(name, player) {
      this.wireData.set(name, player);
    }
    _IsDown(name, player) {
      if (player >= 0) {
        return this.GetDigitalInputState(name, player);
      }
      for (const [key] of this.playerData) {
        if (this.GetDigitalInputState(name, key)) {
          return true;
        }
      }
      return false;
    }
    _IsAnyDown(player) {
      if (player >= 0) {
        return this.IsAnyDigitalInputDown(player);
      }
      for (const [key] of this.playerData) {
        if (this.IsAnyDigitalInputDown(key)) {
          return true;
        }
      }
      return false;
    }
    _IsDownControlScheme(name, player, scheme) {
      if (player >= 0) {
        return this.GetDigitalInputState(name, player, scheme);
      }
      for (const [key] of this.playerData) {
        if (this.GetDigitalInputState(name, key, scheme)) {
          return true;
        }
      }
      return false;
    }
    _IsAnyDownControlScheme(player, scheme) {
      if (player >= 0) {
        return this.IsAnyDigitalInputDown(player, scheme);
      }
      for (const [key] of this.playerData) {
        if (this.IsAnyDigitalInputDown(key, scheme)) {
          return true;
        }
      }
      return false;
    }
    _OnDown(name, player) {
      return (
        this.lastDigitalInput === name &&
        (this.lastPlayer === player || player < 0)
      );
    }
    _OnUp(name, player) {
      return (
        this.lastDigitalInput === name &&
        (this.lastPlayer === player || player < 0)
      );
    }
    _OnAnyDown(player) {
      return this.lastPlayer === player || player < 0;
    }
    _OnAnyUp(player) {
      return this.lastPlayer === player || player < 0;
    }
    _IsControlSchemeEnabled(name, player) {
      if (player >= 0) {
        return this.GetControlSchemeEnabled(player, name);
      }
      for (const [key] of this.playerData) {
        if (this.GetControlSchemeEnabled(key, name)) {
          return true;
        }
      }
      return false;
    }
    _IsAxisOutsideDeadzone(name, player) {
      if (player >= 0) {
        return this.IsAxisOutsideDeadzone(name, player);
      }
      for (const [key] of this.playerData) {
        if (this.IsAxisOutsideDeadzone(name, key)) {
          return true;
        }
      }
      return false;
    }
    _IsAxisOutsideDeadzoneControlScheme(name, player, scheme) {
      if (player >= 0) {
        return this.IsAxisOutsideDeadzone(name, player, scheme);
      }
      for (const [key] of this.playerData) {
        if (this.IsAxisOutsideDeadzone(name, key, scheme)) {
          return true;
        }
      }
      return false;
    }
    _IsAnyAxisOutsideDeadzone(player) {
      if (player >= 0) {
        return this.IsAnyAxisOutsideDeadzone(player);
      }
      for (const [key] of this.playerData) {
        if (this.IsAnyAxisOutsideDeadzone(key)) {
          return true;
        }
      }
      return false;
    }
    _IsAnyAxisOutsideDeadzoneControlScheme(player, scheme) {
      if (player >= 0) {
        return this.IsAnyAxisOutsideDeadzone(player, scheme);
      }
      for (const [key] of this.playerData) {
        if (this.IsAnyAxisOutsideDeadzone(key, scheme)) {
          return true;
        }
      }
      return false;
    }
    _IsJoystickOutsideDeadzone(name, player) {
      if (player >= 0) {
        return this.IsJoystickOutsideDeadzone(name, player);
      }
      for (const [key] of this.playerData) {
        if (this.IsJoystickOutsideDeadzone(name, key)) {
          return true;
        }
      }
      return false;
    }
    _IsJoystickOutsideDeadzoneControlScheme(name, player, scheme) {
      if (player >= 0) {
        return this.IsJoystickOutsideDeadzone(name, player, scheme);
      }
      for (const [key] of this.playerData) {
        if (this.IsJoystickOutsideDeadzone(name, key, scheme)) {
          return true;
        }
      }
      return false;
    }
    _IsAnyJoystickOutsideDeadzone(player) {
      if (player >= 0) {
        return this.IsAnyJoystickOutsideDeadzone(player);
      }
      for (const [key] of this.playerData) {
        if (this.IsAnyJoystickOutsideDeadzone(key)) {
          return true;
        }
      }
      return false;
    }
    _IsAnyJoystickOutsideDeadzoneControlScheme(player, scheme) {
      if (player >= 0) {
        return this.IsAnyJoystickOutsideDeadzone(player, scheme);
      }
      for (const [key] of this.playerData) {
        if (this.IsAnyJoystickOutsideDeadzone(key, scheme)) {
          return true;
        }
      }
      return false;
    }
    _GetLastInput() {
      return this.lastDigitalInput;
    }
    _GetLastPlayer() {
      return this.lastPlayer;
    }
    _GetAxis(name, player) {
      if (player >= 0 && this.IsAxisOutsideDeadzone(name, player)) {
        return this.GetAxisInputState(name, player);
      }
      return 0;
    }
    _GetJoystickX(name, player) {
      if (player >= 0 && this.IsJoystickOutsideDeadzone(name, player)) {
        return this.GetJoystickInputState(name, player).x;
      }
      return 0;
    }
    _GetJoystickY(name, player) {
      if (player >= 0 && this.IsJoystickOutsideDeadzone(name, player)) {
        return this.GetJoystickInputState(name, player).y;
      }
      return 0;
    }
    _GetRawAxis(name, player) {
      if (player >= 0) {
        return this.GetAxisInputState(name, player);
      }
      return 0;
    }
    _GetRawJoystickX(name, player) {
      if (player >= 0) {
        return this.GetJoystickInputState(name, player).x;
      }
      return 0;
    }
    _GetRawJoystickY(name, player) {
      if (player >= 0) {
        return this.GetJoystickInputState(name, player).y;
      }
      return 0;
    }
    _GetJoystickAngle(name, player) {
      if (player >= 0) {
        const joystick = this.GetJoystickInputState(name, player);
        return Math.atan2(joystick.y, joystick.x) * (180 / Math.PI);
      }
      return 0;
    }
    _GetJoystickMagnitude(name, player) {
      if (player >= 0 && this.IsJoystickOutsideDeadzone(name, player)) {
        const joystick = this.GetJoystickInputState(name, player);
        return Math.sqrt(joystick.x * joystick.x + joystick.y * joystick.y);
      }
      return 0;
    }
    _GetRawJoystickMagnitude(name, player) {
      if (player >= 0) {
        const joystick = this.GetJoystickInputState(name, player);
        return Math.sqrt(joystick.x * joystick.x + joystick.y * joystick.y);
      }
      return 0;
    }
    _GetControlScheme(player) {
      if (player >= 0) {
        return this.GetPlayerActiveControlScheme(player);
      }
      return "";
    }
    _WireFrom(name) {
      if (this.wireData.has(name)) {
        return this.wireData.get(name);
      } else {
        return 0;
      }
    }
  };
}
