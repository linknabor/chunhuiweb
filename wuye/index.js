var page = 0;
avalon.ready(function() {
	function query(type){
		
		var n = "GET",
        a = "messages/"+page,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.zixuns = n.result;
			page++;
		},
        r = function() {
        	alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function getBannerType() {
        var n = "GET",
        a = "banner/"+o.bannerType,
        i = null,
        e = function(n) {
            o.banners = n.result;
        },
        r = function() {
    		alert("获取banner异常");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	
	function getAnnoucementList(){
		
		var n = "POST",
        a = "annoucement/getAnnoucementList/",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			o.annoucements = n.result;
			o.annoucement_count = n.result.length;
			
        },
        r = function() {
        	//alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	
    var a = 0,
    o = avalon.define({
        $id: "root",
        banners:[],
        bannerType:3,
      
       jumpToDetail:function(mid) {



    	   if(mid==1){
    		   window.location.href="http://mp.weixin.qq.com/s?__biz=MzIyMjI2NDkzMg==&mid=100000001&idx=6&sn=f1d2aa14684b2041095ddcc3c757927a&scene=0&previewkey=koIZjFK%2FvSTLuEWTZbl26MwqSljwj2bfCUaCyDofEow%3D#wechat_redirect";
    	   }else if(mid==2){
    		   window.location.href="http://mp.weixin.qq.com/s?__biz=MzIyMjI2NDkzMg==&mid=100000001&idx=5&sn=7c78875d3f80c92ec490bfb22362bc58&scene=0&previewkey=koIZjFK%2FvSTLuEWTZbl26MwqSljwj2bfCUaCyDofEow%3D#wechat_redirect";
    	   }else if(mid==3){
    		   window.location.href="http://mp.weixin.qq.com/s?__biz=MzIyMjI2NDkzMg==&mid=100000001&idx=4&sn=d1e05a8d8d63e34986324e82d3c7d483&scene=0&previewkey=koIZjFK%2FvSTLuEWTZbl26MwqSljwj2bfCUaCyDofEow%3D#wechat_redirect";
    	   }else if(mid==4){
    		   window.location.href="http://mp.weixin.qq.com/s?__biz=MzIyMjI2NDkzMg==&mid=100000001&idx=3&sn=24587567042210be740335615493225e&scene=0&previewkey=koIZjFK%2FvSTLuEWTZbl26MwqSljwj2bfCUaCyDofEow%3D#wechat_redirect";
       	   }else if(mid==5){
			   window.location.href="http://mp.weixin.qq.com/s?__biz=MzIyMjI2NDkzMg==&mid=100000001&idx=2&sn=8948b2a3c709b3dc8da5b2d3117716aa&scene=0&previewkey=koIZjFK%2FvSTLuEWTZbl26MwqSljwj2bfCUaCyDofEow%3D#wechat_redirect";
		   }else if(mid==6){
			   window.location.href="http://mp.weixin.qq.com/s?__biz=MzIyMjI2NDkzMg==&mid=100000001&idx=1&sn=ef563f8358b55f4a379f81833d323fbb&scene=0&previewkey=koIZjFK%2FvSTLuEWTZbl26MwqSljwj2bfCUaCyDofEow%3D#wechat_redirect";
		   }else{
    		   window.location.href="message.html?messageId="+mid;
    	   }
       },
       zixuns:[],
       zixun_page:0,
       annoucements: [],
       annoucement_count :0,
       
    });
    query();
	getBannerType();
	getAnnoucementList();
    initSwiper();    
    avalon.scan(document.body),
    FastClick.attach(document.body),
    common.setTitle("社区物业");
    initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
    initShareConfig("互帮、互助、分享的社区大家庭，尽在春晖邻里之家!",MasterConfig.C("basePageUrl")+"wuye/index.html?v=20160229",MasterConfig.C("basePageUrl")+"/static/images/share_logo3.png","邻里趣事，快来分享");
    checkFromShare();
    
});