/// <reference path="typings/globals/index.d.ts" />
var $ = require('jquery');

$(document).ready(function () {
    var main = require('electron').remote.require('./main.js');
    var chatForm = $('#chat_form');
    var text = $('#text');
    var logList = $('#chatLogList');
    $('#url').val('http://localhost:1337');

    $('#text').keypress(function (e) {
        if (e.which == '13') {
            var url = $('#url').val();
            var text = $('#text').val();
            $('#text').val('');
            $('#chatLogList').append('<li bclass="list-group-item left">' + text + '</li>');

            var postData = {
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
            };

            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    "X-Line-Signature": "SampleSignature",
                    'Content-Type': 'application/json'
                },
                data:JSON.stringify(postData),
                json:true,
                success:function(res){
                    var body = res.json;
                    console.log(body);
                    var text = body.messages[0].text;

                    // add style?
                    $('#chatLogList').append('<li class="list-group-item right">' + text + '</li>');
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    var errStr = XMLHttpRequest.responseText;
                    errStr = errStr.replace('\n','<br />');
                    // add diff style?
                    $('#chatLogList').append('<li class="list-group-item right red">エラーが発生しました</li>');
                    $('#chatLogList').append('<li class="list-group-item right red">' + errStr + '</li>');
                }
            });
            
        }

    });
});
