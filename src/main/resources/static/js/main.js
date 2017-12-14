var Notification = new Vue({
    el:"#messagerdd",
    data:{
        notificationDom:null,
        promptDom:null,
        notificationData:{
            title:null,
            msg:null
        },
        promptData:{
            title:null,
            msg:null,
            yes:null,
            no:null,
            yesCall:null,
            noCall:null
        }
    },
    methods:{
        _addClass:function(el,cls){
            el.className+=" "+cls;
        },
        _removeClass:function(el,cls){
            el.className = el.className.replace(" "+cls,'');
        },
        init:function () {
            this.notificationDom = $("#notification")[0];
            this.promptDom = $("#prompt")[0];
        },
        hideNoification:function () {
            this._addClass(this.notificationDom,"hide");
        },
        alert:function (title,msg) {
            this.notificationData.title = title;
            this.notificationData.msg = msg;
            this._removeClass(this.notificationDom,"hide");
            this._removeClass(this.notificationDom,"alert-warning");
        },
        info:function (title,msg) {
            this.notificationData.title = title;
            this.notificationData.msg = msg;
            this._removeClass(this.notificationDom,"hide");
            this._removeClass(this.notificationDom,"alert-info");
        },
        prompt:function (title,msg,yes,no,yesCall,noCall) {
            this.promptData.title = title;
            this.promptData.msg = msg;
            this.promptData.yes = yes;
            this.promptData.no = no;
            this.promptData.yesCall = yesCall;
            this.promptData.noCall = noCall;
            this._removeClass(this.promptDom,"hide");
        },
        hidePrompt:function (yes) {
            if(yes){
                if(this.promptData.yesCall)
                    this.promptData.yesCall();

                this._addClass(this.promptDom,"hide");
            }else {
                if(this.promptData.noCall)
                    this.promptData.noCall();

                this._addClass(this.promptDom,"hide");
            }
        }
    }
});
Notification.init();

var Main = new Vue({
    el: '#page',
    methods:{
        init: function () {
            $.ajaxSetup({ cache: false });

            $('.async').click(function () {
                var url = this.id.replace("-","/");
                $("#page-content").load(url);
            });

            //日期控件
            $(".date").val(Main.formatDate_yyyyMd(new Date()));
            $(".date").datepicker({
                format: "yyyy-M-d",
                todayBtn: true,
                autoclose: true
            });
        },
        loadPage:function () {

        },
        formatDate_yyyyMd: function (date) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        logout:function () {
            $.post("logout", null, function (json) {
                window.location.href = "login";
            });
        }
    }
});