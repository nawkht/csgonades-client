import express from "express";
import next from "next";
import { createSitemap } from "./createSiteMap";
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    if (!dev) {
      // Enforce SSL & HSTS in production
      server.use(function(req, res, next) {
        const proto = req.headers["x-forwarded-proto"];
        if (proto === "https") {
          res.set({
            "Strict-Transport-Security": "max-age=31557600", // one-year
          });
          return next();
        }
        res.redirect("https://" + req.headers.host + req.url);
      });
    }

    server.get("/sitemap.xml", async function(req, res) {
      res.header("Content-Type", "application/xml");
      const xmlFile = await createSitemap();
      // Send it to the browser
      res.send(xmlFile);
    });

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
      console.log(`> Ready on http://localhost:${port}"`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
