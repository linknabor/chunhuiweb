avalon.ready(function() {
	function getOrderId(){
		o.orderId=getUrlParam("orderId");
		o.productType=getUrlParam("productType");
		console.log("o.orderId="+o.orderId+"o.productType="+o.productType);
	}
    function notifyPaySuccess(order) {
    	var n = "GET",
        a = "/notifyPayed/"+order.serviceOrderId,
        i = null,
        e = function(n) {},
        r = function() {};
        common.invokeApi(n, a, i, null, e, r)
    }
    function pay(order) {
    	var n = "GET",
        a = "/requestPay/"+order.serviceOrderId,
        i = null,
        e = function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	    success: function (res) {
                  	notifyPaySuccess(order);
                  	order.status=1;
                  	order.payStatus=1;
        	    }
        	});
        },
        r = function() {
			alert("支付请求失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function orderCancel(order) {
    	var n = "GET",
        a = "/cancelOrder/"+order.serviceOrderId,
        i = null,
        e = function(n) {
           order.status=5;
           order.payStatus=2;
           alert("服务单已取消");
        },
        r = function() {
			alert("支付取消失败，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function query() {
        var n = "GET",
        a = "yuyueOrders/"+o.orderId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.order = n.result;
            if(o.order == null || o.order.id == null){
            	if(confirm("获取订单信息失败，返回服务首页！")){
    				location.href="home/index.html";
    			};
            }else{
            	queryAddInfo();
            }
        },
        r = function() {
        	if(confirm("获取订单信息失败，返回服务首页！")){
				location.href="home/index.html";
        	};
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    function queryAddInfo() {
        var n = "GET",
        a = "yuyueOrders/"+o.productType+"/"+o.orderId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.orderAddInfos = n.result;
            if(o.orderAddInfos == null){
            	if(confirm("获取订单补充信息信息失败，返回服务首页！")){
    				location.href="home/index.html";
    			};
            }
        },
        r = function() {
        	if(confirm("获取订单补充信息失败，返回服务首页！")){
				location.href="home/index.html";
        	};
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    var o = avalon.define({
        $id: "root",
        productType:0,//0:阿姨来了；1：尚匠洗车；2；flowerPlus
        orderPay: function(order) {
        	pay(order);
        },
        orderCancel: function(order) {
        	if(confirm("确定要取消该服务？")){
        		orderCancel(order);
        	}
        },

	    checkLogisics: function(order){
	    	var  logisticName = escape(order.logisticName);
			location.href = "logistics.html?com=" + logisticName+"&nu="+order.logisticNo;
	    },

        pictureSrc:function(productName){
        	return "http://7xnqht.com2.z0.glb.qiniucdn.com/Fr-r2zwE8oa3ogkQW1AHnJ9td5vt";
        },
        order:{},
        orderAddInfos:[],
        orderId:0
    });
	getOrderId();
    query();
    initWechat(['chooseWXPay']);
    avalon.scan(document.body);
    //share.default_send(),
    FastClick.attach(document.body);
});