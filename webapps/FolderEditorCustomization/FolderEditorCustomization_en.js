define("DS/FolderEditorCustomization/FolderEditorCustomization_en",{});define("DS/FolderEditorCustomization/assets/nls/ActiveFolder",{ErrorMsg_Rest_Error:"Server communication Error. Please try again later.",ErrorMsg_Rest_GetPreference:"Could not find the default data location setting. Please try again later.",InfoMsg_Active_Successfully:"The default data location <strong>{folderLabel}</strong> was set successfully.",InfoMsg_Inactive_Successfully:"The default data location <strong>{folderLabel}</strong> was unset successfully.",ErrorMsg_Rest_GetActiveFolder:"The default data location can not be retrieved. Default data location has been unset.",Label_NoDefaultLocation:"No current default data location.",Label_DefaultLocation:"The default data location is <strong>{folderLabel}</strong>. Click to explore it.",Label_EnableLocation:"Default data location <strong>{folderLabel}</strong> is disabled. Click to enable.",Label_DisableDefaultLocation:"Click to disable default data location <strong>{folderLabel}</strong>.",InfoMsg_Enable_Successfully:"The default data location <strong>{folderLabel}</strong> is now disabled.",InfoMsg_Disable_Successfully:"The default data location <strong>{folderLabel}</strong> is now enabled.",InfoMsg_DefaultLocation:"The default data location is <strong>{folderLabel}</strong>."});define("DS/FolderEditorCustomization/assets/nls/BulkDownload",{dialogTitle:"Download Files - Review",noId:"Not a valid ID",folders:"Folder(s):",files:"File(s):",size:"Size:",errorfiles:"Error(s):",warningfiles:"Warning(s):",folderpaths:"File location:",settingFlat:"Download files as Flat",settingRename:"Rename conflict file",settingWithCSV:"Download CSV Log",conflict:"Conflict(s) detected.",noConflict:"No conflict detected.",operationCanceled:"Download has been canceled.",launched:"Request sent. Local downloader is launching...",failed:"Download failed. Please retry.",error_index:"Failed to retrieve object information. Retry in a few minutes or uncheck Download CSV Log option, then retry.",starting:"Download is now starting...",download:"Download",cancel:"Cancel",bulkSettings:"Donwload Settings",currentFolder:"Current Folder",conflictmessage_flatdownload:"Flat Download ",noFolderStructure:"(No folder structure)",voidDownload:"There is nothing to download.",message_files_are_warning_objects:"Following files are not syncronized:",message_conflict_files_are:"Following files have conflicts:",message_conflict_files_will_be_donwloaded_only_one_file:"Following files have conflicts. Only one file will be downloaded.",message_conflict_in_manual_rename:" [ '{name}' ] is conflicted.",message_toolong_in_manual_rename:"[ '{name}' ] Total path length is more than {chars} characters.",message_onlySpaceCharacter_in_manual_rename:"You cannot have empty name or space only.",message_okToDownload:"No conflict has been detected. You may start the download safely.",message_nothingToDownload:"There is nothing to download. Please select another folder, then retry.",message_error_name_badchars:"[ '{name}' ] has invalid characters, \nThe invalid characters are {badChars}",message_failed_getPreference:"Error occurred during getPreferences.",message_timeout_error:"Download failed. Retry in a few minutes.\nIf the problem persists, contact your administrator.",message_now_loading_file_status:"Now checking if files are up-to-date... ",message_allfiles_are_uptodate:"All files are up-to-date.",message_now_loading_file_status_warning_message:"If the download starts now, you won't see the up-to-date file status.",message_there_is_toolong_filepath:"Total path length is more than {chars} characters.",message_there_is_toolong_filepath_willnot_be_downloaded:"Following files won't be downloaded:",displayFooterMessage_retrievingFileInfo:"Retrieving information about the files...",displayFooterMessage_browsingFolder:"Browsing the folder: ",do_not_get_filestatus:"Unknown",displayMessage_notSync:"Not synchronized",displayMessage_notExist:"Does not exist",displayMessage_invalid:"Invalid object",displayMessage_embededComponent:"Embeded Component",displayMessage_unknown:"No data"});define("DS/FolderEditorCustomization/assets/nls/ImportStructureCSV",{OK:"Ok",Cancel:"Cancel",Cancel_Tooltip:"Cancel and Close this dialog.",Close:"Close",Close_Tooltip:"Close this dialog.",Change_Csv_File:"Change CSV file.",Drop_Csv_File:"Drop CSV file here.",Dialog_Title:"Import Folder Structure - ",Help_Csv_File:"Download the template file.",Label_Import:"Import",Label_Import_Tooltip:"Run the Import.",Label_LineNumber:"Line",Label_Column:"Column",Label_Column_Level:"Level",Label_Column_Name:"Name",Label_Column_Description:"Description",Label_Column_Owner:"Owner",Label_Column_SecurityContext:"SecurityContext",Label_Confirm_Title:"Warning - Large Structure",ConfirmMsg_Drop_File_Size_Large:"This operation might take a while due to the large size of the file. Do you want to continue?",ErrorMsg_Avoid_Char:"It has invalid characters.",ErrorMsg_Column_Count:"The number of columns specified is outside of the supported range of values.",ErrorMsg_Desc_Max_Over:"Maximum length for Description is 1024 characters.",ErrorMsg_Drop_Multiple_File:"Multiple files are forbidden.",ErrorMsg_Drop_File_Not_CSV:"Not a CSV file.",ErrorMsg_Drop_File_Empty:"Dropped file is empty.",ErrorMsg_Exist_Folder_Created:"{foldername} has been already created. Please refresh the Folder Editor widget.",ErrorMsg_Exist_Folder_Modified:"{foldername} has been already updated. Please refresh the Folder Editor widget.",ErrorMsg_Folder_Create_Stoped:"Folder creation was stopped.",ErrorMsg_Level_Is_Not_Number:"Level is blank or has invalid characters (the level for following lines won't be checked).",ErrorMsg_Level_Is_Not_Sequencial:"Level has to be a sequencial number.",ErrorMsg_Level_Origin:"Level has less number than 1.",ErrorMsg_Name_Duplicate:"The same folder name is already in the same parent folder.",ErrorMsg_Name_Required:"Name cannot be blank.",ErrorMsg_Name_Max_Over:"Maximum length for Name is 127 characters.",ErrorMsg_SecCtx_Is_Invalid:"Security Context is invalid.",ErrorMsg_SecCtx_Does_Not_Exist:"Security Context does not exist.",ErrorMsg_Owner_Is_Not_Ascii:"Owner has invalid characters.",ErrorMsg_Owner_Does_Not_Exist:"Owner does not exist.",ErrorMsg_Owner_Change_Failure:"Owner cannot be changed.",ErrorMsg_Rest_Error:"Server communication Error.",InfoMsg_Load_Csv_Success:"CSV file loaded successfully.",InfoMsg_Load_Csv_Error:"CSV file has invalid lines.",InfoMsg_Create_Target_Size_Zero:"The whole structure already exists.",InfoMsg_Folder_Creating:"Creating folder...",InfoMsg_Folder_Create_Success:"Folder(s) has been created successfully.",WarnMsg_SecurityContext_MissMatch:"Security Contextes don't match (selected folder SC & current SC)"});