$(function(){
   var rand = function(rMi, rMa){
		return ~~(rMi+Math.floor(Math.random()*(rMa-rMi+1)));
   }
   var star = function (cxt){//定义星的对象  
    this.x = -1;  
    this.y = -1;  //表示横纵坐标  
    this.style = "";  
    this.r = -1;  
    this.scale = 1; //表示缩放倍数  
    this.angle = 0; //旋转的角度  
    this.angle1 = 0; //辅助参数  
	this.num=4;
    this.getPos = function (){//获取随机坐标  
        var xx = 300 + $("body").width() * Math.random();  
        var yy =10 + 200 * Math.random(); //获取了随机坐标  
        this.x = Math.ceil(xx); 
		this.y = Math.ceil(yy);  
    }  
    this.getAngle = function (){//得到随机的角度   
        this.angle = Math.random() * Math.PI;  
    }  
    this.getR = function (){//获取半径  
        var i =1 * Math.random();  
        this.r = Math.ceil(i); //获取随机半径  
    }  
    this.getColor = function (){  //获取随机颜色  
        var n = Math.random();  
        if (n < 0.5)  
            this.style = "#fff";  
        else  
            this.style = "#BCAAAA"; //灰白色
    }  
    this.drawPartStar = function (){//部分  
        cxt.save();  
        cxt.beginPath();  
        cxt.lineCap = "round"; 
		cxt.lineWidth = 1;  
        cxt.fillStyle = this.style;  
        cxt.translate(this.x, this.y); //位移  
        cxt.rotate(this.angle1);  
        //cxt.globalAlpha = this.alpha; //设置透明度  
        cxt.moveTo(0, 0);  
        var xx = 0 - this.r * Math.sin(36 / 180 * 3.14);  
        var yy = 0 - this.r * Math.cos(36 / 180 * 3.14);  
        cxt.lineTo(xx, yy);  
        xx = 0;  
        yy = 0 - this.r * Math.cos(36 / 180 * 3.14) - this.r * Math.sin(36 / 180 * 3.14) * Math.tan(72 / 180 * 3.14);  
        cxt.lineTo(xx, yy);  
        xx = this.r * Math.sin(36 / 180 * 3.14);  
        yy = 0 - this.r * Math.cos(36 / 180 * 3.14);  
        cxt.lineTo(xx, yy);  
        cxt.lineTo(0, 0);  
        cxt.closePath();  
        cxt.fill();  
        cxt.restore();  
    }  
    this.drawStar = function (){//绘制完整的花
        for (var i = 0; i <=this.num ; i++){  
            this.angle1 = i * (360/this.num) / 180 * 3.14 + this.angle;  
            this.drawPartStar();  
        }  
    }  
	
    this.init = function (){//初始化函数    
        this.getPos();  
        this.getR();  
        this.getColor();  
        this.getAngle();  
     }  
	}  	

   var canvas=document.createElement("canvas");
   canvas.width=$(window).innerWidth();
   canvas.height=$("body").innerHeight();
   $(canvas).appendTo($("body"));
   $(canvas).css({
		"z-index": "999", 
		"position": "absolute", 
		"display": "block", 
		"top": "0px",
		"left": "0px"
	});
   
   var ctx= canvas.getContext("2d");
   
   var starCount = 20; //星星的数目,默认是40   
	 var stars=[];
	 for (var m = 0; m < starCount; m++){//  
		var s = new star(ctx); 
		s.num=rand(5,5);
		s.init();
		stars[m] = s;  
	 }
	setInterval(function(){
		playStars();
	},800);
	function playStars(){  
       for (var n = 0; n < starCount; n++){  
			stars[n].getColor();  
			stars[n].drawStar();  
       }  
    }
   
});