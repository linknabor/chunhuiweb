avalon.ready(function() {
	function getRule() {
		o.ruleId = getUrlParam("ruleId");
		o.banner_img = getUrlParam("banner_img");//配置到链接中。最好配置到规则信息中
		var n = "POST",
        a = "homeService/queryYuyueRuleInfo/"+o.ruleId,
        i = null,
        e = function(n) {
			//console.log(JSON.stringify(n));
			if(n.errorCode==404){
				o.ruleId=0;//初始化
				alert("抱歉，没有查询到服务信息！");
			}else{
				o.ruleInfo = n.result;
				o.serviceTypeName = o.ruleInfo.name;
				o.prices = o.ruleInfo.price;
				o.show_prices = "￥"+o.prices+"元";
				o.serviceNo = o.ruleInfo.serviceNo;
				if(o.serviceNo>1){
					//不是单次
					o.serviceIsSingle=0;
				}else if(o.serviceNo==1){
					//单次
					o.serviceIsSingle=1;
				}else{
					alert("服务信息错误！");
				}
				common.setTitle(o.serviceTypeName);
			}
        },
        r = function() {
        	alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function createOrder() {
		o.submiting = true;
		var n = "POST", a = "baojie/createOrder/"
				+ o.address.id, i = {
			//paymentType : 1,
			ruleId : o.ruleId,
			expectedTime : o.servicedate
		}, e = function(n) {
			window.location.href = MasterConfig.C('basePageUrl')
					+ "tohomebuy.html?ruleId=" + o.ruleId + "&yuyueOrderId="
					+ n.result.id + "&addressId=" + o.address.id
					+ "&expectedTime=" + o.servicedate;
		}, r = function() {
			o.submiting = false;
			alert("网络异常，请稍后重试！");
		};
		common.invokeApi(n, a, i, null, e, r)
	}
	o = avalon.define({
		$id : 'root',
		currentPage:'main',
		ruleInfo:{},
		address : {},
		golist : function() {
			location.href = "../index.html?type=" + 1;
		},
		ruleId : 0, // fix me
		serviceIsSingle : 0,// 是否单次
		/** 添加地址 */
		submiting : false,
		servicedate : "",
		show_prices : "",
		banner_img:"",
		submit : function() {
			if (o.submiting) {
				alert("预约信息正在上传，请勿重复提交！");
				return;
			}
			if(o.ruleId==0 || o.ruleId == ""){
				alert("服务信息错误!");
				return;
			}
			var d = /\d{4}-\d{2}-\d{2}/;
			if (o.servicedate == '' || !d.test(o.servicedate)) {
				alert("请选择服务时间！");
				return;
			}
			if (!o.address||!o.address.id) {
				alert("请选择服务地址！");
				return;
			}
			createOrder();
		},
		showAddress:function(){
		    o.currentPage='';
            chooseAddress(function(address){
                if(address){
                    o.address=address;
                }
                o.currentPage='main';
            });
		}
	});

    getRule();

	avalon.scan(document.body);
	$('#datetimepicker2').datetimepicker({
		minDate : 0,
		lang : 'ch',
		timepicker : false,
		format : 'Y-m-d',
		formatDate : 'Y-m-d'
	});
	$('#timetaker').click(function() {
		$('#datetimepicker2').datetimepicker('show');
	});
});