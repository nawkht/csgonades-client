import next from "next";
import express from "express";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/map/:name", (req, res) => {
      app.render(req, res, "/map", req.params);
    });

    server.get("/nade/:id", (req, res) => {
      app.render(req, res, "/nade", req.params);
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
