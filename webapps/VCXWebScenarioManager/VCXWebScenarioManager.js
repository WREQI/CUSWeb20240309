define("DS/VCXWebScenarioManager/VCXScenarioManager",["UWA/Utils","DS/CoreEvents/Events","DS/WebApplicationBase/W3AAManager","DS/Visualization/ThreeJS_DS","DS/VCXWebModifiables/VCXModifiableServer","DS/VCXWebProperties/VCXPropertyValueFloat","DS/VCXKeyFramer/VCXKeyFramer","DS/VCXKeyFramer/VCXObjectAnimation","DS/VCXWebTracks/VCXTrack","DS/VCXWebTracks/VCXKey","DS/VCXWebProperties/VCXPropertyMap","DS/VCXKeyFramer/VCXScenario","DS/VCXWebVisibility/VCXIVisibility","DS/VCXWebProperties/VCXPropertyInfo"],function(j,a,g,l,h,n,d,o,m,i,k,c,e,b){var f=g.extend({getUpdatePriority:function(){return -10},init:function(){this._privateModifiableServer=null;this._callback=null;this._parameter=null},initialize:function(){this._privateModifiableServer=new h();this._keyframer=new d(this._privateModifiableServer);this._CurrentScenarioID="";this._Scenarios={};this._FPS=30;this._interFramesMax=-1;this._startScenarioId="";this._startFrame=0;this._timeDelay=0;this._bIsPlaying=false;this._bAutoKey=false;this._maxIndex=0;this._scenariosToPlay={};this._bIsBouncing=false;this._previousFrame=0;this._speed=1;this._TransitionTime=1000},unInitialize:function(){this._CurrentScenarioID="";this.unInitializeScenario();this._Scenarios={};this._FPS=30;this._startScenarioId="";this._bIsPlaying=false;this._bAutoKey=false;this._maxIndex=0;this._scenariosToPlay={};if(this._keyframer){this._keyframer.unInitialize();this._keyframer=null}if(this._privateModifiableServer){this._privateModifiableServer.unInitialize();this._privateModifiableServer=null}},unInitializeScenario:function(){for(var p in this._Scenarios){if(this._Scenarios.hasOwnProperty(p)){this._Scenarios[p].unInitialize()}}},postInitialize:function(){},SetAutoKey:function(p){this._bAutoKey=p},GetAutoKey:function(){return this._bAutoKey},GetIsPlayingCurrentScenario:function(){return this._bIsPlaying},SetIsPlayingCurrentScenario:function(p){var s=this._Scenarios[this._CurrentScenarioID];if(s){var r=this._experienceBase.getManager("VCXVisuManager");if(p){if(s._bIsBouncing){if(s._bIsReverse){var q=-s.GetCurrentFrame()}else{var q=2*this.GetMaxFrame(this._CurrentScenarioID)-s.GetCurrentFrame()}}else{var q=s.GetCurrentFrame()}if(q===0){s.ResetRangeCache()}if(r){r.CameraControlsViewpoint=true}this.InitRestoreSetforPlay();this.PlayScenario(s,q)}else{if(r){r.CameraControlsViewpoint=false}this.StopPlayingScenario(this._CurrentScenarioID)}this._bIsPlaying=p}},SetIsBouncing:function(p){for(var q in this._scenariosToPlay){if(this._scenariosToPlay.hasOwnProperty(q)){var s=this._scenariosToPlay[q];var r=s.scenario;r._bIsBouncing=p}}},PlayScenario:function(t,r,q,s,w,v){if(t){var u=t.GetID();if(u){}else{u=j.getUUID()}var p={};p.scenario=t;p.clockMesure=new l.Clock();p.clockMesure.start();p.timeDelay=0;p.lastRealElapsedTime=0;p.startFrame=r;p._fpsHistory={};this._scenariosToPlay[u]=p;if(typeof s!="undefined"){p.scenario.SetIsBounce(s)}if(typeof q!="undefined"){p.scenario.SetIsLoop(q)}if(typeof w!="undefined"){p.scenario.SetIsReverse(w)}if(typeof v!="undefined"){p.scenario.SetSpeed(v)}this.UpdateProperties2(t,r);if(p.scenario._bIsReverse){p.startFrame=this.GetMaxFrame(u)-r}return u}},StopPlayingScenario:function(u){if(this._scenariosToPlay[u]){var v=this._scenariosToPlay[u]._fpsHistory;var p=0;var s=0;var q=-1;for(var r in v){if(v.hasOwnProperty(r)){q=r;s+=v[r];p++}}if(q!=-1){s-=v[q];p--;delete v[q]}if(p>1){s/=p;console.log("[PERFO] fpsMoyenne "+s);var t=0;for(var r in v){if(v.hasOwnProperty(r)){t+=(v[r]-s)*(v[r]-s)}}t=Math.sqrt(t/(p-1));console.log("[PERFO] fpsEcartType "+t)}delete this._scenariosToPlay[u]}},GetScenarios:function(){return this._Scenarios},GetScenariosFromType:function(r){var q={};for(var p in this._Scenarios){if(this._Scenarios.hasOwnProperty(p)){var s=this._Scenarios[p];if(s.GetScenarioType()===r){q[p]=s}}}return q},SetDefaultInterpolator:function(p,q){this._keyframer.SetDefaultInterpolator(p,q)},GetDefaultInterpolator:function(p){return this._keyframer.GetDefaultInterpolator(p)},SetStartingScenarioId:function(p){this._startScenarioId=p},GetStartingScenarioId:function(){return this._startScenarioId},GetFPS:function(){return this._FPS},SetFPS:function(p){this._FPS=p},SetInterFramesMax:function(p){this._interFramesMax=p},GetInterFramesMax:function(){return this._interFramesMax},SetTransitionTime:function(p){this._TransitionTime=p},GetTransitionTime:function(){return this._TransitionTime},SetCurrentFrame:function(q){var p=this._Scenarios[this._CurrentScenarioID];if(p){p.SetCurrentFrame(q)}},GetCurrentFrame:function(){var p=this._Scenarios[this._CurrentScenarioID];if(p){return p.GetCurrentFrame()}else{return 0}},GetCurrentTime:function(){var p=this._Scenarios[this._CurrentScenarioID];if(p){var r=p.GetCurrentFrame();var q=r/this.GetFPS();return q}else{return 0}},AddScenario:function(q,p){p.SetID(q);this.AddScenario2(p)},AddScenario2:function(p){var r=p.GetID();if(r){}else{this._experienceBase.ComponentsMap.AddComponent(p);r=p.GetID()}var s=p.GetPersistency();var t=this._Scenarios[r];if(t){}else{if(s===0){this._maxIndex++}}this._Scenarios[r]=p;var q=p.QueryInterface("VCXIModifiable");this.ModifiableServer.AddModifiable(q)},RemoveScenario:function(p){if(this._CurrentScenarioID===p){this._CurrentScenarioID=""}delete this._Scenarios[p]},SetCurrentScenario:function(p){if(this._Scenarios[p]){this._CurrentScenarioID=p}},GetCurrentScenario:function(){return this._CurrentScenarioID},AddObjectAnimation:function(r,p,s){this.ModifiableServer.AddModifiable(r);var q=r.GetHashing();p.AddObjectAnimation(q,s)},RemoveObjectAnimation:function(q,p){p.RemoveObjectAnimation(q)},AddNeutrals:function(q,p){this._keyframer.AddNeutrals(q,p)},RemoveNeutrals:function(p){this._keyframer.RemoveNeutrals(p)},GetNeutrals:function(p){return this._keyframer.GetNeutrals(p)},RestoreNeutralPropertiesOneModifiable:function(p){this._keyframer.RestoreNeutralPropertiesOneModifiable(p)},RestoreNeutralProperties:function(){this._keyframer.RestoreNeutralProperties(null)},AddPropertyToRestoreSet:function(q,p){if(!this._bIsPlaying){this._keyframer.AddPropertyToRestoreSet(q,p)}},RemoveModifiableFromRestoreSet:function(q){var p=this.ModifiableServer.GetModifiableFromHashing(q);this._keyframer.EmptyRestoreSetOneModifiable(p)},InitRestoreSetFromNeutrals:function(p){this._keyframer.InitRestoreSetFromNeutrals(p)},InitRestoreSetforPlay:function(){var p=this._Scenarios[this._CurrentScenarioID];if(p){this._keyframer.InitRestoreSetforPlay(p)}},GetNewFrame:function(q){var s=q.clockMesure.getElapsedTime();var r=s-q.lastRealElapsedTime;q.lastRealElapsedTime=s;var x=0;if(this._interFramesMax!=-1){var v=this._interFramesMax/(this.GetFPS()*q.scenario._speed);if(r>v){x=r-v;q.timeDelay+=x}}var t=q.clockMesure.getElapsedTime()-q.timeDelay;var p=q.startFrame+(t*this.GetFPS()*q.scenario._speed);var u=Math.floor(s);var w=q._fpsHistory[u];if(typeof w==="undefined"){q._fpsHistory[u]=1}else{q._fpsHistory[u]++}return p},update:function(t){for(var p in this._scenariosToPlay){if(this._scenariosToPlay.hasOwnProperty(p)){var s=this._scenariosToPlay[p];var u=this.GetNewFrame(s);var r=s.scenario;var q=r.GetMaxFrame();if(r.GetSequenceMaxFrame()!==null){q=r.GetSequenceMaxFrame()}if(r._bIsLoop){if(r._bIsBounce){if(r._bIsReverse&&s.startFrame>=q&&!r._bIsBouncing){u=u-q}}if(u>=q){if(!r._bIsBounce){u=u%q}else{if(!r._bIsBouncing){if((u%q)<this._previousFrame){u=q-u%q;r._bIsBouncing=true}else{u=u%q}}else{if((q-u%q)>this._previousFrame){u=u%q;r._bIsBouncing=false}else{u=q-u%q}}}}this._previousFrame=u;if(r._bIsReverse){u=q-u%q}r.SetCurrentFrame(u);this.UpdateProperties2(r,u)}else{if(r._bIsBounce){if(r._bIsReverse&&s.startFrame>=q&&!r._bIsBouncing){u=u-q}if(u>=q){if(u>(2*q-this._startFrame)){if(r._bIsReverse){r.SetCurrentFrame(q);this.UpdateProperties2(r,q);r._bIsBouncing=false}else{r.SetCurrentFrame(0);this.UpdateProperties2(r,0);r._bIsBouncing=false}this.StopPlayingScenario(p);r._bIsBouncing=false;r.SetSequenceMaxFrame(null);if(p===this._CurrentScenarioID){this._bIsPlaying=false;a.publish({event:"VCX_SCENARIO_END_REACHED"});if(this._callback){this._callback(this._parameter);this._callback=null;this._parameter=null}}a.publish({event:"VCX_SCENARIO_PLAY_END_REACHED",data:p})}else{u=q-u%q;r._bIsBouncing=true;if(r._bIsReverse){u=q-u%q}r.SetCurrentFrame(u);this.UpdateProperties2(r,u)}}else{if(r._bIsReverse){u=q-u%q}r.SetCurrentFrame(u);this.UpdateProperties2(r,u)}}else{if((r._bIsReverse&&s.startFrame>=q&&u>=2*q)||(r._bIsReverse&&s.startFrame<q&&u>=q)||(!r._bIsReverse&&u>=q)){if(r._bIsReverse){r.SetCurrentFrame(0);this.UpdateProperties2(r,0)}else{r.SetCurrentFrame(q);this.UpdateProperties2(r,q)}this.StopPlayingScenario(p);r._bIsBouncing=false;r.SetSequenceMaxFrame(null);this._previousFrame=u;if(p===this._CurrentScenarioID){this._bIsPlaying=false;a.publish({event:"VCX_SCENARIO_END_REACHED"});if(this._callback){this._callback(this._parameter);this._callback=null;this._parameter=null}}a.publish({event:"VCX_SCENARIO_PLAY_END_REACHED",data:p})}else{if(r._bIsReverse){u=q-u%q}r.SetCurrentFrame(u);this.UpdateProperties2(r,u)}}}}}},SetCallback:function(q,p){this._callback=q;this._parameter=p},UpdateProperties2:function(q,p){this._keyframer.UpdateProperties(q,p)},UpdateProperties:function(q,r){var p=this._Scenarios[this._CurrentScenarioID];if(p){this._keyframer.UpdateProperties(p,this.GetCurrentFrame(),q,r)}},UpdateProperty:function(q,r){var p=this._Scenarios[this._CurrentScenarioID];if(p){this._keyframer.UpdateProperty(p,this.GetCurrentFrame(),q,r)}},ApplyScenarioVisibility:function(q){var p=this._Scenarios[q];if(p){this.ApplyVisibility(p)}},ApplyVisibility:function(C){var u=C.GetVisibility();if(u){var t=u.GetMode();var B=this._experienceBase.ComponentsMap.GetComponentTable();for(var r in B){if(B.hasOwnProperty(r)){var w=B[r];if(w){if(!w.IsKindOf("VCXWebComponentOccurrence")){continue}var y=w.QueryInterface("VCXIVisibility");if(y){var p=u.IsVisibleWithParents(w);if(t===0){if(p===1){y.SetVisibility(e.EVisState.Visible)}else{if(p===0){y.SetVisibility(e.EVisState.Hidden)}}}else{if(t===1){if(p===1){y.SetVisibility(e.EVisState.Visible)}else{y.SetVisibility(e.EVisState.Hidden)}}else{if(t===2){if(p===0){y.SetVisibility(e.EVisState.Hidden)}else{y.SetVisibility(e.EVisState.Visible)}}}}}}}}var s=this._experienceBase.getManager("VCXDressupManager");if(s){var A=s.getDressups();for(var q in A){if(A.hasOwnProperty(q)){var w=A[q];if(w){var y=w.QueryInterface("VCXIVisibility");if(y){if(u.FindVisibleCollab(w.GetID())>=0){y.SetVisibility(e.EVisState.Visible);var v=w.QueryInterface("VCXIModifiable");if(v&&!C.GetIsTransition()){var x=new n();x.SetValue(1);v.OnChangeProperty("Actor.Visibility.Opacity",x);v.OnChangePropertiesEnd()}}else{if(C.GetApplyNeutralAtGoToScenario()||C.GetIsTransition()){y.SetVisibility(e.EVisState.Hidden)}}}}}}}var z=this._experienceBase.getManager("VCXContextManager");if(z){z.traverseGraphMustBePerformed=true}}},CaptureDiffOfNeutrals:function(v,w){if(v===null){v=new k()}var u=this._keyframer._restoreSet;for(var y in u){if(u.hasOwnProperty(y)){var A=this.ModifiableServer.GetModifiableFromHashing(y);if(w){if(A.IsLiving()===false){continue}}var z=A.GetRequiredPropertiesForTransition();if(z){for(var p in z){if(z.hasOwnProperty(p)){var q=A.GetProperty(p);if(q){v.AddOrModifyProperty(y,q)}}}}var r=this.GetNeutrals(y);if(r){var x=u[y];for(var s in x){if(x.hasOwnProperty(s)){var t=r.GetProperty(s);if(t){var q=A.GetProperty(s);if(q){if(q.GetPropertyInfo().GetBehaviorType()!==b.EBehaviorType.Singleton){if(!q.GetPropertyValue().IsEqualTo(t.GetPropertyValue())){v.AddOrModifyProperty(y,q)}}}}}}}}}},CaptureInScenario:function(z,w,p,D){var C=this.ModifiableServer.GetHashTable();for(var r in C){if(C.hasOwnProperty(r)){var B=r;var t=C[B];if(t.GetObject().IsKindOf("VCXScenario")){continue}if(p===false){if(t.GetObject().IsKindOf("VCXWebComponentCamera")||t.GetObject().IsKindOf("VCXComponentCamera")){continue}}if(D===false){var x=false;if(t._type===1){if(t._var._bIsCamera){x=true}}if(!x){continue}}var u=z.GetObjectAnimation(B);if(u===null){u=new o();z.AddObjectAnimation(B,u)}var y=t.GetProperties(true);var s=[];y.GetListPropertyNames(s);for(var E=0;E<s.length;E++){var F=s[E];var q=y.GetProperty(F);if(q&&q.GetPropertyValue()){var v=q.GetPropertyValue();if(v){var A=u.GetTrack(F);if(A===null){A=new m();u.AddTrack(F,A)}var G=new i();G.SetFrame(w);G.SetValue(v);A.AddKey(G)}}}}}},CaptureInPropMap:function(v){if(v===null){v=new k()}var p=this.ModifiableServer.GetHashTable();for(var s in p){if(p.hasOwnProperty(s)){var w=s;var y=p[w];var r=y.GetProperties(true);if(r){var x=[];r.GetListPropertyNames(x);for(var u=0;u<x.length;u++){var t=x[u];var q=r.GetProperty(t);if(q){if(q.GetPropertyValue()._bUndefined===true){}else{v.AddOrModifyProperty(w,q)}}}}}}},GetMaxFrame:function(r){var q=0;var p=this._Scenarios[r];if(p){q=p.GetMaxFrame()}return q},CaptureCurrentVisibility:function(u){if(u){var v=u.GetVisibility();if(v){v.Empty();var t=v.GetMode();var r=this._experienceBase.ComponentsMap.GetComponentFromType("VCXWebComponentOccurrence");for(var q=0;q<r.length;q++){var x=r[q];if(x){var y=x.QueryInterface("VCXIVisibility");if(y){var w=y.GetVisibility();if(t===0){if(w!==e.EVisState.Hidden){v.AddVisible(x)}else{v.AddInvisible(x)}}else{if(t===1){if(w!==e.EVisState.Hidden){v.AddVisible(x)}}else{if(t===2){if(w===e.EVisState.Hidden){v.AddInvisible(x)}}}}}}}var z=null;var s=this._experienceBase.getManager("VCXDressupManager");if(s){z=s.getDressups()}for(var p in z){if(z.hasOwnProperty(p)){var x=z[p];if(x){var y=x.QueryInterface("VCXIVisibility");if(y){var w=y.GetVisibility();if(w!==e.EVisState.Hidden){v.AddVisibleCollab(x)}}}}}u.SetVisibility(v)}}},ApplyView:function(q,p){if(p){}else{this.ApplyVisibility(q)}if(q._bApplyNeutralAtGoToScenario){this._keyframer.RestoreNeutralProperties(q)}this.UpdateProperties2(q,0)},CaptureCurrentView:function(v){var s=this._experienceBase.Factory.BuildComponent("VCXScenario");var p=c.EScenarioType.Scenario;if(v&&typeof v.scenarioType!=="undefined"){p=v.scenarioType}s.SetScenarioType(p);var r=1;if(v&&typeof v.visibilityMode!=="undefined"){r=v.visibilityMode}s.GetVisibility().SetMode(r);var t=2;if(v&&typeof v.persistency!=="undefined"){t=v.persistency}s.SetPersistency(t);var u=false;if(v&&typeof v.bIsPartialView!=="undefined"){u=v.bIsPartialView}if(u){s.SetApplyNeutralAtGoToScenario(false)}this.CaptureCurrentVisibility(s);var q;if(v&&typeof v.propMapDiffNeutrals!=="undefined"){q=v.propMapDiffNeutrals}if(q){}else{q=new k()}this.CaptureDiffOfNeutrals(q,true);s.SetPropertyMapAtFrame(q,0);return s},ChangeProperties:function(p){for(var r in p._map){if(p._map.hasOwnProperty(r)){var t=this.ModifiableServer.GetModifiableFromHashing(r);var q=p.GetPropertySet(r);for(var u in q._map){if(q._map.hasOwnProperty(u)){var s=q._map[u];t.OnChangeProperty(u,s.GetPropertyValue())}}t.OnChangePropertiesEnd()}}},ChangePropertiesPropSet:function(r,p){for(var s in p._map){if(p._map.hasOwnProperty(s)){var q=p._map[s];r.OnChangeProperty(s,q.GetPropertyValue())}}r.OnChangePropertiesEnd()}});Object.defineProperty(f.prototype,"ModifiableServer",{enumerable:true,get:function(){return this._privateModifiableServer}});Object.defineProperty(f.prototype,"componentType",{enumerable:true,get:function(){return"VCXScenarioManager"}});return f});define("DS/VCXWebScenarioManager/VCXModifiableScenarioManager",["DS/VCXWebModifiables/VCXModifiable","DS/VCXWebProperties/VCXPropertySet","DS/VCXWebProperties/VCXProperty","DS/VCXWebProperties/VCXPropertyInfo","DS/VCXWebProperties/VCXPropertyValueFloat","DS/VCXWebProperties/VCXPropertyValueString","DS/VCXWebProperties/VCXPropertyValueInt"],function(c,h,d,e,b,a,g){var f=c.extend({init:function(){this._parent()},OnChangeProperty:function(j,i){if(j==="ScenarioManager.InterFramesMax"){this.GetObject().SetInterFramesMax(i.GetValue())}else{if(j==="ScenarioManager.FPS"){this.GetObject().SetFPS(i.GetValue())}else{if(j==="ScenarioManager.TransitionTime"){this.GetObject().SetTransitionTime(i.GetValue())}else{if(j==="ScenarioManager.startScenarioId"){this.GetObject().SetStartingScenarioId(i.GetValue())}else{console.log("property not found!");return false}}}}return true},GetProperty:function(k){var i=null;if(k==="ScenarioManager.FPS"){var m=new b();m.SetValue(this.GetObject().GetFPS());i=new d(new e(k,2),m)}else{if(k==="ScenarioManager.InterFramesMax"){var l=new g();l.SetValue(this.GetObject().GetInterFramesMax());i=new d(new e(k,2),l)}else{if(k==="ScenarioManager.startScenarioId"){var j=new a();j.SetValue(this.GetObject().GetStartingScenarioId());i=new d(new e(k,2),j)}else{if(k==="ScenarioManager.TransitionTime"){var m=new b();m.SetValue(this.GetObject().GetTransitionTime());i=new d(new e(k,2),m)}}}}return i},GetProperties:function(){var i=new h();i.AddOrModifyProperty(this.GetProperty("ScenarioManager.FPS"));i.AddOrModifyProperty(this.GetProperty("ScenarioManager.InterFramesMax"));i.AddOrModifyProperty(this.GetProperty("ScenarioManager.startScenarioId"));i.AddOrModifyProperty(this.GetProperty("ScenarioManager.TransitionTime"));return i}});return f});