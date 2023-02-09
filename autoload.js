// 测试，将所有链接集中到autoload.js文件中
const live2d_path = "https://cdn.jsdelivr.net/gh/jhy-ColdMoon/MyLive2d_3/";
// const live2d_path = "D://CYT/Desktop/Live2d/Live2D_Cubism/Liv2d_3_Demo/MyLive2d_3/";
// const live2d_path = "http://127.0.0.1:5500/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载各种资源
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "live2d/assets/waifu.css","css"),
        loadExternalResource("https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js", "js"),
		// Live2DCubismCore script
		loadExternalResource(live2d_path + "Core/live2dcubismcore.js", "js"),
		// Build script
		loadExternalResource(live2d_path + "dist/meidou_live2d.js", "js"),
		loadExternalResource(live2d_path + "live2d/assets/waifu-tips.js", "js"),
        
	]).then(() => {
		//必选参数
        //let remoteurl = "http://127.0.0.1:5501/"
        modulesPath = live2d_path + "live2d/models/";
        //modulesPath =remoteurl
        modelNames = ["Hiyori", "mia1", "rena"]; //注意，这里的名字是存放你模型文件的主目录的名字，目录中的moc3.json文件的名字一定要与目录同名
        //可选参数
        waifuTipsUrl = live2d_path + "live2d/assets/waifu-tips.json";

		initModel(modulesPath, modelNames, waifuTipsUrl);
	});
}
