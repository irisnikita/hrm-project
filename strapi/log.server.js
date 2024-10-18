const http = require("http");

http
  .createServer((req, res) => {
    const arr = [];
    req
      .on("data", (chunk) => arr.push(chunk))
      .on("end", () => {
        const msg = Buffer.concat(arr).toString();
        console.log("http msg", msg); // push log qua một hệ thông khác http://localhost:8080

        res.end("hello world");

        // res.end(msg);
      });
  })
  .listen(8080);
