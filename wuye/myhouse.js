avalon.ready(function() {
	function query() {
        var n = "GET",
        a = "hexiehouses",
        i = null,
        e = function(n) {
            o.houses = n.result;
        },
        r = function() {
			o.houses = [];
        };
        common.invokeApi(n, a, i, null, e, r)
    }
	function getHouse(){
		var n = "GET",
        a = "hexiehouse/"+o.stmtId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
			if(n.result == null) {
				alert("没有查到信息，请确认账单号是否正确！");
			} else {
	            o.choosedhouse = n.result;
	            o.currentPage = "chooseHouse";
			}
        },
        r = function() {
        	console.log(JSON.stringify(n));
			o.choosedhouse = {};
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function deleteHouse(house){
		var n = "GET",
        a = "hexiehouse/delete/"+house.mng_cell_id,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
            o.houses.remove(house)
            alert("删除房子成功。");
        },
        r = function() {
			alert("删除房子失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function addHouse(){
		var n = "GET",
        a = "addhexiehouse/"+o.stmtId+"/"+o.choosedhouse.mng_cell_id,
        i = null,
        e = function(n) {
			o.choosedhouse={};
			alert("添加房屋成功。");
			query();
			o.currentPage = "main";

        },
        r = function(n) {
			alert("添加房子异常，请稍后重试！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    o = avalon.define({
        $id: "root",
        stmtId:"",
        currentPage:"main",
        currentStatus:"get",
        bg_img:'../static/img/bg/bg_nohouse.jpg',
        choosedhouse:{},
		houses:[],
        deleteHouse : function(house) {
        	if(confirm('确认删除该房子？')){
        		deleteHouse(house);
    		};
        },
        scan: function() {
        	wx.scanQRCode({
        	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        	    success: function (res) {
        	    	var rs = res.resultStr;
        	    	if(rs.indexOf('CODE')>=0) {
        	    		rs = rs.split(',')[1];
        	    	}
	        	    o.stmtId = rs; // 当needResult 为 1 时，扫码返回的结果
	        	}
        	});
        },
        confirmAddHouse:function() {
            if(confirm('确认添加房子吗?')){
				 addHouse();
    		}
        },
        toAddHouse:function(){
        	o.currentPage = "addHouse";
        },
        getHouse: function() {
        	if(o.stmtId!=""&&o.stmtId.length!=18){
        		alert("请输入正确的账单号！");
        		return;
        	}
        	getHouse();
        }
    });
    query();
    initWechat(['scanQRCode']);
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("我是业主");
    checkFromShare();
});