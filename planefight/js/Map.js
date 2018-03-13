// 懒汉式单例模式创建地图对象
var Map = (function(){
	class Map{
		constructor(){
			this.width = 320;
			this.height = 568;
			this.startImg = "images/start_bg.png";
			this.bgImg = "images/bg.png";
			this.startElement = null;
			this.gameElement = null;
			this.scoresElement = null;
		}
		init(){
			var container = document.createElement("div");
			css(container, {
				width: this.width + "px",
				height: this.height + "px",
				position: "relative",
				margin: "20px auto",
				overflow: "hidden"
			})
			this.gameElement = document.createElement("div");
			css(this.gameElement, {
				width: this.width + "px",
				height: this.height + "px",
				background: "url("+ this.bgImg +")",
				position: "absolute",
			})
			container.appendChild(this.gameElement);
			this.startElement = document.createElement("div");
			css(this.startElement, {
				width: this.width + "px",
				height: this.height + "px",
				background: "url("+ this.startImg +")",
				position: "absolute"
			})
			this.scoresElement = document.createElement("div");
			this.scoresElement.innerHTML = "分数：0";
			css(this.scoresElement, {
				width: "100px",
				height: "30px",
				border: "1px solid #ccc",
				position: "absolute"
			})
			container.appendChild(this.scoresElement);
			container.appendChild(this.startElement);
			$("body")[0].appendChild(container);
		}
		addRole(role){
			this.gameElement.appendChild(role);
		}
		removeRole(role){
			this.gameElement.removeChild(role);
		}
	}

	var mapInstance = null;
	return {
		getInstance : function(){
			if(mapInstance === null)
				return mapInstance = new Map();
		}
	}.getInstance();
	// return new Map();
})();


// var Map = {
// 	width: 320,
// 	height: 568,
// 	startImg: "images/start_bg.png",
// 	bgImg: "images/bg.png",
// 	startElement: null,
// 	gameElement: null,
// 	scoresElement: null,
// 	init: function(){
// 		var container = document.createElement("div");
// 		css(container, {
// 			width: this.width + "px",
// 			height: this.height + "px",
// 			position: "relative",
// 			margin: "20px auto",
// 			overflow: "hidden"
// 		})
// 		this.gameElement = document.createElement("div");
// 		css(this.gameElement, {
// 			width: this.width + "px",
// 			height: this.height + "px",
// 			background: "url("+ this.bgImg +")",
// 			position: "absolute",
// 		})
// 		container.appendChild(this.gameElement);
// 		this.startElement = document.createElement("div");
// 		css(this.startElement, {
// 			width: this.width + "px",
// 			height: this.height + "px",
// 			background: "url("+ this.startImg +")",
// 			position: "absolute"
// 		})
// 		this.scoresElement = document.createElement("div");
// 		this.scoresElement.innerHTML = "分数：0";
// 		css(this.scoresElement, {
// 			width: "100px",
// 			height: "30px",
// 			border: "1px solid #ccc",
// 			position: "absolute"
// 		})
// 		container.appendChild(this.scoresElement);
// 		container.appendChild(this.startElement);
// 		$("body")[0].appendChild(container);
// 	},
// 	addRole: function(role){
// 		this.gameElement.appendChild(role);
// 	},
// 	removeRole: function(role){
// 		this.gameElement.removeChild(role);
// 	}
// }