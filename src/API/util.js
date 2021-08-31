var allIndex;
var isSubject=true;
var jstimestamp = Date.parse(new Date())/1000;
// 发送ajax请求、 地址、 参数
function toAjaxCRUD(url, data) {
	var d = null;
	$.ajax({
		cache : true,
		type : "POST",
		url : url,
		data : data,
		async : false,
		success : function(data) {
			layer.close(allIndex); // 关闭加载层
			d = data;
		}
	});
	return d;
}


// 发送ajax请求、 地址、 参数 回掉
function toAjaxCRUDCallBack(url, data,callBack,errorCallBack) {
	$.ajax({
		global:true,
		cache : true,
		type : "POST",
		url : url,
		data : data,
		async : true,
		success : function(data) {
			callBack(data);
			// layer.close(allIndex); // 关闭加载层
		},error:function(d){
			if(errorCallBack)errorCallBack(d);
		}
	});
}

// 发送ajax请求、 地址、 参数 回掉 同步
function toAjaxCRUDCallBackAsync(url, data,callBack,errorCallBack) {
	$.ajax({
		global:true,
		cache : true,
		type : "POST",
		url : url,
		data : data,
		async : false,
		success : function(data) {
			callBack(data);
			// layer.close(allIndex); // 关闭加载层
		},error:function(d){
			if(errorCallBack)errorCallBack(d);
		}
	});
}


// 发送ajax请求、 地址、 参数 回掉
function toAjaxCRUDCallBackFalseGlobal(url, data,callBack,errorCallBack) {
	$.ajax({
		global:false,
		cache : true,
		type : "POST",
		url : url,
		data : data,
		async : true,
		success : function(data) {
			callBack(data);
			// layer.close(allIndex); // 关闭加载层
		},error:function(d){
			if(errorCallBack)errorCallBack(d);
		}
	});
}

// 询问弹框
function openConfirm(code, title, content, callback) {
	layer.open({
	    title: title,
	    content: content,
	    btn : [ '确定', '取消' ],
	    yes: function(index){
	    	if (callback)
				callback(index);// 回调
	    }, no: function(index){
	    	layer.close(index);
	    }
	});
}
// 询问弹框
function openConfirmDoc(code, title, content, callback) {
	layer.open({
		title: title,
		content: content,
		btn : [ '确定', '取消' ],
		yes: function(index){
			layer.close(index);
			if (callback)
				callback(index);// 回调
		}, no: function(index){
			layer.close(index);
		}
	});
}



// 提醒弹框
function openAlert(content, callback) {
	layer.open({
	    content: content,
	    btn: ['确认'],
	    shadeClose: false,
	    yes: function(index){
	    	layer.close(index); // 如果设定了yes回调，需进行手工关闭
	    	if (callback)
				callback(index);// 回调
	    }
	});
}


// 提醒弹框
function openAlertMsg(content) {
	layer.open({
	    content:content,
	    shade:false,
	    style: 'background-color:rgba(0,0,0,.6); color:#fff; border:none;min-width:100px',
	    time: 2
	});
}

function openCommonMsg(content){
	layer.open({
	    content:content,
	    shade:false,
	    style: 'background-color:rgba(0,0,0,.6); color:#fff; border:none;min-width:100px',
	    time: 2
	});
}

// 提醒弹框
function openAlertMsgLoad(content) {
	/*
	 * layer.open({ content:'<i class="layui-layer-ico layui-layer-ico16"></i>'+((null==content)?'保存中...':content),
	 * style: 'background-color:rgba(0,0,0,.6);
	 * color:#0000;background-color:#fff;
	 * border:none;min-width:150px;min-height:100px;height:15%', time: 2000 });
	 */
	/*layer.open({shadeClose: false,content: '<div class="shade_up"><div class="fl loader"><div class="loader-inner ball-clip-rotate"><div></div></div></div><span>'+(null==content||""==content?'上传中':content)+'...</span></div>',
		style:'background-color:rgba(0,0,0,0);box-shadow: 0 0 8px rgba(0, 0, 0, 0);',
		time: 2000});*/
	 layer.open({
		    type: 2
		    ,content: content
		  });
}



function closeAll(){
	layer.closeAll();
}

// 提醒弹框
function openAlertCloseAll(content, callback) {
	layer.open({
	    content: content,
	    btn: ['确认'],
	    shadeClose: false,
	    yes: function(index){
	    	layer.closeAll(); // 如果设定了yes回调，需进行手工关闭
	    	if (callback)
				callback(index);// 回调
	    }
	});
}

// 自定义弹出框
function openCustom(content,callback) {
	layer.open({
	    content: content,
	    btn: ['确认', '取消'],
	    shadeClose: false,
	    yes: function(index){
	    	layer.close(index);// 如需取消关闭 则注释
	    	if(callback)
				eval(callback);
	    }, no: function(index){
	    	layer.close(index);
	    }
	});
}

// 自定义弹出框
function openCustomDoubleBack(content,callback,callback1) {
	layer.open({
	    content: content,
	    btn: ['是', '否'],
	    shadeClose: false,
	    yes: function(index){
	    	layer.close(index);// 如需取消关闭 则注释
	    	if(callback)
	    		callback(index);
	    }, no: function(index){
	    	layer.close(index);
	    	if(callback1)
	    		callback1(index);
	    }
	});
}


// 自定义弹出框
function openCustomCall(content,callback) {
	layer.open({
	    content: content,
	    btn: ['确认', '取消'],
	    shadeClose: false,
	    yes: function(index){
	    	layer.close(index);// 如需取消关闭 则注释
	    	if(callback)
				callback(index);
	    }, no: function(index){
	    	layer.close(index);
	    }
	});
}

// 时间戳转日期
function getLocalTime(nS) {   
	  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
} 
// 时间戳转日期
function   formatDate(nS)   {    
	 var now=new  Date(parseInt(nS) * 1000);
    var   year=now.getFullYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+isDouble(month)+"-"+isDouble(date)+"   "+isDouble(hour)+":"+isDouble(minute)+":"+isDouble(second);     
}  

// 时间戳转日期
function   formatDateYYYYMMDDHM(nS)   {    
	 var now=new  Date(parseInt(nS) * 1000);
    var   year=now.getFullYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+isDouble(month)+"-"+isDouble(date)+"   "+isDouble(hour)+":"+isDouble(minute);     
} 

// 获取当前日期
function   formatDateMMDDW()   { 
	var show_day=new Array('周日','周一','周二','周三','周四','周五','周六'); 
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate(); 
	  var day1=date.getDay(); 
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return month + '月' + day+'日 '+' '+show_day[day1];    
} 

// 获取当前日期 年月日时分
function   formatDateYYMMDDHHMM()   { 
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate(); 
	  var day1=date.getDay(); 
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year+'-'+month + '-' + day+' '+hour+':'+minute;    
}

//获取当前日期 年月日时分
function   formatDateYYMMDD()   { 
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate(); 
	return year+'-'+month + '-' + day;    
}

//获取当前日期 日
function   formatDateDay()   { 
	var date = new Date();
	var day = date.getDate(); 
	return day;    
}

// 时间戳转日期
function   formatDateYYYYMMDD(nS)   {    
	 var now=new  Date(parseInt(nS) * 1000);
    var   year=now.getFullYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+isDouble(month)+"-"+isDouble(date);     
} 


// 时间戳转日期
function   formatDateMMDD(nS)   {    
	 var now=new  Date(parseInt(nS) * 1000);
 var   year=now.getFullYear();     
 var   month=now.getMonth()+1;     
 var   date=now.getDate();     
 var   hour=now.getHours();     
 var   minute=now.getMinutes();     
 var   second=now.getSeconds();     
 return   isDouble(month)+"-"+isDouble(date);     
} 

// 时间戳转日期
function   formatDateSimple(nS)   {    
	 var now=new  Date(parseInt(nS) * 1000);
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    return  isDouble(month)+"-"+isDouble(date)+"   "+isDouble(hour)+":"+isDouble(minute);     
}

function addDate(date,days){
	var d=new Date(date);
	d.setDate(d.getDate()+parseInt(days));
	var month=d.getMonth()+1;
	var day = d.getDate();
	if(month<10){
		month = "0"+month;
	}
	if(day<10){
		day = "0"+day;
	}
	var val = d.getFullYear()+"-"+month+"-"+day;
	return val;
}

function addMonth(date,days){
	var d=new Date(date);
	d.setMonth(d.getMonth()+parseInt(days));
	var month=d.getMonth()+1;
	var day = d.getDate();
	if(month<10){
		month = "0"+month;
	}
	if(day<10){
		day = "0"+day;
	}
	var val = d.getFullYear()+"-"+month+"-"+day;
	return val;
}

function isDouble(str){
	if(str<10){
		return "0"+str;
	}
	else{
		return str;
	}
}

function dateToTimestamp(str,flag){
	if(null==str||""==str){
		return null;
	}
	var timestamp=null;
	try{
		if(flag){
			str=str.trim()+" 23:59:59";
		}
		timestamp = Date.parse(new Date(str.trim()));
		timestamp = timestamp / 1000;
	}catch (e) {
		return null;
	}
	return timestamp;
}

      
      /**
		 * 滑动分页
		 * 
		 * @param id
		 * @param url
		 * @param datas
		 * @param listName
		 * @param list
		 */
      function scrollPage(id,url,datas,listName,list,nums,flag,isScroll){
    	  var counter = 0;
    		// 每页展示5个
    		var num = (null==nums?5:nums);
    		var pageStart = 0;
    		
    		if(null==datas){
    			datas= {"page" : pageStart+1,"row" : num};
    		}
    		else{
    			datas.page=pageStart+1;
        		datas.row=num;
    		}
    		var soure = $(listName).html();
    		var template = Handlebars.compile(soure);
    		// dropload
    		$('.dropload-down').remove();
    		if(null==flag||!flag){
    			$(list).empty();
    		}
    		$(id).dropload({
    			scrollArea : null==isScroll?window:isScroll,
    			loadDownFn : function(me) {
    				datas.page=pageStart+1;
            		datas.row=num;
            		toAjaxCRUDCallBackFalseGlobal(url,datas, function(data) {
    					if (null == data || data.length == 0) {
    						// 锁定
    						me.lock();
    						me.noData();
        					me.resetload();
    						if($(".submit-testbox")[0])
    						$(".submit-testbox").show();
    						if(datas.page==1){
    							$('.dropload-down').hide();
      	  						$(".integral_none").css("display","block");
      	  					}
    						return false;
    					}
    					 try {
    						  if(flag){
    							  $('.dropload-down').hide();
    							  $('.specialTest').show();
    						  }
    						  setDataArray(data);
    					   	} catch(e) {}
    					var result = '';
    					counter++;
    					$(".integral_none").css("display","none");
    					pageStart=counter * num;
    					var result = template(data);
    					if(null==flag||!flag){
    						$(list).append(result);
    					}else{
    						$(list).prepend(result);
    					}
    					if( data.length < num && pageStart==num){
	  	  						$('.dropload-down').hide();
	  	  						$('.dropdownarrow').hide();
	  	  				}   
    					me.resetload();
    				}, function() {
    					me.lock();
    					// me.resetload();
    				});
    			}
    		});
      }
      
      /**
		 * 滑动分页带搜索
		 * 
		 * @param id
		 * @param url
		 * @param datas
		 * @param listName
		 * @param list
		 */
    function scrollPageBySearch(id,url,datas,listName,list,nums){
  	  var counter = 0;
  		// 每页展示5个
  		var num = (null==nums?5:nums);
  		var pageStart = 0;
  		
  		if(null==datas){
  			datas= {"page" : pageStart+1,"row" : num};
  		}
  		else{
  			datas.page=pageStart+1;
      		datas.row=num;
  		}
  		var soure = $(listName).html();
  		var template = Handlebars.compile(soure);
  		// dropload
  		$('.dropload-down').remove();
  		$(list).empty();
  		$(id).dropload({
  			scrollArea :window,
  			loadDownFn : function(me) {
  				datas.page=pageStart+1;
          		datas.row=num;
          		try{
          			for(var key in datas) { 
          				if(key=='searchSort'){
          					if(datas.searchSort==null||datas.searchSort==""){
          						datas.searchSort = $("#searyBySort").attr("state");
          					}
          				} 
          				if(key=='docName'){
          					if(datas.docName==null||datas.docName==""){
          						datas.docName = $("#queryValues").val();
          					}
          				} 
          				if(key=='hosName'){
          					if(datas.hosName==null||datas.hosName==""){
          						datas.hosName =  $("#searyByArea").attr("state");
          					}
          				} 
          				if(key=='docPosition'){
          					if(datas.docPosition==null||datas.docPosition==""){
          						datas.docPosition = $("#searyByPostion").attr("state");
          					}
          				} 
          				if(key=='docPositionId'){
          					if(datas.docPositionId==null||datas.docPositionId==""){
          						datas.docPositionId = $("#searyByPostion").attr("posId");
          					}
          				} 
          			}
          		}catch (e) {
					// TODO: handle exception
				}
  				toAjaxCRUDCallBack(url,datas, function(data) {
  					if (null == data || data.length == 0) {
  						// 锁定
  						me.lock();
  						me.noData();
    					me.resetload();
  						// 显示提示信息
  						if(datas.page==1){
  							$('.dropload-down').hide();
  	  						$(".integral_none").css("display","block");
  	  					}
  						return false;
  					}
  					var result = '';
  					counter++;
  					pageStart=counter * num;
					$(".integral_none").css("display","none");
  					var result = template(data);
  					$(list).append(result);
  					if( data.length < num){
  	  					// 锁定
  	  						me.lock();
  	  						$('.dropload-down').hide();
  	  						return false;
  	  				}
  					me.resetload();
  				}, function() {
  					me.resetload();
  				});
  			}
  		});
    }

    /**
	 * 一个页面加载多个滑动分页
	 * 
	 * @param id
	 * @param url
	 * @param datas
	 * @param listName
	 * @param list
	 */
    function scrollPageByMore(id, url, datas, listName, list, nums, flag,alertClass) {
    	var counter = 0;
    	// 每页展示5个
    	var num = (null==nums?5:nums);
    	
    	var pageStart = 0;

    	if (null == datas) {
    		datas = {
    			"page" : pageStart + 1,
    			"row" : num
    		};
    	} else {
    		datas.page = pageStart + 1;
    		datas.row = num;
    	}
    	var soure = $(listName).html();
    	var template = Handlebars.compile(soure);
    	// dropload
    	// $('.dropload-down').remove();
    	$(list).empty();
    	var e=$(id).dropload({
    		scrollArea : null == flag ? window : flag,
    		loadDownFn : function(me) {
    			datas.page = pageStart + 1;
    			datas.row = num;
    			toAjaxCRUDCallBack(url, datas, function(data) {
    				if (null == data || data.length == 0) {
    					// 锁定
    					me.lock();
    					// $('.dropload-down').hide();
    					var html=$(list).html();
    					if(null==html||""==html.trim()){
    						$(list).parent().find('.dropload-down').hide();
    						$(alertClass).show();
    					}else{
    						me.noData();
        					me.resetload();
    						$(alertClass).hide();
    					}
    					// 显示提示信息
    					return false;
    				}
    				var result = '';
    				counter++;
    				pageStart = counter * num;
    				var result = template(data);
    				$(list).append(result);
    				me.resetload();
    			}, function(error) {
    				me.resetload();
    			});
    		}
    	});
    	return e;
    }
    
    
    
    
function formatJiage(jiage){
	if(jiage==null||jiage==''){
		return 0;
	}else{
		var jiage0 = jiage.toString().split(".")[0];
		var jiage1 = jiage.toString().split(".")[1];
		if(jiage1.length==1){
			if(jiage1==0){
				return jiage0;
			}else{
				return jiage;
			}
		}else{
			return jiage;
		}
	}
}




// 上传图片
function uploadImage(fileId,src,param,callback,isAsyn){
	openAlertMsgLoad("上传中");
	var fileObj = document.getElementById(fileId).files; // 获取文件对象
	 if(null==fileObj){
		 closeAll();
		 openAlertMsg('请选择文件'); 
		 return false;
	 }
	 var filepath=$("#"+fileId).val();
	  var extStart=filepath.lastIndexOf(".");
	  var ext=filepath.substring(extStart,filepath.length).toUpperCase();
	  if(ext!=".JPEG"&&ext!=".JPG"&&ext!=".GIF"&&ext!=".AI"&&ext!=".PDG"&&ext!=".PNG"){
		  closeAll();
		  openAlertMsg("请选择正确的图片格式!");
		  return false;
	  }
  var FileController = src;                    // 接收上传文件的后台地址
  // FormData 对象
  var form = new FormData();
  if(null!=param){
	    var jsonObj = param;// eval('(' + param + ')');
	 // 传回ID报错
	    for(var item in jsonObj){  
	        form.append(item,jsonObj[item]); 
	    }  
  }
  for(var i=0;i<fileObj.length;i++){
		 form.append("multipartFile", fileObj[i]);                           // 文件对象
	 }
  // 文件对象
  // XMLHttpRequest 对象
  var xhr = new XMLHttpRequest();
  if(isAsyn==null){
	  isAsyn=true;
  }
  xhr.open("post", FileController, isAsyn);
  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	        } else {
	        	openAlertMsg('上传失败!图片大小应小于5M');
	        }
	    }
	}; 
	 xhr.onload = function (data) {
		var responseUrl = this.responseText;
		var json = eval('(' + responseUrl + ')'); 
  	if(null==this.responseText){
  		openAlertMsg('上传失败!'); 
  	}else{
  		openAlertMsg('上传成功!'); 
  		if(callback){
  			callback(json);
  		}
  	}
  	
  };
  xhr.send(form);  
};

function imgPreview(fileId,param,callback,isAsyn){
	var fileTag = document.getElementById(fileId);
	var file = fileTag.files[0];
	fileType = file.type;  
    var filepath=$("#"+fileId).val();
    if(/image\/\w+/.test(fileType)){  
    	if(file.size>=204800){
    		var image = new Image();
        	var canvas = document.createElement('canvas'); 
        	ctx = canvas.getContext("2d");
        	openAlertMsgLoad("上传中");
            var fileReader = new FileReader();  
            fileReader.readAsDataURL(file);  
            fileReader.onload = function(event){  
                var result = fileReader.result;   //返回的dataURL  
                var image = new Image();  
                image.src = result;  
                image.onload = function(){  //创建一个image对象，给canvas绘制使用  
                    var cvs = document.createElement('canvas');  
                    var scale = 1;    
                    if(this.width > 1000 || this.height > 1000){  //1000只是示例，可以根据具体的要求去设定    
                        if(this.width > this.height){    
                            scale = 500 / this.width;  
                        }else{    
                            scale = 500 / this.height;    
                        }    
                    }  
                    cvs.width = this.width*scale;    
                    cvs.height = this.height*scale;     //计算等比缩小后图片宽高  
                    var ctx = cvs.getContext('2d');    
                    ctx.drawImage(this, 0, 0, cvs.width, cvs.height);     
                    var newImageData = cvs.toDataURL(fileType, 0.8);   //重新生成图片，<span style="font-family: Arial, Helvetica, sans-serif;">fileType为用户选择的图片类型</span>  
                    var sendData = newImageData.replace("data:"+fileType+";base64,",'');  
                    $.post('thumUpload.action',{type:filepath,base64String:sendData,dirName:param},function(data){  
                    	closeAll();
                    	if(data.urllist[0].error == '0'){  
                        	closeAll();
                        	openAlertMsg('上传成功!'); 
                      		if(callback){
                      			callback(data);
                      		}
                        }else{ 
                        	closeAll();
                        	openAlertMsg(data.message);  
                        }  
                    });  
                }  
                  
            }  
    	}else{
    		uploadImage(fileId,"uploadImages.action",param,callback,isAsyn);
    	}
    }else{  
    	closeAll();
    	openAlertMsg('请选择图片格式文件');  
    } 
}
/**
 * 截取get url参数
 * @param name
 * @returns
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

//动态加载js脚本文件
function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}

//原预览功能
function imgLocalPreview(fileId,showId){
	var fileTag = document.getElementById(fileId);
	var file = fileTag.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
        if (fileReader.readyState == fileReader.DONE) {
            document.getElementById(showId).setAttribute('src', fileReader.result);
        }
    };
    fileReader.readAsDataURL(file);
}


function setUrlSign(){
	var urlSign=getQueryString("urlSign");
	if(urlSign!=undefined){
		Util.clean("urlSign");
		Util.set("urlSign",urlSign);
	}
}
function getVerifySign(){
	return 
}

function goBack(){
	var urlSign=Util.get("urlSign");
	if(urlSign!=undefined){
		location.href="/TennisCenterInterface/weixin/serve/serve_index.html?sign="+urlSign;
	}else{
		location.href=history.back(-1);
	}
}

/*
function uploadThum(fileId,src,param,callback){
	openAlertMsgLoad("上传中");
	var fileObj = document.getElementById(fileId).files; // 获取文件对象
	 if(null==fileObj){
		 closeAll();
		 openAlertMsg('请选择文件'); 
		 return false;
	 }
	 var filepath=$("#"+fileId).val();
	  var extStart=filepath.lastIndexOf(".");
	  var ext=filepath.substring(extStart,filepath.length).toUpperCase();
	  if(ext!=".JPEG"&&ext!=".JPG"&&ext!=".GIF"&&ext!=".AI"&&ext!=".PDG"&&ext!=".PNG"){
		  closeAll();
		  openAlertMsg("请选择正确的图片格式!");
		  return false;
	  }
	  var FileController = src; 
	lrz(fileObj[0], {
		width : window.screen.availHeight,
		height:window.screen.availWidth
	}).then(function(rst) {
		var submitData = {
			base64String : rst.base64,
			name : rst.origin.name,
			fileLength : rst.base64.length,
			dirName:param
		};
		$.ajax({
			type : "POST",
			url : FileController,
			data : submitData,
			dataType : "json",
			beforeSend : function(XMLHttpRequest) {
				showLoader();
			},
			success : function(data) {
				console.log(data);
				if ("1" == data.error) {
					closeAll();
					alert(data.message);
					return false;
				} else {
					openAlertMsg('上传成功!'); 
			  		if(callback){
			  			callback(data);
			  		}
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
				hideLoader();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) { // 上传失败
				hideLoader();
				alert('操作错误');
			}
		});
		// alert(rst.base64);
		return rst;
	});
}

function showLoader() {
	// 显示加载器.for jQuery Mobile 1.2.0 以上
	$.mobile.loading('show', {
		text : '正在提交数据', // 加载器中显示的文字
		textVisible : true, // 是否显示文字
		theme : 'a', // 加载器主题样式a-e
		textonly : false, // 是否只显示文字
		html : "" // 要显示的html内容，如图片等，默认使用Theme里的ajaxLoad图片
	});
}
function hideLoader() {
	// 隐藏加载器
	$.mobile.loading('hide');
}*/