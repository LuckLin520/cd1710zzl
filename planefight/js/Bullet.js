// 创建Bullet类
class Bullet extends Role{
	constructor(){
		super({width: 6,
			height: 14,
			img: "images/bullet.png",
			x: Fighter.x + Fighter.width/2 - 6/2,
			y: Fighter.y - 14
		});
		this.speed = -5;
		this.isAlive = true;
	}
	move(){
		this.y += this.speed;
		css(this.element, {top: this.y + "px"});
		if(this.y < 0){
			Map.removeRole(this.element);
			this.isAlive = false;
		}
	};
}

// function Bullet(){
// 	this.width = 6;
// 	this.height = 14;
// 	this.img = "images/bullet.png";
// 	this.element = null;
// 	this.x = Fighter.x + Fighter.width/2 - this.width/2;
// 	this.y = Fighter.y - this.height;
// 	this.speed = -5;
// 	this.isAlive = true;
// }
// Bullet.prototype = {
// 	init: function(){
// 		this.element = document.createElement("img");
// 		this.element.src = this.img;
// 		css(this.element, {
// 			width: this.width + "px",
// 			height: this.height + "px",
// 			position: "absolute",
// 			top: this.y + "px",
// 			left: this.x + "px"
// 		})
// 		Map.addRole(this.element);
// 	},
// 	move: function(){
// 		this.y += this.speed;
// 		css(this.element, {top: this.y + "px"});
// 		if(this.y < 0){
// 			Map.removeRole(this.element);
// 			this.isAlive = false;
// 		}
// 	}
// }