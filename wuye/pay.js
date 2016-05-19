avalon.ready(function() {
	var page = 1;
	var normalPage = 1;
	var today = new Date();
	var threemonthago = (new Date(today.getTime()-92*24*3600000)).format('yyyy-MM-dd');
	var halfyearbefore = (new Date(today.getTime()-183*24*3600000)).format('yyyy-MM-dd');
	var oneyearbefore = (new Date(today.getTime()-365*24*3600000)).format('yyyy-MM-dd');
	
	function quickPayBillList(){
		var n = "GET",
        a = "quickPayBillList/"+o.stmtId+"/"+page+"/"+o.totalCount,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			if(n.result!=null) {
	            o.quickbills = n.result.bill_info;
	            o.permit_skip_pay=n.result.permit_skip_pay;
	            o.totalCount = n.result.total_count;
	            if(o.quickbills==null||o.quickbills.size()==0){
	            	alert("没有查到对应账单，请确认账单号是否正确！");
	            }
	            page++;
			} else {
				o.quickbills = [];
				alert("没有查到对应账单，请确认账单号是否正确！");
			}
        },
        r = function() {
        	alert("获取支付记录失败！");
			o.quickbills = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    function queryBillList(){
		var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02&currentPage="+normalPage+"&totalCount="+o.totalCountNormal,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			if(n.result!=null) {
	            o.bills = n.result.bill_info;
	            o.permit_skip_pay=n.result.permit_skip_pay;
	            o.totalCountNormal = n.result.total_count;
			} else {
				o.bills = [];
			}
			normalPage++;
        },
        r = function() {
        	alert("获取账单记录失败！");
	        o.bills = [];
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    var o = avalon.define({
        $id: "root",
        tabs: [
            {
                name: '快捷缴费',
                active: true
            },
            {
                name: '账单缴费',
                active: false
            }
        ],
        stmtId:"",
        quickbills:[],
        quickpermit_skip_pay:1,
        
        
        startDate:"",
        endDate:"",
        totalCount:0,
        totalCountNormal:0,
        changeTab: function(idx) {
        	
            for (var i = 0, len = o.tabs.length; i < len; i++) {
                o.tabs[i].active = false;
            }
            o.tabs[idx].active = true;
            hasNext=true;
            isloadPage=false;
        },
        bills: [],
        permit_skip_pay:1,
        
        
        /**账单**/
        dropdownCollapsed: true,
        selectedDropdown: '',
        dropdowns: [
            {
                name: '近三个月账单',
                startDate: threemonthago
            },
            {
                name: '近半年账单',
                startDate: halfyearbefore
            },
            {
                name: '近一年账单',
                startDate: oneyearbefore
            },
            {
                name: '全部账单',
                startDate: ''//根据需要传给后台的查询参数修改这些value
            }
        ],
        toggleDropdown: function() {
            o.dropdownCollapsed = !o.dropdownCollapsed;
        },
        selectDropdown: function(idx) {
            o.selectedDropdown = o.dropdowns[idx];
            //根据选择的筛选条件刷新列表数据
            if(o.startDate!=o.dropdowns[idx].startDate){
            	o.startDate=o.dropdowns[idx].startDate;
            	queryBillList();
            }
        },
        /**账单**/
        
        /**快捷**/
        scan: function() {
        	wx.scanQRCode({
        	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        	    scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        	    success: function (res) {
        	    	var rs = res.resultStr;
        	    	if(rs.indexOf('CODE')>=0) {
        	    		rs = rs.split(',')[1];
        	    	}
	        	    o.stmtId = rs; // 当needResult 为 1 时，扫码返回的结果
	        	},
	        	fail: function (res) {
	        		alert("扫码失败 ，请重试！");
	        	}
        	});
        },
        submit: function() {
        	if(o.stmtId!=""&&o.stmtId.length!=18){
        		alert("请输入正确的账单号！");
        		return;
        	}
        	page = 1;
        	quickPayBillList();
        },
        /**快捷**/
        
        select: function(idx) {
        	var price = 0;
        	if(o.permit_skip_pay==1) {/*不可跳 必须连续*/
        		for (var i = 0; i <= idx; i++) {
        			o.bills[i].selected=true;
        			price+=parseFloat(o.bills[i].fee_price);
                }
        		for (var i = idx+1; i < o.bills.length; i++) {
        			o.bills[i].selected=false;
                }
        		o.selectedAll = idx == o.bills.length-1;
        	} else {
        		o.bills[idx].selected = !o.bills[idx].selected;
                var selectedAll = true;
                
                for (var i = 0, len = o.bills.length; i < len; i++) {
                    selectedAll &= o.bills[i].selected;
                    price+=o.bills[i].selected?parseFloat(o.bills[i].fee_price):0;
                }
                o.selectedAll = selectedAll;
        	}
        	o.totalPrice=price.toFixed(2);
        },
        selectedAll: false,
        toggleSelectedAll: function() {
            o.selectedAll = !o.selectedAll;
            for (var i = 0, len = o.bills.length; i < len; i++) {
                o.bills[i].selected = o.selectedAll;
            }
            
            if(!o.selectedAll){
        		o.totalPrice = 0.00;
            }else{
            	var total = 0.00;
            	for(var i=0;i<o.bills.length;i++){
            		if(o.bills[i].selected == true){
            			total+=parseFloat(o.bills[i].fee_price);
            		}
            	}
            	o.totalPrice = total.toFixed(2);
            }
            
        },
        totalPrice: 0.00,
        
        
        quickselect: function(idx) {
        	var price = 0;
        	if(o.quickpermit_skip_pay==1) {/*不可跳 必须连续*/
        		for (var i = 0; i <= idx; i++) {
        			o.quickbills[i].selected=true;
        			price+=parseFloat(o.quickbills[i].fee_price);
                }
        		for (var i = idx+1; i < o.quickbills.length; i++) {
        			o.quickbills[i].selected=false;
                }
        		o.quickselectedAll = idx == o.quickbills.length-1;
        	} else {
        		o.quickbills[idx].selected = !o.quickbills[idx].selected;
                var selectedAll = true;
                
                for (var i = 0, len = o.bills.length; i < len; i++) {
                    selectedAll &= o.quickbills[i].selected;
                    price+=o.quickbills[i].selected?parseFloat(o.quickbills[i].fee_price):0;
                }
                o.quickselectedAll = selectedAll;
        	}
        	o.quicktotalPrice=price.toFixed(2);
        },
        quickselectedAll: false,
        quicktoggleSelectedAll: function() {
        	
            o.quickselectedAll = !o.quickselectedAll;
            for (var i = 0, len = o.quickbills.length; i < len; i++) {
                o.quickbills[i].selected = o.quickselectedAll;
            }
            
            if(!o.quickselectedAll){
        		o.quicktotalPrice = 0.00;
            }else{
            	var total = 0.00;
            	for(var i=0;i<o.quickbills.length;i++){
            		if(o.quickbills[i].selected == true){
            			total+=parseFloat(o.quickbills[i].fee_price);
            		}
            	}
            	o.quicktotalPrice = total.toFixed(2);
            }
            
        },
        quicktotalPrice: 0.00,
        
        
        pay: function(billList) {
        	var bills = "";
        	var pay_addr = "";
        	var total = 0.00;
        	var total_pay = 0.00;
            for (var i = 0, len = billList.length; i < len; i++) {
            	if(billList[i].is_onlinepay=='false'){
            		alert("您所在小区仅能查询物业账单，缴费请到小区物业管理处办理。");
            		return false;
            	}
                if(billList[i].selected&&billList[i].pay_status==2){
                	bills+=billList[i].bill_id+",";
        			total+=parseFloat(billList[i].fee_price);
                	total_pay = total.toFixed(2);
                	
                }
            }
            if(bills == "") {
            	alert("请选择需要缴费的账单！");
            	return;
            }
            var pay_addr = billList[0].pay_cell_addr;
            var url = MasterConfig.C("basePageUrl")+"paymentdetail.html?billIds="+bills+"&stmtId="+o.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+total_pay
//        	window.location.href="../paymentdetail.html?billIds="+bills+"&stmtId="+o.stmtId+"&payAddr="+pay_addr+"&totalPrice="+total_pay;
            window.location.href = url;
        }
    });
    
    /*
     * 1.判断用户是否为注册用户，如为注册用户，则走正常缴费流程。如果不为注册用户则跳转到注册页面。
     */
    function checkUserRegister(){
    	
    	common.checkRegisterStatus();
//    	var n = "GET",
//        a = "userInfo",
//        i = null,
//        e = function(n) {
//			console.log(JSON.stringify(n));
//			if(n.result == null||n.result==""){
//				alert("新用户请先注册。");
//				toRegisterAndBack();
//				return false;
//			}
//			var tel = n.result.tel;
//			if(tel==null || tel == '' ){
//				alert("新用户请先注册。");
//				toRegisterAndBack();
//				return false;
//			}
//    	},
//        r = function(n) {
//        	if(n.errorCode==40001){
//        		alert("新用户请先注册。");
//        		toRegisterAndBack();
//        	}
//	        return false;
//        };
//        common.invokeApi(n, a, i, null, e, r)
    	
    }
    
    var loadheight = $('#indexDiv').height(),hasNext=true,isloadPage=false;
    $(window).scroll(function (event) {
        loadheight = $('#indexDiv').height();
        var st = $(window).scrollTop();
        var hook=loadheight-st;

		var is_active = o.tabs[0].active;
		var tmp = page;
		if(!is_active){
			tmp = normalPage;
		}

        if(hook<800&&hasNext&&!isloadPage&&tmp>1){
            isloadPage=true;
            commonui.showAjaxLoading();
            
            if(is_active){
            	loadNextPage();
            }else {
				loadNextPageNormal();
			}
        }
    })

    function loadNextPage(){
    	
    	var n = "GET",
        a = "quickPayBillList/"+o.stmtId+"/"+page+"/"+o.totalCount,
        i = null,
        e = function(n) {
    		if(n.result.bills_size==0) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.quickbills= o.quickbills.concat(n.result.bill_info);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		page++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载账单信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    function loadNextPageNormal(){
    	
    	var n = "GET",
        a = "billList?startDate="+o.startDate+"&endDate="+o.endDate +"&payStatus=02&currentPage="+normalPage+"&totalCount="+o.totalCountNormal,
        i = null,
        e = function(n) {
    		if(n.result==null) {
                hasNext=false;
                isloadPage = false;
            	commonui.showMessage("没有更多啦");
            	commonui.hideAjaxLoading();
    		} else {
    			o.bills= o.bills.concat(n.result.bill_info);
                isloadPage = false;
                commonui.hideAjaxLoading();
    		}
    		normalPage++;
        },
        r = function() {
        	isloadPage = false;
        	commonui.showMessage("加载账单信息失败");
        	commonui.hideAjaxLoading();
        };
        common.invokeApi(n, a, i, null, e, r)
    }
    
    
    checkUserRegister();
    initWechat(['scanQRCode']);
    queryBillList();
    avalon.scan(document.body);
    //share.default_send();
    FastClick.attach(document.body); 
    checkFromShare();
});