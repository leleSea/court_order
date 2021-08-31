var Util = {};
import $ from 'jquery'

$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "/TennisCenterInterface/umUser/judgeWXuser.action",
        async: false,
        success: function (data) {
            /*alert("初始化方法进入"+JSON.stringify(data));
            if(data.respCode=="1001"){
                Util.set("loginkey",JSON.stringify(data));
                Util.set("user",JSON.stringify(data.datas.user));
            }else{
                openConfirm("1","提示","您还没有登录，请登录后查看信息。",function(){
                    window.location.href='/TennisCenterInterface/weixin/myself/login.html';
                });
            }*/
        }
    });
});

//设置缓存
Util.set = function (key, value) {
    localStorage[key] = value;
}

//获取缓存
Util.get = function (key) {
    return localStorage[key];
}

//删除缓存
Util.clean = function (key) {
    //localStorage.clear(key);
    localStorage.removeItem(key);
}

//设置缓存，value为JSON对象
Util.setJSON = function (key) {
    var json = localStorage[key];
    if (json == undefined) {
        return null;
    }
    return JSON.parse(json);
}
/**
 * 截取get url参数
 * @param name
 * @returns
 */
Util.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
};

Util.TimeData = function (time) {//获取时间，下拉框，带小时
    if (time < 7) {
        time = 7;
    }
    var arr = new Array();
    var childrenArr = new Array();

    for (var int = 1; int < 3; int++) {
        let obj = new Object();
        let a = "value";
        let b = "text";
        obj[a] = int;
        obj[b] = int + "小时";
        childrenArr.push(obj);
    }
    for (int = time; int < 23; int++) {
        let obj = new Object();
        let a = "value";
        let b = "text";
        let c = "children";
        obj[a] = int;
        obj[b] = int + ":00";
        obj[c] = childrenArr;
        arr.push(obj);
    }
    return arr;
};
Util.getTime = function () {//获取当前日期，格式为yyyy-mm-dd
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var nowdate = "";
    nowdate += year + "-";
    if (month >= 10) {
        nowdate += month + "-";
    }
    else {
        nowdate += "0" + month + "-";
    }
    if (day >= 10) {
        nowdate += day;
    }
    else {
        nowdate += "0" + day;
    }
    return nowdate;
};
Util.addOneDay = function (date, int) {//给固定日期加  int 天
    var day = new Date(date);
    var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    day.setDate(day.getDate() + int);
    var day1 = day.getDay();
    return day + "," + show_day[day1];
};
Util.getWeek = function (date) {//给固定日期换成周几
    var day = new Date(date);
    var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    var day1 = day.getDay();
    return show_day[day1];
};
Util.getMonthDay = function (date) {//给固定日期换成月 日
    let day = new Date(date);
    let month = day.getMonth() + 1;
    date = day.getDate();
    return month + "-" + date;
};
//获取会员卡信息
Util.getCard = function () {
    var data = Util.get("user");
    var userid = "-1";
    if (data != null && data != "" && data != undefined) {
        var user = eval('(' + data + ')');
        userid = user.id;
    }
    var cardType;
    // toAjaxCRUDCallBackAsync("/TennisCenterInterface/umCard/getCardByUser.action",{
    // 	userid:userid
    // },function(data){
    // 	if(data.respCode=="1001"){
    // 		cardType =data.datas;
    // 	}else{
    // 		openAlertMsg(data.respMsg);
    // 	}
    // });
    return cardType;
};
//判断对象是否为空，true为空，false不为空
Util.isEmptyObject = function (obj) {
    for (var key in obj) {
        return false
    };
    return true
};

//获取7天日期
Util.getDaySeven = function (obj) {
    var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    var arr = new Array();
    console.log("obj = " + obj)
    if (obj == undefined) {
        obj = new Date().format("yyyy-MM-dd");
    }
    var dateArr = String(obj).split("-");
    console.log("dateArr = " + dateArr);
    var year = parseInt(dateArr[0]);
    var month;
    //处理月份为0x这样的情况
    if (dateArr[1].indexOf("0") == 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    var day = parseInt(dateArr[2]);
    var date = new Date(year, month - 1, day);


    for (var i = 0; i < 8; i++) {
        var tmpDate = new Date();
        tmpDate.setDate(date.getDate() + i);
        let obj = new Object();
        let a = "value";
        let b = "text";
        let month = tmpDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = tmpDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        obj[a] = tmpDate.getFullYear() + "-" + month + "-" + day;
        if (i == 0) {
            obj[b] = "(" + month + "月" + day + "日)今天";
        } else if (i == 1) {
            obj[b] = "(" + month + "月" + day + "日)明天";
        } else if (i == 2) {
            obj[b] = "(" + month + "月" + day + "日)后天";
        } else {
            obj[b] = "(" + month + "月" + day + "日)" + show_day[tmpDate.getDay()];
        }
        arr.push(obj)
        console.log("arr = " + arr);
    }

    return arr;

};

Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;

};





