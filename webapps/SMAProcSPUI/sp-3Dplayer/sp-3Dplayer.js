(function(d){var a=d.Polymer;var b=function(f){if(f.asset.title){this.simTitle=f.asset.title}else{this.simTitle="Simulation"}this.style.display="block";var h=this;setTimeout(function(){Polymer.dom(h.$.player).classList.add("in")},50);if(!h.player){var g=this.$.playerCanvas;require(["UWA/Drivers/Alone"],function(i){h.player=new Player3DShare(g,f,{fullScreen:false,mode:"review",loading:"autoplay"})})}else{h.player.getExperience().load(f)}};var e=function(){Polymer.dom(this.$.overlay).classList.remove("in");Polymer.dom(this.$.player).classList.remove("in");var f=this;setTimeout(function(){f.style.display="none";f.player.getExperience().unload();f.simTitle="Simulation"},150)};var c=function(){this.$.playerCanvas.style.height=this.height+"px"};d.SP3DPlayer=Polymer({is:"sp-3Dplayer",properties:{height:{type:Number,value:500,notify:true},player:{value:null},simTitle:{type:String,value:""},width:{type:Number,value:600,notify:true}},open:function(){return b.apply(this,arguments)},close:function(){return e.apply(this,arguments)},ready:function(){return c.apply(this,arguments)},behaviors:[SPBase]})}(this));