/*!  Copyright 2018 Dassault Systemes. All rights reserved. */
define("DS/SMAPoweredByViews/Skeleton/Renderers/ADJobRenderer",["DS/W3DXComponents/Skeleton","DS/SMAPoweredByState/ad-state-store","DS/SMAPoweredByState/ad-state-domain-jobs/selectors","DS/SMAPoweredByState/ad-state-app-alerts/actions","DS/SMAPoweredByState/ad-state-app-alerts/selectors","DS/SMAPoweredByState/ad-state-redux-observer","DS/SMAPoweredByViews/Utils/ADMonitorUtils","DS/SMAPoweredByState/ad-state-app/selectors","DS/SMAPoweredByViews/Skeleton/Collection/ADJobsCollection","DS/SMAPoweredByViews/Skeleton/Model/JobModel","DS/SMAPoweredByViews/Skeleton/Views/ADContentsView","DS/SMAPoweredByViews/Skeleton/Views/ADStatusView","DS/SMAPoweredByViews/Skeleton/Views/ADMessageView","DS/SMAPoweredByViews/Skeleton/Views/ADWarningView","DS/SMAPoweredByViews/Skeleton/Views/ADLogView","DS/SMAPoweredByViews/Skeleton/Views/ADJobPropertiesView","DS/W3DXComponents/Views/Layout/GridScrollView","DS/W3DXComponents/Views/Layout/TableScrollView","DS/W3DXComponents/Views/Layout/ListView","DS/SMAPoweredByViews/Skeleton/Views/ADTileView","DS/SMAPoweredByViews/Skeleton/Views/ADThumbnailView","DS/W3DXComponents/Views/Item/RowView","DS/SMAPoweredByViews/Skeleton/Views/ADEmptyView","DS/W3DXComponents/ContentSet","DS/SMAPoweredByViews/Skeleton/Actions/ADJobContexualActions","i18n!DS/SMAPoweredByViews/assets/nls/ADJobRenderer","css!DS/SMAPoweredByViews/Skeleton/Renderers/ADJobRenderer"],function(g,t,u,v,j,o,x,r,f,e,i,b,B,z,y,C,d,n,c,m,A,q,s,a,w,h){var D={};var k=function(H,F,G){var E=F.model.getResultDataFor3DPlay();if(E!==null){G.dataTransfer.setData("text",JSON.stringify(E))}},l=function(E,F){if(!u.isBatchJob(t.getStore().getState(),F.model.id)){x.startExecDirMonitor(F.model.id)}},p=function(){return{collection:f.getCollection(),cacheFacets:false,view:a,viewOptions:{contents:{selectionMode:"oneToOne",useInfiniteScroll:false,usePullToRefresh:false,headerOnEmpty:false,views:[{id:"tile",view:d,itemView:m,title:h.TileView,"default":window.widget&&window.widget.getValue("currentViewId")==="tile"},{id:"thumbnail",view:d,itemView:A,title:h.ThumbnailView,"default":window.widget&&window.widget.getValue("currentViewId")==="thumbnail"},{id:"table",view:n,itemView:q,title:h.RowView,"default":window.widget&&window.widget.getValue("currentViewId")==="table"},{id:"list",view:c,itemView:m,selectionMode:"oneToOne"}],itemViewOptions:{contextualActions:w.getContexualActions},headers:[{property:"title",sortable:true,label:h.columnTitle},{property:"subtitle",sortable:false,label:h.columnSubTitle},{property:"started",sortable:true,label:h.columnStartTime},{property:"ended",sortable:true,label:h.columnFinishTime},{property:"jobType",sortable:true,label:h.columnJobType},{property:"displayStatusTable",sortable:true,label:h.columnStatus}],emptyView:s,events:{onItemViewDrag:k,onItemViewSelect:l}}},idCardOptions:{attributesMapping:{title:"title"},facets:function(){var E=[],F=this.getFacets();if(F){F.forEach(function(G){E.push({text:G.title,icon:G.icon,handler:g.getRendererHandler(G.view)})})}return E}}}};D.getRenderer=p;return D});