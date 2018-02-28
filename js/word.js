$.fn.extend({
	scoller:function(options){
		var defaultOptions={
			words:"..",
			speed:1,
			width:"50%",
			height:"40px",
			left:"25%",
			bottom:"15%"
		}
		options=$.extend(defaultOptions,options);
		$(this).css({
			"position":"absolute",
			"background-color":"black",
			"bottom":options.bottom,
			"left":options.left,
			"width":options.width,
			"height":options.height,
			"overflow":"hidden",
			"opacity":0.2,
			"filter":'alpha(opacity=20)',
			"z-index":1000,
			"white-space": "nowrap",
			"text-overflow":"ellipsis",
			"text-overflow": "ellipsis"
		});
		
		
		var p=$("<div>");
		p.css({
			"color":"#fff",
			"font-family":"SimSun",
			"height":"100%",
			"margin-top":0,
			"color":"orange",
			"line-height":"40px",
			"font-size":"20px",
			"font-weight":"bold",
			"font-style":"normal",
			"position":"absolute",
			"display":"inline",
			"letter-spacing":1
		});
		if(options.words.length=="" || options.words==".." ){
			$(this).hide();
		}
		var frameOffsetLeft=$(this).offset().left;
		var frameWidth=$(this).width();
		
		p.text(options.words);
		$(this).html(p);
		var textWidth=p.width();//字符的长度
		var textOffsetLeft=$(this).offset().left;
		p.css({right:(-textWidth+"px")});
		
		var i=frameWidth+textWidth;
		var instance=setInterval(function(){
			i-=options.speed;
			if(i<=-100){
				i=frameWidth+textWidth;
			}
			
			p.css({left:(-(textWidth-i)+"px")});
		},15);
		function rand(rMi, rMa){
				return ~~(rMi+Math.floor(Math.random()*(rMa-rMi+1)));
		}
		function randcolor(){
				return 'rgb('+rand(128,255)+','+rand(128,255)+','+rand(128,255)+')';
		}
		$(this).mouseenter(function(){
			clearInterval(instance);
			return false;
		});
		$(this).mouseleave(function(){
			instance=setInterval(function(){
				i-=options.speed;
				if(i==0){
					i=frameWidth+textWidth;
				}
				p.css({left:(-(textWidth-i)+"px")});
			},15);
			return false;
		});
	},
	music:function(options){
		var music=$(this);
		var audio=new Audio();
		var defaultOptions={
			music:"",
		}
		options=$.extend(defaultOptions,options);
		$(this).css({
			"position":"absolute",
			"background":"url('./image/music_on.png') no-repeat",
			"width":"50px",
			"height":"50px",
			 "right":"20px",
			 "top":"20px",
			 "z-index":1001,
			 "background-size":"100% 100%"
		});
		audio.src=options.music;
		audio.autoplay=true;
		audio.loop=true;
		$(audio).bind("play",function(){//尝试自动播放
			$(music).addClass("on");
		})
		$(this).click(function(){
			if(music.hasClass("on")){
				audio.pause();
				$(music).removeClass("on");
			}else{
				audio.play();
			    $(music).addClass("on");
			}
		});
	}
});