export async function dataLoader () {
	try {
		const config = await window.__TAURI__.invoke("data_loader");

		console.log(config);

		return config;
	} catch (error) {
		console.error("配置加载失败: ", error);
		return null;
	}
}

