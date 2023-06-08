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
