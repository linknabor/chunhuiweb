avalon.ready(function() {
    function q() {
        var n = "GET",
        a = "yuyueOrders",
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.orders = n.result;
            o.groupsNum = n.result.length;
        },
        r = function() {
			console.log(JSON.stringify(n));
			o.orders = [];
        };
        common.invokeApi(n, a, i, null, e, r)
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
    var o = avalon.define({
        $id: "root",
        bg_img:'static/img/bg/bg_yuyue.jpg',
        groupsNum: 1,
        gotoDetail:function(order){
        	location.href="homeorderdetail.html?orderId="+order.id+"&productType="+order.productType;
        },
        orderPay: function(order) {
        	pay(order);
        },
        orderCancel: function(order) {
        	if(confirm("确定要取消该服务？")){
        		orderCancel(order);
        	}
        },
        pictureSrc:function(productName){
        	return "http://7xnqht.com2.z0.glb.qiniucdn.com/Fr-r2zwE8oa3ogkQW1AHnJ9td5vt";
        },
        orders:[],
        getDateStr:function(idx){
        	return (new Date(o.orders[idx].createDate)).format('yyyy-MM-dd hh:mm');
        }
    });
    q();
    initWechat(['chooseWXPay']) ;
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body);
    common.setTitle("服务订单");
});