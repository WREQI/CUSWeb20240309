define("DS/ENOCharacteristicsWebApp/models/CharacteristicsCategoryModel",["UWA/Class/Model","DS/Tree/TreeNodeModel","DS/ENOCharacteristicsWebApp/utils/Constants"],function(c,d,b){var a=c.extend({mOwnerItem:null,mCharCategory:null,mTreeNodeModel:null,mNumNodes:0,setup:function(e){this.mCharCategory=e.iCharCategory;this.mOwnerItem=e.iOwnerItem;this.mTreeNodeModel=new d({label:"",grid:{title:e.iCharCategory,itemId:e.iOwnerItem.mObjectId,},});this.mTreeNodeModel.setAttribute("ownerModel",this);this.mTreeNodeModel.setAttribute("modelType",b.CHARACTERISTICS_CATEGORY_MODEL_TYPE);this.mTreeNodeModel.onSelect(function(){var f=this;if(f===undefined||f===window){return}if(f.getChildren()){f.getChildren().forEach(function(g){if(!g.isHidden()){g.select()}})}});this.mTreeNodeModel.onUnselect(function(){var f=this;if(f===undefined||f===window){return}if(f.getChildren()){f.getChildren().forEach(function(g){if(!g.isHidden()&&g.isSelected()){g.unselect()}})}});return},copyDataFromNodeModel:function(f){var e=this;e.mTreeNodeModel.setLabel(f.label);e.mTreeNodeModel.setAttribute("charCategory",f.grid.charCategory);e.mTreeNodeModel.setAttribute("ownerModel",this);e.mNumNodes=f.children.length},removeCategory:function(){for(var e=0;e<this.mOwnerItem.mCharCategoryList.length;e++){if(this.mTreeNodeModel.options.label.indexOf(this.mOwnerItem.mCharCategoryList[e].mCharCategory)>-1){this.mOwnerItem.mCharCategoryList.splice(e,1);break}}this.mTreeNodeModel.remove()},updateCategory:function(){if(this.mTreeNodeModel.hasChildren()){this.mNumNodes=this.mTreeNodeModel.getChildren().length;var f=this.mCharCategory+" ("+this.mNumNodes+")";this.mTreeNodeModel.setLabel(f);this.mTreeNodeModel.setAttribute("charCategory",f)}else{for(var e=0;e<this.mOwnerItem.mCharCategoryList.length;e++){if(this.mTreeNodeModel.options.label.indexOf(this.mOwnerItem.mCharCategoryList[e].mCharCategory)>-1){this.mOwnerItem.mCharCategoryList.splice(e,1);break}}this.mTreeNodeModel.remove()}},});return a});