/*!  Copyright 2016 Dassault Systemes. All rights reserved. */
(function(b){var a=b.Polymer,c=b.DS;c.SMAProcADUI=c.SMAProcADUI||{};c.SMAProcADUI.ADJobInstanceLogEntryView=a({is:"ad-job-instance-log-entry-view",properties:{jobInstanceLogEntry:{type:Object,value:null},},behaviors:[c.SMAProcSP.SPBase],_computeClass:function(d){return"job-log-entry-severity job-log-entry-severity-"+d}})}(this));