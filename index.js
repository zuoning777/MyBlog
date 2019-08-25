var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader")

var app = new express();

const history = require('connect-history-api-fallback');
//这句代码需要在express.static上面
app.use(history());
app.use(express.static('./dist'));

// app.use(express.static("./page/"));
// app.use((req,res,next) => {
//     let origin = req.headers.origin;
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));

app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));

app.get("/addComment", loader.get("/addComment"));

app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"));

app.get("/queryAllBlog", loader.get("/queryAllBlog"));
app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryNewComments", loader.get("/queryNewComments"));

app.get("/queryByTag", loader.get("/queryByTag"));
app.get("/queryByTagCount", loader.get("/queryByTagCount"));


app.listen(globalConfig.port, function () {
    console.log("服务器已启动");
})