// 单例模式游戏平台
var Game = {
	bullets: [], enemies: [],
	startGame: function(){
		Map.init();//初始化地图
		this.addEvent();
	},
	play: function(){
		var count = 0;
		this.timer = setInterval(()=>{
			count++;
			this.create(count);
			this.move();
			var scores = Number(Map.scoresElement.innerHTML.slice(3));
			for(var i = this.enemies.length - 1; i >= 0; i--){//子弹碰撞、战机敌机碰撞后
				for(var j = this.bullets.length - 1; j >= 0; j--){
					if(this.collision(this.enemies[i], this.bullets[j]) && count % 10 === 0){
						Map.removeRole(this.bullets[j].element);
						this.bullets.splice(j, 1);
						this.enemies[i].hp--;
						if(this.enemies[i].hp <= 0){
							Map.scoresElement.innerHTML = "分数：" + (scores + this.enemies[i].scores);
							Map.removeRole(this.enemies[i].element);
							this.enemies.splice(i, 1);
							break;
						}
					}
					if(this.collision(this.enemies[i], Fighter)){
						var result = "游戏结束！\n" + scores + "分";
						clearInterval(this.timer);
						Map.gameElement.onmousemove = null;
						alert(result);
						location.reload();
						break;
					}
				}
			}
		},1000/60)
	},
	addEvent: function(){
		Map.startElement.onclick = function(){
			fadeOut(this, 500);//点击开始隐藏开始界面
			Fighter.init();//初始化自身战机
			Game.play();
		};
		Map.gameElement.onmousemove = function(e){
			e = e || event;
			var y = e.clientY - Fighter.element.offsetHeight/2,
				x = e.clientX - Fighter.element.offsetWidth/2;
			offset(Fighter.element, {
				top: y,
				left: x
			});
			Fighter.x = Fighter.element.offsetLeft;
			Fighter.y = Fighter.element.offsetTop;
		};
	},
	create: function(count){/*创建子弹和敌机并添加至数组保存*/
		if(count % 10 === 0){
			var bullet = new Bullet();
			this.bullets.push(bullet);
			bullet.init();
		}

		if(count % 50 === 0)
			this.enemies.push(enemyFactory.createEnemy("small"));
		if(count % 222 === 0)
			this.enemies.push(enemyFactory.createEnemy("middle"));
		if(count % 666 === 0)
			this.enemies.push(enemyFactory.createEnemy("big"));
	},
	move: function(){/*每个子弹与敌机的移动*/
		for(var i = this.bullets.length - 1; i >= 0; i--){
			this.bullets[i].move();
			if(!this.bullets[i].isAlive)
				this.bullets.splice(i, 1);
		}
		for(var i = this.enemies.length - 1; i >= 0; i--){
			this.enemies[i].move();
			if(!this.enemies[i].isAlive)
				this.enemies.splice(i, 1);
		}
	},
	collision: function(role1, role2){
		return !(role1.x > role2.x + role2.width
				|| role2.x > role1.x + role1.width
				|| role1.y > role2.y + role2.height
				|| role2.y > role1.y + role1.height);
	}
}