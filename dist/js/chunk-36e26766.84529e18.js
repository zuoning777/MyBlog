(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36e26766"],{"039f":function(t,e,n){},1e3:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"detail"},[n("div",{staticClass:"blog",attrs:{id:"blog_detail"}},[n("div",{staticClass:"blog_title"},[t._v(t._s(t.title))]),n("div",{staticClass:"blog_msg"},[t._v("博主：左宁 标签："+t._s(t.tags)+" 发布于："+t._s(t.ctime)+" 浏览("+t._s(t.views)+")")]),n("div",{staticClass:"blog_content",domProps:{innerHTML:t._s(t.content)}})]),n("div",{staticClass:"blog_comments",attrs:{id:"blog_comments"}},[n("span",{staticClass:"blog_comments_msg"},[t._v("当前文章："+t._s(t.total)+" 条留言")]),t._l(t.updateComments,function(e,o){return n("div",{key:o,staticClass:"blog_comment"},[n("span",[n("span",{attrs:{id:"highlight"}},[t._v(t._s(e.user_name))]),t._v("\n        ："+t._s(e.options)+" 发表于 "+t._s(e.ctime)+"\n        "),n("a",{staticStyle:{cursor:"pointer"},on:{click:function(n){return t.reply(e.id,e.user_name)}}},[t._v("[回复]")])]),n("div",[t._v(t._s(e.comments))])])})],2),n("div",{staticClass:"send_comment",attrs:{id:"send_comment"}},[n("span",[t._v("发表评论")]),t._m(0),t._m(1),n("div",[n("input",{attrs:{type:"text",placeholder:"验证码",id:"comment_code"}}),n("span",{domProps:{innerHTML:t._s(t.vcode)},on:{click:function(e){return t.changeCode()}}})]),n("button",{on:{click:function(e){return t.sendComment()}}},[t._v("提交评论")])])])},m=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{attrs:{type:"hidden",id:"comment_reply",value:"-1"}}),n("input",{attrs:{type:"hidden",id:"comment_reply_name",value:"0"}}),n("input",{attrs:{type:"text",placeholder:"昵称",id:"comment_name"}}),n("input",{attrs:{type:"text",placeholder:"邮箱（评论被回复时你能收到通知）",id:"comment_email"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("textarea",{attrs:{placeholder:"无意义的内容我可能不会回复你",id:"comment_content"}})])}],a=n("bc3a"),c=n.n(a),i=n("797e"),d={data:function(){return{title:"",content:"",ctime:"",tags:"",views:"",bid:-10,vcode:"",rightCode:"",total:0,comments:[]}},watch:{$route:function(t,e){t.params.id!=e.params.id&&(this.$route.params.id=t.params.id,this.getBlog())}},created:function(){this.getBlog(),this.getComments(),this.changeCode()},methods:{getBlog:function(){var t=this;this.bid=this.$route.params.id,-10!=this.bid&&(c()({method:"get",url:"/queryBlogById?bid="+t.bid}).then(function(e){var n=e.data.data[0];t.title=n.title,t.content=n.content,t.ctime=i["a"].timeChange(n.ctime),t.tags=n.tags,t.views=n.views}).catch(function(t){console.log("请求失败")}),c()({method:"get",url:"/queryCommentsCountByBlogId?bid="+t.bid}).then(function(e){t.total=e.data.data[0].count}).catch(function(t){console.log("请求错误")}))},reply:function(t,e){document.getElementById("comment_reply").value=t,document.getElementById("comment_reply_name").value=e,location.href="#send_comment"},getComments:function(){var t=this;c()({method:"get",url:"/queryCommentsByBlogId?bid="+t.bid}).then(function(e){t.comments=e.data.data;for(var n=0;n<t.comments.length;n++)t.comments[n].ctime=i["a"].timeChange(t.comments[n].ctime)})},changeCode:function(){var t=this;c()({method:"get",url:"/queryRandomCode"}).then(function(e){t.vcode=e.data.data.data,t.rightCode=e.data.data.text})},sendComment:function(){var t=this,e=document.getElementById("comment_code").value;if(e!=t.rightCode&&e!=t.rightCode.toLowerCase()&&e!=t.rightCode.toUpperCase())return alert("验证码有误"),this.changeCode(),void(document.getElementById("comment_code").value="");var n=document.getElementById("comment_reply").value,o=document.getElementById("comment_reply_name").value,m=document.getElementById("comment_name").value,a=document.getElementById("comment_email").value,i=document.getElementById("comment_content").value;return m?i?void c()({method:"get",url:"/addComment?bid="+t.bid+"&parent="+n+"&userName="+m+"&email="+a+"&content="+i+"&parentName="+o}).then(function(e){document.getElementById("comment_reply").value=-1,document.getElementById("comment_reply_name").value=0,document.getElementById("comment_name").value="",document.getElementById("comment_email").value="",document.getElementById("comment_content").value="",document.getElementById("comment_code").value="",t.changeCode(),t.getComments(),alert(e.data.msg)}):(alert("请输入内容"),this.changeCode(),void(document.getElementById("comment_code").value="")):(alert("请输入用户名"),this.changeCode(),void(document.getElementById("comment_code").value=""))}},computed:{updateComments:function(){for(var t=0;t<this.comments.length;t++)this.comments[t].parent>-1&&(this.comments[t].options="回复@"+this.comments[t].parent_name);return this.comments}}},s=d,l=(n("d892"),n("2877")),r=Object(l["a"])(s,o,m,!1,null,"6b71b63c",null);e["default"]=r.exports},d892:function(t,e,n){"use strict";var o=n("039f"),m=n.n(o);m.a}}]);