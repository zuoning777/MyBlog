(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a44649c"],{"0e15c":function(t,e,a){"use strict";var n=a("cc8c"),i=a.n(n);i.a},"97ca":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"blogList"},[a("div",{staticClass:"every_day",attrs:{id:"every_day"}},[a("span",[t._v("每日一句")]),a("p",{domProps:{innerHTML:t._s(t.getContent)}})]),a("div",{staticClass:"article_list",attrs:{id:"article_list"}},[t._l(t.articleList,function(e){return a("div",{key:e.id,staticClass:"article"},[a("router-link",{staticClass:"article_title",attrs:{tag:"a",to:{name:"detail",params:{id:e.id}}}},[t._v(t._s(e.title))]),a("p",{staticClass:"article_content",domProps:{innerHTML:t._s(e.content)}}),a("div",{staticClass:"article_foot"},[t._v("\n        发布于"+t._s(e.date)+" | 浏览("+t._s(e.views)+") | Tags: "),t._l(t.tagList,function(e,n){return a("span",{key:n,attrs:{id:"tag"}},[t._v(" "+t._s(e)+" ")])})],2)],1)}),a("div",{staticClass:"page_tool"},[a("ul",t._l(t.generatePageTool,function(e,n){return a("li",{key:n,class:{now_page:e.text==t.page},on:{click:function(a){return t.jumpTo(e.page)}}},[t._v(t._s(e.text))])}),0)])],2)])},i=[],s=(a("28a5"),a("a481"),a("bc3a")),c=a.n(s),o=a("797e"),r={data:function(){return{content:"",page:1,pageSize:5,count:null,articleList:[],pageNumList:[],tagList:[]}},watch:{$route:function(t,e){t.params.tag!=e.params.tag&&(this.$route.params.tag=t.params.tag,this.getPage(1,5))}},computed:{getContent:function(){return this.content},jumpTo:function(){return function(t){this.getPage(t,this.pageSize)}},getPage:function(){return function(t,e){var a=this,n=this.$route.params.tag;c()({method:"get",url:"/queryByTag?page="+(t-1)+"&pageSize="+e+"&tag="+n}).then(function(e){for(var n=e.data.data,i=[],s=0;s<n.length;s++){var c={};c.title=n[s].title,c.content=n[s].content.replace(/<img/g,"<img style='width:auto;max-width:100%;'"),c.date=o["a"].timeChange(n[s].ctime),c.views=n[s].views,c.tags=n[s].tags,a.tagList=c.tags.replace(/,/g,",~").split("~"),c.id=n[s].id,i.push(c)}a.articleList=i,a.page=t}).catch(function(t){console.log("请求错误")}),c()({method:"get",url:"/queryByTagCount?tag="+n}).then(function(t){a.count=t.data.data[0].count,a.generatePageTool})}},generatePageTool:function(){var t=this.page,e=this.pageSize,a=this.count,n=[];return n.push({text:"首页",page:1}),t>2&&n.push({text:t-2,page:t-2}),t>1&&n.push({text:t-1,page:t-1}),n.push({text:t,page:t}),t+1<(a+e)/e&&n.push({text:t+1,page:t+1}),t+2<(a+e)/e&&n.push({text:t+2,page:t+2}),n.push({text:"尾页",page:parseInt((a+e-1)/e)}),this.pageNumList=n,n}},created:function(){var t=this;c()({methods:"get",url:"/queryEveryDay"}).then(function(e){t.content=e.data.data[0].content}).catch(function(t){console.log("请求失败")}),this.getPage(this.page,this.pageSize)}},u=r,g=(a("0e15c"),a("2877")),l=Object(g["a"])(u,n,i,!1,null,"4aa67c47",null);e["default"]=l.exports},cc8c:function(t,e,a){}}]);