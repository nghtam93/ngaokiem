var WIDTH3;
var HEIGHT3;
var canvas3;
var con3;
var g;
var pxs3 = new Array();
var rint3 = 50;

$(document).ready(function(){
  WIDTH3 = window.innerWidth;
  HEIGHT3 = window.innerHeight;
	$('.container3').width(WIDTH3).height(HEIGHT3);
	canvas3 = document.getElementById('pixie3');
	$(canvas3).attr('width', WIDTH3).attr('height',HEIGHT3);
	con3 = canvas3.getContext('2d');
	for(var i = 0; i < 50; i++) {
		pxs3[i] = new Circle3();
		pxs3[i].reset();
	}
	setInterval(draw3,rint3);

});

function draw3() {
	con3.clearRect(0,0,WIDTH3,HEIGHT3);
	for(var i = 0; i < pxs3.length; i++) {
		pxs3[i].fade();
		pxs3[i].move();
		pxs3[i].draw3();
	}
}

function Circle3() {
	this.s = {ttl:8000, xmax:5, ymax:20, rmax:20, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

	this.reset = function() {
		this.x = (this.s.random ? WIDTH3*Math.random() : this.s.xdef);
		this.y = (this.s.random ? HEIGHT3*Math.random() : this.s.ydef);
		this.r = ((this.s.rmax-1)*Math.random()) + 1;
		this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
		this.hl = (this.s.ttl/rint3)*(this.r/this.s.rmax);
		this.rt = Math.random()*this.hl;
		this.s.rt = Math.random()+1;
		this.stop = Math.random()*.2+.4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
	}

	this.fade = function() {
		this.rt += this.s.rt;
	}

	this.draw3 = function() {
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.hl) this.reset();
		var newo = 1-(this.rt/this.hl);
		con3.beginPath();
		con3.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		con3.closePath();
		var cr = this.r*newo;
		g = con3.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
		g.addColorStop(0.0, 'rgba(238,180,28,'+newo+')');
		g.addColorStop(this.stop, 'rgba(238,180,28,'+(newo*.2)+')');
		g.addColorStop(1.0, 'rgba(238,180,28,0)');
		con3.fillStyle = g;
		con3.fill();
	}

	this.move = function() {
		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
		if(this.x > WIDTH3 || this.x < 0) this.dx *= -1;
		if(this.y > HEIGHT3 || this.y < 0) this.dy *= -1;
	}

	this.getX = function() { return this.x; }
	this.getY = function() { return this.y; }
}
