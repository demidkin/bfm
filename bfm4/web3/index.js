var http = require("http");
var fs = require("fs");
 
http.createServer(function(request, response){
     
    console.log(`Request URL: ${request.url}`);
    if(request.url.startsWith("/")){
        var filePath = __dirname + '\\' + request.url.substr(1);
        console.log(filePath);
        fs.readFile(filePath, function(error, data){
                 
            if(error){
                console.log(error);   
                response.statusCode = 404;
                response.end("Error 404");
            }   
            else{
                response.end(data);
            }
            return;
        })
    }
    else{
        // во всех остальных случаях отправляем строку hello world!
        response.end("Hello World!");
    }
}).listen(3000);