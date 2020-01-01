import next from "next";
import express from "express";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
var sslRedirect = require("heroku-ssl-redirect");

app
  .prepare()
  .then(() => {
    const server = express();

    if (!dev) {
      server.use(sslRedirect);
    }

    server.get("/maps/:name", (req, res) => {
      app.render(req, res, "/maps", req.params);
    });

    server.get("/nades/:id", (req, res) => {
      app.render(req, res, "/nades", req.params);
    });

    server.get("/users/:id", (req, res) => {
      app.render(req, res, "/users", req.params);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err: any) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
