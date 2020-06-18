<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.Map.Entry,
				 java.util.Iterator,
				 java.util.List,
				 java.util.ArrayList,
				 matrix.db.Context,
				 java.util.HashMap,
				 matrix.util.UUID,
				 matrix.db.BusinessObject,
				 matrix.db.RelationshipType,
				 com.matrixone.servlet.Framework,
				 matrix.db.Context,
				 com.matrixone.apps.domain.DomainObject,
				 com.matrixone.apps.domain.util.PersonUtil,
				 matrix.util.MatrixException,
				 com.matrixone.apps.domain.util.ContextUtil,
				 com.matrixone.apps.domain.util.FrameworkException,
				 com.matrixone.apps.domain.util.MqlUtil,
				 com.matrixone.apps.domain.util.ContextUtil,
				 com.matrixone.apps.domain.DomainRelationship,
				 com.matrixone.apps.domain.util.i18nNow,
				 java.io.File, java.util.regex.Matcher,java.util.regex.Pattern,net.sourceforge.pinyin4j.PinyinHelper,net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat,net.sourceforge.pinyin4j.format.HanyuPinyinToneType,com.matrixone.apps.framework.ui.UIUtil,com.matrixone.apps.common.CommonDocument,org.dom4j.Document,org.dom4j.DocumentException,org.dom4j.Element,org.dom4j.io.OutputFormat,org.dom4j.io.SAXReader,org.dom4j.io.XMLWriter"%>
<%!
	public static List getNodes(String filePath,String elementName) {
		List dataList = new ArrayList();
		try {
			SAXReader reader = new SAXReader();
			Document document = reader.read(new File(filePath));
			Element root = document.getRootElement();
			Element element = root.element(elementName);
			List<Element> eles = element.elements();
			for (Element ele : eles) {
				String name = ele.attributeValue("Name");
				dataList.add(name);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataList;
	}
	
	
	 /**
     *  获取汉字首字母或全拼大写字母
     *
     * @param chinese 汉字
     * @param isFull  是否全拼 true:表示全拼 false表示：首字母
     *
     * @return 全拼或者首字母大写字符窜
     */
    public static String getUpperCase(String chinese,boolean isFull){
        return convertHanzi2Pinyin(chinese,isFull).toUpperCase();
    }

    /**
     * 获取汉字首字母或全拼小写字母
     *
     * @param chinese 汉字
     * @param isFull 是否全拼 true:表示全拼 false表示：首字母
     *
     * @return 全拼或者首字母小写字符窜
     */
    public static  String getLowerCase(String chinese,boolean isFull){
        return convertHanzi2Pinyin(chinese,isFull).toLowerCase();
    }

    /**
     * 将汉字转成拼音
     * <P>
     * 取首字母或全拼
     *
     * @param hanzi 汉字字符串
     * @param isFull 是否全拼 true:表示全拼 false表示：首字母
     *
     * @return 拼音
     */
    private static String convertHanzi2Pinyin(String hanzi,boolean isFull){
        /***
         * ^[\u2E80-\u9FFF]+$ 匹配所有东亚区的语言
         * ^[\u4E00-\u9FFF]+$ 匹配简体和繁体
         * ^[\u4E00-\u9FA5]+$ 匹配简体
         */
        String regExp="^[\u4E00-\u9FFF]+$";
        StringBuffer sb=new StringBuffer();
        if(hanzi==null||"".equals(hanzi.trim())){
            return "";
        }
        String pinyin="";
        for(int i=0;i<hanzi.length();i++){
            char unit=hanzi.charAt(i);
            //是汉字，则转拼音
            if(match(String.valueOf(unit),regExp)){
                pinyin=convertSingleHanzi2Pinyin(unit);
                if(isFull){
                    sb.append(pinyin);
                }
                else{
                    sb.append(pinyin.charAt(0));
                }
            }else{
                sb.append(unit);
            }
        }
        return sb.toString();
    }

    /**
     * 将单个汉字转成拼音
     *
     * @param hanzi 汉字字符
     *
     * @return 拼音
     */
    private static String convertSingleHanzi2Pinyin(char hanzi){
        HanyuPinyinOutputFormat outputFormat = new HanyuPinyinOutputFormat();
        outputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        String[] res;
        StringBuffer sb=new StringBuffer();
        try {
            res = PinyinHelper.toHanyuPinyinStringArray(hanzi,outputFormat);
            sb.append(res[0]);//对于多音字，只用第一个拼音
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        return sb.toString();
    }

    /***
     * 匹配
     * <P>
     * 根据字符和正则表达式进行匹配
     *
     * @param str 源字符串
     * @param regex 正则表达式
     *
     * @return true：匹配成功  false：匹配失败
     */
    private static boolean match(String str,String regex){
        Pattern pattern=Pattern.compile(regex);
        Matcher matcher=pattern.matcher(str);
        return matcher.find();
    }

    /**
     * 测试方法
     */
    public static void main(String[] args) {
        System.out.println(convertHanzi2Pinyin("弗格森的广东省",false).toUpperCase());
    }
%>
<%
		Context context = Framework.getFrameContext(session);
		String objectId=request.getParameter("objectId");
	
		String urlPath = request.getSession().getServletContext().getRealPath("/") ;
		String ids[] = objectId.split(",");
		urlPath=urlPath+"upload/";
		System.out.println(urlPath);
		context = Framework.getFrameContext(session);
		
		
		
		
		
		List shipList = new ArrayList();
		List scopeList = new ArrayList();
	
		String folder = System.nanoTime() + "";
		ContextUtil.pushContext(context);
		BusinessObject bo = new BusinessObject("Document", "ProcessKnowledgeShipTypeAndScope", "0", "eService Production");
		if (bo.exists(context)) {
			
			String fileName = MqlUtil.mqlCommand(context, "print bus " + bo.getObjectId(context) + " select format.file.name dump;");
			String path = urlPath + "/" + folder;
			File file = new File(path);
			if (!file.exists()) {
				file.mkdirs();
			}

			if (UIUtil.isNotNullAndNotEmpty(fileName)) {
				bo.checkoutFile(context, false, "generic", fileName, path);
				shipList = getNodes(path+"/"+fileName,"ShipTypeList");
				scopeList = getNodes(path+"/"+fileName,"ScopeList");
			}
		}
		ContextUtil.popContext(context);

	
%>



<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<meta name="description" content="" />
<link rel="stylesheet" type="text/css" href="slidernav.css?v=1.0.11" media="screen, projection" />
<script type="text/javascript" src="jquery-1.4.2.min.js?v=1.1"></script>
<script type="text/javascript" src="slidernav.js?v=1.1"></script>
<script type="text/javascript">
$(document).ready(function(){
	$('#slider').sliderNav();
});
</script>
<style>
*{margin:0;padding:0;list-style-type:none;}
a,img{border:0;}
body{font:12px/180% Arial, Helvetica, sans-serif, "新宋体";background:#eee;}
/* demo */
.demo{width:50%;margin:20px auto;}
</style>


</head>
<body>

<h3 style="text-align:center"><font style="color:black;font-family:Microsoft YaHei UI Light;font-weight:bold"><b>适用船型:</b></font></h3>
	<hr>
	
				
<div class="demo">
	
	<div id="slider">
		<div class="slider-content">
			
			<ul>
					<%
						String val = "";
						
						List<String>lista = new ArrayList<String>();
						List<String>listb = new ArrayList<String>();
						List<String>listc = new ArrayList<String>();
						List<String>listd = new ArrayList<String>();
						List<String>liste = new ArrayList<String>();
						List<String>listf = new ArrayList<String>();
						List<String>listg = new ArrayList<String>();
						List<String>listh = new ArrayList<String>();
						List<String>listi = new ArrayList<String>();
						List<String>listj = new ArrayList<String>();
						List<String>listk = new ArrayList<String>();
						List<String>listl = new ArrayList<String>();
						List<String>listm = new ArrayList<String>();
						List<String>listn = new ArrayList<String>();
						List<String>listo = new ArrayList<String>();
						List<String>listp = new ArrayList<String>();
						List<String>listq = new ArrayList<String>();
						List<String>listr = new ArrayList<String>();
						List<String>lists = new ArrayList<String>();
						List<String>listt = new ArrayList<String>();
						List<String>listu = new ArrayList<String>();
						List<String>listv = new ArrayList<String>();
						List<String>listw = new ArrayList<String>();
						List<String>listx = new ArrayList<String>();
						List<String>listy = new ArrayList<String>();
						List<String>listz = new ArrayList<String>();
						List<String>listOther = new ArrayList();
						List<String>isChecked = new ArrayList();
						
						System.out.println("shipList---1----->>>"+shipList);
						for(int i = 0;i<shipList.size();i++){
						String shipName = (String)shipList.get(i);
						System.out.println("ids---1----->>>"+ids.length);
						
						if(ids!=null &&ids.length>=1){
							String oid = ids[0];
							String values = MqlUtil.mqlCommand(context,"print bus "+oid+" select attribute[PLMEntity.V_description] dump");
							System.out.println("values---1----->>>"+values);
							 if(values!=null &&values.length()>0&&values.contains(";")) {
									String shipNames = values.substring(0,values.indexOf(";"));
									
									String []sName = shipNames.split(",");
									for(int x = 0;x<sName.length;x++){
										String nm = sName[x].trim();
										
										if(shipName.equals(nm)){
											
											
											isChecked.add(shipName);
										}
									
								
								}
							 }
						}
							String pnin = convertHanzi2Pinyin(shipName,false).toUpperCase();
							if(pnin.startsWith("A")){
								lista.add(shipName);
							}else if(pnin.startsWith("B")){
								listb.add(shipName);
							}else if(pnin.startsWith("C")){
								listc.add(shipName);
							}else if(pnin.startsWith("D")){
								listd.add(shipName);
							}else if(pnin.startsWith("E")){
								liste.add(shipName);
							}else if(pnin.startsWith("F")){
								listf.add(shipName);
							}else if(pnin.startsWith("G")){
								listg.add(shipName);
							}else if(pnin.startsWith("H")){
								listh.add(shipName);
							}else if(pnin.startsWith("I")){
								listi.add(shipName);
							}else if(pnin.startsWith("J")){
								listj.add(shipName);
							}else if(pnin.startsWith("K")){
								listk.add(shipName);
							}else if(pnin.startsWith("L")){
								listl.add(shipName);
							}else if(pnin.startsWith("M")){
								listm.add(shipName);
							}else if(pnin.startsWith("N")){
								listn.add(shipName);
							}else if(pnin.startsWith("O")){
								listo.add(shipName);
							}else if(pnin.startsWith("P")){
								listp.add(shipName);
							}else if(pnin.startsWith("Q")){
								listq.add(shipName);
							}else if(pnin.startsWith("R")){
								listr.add(shipName);
							}else if(pnin.startsWith("S")){
								lists.add(shipName);
							}else if(pnin.startsWith("T")){
								listt.add(shipName);
							}else if(pnin.startsWith("U")){
								listu.add(shipName);
							}else if(pnin.startsWith("V")){
								listv.add(shipName);
							}else if(pnin.startsWith("W")){
								listw.add(shipName);
							}else if(pnin.startsWith("X")){
								listx.add(shipName);
							}else if(pnin.startsWith("Y")){
								listy.add(shipName);
							}else if(pnin.startsWith("Z")){
								listz.add(shipName);
							}else {
								listOther.add(shipName);
							}
						}
						%>
						<li id="a"><a name="a" class="title">A</a>
						<%
						
						for(int a = 0;a<lista.size();a++){
							String checked = ""; 
							String checkedStyle = "";	
							val = (String)lista.get(a);
							if(isChecked.contains(val)){
								checked = "checked";
								checkedStyle = "background-color:#b8f3ff";
							}	
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="b"><a name="b" class="title">B</a>
						<%
						
						for(int a = 0;a<listb.size();a++){
							String checked = ""; 
							String checkedStyle = "";	
							val = listb.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
				<li id="c"><a name="c" class="title">C</a>
						<%
						
						for(int a = 0;a<listc.size();a++){
							String checked = "";	
							String checkedStyle = "";	
							val = listc.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
				<li id="d"><a name="d" class="title">D</a>
						<%
						
						for(int a = 0;a<listd.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listd.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="e"><a name="e" class="title">E</a>
						<%
						
						for(int a = 0;a<liste.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = liste.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="f"><a name="f" class="title">F</a>
						<%
						
						for(int a = 0;a<listf.size();a++){
							String checked = "";	
							String checkedStyle = "";	
							val = listf.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="g"><a name="g" class="title">G</a>
						<%
						
						for(int a = 0;a<listg.size();a++){
							String checked = "";	
							String checkedStyle = "";	
							val = listg.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="h"><a name="h" class="title">H</a>
					<%
						
						for(int a = 0;a<listh.size();a++){
							String checked = "";	
							String checkedStyle = "";	
							val = listh.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
									
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="i"><a name="i" class="title">I</a>
						<%
						
						
						for(int a = 0;a<listi.size();a++){
							String checked = "";	
							String checkedStyle = "";	
							val = listi.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="j"><a name="j" class="title">J</a>
						<%
						
						for(int a = 0;a<listj.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listj.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="k"><a name="k" class="title">K</a>
						<%
						
						for(int a = 0;a<listk.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listk.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="l"><a name="l" class="title">L</a>
						<%
						
						for(int a = 0;a<listl.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listl.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="m"><a name="m" class="title">M</a>
					<%
						
						for(int a = 0;a<listm.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listm.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="n"><a name="n" class="title">N</a>
						<%
					
						for(int a = 0;a<listn.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listn.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="o"><a name="o" class="title">O</a>
						<%
						
						for(int a = 0;a<listo.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listo.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="p"><a name="p" class="title">P</a>
						<%
						
						for(int a = 0;a<listp.size();a++){	
							String checked = "";
							String checkedStyle = "";	
							val = listp.get(a);
						
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
							
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="q"><a name="q" class="title">Q</a>
						<%
						
						for(int a = 0;a<listq.size();a++){
							String checked = "";	
							String checkedStyle = "";
							val = listq.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="r"><a name="r" class="title">R</a>
						<%
						
						for(int a = 0;a<listr.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = listr.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="s"><a name="s" class="title">S</a>
					<%
						
						for(int a = 0;a<lists.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = lists.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="t"><a name="t" class="title">T</a>
					<%
						
						for(int a = 0;a<listt.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = listt.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="u"><a name="u" class="title">U</a>
						<%
						
						for(int a = 0;a<listu.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = listu.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="v"><a name="v" class="title">V</a>
						<%
						
						for(int a = 0;a<listv.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = listv.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="w"><a name="w" class="title">W</a>
						<%
					
						for(int a = 0;a<listw.size();a++){
							String checked = "";	
							String checkedStyle = "";
							val = listw.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="x"><a name="x" class="title">X</a>
						<%
						
						for(int a = 0;a<listx.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = listx.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="y"><a name="y" class="title">Y</a>
						<%
					
						for(int a = 0;a<listy.size();a++){	
							String checked = "";
							String checkedStyle = "";
							val = listy.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				</li>
				
					<li id="z"><a name="z" class="title">Z</a>
						<%
						
						for(int a = 0;a<listz.size();a++){
							String checked = "";
							String checkedStyle = "";							
							val = listz.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				   </li>
				   <li id="z"><a name="z" class="title">其他</a>
						<%
						String checked = "";	
						String checkedStyle = "";
						for(int a = 0;a<lista.size();a++){	
							val = lista.get(a);
							if(isChecked.contains(val)){
									checked = "checked";
									checkedStyle = "background-color:#b8f3ff";
							}		
						%>
						<li style="<%=checkedStyle%>"><a><input type="checkbox"  name="favorite" value="<%=val%>"  <%=checked%>  onClick="setColor(this)" />&nbsp;&nbsp;&nbsp; <%=val%></a></li>
						<%
						}
						
						%>
						
					
				   </li>
			</ul>
		</div>
	</div>

</div>
<script>
	function setColor(checkbox){
		
		if ( checkbox.checked == true){
			checkbox.parentElement.parentElement.style.backgroundColor='#b8f3ff';
		}else{
			checkbox.parentElement.parentElement.style.backgroundColor='';
		}
	}
</script>
</body>
</html>