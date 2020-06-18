<%@ page pageEncoding="UTF-8"%>
<%@ page import="matrix.db.RelationshipType,
				com.matrixone.servlet.Framework,
				matrix.db.Context,
				com.matrixone.apps.domain.DomainObject, 
				com.matrixone.apps.domain.util.PersonUtil,
				matrix.util.MatrixException,
				com.matrixone.apps.domain.util.ContextUtil,
				com.matrixone.apps.domain.util.FrameworkException,
				com.matrixone.apps.domain.util.MqlUtil,
				com.matrixone.apps.domain.DomainRelationship"%>
<%@include file = "../emxUICommonAppInclude.inc"%>
<%@include file = "../emxUICommonHeaderBeginInclude.inc" %>
<%
System.out.println("11111111111111111111");
	context = Framework.getFrameContext(session);
	String objectId = request.getParameter("objectId");
	String mode = request.getParameter("mode");
	System.out.println("mode22__" + mode);
	// System.out.println("objectId22__"+objectId);
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<link rel="stylesheet" type="text/css"
	href="../common/styles/emxUIDefault.css">
<link rel="stylesheet" type="text/css"
	href="../common/styles/emxUIList.css">
<link rel="stylesheet" type="text/css" href="styles/dashboard.css">
<link href="../common/styles/emxUIToolbar.css" type="text/css"
	rel="stylesheet">
<link href="../common/styles/emxUIMenu.css" type="text/css"
	rel="stylesheet">
<link href="../common/styles/emxUIDialog.css" type="text/css"
	rel="stylesheet">
<link href="../common/styles/emxUICalendar.css" type="text/css"
	rel="stylesheet">
<script type="text/javascript" src="scripts/DatePicker.js"></script>

<script type="text/javascript">
	var footerurl = 'foot URL';
	addStyleSheet("emxUIToolbar");
	addStyleSheet("emxUIMenu");
	addStyleSheet("emxUIDOMLayout");
	
</script>

<style type="text/css">
body {
	margin: 0px;
	padding: 0px;
	overflow: auto;
	padding-top: 0px;
	padding-bottom: 22px;
	scroll=no;
	height=1024px
}

div {
	margin: 0px;
	padding: 0px;
}

#header {
	background-color: blue;
	color: white;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 16px;
	width: 100%;
}

#content {
	width: 100%;
	height: 100%;
	overflow: auto
}

#footer {
	background-color: green;
	color: white;
	width: 100%;
	height: 16px;
	position: absolute;
	bottom: 0px;
	left: 0px;
}

        #bg{ display: none;  position: absolute;  top: 0%;  left: 0%;  width: 100%;  height: 100%;  background-color: black;  z-index:1001;  -moz-opacity: 0.7;  opacity:.70;  filter: alpha(opacity=70);}
        #show{display: none;  position: absolute;  top: 25%;  left: 22%;  width: 53%;  height: 49%;  padding: 8px;  border: 8px solid #E8E9F7;  background-color: white;  z-index:1002;  overflow: auto;}

</style>

<script src="../common/scripts/emxUIModal.js" language="JavaScript"></script>
<script src="../common/scripts/emxUICalendar.js" language="JavaScript"></script>
<script src="../common/scripts/emxUIPopups.js" language="JavaScript"></script>
<script src="../common/scripts/jquery-1.9.1.js" language="JavaScript"></script>

<script type="text/javascript">

	function closeWindow()
	{
		top.close();
	} 
	
	function clearField(formName,fieldName,idName)
    {
		var operand = "document." + formName + "." + fieldName+".value = \"\";";
		eval (operand);
		if(idName != null){
			var operand1 = "document." + formName + "." + idName+".value = \"\";";
			eval (operand1);
		}
		return;
    }
</script>

<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript">

   
	function submitValidate() 
	{
		var fileFalg = false;
		var file = document.getElementById("FILE1").value;
				
		if(file!=""){
			fileFalg = true;
		}
			
		if(fileFalg){
			if(confirm("是否确认提交？")){
				document.tableTasksFrom.action="csscImportObj_3.jsp?objectId=<%=objectId%>";		
				document.tableTasksFrom.submit();
					
			}
		}else{
			alert("请上传导入文件");
		}
		//hidediv();
	}

	
</script>




<script type="text/javascript" language="javascript">
	addStyleSheet("emxUIDefault");
	addStyleSheet("emxUIList");
	addStyleSheet("emxUIForm");
	addStyleSheet("emxUIMenu");
</script>

</head>
<body class="white">

<br>
<br>
<br>

	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="1%">
		<tbody>
			<tr>
				<td class="requiredNotice">红色斜体字段是必填字段</td>
			</tr>
		</tbody>
	</table>



	<form name="tableTasksFrom" id="tableTasksFrom" method="post"	class="registerform" onsubmit="return submitValidate();  " action="do_upload.jsp" target="_parent" ENCTYPE="multipart/form-data">

		<table border="0px #ooo" cellpadding="0" cellspacing="0">
			<tbody>
					
					<tr>
						<td class="labelRequired" nowrap="nowrap"><label for="Name">添加导入文件</label></td>
						<td style="font-size: 8pt" class="field" nowrap="nowrap"
							width="280px">
							<input type="hidden" name="ids" id="ids" value="<%=objectId%>">
							<input type="hidden" name="mode" id="mode" value="<%=mode%>">
							<input type="FILE" name="FILE1" id="FILE1" size="30">	
					    </td>

						<td class="field" />
						<td class="field" />
					</tr>
					<tr>
						<td class="labelRequired" nowrap="nowrap"><label for="Download">下载模板</label></td>
						<td class="inputField">
						<a href ="../cssc/model/工艺知识库导出.xlsx" target="_self">工艺知识库导入模板</a>
						</td>
					</tr>
			</tbody>	
		</table>	
					
					
	</form>

</body>
</html>