define("DS/SMAProcWebCMMUtils/SMAProcWebCMMUtils_en",{});define("DS/SMAProcWebCMMUtils/assets/nls/SMAJSCMMDataFlowUtilsNLS",{"Dataflow.Mode.oneToMany":"One to many","Dataflow.Mode.oneToManyToolTip":"In One to many mode, the selected source parameters are created/mapped directly to the selected destination activities. Ex: A1–>A2, A1–>A3, A1->A4","Dataflow.Mode.sequential":"Sequential","Dataflow.Mode.sequentialToolTip":"In Sequential mode, the selected source parameters will be created/mapped through a series of selected destination activities. Ex: A1–> A2 -> A3 -> A4","Dataflow.InputNotDefinedOrNull":"Inputs are not defined or null","Dataflow.AlreadyMapped":"Cannot map as {val1} is already mapped to {val2}.","Dataflow.DFCanNotBeCreated":"Dataflows can not be created","Dataflow.DFCanNotBeCreatedInSelectedDirection":"Dataflows can not be created in specified direction","Dataflow.DFCanNotBeCreatedAsItAlreadyExists":"Dataflows can not be created as it already exists in specified direction","Dataflow.DFCanNotBeCreatedNoRelation":"Dataflows can not be created between unrelated activities. (Dataflows can be created between Parent/Child and Sibling activities.)","Dataflow.DFCanNotBeCreatedMismatchDataType":"Datatype does not match for the parameters.","Dataflow.DFMismatchDataTypeWarning":"Datatype for the source parameter is different from that of the destination parameter.","Dataflow.DFCanNotBeCreatedMismatchStructure":"Structures are different for parameters.","Dataflow.DFCanNotBeCreatedMismatchDimensionSameStructure":"Dimensions are different for parameters.","Dataflow.DFCanNotBeCreatedMismatchArraySizeSameStructure":"Array size are different for parameters.","Dataflow.DFCanNotBeCreatedMismatchArraySizable":"To side parameter is not sizable.","Dataflow.DFCanNotBeCreatedNeutralMode":"No dataflows can be created TO/FROM Neutral parameters.","Dataflow.DFCanNotBeCreatedParentInToChildOut":"No dataflows can be created FROM Parent INPUT Parameter TO Child OUTPUT Parameter.","Dataflow.DFCanNotBeCreatedUpstreamInToDownstream":"No dataflows can be created FROM a Upstream INPUT Parameter TO any Downstream Parameter, irrespective of its mode.","Dataflow.DFCanNotBeCreatedDownstreamToUpstream":"Dataflows cannot be created FROM a Downstream Parameter TO an Upstream Parameter.","Dataflow.DFCanNotBeCreatedUpstreamToDownstreamOut":"No dataflows can be created FROM a Upstream Parameter(irrespective of its mode) TO Downstream OUTPUT Parameter.","Dataflow.DFCanBeCreatedSiblingsUndeterminedOrder":" Input Activities are siblings as they have the same parent, but their order can not be determined. So Dataflows can be created in both directions, but users are required to take further look at the dataflows to make sure that they really want these.","Dataflow.DFCanBeCreatedInBoth":"Dataflows can be created in both direction.","Dataflow.SiblingsUndeterminedOrder":"Input Activities are siblings as they have the same parent, but their order can not be determined.","Dataflow.NoRelation":"The input Activities are not related (A relation can be either Parent-Child or Sibling).","Dataflow.DataType":"No dataflows can be created between input parameters as their Datatypes are different.","Dataflow.MultiModeChangeDeleteMapping":"Modifying mode for all selected parameters will delete following mappings.","Dataflow.MultiModeChangeConfirmation":"Do you still want to modify mode for all selected parameters?","Dataflow.ModeChangeDeleteMapping":"Modifying mode for {val1} will delete following mappings.","Dataflow.ModeChangeConfirmation":"Do you still want to modify mode for {val1}?","Dataflow.SizableChangeDeleteMapping":"Modifying sizable property for {val1} will make following mappings fail at runtime.","Dataflow.SizableChangeConfirmation":"Do you still want to modify sizable property for {val1} ?","Dataflow.DimensionChangeDeleteMapping":"Modifying sizes({val1}) property for {val2} will make following mappings fail at runtime.","Dataflow.DimensionChangeConfirmation":"Do you still want to modify sizes({val1}) property for {val2}?","Dataflow.DatatypeChangeDeleteMappingError":"Modifying data type for {val1} will make following mappings invalid.\nDo you want to modify data type for {val1} and\ndelete these mappings?","Dataflow.DatatypeChangeDeleteMappingWarning":"Modifying data type for {val1} will fail follwoing mappings at runtime \nunless the source string represents a value of the destination type.\nDo you want to preserve following mappings?","Dataflow.MultilineChangeDeleteMapping":"Modifying sizable property for {val1} will make following mappings fail at runtime.","Dataflow.MultilineChangeConfirmation":"Do you still want to modify 'Multiline' property for {val1}?","Dataflow.DeleteParameter.MappingWarning":"Deleting the selected parameters will result in deleting the following mappings.","Dataflow.Mapping.AlreadyMapped":"Already mapped.","Dataflow.Mapping.toBeCreated":"Mapping wil be created.","Dataflow.Mapping.SequenceBroken":"There are invalid parameters in the sequence.","Dataflow.Mapping.CreateAndMap":"Create and Map","Dataflow.Mapping.Direction":"Direction","Dataflow.Mapping.Delete":"Delete Mapping","Dataflow.Mapping.ModeChangeSuggestion":"Cannot map with the current parameter modes.\nClick for suggestions.","Dataflow.Mapping.ModeChange":"The source and destination parameters are not compatible. Modify these parameter modes and proceed with mapping?","Dataflow.Mapping.ModeChangeMessage":"Mode of {val1} will be changed from {val2} to {val3} .","Dataflow.SwapActivities":"Swap Activities","Dataflow.ParameterPath":"Parameter Path Mode","Dataflow.Destination.Parameters":"Available destination parameters","Dataflow.Destination.ParameterNotAvailable":"No available destination parameters that are compatible with the selected source parameter","Dataflow.Destination.SelectParameter":"Select a parameter to edit","Dataflow.Destination.Activity":"Select destination activity","Dataflow.SaveError":"Dataflows could not be saved in PLM. There was an issue while saving dataflows to database.","Dataflow.Selection.searchAndSelect":"Search and select","Dataflow.Selection.search":"Click to search","Parameter.ModifyParameters":"Modify Parameters","Parameter.ModifyParameter":"Modify Parameter","Parameter.AddMultipleParameters":"Add Multiple Parameters","Parameter.AddMultipleParameters.Limit":"Maximum 1000 Parameters can be created at a time","Parameter.AddParameter":"Add Parameter","Parameter.AccessMessage":"Failed to {val1} parameter for process/activity. Because you do not have sufficient access rights to do it.Ask your system administrator to grant you the required access rights.","Parameter.choice.tooltip":"Enter each possible value on a new line.","Parameter.expression.tooltip":"Value will be driven by the expression","Parameter.Import.EmptyFile":"Skipping import process because xml file is empty.","Parameter.Import.InvalidFormat":"Invalid parameter format found in file.","Parameter.Import.NoParameter":"No parameters were found in file","Parameter.Import.MissingContainer":"Missing container to import parameters into.","Parameter.Import.Created":"List of created parameters:","Parameter.Import.Skipped":"List of skipped parameters:","Parameter.Import.Failed":"List of failed parameters:","Parameter.Import.Overwritten":"List of overwritten parameters:","Parameter.Import.TotalParameters":"Total number of parameters processed:","Parameter.Import.ParametersCreated":"parameters created","Parameter.Import.ParametersOverwritten":"parameters overwritten","Parameter.Import.ParametersSkipped":"parameters skipped","Parameter.Import.ParametersErroes":"parameters had errors","Parameter.Import.SelectOneFile":"You must select only one file in order to execute this command.","Parameter.Export.Complete":"Export parameters process is complete.","Parameter.Export.SelectionInfo":"All parameters will get exported.","Parameter.TitleValidation.Empty":"Empty name not allowed.","Parameter.TitleValidation.Alphabets":"Please only use standard alphanumerics.","Parameter.TitleValidation.Duplicate":"Parameter by the specified name exists (case sensitive), choose a different name","Parameter.SaveError":"Parameters could not be saved in PLM","Parameter.Select":"Please select a parameter to delete","Parameter.Add.QuickToTable":"Quickly add a scalar parameter directly to the table","Parameter.Add.Multiple":"Create one or more parameters and specify details","Parameter.Edit":"Edit Selected Parameter(s)","Parameter.EditSingle":"Edit Selected Parameter","Parameter.Delete":"Remove Selected Parameter(s)","Parameter.DeleteSingle":"Remove Selected Parameter","Parameter.Import":"Import from XML","Parameter.Export":"Export to XML","Parameter.TableColumn.Name":"Name","Parameter.TableColumn.Mode":"Mode","Parameter.TableColumn.Type":"Type","Parameter.TableColumn.Value":"Value","Parameter.TableColumn.Expression":"Expression","Parameter.TableColumn.Description":"Description","Confirm Modify":"Confirm Modify","Confirm Delete":"Confirm Delete"});define("DS/SMAProcWebCMMUtils/assets/nls/SMAProcWebAuthoringNLS",{"ProcessOpen.adhoc.warning":"This is an adhoc process","ActivityDelete.title":"Delete Activity","ActivityDelete.message":"Are you sure you want to delete the activity?","ActivityDelete.success.notification":"Activity deleted successfully.","ActivityDelete.error.notification":"Activity could not be deleted.","ActivityDisconnect.title":"Disconnect Activity","ActivityDisconnect.message":"Are you sure you want to disconnect the activity?","ActivityDisconnect.success.notification":"Activity disconnected successfully.","ActivityDisconnect.error.notification":"Activity could not be disconnected.","StepDelete.title":"Delete Step","StepDelete.message":"Are you sure you want to delete the step?","StepDelete.success.notification":"Step deleted successfully.","StepDelete.error.notification":"Step could not be deleted.","ActivityCreate.info":"Creating a new Activity.","ActivityCreate.error":"Failed to create a new Activity.","ActivityCreate.success":"Created a new Activity.","GatewayCreate.info":"Creating a new gateway.","GatewayCreate.error":"Failed to create a new gateway.","GatewayCreate.success":"Created a new gateway.","GatewayCreate.unconnected.error":"Creating non-connected gateway objects is not supported.","StepActivityCreate.info":"Creating a new Activity with step of type {val1}.","StepCreate.info":"Creating a step of {val1} type","StepCreate.error":"Failed to create a new Step.","StepCreate.success":"Created a new step.","StepNameCreate.success":"Created a new step of {val1} type.","StepCreate.failure":"Failed to create a new Step of type {val1}.","StepCreate.multipleProcessSteps.error":"Failed to create new step, an activity can only contain one design driver step","SequenceFlowConnect.error":"Failed to connect this activity or gateway.","GatewayDelete.title":"Delete Gateway","GatewayDelete.message":"Are you sure you want to delete the gateway?","GatewayDelete.success.notification":"Gateway deleted successfully.","GatewayDelete.error.notification":"Gateway could not be deleted.","EdgeDelete.title":"Delete Edge","EdgeDelete.message":"Are you sure you want to delete the edge?","EdgeDelete.success.notification":"Edge deleted successfully.","EdgeDelete.error.notification":"Edge could not be deleted.","ParameterSave.success":"Parameters are successfully saved.","ParameterSave.error":"Failed to save Parameters.","StepSave.success":"Step data saved successfully.","StepSave.error":"Not able to save changes in the step.","StepUpdate.error":"Failed to update the step.","ParameterSelect.error":"Please select a Constant/Parameter for the condition.","ContentChooser.error.message":"Failed to add a new content.","ContentAdd.error.message":"This type of content can not be added. Please choose from following types {val1}","FileUpload.error.message":"Failed to upload following file <b>{val2}</b>. Please choose from following types {val1}","DocCreateNotSupported.error.message":"File is not valid type of content. Please consider choosing PLMObject from following types {val1}","ContentFileUploadFileNotSupported.error.message":"File <strong>{va11}</strong> is not supported. Document create aborting.","Redo.error.notification":"Failure in redo operation","Undo.error.notification":"Failure in undo operation","SetMainStep.success.notification":"Successfully changed main step of the selected activity","SetMainStep.error.notification":"Failed to change main step of the selected activity","ClearMainStep.success.notification":"Successfully cleared the main step of the selected activity","ClearMainStep.error.notification":"Failed to clear main step of the selected activity","RenameTitle.InvalidCharacter.error":"The characters listed below are not allowed for input:\n (dot) \" # $ @ % * , ? \\ < > [ ] | : '\n The invalid character has been removed from the Title field.","Title.update.failed":"Update title or description failed for <p>","Retrieve.title.step.failed":"Could not retrieve step title or description.","ExecutionOptions.update.failed":"Update execution options failed for <p>",Modify_AccessMessage:"Because you do not have access rights to modify it.Ask your system administrator to grant you the required access rights.","Missing.FlowItem":"Missing flow item","Please select a step":"Please select a step","Activity.Title":"Activity","Gateway.Title":"Gateway","RunSubflow.Title":"Run Sub-flow","Script.Title":"Script","Calculator.Title":"Calculator","Download.Title":"Download","Upload.Title":"Upload","DeleteContent.Title":"Delete Content","IsightV5Adapter.Title":"Isight V5","Knowledgeware.Title":"3DX Parameters","V6Utility.Title":"3DX Utility","v6application.Title":"3DX App","Abaqus.Title":"Abaqus","CSEDirector.Title":"Co-Simulation Director","ApproxModel.Title":"Approximation","TextParser.Title":"Text Parser","OSCommand.Title":"OS Command","Doe.Title":"DOE","Optimization.Title":"Optimization","Loop.Title":"Loop","datamatching.Title":"Data Matching","3DXVBScript.Title":"3DX Script","Matlab.Title":"Matlab","Reference.Title":"Physics Simulation","Excel.Title":"Excel","ReportGeneration.Title":"Report Generation","ToscaInput.Title":"Tosca Input","ToscaExec.Title":"Tosca Execution","Foreman.Title":"Abaqus Forman","MonteCarlo.Title":"Monte Carlo","updateattributes.Title":"Attributes","CustomAdapter.Title":"Custom Adapter","Saving.Changes":"Saving Changes"});