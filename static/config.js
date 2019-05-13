var pay = /127|test/.test(location.origin)?'https://test.e-shequ.com/pay/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/weixin/':
		  'https://www.e-shequ.com/pay/';

var html= /127|test/.test(location.origin)?'https://test.e-shequ.com/chunhui/weixin/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/chunhui/weixin/':
		  'https://www.e-shequ.com/chunhui/weixin/';
var ch = "ch";
window.config = {
		//请求头公共部分
		baseUrl:/127|test/.test(location.origin)?'https://test.e-shequ.com/chunhui/wechat/hexie/wechat/':
  		/uat/.test(location.origin)?'https://uat.e-shequ.com/chunhui/wechat/hexie/wechat/':
  		'https://www.e-shequ.com/chunhui/wechat/hexie/wechat/',

		//首页请求
		person_index:{			
			url1: pay+ch+'orderpay.html',//商品订单 团购订单  服务订单
			url2: html+'repair/index.html',//报修单			
			url3: html+'wuye/index.html?#/myHouse',//绑定房屋 我是业主
		},
		person_footer:{			
			url1: html+'wuye/index.html',//底部导航 社区
			url2: html+'home/index.html' //底部导航 生活
		},
		person_register:{			
			url1: html+'person/index.html',// 注册页
		},
		//home页面
		home_footer:{	
			url1: html+'wuye/index.html',   //底部导航 物业
			url2: html+'person/index.html'  //底部导航 个人中心		
		},
		repair_orderdetail:{
			url1: pay+ch+'orderpay.html'
		},
		repair_success:{
			url1: html+'wuye/index.html'
		},
		//商品订单板块
		orderpay_commentxiu:{
			url1: html+'repair/index.html',
		},
		orderpay_homeorderdetail:{
			url1: html+'home/index.html',
		},
		wuye_index:{
			url1: html+'repair/index.html#/repair?category=4'//便民维修
		},
		wuye_footer:{
			url1: html+'home/index.html',   //底部导航  社区生活
			url2: html+'person/index.html'  //底部导航  个人中心
		},
		wuye_pay:{
			url1: pay+ ch + 'wuyepay.html'//支付跳转
		},
		wuye_house:{
			url1: /127|test/.test(location.origin)?'test.e-shequ.com':
  				  /uat/.test(location.origin)?'uat.e-shequ.com':
  				  'www.e-shequ.com'       //提示框网址
		},
		wuye_suggest:{
			url1: html+'wuye/index.html'//意见发布成功后跳转地址
		},
		wuye_zhifu:{
			url1:html+'wuye/index.html?#/paymentquery'
		}
		
};


// export default config;