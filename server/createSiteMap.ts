import axios from "axios";

const CsGoMaps = {
  dust2: "Dust2",
  mirage: "Mirage",
  nuke: "Nuke",
  inferno: "Inferno",
  cache: "Cache",
  overpass: "Overpass",
  vertigo: "Vertigo",
  train: "Train",
  cobblestone: "Cobblestone"
};

function mapsList() {
  let maps: string[] = [];
  for (let key in CsGoMaps) {
    maps.push(key);
  }
  return maps;
}

const SITE_ROOT = "https://www.csgonades.com";
const API_SOURCE = "https://api.csgonades.com";

const createSitemap = async () => {
  const now = new Date();
  let lastMod = `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(
    -2
  )}-${("0" + now.getDate()).slice(-2)}`;

  let xml = "";
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  xml += "<url>";
  xml += `<loc>${SITE_ROOT}</loc>`;
  xml += `<lastmod>${lastMod}</lastmod>`;
  xml += `<changefreq>always</changefreq>`;
  xml += `<priority>0.5</priority>`;
  xml += "</url>";

  const staticPages = ["about", "contact", "privacypolicy"];

  staticPages.forEach(staticPage => {
    const page = `${SITE_ROOT}/${staticPage}`;

    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<lastmod>${lastMod}</lastmod>`;
    xml += `<changefreq>always</changefreq>`;
    xml += `<priority>0.5</priority>`;
    xml += "</url>";
  });

  const maps = mapsList();

  maps.forEach(map => {
    const page = `${SITE_ROOT}/maps/${map}`;
    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<lastmod>${lastMod}</lastmod>`;
    xml += `<changefreq>always</changefreq>`;
    xml += `<priority>0.5</priority>`;
    xml += "</url>";
  });

  try {
    const result = await axios.get<any[]>(`${API_SOURCE}/nades?limit=all`);
    const nades = result.data;

    for (let nade of nades) {
      xml += "<url><loc>";
      xml += `${SITE_ROOT}/nades/${nade.id}`;
      xml +=
        "</loc><changefreq>always</changefreq><priority>0.5</priority></url>";
    }
  } catch (error) {
    console.error(error);
  }

  xml += "</urlset>";

  return xml;
};

export { createSitemap };
