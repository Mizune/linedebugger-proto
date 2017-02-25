'use strict';

// アプリケーションをコントロールするモジュール
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;

var errorLog;
var bodyLog;
var Logs;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function () {
  // メイン画面の表示
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 740,
    webPreferences: { 'nodeIntegration': true }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
