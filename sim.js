var request = require('request');
//http://garilinebot.azurewebsites.net
//http://localhost:1337
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
             "text": "Hello, world"
          }
      }
  ]
},
json:true
};
request.post(options, function(error, response, body){
    console.log("error = "+error);
    console.log("body = "+body);

});