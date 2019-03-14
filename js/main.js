var pm = {};
$(function(){
	pm.config();
});
pm.config = function(){
	pm.addCss("http://www.bundor.com/skin/theme2/css/style.css");

	pm.lazyloadImg("img.lazy");
	pm.events();
	pm.browser();
};

pm.events = function(){
	pm.diaolog();
	pm.ajaxform("提交成功");

};

pm.goTop = function(ele){
	$(ele).hide();
	var scrolltop = $(window).scrollTop();
	if(scrolltop > 500){
		$(ele).fadeIn(400);
	}else{
		$(ele).fadeOut(400);
	}
	$(ele).click(function(){
		$('body, html').animate({scrollTop:'0px'}, 500);
		return false;
	})
}
pm.browser = function(){
    //判断访问终端
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    //browser.versions.trident返回真假，真则是IE内核，以此类推browser.versions.webKit是否为谷歌内核
    if(browser.versions.iPhone) {
        console.log("我是苹果设备");
    }
    if (browser.versions.webKit) {
        console.log("我是谷歌浏览器");
    }
    if (browser.versions.mobile) {
        console.log("我是移动端");
    }else{
        console.log("我是PC端");
    };
    if(browser.versions.trident){
        console.log("我是IE浏览器");
    }
    if (browser.versions.presto) {
        console.log("我是欧朋浏览器");
    }
    if (browser.versions.gecko) {
        console.log("我是火狐浏览器");
    }

};
//ajax提交表单
pm.ajaxform = function(text){
	$.cxDialog(text);
    var form = $('form[name="feedback"]');
    var url = form.attr('action');
    form .submit(function(){
         var data = form.serialize();
         $.post(url,data,function(html){
			$.cxDialog(text);
//           alert(text);
         });
         return false;
    })
};
//新窗口打开
pm.target = function(){
	//新窗口链接
	$('.target').attr({target:'_blank'});
	$('a[rel=nofollow]').click(function(){
		$(this).attr('target','_blank');
	});
};
//动态添加css
pm.addCss = function(url){
	var linkcss = document.createElement('link');
	linkcss.type="text/css";
	linkcss.rel="stylesheet";
	linkcss.href = url;
	document.getElementsByTagName("head")[0].appendChild(linkcss);
};
//表格样式
pm.styleTable = function(ele){
	$(ele).addClass("am-table am-table-bordered am-table-striped am-table-hover am-table-compact am-text-nowrapam-table-centered").wrap(function(){return "<div class='am-scrollable-horizontal'></div>";});
}
//控制显示字符，超出多少字符 省略号
pm.textOverflow = function(ele,length){
	$(ele).each(function(){
	  var maxwidth=length;
	  if($(this).text().length > maxwidth){
	    $(this).text($(this).text().substring(0,maxwidth));
	    $(this).html($(this).html()+'...');
	  }
	});
}
//tab切换
pm.changetab = function(ele){
//https://vdw.github.io/Tabslet/
!function($,window,undefined){"use strict";$.fn.tabslet=function(options){var defaults={mouseevent:"click",activeclass:"active",attribute:"href",animation:!1,autorotate:!1,deeplinking:!1,pauseonhover:!0,delay:2e3,active:1,container:!1,controls:{prev:".prev",next:".next"}},options=$.extend(defaults,options);return this.each(function(){function deep_link(){var t=[];elements.find("a").each(function(){t.push($(this).attr($this.opts.attribute))});var e=$.inArray(location.hash,t);return e>-1?e+1:$this.data("active")||options.active}var $this=$(this),_cache_li=[],_cache_div=[],_container=options.container?$(options.container):$this,_tabs=_container.find("> div");_tabs.each(function(){_cache_div.push($(this).css("display"))});var elements=$this.find("> ul > li"),i=options.active-1;if(!$this.data("tabslet-init")){$this.data("tabslet-init",!0),$this.opts=[],$.map(["mouseevent","activeclass","attribute","animation","autorotate","deeplinking","pauseonhover","delay","container"],function(t){$this.opts[t]=$this.data(t)||options[t]}),$this.opts.active=$this.opts.deeplinking?deep_link():$this.data("active")||options.active,_tabs.hide(),$this.opts.active&&(_tabs.eq($this.opts.active-1).show(),elements.eq($this.opts.active-1).addClass(options.activeclass));var fn=eval(function(t,e){var s=e?elements.find("a["+$this.opts.attribute+'="'+e+'"]').parent():$(this);s.trigger("_before"),elements.removeClass(options.activeclass),s.addClass(options.activeclass),_tabs.hide(),i=elements.index(s);var o=e||s.find("a").attr($this.opts.attribute);return $this.opts.deeplinking&&(location.hash=o),$this.opts.animation?_container.find(o).animate({opacity:"show"},"slow",function(){s.trigger("_after")}):(_container.find(o).show(),s.trigger("_after")),!1}),init=eval("elements."+$this.opts.mouseevent+"(fn)"),t,forward=function(){i=++i%elements.length,"hover"==$this.opts.mouseevent?elements.eq(i).trigger("mouseover"):elements.eq(i).click(),$this.opts.autorotate&&(clearTimeout(t),t=setTimeout(forward,$this.opts.delay),$this.mouseover(function(){$this.opts.pauseonhover&&clearTimeout(t)}))};$this.opts.autorotate&&(t=setTimeout(forward,$this.opts.delay),$this.hover(function(){$this.opts.pauseonhover&&clearTimeout(t)},function(){t=setTimeout(forward,$this.opts.delay)}),$this.opts.pauseonhover&&$this.on("mouseleave",function(){clearTimeout(t),t=setTimeout(forward,$this.opts.delay)}));var move=function(t){"forward"==t&&(i=++i%elements.length),"backward"==t&&(i=--i%elements.length),elements.eq(i).click()};$this.find(options.controls.next).click(function(){move("forward")}),$this.find(options.controls.prev).click(function(){move("backward")}),$this.on("show",function(t,e){fn(t,e)}),$this.on("next",function(){move("forward")}),$this.on("prev",function(){move("backward")}),$this.on("destroy",function(){$(this).removeData().find("> ul li").each(function(){$(this).removeClass(options.activeclass)}),_tabs.each(function(t){$(this).removeAttr("style").css("display",_cache_div[t])})})}})},$(document).ready(function(){$('[data-toggle="tabslet"]').tabslet()})}(jQuery);
$(ele).tabslet();
};

pm.diaolog = function(){
/*!
 * jQuery cxDialog 1.2.3
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxDialog
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2016-03-24
 *
 * 简易调用：$.cxDialog(string[, ok, no])
 * 完整方法：$.cxDialog(opt)
 * @param {object|string} opt 参数设置 or 内容
 *   title {string} 标题
 *   info {string|dom} 内容
 *   ok {fn} 点击确认时的回调函数
 *   okText {string} 确认按钮文字
 *   no {fn} 点击取消时的回调函数
 *   noText {string} 取消按钮文字
 *   buttons {array} 自定义按钮：[{text: 'text', callback: fn}, ...]
 *   closeBtn {boolean} 是否显示关闭按钮
 *   lockScroll {boolean} 是否锁定滚动
 *   baseClass {string} 给对话框容器增加 class，不会覆盖默认的 class
 *   background {string} 遮罩背景的颜色
 *   width {int} 提示框固定宽度
 *   height {int} 提示框固定高度
 *   zIndex {int} 提示框的层级
 *
 * @param {function} ok 点击确认时的回调函数
 * @param {function} no 点击取消时的回调函数
 */
pm.addCss("./lib/css/dialog.css");
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(window.jQuery||window.Zepto||window.$)}(function(a){var b,c;("function"==typeof Zepto||"object"==typeof Zepto)&&(b=function(a,b){return function(c){var d,e,f;return this?(f=this,e=f[a](),d={width:["left","right"],height:["top","bottom"]},d[a].forEach(function(a){f.css("box-sizing")&&"content-box"!==f.css("box-sizing")||(e+=parseInt(f.css("padding-"+a),10),b&&(e+=parseInt(f.css("border-"+a+"-width"),10))),c&&(e+=parseInt(f.css("margin-"+a),10))}),e):null}},["width","height"].forEach(function(a){var c=a.substr(0,1).toUpperCase()+a.substr(1);"undefined"==typeof Zepto.fn["inner"+c]&&(Zepto.fn["inner"+c]=b(a,!1)),"undefined"==typeof Zepto.fn["outer"+c]&&(Zepto.fn["outer"+c]=b(a,!0))})),c={dom:{},isElement:function(a){return a&&("function"==typeof HTMLElement||"object"==typeof HTMLElement)&&a instanceof HTMLElement?!0:a&&a.nodeType&&1===a.nodeType?!0:!1},isJquery:function(a){return a&&a.length&&("function"==typeof jQuery||"object"==typeof jQuery)&&a instanceof jQuery?!0:!1},isZepto:function(a){return a&&a.length&&("function"==typeof Zepto||"object"==typeof Zepto)&&Zepto.zepto.isZ(a)?!0:!1}},c.init=function(){var e=this;e.dom.docHtml=a("html"),e.dom.box=a("<div></div>",{id:"cxdialog","class":"cxdialog"}),e.dom.overlay=a("<div></div>",{id:"cxdialog_overlay","class":"cxdialog_overlay"}),e.dom.holder=a("<div></div>",{id:"cxdialog_holder","class":"cxdialog_holder"}),e.dom.title=a("<div></div>",{"class":"cxdialog_title"}),e.dom.info=a("<div></div>",{"class":"cxdialog_info"}),e.dom.btns=a("<div></div>",{"class":"cxdialog_btns"}),e.dom.closeBtn=a("<a></a>",{rel:"cxdialog",rev:"close"}),a(document).ready(function(){e.dom.box.appendTo("body").after(e.dom.overlay)}),e.isIE6=!!window.ActiveXObject&&!window.XMLHttpRequest,e.dom.box.on("click","a",function(){var c,d,f,a=this.rel,b=this.rev;if("cxdialog"===a){if("close"===b)e.exit();else for(d=0,f=e.btnCache.length;f>d;d++)if(e.btnCache[d].name===b&&"function"==typeof e.btnCache[d].callback){c=e.btnCache[d].callback();break}return c!==!1&&e.exit(),!1}})},c.format=function(b,c,d){var e=this;if(e.exit(),"string"!=typeof b||b.length){if("string"==typeof b||e.isElement(b)||e.isJquery(b)||e.isZepto(b))b={info:b};else if("object"!=typeof b)return;"function"==typeof c&&(b.ok=c),"function"==typeof d&&(b.no=d),b=a.extend({},a.cxDialog.defaults,b),e.dom.box.attr("class","cxdialog"),e.setContent(b),e.show(b)}},c.setContent=function(b){var e,f,g,h,i,c=this,d=(new Date).getTime();for(c.dom.box.empty(),"string"==typeof b.title&&b.title.length&&c.dom.title.html(b.title).appendTo(c.dom.box),c.infoCache=void 0,"string"==typeof b.info&&b.info.length?c.dom.info.html(b.info).appendTo(c.dom.box):c.isElement(b.info)||c.isJquery(b.info)||c.isZepto(b.info)?(e=c.isElement(b.info)?a(b.info):b.info,c.infoCache={dom:e},f=e.attr("style"),"string"==typeof f&&f.length&&(c.infoCache.styleText=f),c.dom.holder.css({"float":e.css("float"),display:e.css("display"),visibility:e.css("visibility"),position:e.css("position"),width:e.outerWidth(),height:e.outerHeight()}).insertAfter(e),e.css("display","block").appendTo(c.dom.box)):(b.info=String(b.info),c.dom.info.html(b.info).appendTo(c.dom.box)),c.btnCache=[],"function"==typeof b.ok&&c.btnCache.push({name:"btn_ok",className:"btn_ok",text:b.okText,callback:b.ok}),"function"==typeof b.no&&c.btnCache.push({name:"btn_no",className:"btn_no",text:b.noText,callback:b.no}),g=0,h=b.buttons.length;h>g;g++)c.btnCache.push({name:"btn_"+d+"_"+g,className:"btn_"+g,text:b.buttons[g].text,callback:b.buttons[g].callback});if(c.btnCache.length){for(i="",g=0,h=c.btnCache.length;h>g;g++)i+='<a class="'+c.btnCache[g].className+'" rel="cxdialog" rev="'+c.btnCache[g].name+'">'+c.btnCache[g].text+"</a>";c.dom.btns.html(i).appendTo(c.dom.box)}b.closeBtn&&c.dom.closeBtn.appendTo(c.dom.box)},c.show=function(a){var c,b=this;a.lockScroll===!0&&b.dom.docHtml.addClass("cxdialog_lock"),"string"==typeof a.background?b.dom.overlay.css("background",a.background):b.dom.overlay.css("display","none"),"string"==typeof a.baseClass&&a.baseClass.length&&b.dom.box.addClass(a.baseClass),c={},b.isIE6&&(c.top=document.documentElement.scrollTop+window.screen.availHeight/4),a.width>0?(c.width=a.width,c.marginLeft=-(a.width/2)):c.marginLeft=-(b.dom.box.outerWidth()/2),a.height>0?(c.height=a.height,c.marginTop=-(a.height/2)):c.marginTop=-(b.dom.box.outerHeight()/2),a.zIndex>0&&(c.zIndex=a.zIndex),b.dom.box.css(c).addClass("in")},c.backDom=function(){var a=this;a.infoCache&&(a.isJquery(a.infoCache.dom)||a.isZepto(a.infoCache.dom))&&("string"==typeof a.infoCache.styleText&&a.infoCache.styleText.length?a.infoCache.dom.attr("style",a.infoCache.styleText):a.infoCache.dom.removeAttr("style"),a.infoCache.dom.insertAfter(a.dom.holder),a.dom.holder.remove()),a.infoCache=void 0},c.exit=function(){var b=this;b.backDom(),b.btnCache=void 0,b.dom.box.removeClass("in").addClass("out"),"string"!=typeof a.cxDialog.defaults.background&&b.dom.overlay.css("display",""),b.dom.docHtml.removeClass("cxdialog_lock")},a.cxDialog=function(){c.format.apply(c,arguments)},a.cxDialog.close=function(){c.exit.apply(c)},a.cxDialog.defaults={title:"",info:"",ok:null,okText:"确 定",no:null,noText:"取 消",buttons:[],closeBtn:!0,lockScroll:!1,baseClass:"",background:"",width:0,height:0},c.init()});
};
pm.lazyloadImg = function(ele){
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://code.ciaoca.com/jquery/lazyload/
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.7.2
	将真实图片地址写在 data-original 属性中，而 src 属性中的图片换成占位符的图片（例如 1x1 像素的灰色图片或者 loading 的 gif 图片）
	添加 class="lazy" 用于区别哪些图片需要延时加载，当然你也可以换成别的关键词，修改的同时记得修改调用时的 jQuery 选择器
	添加 width 和 height 属性有助于在图片未加载时占满所需要的空间
	<img class="lazy" src="./img/grey.gif" data-original="example.jpg" width="640" heigh="480">
 */
(function(a,b){$window=a(b),a.fn.lazyload=function(c){function f(){var b=0;d.each(function(){var c=a(this);if(e.skip_invisible&&!c.is(":visible"))return;if(!a.abovethetop(this,e)&&!a.leftofbegin(this,e))if(!a.belowthefold(this,e)&&!a.rightoffold(this,e))c.trigger("appear");else if(++b>e.failure_limit)return!1})}var d=this,e={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return c&&(undefined!==c.failurelimit&&(c.failure_limit=c.failurelimit,delete c.failurelimit),undefined!==c.effectspeed&&(c.effect_speed=c.effectspeed,delete c.effectspeed),a.extend(e,c)),$container=e.container===undefined||e.container===b?$window:a(e.container),0===e.event.indexOf("scroll")&&$container.bind(e.event,function(a){return f()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(e.appear){var f=d.length;e.appear.call(b,f,e)}a("<img />").bind("load",function(){c.hide().attr("src",c.data(e.data_attribute))[e.effect](e.effect_speed),b.loaded=!0;var f=a.grep(d,function(a){return!a.loaded});d=a(f);if(e.load){var g=d.length;e.load.call(b,g,e)}}).attr("src",c.data(e.data_attribute))}}),0!==e.event.indexOf("scroll")&&c.bind(e.event,function(a){b.loaded||c.trigger("appear")})}),$window.bind("resize",function(a){f()}),f(),this},a.belowthefold=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.height()+$window.scrollTop():e=$container.offset().top+$container.height(),e<=a(c).offset().top-d.threshold},a.rightoffold=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.width()+$window.scrollLeft():e=$container.offset().left+$container.width(),e<=a(c).offset().left-d.threshold},a.abovethetop=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.scrollTop():e=$container.offset().top,e>=a(c).offset().top+d.threshold+a(c).height()},a.leftofbegin=function(c,d){var e;return d.container===undefined||d.container===b?e=$window.scrollLeft():e=$container.offset().left,e>=a(c).offset().left+d.threshold+a(c).width()},a.inviewport=function(b,c){return!a.rightofscreen(b,c)&&!a.leftofscreen(b,c)&&!a.belowthefold(b,c)&&!a.abovethetop(b,c)},a.extend(a.expr[":"],{"below-the-fold":function(c){return a.belowthefold(c,{threshold:0,container:b})},"above-the-top":function(c){return!a.belowthefold(c,{threshold:0,container:b})},"right-of-screen":function(c){return a.rightoffold(c,{threshold:0,container:b})},"left-of-screen":function(c){return!a.rightoffold(c,{threshold:0,container:b})},"in-viewport":function(c){return!a.inviewport(c,{threshold:0,container:b})},"above-the-fold":function(c){return!a.belowthefold(c,{threshold:0,container:b})},"right-of-fold":function(c){return a.rightoffold(c,{threshold:0,container:b})},"left-of-fold":function(c){return!a.rightoffold(c,{threshold:0,container:b})}})})(jQuery,window);
$(ele).lazyload();
}


