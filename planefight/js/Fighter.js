// 饿汉单例模式继承Role构造函数创建战机
var Fighter = (function(){
	class Fighter extends Role{
		constructor(){
			super({width: 66,
					height: 80,
					img: "images/self.gif",
					x: 120,
					y: 350,
				 });
		}
	}
	return new Fighter();
})();

// var Fighter = {
// 	width: 66,
// 	height: 80,
// 	img: "images/self.gif",
// 	element: null,
// 	x: 120,
// 	y: 350,
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
// 	}
// }