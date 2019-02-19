define(['jquery', 'carouFredSel', 'lazyload', 'easing', 'sly'],function($) {
	return {
		use: function() {
			this.clipText();
			this.thumbnail();
			this.scrollMenu();
			this.scroll();
			this.banner();
		},
		clipText: function() {

			/** 将超出的文本隐藏，并替换为'...'
			 *  注：容器高度最好设置为行高的整数倍
			 *  示例：<div class="u-clipText">此处为测试文本</div>
			 */
			$('.u-clipText').each(function() {
				var _txt = $(this).text();
				$(this).empty().append('<div class="clipTextNode"></div>');
				var $textWrap = $(this).children('.clipTextNode');
				$textWrap.text(_txt);
				var _h = $(this).height(),
					_textH = $textWrap.height();
				if(_h < _textH) {
					var _len = _txt.length;
					$textWrap.text(_txt.substr(0, _len*(_h/_textH)-3) + '...');
				}
			});

		},
		thumbnail: function() {

			/** 缩略图
			 *  示例：<div class="u-pic"><img src="images/test.jpg" /></div>
			 */
			$('.u-pic').each(function() {
				var $pic = $(this).children('img'),
					_src = $pic.attr('src');
				$pic.css('display','none');
				$(this).append('<div class="picNode" style="width:100%;height:100%;background:url('+_src+') no-repeat center center;background-size:cover;"></div>');
			});
			/** 懒加载的缩略图
			 *  示例：<div class="u-lazyloadPic"><img data-original="images/test.jpg" /></div>
			 */
			$('.u-lazyloadPic').each(function() {
				var _this = $(this);
				var $pic = $(this).find('img');
				$pic.lazyload({
					placeholder: 'images/icon/loading.gif',
					skip_invisible: false,
					effect: 'fadeIn',
					load: function() {
						var _src = $pic.attr('data-original');
						$pic.css('display','none');
						_this.append('<div class="picNode" style="width:100%;height:100%;background:url('+_src+') no-repeat center center;background-size:cover;"></div>');
					}
				});
			});

		},
		scrollMenu: function() {

			/** 滚动菜单
			 *	示例：<div class="u-scrollMenu"><div class="prev"></div><div class="next"></div><ul class="clear"><li></li></ul></div>
			 */
			$(".u-scrollMenu").each(function() {
				var $prev = $(this).find('.prev');
				var $next = $(this).find('.next');
				var $ul = $(this).find('ul');
				$ul.carouFredSel({
					direction :	"left",
					width:'100%',
					prev: $prev,
					next: $next,
					auto:{
						play:true,
						pauseOnHover:true,
						timeoutDuration:3000
					},
					scroll: 1
				});
			});

		},
		scroll: function() {

			/** 自定义滚动条
			 *  示例：<div class="u-scroll"></div>
			 */	
			$(".u-scroll").each(function() {
				var _str1 = "<div class='scrollbar'>"+
							    "<div class='handle'>"+
								    "<div class='mousearea'></div>"+
								"</div>"+
						   	"</div>";
				var _str2 = "<div class='frame-detail'>"+
						       	"<div></div>"+
						   	"</div>";
				var _this = $(this);
				$(this).wrapInner(_str2);
				$(this).prepend(_str1);
				$(this).find(".frame-detail").sly({
					speed: 300,
					easing: 'easeOutExpo',
					scrollBar: _this.find('.scrollbar'),
					scrollBy: 30,
					dragHandle: 1,
					dynamicHandle: 1,
					clickBar: 1
				});
			});

		},
		banner: function() {

			/** 轮播图
			 *  示例：<div class="u-banner"><div class="roll"><ul class="clear"><li></li></ul><div class="pag"></div></div></div>
			 */
			$(".u-banner").each(function() {
				var $bannerUl = $(this).find('.roll ul');
				$bannerUl.carouFredSel({
					responsive: true,
					direction :	"left",
					width:'100%',
					auto:{
						play:true,
						pauseOnHover:true,
						timeoutDuration:4500
					},
					scroll: {
						duration: 450,
						fx: 'uncover-fade'
					},
					items: {
						visible: {
							max: 1
						}
					},
					pagination: { container: '.u-banner .pag' }
				});	
			});

		},
		mouseScroll: function(jNode,callback) {

			/** 鼠标滚动到指定位置执行回调
			 */
			var $window = $(window),
				$document = $(document),
				_windowH = $window.height(),
				_bottomH = $document.height() - _windowH,			//到文档底部时，鼠标需要滚动的高度
				_offsetH = jNode.offset().top,						//指定节点距离文档的高度
				_viewH = _offsetH - _windowH * .7;					//视图高度
			
			_viewH = (_viewH > _bottomH) ? _bottomH : _viewH;
			if(_windowH >= _offsetH) {
				callback();
			}else {
				var _mark = true;
				$window.scroll(function() {
					if(_mark == true && $window.scrollTop() >= _viewH) {
						callback();
						_mark = false;
					}
				});
			}
			
		},
		randomNum: function(min,max) {
			var Range = max - min;
			var Rand = Math.random();  
			var time = min + Math.round(Rand * Range);
			return time;
		}
	}
});