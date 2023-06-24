const C3 = self.C3;

const PLUGIN_INFO = {
  id: "skymen_layer_manager",
  Acts: {
    "CreateLayer": {
          "forward": (inst) => inst._CreateLayer,
          
          "autoScriptInterface": true,
          },
"CreateLayerOnLayout": {
          "forward": (inst) => inst._CreateLayerOnLayout,
          
          "autoScriptInterface": true,
          },
"DestroyLayer": {
          "forward": (inst) => inst._DestroyLayer,
          
          "autoScriptInterface": true,
          },
"DestroyLayerOnLayout": {
          "forward": (inst) => inst._DestroyLayerOnLayout,
          
          "autoScriptInterface": true,
          },
"MoveLayerToLayer": {
          "forward": (inst) => inst._MoveLayerToLayer,
          
          "autoScriptInterface": true,
          },
"SetLayerAsChildOfLayer": {
          "forward": (inst) => inst._SetLayerAsChildOfLayer,
          
          "autoScriptInterface": true,
          },
"SetLayerAsRoot": {
          "forward": (inst) => inst._SetLayerAsRoot,
          
          "autoScriptInterface": true,
          },
"SetLayerAsRootOnLayout": {
          "forward": (inst) => inst._SetLayerAsRootOnLayout,
          
          "autoScriptInterface": true,
          },
"SetLayerAsChildOfLayerOnLayout": {
          "forward": (inst) => inst._SetLayerAsChildOfLayerOnLayout,
          
          "autoScriptInterface": true,
          }
  },
  Cnds: {
    "IsLayerChildOfLayer": {
          "forward": (inst) => inst._IsLayerChildOfLayer,
          
          "autoScriptInterface": true,
        },
"IsLayerRoot": {
          "forward": (inst) => inst._IsLayerRoot,
          
          "autoScriptInterface": true,
        },
"LayerExists": {
          "forward": (inst) => inst._LayerExists,
          
          "autoScriptInterface": true,
        },
"LayerHasChildren": {
          "forward": (inst) => inst._LayerHasChildren,
          
          "autoScriptInterface": true,
        },
"IsLayerChildOfLayerOnLayout": {
          "forward": (inst) => inst._IsLayerChildOfLayerOnLayout,
          
          "autoScriptInterface": true,
        },
"IsLayerRootOnLayout": {
          "forward": (inst) => inst._IsLayerRootOnLayout,
          
          "autoScriptInterface": true,
        },
"LayerExistsOnLayout": {
          "forward": (inst) => inst._LayerExistsOnLayout,
          
          "autoScriptInterface": true,
        },
"LayerHasChildrenOnLayout": {
          "forward": (inst) => inst._LayerHasChildrenOnLayout,
          
          "autoScriptInterface": true,
        }
  },
  Exps: {
    "RootLayerCount": {
          "forward": (inst) => inst._RootLayerCount,
          
          "autoScriptInterface": true,
        },
"SubLayerCount": {
          "forward": (inst) => inst._SubLayerCount,
          
          "autoScriptInterface": true,
        },
"SubLayerAt": {
          "forward": (inst) => inst._SubLayerAt,
          
          "autoScriptInterface": true,
        },
"RootLayerAt": {
          "forward": (inst) => inst._RootLayerAt,
          
          "autoScriptInterface": true,
        },
"RootLayerCountOnLayout": {
          "forward": (inst) => inst._RootLayerCountOnLayout,
          
          "autoScriptInterface": true,
        },
"SubLayerCountOnLayout": {
          "forward": (inst) => inst._SubLayerCountOnLayout,
          
          "autoScriptInterface": true,
        },
"SubLayerAtOnLayout": {
          "forward": (inst) => inst._SubLayerAtOnLayout,
          
          "autoScriptInterface": true,
        },
"RootLayerAtOnLayout": {
          "forward": (inst) => inst._RootLayerAtOnLayout,
          
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
  function getNewLayerData({
    name = "",
    visible = true,
    backgroundColor = [0, 0, 0],
    transparent = true,
    parallaxX = 1,
    parallaxY = 1,
    opacity = 1,
    forceOwnTexture = true,
    useRenderCells = true,
    scaleRate = 1,
    blendMode = 0,
    isInteractive = true,
    zElevation = 0,
    renderAs3D = true,
    useCameraDistanceDrawOrder = false,
    subLayers = [],
  } = {}) {
    return [
      name,
      0,
      Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      visible,
      backgroundColor,
      transparent,
      parallaxX,
      parallaxY,
      opacity,
      forceOwnTexture,
      useRenderCells,
      scaleRate,
      blendMode,
      isInteractive,
      [],
      [],
      zElevation,
      renderAs3D,
      useCameraDistanceDrawOrder,
      subLayers,
    ];
  }

  const layerMap = new Map();

  function registerLayer(layer) {
    if (!layerMap.has(layer._index)) layerMap.set(layer._index, layer);
  }

  let oldC3Layout = C3.Layout;
  C3.Layout = class extends oldC3Layout {
    constructor(...args) {
      super(...args);
      this._skymen_tempLayers = [];
    }

    _skymen_CreateLayer(options, temporary) {
      const layerData = getNewLayerData(options);
      if (this._allLayersFlat.find((x) => x._name === layerData[0]))
        throw "Layer with this name already exists on the layout";
      const layer = C3.New(C3.Layer, this, null, layerData);
      this._rootLayers.push(layer);
      this._allLayersFlat = [...this.allLayers()];
      for (let i = 0, len = this._allLayersFlat.length; i < len; ++i) {
        const layer = this._allLayersFlat[i];
        layer._SetIndex(i);
        this._layersByName.set(layer.GetName().toLowerCase(), layer);
        this._layersBySid.set(layer.GetSID(), layer);
      }
      layer._Init();
      if (temporary) {
        this._skymen_tempLayers.push(layer);
      }
    }

    _skymen_RemoveLayer(layer) {
      // Remove the layer from _allLayersFlat array
      this._allLayersFlat = this._allLayersFlat.filter((l) => l !== layer);

      // Remove the layer from _layersByName map
      this._layersByName.delete(layer.GetName().toLowerCase());

      // Remove the layer from _layersBySid map
      this._layersBySid.delete(layer.GetSID());

      // If the layer has a parent, remove it from the parent's _subLayers array
      if (layer._parentLayer) {
        layer._parentLayer._subLayers = layer._parentLayer._subLayers.filter(
          (l) => l !== layer
        );
      } else {
        // If the layer has no parent, it should be a root layer
        this._rootLayers = this._rootLayers.filter((l) => l !== layer);
      }

      // Update _layersByName and _layersBySid maps
      for (let i = 0, len = this._allLayersFlat.length; i < len; ++i) {
        const layer = this._allLayersFlat[i];
        layer._SetIndex(i);
      }
    }

    _skymen_MoveLayer(layer, parentLayer, id) {
      // Remove the old layer
      this._skymen_RemoveLayer(layer);

      // Change the parent of the layer
      layer._parentLayer = parentLayer;

      // Add it to its new parent's _subLayers at the specified position
      if (parentLayer) {
        parentLayer._subLayers.splice(id, 0, layer);
      } else {
        // If no parentLayer is specified, then it should be added to the root
        this._rootLayers.splice(id, 0, layer);
      }

      // Rebuild the _allLayersFlat array
      this._allLayersFlat = [...this.allLayers()];

      // Update _layersByName and _layersBySid maps
      for (let i = 0, len = this._allLayersFlat.length; i < len; ++i) {
        const layer = this._allLayersFlat[i];
        layer._SetIndex(i);
        this._layersByName.set(layer.GetName().toLowerCase(), layer);
        this._layersBySid.set(layer.GetSID(), layer);
      }
    }

    _skymen_MoveLayerToLayer(layer, otherLayer, before) {
      // If before is true, we want to move the layer before otherLayer, else after it
      const id = before ? otherLayer._index : otherLayer._index + 1;

      // Move the layer
      this._skymen_MoveLayer(layer, otherLayer._parentLayer, id);
    }

    async _StopRunning() {
      // Destroy all temporary layers
      for (let i = 0, len = this._skymen_tempLayers.length; i < len; ++i) {
        this._skymen_tempLayers[i]._skymen_Destroy();
      }
      await super._StopRunning();
    }
  };

  let oldC3Layer = C3.Layer;
  C3.Layer = class extends oldC3Layer {
    constructor(...args) {
      super(...args);
    }

    _skymen_Destroy() {
      this._layout._skymen_RemoveLayer(this);
    }

    _Init(...args) {
      super._Init(...args);
      registerLayer(this);
    }
  };

  let oldILayer = self.ILayer;
  self.ILayer = class ILayer extends oldILayer {
    constructor(layer) {
      super(layer);
      this._sdkLayer = layer;
    }

    get _realIndex() {
      return this._sdkLayer.GetIndex();
    }
  };

  function hackC3Runtime(runtime) {
    let oldFn = runtime._CreateChildInstancesFromData.bind(runtime);
    runtime._CreateChildInstancesFromData = function (
      parentInstance,
      parentWorldData,
      parentWorldInfo,
      layer,
      x,
      y,
      creatingHierarchy
    ) {
      const parentZIndex = parentWorldInfo.GetSceneGraphZIndexExportData();
      const childrenData = parentWorldInfo.GetSceneGraphChildrenExportData();
      parentInstance.GetWorldInfo().SetSceneGraphZIndex(parentZIndex);
      if (!childrenData) return;
      if (typeof x === "undefined") x = parentWorldData[0];
      if (typeof y === "undefined") y = parentWorldData[1];
      const sceneGraphSiblings = new Set();
      const parentX = parentWorldData[0];
      const parentY = parentWorldData[1];
      for (const childData of childrenData) {
        const childLayoutSID = childData[0];
        const childLayerIndex = childData[1];
        const childUID = childData[2];
        const childFlags = childData[3];
        const childIsInContainer = !!childData[4];
        const childZIndex = childData[5];
        const uniqueInstanceData = childData[6];
        let childInstData;
        if (uniqueInstanceData) childInstData = uniqueInstanceData;
        else {
          const layout = this._layoutManager.GetLayoutBySID(childLayoutSID);
          const l = layerMap.get(childLayerIndex);
          childInstData = l.GetInitialInstanceData(childUID);
        }
        const childObjectClass = this.GetObjectClassByIndex(childInstData[1]);
        const hasSibling = parentInstance.HasSibling(childObjectClass);
        const siblingProcessed = sceneGraphSiblings.has(childObjectClass);
        if (hasSibling && !siblingProcessed && childIsInContainer) {
          const childInst = parentInstance.GetSibling(childObjectClass);
          const childX = x + childInstData[0][0] - parentX;
          const childY = y + childInstData[0][1] - parentY;
          childInst.GetWorldInfo().SetXY(childX, childY);
          childInst.GetWorldInfo().SetSceneGraphZIndex(childZIndex);
          parentInstance.AddChild(childInst, {
            transformX: !!((childFlags >> 0) & 1),
            transformY: !!((childFlags >> 1) & 1),
            transformWidth: !!((childFlags >> 2) & 1),
            transformHeight: !!((childFlags >> 3) & 1),
            transformAngle: !!((childFlags >> 4) & 1),
            destroyWithParent: !!((childFlags >> 5) & 1),
            transformZElevation: !!((childFlags >> 6) & 1),
            transformOpacity: !!((childFlags >> 7) & 1),
            transformVisibility: !!((childFlags >> 8) & 1),
          });
          sceneGraphSiblings.add(childObjectClass);
        } else {
          const childX = x + childInstData[0][0] - parentX;
          const childY = y + childInstData[0][1] - parentY;
          const childInst = this.CreateInstanceFromData(
            childInstData,
            layer,
            false,
            childX,
            childY,
            false,
            true,
            parentInstance,
            creatingHierarchy
          );
          childInst.GetWorldInfo().SetSceneGraphZIndex(childZIndex);
          parentInstance.AddChild(childInst, {
            transformX: !!((childFlags >> 0) & 1),
            transformY: !!((childFlags >> 1) & 1),
            transformWidth: !!((childFlags >> 2) & 1),
            transformHeight: !!((childFlags >> 3) & 1),
            transformAngle: !!((childFlags >> 4) & 1),
            destroyWithParent: !!((childFlags >> 5) & 1),
            transformZElevation: !!((childFlags >> 6) & 1),
            transformOpacity: !!((childFlags >> 7) & 1),
            transformVisibility: !!((childFlags >> 8) & 1),
          });
        }
      }
    };
  }

  return class extends C3.SDKInstanceBase {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
      }
      hackC3Runtime(this._runtime);
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

    // ===== UTILS =====
    GetLayerFromLayer(layoutName, name) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return null;
      }
      return layout.GetLayer(name);
    }

    GetLayer(name) {
      const layout = this.GetRunningLayout();
      if (!layout) {
        return null;
      }
      return layout.GetLayer(name);
    }

    GetLayout(name) {
      return this._runtime._layoutManager._layoutsByName.get(
        name.toLowerCase()
      );
    }

    GetRunningLayout() {
      return this._runtime.GetMainRunningLayout();
    }

    CreateLayerOnLayout(
      layout,
      name,
      useRenderCells,
      renderAs3D,
      useCameraDistanceDrawOrder,
      temporary
    ) {
      layout._skymen_CreateLayer(
        {
          name,
          useRenderCells,
          renderAs3D,
          useCameraDistanceDrawOrder,
        },
        temporary
      );
    }

    // ===== ACES =====

    _CreateLayer(
      name,
      useRenderCells,
      renderAs3D,
      useCameraDistanceDrawOrder,
      temporary
    ) {
      const layout = this.GetRunningLayout();
      if (!layout) {
        return;
      }
      this.CreateLayerOnLayout(
        layout,
        name,
        useRenderCells,
        renderAs3D,
        useCameraDistanceDrawOrder,
        temporary
      );
    }
    _CreateLayerOnLayout(
      layoutName,
      name,
      useRenderCells,
      renderAs3D,
      useCameraDistanceDrawOrder
    ) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      this.CreateLayerOnLayout(
        layout,
        name,
        useRenderCells,
        renderAs3D,
        useCameraDistanceDrawOrder,
        false
      );
    }
    _DestroyLayer(name) {
      const layer = this.GetLayer(name);
      if (!layer) {
        return;
      }
      layer._skymen_Destroy();
    }
    _DestroyLayerOnLayout(layoutName, name) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      const layer = layout.GetLayer(name);
      if (!layer) {
        return;
      }
      layer._skymen_Destroy();
    }
    _MoveLayerToLayer(name, target, before) {
      const layer = this.GetLayer(name);
      if (!layer) {
        return;
      }
      const targetLayer = this.GetLayer(target);
      if (!targetLayer) {
        return;
      }
      const layout = this.GetRunningLayout();
      if (!layout) {
        return;
      }
      layout._skymen_MoveLayerToLayer(layer, targetLayer, before);
    }
    _SetLayerAsChildOfLayer(name, target, index) {
      const layer = this.GetLayer(name);
      if (!layer) {
        return;
      }
      const targetLayer = this.GetLayer(target);
      if (!targetLayer) {
        return;
      }
      const layout = this.GetRunningLayout();
      if (!layout) {
        return;
      }
      layout._skymen_MoveLayer(layer, targetLayer, index);
    }
    _SetLayerAsRoot(name, index) {
      const layer = this.GetLayer(name);
      if (!layer) {
        return;
      }
      const layout = this.GetRunningLayout();
      if (!layout) {
        return;
      }
      layout._skymen_MoveLayer(layer, null, index);
    }
    _SetLayerAsRootOnLayout(layoutName, name, index) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      const layer = layout.GetLayer(name);
      if (!layer) {
        return;
      }
      layout._skymen_MoveLayer(layer, null, index);
    }
    _SetLayerAsChildOfLayerOnLayout(layoutName, name, target, index) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      const layer = layout.GetLayer(name);
      if (!layer) {
        return;
      }
      const targetLayer = layout.GetLayer(target);
      if (!targetLayer) {
        return;
      }
      layout._skymen_MoveLayer(layer, targetLayer, index);
    }
    _IsLayerChildOfLayer(child, parent) {
      const layer = this.GetLayer(child);
      if (!layer) {
        return false;
      }
      const parentLayer = this.GetLayer(parent);
      if (!parentLayer) {
        return false;
      }
      return child._parentLayer === parentLayer;
    }
    _IsLayerRoot(layerName) {
      const layer = this.GetLayer(layerName);
      if (!layer) {
        return false;
      }
      return !layer._parentLayer;
    }
    _LayerExists(layer) {
      return !!this.GetLayer(layer);
    }
    _LayerHasChildren(layerName) {
      const layer = this.GetLayer(layerName);
      if (!layer) {
        return false;
      }
      return layer._subLayers.length > 0;
    }
    _IsLayerChildOfLayerOnLayout(layoutName, child, parent) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      const layer = layout.GetLayer(child);
      if (!layer) {
        return false;
      }
      const parentLayer = layout.GetLayer(parent);
      if (!parentLayer) {
        return false;
      }
      return layer._parentLayer === parentLayer;
    }
    _IsLayerRootOnLayout(layoutName, layerName) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      const layer = layout.GetLayer(layerName);
      if (!layer) {
        return false;
      }
      return !layer._parentLayer;
    }
    _LayerExistsOnLayout(layoutName, layer) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      return !!layout.GetLayer(layer);
    }
    _LayerHasChildrenOnLayout(layoutName, layerName) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return;
      }
      const layer = layout.GetLayer(layerName);
      if (!layer) {
        return false;
      }
      return layer._subLayers.length > 0;
    }
    _RootLayerCount() {
      layout = this.GetRunningLayout();
      if (!layout) {
        return 0;
      }
      return layout._rootLayers.length;
    }
    _SubLayerCount(layerName) {
      const layer = this.GetLayer(layerName);
      if (!layer) {
        return 0;
      }
      return layer._subLayers.length;
    }
    _SubLayerAt(layerName, index) {
      const layer = this.GetLayer(layerName);
      if (!layer) {
        return "";
      }
      if (index < 0 || index >= layer._subLayers.length) {
        return "";
      }
      return layer._subLayers[index]._name;
    }
    _RootLayerAt(index) {
      const layout = this.GetRunningLayout();
      if (!layout) {
        return "";
      }
      if (index < 0 || index >= layout._rootLayers.length) {
        return "";
      }
      return layout._rootLayers[index]._name;
    }
    _RootLayerCountOnLayout(layoutName) {
      const layout = this.GetLayout(layoutName);
      return layout._rootLayers.length;
    }
    _SubLayerCountOnLayout(layoutName, layerName) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return "";
      }
      const layer = layout.GetLayer(layerName);
      if (!layer) {
        return 0;
      }
      return layer._subLayers.length;
    }
    _SubLayerAtOnLayout(layoutName, layerName, index) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return "";
      }
      const layer = layout.GetLayer(layerName);
      if (!layer) {
        return "";
      }
      if (index < 0 || index >= layer._subLayers.length) {
        return "";
      }
      return layer._subLayers[index]._name;
    }
    _RootLayerAtOnLayout(layoutName, index) {
      const layout = this.GetLayout(layoutName);
      if (!layout) {
        return "";
      }
      if (index < 0 || index >= layout._rootLayers.length) {
        return "";
      }
      return layout._rootLayers[index]._name;
    }
  };
}


P_C.Instance = getInstanceJs();
