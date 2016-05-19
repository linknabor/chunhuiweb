avalon.ready(function() {
	//0 公告 1资讯
	function getMessageId(){
		o.messageId=getUrlParam("messageId");
	}
	function showMessage() {
		var n = "GET",
        a = "messageDetail/"+o.messageId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
	        o.message = n.result;
        },
        r = function() {
        	alert("加载消息失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function showFeedbacks() {
		var n = "GET",
        a = "feedbacks/"+o.messageId,
        i = null,
        e = function(n) {
			console.log(JSON.stringify(n));
	        o.feedbacks = n.result;
        },
        r = function() {
        	alert("加载评论失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
	function pushFeedback() {
		var n = "POST",
        a = "pushFeedback",
        i = {messageId:o.messageId,content:o.content},
        e = function(n) {
			console.log(JSON.stringify(n));
	        o.feedbacks.push(n.result);
	        o.content='';
        },
        r = function() {
        	alert("评论失败！");
        };
        common.invokeApi(n, a, i, null, e, r)
	}
    o = avalon.define({
        $id: "root",
        message:{},
        messageId:"",
        feedbacks:[],
        content:"",
        pinlun:function(){
        	if(o.content == "") {
        		alert("请填写评论！");
        		return;
        	}
        	if(o.messageId == "") {
        		alert("消息获取失败！");
        		return;
        	}
        	pushFeedback();
        },
        jumpToComment:function(){
        	window.location.href="comments.html?messageId="+o.messageId;
        },
        getDateStr:function(d) {
        	return new Date(d).format('yyyy-MM-dd hh:ss');
        }
    });
    getMessageId();
    showMessage();
    showFeedbacks();
    avalon.scan(document.body),
    //share.default_send(),
    FastClick.attach(document.body),
    common.setTitle("");
    checkFromShare();
});