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
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 740,
    webPreferences: { 'nodeIntegration': true } 
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});



// ipc.on('sendText', function (event, arg) {
//     console.log("sendText arg : " + arg);
//     // ここでsimを叩く ->sendで戻す
//     var result = sendServer();

//     event.sender.send('sendTextReply', result);
// });





function sendServer(text){

  electron.dialog.showMessageBox(mainWindow,{
    message: "Sending text to server."
  });

  var request = require('request');
  var options = {
    uri: "http://localhost:1337",
    headers: {
      "X-Line-Signature": "SampleSignature",
    },
    form: {
    "events": [
        {
          "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
          "type": "message",
          "timestamp": 1462629479859,
          "source": {
              "type": "user",
              "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
          },
          "message": {
              "id": "325708",
              "type": "text",
              "text": text
            }
        }
    ]
  },
  json:true
  };
  request.post(options, function(error, response, body){
      console.log("error = "+error);
      console.log("body = "+body);
      errorLog = error;
      bodyLog = body;
  });

  Logs = "Error : " + errorLog + ", Body : "+ bodyLog;
  return Logs;

}

exports.sendText = sendServer;