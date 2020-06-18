define("DS/AuthGenericCommands/AuthGenericCommands_ja",{});define("DS/AuthGenericCommands/assets/nls/AuthDlgReorder",{modalHeader:"ツリーをリオーダ",modalFooterReset:"ツリーの順序をリセット",modalFooterOK:"OK",modalFooterCancel:"キャンセル",upArrow:"選択を上に移動",downArrow:"選択を下に移動",freeArrow:"選択を自由に移動",TreeListViewHeaderName:"タイトル",TreeListViewHeaderResponsible:"責任者",TreeListViewHeaderModifiedDate:"変更日",TreeListViewHeaderCreationDate:"作成日"});define("DS/AuthGenericCommands/assets/nls/AuthDlgRevisionUpdate",{modalFooterOK:"OK",modalFooterCancel:"キャンセル",TreeListViewHeaderName:"タイトル",TreeListViewHeaderRevisionCurrent:"リビジョン",TreeListViewHeaderAction:"置換アクション",TreeListViewHeaderRevisionPreview:"想定されるリビジョン",TreeListViewHeaderMaturityCurrent:"完成度",TreeListViewHeaderMaturityPreview:"想定される完成度",TreeListViewHeaderType:"タイプ",TreeListViewHeaderResponsible:"責任者",TreeListViewHeaderCandidate:"候補",TreeListViewContextualMenuSelectAllChildren:"すべての子を選択",TreeListViewContextualMenuSelectChildren:"子を選択",TreeListViewContextualMenuCompareRevisions:"リビジョンを比較",TreeListViewContextualMenuReplaceby:"選択を次で置換",TreeListViewContextualMenuResetAction:"アクションをリセット",TreeListViewReplacePlaceholder:"置換",ReplaceActionLatest:"最新",ReplaceActionLatestReleased:"最新リリース済み",ReplaceActionLatestStable:"最新の安定",ReplaceActionNone:"なし",ReplaceActionByRevision:"リビジョンによる",ReplaceMultiInfoPartial:"{selectedNodes} 個のうち {candidatesCount} 個が{action}リビジョンの候補です",ReplaceMultiInfoFailure:"選択したオブジェクトのいずれも{action}リビジョンの候補ではありません",ReplaceMultiInfoSuccess:"選択したすべてのオブジェクトが{action}リビジョンの候補です",TreeListViewTooltipHeaderIsModified:"変更",TreeListViewTooltipCellCandidateAvailable:"{objectName} を次に更新できます: \n {candidateList}",TreeListViewTooltipCellCandidateNone:"{objectName} は更新できません。",TreeListViewTooltipCellIsModifiedAvailable:"{objectName} は確定後に変更されます。",TreeListViewTooltipCellIsModifiedForbidden:"{objectName} は現行の完成度ステートが原因で変更できません。"});define("DS/AuthGenericCommands/assets/nls/AuthGenericCommandsCatalog",{SEL_001:"複数選択されたオブジェクトは置換できません。オブジェクトを 1 つだけ選択してください。",SEL_002:"ルート オブジェクトは置換できません。サブレベルのオブジェクトを選択してください。",SEL_003:"オブジェクトをリオーダするには、そのオブジェクトは 2 つ以上の有効な子を持ち、展開されている必要があります。",SEL_004:"{type} のみをリオーダできます。 {type} を選択してください。",SEL_005:"複数選択したオブジェクトはリオーダできません。オブジェクトを 1 つだけ選択してください。",SEL_006:"少なくとも 1 個の選択ルート オブジェクトに親がないため、切り離せません。サブレベルのオブジェクトのみを選択してください。",ERR_003:"既存項目の挿入に失敗しました: ",ERR_005:"リオーダに失敗しました: ",ERR_006:"構造はリオーダ操作中に変更されました (1 つ以上のエレメントが追加または削除されました)。選択内容をリフレッシュした後でツリーをリオーダしてください。",ERR_007:"オブジェクト {name} は存在しません。ウィジェットをリフレッシュしてから、この操作を行ってください。",ERR_008:"選択したオブジェクトのうち、少なくとも 1 つが存在しません。ウィジェットをリフレッシュしてから、この操作を実行してください。",SUC_003:"既存項目の挿入に成功しました。",SUC_005:"リオーダに成功しました。",BAD_SELECTION:"誤った選択を除去しました。",selection_root:"ルート オブジェクト {name} を選択できません。",selection_child:"親 {parent} と子 {child} を選択した場合、その子オブジェクトを選択できません。",selection_root_no_children:"{name} は、有効な子がないか展開されていないため選択できません。",selection_unsupported_type:"タイプ {type} のオブジェクト {name} を選択できません。",selection_cycle:"{name} とその親は、同時には選択できません。",unwanted_word_delete:"削除",unwanted_word_replacer_delete:"切り離し",error_license:"このコマンドに必要なライセンスを持っていません。",operationAborted_Cycle:"循環参照が生じるため、操作は中断されました。",error_timeout:"操作がタイムアウトしました。",error_cancelled:"操作がキャンセルされました。",displayAgain:"このメッセージを再表示しない",executing:"実行しています...",insert_unsupported_type_parent:"タイプ {type} のオブジェクトの下に挿入できません。",insert_unsupported_unkowntype_parent:"タイプ {type} のオブジェクトの下にのみ挿入できます。",insert_unsupported_child:"オブジェクト {name} を挿入できません。",insert_unsupported_child_type:"タイプ {type} のオブジェクト {name} は挿入できません。",insert_unsupported_root:"ルート オブジェクト {name} を追加できません。",insert_unsupported_cycle:"挿入すると {child} と {parent} の間で循環参照が生じるため、挿入は中止されました。",insert_unsupported_itself:"オブジェクト {name} は自身には挿入できません。",insert_failure:"既存の挿入に失敗しました。<br>{parent} の下に {child} は挿入できません。<br>{error}",replace_report_success:"{oldName} から {newName} への置換に成功しました。",replace_report_failure1:"{oldName} の置換に失敗しました。",replace_report_failure2:"{oldName} から {newName} への置換に失敗しました。",replace_report_abort:"{oldName} から {newName} への置換が中止されました。",replace_success:"置換に成功しました。",replace_error:"置換に失敗しました。 ",replace_unsupported_type:"タイプ {type} のオブジェクト {name} を置換できません。",replace_unaccessible_objet:"オブジェクト {name} へのアクセス権がありません。",replace_bad_replacer_type:"タイプ {type} は無効であるため、オブジェクト {name} で置換できません。",replace_latest_failed_already_latest:"置換操作は無視されました。オブジェクト {name} は、すでに最新リビジョンです。",replace_latest_failed_child_selected:"置換対象として、ノードと、その直接または間接の子を一緒に選択しないでください。",unparent_success:"切り離しに成功しました。",unparent_error:"切り離しに失敗しました。 ",unparent_unsupported_object:"オブジェクト {name} の親を解除できません。",unparent_confirm_title:"切り離し",unparent_confirm_message_single:"{name} を切り離してもよろしいですか?",unparent_confirm_message_multiple:"選択したオブジェクトをすべて切り離しますか?",reparent_failed_unsupported_type_child_known:"タイプ {type} のオブジェクトを再親化できません。",reparent_failed_unsupported_type_child_unknown:"このタイプのオブジェクトを再親化できません。",reorder_view_partially_expanded:"構造は部分的に展開されています。表示されていないエレメントはリオーダされません。構造のすべてのエレメントをリオーダするには、構造全体を表示してください。",SUC_InsertProductCconfiguration:"製品構成の挿入に成功しました。",ERR_InsertProductCconfiguration:"製品構成の挿入に失敗しました: ",insertPC_failure:"製品構成の挿入に失敗しました。<br>{parent} の下に {child} は挿入できません。<br>{error}",insertPC_noPCFound:"挿入は中止されました。製品構成が見つかりません。アタッチされている構成モデルに製品構成が存在するオブジェクトを挿入対象として選択してください。",SUC_ReplaceProductCconfiguration:"製品構成の置換に成功しました。",ERR_ReplaceProductCconfiguration:"製品構成の置換に失敗しました: ",replacePC_failure:"製品構成の置換に失敗しました。<br>{parent} の下の {child} は置換できません。<br>{error}",replacePC_noPCFound:"置換は中止されました。製品構成が見つかりません。アタッチされている構成モデルに製品構成が存在するオブジェクトを置換対象として選択してください。",abort_confirm_message:"この操作を中止してよろしいですか?",confirm:"確認",modalFooterAbort:"中断"});define("DS/AuthGenericCommands/assets/nls/AuthGenericReportPanel",{success:"成功",failure:"失敗",neutral:"警告",aborted:"中止"});