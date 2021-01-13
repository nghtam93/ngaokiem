var WIDTH2;
var HEIGHT2;
var canvas2;
var con2;
var g;
var pxs2 = new Array();
var rint2 = 50;

$(document).ready(function(){
  WIDTH2 = window.innerWidth;
  HEIGHT2 = window.innerHeight;
	$('.container2').width(WIDTH2).height(HEIGHT2);
	canvas2 = document.getElementById('pixie2');
	$(canvas2).attr('width', WIDTH2).attr('height',HEIGHT2);
	con2 = canvas2.getContext('2d');
	for(var i = 0; i < 50; i++) {
		pxs2[i] = new Circle2();
		pxs2[i].reset();
	}
	setInterval(draw2,rint2);

});

function draw2() {
	con2.clearRect(0,0,WIDTH2,HEIGHT2);
	for(var i = 0; i < pxs2.length; i++) {
		pxs2[i].fade();
		pxs2[i].move();
		pxs2[i].draw2();
	}
}

function Circle2() {
	this.s = {ttl:8000, xmax:5, ymax:20, rmax:20, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

	this.reset = function() {
		this.x = (this.s.random ? WIDTH2*Math.random() : this.s.xdef);
		this.y = (this.s.random ? HEIGHT2*Math.random() : this.s.ydef);
		this.r = ((this.s.rmax-1)*Math.random()) + 1;
		this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
		this.hl = (this.s.ttl/rint2)*(this.r/this.s.rmax);
		this.rt = Math.random()*this.hl;
		this.s.rt = Math.random()+1;
		this.stop = Math.random()*.2+.4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
	}

	this.fade = function() {
		this.rt += this.s.rt;
	}

	this.draw2 = function() {
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.hl) this.reset();
		var newo = 1-(this.rt/this.hl);
		con2.beginPath();
		con2.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		con2.closePath();
		var cr = this.r*newo;
		g = con2.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
		g.addColorStop(0.0, 'rgba(238,180,28,'+newo+')');
		g.addColorStop(this.stop, 'rgba(238,180,28,'+(newo*.2)+')');
		g.addColorStop(1.0, 'rgba(238,180,28,0)');
		con2.fillStyle = g;
		con2.fill();
	}

	this.move = function() {
		this.x += (this.rt/this.hl)*this.dx;
		this.y += (this.rt/this.hl)*this.dy;
		if(this.x > WIDTH2 || this.x < 0) this.dx *= -1;
		if(this.y > HEIGHT2 || this.y < 0) this.dy *= -1;
	}

	this.getX = function() { return this.x; }
	this.getY = function() { return this.y; }
}
