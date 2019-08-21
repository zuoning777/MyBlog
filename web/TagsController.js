var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function queryRandomTags(request, response) {
    tagsDao.queyrAllTag(function (result) {
        result.sort(function () {
           return Math.random() > 0.5 ? true : false;
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryRandomTags", queryRandomTags);

function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queyrTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        } else {
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {

                var blogList = [];
                for (var i = 0 ; i < result.length ; i ++) {
                    blogDao.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    });
                }
                getResult(blogList, result.length, response);
            });
        }
    });
}
path.set("/queryByTag", queryByTag);

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response);
        }, 10);
    } else {
        for (var i = 0 ; i < blogList.length ; i ++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
            blogList[i].content = blogList[i].content.replace(/(<p(([\s\S])*?)>|<\/p>|<code(([\s\S])*?)>|<\/code>|&nbsp;|<a(([\s\S])*?)>|<\/a>)|<div(([\s\S])*?)>|<\/div>|<span(([\s\S])*?)>|<\/span>|<pre(([\s\S])*?)>|<\/pre>|<h3(([\s\S])*?)>|<\/h3>|<br(([\s\S])*?)>|<\/br>|<font(([\s\S])*?)>|<\/font>|<o(([\s\S])*?)>|<\/o:p>|<li(([\s\S])*?)>|<\/li>|<ol(([\s\S])*?)>|<\/ol>|<ul(([\s\S])*?)>|<\/ul>|<table(([\s\S])*?)>|<\/table>|<thead(([\s\S])*?)>|<\/thead>|<tr(([\s\S])*?)>|<\/tr>|<th(([\s\S])*?)>|<\/th>|<tbody(([\s\S])*?)>|<\/tbody>|<td(([\s\S])*?)>|<\/td>/g, "");
            blogList[i].content = blogList[i].content.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
            blogList[i].content = blogList[i].content.substring(0, 350);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }
}

function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params.tag);
    tagsDao.queyrTag(params.tag, function (result) {
        // console.log(result);
        tagBlogMappingDao.queryByTagCount(result[0].id, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        });
    });
}
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;
