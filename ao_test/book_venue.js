var _parlength = -1;
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    //订场状态 type 0正常 1转场
    $scope.type = decodeURI(Util.GetQueryString("type"));//类型
    //之前场地id
    $scope.detailids = decodeURI(Util.GetQueryString("detailids"));//类型

    // 设置日期，及周几
    var date = new Date();
    $scope.day = date;
    var day2 = (Util.addOneDay(date, 1)).split(",");
    $scope.day2 = new Date(day2[0]);
    $scope.day2week = day2[1];

    var day3 = (Util.addOneDay(date, 2)).split(",");
    $scope.day3 = new Date(day3[0]);
    $scope.day3week = day3[1];

    var day4 = (Util.addOneDay(date, 3)).split(",");
    $scope.day4 = new Date(day4[0]);
    $scope.day4week = day4[1];

    var day5 = (Util.addOneDay(date, 4)).split(",");
    $scope.day5 = new Date(day5[0]);
    $scope.day5week = day5[1];

    var day6 = (Util.addOneDay(date, 5)).split(",");
    $scope.day6 = new Date(day6[0]);
    $scope.day6week = day6[1];

    var day7 = (Util.addOneDay(date, 6)).split(",");
    $scope.day7 = new Date(day7[0]);
    $scope.day7week = day7[1];

    var day8 = (Util.addOneDay(date, 7)).split(",");
    $scope.day8 = new Date(day8[0]);
    $scope.day8week = day8[1];

    var date = decodeURI(Util.GetQueryString("date"));// 日期
    $scope.date = date;

    var ballcode = decodeURI(Util.GetQueryString("ballcode"));// 球类id
    var parktypeinfo = decodeURI(Util.GetQueryString("parktypeinfo"));// 场地id

    //去除场地数据
    var parktypeArr = window.localStorage.getItem("parktypeArr");

    var arr = JSON.parse(parktypeArr);

    var isShowPark = decodeURI(Util.GetQueryString("isShowPark"))
    console.log(isShowPark);

    //场地数据
    var parktypeStr_1 = '';
    arr.forEach((elem, index) => {
        if (elem.id == parktypeinfo) {
            parktypeStr_1 += '<a class="index_place_check" parkcode="' + elem.id + '">' + elem.parktype + '</a>';
        } else {
            parktypeStr_1 += '<a parkcode="' + elem.id + '">' + elem.parktype + '</a>';
        }

    });
    $("#parktype_1").append(parktypeStr_1);

    //加载场地数据
    var parkAry = new Array();
    $scope.loading = function (date) {
        $(".loding").show();


        var userid = "-1";
        var cardtypecode = "-1";
        var user = Util.get("user");// 获取缓存user
        if (user != undefined) {
            userobj = eval('(' + user + ')');
            userid = userobj.id;
            $scope.userid = userid;
            var card = Util.getCard();
            if (card != undefined && card != null && card != ""
                && card.cardtypecode != undefined) {
                cardtypecode = card.cardtypecode;
            } else {
                cardtypecode = "-1";
            }
        }
        var parkstatus = "0";
        var data = new FormData();
        data.append('userid', userid);
        data.append('cardtypecode', cardtypecode);
        data.append('date', date);
        data.append('ballcode', ballcode);
        data.append('parkstatus', parkstatus);
        data.append('parktypeinfo', parktypeinfo);
        //是否转场getParkShowByParam
        data.append('changefieldtype', $scope.type);
        console.log($scope.type);
        if ($scope.type == 1) {
            data.append('reserveDetailIds', JSON.stringify($.parseJSON($scope.detailids)));
        }
        $http({
            method: 'post',
            url: '/TennisCenterInterface/pmPark/getParkShowByParam.action',
            data: data,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity,
        }).then(function successCallback(response) {
            var data = response.data;

            if (data.respCode == 1074) {
                openConfirm1("1", "提示", "您还未登录，请登录以后选择场地。", function () {
                    window.location.href = '/TennisCenterInterface/weixin/myself/login.html';
                });
                return;
            }
            if (data.respCode == 1076) {
                openConfirm1("1", "提示", data.respMsg, function () {
                    window.location.href = '/TennisCenterInterface/weixin/myself/login.html';
                });
                return;
            }
            $scope.venList = data.datas.venList;
            if ($scope.venList && ($scope.venList.length) > 0) {
                angular.forEach($scope.venList, function (data, index, array) {
                    parkAry[index] = array[index].park;
                    $scope.park = array[0].park;
                });
                _parlength = $scope.park.length;
                // numTime();
                angular.forEach($scope.park, function (data, index, array) {
                    $scope.reserveTime = array[index].reserve
                });
                timeSurplus = data.datas.timeLimit.timeSurplus;
                $scope.timeSurplus = timeSurplus;
                //转场只能选一个
                if ($scope.type == 1) {
                    timeSurplus = 1;
                    $scope.timeSurplus = 1;
                }

            } else {
                openAlertMsg("无数据");
            }
            $(".loding").hide();
            // 请求成功执行代码
        }, function errorCallback(response) {
            openAlertMsg(response.data.respMsg);
            $(".loding").hide();
            // 请求失败执行代码
        });
    };

    $scope.loading(date);
    $scope.tab = function (int, event) {
        $scope.park = parkAry[int];
        $(".book_btnli").removeClass("book_btnli");
        $(event).addClass("book_btnli");
        setTimeout("addSelected()", 0)
    };
    // 周几菜单切换
    $(".date-wrap").on("click", ".date-ul li", function () {

        if (isShowPark == 0){
            openAlertMsg("您选择的场地距离开始小于24小时,不能更换日期");
            return;
        }

        $(this).addClass("active").siblings("li").removeClass("active");
        $(".book-orderinfo li").remove();
        $("#scroller ul li").removeClass("selected");
        selectIdArr = [];
        deleteArr();// 删除所选数据
        $('.book-tip').show();
        var active = $(".active").attr("data-t");
        $scope.loading(active);

    });

    //标签切换
    $(".place_cut a").on("click", function () {
        // if (isShowPark == 0){
        //     openAlertMsg("您选择的场地距离开始小于24小时,不能更换场地");
        //     return;
        // }

        $(this).addClass("index_place_check");
        $(this).siblings("a").removeClass("index_place_check");

        parktypeinfo = $("#parktype_1 .index_place_check").attr("parkcode");

        //更新数据
        $(".book-orderinfo li").remove();
        $("#scroller ul li").removeClass("selected");
        selectIdArr = [];
        deleteArr();// 删除所选数据
        $('.book-tip').show();
        var active = $(".active").attr("data-t");
        $scope.loading(active);
    });

});

// 询问弹框
function openConfirm1(code, title, content, callback) {
    layer.open({
        title: title,
        content: content,
        btn: ['确定'],
        yes: function (index) {
            if (callback)
                callback(index);// 回调
        }, no: function (index) {
            layer.close(index);
        }
    });
}

function numTime() {
    var isEqualInterval = setInterval(function () {
        var liLength = $(".book-area").find("li").length;
        if (liLength == _parlength) {
            isEqualsPars();
            clearInterval(isEqualInterval);
        }
    }, 100);
};

function isEqualsPars() {
    g.initScroll();
    g.scroll = new TouchScroll({
        id: 'wrapper',
        onscroll: function () {
            g.l = $(".touchscrollelement").position().left;
            g.t = $(".touchscrollelement").position().top;
            g.areaObj.css("left", g.l);
            g.timeObj.css("top", g.t);
        }
    })
}

// 点击取消按钮关闭详情
function cancel() {
    $(".book_layer").hide(200);
    $(".book_refund").hide(200);
    // $(".book_hint").hide();
};

// 退款
function refundOneTip(userid, orderno, detailid, price) {
    var str = '<li><span>退款金额：</span><span>'
        + price
        + '元</span></li><li><span>退还方式：</span><span class="book_way">现金将于1-7个工作日内退还到原支付方</span></li>';
    $(".book_refund .book_been_con").html(str);
    var StrButton = '<a onclick="cancel()">取消</a><a onclick="refund(&apos;'
        + userid + '&apos;,&apos;' + orderno + '&apos;,&apos;' + detailid
        + '&apos;)">确定</a>'
    $(".book_refund .book_been_btn").html(StrButton);
    $(".book_layer").hide(200);
    $(".book_refund").show(200);
};

function refund(userid, orderno, detailid) {
    toAjaxCRUDCallBackAsync(
        "/TennisCenterInterface/omOrder/refundPartTip.action", {
            userid: userid,
            orderno: orderno,
            detailids: detailid
        }, function (data) {
            if (data.respCode == "1001") {
                $('[detailid=' + detailid + ']').addClass('available');
            }
            openAlertMsg(data.respMsg);
            cancel();
        });
};

//申请代售
function applySellBtnClick(orderno,orderprice,userid,ordertypecode) {

    location.href = encodeURI("/TennisCenterInterface/weixin/myself/apply_sell.html?orderno=" + orderno + "&orderprice=" + orderprice + "&userid=" + userid + "&ordertypecode=" + ordertypecode + "");
};

