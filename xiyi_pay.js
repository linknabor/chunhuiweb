var o;
function chooseCoupon(coupon) {
	if(coupon == null) {
		o.coupon=null;
		o.couponDesc = '未使用';
	} else {
		o.coupon = coupon;
		o.couponDesc = "￥"+coupon.amount+"元";
		
		o.realamount = o.amount-coupon.amount;
		if(o.realamount<=0){
			o.realamount=0.01;
		}
		o.amountStr = o.realamount.toFixed(2);
	}
	
	o.currentPage='main';
}
function computeAmount(){
	filterCouponByAmount(o.amount);
	o.couponNum=getCouponNum();
}
function queryCoupon() {
    common.invokeApi("GET", "coupon/valid4HomeCart", null, null, function(n){
    	setupCoupons(n.result);
		computeAmount();
    	o.couponNum=getCouponNum();
    }, function(n){alert('获取现金券信息失败！')});
}
avalon.ready(function(){
	function initOrder(){
		var n="GET",
		a="home/viewCartWithAddr",
		i=null,
		e=function(n){
			if(!n.result.address){
				o.address = {};
			} else {
				o.address=n.result.address;
			}
			
			o.orderlist=n.result.cart.items;
			for(var i=0;i<o.orderlist.length;i++){
				o.amount+=o.orderlist[i].count*o.orderlist[i].price;
			}
			o.realamount = o.amount;
			o.amountStr = o.realamount.toFixed(2);
		},
		r=function(){
            o.orderlist = [];
		};
		common.invokeApi(n, a, i, null, e, r)
	}
	function createOrder() {
		var order = {};
		order.couponId = o.coupon.id;
		order.addressId = o.address.id;
		order.reqTime = o.requireDate;
		order.memo = o.memo;
		if(!order.addressId||order.addressId<=0) {
			alert("请选择地址");
			return;
		}
		if(!order.reqTime){
			alert("请选择服务时间！");
			return;
		}
		o.paying = true;
		common.invokeApi("POST","yunxiyi/createOrder",order,null,function(n){
			o.orderId = n.result.id;
        	requestPay();
		},function(n){
			alert(n.message==null?"下单失败，请稍后重试！":n.message);
			o.paying=false;
		});
		
	}
	function requestPay() {
        common.invokeApi("POST", "/yunxiyi/pay/"+o.orderId, null, null, function(n) {
        	wx.chooseWXPay({
              "timestamp":n.result.timestamp,
              "nonceStr":n.result.nonceStr,
              "package":n.result.pkgStr,
              "signType":n.result.signType,
              "paySign":n.result.signature,
        	   success: function (res) {
        	   	   common.invokeApi("GET", "/yunxiyi/notifyPayed/"+o.orderId);
        	        // 支付成功后的回调函数
        		   alert("下单成功！");
		    	   location.href="home/xiyi/success.html?oId="+o.orderId;
        	   }
        	});
        }, function(n) {
        	alert(n.message==null?"支付请求失败，请稍后重试！":n.message);
        	o.paying=false;
        })
    };
	o = avalon.define({
		$id:"root",
		currentPage:"main",
		paying:false,
		address:{
		},
		amount:0,
		realamount:0,
		amountStr:0,
		memo:"",
		coupon:{},
		couponNum:0,
		requireDate:'',
        showAddress:function(){
        	
        	common.checkRegisterStatus();
        	o.currentPage="";
        	chooseAddress(function(address){
                if(address){
                    o.address=address;
                }
                o.currentPage='main';
            });
        },
        showCoupons:function(){
        	o.currentPage='coupons';
        },
		orderlist:[],
		showMemo:function(){
			showDialog("备注","填写备注信息",o.memo,function(content){
				o.memo = content;
			},null);
		},
		pay:function(){
			if(o.paying){
				alert("提交中，请稍后再试！");
				return;
			}
			if(o.orderId>0) {
				requestPay();
			} else {
				createOrder();
			}
		}
	});

	avalon.scan(document.body);
	initOrder();
	queryCoupon();
	initWechat(['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage']);
	$('#datetimepicker2').datetimepicker({
    	onChangeDateTime:function(x){
    		var dt = x.dateFormat('Y-m-d H:i');
    		var time = x.getTime()-new Date().getTime();
    		if(time<0||time>3600000*24*7) {
    			alert("服务时间只能选择今天之后7天");
    		} else if(time<7200000) {
    			alert("您必须提前两个小时下单!");
    		} else if(o.requireDate!=dt){
    			o.requireDate=dt;
    		}
    	},
    	allowTimes:['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'],
    	lang:'ch',
    	format:'Y-m-d H:i',
    	formatDate:'Y-m-d H:i'
    });
    $('#timetaker').click(function(){
    	$('#datetimepicker2').datetimepicker('show');
    });
})