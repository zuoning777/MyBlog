(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63e8c5da"],{57036:function(e,t,n){"use strict";var m=n("768d"),o=n.n(m);o.a},"768d":function(e,t,n){},d55e:function(e,t,n){"use strict";n.r(t);var m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[e._m(0),n("div",{staticClass:"blog_comments",attrs:{id:"blog_comments"}},[n("span",{staticClass:"blog_comments_msg"},[e._v("当前文章："+e._s(e.total)+" 条留言")]),e._l(e.updateComments,function(t,m){return n("div",{key:m,staticClass:"blog_comment"},[n("span",[n("span",{attrs:{id:"highlight"}},[e._v(e._s(t.user_name))]),e._v("\n        ："+e._s(t.options)+" 发表于 "+e._s(t.ctime)+"\n        "),n("a",{staticStyle:{cursor:"pointer"},on:{click:function(n){return e.reply(t.id,t.user_name)}}},[e._v("[回复]")])]),n("div",[e._v(e._s(t.comments))])])})],2),n("div",{staticClass:"send_comment",attrs:{id:"send_comment"}},[n("span",[e._v("发表评论")]),e._m(1),e._m(2),n("div",[n("input",{attrs:{type:"text",placeholder:"验证码",id:"comment_code"}}),n("span",{domProps:{innerHTML:e._s(e.vcode)},on:{click:function(t){return e.changeCode()}}})]),n("button",{on:{click:e.sendComment}},[e._v("提交评论")])])])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"description"},[n("p",[e._v("东瞅瞅西逛逛，到处窃技术文的博客")]),n("p",[e._v("如果有感兴趣的朋友可以留言")]),n("p",[e._v("博客虽然靠心血来潮更新，但是博主24小时在线~")]),n("p",[e._v("所运用技术栈：vue全家桶+element+node+express+mysql")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{attrs:{type:"hidden",id:"comment_reply",value:"-1"}}),n("input",{attrs:{type:"hidden",id:"comment_reply_name",value:"0"}}),n("input",{attrs:{type:"text",placeholder:"昵称",id:"comment_name"}}),n("input",{attrs:{type:"text",placeholder:"邮箱（评论被回复时你能收到通知）",id:"comment_email"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("textarea",{attrs:{placeholder:"无意义的内容我可能不会回复你",id:"comment_content"}})])}],a=n("bc3a"),c=n.n(a),d=n("797e"),i={data:function(){return{total:0,bid:-2,comments:[],vcode:"",rightCode:""}},methods:{reply:function(e,t){document.getElementById("comment_reply").value=e,document.getElementById("comment_reply_name").value=t,location.href="#send_comment"},getComments:function(){var e=this;c()({method:"get",url:"/queryCommentsByBlogId?bid="+e.bid}).then(function(t){e.comments=t.data.data;for(var n=0;n<e.comments.length;n++)e.comments[n].ctime=d["a"].timeChange(e.comments[n].ctime)})},changeCode:function(){var e=this;c()({method:"get",url:"/queryRandomCode"}).then(function(t){e.vcode=t.data.data.data,e.rightCode=t.data.data.text})},sendComment:function(){var e=this,t=document.getElementById("comment_code").value;if(t!=e.rightCode&&t!=e.rightCode.toLowerCase()&&t!=e.rightCode.toUpperCase())return alert("验证码有误"),this.changeCode(),void(document.getElementById("comment_code").value="");var n=-1,m=document.getElementById("comment_reply").value,o=document.getElementById("comment_reply_name").value,a=document.getElementById("comment_name").value,d=document.getElementById("comment_email").value,i=document.getElementById("comment_content").value;return a?i?void c()({method:"get",url:"/addComment?bid="+n+"&parent="+m+"&userName="+a+"&email="+d+"&content="+i+"&parentName="+o}).then(function(t){document.getElementById("comment_reply").value=-1,document.getElementById("comment_reply_name").value=0,document.getElementById("comment_name").value="",document.getElementById("comment_email").value="",document.getElementById("comment_content").value="",document.getElementById("comment_code").value="",e.changeCode(),e.getComments(),alert(t.data.msg)}):(alert("请输入内容"),this.changeCode(),void(document.getElementById("comment_code").value="")):(alert("请输入用户名"),this.changeCode(),void(document.getElementById("comment_code").value=""))}},computed:{updateComments:function(){for(var e=0;e<this.comments.length;e++)this.comments[e].parent>-1&&(this.comments[e].options="回复@"+this.comments[e].parent_name);return this.comments}},created:function(){var e=this;c()({method:"get",url:"/queryCommentsCountByBlogId?bid="+e.bid}).then(function(t){e.total=t.data.data[0].count}).catch(function(e){console.log("请求错误")}),this.getComments(),this.changeCode()}},s=i,l=(n("57036"),n("2877")),r=Object(l["a"])(s,m,o,!1,null,"f20f44d4",null);t["default"]=r.exports}}]);