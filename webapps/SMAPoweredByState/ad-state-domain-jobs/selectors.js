/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-utils","DS/SMAPoweredByState/ad-state-domain-managed-data/selectors","DS/SMAPoweredByState/ad-state-domain-work-data/selectors","DS/SMAPoweredByState/ad-state-cos/selectors"],function(d,e,a,c){var b={};b.JobKind={TOOL:"tool",UPLOAD:"upload",DOWNLOAD:"download",GENERATE_RESULT:"generate result"};b.DATA_TRANSFER_KEY="dataTransfer_Job";b.JobStatus={UNKNOWN:"Unknown",CONFIGURING:"Configuring",ATTEMPTING_RUN:"AttemptingRun",RUN_ACCEPTED:"RunAccepted",CREATED:"Created",INITIALIZING:"Initializing",QUEUED:"Queued",STARTED:"Started",DEFERRED:"Deferred",RUNNING:"Running",PAUSED:"Paused",STOPPING:"Stopping",DONE:"Done",DELETED:"Deleted",COMPLETED:"Completed",ABORTED:"Aborted",FAILED:"Failed",NOTSTARTED:"NotStarted",SYSTEM_FAILED:"System Failed"};b.JobCompletionCode={UNKNOWN:"Unknown",CANCELED:"Canceled",FAILED:"Failed",SYSTEM_FAILED:"System Failed"};b.ParameterType={STRING:"string"};b.ParameterValueType={SINGLE:"single"};b.ParameterMode={INPUT:"input",OUTPUT:"output",INOUT:"inout",NEUTRAL:"neutral"};b.ErrorCodes={ACTIVITIES_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.ACTIVITIES_WS_ERROR",ACTIVITY_CREATE_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.ACTIVITY_CREATE_WS_ERROR",ACTIVITY_UPDATE_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.ACTIVITY_UPDATE_WS_ERROR",ACTIVITY_DELETE_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.ACTIVITY_DELETE_WS_ERROR",JOBS_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOBS_WS_ERROR",JOB_UPDATE_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_UPDATE_WS_ERROR",JOB_ADD_OUTPUT_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_ADD_OUTPUT_WS_ERROR",JOB_DELETE_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_DELETE_WS_ERROR",JOB_ABORT_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_ABORT_WS_ERROR",JOB_PROGRESS_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_PROGRESS_WS_ERROR",JOB_DETAILS_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_DETAILS_WS_ERROR",JOB_PARAMETERS_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_PARAMETERS_WS_ERROR",JOB_FILE_CHECKIN_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_FILE_CHECKIN_WS_ERROR",JOB_FILE_CHECKOUT_WS_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_FILE_CHECKOUT_WS_ERROR",JOB_ACTION_NOT_ALLOWED_ERROR:"SMAPoweredByState.ad-state-domain-jobs.JOB_ACTION_NOT_ALLOWED_ERROR",START_JOB_RUNTIME_ERROR:"SMAPoweredByState.ad-state-domain-jobs.START_JOB_RUNTIME_ERROR",JOB_CREATION_UNAUTHORIZED:"SMAPoweredByState.ad-state-domain-jobs.JOB_CREATION_UNAUTHORIZED",START_JOB_WS_NOT_FOUND:"SMAPoweredByState.ad-state-domain-jobs.START_JOB_WS_NOT_FOUND",START_JOB_PRIVATE_STATION_USER_MISMATCH:"SMAPoweredByState.ad-state-domain-jobs.START_JOB_PRIVATE_STATION_USER_MISMATCH",START_JOB_PRIVATE_STATION_SERVER_MISMATCH:"SMAPoweredByState.ad-state-domain-jobs.START_JOB_PRIVATE_STATION_SERVER_MISMATCH",START_JOB_PRIVATE_STATION_NOT_FOUND:"SMAPoweredByState.ad-state-domain-jobs.START_JOB_PRIVATE_STATION_NOT_FOUND",START_JOB_SSO_LOGIN_REQUEST_ERROR:"SMAPoweredByState.ad-state-domain-jobs.START_JOB_SSO_LOGIN_REQUEST_ERROR",ACTIVITY_NOT_FOUND:"SMAPoweredByState.ad-state-domain-jobs.ACTIVITY_NOT_FOUND",JOB_HANDLER_NOT_FOUND:"SMAPoweredByState.ad-state-domain-jobs.JOB_HANDLER_NOT_FOUND",JOB_NOT_FOUND:"SMAPoweredByState.ad-state-domain-jobs.JOB_NOT_FOUND"};b.TOOL_JOB_CONFIG_FILENAME="activityDefinition.json";b.UPLOAD_JOB_CONFIG_FILENAME="uploadDefinition.json";b.UPLOAD_JOB_PROCESSED_MARKER="__processed";b.isJobsInitialized=function(f){return !f.domain.jobs.uninitialized};b.isJobInitialized=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f,i=false;if(g){i=!g.uninitialized}return i};b.jobsPersistenceOperation=function(f){return !f.domain.jobs.persistenceOperation?null:f.domain.jobs.persistenceOperation};b.jobsPersistenceError=function(f){return !f.domain.jobs.persistenceError?null:f.domain.jobs.persistenceError};b.jobPersistenceStatus=function(i,f){var h=(typeof f==="string")?b.jobWithID(i,f):f,g=null;if(h){g=!h.persistenceStatus?null:h.persistenceStatus}return g};b.jobPersistenceOperation=function(i,f){var h=(typeof f==="string")?b.jobWithID(i,f):f,g=null;if(h){g=!h.persistenceOperation?null:h.persistenceOperation}return g};b.jobPersistenceError=function(i,f){var h=(typeof f==="string")?b.jobWithID(i,f):f,g=null;if(h){g=!h.persistenceError?null:h.persistenceError}return g};b.jobKind=function(i,f){var g=null,h=(typeof f==="string")?b.jobWithID(i,f):f;if(h){g=!h.kind?null:h.kind}return g};b.isJobConfiguring=function(i,f){var g=false,h=(typeof f==="string")?b.jobWithID(i,f):f;if(h&&((b.JobStatus.CONFIGURING===h.status)||(b.JobStatus.ATTEMPTING_RUN===h.status))){g=true}return g};b.isJobRunning=function(i,f){var g=false,h=(typeof f==="string")?b.jobWithID(i,f):f;if(h&&((b.JobStatus.RUN_ACCEPTED===h.status)||(b.JobStatus.CREATED===h.status)||(b.JobStatus.INITIALIZING===h.status)||(b.JobStatus.QUEUED===h.status)||(b.JobStatus.STARTED===h.status)||(b.JobStatus.DEFERRED===h.status)||(b.JobStatus.RUNNING===h.status)||(b.JobStatus.PAUSED===h.status)||(b.JobStatus.STOPPING===h.status))){g=true}return g};b.isJobDone=function(i,f){var g=false,h=(typeof f==="string")?b.jobWithID(i,f):f;if(h&&((b.JobStatus.DONE===h.status)||(b.JobStatus.DELETED===h.status)||(b.JobStatus.COMPLETED===h.status)||(b.JobStatus.ABORTED===h.status)||(b.JobStatus.FAILED===h.status)||(b.JobStatus.SYSTEM_FAILED===h.status))){g=true}return g};b.isJobSuccessful=function(i,f){var h=false,g=(typeof f==="string")?b.jobWithID(i,f):f;if(g&&((b.JobStatus.DONE===g.status)||(b.JobStatus.COMPLETED===g.status))){h=true}return h};b.isJobExecuted=function(g,f){return b.isJobRunning(g,f)||b.isJobDone(g,f)};b.isJobClaimed=function(i,g){var f=false,h=(typeof g==="string")?b.jobWithID(i,g):g;if(h&&h.progress){f=h.progress.claimed}return f};b.isUploadJobProcessed=function(i,f){var g=false,h=(typeof f==="string")?b.jobWithID(i,f):f;if(h){g=(h.title&&(h.title.indexOf(b.UPLOAD_JOB_PROCESSED_MARKER)!==-1))}return g};b.allJobs=function(f){return f.domain.jobs.objects};b.configuringJobs=function(f){return f.domain.jobs.objects.filter(function(g){return(b.isJobConfiguring(f,g))})};b.runningJobs=function(f){return f.domain.jobs.objects.filter(function(g){return(b.isJobRunning(f,g))})};b.executedJobs=function(f){return f.domain.jobs.objects.filter(function(g){return(b.isJobExecuted(f,g))})};b.toolJobs=function(f){return f.domain.jobs.objects.filter(function(g){return(b.jobKind(f,g)===b.JobKind.TOOL)})};b.uploadJobs=function(f){return f.domain.jobs.objects.filter(function(g){return(b.jobKind(f,g)===b.JobKind.UPLOAD)})};b.jobsOfKind=function(g,f){return g.domain.jobs.objects.filter(function(h){return(b.jobKind(g,h)===f)})};b.jobWithID=function(g,h){var f=g.domain.jobs.objects.filter(function(i){return(i.id===h)});return(f&&(f.length===1))?f[0]:null};b.jobsWithTitle=function(g,h){var f=g.domain.jobs.objects.filter(function(i){return(i.title===h)});return f};b.newlyCreatedJobs=function(h,f){var g=d.getObjectIDs(f);return h.domain.jobs.objects.filter(function(i){return((i.status===b.JobStatus.CONFIGURING)&&(g.indexOf(i.id)===-1))})};b.newlyStartedJobs=function(h,f){var g=d.getObjectIDs(f);return h.domain.jobs.objects.filter(function(i){return((i.status===b.JobStatus.RUN_ACCEPTED)&&(g.indexOf(i.id)===-1))})};b.newlyCompletedJobs=function(h,g){var f={};g.forEach(function(i){f[i.id]=i.status});return h.domain.jobs.objects.filter(function(k){var j=k.status===b.JobStatus.COMPLETED,i=f[k.id]===b.JobStatus.COMPLETED||typeof f[k.id]==="undefined";return j&&!i})};b.newlyFailedJobs=function(h,g){var f={};g.forEach(function(i){f[i.id]=i.status});return h.domain.jobs.objects.filter(function(j){var k=j.status===b.JobStatus.FAILED,i=f[j.id]===b.JobStatus.FAILED||typeof f[j.id]==="undefined";return k&&!i})};b.jobParameters=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&g.configuration.parameters)?g.configuration.parameters:null};b.jobParameterValue=function(k,f,g){var j=null,l=b.jobParameters(k,f),h;if(l){for(h=0;h<l.length;h++){if(l[h].name===g){j=l[h].value;break}}}return j};b.jobInputs=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.inputs)?g.inputs:null};b.jobMainInput=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.mainInputFile)?g.mainInputFile:null};b.jobArguments=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&g.configuration.arguments)?g.configuration.arguments:null};b.jobArgumentValue=function(l,f,h){var k=null,g=b.jobArguments(l,f),j;if(g){for(j=0;j<g.length;j++){if(g[j].name===h){k=g[j].value;break}}}return k};b.jobEnvironmentVariables=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&g.configuration.environmentVariables)?g.configuration.environmentVariables:null};b.jobEnvironmentVariableValue=function(l,g,h){var k=null,f=b.jobEnvironmentVariables(l,g),j;if(f){for(j=0;j<f.length;j++){if(f[j].name===h){k=f[j].value;break}}}return k};b.jobExecutionOptions=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.executionOptions)?g.executionOptions:null};b.jobWorkDirectory=function(i,f){var g=null,h=(typeof f==="string")?b.jobWithID(i,f):f;if(h&&h.executionOptions&&h.executionOptions.workDirectory){g=a.workDataWithID(i,h.executionOptions.workDirectory)}else{if(b.isJobExecuted(i,h)){g=a.workDirForJob(i,h.id)}}return g};b.jobDRMMode=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.executionOptions&&g.executionOptions.drmMode)?g.executionOptions.drmMode:null};b.isTransientStation=function(g,f){return b.jobDRMMode(g,f)===c.DRMMode.CLOUD};b.jobOS=function(j,f){var i=(typeof f==="string")?b.jobWithID(j,f):f,h=null,g=null;if(i&&i.executionOptions&&i.executionOptions.drmMode){if((i.executionOptions.drmMode===c.DRMMode.FIPER)&&i.executionOptions.server&&i.executionOptions.station){g=c.stationWithID(j,c.serverWithID(j,i.executionOptions.server),i.executionOptions.station);if(g){h=g.os}}else{if((i.executionOptions.drmMode===c.DRMMode.CLOUD)&&i.executionOptions.os){h=i.executionOptions.os}}}return h};b.jobOutputFileSpecs=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&g.configuration.outputFileSpecs)?g.configuration.outputFileSpecs:null};b.jobOutputFileSpecsEnabled=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&Boolean(g.configuration.outputFileSpecsEnabled))};b.jobResultsOptions=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.resultsOptions)?g.resultsOptions:null};b.jobGenerateResults=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.resultsOptions&&Boolean(g.resultsOptions.generateResults))};b.jobGenerateResultsUnits=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.resultsOptions&&g.resultsOptions.generateResultsUnits)?g.resultsOptions.generateResultsUnits:null};b.jobGenerateResultsUnitsEnabled=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.resultsOptions&&Boolean(g.resultsOptions.generateResultsUnitsEnabled))};b.jobGenerateResultsSourceFilename=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.resultsOptions&&g.resultsOptions.generateResultsSourceFilename)?g.resultsOptions.generateResultsSourceFilename:null};b.jobOwner=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.owner)?g.owner:""};b.jobGenerateResultsTitle=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.resultsOptions&&g.resultsOptions.generateResultsTitle)?g.resultsOptions.generateResultsTitle:null};b.jobInputObjects=function(j,h){var i=(typeof h==="string")?b.jobWithID(j,h):h,g=[],f;if(i&&i.inputs){i.inputs.forEach(function(k){f=e.managedDataWithID(j,k);if(f){g.push(f)}})}return g};b.jobProjectedOutputs=function(h,f){var g=[],i=h.domain.jobs.objects.filter(function(j){return j.title&&(j.title.indexOf(b.DATA_TRANSFER_KEY)===0)&&(j.configuration.attachToJobID===f)&&(!b.isUploadJobProcessed(h,j)&&!b.isJobDone(h,j))});if(i&&i.length>0){i.forEach(function(j){if(j.configuration&&j.configuration.managedDataProjections){j.configuration.managedDataProjections.forEach(function(k){g.push({name:k.fileName,type:e.Types.PROJECTION,version:k.version})})}if(j.resultsOptions&&j.resultsOptions.generateResults){g.push({name:j.resultsOptions.generateResultsTitle,type:e.Types.PROJECTION3DX,id:j.id})}})}return g};b.jobOutputObjects=function(k,g,i){var j=(typeof g==="string")?b.jobWithID(k,g):g,h=[],f;if(j&&j.outputs){j.outputs.forEach(function(l){f=e.managedDataWithID(k,l);if(f){h.push(f)}})}if(j&&i){h=h.concat(b.jobProjectedOutputs(k,j.id))}return h};b.jobResults=function(g,f){return b.jobOutputObjects(g,f).filter(function(h){return h.type==="DesignSight"})};b.jobWorkDataObjects=function(h,f){var g=b.jobWorkDirectory(h,f),i=[];if(g){i=a.workDataChildren(h,g.id)}return i};b.jobOverallProgress=function(i,f){var h=(typeof f==="string")?b.jobWithID(i,f):f,g=0;if(h&&h.progress&&h.progress.overallProgress){g=h.progress.overallProgress}return g};b.jobTypeId=function(i,f){var h=(typeof f==="string")?b.jobWithID(i,f):f,g=null;if(h){g=h.jobType}return g};b.jobCommand=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&g.configuration.command)?g.configuration.command:null};b.getApplication=function(h,f){var g=(typeof f==="string")?b.jobWithID(h,f):f;return(g&&g.configuration&&g.configuration.application)?g.configuration.application:null};return b});