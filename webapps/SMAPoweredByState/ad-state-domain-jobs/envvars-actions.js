/*!  Copyright 2017 Dassault Systemes. All rights reserved. */
define(["DS/SMAPoweredByState/ad-state-domain-jobs/action-types"],function(b){var a={};a.setJobEnvironmentVariables=function(d,c){return{type:b.SET_JOB_ENV_VARS,jobID:d,environmentVariables:c}};a.addJobEnvironmentVariable=function(e,c,d){return{type:b.ADD_JOB_ENV_VAR,jobID:e,name:c,value:d}};a.setJobEnvironmentVariableValue=function(e,c,d){return{type:b.SET_JOB_ENV_VAR_VALUE,jobID:e,name:c,value:d}};a.removeJobEnvironmentVariable=function(d,c){return{type:b.REMOVE_JOB_ENV_VAR,jobID:d,name:c}};a.removeAllJobEnvironmentVariables=function(c){return{type:b.REMOVE_ALL_JOB_ENV_VARS,jobID:c}};return a});