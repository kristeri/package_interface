var http = require("http");
var fs = require("fs");
var path = require("path");
const PATH = 3000;

http
  .createServer(function(request, response) {
    var filePath = "." + request.url;
    if (filePath == "./") {
      filePath = "./index.html";
    }

    if (filePath == "./data") {
      // Split packages that are separated by one empty line
      var linesArray = fs.readFileSync("./status.real", "utf8").split("\n\n");
      var packages = [];
      for (var i = 0; i < linesArray.length; i++) {
        var packageObject = {};
        // Negative lookahead, split by \n but only if there is no whitespace after (descriptions use one space as indentation on multiline values)
        var packageProps = linesArray[i].split(/\n(?!\s)/);
        for (var j = 0; j < packageProps.length; j++) {
          if (packageProps[j].length > 0) {
            var keyvalue = packageProps[j].split(":");
            // Check that both values are defined
            if (keyvalue[0] && keyvalue[1]) {
              packageObject[keyvalue[0]] = keyvalue[1];
            }
          }
        }
        packages.push(packageObject);
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(packages));
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json"
    };

    var contentType = mimeTypes[extname];

    fs.readFile(filePath, function(error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          fs.readFile("./not_found.html", function(error, content) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          });
        } else {
          response.writeHead(500);
          response.end("Error: " + error.code + " ..\n");
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(PATH);
