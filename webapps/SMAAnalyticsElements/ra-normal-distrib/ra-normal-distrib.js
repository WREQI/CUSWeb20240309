(function(){var b="http://www.w3.org/2000/svg";var a;a={is:"ra-normal-distrib",behaviors:[SPBase],properties:{stddev:{type:Number,observer:"_adjust",notify:true},mean:{type:Number,observer:"_adjust",notify:true},minval:{type:Number,observer:"_adjust"},maxval:{type:Number,observer:"_adjust"},orientation:{type:String,value:"horizontal",observer:"_adjust"},colorstroke:{type:String,value:"rgba(0,135,163,1)",observer:"_adjustColors"},colorfill:{type:String,value:"rgba(0,135,163,.2)",observer:"_adjustColors"},upperfailvalue:{type:Number,observer:"_upperChange"},lowerfailvalue:{type:Number,observer:"_lowerChange"},precision:{type:Number,value:6,observer:"_precisionChange"},outofdate:{value:false,type:Boolean,observer:"_outOfDate"}},_outOfDate:function(){if(this.outofdate){this.set("colorstroke","rgba(140,140,140,1)");this.set("colorfill","rgba(140,140,140,.2)")}else{this.set("colorstroke","rgba(0,135,163,1)");this.set("colorfill","rgba(0,135,163,.2)")}},_precisionChange:function(){if(this.precision<0&&this.precision>=15){this.precision=6}if(typeof this.upperfailvalue!=="undefined"&&this.upperfailvalue!==null){this._upperChange()}if(typeof this.lowerfailvalue!=="undefined"&&this.lowerfailvalue!==null){this._lowerChange()}},_toExponent:function(c){if(c===0){return c}var d=parseFloat(c).toExponential(this.precision);if(isNaN(d)){d=""}return d},_upperChange:function(){var c=this._toExponent(this.upperfailvalue);if(c!==""){c='"PoF: '+c+'"'}else{c='""'}this.customStyle["--ra-norm-fail-upper"]=c;this.updateStyles()},_lowerChange:function(){var c=this._toExponent(this.lowerfailvalue);if(c!==""){c='"PoF: '+c+'"'}else{c='""'}this.customStyle["--ra-norm-fail-lower"]=c;this.updateStyles()},_adjustColors:function(){this.customStyle["--ra-norm-stroke"]=this.colorstroke;this.customStyle["--ra-norm-fill"]=this.colorfill},_adjust:function(){if(this.stddev>=0){this.customStyle["--ra-norm-display"]="visible"}else{this.customStyle["--ra-norm-display"]="hidden";this.updateStyles();return}var f=1,g=200,e=200;if(this.stddev&&this.minval&&this.maxval){e=this.stddev*6;g=this._adjustRange();f=e/g}else{return}var c=(g/2)+this.minval,k=this.mean;if(isNaN(k)||typeof k==="undefined"||k===null){k=c}var h=this.orientation==="vertical"?this._bbox.height:this._bbox.width;var j=k-(e/2)-this.minval,i=j+e,d=200/g;j=j*d;i=i*d;this.lineFront.setAttribute("x2",j);this.lineBack.setAttribute("x1",i);if(this.orientation==="vertical"){this.svg.setAttribute("viewBox","0 0 50 200");this.container.setAttribute("transform","scale(1 -1) rotate(90) translate(-200 -50)")}else{this.svg.setAttribute("viewBox","0 0 200 50");this.container.removeAttribute("transform")}this.curve.setAttribute("transform","translate("+j+" 0) scale("+f+" 1)");this.updateStyles()},_adjustRange:function(){var c=this.maxval-this.minval;this.svg.setAttribute("height",this._bbox.height);this.svg.setAttribute("width",this._bbox.width);return c},_adjustWidth:function(){this._bbox=this.svg.getBoundingClientRect();this._adjust()},_getCurve:function(e){var c=[0,61,72,100,128,139,200],d=[49.6,49.6,0.6,0.6,0.6,49.6,49.6]},created:function(){this.svg=document.createElementNS(b,"svg");this.container=document.createElementNS(b,"g");this.lineFront=document.createElementNS(b,"line");this.curve=document.createElementNS(b,"g");this.curvePath=document.createElementNS(b,"path");this.lineBack=document.createElementNS(b,"line");this.svg.setAttribute("viewBox","0 0 200 50");this.svg.setAttribute("preserveAspectRatio","none");this.lineFront.setAttribute("x1","0");this.lineFront.setAttribute("y1","49.6");this.lineFront.setAttribute("x2","0");this.lineFront.setAttribute("y2","49.6");this.curvePath.setAttribute("d","M 0 49.6 C 61 49.6, 72 .6, 100 .6 C 128 .6, 139 49.6, 200 49.6");this.lineBack.setAttribute("x1","200");this.lineBack.setAttribute("y1","49.6");this.lineBack.setAttribute("x2","200");this.lineBack.setAttribute("y2","49.6");this.curve.appendChild(this.curvePath);this.container.appendChild(this.lineFront);this.container.appendChild(this.curve);this.container.appendChild(this.lineBack);this.svg.appendChild(this.container)},ready:function(){this.appendChild(this.svg);this._adjustWidth()}};window.Polymer(a)})();