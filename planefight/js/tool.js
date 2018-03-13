/**11111
 * 生成验证码
 * @param length 可选参数，验证码长度（位数），不传递默认4位
 * @return 返回生成后的随机验证码字符串
 */
 function generateValidateCode(length){
 	if (typeof length === "undefined")
		length = 4;
	var arr = new String();
	for(var i = 0; i < length; i++){
		var randomA = Math.floor(Math.random()*(91-65)+65),
			randoma = Math.floor(Math.random()*(123-97)+97),
			number = String(Math.floor(Math.random()*10)),
			ABC = String.fromCharCode(String(randomA)),
			abc = String.fromCharCode(String(randoma));
		var	newArr = [abc,ABC,number];
		var	j = Math.floor(Math.random()*3);
		arr += newArr[j];
	}
	return arr;
}
// function generateValidateCode(length) {
// 	// 判断是否传递参数
// 	if (typeof length === "undefined")
// 		length = 4;
// 	// 定义变量保存生成后的验证码字符串
// 	var code = "";
// 	// 循环生成验证码
// 	while (code.length < length) {
// 		// 在字母数字编码范围内生成随机数
// 		var rand = Math.floor(random()*(123-48)+48);
// 		if (rand >= 48 && rand <= 57
// 			|| rand >= 65 && rand <= 90
// 			|| rand >= 97 && rand <= 122) {
// 			code += String.fromCharCode(rand)
// 		}
// 	}
// 	// 返回生成后的验证码字符串
// 	return code;
// }

/**22222
 * 解决数组indexOf方法的兼容问题，(数组中元素第一次出现的索引)
 * @param value 待查找元素
 * @param array 数组
 * @return 返回数组中待查找元素第一次出现的下标，不存在则返回-1
 */
function inArray(value,array) {
	if (Array.prototype.indexOf) // 浏览器支持使用数组的 indexOf() 方法
		return array.indexOf(value);
	/* 浏览器不支持使用数组的 indexOf() 方法 */
	for (var i = 0, len = array.length; i < len; i++) {
		if (value === array[i])
			return i;
	}
	return -1;
}

/**33333
 * 获取当前距离指定日期时间 天 时 分 秒 毫秒
 * @param toDate 日期时间对象
 * @return 返回当前日期距传入日期的 [天，时，分，秒，毫秒] 组成的长度为5的array
 */
function MSchange(ms){//毫秒转换日、时、分、秒、毫秒
	var day = Math.floor(ms / (24 * 60 * 60 * 1000));
	var houer = ("0" + Math.floor(ms % (24 * 60 * 60 * 1000) / (60 * 60 *1000))).slice(-2);
	var minute = ("0" + Math.floor(ms % (24 * 60 * 60 * 1000) % (60 * 60 *1000) / (60 * 1000))).slice(-2);
	var second = ("0" + Math.floor(ms % (24 * 60 * 60 * 1000) % (60 * 60 *1000) % (60 * 1000) / 1000)).slice(-2);
	var millisecond = ("00" + ms % (24 * 60 * 60 * 1000) % (60 * 60 *1000) % (60 * 1000) % 1000).slice(-3);
	return [day,houer,minute,second,millisecond];
};
function countDown(toDate){
	var toTime = Date.parse(toDate);
	var now = new Date();
	var short = toTime - now.getTime();
	return MSchange(short);
};

/**44444
 * 根据id、类名或标签名查找元素
 * @param selector 选择器(字符串)，如： #id / .className / tag
 * @param [context] 查找上下文DOM对象，可选，默认使用 document
 * @return 返回查找到的DOM元素或 HTMLCollection
 */
 function $(selector,context){
 	context = context || document;
 	if(selector.indexOf("#") === 0)
 		return document.getElementById(selector.slice(1));
 	if(selector.indexOf(".") === 0)
 		// return context.getElementsByClassName(selector.slice(1));
 		return getElementsByClassName(selector.slice(1),context);/*调用下面函数解决兼容*/
 	return context.getElementsByTagName(selector);
 }
/**55555
 * 解决document.getElementsByClassName()的IE8兼容问题
 * @param className 传入某元素的指定某个class名
 * @param [context] 查找上下文DOM对象，可选，默认使用 document
 * @return 返回查找到的符合条件的 HTMLCollection
 */
function getElementsByClassName(className,context){
	context = context || document;/*判断是否传入祖先对象*/
	if(context.getElementsByClassName)/*判断是否支持该方法*/
		return context.getElementsByClassName(className);
	var result = new Array();
	var allElement = context.getElementsByTagName("*");
	for(var i = 0, len = allElement.length; i < len; i++){
		var classArr = allElement[i].className.split(" ");
		for(var j = 0; j < classArr.length; j++){
			if(classArr[j] === className){
				result.push(allElement[i]);
				break;
			}	
		}
	}
	return result;
}

/**66666
 * 解决注册事件监听与移除监听IE8兼容问题
 * @param element 传入要被绑定事件监听的元素
 * @param type 传入监听类型源(不要加on)
 * @param callback 传入事件处理程序的函数
 */
 function on(element,type,callback){
 	if(element.addEventListener){
 		element.addEventListener(type,callback);
 	}else{
 		type = "on" + type;
 		element.attachEvent(type,callback);
 	}
 	
 }
 function off(element,type,callback){
 	if(element.removeEventListener){
 		element.removeEventListener(type,callback);
 	}else{
 		type = "on" + type;
 		element.detachEvent(type,callback);
 	}
 }

/**77777
 * 对元素CSS样式的获取与设置
 * @param obj 传入要获取或设置样式的元素
 * @param attr 传入要获取或设置的样式名，如需设置多个样式将属性值与属性名以对象形式传入
 * @param value 可选，传入要设置的属性值
 * @return 返回获取到的属性值（获取只能单个获取）
 */
 function css(obj,attr,value){
 	if(typeof attr === "object"){
 		for(var i in attr)
 			obj.style[i] = attr[i];
 	}else{
 		if(typeof value === "undefined")
	 		return window.getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
	 	obj.style[attr] = value;
 	}
 }	

/**88888
 * 获取与设置元素相对文档流的定位
 * @param element 传入要获取或设置定位的元素
 * @param coord 可选，要设置的定位声明，以对象形式传入
 * @return 返回获取到的left值、top值（无px单位）
 */
function offset(element,coord){
	if(typeof coord === "undefined"){
		var _top = 0, _left = 0; 
		while(element !== null){
			_top += element.offsetTop;
			_left += element.offsetLeft;
			element = element.offsetParent;
		}
		return {top : _top, left : _left};
	}
	var _top = 0, _left = 0, parent = element.offsetParent;
	while(parent !== null){
		_top += parent.offsetTop;
		_left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	_left = coord.left - _left;/*要设置的相对文档的定位距离相当于是用此距离减去其父元素在文档中的定位*/
	_top = coord.top - _top;
	css(element,{left : _left+"px", top : _top+"px"});
}

/**99999
 * 获取/保存cookie
 * @param key cookie名
 * @param value cookie值
 * @param options 可选配置参数 {expires:7, path:"/", domain:"", secure:true}
 */
function cookie(key, value, options) {
	/* writing */
	if (typeof value !== "undefined") {		
		options = options || {};
		// 连接cookie字符串
		var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		// 判断是否有失效时间
		if (options.expires) {
			var date = new Date();
			date.setDate(date.getDate() + options.expires);
			cookie += ";expires=" + date.toUTCString();
		}
		// 判断是否有路径
		if (options.path) 
			cookie += ";path=" + options.path;
		// 判断是否有域设置
		if (options.domain)
			cookie += ";domain=" + options.domain;
		// 判断是否安全链接
		if (options.secure)
			cookie += ";secure";
		// 保存 cookie
		document.cookie = cookie;
		return;
	}

	/* reading */
	// 将所有cookie的 "key=value" 结构分割出来保存到数组中
	var cookies = document.cookie.split("; ");
	// 遍历数组中每条cookie
	for (var i = 0, len = cookies.length; i < len; i++) {
		// 使用 = 号将 "key=value" 的结构分割
		var parts = cookies[i].split("=");
		// 获取当前遍历到 cookie 的名称
		var name = decodeURIComponent(parts.shift());
		// 比较是否和待查找的 key 一致
		if (name === key) {
			return decodeURIComponent(parts.join("="));
		}
	}
	return undefined;
}

/**10a10a10a
 * cookie删除
 * @param key cookie名
 * @param options 可选配置参数 {expires:7, path:"/", domain:"", secure:true}
 */
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}

/**11a11a11a
 * 将字符串中特殊字符转换为HTML特殊符号，如 将 < 转换为 &lt;     将 > 转换为 &gt;
 */
function encode(str) {
	return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**12a12a12a
 * 去掉指定字符串前后空白ES5的trim兼容解决
 */
function trim(str){
	if(String.prototype.trim)
		return str.trim();
	return str.replace(/^\s+|\s+$/g,"");
}

/**13a13a13a
 * 查找JSON数组对象中id属性是否拥有指定值，拥有就返回该对象在数据数组中的下标，没有则返回-1
 */
function exist(id,arr){
	for(var i = 0, len = arr.length; i < len; i++){
		if(id == arr[i].id)
			return i;
	}
	return -1;
}

/**14a14a14a
 * 事件委派+this指向改变（目的也就是简化每次都写e.target的兼容问题）
 * parentElement -- 祖先元素
 * child -- 后代元素类名(单个class名)
 * type -- 事件类型
 * callback -- 事件处理程序
 */
function delegate(parentElement, childSelector, type, callback) {
	parentElement.addEventListener(type, function(e){
		e = e || event;
		var src = e.target || e.srcElement;
		if (src.className === childSelector) {
			var newCb = callback.bind(src);/*将传入的callback改变this指向为src对象*/
			newCb(e);/*改变了this指向的函数，相当于该事件处理程序*/
		}
	})
}

/**15a15a15a
 * css运动函数
 * element -- 运动元素
 * options -- 运动属性目标值(对象) (如果过度颜色和定位，在css中必须初始一个值)
 * [duration] -- 运动持续时间(可选，默认"normal"1000ms，"fast"快速的、"slow"慢速度)
 * [easing] -- 运动曲线(可选，"linear"、"easeout",可参照Tween算法公式增改)
 * [callback] -- 回调函数(可选)
 */
function animate(element, options, duration, easing, callback){
	clearInterval(element.timer);
	var defaultDuration = {
		normal : 1000,
		fast : 700,
		slow : 1500
	};
	if(!duration)
		duration = 1000;
	if(typeof duration === "string")
		duration = defaultDuration[duration] ? defaultDuration[duration] : 1000;
	var begin = {}, range = {};
	for(var attr in options){
		if(/color/i.test(attr)){
			begin[attr] = {}, range[attr] = {};
			var beginArr = transitColor(css(element,attr));
			var valueArr = transitColor(options[attr]);
			for(var i = 0; i < 3; i++){
				begin[attr]["r"+i] = beginArr[i];
				range[attr]["r"+i] = valueArr[i] - begin[attr]["r"+i];
			}	
		}else{
			begin[attr] = parseFloat(css(element, attr));
			range[attr] = options[attr] - begin[attr];
		}
	}
	var date = Date.now();
	element.timer = setInterval(function(){
		var elapsed = Math.min(Date.now() - date, duration);/*已消耗时间与总时间取最小值以保证结果值没有误差*/
		for (var attr in options) {
			var t = elapsed, result;
			easing = easing || "linear";
			if(typeof easing === "function"){
				callback = easing;
				easing = "linear";
			}
			if(/color/i.test(attr)){
				var r0 = Number(t * range[attr]["r0"] / duration) + Number(begin[attr]["r0"]);
				var r1 = Number(t * range[attr]["r1"] / duration) + Number(begin[attr]["r1"]);
				var r2 = Number(t * range[attr]["r2"] / duration) + Number(begin[attr]["r2"]);
				result = "rgb("+Math.round(r0)+","+Math.round(r1)+","+Math.round(r2)+")"; 
			}else{
				if(easing === "linear")
					/*每执行一次timer要运动到的结果值 = 已消耗的时间 * 路程 / 总时间 + 初始值*/
					result = t * range[attr] / duration + begin[attr];
				if(easing === "easeout")
					// -c *(t/=d)*(t-2) + bt
					result = -range[attr] * (t /= duration) * (t - 2) + begin[attr];
			}
			css(element, attr, result + (attr === "opacity" || /color/i.test(attr) ? "" : "px"));
		}
		if (elapsed === duration){
			clearInterval(element.timer);
			callback && callback();
		}
	},1000/60)
}
/*animate()内的颜色值转换10进制数组*/
function transitColor(color){
	var isRgb = color.indexOf("rgb(") === 0 ? true : false;
	var isHex = color.indexOf("#") === 0 ? true : false;
	var arr = new Array();
	if(isHex){
		color = color.slice(1);
		if(color.length === 6){
			arr.push(color.slice(0, 2));
			arr.push(color.slice(2, 4));
			arr.push(color.slice(4));
		}else if(color.length === 3){
			arr.push(color.slice(0, 1) + color.slice(0, 1));
			arr.push(color.slice(1, 2) + color.slice(1, 2));
			arr.push(color.slice(2) + color.slice(2));
		}
		var each = [];
		arr.forEach(function(value, i){
			value = "0x" + value;
			each.push(parseInt(value))
		})
		arr = each;
	}else if(isRgb){
		color = color.slice(4, -1);
		arr = color.split(",");
	}
	return arr;
}

/**16a16a16a
 * 淡出淡入
 * element -- 元素
 * duration -- 淡出/淡入持续时间
 * [callback] -- 回调函数(可选)
 */
function fadeIn(element, duration, callback){
	element.style.opacity = "0";
	element.style.display = "block";
	animate(element, {opacity : 1}, duration, callback);
}
function fadeOut(element, duration, callback){
	animate(element, {opacity : 0}, duration,function(){
		element.style.display = "none";
		callback && callback();
	});
}

/**17a17a17a
 * 获取随机颜色值，随机数
 * randomNum(m, b) -- 获取 m~b 随机整数(可取m,b)
 * randomRgb() -- 获取随机 rgb 颜色值
 */
randomNum=(m, b) => Math.floor(Math.random() * (b - m + 1)+ m); 
randomRgb=() => "rgb("+randomNum(0, 255)+","+randomNum(0, 255)+","+randomNum(0, 255)+")"; 
function randomHex(){
	var hex = "#";
	for(var i = 0; i < 6; i ++){
		var re_09 = randomNum(0, 9),
			re_af = String.fromCharCode(randomNum(97, 102));
		var arr = [re_09, re_af];
		hex += arr[randomNum(0, 1)];
	}
	return hex;
}

/**18a18a18a
 * 抛物线定位运动(相对文档流)
 * element 运动元素
 * options 目标位置坐标
 * a 抛物线弧度 公式：y = a * x ^ 2 + b * x + c
 *		//a 的正负决定开口方向，a>0，开口向上，a < 0，开口向下
 *		//a 越大，开口越小
 * duration 运动持续时间
 */
function parabola(element, options, arc, duration){
	duration = duration || 800;
	var start = offset(element);
	var x = options.left - start.left,
		y = options.top - start.top;
	var a = arc, c = 0, b = (y - a * x * x) / x;
	var date = +new Date();
	var timer = setInterval(function(){
		var elapsed = Math.min(+new Date() - date, duration);
		var _x = elapsed * x / duration,
			_y = a * _x * _x + b * _x + c;
		offset(element, {left : _x + start.left, top : _y + start.top});
		if(elapsed === duration)
			clearInterval(timer);
	},1000/60)
}

/**19a19a19a
 * 查找数组中最小值
 * arr 要查找的数组
 * return 返回最小值的下标
 */
function arrayMinIndex(arr){
	var firstValue = arr[0], index = 0;
	for(var i = 1, len = arr.length; i < len; i++)
		if(firstValue > arr[i]){
			index = i;
			firstValue = arr[i];
		}	
	return index;
}
// function arrayMinIndex(arr){  
//     var MinValue = Math.min.apply(null,arr); 
//     for(var i = 0, len = arr.length; i < len; i++) 
//         if(MinValue === arr[i])  
//             return i;  
// }


/**20a20a20a
 * 瀑布流布局
 * container 容器元素
 */
function waterfall(container){
	var containerWidth = container.clientWidth,
		imgboxs = container.children,
		colWidth = imgboxs[0].offsetWidth,
		cols = Math.floor(containerWidth / colWidth),/*获取列数*/
		spacing = (containerWidth - cols * colWidth) / (cols + 1),/*间距*/
		height = new Array(cols);
	height.fill(0);/*数组元素全部初始化为0*/
		/*每列从左往右以此根据当前列之前的高度排列*/
	// for(let i = 0, len = imgboxs.length; i <len; i++){
	//	 	var currColIndex = i % cols;/*计算当前遍历到的元素所处第几列*/
	// 		imgboxs[i].style.left = spacing * (currColIndex + 1) + currColIndex * colWidth +"px";
	//	 	imgboxs[i].style.top = height[currColIndex] + 10 +"px";
	//	 	height[currColIndex] += imgboxs[i].offsetHeight + 10;/*累加当前每列高度*/
	// }
		/*按每列当中之前列最短列后面定位排列*/
	for(let i = 0, len = imgboxs.length; i <len; i++){
		var currColIndex = arrayMinIndex(height);
		imgboxs[i].style.left = spacing * (currColIndex + 1) + currColIndex * colWidth +"px";
		imgboxs[i].style.top = height[currColIndex] + 10 +"px";
		height[currColIndex] += imgboxs[i].offsetHeight + 10;
	}
	container.style.height = Math.max.apply(null, height) + 10 + "px";	

}

/**21a21a21a
 * ajax
 * options = {
 *		type : "GET|POST",  请求方式，默认为 "GET"
 *		url : "", 请求资源
 *		data : {username:"", password:""}, 向服务器提交的数据
 *		dataType : "json|text", 预期从服务器返回的数据格式
 *		success : function(responseData){}, 请求成功执行的函数
 *		error : function(msg){} 请求失败时执行的函数
 * }
 */
 function ajax(options){
 	options = options || {};
 	var url = options.url,
 		method = (options.type || "get").toUpperCase(),
 		queryString = null;
 	if(!url)
 		return;
	/* 如果有向服务器传递数据 */
	if (options.data) { // 有向服务器提交的数据，则构建查询字符串内容
		// {username:"", password:""} ==> "username=xx&password=xxx"
		queryString = [];
		for (var attr in options.data) {
			queryString.push(attr + "=" + options.data[attr]);
		}
		queryString = queryString.join("&");
	}
	// 如果是GET请求，同时有向服务器传递数据，则将查询字符串串联在URL后
	if (method === "GET" && queryString) {
		url += "?" + queryString;
		queryString = null;
	}

	// 创建对象
	var xhr = new XMLHttpRequest();
	// 打开
	xhr.open(method, url, true);
	// 如果是POST请求，要像表单一样提交数据，则
	if (method === "POST")
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	// 发送
	xhr.send(queryString);

	// 处理回调
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) { // 请求处理完毕
			if (xhr.status === 200) { // 请求成功  OK
				// 获取响应文本
				var data = xhr.responseText;
				// 判断是否预期返回JSON数据
				if (options.dataType === "json")
					data = JSON.parse(data);
				// 如果有成功执行的函数，则调用
				options.success && options.success(data);
			} else { // 请求失败
				options.error && options.error(xhr.statusText);
			}
		}
	}
 }