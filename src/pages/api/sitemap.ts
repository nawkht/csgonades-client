import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const CsGoMaps = {
  dust2: "Dust2",
  mirage: "Mirage",
  nuke: "Nuke",
  inferno: "Inferno",
  cache: "Cache",
  overpass: "Overpass",
  vertigo: "Vertigo",
  train: "Train",
  cobblestone: "Cobblestone",
};

function mapsList() {
  const maps: string[] = [];
  for (const key in CsGoMaps) {
    maps.push(key);
  }
  return maps;
}

function createLastMode(date) {
  let modDate = date;
  if (typeof modDate === "string") {
    modDate = new Date(date);
  }

  const lastMod = `${modDate.getFullYear()}-${(
    "0" +
    (modDate.getMonth() + 1)
  ).slice(-2)}-${("0" + modDate.getDate()).slice(-2)}`;
  return lastMod;
}

const SITE_ROOT = "https://www.csgonades.com";
const API_SOURCE = "https://api.csgonades.com";

const createSitemap = async () => {
  const now = new Date();

  let xml = "";
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  xml += "<url>";
  xml += `<loc>${SITE_ROOT}</loc>`;
  xml += `<changefreq>always</changefreq>`;
  xml += `<priority>0.5</priority>`;
  xml += "</url>";

  const staticPages = ["about", "contact", "privacypolicy"];

  staticPages.forEach(staticPage => {
    const page = `${SITE_ROOT}/${staticPage}`;

    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<changefreq>monthly</changefreq>`;
    xml += `<priority>0.4</priority>`;
    xml += "</url>";
  });

  const maps = mapsList();

  maps.forEach(map => {
    const page = `${SITE_ROOT}/maps/${map}`;
    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<lastmod>${createLastMode(now)}</lastmod>`;
    xml += `<changefreq>always</changefreq>`;
    xml += `<priority>0.5</priority>`;
    xml += "</url>";
  });

  try {
    const result = await axios.get(`${API_SOURCE}/nades?limit=all`);
    const nades = result.data;

    for (const nade of nades) {
      xml += "<url><loc>";
      xml += `${SITE_ROOT}/nades/${nade.id}`;
      xml +=
        "</loc><changefreq>always</changefreq><priority>0.5</priority></url>";
      xml += `<lastmod>${createLastMode(nade.updatedAt)}</lastmod>`;
    }
  } catch (error) {
    console.error(error);
  }

  xml += "</urlset>";

  return xml;
};

const siteMap = async (_: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/xml");

  const sitemap = await createSitemap();

  res.send(sitemap);
};

export default siteMap;
