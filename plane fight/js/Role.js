// 地图内所有角色对象的父类
class Role{
	constructor({width, height, img, x, y}){
		this.width = width;
		this.height = height;
		this.img = img;
		this.element = null
		this.x = x;
		this.y = y;
	}
	init(){
		this.element = document.createElement("img");
		this.element.src = this.img;
		css(this.element, {
			width: this.width + "px",
			height: this.height + "px",
			position: "absolute",
			top: this.y + "px",
			left: this.x + "px"
		})
		Map.addRole(this.element);
	}
}