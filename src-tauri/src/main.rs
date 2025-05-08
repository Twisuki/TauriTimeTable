// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://v1.tauri.app/v1/guides/features/command
#[tauri::command]
fn load_config() -> Result<serde_json::Value, String> {
    use std::fs;
    use serde_json;

    // 读取 config.json 文件
    let config_path = "config.json"; // 或使用绝对路径
    
    match fs::read_to_string(config_path) {
        Ok(contents) => {
            // 解析 JSON
            match serde_json::from_str(&contents) {
                Ok(config) => Ok(config),
                Err(e) => Err(format!("JSON 解析错误: {}", e)),
            }
        }
        Err(e) => Err(format!("文件读取错误: {}", e)),
    }
}

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("运行Tauri应用时出错");
}
