// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
module.exports = {
  addonType: "plugin",
  id: "skymen_layer_manager",
  name: "Layer Manager",
  version: "1.0.0.5",
  category: "general",
  author: "skymen, Overboy",
  website: "https://www.construct.net",
  documentation: "https://www.construct.net",
  description: "Create, Destroy and Reorder Layers at runtime",
  type: "object",
  additionalFiles: [],
  info: {
    Set: {
      IsResizable: false,
      IsRotatable: false,
      Is3D: false,
      HasImage: false,
      DefaultImageURL: null,
      IsTiled: false,
      IsDeprecated: false,
      IsSingleGlobal: true,
      SupportsZElevation: false,
      SupportsColor: false,
      SupportsEffects: false,
      MustPreDraw: false,
      CanBeBundled: true,
    },
    AddCommonACEs: {
      Position: false,
      SceneGraph: false,
      Size: false,
      Angle: false,
      Appearance: false,
      ZOrder: false,
    },
  },
  properties: [],
  aceCategories: {
    general: "General",
  },
  Acts: {
    CreateLayer: {
      category: "general",
      forward: "_CreateLayer",
      autoScriptInterface: true,
      highlight: true,
      params: [
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "useRenderCells",
          name: "Use Render Cells",
          desc: "Whether to use render cells",
          type: "boolean",
          value: false,
        },
        {
          id: "renderAs3D",
          name: "Render As 3D",
          desc: "Whether to render as 3D",
          type: "boolean",
          value: false,
        },
        {
          id: "useCameraDistanceDrawOrder",
          name: "Use Camera Distance Draw Order",
          desc: "Whether to use camera distance draw order",
          type: "boolean",
          value: false,
        },
        {
          id: "temporary",
          name: "Temporary",
          desc: "Whether the layer is temporary (will be destroyed when the layout ends)",
          type: "boolean",
          value: false,
        },
      ],
      listName: "Create Layer",
      displayText:
        "Create layer [i]{0}[/i] ([i]{1}[/i], [i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
      description: "Create a layer",
    },
    CreateLayerOnLayout: {
      category: "general",
      forward: "_CreateLayerOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout to create the layer on",
          type: "string",
          value: "",
        },
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "useRenderCells",
          name: "Use Render Cells",
          desc: "Whether to use render cells",
          type: "boolean",
          value: false,
        },
        {
          id: "renderAs3D",
          name: "Render As 3D",
          desc: "Whether to render as 3D",
          type: "boolean",
          value: false,
        },
        {
          id: "useCameraDistanceDrawOrder",
          name: "Use Camera Distance Draw Order",
          desc: "Whether to use camera distance draw order",
          type: "boolean",
          value: false,
        },
      ],
      listName: "Create Layer On Layout",
      displayText:
        "Create layer [i]{1}[/i] on layout [i]{0}[/i] ([i]{2}[/i], [i]{3}[/i], [i]{4}[/i])",
      description: "Create a layer on a layout",
    },
    DestroyLayer: {
      category: "general",
      forward: "_DestroyLayer",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Destroy Layer",
      displayText: "Destroy layer [i]{0}[/i]",
      description: "Destroy a layer",
    },
    DestroyLayerOnLayout: {
      category: "general",
      forward: "_DestroyLayerOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout to destroy the layer on",
          type: "string",
          value: "",
        },
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Destroy Layer On Layout",
      displayText: "Destroy layer [i]{1}[/i] on layout [i]{0}[/i]",
      description: "Destroy a layer on a layout",
    },
    MoveLayerToLayer: {
      category: "general",
      forward: "_MoveLayerToLayer",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "target",
          name: "Target",
          desc: "The target layer",
          type: "string",
          value: "",
        },
        {
          id: "before",
          name: "Before",
          desc: "Whether to move the layer before the target layer",
          type: "boolean",
          value: false,
        },
      ],
      listName: "Move Layer To Layer",
      displayText:
        "Move layer [i]{0}[/i] to layer [i]{1}[/i] (before: [i]{2}[/i])",
      description: "Move a layer to another layer",
    },
    SetLayerAsChildOfLayer: {
      category: "general",
      forward: "_SetLayerAsChildOfLayer",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "target",
          name: "Target",
          desc: "The target layer",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index to set the layer as a child of the target layer",
          type: "number",
          value: 0,
        },
      ],
      listName: "Set Layer As Child Of Layer",
      displayText:
        "Set layer [i]{0}[/i] as child of layer [i]{1}[/i] at index [i]{2}[/i]",
      description: "Set a layer as a child of another layer at an index",
    },
    SetLayerAsRoot: {
      category: "general",
      forward: "_SetLayerAsRoot",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index to set the layer as a root layer",
          type: "number",
          value: 0,
        },
      ],
      listName: "Set Layer As Root",
      displayText: "Set layer [i]{0}[/i] as root at index [i]{1}[/i]",
      description: "Set a layer as a root layer at an index",
    },
    SetLayerAsRootOnLayout: {
      category: "general",
      forward: "_SetLayerAsRootOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout to set the layer as a root layer on",
          type: "string",
          value: "",
        },
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index to set the layer as a root layer",
          type: "number",
          value: 0,
        },
      ],
      listName: "Set Layer As Root On Layout",
      displayText:
        "Set layer [i]{1}[/i] as root on layout [i]{0}[/i] at index [i]{2}[/i]",
      description: "Set a layer as a root layer on a layout at an index",
    },
    SetLayerAsChildOfLayerOnLayout: {
      category: "general",
      forward: "_SetLayerAsChildOfLayerOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout to set the layer as a child of another layer on",
          type: "string",
          value: "",
        },
        {
          id: "name",
          name: "Name",
          desc: "The name of the layer",
          type: "string",
          value: "",
        },
        {
          id: "target",
          name: "Target",
          desc: "The target layer",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index to set the layer as a child of the target layer",
          type: "number",
          value: 0,
        },
      ],
      listName: "Set Layer As Child Of Layer On Layout",
      displayText:
        "Set layer [i]{1}[/i] as child of layer [i]{2}[/i] on layout [i]{0}[/i] at index [i]{3}[/i]",
      description:
        "Set a layer as a child of another layer on a layout at an index",
    },
  },
  Cnds: {
    IsLayerChildOfLayer: {
      category: "general",
      forward: "_IsLayerChildOfLayer",
      autoScriptInterface: true,
      highlight: false,
      deprecated: true,
      params: [
        {
          id: "childLayer",
          name: "Child Layer",
          desc: "The child layer",
          type: "string",
          value: "",
        },
        {
          id: "parentLayer",
          name: "Parent Layer",
          desc: "The parent layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Is Layer Child Of Layer",
      displayText: "Is layer [i]{0}[/i] child of layer [i]{1}[/i]",
      description: "Test if a layer is a child of another layer",
    },
    IsLayerRoot: {
      category: "general",
      forward: "_IsLayerRoot",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Is Layer Root",
      displayText: "Is layer [i]{0}[/i] root",
      description: "Test if a layer is a root layer",
    },
    LayerExists: {
      category: "general",
      forward: "_LayerExists",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Layer Exists",
      displayText: "Layer [i]{0}[/i] exists",
      description: "Test if a layer exists",
    },
    LayerHasChildren: {
      category: "general",
      forward: "_LayerHasChildren",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Layer Has Children",
      displayText: "Layer [i]{0}[/i] has children",
      description: "Test if a layer has children",
    },
    IsLayerChildOfLayerOnLayout: {
      category: "general",
      forward: "_IsLayerChildOfLayerOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "childLayer",
          name: "Child Layer",
          desc: "The child layer",
          type: "string",
          value: "",
        },
        {
          id: "parentLayer",
          name: "Parent Layer",
          desc: "The parent layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Is Layer Child Of Layer On Layout",
      displayText:
        "Is layer [i]{1}[/i] child of layer [i]{2}[/i] on layout [i]{0}[/i]",
      description: "Test if a layer is a child of another layer on a layout",
    },
    IsLayerRootOnLayout: {
      category: "general",
      forward: "_IsLayerRootOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Is Layer Root On Layout",
      displayText: "Is layer [i]{1}[/i] root on layout [i]{0}[/i]",
      description: "Test if a layer is a root layer on a layout",
    },
    LayerExistsOnLayout: {
      category: "general",
      forward: "_LayerExistsOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Layer Exists On Layout",
      displayText: "Layer [i]{1}[/i] exists on layout [i]{0}[/i]",
      description: "Test if a layer exists on a layout",
    },
    LayerHasChildrenOnLayout: {
      category: "general",
      forward: "_LayerHasChildrenOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "string",
          value: "",
        },
      ],
      listName: "Layer Has Children On Layout",
      displayText: "Layer [i]{1}[/i] has children on layout [i]{0}[/i]",
      description: "Test if a layer has children on a layout",
    },
    IsLayerSublayerOfLayer: {
      category: "general",
      forward: "_IsLayerSublayerOfLayer",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "sub",
          name: "Sub",
          desc: "The sub layer",
          type: "layer",
          value: "",
        },
        {
          id: "root",
          name: "Root",
          desc: "The root layer",
          type: "layer",
          value: "",
        },
        {
          id: "which",
          name: "Which",
          desc: "Wether to test if the sub layer is any sublayer or a direct sublayer",
          type: "combo",
          items: [{ any: "Any" }, { own: "Own" }],
        },
      ],
      listName: "Is Layer Sublayer Of Layer",
      displayText:
        "Is layer [i]{0}[/i] [i]{2}[/i] sublayer of layer [i]{1}[/i]",
      description: "Test if a layer is a sublayer of another layer",
    },
    IsLayerSublayerOfLayerOnLayout: {
      category: "general",
      forward: "_IsLayerSublayerOfLayer",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "sub",
          name: "Sub",
          desc: "The sub layer",
          type: "string",
          value: "",
        },
        {
          id: "root",
          name: "Root",
          desc: "The root layer",
          type: "string",
          value: "",
        },
        {
          id: "which",
          name: "Which",
          desc: "Wether to test if the sub layer is any sublayer or a direct sublayer",
          type: "combo",
          items: [{ any: "Any" }, { own: "Own" }],
        },
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
      ],
      listName: "Is Layer Sublayer Of Layer",
      displayText:
        "Is layer [i]{0}[/i] [i]{2}[/i] sublayer of layer [i]{1}[/i] on layout [i]{3}[/i]",
      description: "Test if a layer is a sublayer of another layer on a layout",
    },
    ObjectIsOnLayer_Parent: {
      category: "general",
      forward: "_ObjectIsOnLayer_Parent",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "object",
          name: "Object",
          desc: "The object",
          type: "object",
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "layer",
          value: "",
        },
        {
          id: "which",
          name: "Which",
          desc: "Wether to test if the sub layer is any sublayer or a direct sublayer",
          type: "combo",
          items: [{ any: "Any" }, { own: "Own" }],
        },
        {
          id: "self",
          name: "Self",
          desc: "Whether to test if the object is on the layer itself",
          type: "combo",
          items: [{ yes: "Self included" }, { no: "Self excluded" }],
        },
      ],
      listName: "Object Is On Parent Layer of",
      displayText: "{0} | Is on {2} parent layer of {1} ({3})",
      description: "Pick all objects on a given layer.",
    },
    ObjectIsOnLayer_Sublayer: {
      category: "general",
      forward: "_ObjectIsOnLayer_Sublayer",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "object",
          name: "Object",
          desc: "The object",
          type: "object",
        },
        {
          id: "layer",
          name: "Layer",
          desc: "The layer",
          type: "layer",
          value: "",
        },
        {
          id: "which",
          name: "Which",
          desc: "Wether to test if the sub layer is any sublayer or a direct sublayer",
          type: "combo",
          items: [{ any: "Any" }, { own: "Own" }],
        },
        {
          id: "self",
          name: "Self",
          desc: "Whether to test if the object is on the layer itself",
          type: "combo",
          items: [{ yes: "Self included" }, { no: "Self excluded" }],
        },
      ],
      listName: "Object Is On Sublayer Of",
      displayText: "{0} | Is on {2} sublayer of {1} ({3})",
      description: "Pick all objects on a given layer.",
    },
  },
  Exps: {
    RootLayerCount: {
      category: "general",
      forward: "_RootLayerCount",
      autoScriptInterface: true,
      highlight: false,
      params: [],
      returnType: "number",
      description: "Get the number of root layers",
    },
    SubLayerCount: {
      category: "general",
      forward: "_SubLayerCount",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "root",
          name: "Root",
          desc: "The root layer",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Get the number of sub layers",
    },
    SubLayerAt: {
      category: "general",
      forward: "_SubLayerAt",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "root",
          name: "Root",
          desc: "The root layer",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index of the sub layer",
          type: "number",
          value: 0,
        },
      ],
      returnType: "string",
      description: "Get the name of a sub layer",
    },
    RootLayerAt: {
      category: "general",
      forward: "_RootLayerAt",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the root layer",
          type: "number",
          value: 0,
        },
      ],
      returnType: "string",
      description: "Get the name of a root layer",
    },
    RootLayerCountOnLayout: {
      category: "general",
      forward: "_RootLayerCountOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Get the number of root layers on a layout",
    },
    SubLayerCountOnLayout: {
      category: "general",
      forward: "_SubLayerCountOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "root",
          name: "Root",
          desc: "The root layer",
          type: "string",
          value: "",
        },
      ],
      returnType: "number",
      description: "Get the number of sub layers on a layout",
    },
    SubLayerAtOnLayout: {
      category: "general",
      forward: "_SubLayerAtOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "root",
          name: "Root",
          desc: "The root layer",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index of the sub layer",
          type: "number",
          value: 0,
        },
      ],
      returnType: "string",
      description: "Get the name of a sub layer on a layout",
    },
    RootLayerAtOnLayout: {
      category: "general",
      forward: "_RootLayerAtOnLayout",
      autoScriptInterface: true,
      highlight: false,
      params: [
        {
          id: "layout",
          name: "Layout",
          desc: "The layout",
          type: "string",
          value: "",
        },
        {
          id: "index",
          name: "Index",
          desc: "The index of the root layer",
          type: "number",
          value: 0,
        },
      ],
      returnType: "string",
      description: "Get the name of a root layer on a layout",
    },
  },
};
