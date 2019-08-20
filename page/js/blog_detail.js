var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {
        
    },
    created: function () {
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searcheUrlParams == "") {
            return;
        }
        var bid = -1;

        for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
            if (searcheUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (res) {
            var result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = timeChange(result.ctime);
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(function (error) {
            console.log("请求失败");
        });
    }
});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode: function() {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (res) {
                    // console.log(res);
                    sendComment.vcode = res.data.data.data;
                    sendComment.rightCode = res.data.data.text;
                });
            }
        },
        sendComment: function () {
            return function () {
                var _self = this;
                var code = document.getElementById("comment_code").value;
                if (code != sendComment.rightCode && code != sendComment.rightCode.toLowerCase() && code != sendComment.rightCode.toUpperCase()) {
                    alert("验证码有误");
                    this.changeCode();
                    document.getElementById("comment_code").value = "";
                    return;
                }
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var bid = -10;

                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searcheUrlParams[i].split("=")[1]);
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                if(!name){
                    alert("请输入用户名");
                    this.changeCode();
                    document.getElementById("comment_code").value = "";
                    return;
                }
                if(!content){
                    alert("请输入内容");
                    this.changeCode();
                    document.getElementById("comment_code").value = "";
                    return;
                }
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then(function (res) {
                    document.getElementById("comment_reply").value = -1;
                    document.getElementById("comment_reply_name").value = 0;
                    document.getElementById("comment_name").value = "";
                    document.getElementById("comment_email").value = "";
                    document.getElementById("comment_content").value = "";
                    document.getElementById("comment_code").value = "";
                    _self.changeCode();
                    alert(res.data.msg);
                });
            }
        }
    },
    created: function () {
        this.changeCode();
    }
});

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        bid: -10,
        comments: []
    },
    computed: {
        reply: function() {
            return function (commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        },
        updateComments: function() {
            var _self = this;
            axios({
                method: "get",
                url: "/queryCommentsByBlogId?bid=" + _self.bid
            }).then(function(res){
                _self.comments = res.data.data;
                for(var i = 0; i < _self.comments.length; i ++){
                    _self.comments[i].ctime = timeChange(_self.comments[i].ctime);
                }
            })
            for (var i = 0 ; i < _self.comments.length ; i ++) {
                if (_self.comments[i].parent > -1) {
                    _self.comments[i].options = "回复@" + _self.comments[i].parent_name;
                }
            }
            return _self.comments;
        }
    },
    created: function () {
        var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        // var bid = -10;
        var _self = this;

        for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
            if (searcheUrlParams[i].split("=")[0] == "bid") {
                try {
                    this.bid = parseInt(searcheUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e);
                }
            }
        }

            
        
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + _self.bid
        }).then(function (res) {
            blogComments.total = res.data.data[0].count;
        }).catch(function(res) {
            console.log("请求错误");
        });
    }
});