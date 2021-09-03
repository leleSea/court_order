import localData from '../localData'
var CryptoJS = require("crypto-js");

export default class slide{
    constructor(ele, opt){
        this.inifParams(ele, opt)
    }
    inifParams(ele, opt){
        this._localData = new localData()
        this.getPictrueCallback = opt.getPictrueCallback
        this.checkPictrueCallback = opt.checkPictrueCallback
        this.$element = ele,
        this.backToken = null,
        this.moveLeftDistance = 0,
        this.secretKey = '',
        this.defaults = {
            baseUrl: "https://captcha.anji-plus.com/captcha-api",
            containerId: '',
            captchaType: "blockPuzzle",
            mode: 'fixed',	//弹出式pop，固定fixed
            vOffset: 5,
            vSpace: 5,
            explain: '向右滑动完成验证',
            imgSize: {
                width: '310px',
                height: '155px',
            },
            blockSize: {
                width: '50px',
                height: '50px',
            },
            circleRadius: '10px',
            barSize: {
                width: '310px',
                height: '50px',
            },
            beforeCheck: function () {
                return true
            },
            ready: function () {
            },
            success: function () {
            },
            error: function () {
            }

        },
        this.options = {
            ...this.defaults, 
            ...opt
        }
    }


    init() {
        console.log('slide init')
        var _this = this;
        //加载页面
        this.loadDom();
        _this.refresh();
        this.options.ready();

        this.$element[0].onselectstart = document.body.ondrag = function () {
            return false;
        };

        if (this.options.mode == 'pop') {

            _this.$element.find('.verifybox-close').on('click', function () {
                _this.$element.find(".mask").css("display", "none");
                // _this.refresh();
            });

            var clickBtn = document.getElementById(this.options.containerId);
            clickBtn && (clickBtn.onclick = function () {
                if (_this.options.beforeCheck()) {
                    _this.$element.find(".mask").css("display", "block");
                }
            })
        }

        //按下
        this.htmlDoms.move_block.on('touchstart', function (e) {
            _this.start(e);
        });

        this.htmlDoms.move_block.on('mousedown', function (e) {
            _this.start(e);
        });

        this.htmlDoms.sub_block.on('mousedown', function (e) {
            e.stopPropagation()
        });

        //拖动
        window.addEventListener("touchmove", function (e) {
            _this.move(e);
        });

        window.addEventListener("mousemove", function (e) {
            _this.move(e);
        });

        //鼠标松开
        window.addEventListener("touchend", function () {
            _this.end();
        });
        window.addEventListener("mouseup", function () {
            _this.end();
        });

        //刷新
        _this.$element.find('.verify-refresh').on('click', function () {
            _this.refresh();
        });
    }

    //初始化加载
    loadDom () {
        this.status = false;	//鼠标状态
        this.isEnd = false;		//是够验证完成
        this.setSize = this.resetSize(this);	//重新设置宽度高度
        this.plusWidth = 0;
        this.plusHeight = 0;
        this.x = 0;
        this.y = 0;
        var panelHtml = '';
        this.lengthPercent = (parseInt(this.setSize.img_width) - parseInt(this.setSize.block_width) - parseInt(this.setSize.circle_radius) - parseInt(this.setSize.circle_radius) * 0.8) / (parseInt(this.setSize.img_width) - parseInt(this.setSize.bar_height));

        let wrapStartHtml = '<div class="mask">' +
            '<div class="verifybox" style="width:' + (parseInt(this.setSize.img_width) + 30) + 'px">' +
            '<div class="verifybox-top">' +
            '请完成安全验证' +
            '<span class="verifybox-close">' +
            '<i class="iconfont icon-close"></i>' +
            '</span>' +
            '</div>' +
            '<div class="verifybox-bottom" style="padding:15px">' +
            '<div style="position: relative;">';

        if (this.options.mode == 'pop') {
            panelHtml = wrapStartHtml
        }
        panelHtml += '<div class="verify-img-out">' +
            '<div class="verify-img-panel">' +
            '<div class="verify-refresh" style="z-index:3">' +
            '<i class="iconfont icon-refresh"></i>' +
            '</div>' +
            '<span class="verify-tips"  class="suc-bg"></span>' +
            '<img src="" class="backImg" style="width:100%;height:100%;display:block">' +
            '</div>' +
            '</div>';

        this.plusWidth = parseInt(this.setSize.block_width) + parseInt(this.setSize.circle_radius) * 2 - parseInt(this.setSize.circle_radius) * 0.2;
        this.plusHeight = parseInt(this.setSize.block_height) + parseInt(this.setSize.circle_radius) * 2 - parseInt(this.setSize.circle_radius) * 0.2;

        panelHtml += '<div class="verify-bar-area" style="width:' + this.setSize.img_width + ',height:' + this.setSize.bar_height + ',line-height:' + this.setSize.bar_height + '">' +
            '<span  class="verify-msg">' + this.options.explain + '</span>' +
            '<div class="verify-left-bar">' +
            '<span class="verify-msg"></span>' +
            '<div  class="verify-move-block">' +
            '<i  class="verify-icon iconfont icon-right"></i>' +
            '<div class="verify-sub-block">' +
            '<img src="" class="bock-backImg" alt=""  style="width:100%;height:100%;display:block">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        let wrapEndHtml = '</div></div></div></div>';
        if (this.options.mode == 'pop') {
            panelHtml += wrapEndHtml
        }

        this.$element.append(panelHtml);
        this.htmlDoms = {
            tips: this.$element.find('.verify-tips'),
            sub_block: this.$element.find('.verify-sub-block'),
            out_panel: this.$element.find('.verify-img-out'),
            img_panel: this.$element.find('.verify-img-panel'),
            img_canvas: this.$element.find('.verify-img-canvas'),
            bar_area: this.$element.find('.verify-bar-area'),
            move_block: this.$element.find('.verify-move-block'),
            left_bar: this.$element.find('.verify-left-bar'),
            msg: this.$element.find('.verify-msg'),
            icon: this.$element.find('.verify-icon'),
            refresh: this.$element.find('.verify-refresh')
        };

        this.$element.css('position', 'relative');

        this.htmlDoms.sub_block.css({
            'height': this.setSize.img_height,
            'width': Math.floor(parseInt(this.setSize.img_width) * 47 / 310) + 'px',
            'top': -(parseInt(this.setSize.img_height) + this.options.vSpace) + 'px'
        })
        this.htmlDoms.out_panel.css('height', parseInt(this.setSize.img_height) + this.options.vSpace + 'px');
        this.htmlDoms.img_panel.css({'width': this.setSize.img_width, 'height': this.setSize.img_height});
        this.htmlDoms.bar_area.css({
            'width': this.setSize.img_width,
            'height': this.setSize.bar_height,
            'line-height': this.setSize.bar_height
        });
        this.htmlDoms.move_block.css({'width': this.setSize.bar_height, 'height': this.setSize.bar_height});
        this.htmlDoms.left_bar.css({'width': this.setSize.bar_height, 'height': this.setSize.bar_height});
    }


    //鼠标按下
    start (e) {
        let x
        if (!e.originalEvent.targetTouches) {    //兼容移动端
            x = e.clientX;
        } else {     //兼容PC端
            x = e.originalEvent.targetTouches[0].pageX;
        }
        // if(!e.touches) {    //兼容移动端
        // 	var x = e.clientX;
        // }else {     //兼容PC端
        // 		var x = e.touches[0].pageX;
        // }
        this.startLeft = Math.floor(x - this.htmlDoms.bar_area[0].getBoundingClientRect().left);
        this.startMoveTime = new Date().getTime();
        if (this.isEnd == false) {
            this.htmlDoms.msg.text('');
            this.htmlDoms.move_block.css('background-color', '#337ab7');
            this.htmlDoms.left_bar.css('border-color', '#337AB7');
            this.htmlDoms.icon.css('color', '#fff');
            e.stopPropagation();
            this.status = true;
        }
    }

    //鼠标移动
    move (e) {
        if (this.status && this.isEnd == false) {
            let x
            if (!e.touches) {    //兼容移动端
                x = e.clientX;
            } else {     //兼容PC端
                x = e.touches[0].pageX;
            }
            var bar_area_left = this.htmlDoms.bar_area[0].getBoundingClientRect().left;
            var move_block_left = x - bar_area_left; //小方块相对于父元素的left值
            if (move_block_left >= (this.htmlDoms.bar_area[0].offsetWidth - parseInt(this.setSize.bar_height) + parseInt(parseInt(this.setSize.block_width) / 2) - 2)) {
                move_block_left = (this.htmlDoms.bar_area[0].offsetWidth - parseInt(this.setSize.bar_height) + parseInt(parseInt(this.setSize.block_width) / 2) - 2);
            }
            if (move_block_left <= parseInt(parseInt(this.setSize.block_width) / 2)) {
                move_block_left = parseInt(parseInt(this.setSize.block_width) / 2);
            }
            //拖动后小方块的left值
            this.htmlDoms.move_block.css('left', move_block_left - this.startLeft + "px");
            this.htmlDoms.left_bar.css('width', move_block_left - this.startLeft + "px");
            this.htmlDoms.sub_block.css('left', "0px");
            this.moveLeftDistance = move_block_left - this.startLeft
        }
    }

    //鼠标松开
    end () {
        this.endMovetime = new Date().getTime();
        var _this = this;
        //判断是否重合
        if (this.status && this.isEnd == false) {
            this.moveLeftDistance = this.moveLeftDistance * 310 / parseInt(this.setSize.img_width)
            //图片滑动
            //获取用户信息，缓存
            // var data = Util.get("user");
            var user = this._localData.getItemParse('user')
            user = user || {}
            let userid = user.id || -1
            console.log(userid)
            var data = {
                captchaType: this.options.captchaType,
                "pointJson": this.secretKey ? this.aesEncrypt(JSON.stringify({
                    x: this.moveLeftDistance,
                    y: 5.0
                }), this.secretKey) : JSON.stringify({x: this.moveLeftDistance, y: 5.0}),
                "token": this.backToken,
                clientUid: localStorage.getItem('slider'),
                ts: Date.now(),
                userid: userid
            }
            var captchaVerification = this.secretKey ? this.aesEncrypt(this.backToken + '---' + JSON.stringify({
                x: this.moveLeftDistance,
                y: 5.0
            }), this.secretKey) : this.backToken + '---' + JSON.stringify({x: this.moveLeftDistance, y: 5.0})
            console.log(captchaVerification)
            this.checkPictrueAction(data, captchaVerification)
            // this.checkPictrue(userid,data, this.options.baseUrl, function (res) {
            //     // 请求反正成功的判断
            //     if (res.repCode == "0000") {
            //         _this.htmlDoms.move_block.css('background-color', '#5cb85c');
            //         _this.htmlDoms.left_bar.css({'border-color': '#5cb85c', 'background-color': '#fff'});
            //         _this.htmlDoms.icon.css('color', '#fff');
            //         _this.htmlDoms.icon.removeClass('icon-right');
            //         _this.htmlDoms.icon.addClass('icon-check');
            //         //提示框
            //         _this.htmlDoms.tips.addClass('suc-bg').removeClass('err-bg')
            //         // _this.htmlDoms.tips.css({"display":"block",animation:"move 1s cubic-bezier(0, 0, 0.39, 1.01)"});
            //         _this.htmlDoms.tips.animate({"bottom": "0px"});
            //         _this.htmlDoms.tips.text(((_this.endMovetime - _this.startMoveTime) / 1000).toFixed(2) + 's验证成功');
            //         _this.isEnd = true;
            //         setTimeout(function () {
            //             _this.$element.find(".mask").css("display", "none");
            //             // _this.htmlDoms.tips.css({"display":"none",animation:"none"});
            //             _this.htmlDoms.tips.animate({"bottom": "-35px"});
            //             _this.refresh();
            //         }, 1000)
            //         _this.options.success({'captchaVerification': captchaVerification});
            //     } else {
            //         _this.htmlDoms.move_block.css('background-color', '#d9534f');
            //         _this.htmlDoms.left_bar.css('border-color', '#d9534f');
            //         _this.htmlDoms.icon.css('color', '#fff');
            //         _this.htmlDoms.icon.removeClass('icon-right');
            //         _this.htmlDoms.icon.addClass('icon-close');

            //         _this.htmlDoms.tips.addClass('err-bg').removeClass('suc-bg')
            //         // _this.htmlDoms.tips.css({"display":"block",animation:"move 1.3s cubic-bezier(0, 0, 0.39, 1.01)"});
            //         _this.htmlDoms.tips.animate({"bottom": "0px"});
            //         _this.htmlDoms.tips.text(res.repMsg)
            //         setTimeout(function () {
            //             _this.refresh();
            //             _this.htmlDoms.tips.animate({"bottom": "-35px"});
            //         }, 1000);

            //         // setTimeout(function () {
            //         // 	// _this.htmlDoms.tips.css({"display":"none",animation:"none"});
            //         // },1300)
            //         _this.options.error(this);
            //     }
            // })
            this.status = false;
        }
    }

    async checkPictrueAction(data){
        var captchaVerification = this.secretKey ? this.aesEncrypt(this.backToken + '---' + JSON.stringify({
            x: this.moveLeftDistance,
            y: 5.0
        }), this.secretKey) : this.backToken + '---' + JSON.stringify({x: this.moveLeftDistance, y: 5.0})
        let res = await this.checkPictrue(data, captchaVerification)
        if (res.repCode == "0000") {
            this.htmlDoms.move_block.css('background-color', '#5cb85c');
            this.htmlDoms.left_bar.css({'border-color': '#5cb85c', 'background-color': '#fff'});
            this.htmlDoms.icon.css('color', '#fff');
            this.htmlDoms.icon.removeClass('icon-right');
            this.htmlDoms.icon.addClass('icon-check');
            //提示框
            this.htmlDoms.tips.addClass('suc-bg').removeClass('err-bg')
            // this.htmlDoms.tips.css({"display":"block",animation:"move 1s cubic-bezier(0, 0, 0.39, 1.01)"});
            this.htmlDoms.tips.animate({"bottom": "0px"});
            this.htmlDoms.tips.text(((this.endMovetime - this.startMoveTime) / 1000).toFixed(2) + 's验证成功');
            this.isEnd = true;
            // setTimeout(function () {
                this.$element.find(".mask").css("display", "none");
                // this.htmlDoms.tips.css({"display":"none",animation:"none"});
                this.htmlDoms.tips.animate({"bottom": "-35px"});
                // this.refresh();
            // }, 1000)
            // this.options.success({'captchaVerification': captchaVerification});
            if(this.response) this.response({data, captchaVerification})
        } else {
            this.htmlDoms.move_block.css('background-color', '#d9534f');
            this.htmlDoms.left_bar.css('border-color', '#d9534f');
            this.htmlDoms.icon.css('color', '#fff');
            this.htmlDoms.icon.removeClass('icon-right');
            this.htmlDoms.icon.addClass('icon-close');

            this.htmlDoms.tips.addClass('err-bg').removeClass('suc-bg')
            // this.htmlDoms.tips.css({"display":"block",animation:"move 1.3s cubic-bezier(0, 0, 0.39, 1.01)"});
            this.htmlDoms.tips.animate({"bottom": "0px"});
            this.htmlDoms.tips.text(res.repMsg)
            setTimeout(function () {
                this.refresh();
                this.htmlDoms.tips.animate({"bottom": "-35px"});
            }, 1000);

            // setTimeout(function () {
            // 	// this.htmlDoms.tips.css({"display":"none",animation:"none"});
            // },1300)
            // this.options.error(this);
        }
    }

    resetSize (obj) {
        var img_width, img_height, bar_width, bar_height, block_width, block_height, circle_radius;	//图片的宽度、高度，移动条的宽度、高度
        var parentWidth = obj.$element.parent().width() || window.screen.width;
        var parentHeight = obj.$element.parent().height() || window.screen.height;

        if (obj.options.imgSize.width.indexOf('%') != -1) {
            img_width = parseInt(obj.options.imgSize.width) / 100 * parentWidth + 'px';
        } else {
            img_width = obj.options.imgSize.width;
        }

        if (obj.options.imgSize.height.indexOf('%') != -1) {
            img_height = parseInt(obj.options.imgSize.height) / 100 * parentHeight + 'px';
        } else {
            img_height = obj.options.imgSize.height;
        }

        if (obj.options.barSize.width.indexOf('%') != -1) {
            bar_width = parseInt(obj.options.barSize.width) / 100 * parentWidth + 'px';
        } else {
            bar_width = obj.options.barSize.width;
        }

        if (obj.options.barSize.height.indexOf('%') != -1) {
            bar_height = parseInt(obj.options.barSize.height) / 100 * parentHeight + 'px';
        } else {
            bar_height = obj.options.barSize.height;
        }

        if (obj.options.blockSize) {
            if (obj.options.blockSize.width.indexOf('%') != -1) {
                block_width = parseInt(obj.options.blockSize.width) / 100 * parentWidth + 'px';
            } else {
                block_width = obj.options.blockSize.width;
            }


            if (obj.options.blockSize.height.indexOf('%') != -1) {
                block_height = parseInt(obj.options.blockSize.height) / 100 * parentHeight + 'px';
            } else {
                block_height = obj.options.blockSize.height;
            }
        }

        if (obj.options.circleRadius) {
            if (obj.options.circleRadius.indexOf('%') != -1) {
                circle_radius = parseInt(obj.options.circleRadius) / 100 * parentHeight + 'px';
            } else {
                circle_radius = obj.options.circleRadius;
            }
        }

        return {
            img_width: img_width,
            img_height: img_height,
            bar_width: bar_width,
            bar_height: bar_height,
            block_width: block_width,
            block_height: block_height,
            circle_radius: circle_radius
        };
    }

    //刷新
    async refresh () {
        var _this = this;
        this.htmlDoms.refresh.show();
        this.$element.find('.verify-msg:eq(1)').text('');
        this.$element.find('.verify-msg:eq(1)').css('color', '#000');
        this.htmlDoms.move_block.animate({'left': '0px'}, 'fast');
        this.htmlDoms.left_bar.animate({'width': parseInt(this.setSize.bar_height)}, 'fast');
        this.htmlDoms.left_bar.css({'border-color': '#ddd'});

        this.htmlDoms.move_block.css('background-color', '#fff');
        this.htmlDoms.icon.css('color', '#000');
        this.htmlDoms.icon.removeClass('icon-close');
        this.htmlDoms.icon.addClass('icon-right');
        this.$element.find('.verify-msg:eq(0)').text(this.options.explain);
        this.isEnd = false;
        //获取用户信息，缓存
        // var data = Util.get("user");
        // var user = eval('(' + data + ')');
        // if(user!=undefined&&user!=null&&user!=""){
        //     var userid = user.id;
        // }else{
        //     var userid="-1";
        // }
        var user = this._localData.getItemParse('user')
        user = user || {}
        let userid = user.id || -1
        await this.setPictrue()
        // this.getPictrue(userid,{
        //     captchaType: "blockPuzzle",
        //     clientUid: localStorage.getItem('slider'),
        //     ts: Date.now(),
        //     userid: userid
        // }, this.options.baseUrl, function (res) {
        //     if (res.repCode == "0000") {
        //         _this.$element.find(".backImg")[0].src = 'data:image/png;base64,' + res.repData.originalImageBase64
        //         _this.$element.find(".bock-backImg")[0].src = 'data:image/png;base64,' + res.repData.jigsawImageBase64
        //         _this.secretKey = res.repData.secretKey
        //         _this.backToken = res.repData.token
        //     } else {
        //         _this.$element.find(".backImg")[0].src = 'images/default.jpg'
        //         _this.$element.find(".bock-backImg")[0].src = ''
        //         _this.htmlDoms.tips.addClass('err-bg').removeClass('suc-bg')
        //         _this.htmlDoms.tips.animate({"bottom": "0px"});
        //         _this.htmlDoms.tips.text(res.repMsg)
        //         setTimeout(function () {
        //             _this.htmlDoms.tips.animate({"bottom": "-35px"});
        //         }, 1000);
        //     }
        // });
        this.htmlDoms.sub_block.css('left', "0px");
    }

    async setPictrue(){
        let user = this._localData.getItemParse('user')
        user = user || {}
        let userid = user.id || -1
        let data = await this.getPictrue(userid,{
            captchaType: "blockPuzzle",
            clientUid: localStorage.getItem('slider'),
            ts: Date.now(),
            userid: userid
        })
        this.$element.find(".backImg")[0].src = 'data:image/png;base64,' + data.originalImageBase64
        this.$element.find(".bock-backImg")[0].src = 'data:image/png;base64,' + data.jigsawImageBase64
        this.secretKey = data.secretKey
        this.backToken = data.token
    }

    // 加密数据函数 工具crypto.js 文件工具
    /**
     * @word 要加密的内容
     * @keyWord String  服务器随机返回的关键字
     *  */
    aesEncrypt(word,keyWord){
        // var keyWord = keyWord || "XwKsGlMcdPMEhR1B"
        var key = CryptoJS.enc.Utf8.parse(keyWord);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    }

    async checkPictrue(data, captchaVerification) {
        // $.ajax({
        //     type: "post",
        //     contentType: "application/json;charset=UTF-8",
        //     url: baseUrl + "/TennisCenterInterface/imgCaptcha/api/check.action",
        //     data: JSON.stringify(data),
        //     cache: false,
        //     crossDomain: true == !(document.all),
        //     beforeSend: function (XMLHttpRequest) {
        //         XMLHttpRequest.setRequestHeader("userid", userid);
        //     },
        //     success: function (res) {
        //         resolve(res)
        //     },
        //     fail: function (err) {
        //         reject(err)
        //     }
        // })
        let opt = {data, captchaVerification}
        console.log(opt)
        // if(this.response) this.response(opt)
        return this.checkPictrueCallback(data, captchaVerification)
    }

    async getPictrue(userid, data, baseUrl, resolve, reject) {
        // $.ajax({
        //     type: "post",
        //     contentType: "application/json;charset=UTF-8",
        //     url: baseUrl + "/TennisCenterInterface/imgCaptcha/api/get.action",
        //     data: JSON.stringify(data),
        //     cache: false,
        //     crossDomain: true == !(document.all),
        //     beforeSend: function (XMLHttpRequest) {
        //         XMLHttpRequest.setRequestHeader("userid", userid);
        //     },
        //     success: function (res) {
        //         resolve(res)
        //     },
        //     fail: function (err) {
        //         reject(err)
        //     }
        // })

        return this.getPictrueCallback(userid, data)
    }
    imgCodeStart(){
        return new Promise(res => {
            this.refresh().then(() => {
                this.response = res
                this.imgCodeOpen()
            })
        })
    }
    imgCodeOpen(){
        this.$element.find(".mask").css("display", "block");
    }
    imgCodeClose(){
        this.$element.find(".mask").css("display", "none");
        // this.refresh()
    }
}