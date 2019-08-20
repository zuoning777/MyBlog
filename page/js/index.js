var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: ""
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        //请求数据，给content赋值。
        axios({
            methods: "get",
            url: "/queryEveryDay"
        }).then(function(res){
            everyDay.content = res.data.data[0].content;
        }).catch(function(err){
            console.log("请求失败");
        })
    }
})

var articleList = new Vue ({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: null,
        articleList: [],
        pageNumList: []
    },
    computed: {
        jumpTo: function() {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function() {
            return function (page, pageSize) {
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searcheUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                if (tag == "") {//不是查询情况
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = timeChange(result[i].ctime);
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function(resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = timeChange(result[i].ctime);
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(function(resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }

            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"首页", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});
            if (nowPage + 1 < (totalCount + pageSize) / pageSize) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 < (totalCount + pageSize) / pageSize) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:"尾页", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
})
