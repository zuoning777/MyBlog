var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags:[]
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255 + 20;
                var green = Math.random() * 255 + 20;
                var blue = Math.random() * 255 + 20;
                return `rgb(${red}, ${green}, ${blue})`
            }
        },
        randomSize: function () {
            return function () {
                var size = (Math.random() * 20 + 12) + "px";
                return size;
            }
        },
    },
    created: function () {
        var _self = this;
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function (res) {
            var result = [];
            for (var i = 0 ; i < res.data.data.length ; i ++) {
                result.push({text:res.data.data[i].tag, link:"/?tag=" + res.data.data[i].tag});
            }
            _self.tags = result;
        });
    }
})

var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (res) {
            var result = [];
            for (var i = 0 ; i < res.data.data.length ; i ++) {
                var temp = {};
                temp.title = res.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + res.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        });
    }
});


var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: []
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function (res) {
            // console.log(res);
            var result = [];
            for (var i = 0 ; i < res.data.data.length ; i ++) {
                var temp = {};
                temp.name = res.data.data[i].user_name;
                temp.date = timeChange(res.data.data[i].ctime);
                temp.comment = res.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result;
        });
    }
})

function timeChange (time) {
    var date = new Date(time*1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    return (Y+M+D+h+m+s); 
}