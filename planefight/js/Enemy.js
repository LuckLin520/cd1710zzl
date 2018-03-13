// 工厂模式创建敌机
class Enemy extends Role{
	constructor({width, height, img, speed, hp, scores}){
		super({width, height, img});
		this.y = -this.height;
		this.x = randomNum(0, Map.width - this.width);
		this.hp = hp;
		this.speed = speed;
		this.scores = scores;
		this.isAlive = true;
	}
	move(){
		this.y += this.speed;
		css(this.element, {top: this.y + "px"});
		if(this.y > Map.height){
			Map.removeRole(this.element);
			this.isAlive = false;
		}
	}
}

var enemyFactory = {
	createEnemy: function(type){
		var obj;
		if(type === "small")
			obj = new Enemy({width: 34, height: 24, img: "images/small_fly.png", speed: 2, hp: 1, scores:5});
		if(type === "middle")
			obj = new Enemy({width: 46, height: 60, img: "images/mid_fly.png", speed: 1, hp: 6, scores:20});
		if(type === "big")
			obj = new Enemy({width: 110, height: 164, img: "images/big_fly.png", speed: 1, hp: 18, scores:50});
		obj.init();
		return obj;
	}
}

// function Enemy({width, height, img, speed, hp, scores}){//解构赋值
// 	this.width = width;
// 	this.height = height;
// 	this.img = img;
// 	this.speed = speed;
// 	this.hp = hp;
// 	this.scores = scores;
// 	this.element = null;
// 	this.x = randomNum(0, Map.width - this.width);
// 	this.y = -this.height;
// 	this.isAlive = true;
// }
// Enemy.prototype = new Bullet();//继承Bullet原型
// Enemy.prototype.move = function(){
// 	this.y += this.speed;
// 	css(this.element, {top: this.y + "px"});
// 	if(this.y > Map.height){
// 		Map.removeRole(this.element);
// 		this.isAlive = false;
// 	}
// }