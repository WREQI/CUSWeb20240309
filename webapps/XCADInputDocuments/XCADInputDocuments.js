define("DS/XCADInputDocuments/XCADFaceData",[],function(){function a(){this.vertices=[];this.normals=[];this.singleTrianglesIndices=[];this.stripTrianglesIndices=[];this.nbVertexPerStripTriangle=[];this.fanTrianglesIndices=[];this.nbVertexPerFanTriangle=[]}a.prototype={getFanTrianglesVertexPosition:function(b){return b},getNormalsNumber:function(){return(this.normals===undefined?0:this.normals.length/3)},getSingleTrianglesNumber:function(){return(this.singleTrianglesIndices===undefined?0:this.singleTrianglesIndices.length/3)},getStripTrianglesVertexPosition:function(b){return b},getVerticesNumber:function(){return(this.vertices===undefined?0:this.vertices.length/3)},setNormalAt:function(d,b,f,e){var c=d*3;this.normals[c++]=b;this.normals[c++]=f;this.normals[c]=e}};return a});define("DS/XCADInputDocuments/XCADProductInstance",[],function(){function a(){throw"Error: cannot instantiate abstract class"}a.prototype={getGeometricProperties:function(){throw"Error: not implemented method"},getInstanceAttributes:function(){throw"Error: not implemented method"},getReferenceProduct:function(){throw"Error: not implemented method"},getUID:function(){throw"Error: not implemented method"},getTransformation:function(){throw"Error: not implemented method"}};return a});function inherit(c){if(c===null){throw new TypeError()}if(Object.create){return Object.create(c)}var a=typeof c;if(a!=="object"&&a!=="function"){throw new TypeError()}function b(){}b.prototype=c;return new b()}function extend(b,a){for(var c in a){if(c!==undefined){b[c]=a[c]}}return b}Object.defineProperty(Object.prototype,"extend",{writable:true,enumerable:false,configurable:true,value:function(d){var b=Object.getOwnPropertyNames(d);for(var a=0;a<b.length;a++){if(b[a] in this){continue}var c=Object.getOwnPropertyDescriptor(d,b[a]);Object.defineProperty(this,b[a],c)}}});function defineSubclass(d,b,a,c){b.prototype=inherit(d.prototype);b.prototype.constructor=b;if(a){extend(b.prototype,a)}if(c){extend(b,c)}return b}Function.prototype.extend=function(b,a,c){return defineSubclass(this,b,a,c)};function enumeration(c){var d=function(){throw"Can't Instantiate Enumerations"};var b=d.prototype={constructor:d,toString:function(){return this.name},valueOf:function(){return this.value},toJSON:function(){return this.name}};d.values=[];for(var a in c){if(a!==undefined){var f=inherit(b);f.name=a;f.value=c[a];d[a]=f;d.values.push(f)}}d.foreach=function(g,h){for(var e=0;e<this.values.length;e++){g.call(h,this.values[e])}};return d}define("DS/XCADInputDocuments/XCADInputDocument",[],function(){function a(){throw"Error: cannot instantiate abstract class"}a.prototype={close:function(){throw"Error: not implemented method"},getGeomRep:function(b){throw"Error: not implemented method"},getInstanceList:function(b){throw"Error: not implemented method"},getReferencedFiles:function(){throw"Error: not implemented method"},getReferenceName:function(b){throw"Error: not implemented method"},getRepresentation:function(b){throw"Error: not implemented method"},getRepresentationType:function(b){throw"Error: not implemented method"},getTransformation:function(b){throw"Error: not implemented method"},getRootProducts:function(){throw"Error: not implemented method"},initialize:function(b){throw"Error: not implemented method"}};return a});define("DS/XCADInputDocuments/XCADRepresentation",[],function(){function a(){throw"Error: cannot instantiate abstract class"}a.XCAD_BOUNDARY_REPRESENTATION="BoundaryRepresentation";a.XCAD_PRODUCT_REPRESENTATION="ProductStructureRepresentation";a.XCAD_TESSELLATED_REPRESENTATION="TessellatedRepresentation";a.XCAD_TESSELLATED_ANNOTATION_REPRESENTATION="TessellatedAnnotationRepresentation";a.prototype={getAssociatedDocument:function(){return this._associatedDocument},getName:function(){return this._name},getRepresentationType:function(){return this._representationType}};return a});define("DS/XCADInputDocuments/XCADTessellatedRepresentation",["DS/XCADInputDocuments/XCADInputDocument","DS/XCADInputDocuments/XCADRepresentation"],function(b,c){function a(d,f,e){throw"Error: cannot instantiate abstract class"}a.KindOfNode=enumeration({NOD_ContainerNode:1,NOD_SolidNode:2,NOD_SurfacicNode:3,NOD_CustomNode:4,NOD_CoordinateSystem:5,NOD_GP:6,NOD_Unknown:7});a.KindOfGP=enumeration({GP_Face:1,GP_Plane:2,GP_Cylinder:3,GP_Cone:4,GP_Sphere:5,GP_Edge:6,GP_Line:7,GP_Circle:8,GP_Point:9,GP_Grid:10,GP_Unknown:11});var a=c.extend(a,{getChild:function(e,d){throw"Error: not implemented method"},getChildCount:function(d){throw"Error: not implemented method"},getCircleData:function(d){throw"Error: not implemented method"},getConeData:function(d){throw"Error: not implemented method"},getCoordinateSystem:function(d){throw"Error: not implemented method"},getCylinderData:function(d){throw"Error: not implemented method"},getEdgeData:function(d){throw"Error: not implemented method"},getFaceData:function(d){throw"Error: not implemented method"},getGPType:function(d){throw"Error: not implemented method"},getNodeBoundingSphere:function(d){throw"Error: not implemented method"},getNodeColor:function(d){throw"Error: not implemented method"},getNodeOrientationMatrix:function(d){throw"Error: not implemented method"},getNodeType:function(d){throw"Error: not implemented method"},getNodeUID:function(d){throw"Error: not implemented method"},getPlaneData:function(d){throw"Error: not implemented method"},getPointData:function(d){throw"Error: not implemented method"},getPolyLineData:function(d){throw"Error: not implemented method"},getRootNode:function(d){throw"Error: not implemented method"},getRootNodesCount:function(){throw"Error: not implemented method"},getSAG:function(d){throw"Error: not implemented method"},getSphereData:function(d){throw"Error: not implemented method"}});return a});define("DS/XCADInputDocuments/XCADProduct",["DS/XCADInputDocuments/XCADInputDocument"],function(){function a(b){throw"Error: cannot instantiate abstract class"}a.SourceTypes=enumeration({Made:1,Bought:2,Unknown:3});a.prototype={getDocument:function(){throw"Error: not implemented method"},getFilePath:function(){throw"Error: not implemented method"},getGeometricProperties:function(){throw"Error: not implemented method"},getInstanceList:function(){throw"Error: not implemented method"},getProductAttributes:function(){throw"Error: not implemented method"},getUID:function(){throw"Error: not implemented method"}};return a});define("DS/XCADInputDocuments/XCADProductRepresentation",["DS/XCADInputDocuments/XCADRepresentation"],function(b){var a=b.extend(function a(){throw"Error: cannot instantiate abstract class"},{getRootProducts:function(){return this._rootProducts}});return a});