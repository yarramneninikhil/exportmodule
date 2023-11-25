const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      fs.writeFileSync("./message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

// module.exports=requestHandler;
// module.exports ={
//   handler:requestHandler,
//   someText:"hard coded text"
// } ;

module.exports.handler = requestHandler;
// exports.handler = requestHandler;
