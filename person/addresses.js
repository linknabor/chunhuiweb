 var o;
avalon.ready(function() {
	function query() {
        common.invokeApi("GET", "addresses", null, null, function(n) {
            o.addresses = n.result;
        }, function(n) {
            alert("获取地址信息失败！");
            o.addresses = [];
        });
    }
	function queryXiaoquWithCache(){
        if(o.xiaoqus.length>0){return;}
        common.invokeApi("POST", "queryXiaoqus", null, null, function(n) {
            o.xiaoqus = n.result;
        }, function(n) {
            alert("获取小区信息失败！");
            o.xiaoqus = [];
        });
    }
	function deleteAddress() {
	    var addr = o.checkedAddress;
        common.invokeApi("POST", "address/delete/" +addr.id, null, null, function(n) {
            console.log("success:" + JSON.stringify(n));
            o.addresses.remove(addr);
            o.showpage('list');
        }, function(n) {
            alert(n.message==null?"删除地址失败！":n.message);
        })
    }
	function setDefalutAddress(addr) {
        common.invokeApi("POST", "address/default/" +addr.id, null, null, function(n) {
            for(var idx in o.addresses) {
                if(o.addresses[idx].id == addr.id) {
                    o.addresses[idx].main=true;
                } else {
                    o.addresses[idx].main=false;
                }
            }
            updateCurrentAddrId(addr.id);
        }, function() {
            alert("设置默认地址失败！");
        })
    }
	function saveAddress() {
        var addr = {};
        addr.xiaoquId=o.checkedAddress.xiaoquEntId;
        addr.name=o.checkedAddress.receiveName;
        addr.tel=o.checkedAddress.tel;
        addr.detailAddr=o.checkedAddress.detailAddress;
        if(o.checkedAddress.id){
            addr.addrId=o.checkedAddress.id;
        }
        common.invokeApi("POST", "saveAddressWithXiaoqu", addr, null, function(n) {
            if(!o.checkedAddress.id) {
                o.addresses.push(n.result);
                o.checkedAddress=n.result;
            }
            o.page = "list";
        }, function(n) {
            alert(n.message==null?"地址保存失败，请重试！":n.message);
        });
    }
	function resetCheckedAddr(){
        o.checkedAddress={xiaoquName:"请选择小区",province:"",
            city:"",county:"",xiaoquAddr:"",receiveName:"",
            tel:"",detailAddress:"",xiaoquEntId:0,id:0};
    }
    
    o = avalon.define({
        $id: "root",
        page : "list",
        addresses:[{"id":6678,"createDate":1461845752153,"amapId":null,"amapDetailAddr":null,"provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":21,"county":"黄埔","xiaoquId":49,"xiaoquName":"宝房二村","longitude":121.0,"latitude":31.0,"userId":14830,"userName":null,"receiveName":"asdfasdf","detailAddress":"asdfasdfasdf","tel":"13322323323","main":false,"xiaoquEntId":5,"xiaoquAddr":"沙沙路１０１号","regionStr":"上海市黄埔宝房二村"},{"id":6677,"createDate":1461841816161,"amapId":null,"amapDetailAddr":null,"provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":21,"county":"黄埔","xiaoquId":47,"xiaoquName":"宝房09号","longitude":121.0,"latitude":31.0,"userId":14830,"userName":null,"receiveName":"欧冶子·","detailAddress":"阿斯蒂芬","tel":"13322234445","main":false,"xiaoquEntId":4,"xiaoquAddr":"沙沙路１１１号","regionStr":"上海市黄埔宝房09号"},{"id":6676,"createDate":1461841256186,"amapId":null,"amapDetailAddr":null,"provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":21,"county":"黄埔","xiaoquId":51,"xiaoquName":"宝房4村","longitude":121.0,"latitude":31.0,"userId":14830,"userName":null,"receiveName":"asdfasdfasdf","detailAddress":"asdfasdf","tel":"13344445555","main":false,"xiaoquEntId":7,"xiaoquAddr":"沙沙路3０２号","regionStr":"上海市黄埔宝房4村"},{"id":6675,"createDate":1461840606896,"amapId":null,"amapDetailAddr":null,"provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":21,"county":"黄埔","xiaoquId":52,"xiaoquName":"宝房5村","longitude":121.0,"latitude":31.0,"userId":14830,"userName":null,"receiveName":null,"detailAddress":"撒旦法","tel":"13333332222","main":false,"xiaoquEntId":8,"xiaoquAddr":"沙沙路4０２号","regionStr":"上海市黄埔宝房5村"},{"id":6674,"createDate":1461840506064,"amapId":null,"amapDetailAddr":null,"provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":21,"county":"黄埔","xiaoquId":50,"xiaoquName":"宝房３村","longitude":121.0,"latitude":31.0,"userId":14830,"userName":null,"receiveName":null,"detailAddress":"好了开始的积分 ","tel":"13344432223","main":false,"xiaoquEntId":6,"xiaoquAddr":"沙沙路2２号","regionStr":"上海市黄埔宝房３村"},{"id":6673,"createDate":1461839221576,"amapId":null,"amapDetailAddr":null,"provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":21,"county":"黄埔","xiaoquId":49,"xiaoquName":"宝房二村","longitude":121.0,"latitude":31.0,"userId":14830,"userName":null,"receiveName":null,"detailAddress":"asdfasdf","tel":"1333223333","main":false,"xiaoquEntId":5,"xiaoquAddr":"沙沙路１０１号","regionStr":"上海市黄埔宝房二村"},{"id":6660,"createDate":1459245903585,"amapId":14217,"amapDetailAddr":"隆昌路619弄","provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":30,"county":"杨浦区","xiaoquId":25321,"xiaoquName":"城市概念","longitude":121.539504,"latitude":31.275644,"userId":14830,"userName":null,"receiveName":"小艾","detailAddress":"隆昌路619弄10号楼203室","tel":"18220107036","main":true,"xiaoquEntId":0,"xiaoquAddr":null,"regionStr":"上海市杨浦区城市概念"},{"id":6341,"createDate":1454243329811,"amapId":5791,"amapDetailAddr":"菊太路1399弄","provinceId":19,"province":"上海","cityId":20,"city":"上海市","countyId":32,"county":"宝山区","xiaoquId":12585,"xiaoquName":"好日子大家园D区","longitude":121.354004,"latitude":31.346479,"userId":14830,"userName":"酸辣土豆丝","receiveName":"酸辣土豆丝","detailAddress":"菊太路1399弄43号","tel":"13761451053","main":false,"xiaoquEntId":0,"xiaoquAddr":null,"regionStr":"上海市宝山区好日子大家园D区"}],
        checkedAddress:{},
        
        xiaoqus:[],
        checkedXiaoqu:{id:0},
        editAddr:function(idx){
          o.showpage('form');
        },
        addNewAddr:function(){
          resetCheckedAddr();
          o.showpage('form');
        },
        deleteAddress : function(addr) {
        	if(confirm('确认删除该地址？')){
        		deleteAddress(addr);
    		};
        },
        addAddress:function(){
            if(!o.checkedAddress.xiaoquEntId){
                alert("请选择小区！");
                return;
            }
            if(!o.checkedAddress.detailAddress||!o.checkedAddress.receiveName
                ||!o.checkedAddress.tel){
                alert("请填写完整相关信息！");
                return;
            }
            if(!(/^1[3-9][0-9]\d{4,8}$/.test(o.checkedAddress.tel))) {
                alert("请填写正确的手机号！");
                return;
            }
            saveAddress();
        },
        setDefaultAddress:function(){
        	if(!o.checkedAddress){
        		alert("请选择一个地址！");
        		return;
        	}
        	if(!o.checkedAddress.main) {
        		if(confirm("设为默认地址？")){
        			setDefalutAddress(o.checkedAddress);
        		}
        	} else {
        		alert("已经是默认地址了！");
        	}
        },
        
        showpage:function(page){
            o.page = page;
            if(page=='xiaoqu'){
                queryXiaoquWithCache();
            }
        },
        choseXiaoqu:function(idx) {
            o.checkedXiaoqu=o.xiaoqus[idx];
        },
        chosedXiaoqu:function(){
            o.checkedAddress.xiaoquEntId=o.checkedXiaoqu.id;
            o.checkedAddress.province=o.checkedXiaoqu.province;
            o.checkedAddress.city=o.checkedXiaoqu.city;
            o.checkedAddress.county=o.checkedXiaoqu.county;
            o.checkedAddress.xiaoquAddr=o.checkedXiaoqu.xiaoquAddr;
            o.checkedAddress.xiaoquName=o.checkedXiaoqu.xiaoquName;
            
            o.showpage('form');
        },
        check: function(address) {
        	o.checkedAddress = address;
        },
        isChecked:function(address) {
        	return o.checkedAddress.id == address.id;
        }
    });

    if(common.checkRegisterStatus()){
        query();
    }
    
    avalon.scan(document.body),
    FastClick.attach(document.body),
    common.setTitle("地址信息");
});
