define("DS/SMAProcWebAuthoringUI/CustomAdapterEditor",["DS/SMAProcWebCommonControls/Polymer","DS/SMAProcWebCommonControls/utils","DS/SMAProcWebAuthoringControls/WebUXDialog","DS/SMAProcWebAuthoringUI/CustomAdapterList"],function(c,a){var b='<dom-module id="cmp-customadapter-editor"><template><cmp-wux-dialog id="customadapterDialog" title="List of Custom Adapters" height="300" ok-button-flag movable-flag resizable-flag maximize-button-flag my-position="center" at-position="right"><dialogcontent><cmp-customadapter-list></cmp-customadapter-list></dialogcontent></cmp-wux-dialog></template></dom-module>';a.registerDomModule(b);return c({is:"cmp-customadapter-editor",listeners:{"customadapterDialog.cmp-wux-ok-clicked":"onDialogOk","customadapterDialog.cmp-wux-closed":"onDialogClose"},ready:function(){this.$.customadapterDialog.show()},onDialogOk:function(){this.$.customadapterDialog.hide()},onDialogClose:function(){this.$.customadapterDialog.hide()}})});