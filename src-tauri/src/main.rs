// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://v1.tauri.app/v1/guides/features/command

use serde_json::Value;

#[tauri::command]
fn data_loader() -> Result<serde_json::Value, String> {
    use std::fs;
    use serde_json;

    // 读取 config.json 文件
    let config_path = std::path::Path::new("config.json");

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
        .invoke_handler(tauri::generate_handler![data_loader]) // 注册命令
        .run(tauri::generate_context!())
        .expect("运行Tauri应用时出错");
}
