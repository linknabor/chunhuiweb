    function getUnreadComments(){
         common.invokeApi("POST", "getUnreadComments", null, null, function(n) {
            console.log(JSON.stringify(n));
            if(n.result&&n.result>0){
                if($("#mypublic").length>0){
                    mypublic.html("<img style=\"height: 8px; width: 8px; margin-bottom:1px; \" src=\"../static/images/person/icon_redpoint.png\">&nbsp;&nbsp;");
                }
            }else{
                if($("#mypublic").length>0){
                    $("#mypublic").html("&nbsp;&nbsp;");
                }
            }
         });
    }
    avalon.ready(function() {
    function n() {
        var n = "GET",
        a = "userInfo",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.user = n.result;
            o.user.headimgurl = "" != n.result.name ? n.result.headimgurl: Config.C("user_info").avatar;
            o.user.name = "" != n.result.name ? n.result.name: Config.C("user_info").nickname;
            o.user.level = Config.C("user_level")[n.result.level];
        },
        r = function() {
			console.log(JSON.stringify(n));
			o.user={};
			o.user.headimgurl = Config.C("user_info").avatar,
			o.user.name = Config.C("user_info").nickname,
			o.user.level = Config.C("user_info").levelname
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var a = 0,
    o = avalon.define({
        $id: "root",
        user: {
        	headimgurl:"",/**默认头像*/
        	name:"",
        	level:"",
        	zhima:"0",
        	lvdou:"0",
        	couponCount:0
        },

		//fix me
        myOrderNum:1,
        myYuyueNum:2,
        mySubjectNum:3,
        myGroupNum:4,
        jumpto:function(url){
        	window.location.href=url;
        },
        gotoAddress:function(){
        	if(common.hasRegister()){
            	location.href=MasterConfig.C('basePageUrl')+"person/addresses.html?v=20151217";
        	} else {
        		location.href=MasterConfig.C('basePageUrl')+"person/register.html?v=20151217";
        	}
        },
        gotoEdit:function(){
        	if(common.hasRegister()){
            	location.href=MasterConfig.C('basePageUrl')+"person/bindphone.html?v=20151217";
        	} else {
        		location.href=MasterConfig.C('basePageUrl')+"person/register.html?v=20151217";
        	}
        },
        coupons:function(){
        	location.href=MasterConfig.C('basePageUrl')+"person/coupons.html";
        }
    });

    n();
    getUnreadComments()
    avalon.scan(document.body);
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    initShareConfig("我的社区，我的家，我在春晖！",MasterConfig.C("basePageUrl")+"person/index.html?v=20160301",MasterConfig.C("basePageUrl")+"/static/images/share_logo4.png","春晖，我的生活管家");
    FastClick.attach(document.body);
    common.setTitle("个人中心");
});