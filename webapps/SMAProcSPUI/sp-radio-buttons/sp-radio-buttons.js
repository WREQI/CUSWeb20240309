(function(b){var a;a={optionselect:"optionselect"};b.Polymer({is:"sp-radio-buttons",properties:{options:{notify:true,observer:"optionsChanged"},selectedindex:{type:Number,value:0,notify:true,reflectToAttribute:true},optionsicon:{value:"",notify:true,observer:"optionsiconChanged"},_labelarr:{type:Array,notify:true,readonly:true},selectedoption:{type:String,notify:true}},attached:function(){Polymer.dom.flush();var c=Polymer.dom(this.root).querySelector('input[id="rdo_'+this.id+"_"+this.selectedindex+'"]');if(c){c.checked=true;this.selectedoption=this.getSelectedoption()}else{console.warn("<"+this.is+"> could not select element: rdo_"+this.id+"_"+this.selectedindex)}},optionsChanged:function(){this._labelarr=this.options.split(",")||this._labelarr},optionsiconChanged:function(){this._labelarricon=this.optionsicon.split(",")||this._labelarricon},_onOptionselect:function(c){this.selectedindex=c.model.labelindex;this.selectedoption=this.getSelectedoption();this.fire(a.optionselect,{selectedindex:this.selectedindex,selectedoption:this.selectedoption})},getSelectedoption:function(){return this.options.split(",")[this.selectedindex]},behaviors:[SPBase],computeFor:function(d,c){return d+c},computeChecked:function(c,d){return c==d},_getId:function(c){return"rdo_"+this.id+"_"+c},_iconClass:function(d,c){return"fonticon fonticon-"+d[c]+" label-icon-class"},_labelClass:function(c){return c&&c!==""?"btn btn-primary remove-padding":"btn btn-primary"},_getTitle:function(d,c){return d&&d!==""?c:""},_optionsiconPresent:function(c){return c&&c!==""}})}(this));