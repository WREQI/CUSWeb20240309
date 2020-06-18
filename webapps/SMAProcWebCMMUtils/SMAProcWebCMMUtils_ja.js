define("DS/SMAProcWebCMMUtils/SMAProcWebCMMUtils_ja",{});define("DS/SMAProcWebCMMUtils/assets/nls/SMAJSCMMDataFlowUtilsNLS",{"Dataflow.Mode.oneToMany":"1 対多","Dataflow.Mode.oneToManyToolTip":"1 対多モードでは、選択したソース パラメーターが選択した宛先アクティビティに直接作成/マップされます。例: A1–>A2、A1–>A3、A1->A4","Dataflow.Mode.sequential":"順次","Dataflow.Mode.sequentialToolTip":"順次モードでは、選択したソース パラメーターが選択した一連の宛先アクティビティを介して作成/マップされます。例: A1–> A2 -> A3 -> A4","Dataflow.InputNotDefinedOrNull":"入力が定義されていないか null です","Dataflow.AlreadyMapped":"{val1} はすでに {val2} にマッピングされているため、マップすることができません。","Dataflow.DFCanNotBeCreated":"データフローを作成できません","Dataflow.DFCanNotBeCreatedInSelectedDirection":"指定された方向にデータフローを作成できません","Dataflow.DFCanNotBeCreatedAsItAlreadyExists":"データフローは指定された方向にすでに存在しているため、作成できません","Dataflow.DFCanNotBeCreatedNoRelation":"データフローは関連性のないアクティビティ間には作成できません。(データフローは親アクティビティ/子アクティビティと、兄弟アクティビティ間に作成できます。)","Dataflow.DFCanNotBeCreatedMismatchDataType":"パラメーターのデータタイプが一致していません。","Dataflow.DFMismatchDataTypeWarning":"ソース パラメーターのデータタイプが宛先パラメーターのデータタイプと異なります。","Dataflow.DFCanNotBeCreatedMismatchStructure":"パラメーターの構造が異なっています。","Dataflow.DFCanNotBeCreatedMismatchDimensionSameStructure":"パラメーターの寸法が異なっています。","Dataflow.DFCanNotBeCreatedMismatchArraySizeSameStructure":"パラメーターの配列サイズが異なっています。","Dataflow.DFCanNotBeCreatedMismatchArraySizable":"To 側のパラメーターはサイズを設定できません。","Dataflow.DFCanNotBeCreatedNeutralMode":"データフローをニュートラル パラメーターに対して、またはニュートラル パラメーターから作成できません。","Dataflow.DFCanNotBeCreatedParentInToChildOut":"親の入力パラメーターから子の出力パラメーターにデータフローを作成できません。","Dataflow.DFCanNotBeCreatedUpstreamInToDownstream":"アップストリーム入力パラメーターから、任意のダウンストリーム パラメーター (そのモードに関係なく）にデータフローを作成できません。","Dataflow.DFCanNotBeCreatedDownstreamToUpstream":"ダウンストリーム パラメーターからアップストリーム パラメーターにデータフローを作成できません。","Dataflow.DFCanNotBeCreatedUpstreamToDownstreamOut":"アップストリーム パラメーター (そのモードに関係なく) から、ダウンストリーム出力パラメーターにデータフローを作成できません。","Dataflow.DFCanBeCreatedSiblingsUndeterminedOrder":" 同じ親の入力アクティビティは兄弟ですが、アクティビティの順序は指定できません。そのため、データフローは両方の方向に作成できますが、ユーザーはデータフローを十分に調べて、これらが本当に必要であるか確認する必要があります。","Dataflow.DFCanBeCreatedInBoth":"データフローを両方の方向に作成できます。","Dataflow.SiblingsUndeterminedOrder":"同じ親の入力アクティビティは兄弟ですが、アクティビティの順序は指定できません。","Dataflow.NoRelation":"入力アクティビティ間に関連性がありません (関連性には親-子または兄弟などがあります)。","Dataflow.DataType":"入力パラメーターのデータタイプが異なっているため、入力パラメーター間にデータフローを作成できません。","Dataflow.MultiModeChangeDeleteMapping":"選択したすべてのパラメーターのモードを変更すると、次のマッピングが削除されます。","Dataflow.MultiModeChangeConfirmation":"それでも選択したすべてのパラメーターのモードを変更しますか?","Dataflow.ModeChangeDeleteMapping":"{val1} のモードを変更すると、次のマッピングが削除されます。","Dataflow.ModeChangeConfirmation":"それでも {val1} のモードを変更しますか?","Dataflow.SizableChangeDeleteMapping":"{val1} のサイズ変更可能なプロパティを変更すると、次のマッピングが実行時に失敗します。","Dataflow.SizableChangeConfirmation":"それでも {val1} のサイズ変更可能なプロパティを変更しますか?","Dataflow.DimensionChangeDeleteMapping":"{val2} のサイズ ({val1}) プロパティを変更すると、次のマッピングが実行時に失敗します。","Dataflow.DimensionChangeConfirmation":"それでも {val2} のサイズ ({val1}) を変更しますか?","Dataflow.DatatypeChangeDeleteMappingError":"{val1} のデータ タイプを変更すると、次のマッピングが無効になります。\n{val1} のデータ タイプを変更し、\nこれらのマッピングを削除しますか?","Dataflow.DatatypeChangeDeleteMappingWarning":"{val1} のデータ タイプを変更すると、ソース文字列が宛先タイプの値を \n表していない限り次のマッピングが実行時に失敗します。\n次のマッピングを保持しますか?","Dataflow.MultilineChangeDeleteMapping":"{val1} のサイズ変更可能なプロパティを変更すると、次のマッピングが実行時に失敗します。","Dataflow.MultilineChangeConfirmation":"それでも {val1} の '複数行' プロパティを変更しますか?","Dataflow.DeleteParameter.MappingWarning":"選択したパラメーターを削除すると、次のマッピングが削除される結果になります。","Dataflow.Mapping.AlreadyMapped":"すでにマッピングされています。","Dataflow.Mapping.toBeCreated":"マッピングが作成されます。","Dataflow.Mapping.SequenceBroken":"シーケンスに無効なパラメーターがあります。","Dataflow.Mapping.CreateAndMap":"作成してマッピング","Dataflow.Mapping.Direction":"方向","Dataflow.Mapping.Delete":"マッピングを削除","Dataflow.Mapping.ModeChangeSuggestion":"現在のパラメーター モードではマッピングできません。\nクリックすると候補が表示されます。","Dataflow.Mapping.ModeChange":"ソースおよび宛先パラメーターには互換性がありません。これらのパラメーター モードを変更して、マッピングを続行しますか?","Dataflow.Mapping.ModeChangeMessage":"{val1} のモードは、{val2} から {val3} に変更されます。","Dataflow.SwapActivities":"アクティビティをスワップ","Dataflow.ParameterPath":"パラメーター パス モード","Dataflow.Destination.Parameters":"使用可能な宛先パラメーター","Dataflow.Destination.ParameterNotAvailable":"選択したソース パラメーターと互換性のある宛先パラメーターがありません","Dataflow.Destination.SelectParameter":"編集するパラメーターを選択","Dataflow.Destination.Activity":"宛先アクティビティを選択","Dataflow.SaveError":"データフローを PLM に保存できませんでした。データフローをデータベースに保存するときに問題が発生しました。","Dataflow.Selection.searchAndSelect":"検索して選択","Dataflow.Selection.search":"クリックして検索","Parameter.ModifyParameters":"パラメーターを変更","Parameter.ModifyParameter":"パラメーターを変更","Parameter.AddMultipleParameters":"複数パラメーターを追加","Parameter.AddMultipleParameters.Limit":"1 度に最大 1000 個のパラメーターを作成できます","Parameter.AddParameter":"パラメーターを追加","Parameter.AccessMessage":"プロセス/アクティビティのパラメーターの {val1} に失敗しました。実行するための十分なアクセス権限を持っていないためです。必要なアクセス権限を付与するように、システム管理者に依頼してください。","Parameter.choice.tooltip":"新しい行に考えられる値をそれぞれ入力します。","Parameter.expression.tooltip":"値は式により駆動されます","Parameter.Import.EmptyFile":"xml ファイルが空のため、インポート プロセスをスキップしています。","Parameter.Import.InvalidFormat":"ファイルに無効なパラメーター形式があります。","Parameter.Import.NoParameter":"ファイルにパラメーターがありませんでした","Parameter.Import.MissingContainer":"パラメーターのインポート先となるコンテナがありません。","Parameter.Import.Created":"作成したパラメーターのリスト:","Parameter.Import.Skipped":"スキップしたパラメーターのリスト:","Parameter.Import.Failed":"失敗したパラメーターのリスト:","Parameter.Import.Overwritten":"上書きしたパラメーターのリスト:","Parameter.Import.TotalParameters":"処理したパラメーターの合計数:","Parameter.Import.ParametersCreated":"個の作成されたパラメーター","Parameter.Import.ParametersOverwritten":"個の上書きされたパラメーター","Parameter.Import.ParametersSkipped":"個のスキップされたパラメーター","Parameter.Import.ParametersErroes":"個のエラーがあるパラメーター","Parameter.Import.SelectOneFile":"このコマンドを実行するには、ファイルを 1 つだけ選択する必要があります。","Parameter.Export.Complete":"パラメーターのエクスポート プロセスが完了しました。","Parameter.Export.SelectionInfo":"すべてのパラメーターがエクスポートされます。","Parameter.TitleValidation.Empty":"名前は空白にできません。","Parameter.TitleValidation.Alphabets":"標準の英数字のみを使用してください。","Parameter.TitleValidation.Duplicate":"指定した名前のパラメーターが存在します (大文字と小文字を区別)。別の名前を選択してください","Parameter.SaveError":"パラメーターは PLM に保存できませんでした","Parameter.Select":"削除するパラメーターを選択してください","Parameter.Add.QuickToTable":"スカラ パラメーターをすばやく直接テーブルに追加します","Parameter.Add.Multiple":"1 つ以上のパラメーターを作成して詳細を指定します","Parameter.Edit":"選択したパラメーターを編集","Parameter.EditSingle":"選択したパラメーターを編集","Parameter.Delete":"選択したパラメーターを除去","Parameter.DeleteSingle":"選択したパラメーターを除去","Parameter.Import":"XML からインポート","Parameter.Export":"XML にエクスポート","Parameter.TableColumn.Name":"名前","Parameter.TableColumn.Mode":"モード","Parameter.TableColumn.Type":"タイプ","Parameter.TableColumn.Value":"値","Parameter.TableColumn.Expression":"式","Parameter.TableColumn.Description":"説明","Confirm Modify":"変更の確認","Confirm Delete":"削除の確認"});define("DS/SMAProcWebCMMUtils/assets/nls/SMAProcWebAuthoringNLS",{"ActivityDelete.title":"アクティビティを削除","ActivityDelete.message":"アクティビティを削除してよろしいですか?","ActivityDelete.success.notification":"アクティビティが正常に削除されました。","ActivityDelete.error.notification":"アクティビティを削除できませんでした。","ActivityDisconnect.title":"アクティビティを切断","ActivityDisconnect.message":"アクティビティを切断してよろしいですか?","ActivityDisconnect.success.notification":"アクティビティが正常に切断されました。","ActivityDisconnect.error.notification":"アクティビティを切断できませんでした。","StepDelete.title":"ステップを削除","StepDelete.message":"ステップを削除してよろしいですか?","StepDelete.success.notification":"ステップが正常に削除されました。","StepDelete.error.notification":"ステップを削除できませんでした。","ActivityCreate.info":"新規アクティビティを作成しています。","ActivityCreate.error":"アクティビティの新規作成に失敗しました。","ActivityCreate.success":"新規アクティビティが作成されました。","GatewayCreate.info":"新規ゲートウェイを作成しています。","GatewayCreate.error":"ゲートウェイの新規作成に失敗しました。","GatewayCreate.success":"新規ゲートウェイが作成されました。","GatewayCreate.unconnected.error":"接続されていないゲートウェイ オブジェクトの作成はサポートされていません。","StepActivityCreate.info":"タイプ {val1} のステップを持つ新規アクティビティを作成しています。","StepCreate.info":"{val1} タイプのステップを作成しています","StepCreate.error":"ステップの新規作成に失敗しました。","StepCreate.success":"新規ステップが作成されました。","StepNameCreate.success":"{val1} タイプの新規ステップが作成されました。","StepCreate.failure":"タイプ {val1} のステップの新規作成に失敗しました。","StepCreate.multipleProcessSteps.error":"ステップの新規作成に失敗しました。アクティビティに含めることができるデザイン ドライバ ステップは 1 つのみです","SequenceFlowConnect.error":"このアクティビティまたはゲートウェイの接続に失敗しました。","GatewayDelete.title":"ゲートウェイを削除","GatewayDelete.message":"ゲートウェイを削除してよろしいですか?","GatewayDelete.success.notification":"ゲートウェイが正常に削除されました。","GatewayDelete.error.notification":"ゲートウェイを削除できませんでした。","EdgeDelete.title":"エッジを削除","EdgeDelete.message":"エッジを削除してよろしいですか?","EdgeDelete.success.notification":"エッジが正常に削除されました。","EdgeDelete.error.notification":"エッジを削除できませんでした。","ParameterSave.success":"パラメーターが正常に保存されました。","ParameterSave.error":"パラメーターの保存に失敗しました。","StepSave.success":"ステップ データが正常に保存されました。","StepSave.error":"ステップでの変更を保存できません。","StepUpdate.error":"ステップの更新に失敗しました。","ParameterSelect.error":"条件の定数/パラメーターを選択してください。","ContentChooser.error.message":"コンテンツの新規追加に失敗しました。","ContentAdd.error.message":"このタイプのコンテンツは追加できません。次のタイプから選択してください: {val1}","FileUpload.error.message":"次のファイルのアップロードに失敗しました: <b>{val2}</b>。次のタイプから選択してください: {val1}","DocCreateNotSupported.error.message":"ファイルは、有効なタイプのコンテンツではありません。次のタイプから PLMObject を選択することを検討してください: {val1}","ContentFileUploadFileNotSupported.error.message":"ファイル <strong>{va11}</strong> はサポートされていません。ドキュメントの作成を中止します。","Redo.error.notification":"やり直し操作に失敗しました","Undo.error.notification":"元に戻す操作に失敗しました","SetMainStep.success.notification":"選択したアクティビティのメイン ステップが正常に変更されました","SetMainStep.error.notification":"選択したアクティビティのメイン ステップの変更に失敗しました","ClearMainStep.success.notification":"選択したアクティビティのメイン ステップが正常に消去されました","ClearMainStep.error.notification":"選択したアクティビティのメイン ステップの消去に失敗しました","RenameTitle.InvalidCharacter.error":"以下にリストされた文字は入力できません:   (ドット) \" # $ @ % * , ? \\ < > [ ] | : '\n   無効な文字は [タイトル] フィールドから除去されました。","Title.update.failed":"<p> に対するタイトルまたは説明の更新に失敗しました","Retrieve.title.step.failed":"ステップのタイトルまたは説明を取得できませんでした。","ExecutionOptions.update.failed":"<p> に対する更新実行オプションが失敗しました",Modify_AccessMessage:"変更するアクセス権限がないためです。必要なアクセス権限を付与するように、システム管理者に依頼してください。","Missing.FlowItem":"フロー アイテムがありません","Please select a step":"ステップを選択してください","Activity.Title":"アクティビティ","Gateway.Title":"ゲートウェイ","RunSubflow.Title":"サブフローを実行","Script.Title":"スクリプト","Calculator.Title":"計算機","Download.Title":"ダウンロード","Upload.Title":"アップロード","DeleteContent.Title":"コンテンツを削除","IsightV5Adapter.Title":"Isight V5","Knowledgeware.Title":"3DX パラメーター","V6Utility.Title":"3DX ユーティリティ","v6application.Title":"3DX アプリケーション","Abaqus.Title":"Abaqus","CSEDirector.Title":"協調シミュレーション ディレクター","ApproxModel.Title":"近似","TextParser.Title":"テキスト パーサー","OSCommand.Title":"OS コマンド","Doe.Title":"DOE","Optimization.Title":"最適化","Loop.Title":"ループ","datamatching.Title":"データ マッチング","3DXVBScript.Title":"3DX スクリプト","Matlab.Title":"Matlab","Reference.Title":"物理シミュレーション","Excel.Title":"Excel","ReportGeneration.Title":"レポート生成","ToscaInput.Title":"Tosca 入力","ToscaExec.Title":"Tosca 実行","Foreman.Title":"Abaqus Forman","MonteCarlo.Title":"モンテ カルロ","updateattributes.Title":"属性","CustomAdapter.Title":"カスタム アダプタ","Saving.Changes":"変更を保存しています","ProcessOpen.adhoc.warning":"This is an adhoc process"});