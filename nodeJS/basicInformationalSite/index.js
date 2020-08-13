const http = require('http');
const fileSystem = require('fs');
const url = require('url');

const availablePages = [
    "/about.html",
    "/contact-me.html"
];

// create server
let nodeServer = http.createServer(function(request, response) {
    var parsedURL = url.parse(request.url, true);
    if (parsedURL.pathname === "/") {
        var fileToServe = "./html/index.html";
    } else if (!availablePages.includes(parsedURL.pathname + ".html")) { // requested page doesn't exist
        var fileToServe = "./html/404.html";
    } else {
        var fileToServe = "./html/" + parsedURL.pathname + ".html";
    }

    fileSystem.readFile(fileToServe, function(error, data) {
        if (error) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        }
    });
});

nodeServer.listen(8080);