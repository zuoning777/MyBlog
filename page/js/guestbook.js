var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        bid: -2,
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
        var _self = this;        
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + _self.bid
        }).then(function (res) {
            blogComments.total = res.data.data[0].count;
        }).catch(function(error) {
            console.log("请求错误");
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
                var bid = -2;

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