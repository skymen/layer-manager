const C3 = self.C3;

const PLUGIN_INFO = {
  id: "skymen_better_input_manager",
  Acts: {
    "SetDownInput": {
          "forward": (inst) => inst._SetDownInput,
          
          "autoScriptInterface": true,
          },
"SetUpInput": {
          "forward": (inst) => inst._SetUpInput,
          
          "autoScriptInterface": true,
          },
"SimulateDownInput": {
          "forward": (inst) => inst._SimulateDownInput,
          
          "autoScriptInterface": true,
          },
"SimulateUpInput": {
          "forward": (inst) => inst._SimulateUpInput,
          
          "autoScriptInterface": true,
          },
"SetAxisValue": {
          "forward": (inst) => inst._SetAxisValue,
          
          "autoScriptInterface": true,
          },
"SetJoystickValue": {
          "forward": (inst) => inst._SetJoystickValue,
          
          "autoScriptInterface": true,
          },
"SetJoystickValueX": {
          "forward": (inst) => inst._SetJoystickValueX,
          
          "autoScriptInterface": true,
          },
"SetJoystickValueY": {
          "forward": (inst) => inst._SetJoystickValueY,
          
          "autoScriptInterface": true,
          },
"SetControlScheme": {
          "forward": (inst) => inst._SetControlScheme,
          
          "autoScriptInterface": true,
          },
"SetAutoSwitchControlScheme": {
          "forward": (inst) => inst._SetAutoSwitchControlScheme,
          
          "autoScriptInterface": true,
          },
"SetDefaultAxisDeadzone": {
          "forward": (inst) => inst._SetDefaultAxisDeadzone,
          
          "autoScriptInterface": true,
          },
"SetDefaultJoystickDeadzone": {
          "forward": (inst) => inst._SetDefaultJoystickDeadzone,
          
          "autoScriptInterface": true,
          },
"SetAxisDeadzone": {
          "forward": (inst) => inst._SetAxisDeadzone,
          
          "autoScriptInterface": true,
          },
"SetJoystickDeadzone": {
          "forward": (inst) => inst._SetJoystickDeadzone,
          
          "autoScriptInterface": true,
          }
  },
  Cnds: {
    "IsDown": {
          "forward": (inst) => inst._IsDown,
          
          "autoScriptInterface": true,
        },
"OnDown": {
          "forward": (inst) => inst._OnDown,
          
          "autoScriptInterface": true,
        },
"OnUp": {
          "forward": (inst) => inst._OnUp,
          
          "autoScriptInterface": true,
        },
"OnAnyDown": {
          "forward": (inst) => inst._OnAnyDown,
          
          "autoScriptInterface": true,
        },
"OnAnyUp": {
          "forward": (inst) => inst._OnAnyUp,
          
          "autoScriptInterface": true,
        },
"IsControlSchemeEnabled": {
          "forward": (inst) => inst._IsControlSchemeEnabled,
          
          "autoScriptInterface": true,
        },
"IsAxisOutsideDeadzone": {
          "forward": (inst) => inst._IsAxisOutsideDeadzone,
          
          "autoScriptInterface": true,
        },
"IsJoystickOutsideDeadzone": {
          "forward": (inst) => inst._IsJoystickOutsideDeadzone,
          
          "autoScriptInterface": true,
        }
  },
  Exps: {
    "LastInput": {
          "forward": (inst) => inst._GetLastInput,
          
          "autoScriptInterface": true,
        },
"LastPlayer": {
          "forward": (inst) => inst._GetLastPlayer,
          
          "autoScriptInterface": true,
        },
"GetAxis": {
          "forward": (inst) => inst._GetAxis,
          
          "autoScriptInterface": true,
        },
"GetRawAxis": {
          "forward": (inst) => inst._GetRawAxis,
          
          "autoScriptInterface": true,
        },
"GetJoystickX": {
          "forward": (inst) => inst._GetJoystickX,
          
          "autoScriptInterface": true,
        },
"GetRawJoystickX": {
          "forward": (inst) => inst._GetRawJoystickX,
          
          "autoScriptInterface": true,
        },
"GetJoystickY": {
          "forward": (inst) => inst._GetJoystickY,
          
          "autoScriptInterface": true,
        },
"GetRawJoystickY": {
          "forward": (inst) => inst._GetRawJoystickY,
          
          "autoScriptInterface": true,
        },
"GetJoystickAngle": {
          "forward": (inst) => inst._GetJoystickAngle,
          
          "autoScriptInterface": true,
        },
"GetJoystickMagnitude": {
          "forward": (inst) => inst._GetJoystickMagnitude,
          
          "autoScriptInterface": true,
        },
"GetRawJoystickMagnitude": {
          "forward": (inst) => inst._GetRawJoystickMagnitude,
          
          "autoScriptInterface": true,
        },
"GetControlScheme": {
          "forward": (inst) => inst._GetControlScheme,
          
          "autoScriptInterface": true,
        }
  },
};

C3.Plugins[PLUGIN_INFO.id] = class extends C3.SDKPluginBase {
  constructor(opts) {
    super(opts);
  }

  Release() {
    super.Release();
  }
};
const P_C = C3.Plugins[PLUGIN_INFO.id];
P_C.Type = class extends C3.SDKTypeBase {
  constructor(objectClass) {
    super(objectClass);
  }

  Release() {
    super.Release();
  }

  OnCreate() {}
};

//====== SCRIPT INTERFACE ======
const map = new WeakMap();

function getScriptInterface(parentClass, map) {
  return class extends parentClass {
    constructor() {
      super();
      map.set(this, self.IInstance._GetInitInst().GetSdkInstance());
    }

    GetJoystick(name, player) {
      const sdkInst = map.get(this);
      if (player >= 0) {
        return sdkInst.GetJoystickInputState(name, player);
      }
      return {
        x: 0,
        y: 0,
      };
    }
  };
}


const scriptInterface = getScriptInterface(self.IInstance, map);

// extend script interface with plugin actions
Object.keys(PLUGIN_INFO.Acts).forEach((key) => {
  const ace = PLUGIN_INFO.Acts[key];
  if (!ace.autoScriptInterface) return;
  scriptInterface.prototype[key] = function (...args) {
    const sdkInst = map.get(this);
    P_C.Acts[key].call(sdkInst, ...args);
  };
});

// extend script interface with plugin conditions
Object.keys(PLUGIN_INFO.Cnds).forEach((key) => {
  const ace = PLUGIN_INFO.Cnds[key];
  if (!ace.autoScriptInterface) return;
  scriptInterface.prototype[key] = function (...args) {
    const sdkInst = map.get(this);
    return P_C.Cnds[key].call(sdkInst, ...args);
  };
});

// extend script interface with plugin expressions
Object.keys(PLUGIN_INFO.Exps).forEach((key) => {
  const ace = PLUGIN_INFO.Exps[key];
  if (!ace.autoScriptInterface) return;
  scriptInterface.prototype[key] = function (...args) {
    const sdkInst = map.get(this);
    return P_C.Exps[key].call(sdkInst, ...args);
  };
});
//====== SCRIPT INTERFACE ======

//============ ACES ============
P_C.Acts = {};
P_C.Cnds = {};
P_C.Exps = {};
Object.keys(PLUGIN_INFO.Acts).forEach((key) => {
  const ace = PLUGIN_INFO.Acts[key];
  P_C.Acts[key] = function (...args) {
    if (ace.forward) ace.forward(this).call(this, ...args);
    else if (ace.handler) ace.handler.call(this, ...args);
  };
});
Object.keys(PLUGIN_INFO.Cnds).forEach((key) => {
  const ace = PLUGIN_INFO.Cnds[key];
  P_C.Cnds[key] = function (...args) {
    if (ace.forward) return ace.forward(this).call(this, ...args);
    if (ace.handler) return ace.handler.call(this, ...args);
  };
});
Object.keys(PLUGIN_INFO.Exps).forEach((key) => {
  const ace = PLUGIN_INFO.Exps[key];
  P_C.Exps[key] = function (...args) {
    if (ace.forward) return ace.forward(this).call(this, ...args);
    if (ace.handler) return ace.handler.call(this, ...args);
  };
});
//============ ACES ============

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

    SchemeOrPlayerActiveControlScheme(player, controlScheme) {
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

    SetDigitalInputState(inputName, player, controlScheme, state) {
      this.AssertDigitalInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      this.digitalInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, state);

      if (this.GetAutoSwitchControlScheme(player)) {
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

    SetAxisInputState(inputName, player, controlScheme, state) {
      this.AssertAxisInputPlayerHasControlScheme(
        inputName,
        player,
        controlScheme
      );
      this.axisInputData
        .get(inputName)
        .statePerPlayer.get(player)
        .set(controlScheme, state);

      if (this.GetAutoSwitchControlScheme(player)) {
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

    SetJoystickInputState(inputName, player, controlScheme, x, y) {
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

      if (this.GetAutoSwitchControlScheme(player)) {
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
      if (!this.GetControlSchemeEnabled(player, controlScheme)) {
        this.SetControlSchemeEnabled(player, controlScheme, true);
        let playerData = this.playerData.get(player);
        // Disable all other control schemes that are auto managed
        for (const [key, value] of playerData.controlSchemes) {
          if (key !== controlScheme) {
            this.SetControlSchemeEnabled(player, key, true);
          }
        }
      }
    }

    // ======= ACES =======
    _DoSetDownInput(name, player, scheme) {
      this.curValue = this.GetDigitalInputState(name, player, scheme);
      if (!this.curValue) {
        this.SetDigitalInputState(name, player, scheme, true);
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
    _SetDownInput(name, player, scheme) {
      if (player >= 0) {
        this._DoSetDownInput(name, player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetDownInput(name, key, scheme);
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
    _DoSetAxisValue(name, value, player, scheme) {
      value = this.Clamp(value, -1, 1);
      this.SetAxisInputState(name, player, scheme, value);
    }
    _SetAxisValue(name, value, player, scheme) {
      if (player >= 0) {
        this._DoSetAxisValue(name, value, player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetAxisValue(name, value, key, scheme);
        });
      }
    }
    _DoSetJoystickValue(name, x, y, player, scheme) {
      x = this.Clamp(x, -1, 1);
      y = this.Clamp(y, -1, 1);
      this.SetJoystickInputState(name, player, scheme, x, y);
    }
    _SetJoystickValue(name, x, y, player, scheme) {
      if (player >= 0) {
        this._DoSetJoystickValue(name, x, y, player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetJoystickValue(name, x, y, key, scheme);
        });
      }
    }
    _DoSetJoystickValueX(name, x, player, scheme) {
      x = this.Clamp(x, -1, 1);
      this.SetJoystickInputStateX(name, player, scheme, x);
    }
    _SetJoystickValueX(name, x, player, scheme) {
      if (player >= 0) {
        this._DoSetJoystickValueX(name, x, player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetJoystickValueX(name, x, key, scheme);
        });
      }
    }
    _DoSetJoystickValueY(name, y, player, scheme) {
      y = this.Clamp(y, -1, 1);
      this.SetJoystickInputStateY(name, player, scheme, y);
    }
    _SetJoystickValueY(name, y, player, scheme) {
      if (player >= 0) {
        this._DoSetJoystickValueY(name, y, player, scheme);
      } else {
        this.ForEveryPlayer((key) => {
          this._DoSetJoystickValueY(name, y, key, scheme);
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
  };
}


P_C.Instance = getInstanceJs();
