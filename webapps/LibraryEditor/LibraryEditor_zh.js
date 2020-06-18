define("DS/LibraryEditor/LibraryEditor_zh",{});define("DS/LibraryEditor/assets/nls/LibraryEditor",{name_Section_FavoriteLibraries:"收藏夹",name_Section_AllLibraries:"库",name_Section_Trash:"已删除",name_Widget_Title:"IP 分类和重用",library_pref_dnd:"拖放行为",library_pref_filter:"过滤后的内容",library_pref_sublibrary:"在内容视图中显示子库",library_pref_populateTags:"填充标签",Move_label:"移动",Copy_label:"复制",Upload_content_loading:"上传内容",AddExisting_content_loading:"添加现有内容",Shared_label:"已共享",label_ActionBar_AddToFavorites:"添加/移除收藏夹",label_ActionBar_RemoveFromFavorites:"从收藏夹中移除",msg_info_contentcopied:"已复制内容。",msg_info_contentcut:"已剪切内容。",msg_info_librarycut:"库已被剪切。",msg_info_objetremoved:"已将 {number} 个对象从库“{libraryname}”中移除。",msg_info_Addinlibrary:"{number} 个对象已被添加到库“{libraryname}”。",msg_info_objetadded:"已将“{filename}”添加到“{libraryname}”中。",msg_info_objetmoved:"已将对象移动到库中。",msg_info_librarycopied:"{number} 个库已被添加到库“{libraryname}”。",msg_info_librarymoved:"{number} 个库已被移到库“{libraryname}”。",msg_info_librarycreated:"已创建库。",msg_info_filecheckedout:"已成功签出文件。",msg_info_filecheckedin:"已成功签入文件。",msg_info_favoriteadded:"已将库“{name1}”添加到收藏夹中。",msg_info_favoriteremoved:"已从收藏夹中移除库“{name1}”。",msg_info_favoriterenamed:"已将收藏夹“{name1}”重命名为“{name2}”。",msg_info_rename:"已将库“{name1}”重命名为“{name2}”。",msg_info_openingCATIAV5:"正在启动 CATIA V5...",msg_info_refresh:"刷新已完成。",msg_warning_MultipleSelection:"不支持多选。",msg_warning_nocontent:"未选择任何内容：请选择内容。",msg_warning_nolibrarynocontent:"未选择任何项目：请选择内容或库。",msg_warning_nocurrentlibrary:"没有当前库：请选择一个库。",msg_warning_noselection:"必须选择至少一个对象。",msg_warning_dndnotsupported:"不支持此放置操作。",msg_warning_dndnotsupported_external_on_Section_FavoriteLibraries:"系统不接受将外部库拖放到收藏夹部分。",msg_warning_LibraryAlreadyAmongFavorites:"库“{libraryname}”已经在收藏夹中。",msg_error_WSfailure:"服务器错误：请检查您的权限。",msg_error_notimplemented:"未执行命令。",msg_error_preferencessnotsaved:"保存首选项时出错。",msg_error_nopreferences:"检索首选项时出错。",msg_error_Addinanonlibrary:"仅允许添加到库中。",msg_error_Addinlibrary:"在库中添加对象时出错。",msg_error_CopyLibrary:"复制库时出错。",msg_error_MoveLibrary:"移动库时出错。",msg_error_Removefromlibrary:"从库中移除对象时出错。",msg_error_MoveInlibrary:"移动对象时出错。",msg_error_MoveInSamelibrary:"目标和源库相同。请选择不同库。",msg_error_FileUpload:"上传错误：无法将“{filename}”添加到“{libraryname}”。",msg_error_FileDownload:"下载文件时出错。",msg_error_FileCheckIn:"签入文件时出错。请验证您是否具有足够的权限！",msg_error_FileCheckIn_MultiFiles:"不允许对具有多个文件的文档执行签入操作。",msg_error_FileCheckIn_NoFile:"不允许对未包含文件的文档执行签入操作。",msg_error_FileCheckOut:"签出文件时出错。",msg_error_FileCheckOut_MultiFiles:"不允许对具有多个文件的文档执行签出操作。",msg_error_FileCheckOut_NoFile:"不允许对未包含文件的文档执行签出操作。",msg_error_DocumentCreation:"创建文档时出错。",msg_error_FileAPI:"不支持文件 API。",msg_error_rename:"无法重命名“{name1}”。相同的名称可能已分配给其他库，或者您的访问权限不足以执行该操作。",msg_error_name_maxlength:"新名称“{name}”超过允许的 {maxLength} 字符长度。",msg_error_name_badchars:"新名称“{name}”包含无效字符。无效字符是 {badChars}。",msg_error_name_empty:"名称不能为空。",msg_error_LibraryActivate:"无法激活库“{name1}”（可能已删除或无法访问）。",msg_error_NoVisibleRootLibrary:"没有可见的 RootLibrary 关联至此库（可能未处于活动状态）。",msg_error_TreeExpandCancelledInternalError:"已取消树展开，内部错误。",msg_error_TreeExpandCancelledNotReady:"已取消树展开，Widget 尚未就绪。",msg_error_contentnotavailable:"无法检索库内容。库可能不再存在，请刷新 Widget 或从收藏夹中移除。",msg_InfoAction_Timeout:"在超时期限内，未从启动的操作中收到响应，可能需要更长的时间执行。手动刷新后，一会儿即可显示结果。",msg_error_timeout:"无法在超时期限内检索库内容。",msg_error_appWhereUsedNotFound:"在服务器上未找到使用位置 Widget。",msg_warning_notProductRootInFilteredContext:"已激活过滤首选项，不能显示此路径。",msg_warning_notProductRoot:"找不到对象。",CMDRename:"重命名",CMDRemove:"移除",CMDAddExistingContent:"添加现有内容",CMDExpandAll:"全部展开",CMDCollapseAll:"全部折叠",CMDAccessRightCmd:"访问权限",CMDAddToFavorites:"添加到收藏夹",CMDProperties:"特性",CMDSynchronize:"同步到本地磁盘",CMDOpenCATIA:"在 CATIA V5 中打开",CMDActiveLibrary:"默认数据位置",csv_base_file_name:"库_编辑器_",alpha_sorting:"字母顺序",date_sorting:"日期顺序",CMDDeleteDefinitively:"删除",CMDRestore:"恢复",CMDSizeColumnToFit:"要拟合的尺寸列",HeaderThumbnail:"缩略图",HeaderDeletionDate:"删除日期",HeaderDeleteBy:"删除者","Last index:":"上个索引：",SearchInLibrary:"在 {libraryName} 中搜索",searchResultSum:"找到 {numberHits} 个结果",searchInLibrary_search:"搜索",ShowNavPane:"显示导航窗格",HideNavPane:"隐藏导航窗格",relations_tab:"关系",msg_classificationattributes_webservicefailed:"无法检索分类属性",CMDOpen:"打开",CMDRemoveContent:"移除内容",confirmation_ok:"确定",confirmation_cancel:"取消",confirmation_remove_title:"移除内容",confirmation_remove_message:"是否确定要从库中移除内容？",msg_info_indexedModePresence:"出现在索引模式下，切换到创作模式以查看数据！",msg_warning_addnotsupported_from_different_tenant:"不能接受添加来自不同 3DEXPERIENCE 平台的对象。",authentication_error:"不能将此应用与您当前凭据一起使用。"});