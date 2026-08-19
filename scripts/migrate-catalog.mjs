// One-off migration script: extracts the real product catalog + images from the
// WordPress/WooCommerce HTML export in ../../VUKZ and writes:
//   - src/data/products.json
//   - public/images/products/*, public/images/landings/*, public/images/logo.*
// Safe to re-run; it overwrites its outputs each time.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const EXPORT_ROOT = join(PROJECT_ROOT, "..", "VUKZ");

const PRODUCTS_OUT_DIR = join(PROJECT_ROOT, "public", "images", "products");
const LANDINGS_OUT_DIR = join(PROJECT_ROOT, "public", "images", "landings");
const LOGO_OUT_DIR = join(PROJECT_ROOT, "public", "images");

mkdirSync(PRODUCTS_OUT_DIR, { recursive: true });
mkdirSync(LANDINGS_OUT_DIR, { recursive: true });

const subtypeByProductCat = {
  "product_cat-rueda-plana": "Plana",
  "product_cat-rueda-acanalada": "Acanalada",
  "product_cat-durawheel": "Durawheel",
  "product_cat-guias-niveladoras": "Guías niveladoras",
  "product_cat-rodamiento-superior": "Rodamiento superior",
};

// Each source category page -> target category/brand/subtype in the new taxonomy.
const categoryManifest = [
  { file: "Blacksmith – TECPORT.html", folder: "Blacksmith – TECPORT_files", categoryId: "blacksmith" },
  { file: "Cortinas – TECPORT.html", folder: "Cortinas – TECPORT_files", categoryId: "cortinas" },
  { file: "Operadores – TECPORT.html", folder: "Operadores – TECPORT_files", categoryId: "motores-portones", brandId: "liftmaster", subtype: "Cortina / Operadores" },
  { file: "LIFTMASTER – TECPORT.html", folder: "LIFTMASTER – TECPORT_files", categoryId: "motores-portones", brandId: "liftmaster", subtype: "Cadena" },
  { file: "Beninca – TECPORT.html", folder: "Beninca – TECPORT_files", categoryId: "motores-portones", brandId: "beninca", subtype: "Cremallera" },
  { file: "PPA – TECPORT.html", folder: "PPA – TECPORT_files", categoryId: "motores-portones", brandId: "ppa", subtype: "Cremallera" },
  { file: "BenincaPistonesAbatibles – TECPORT.html", folder: "BenincaPistonesAbatibles – TECPORT_files", categoryId: "pistones-abatibles", brandId: "beninca" },
  { file: "CAB – TECPORT.html", folder: "CAB – TECPORT_files", categoryId: "pistones-abatibles", brandId: "cab" },
  { file: "LIFTMASTERPistonesAbatibles – TECPORT.html", folder: "LIFTMASTERPistonesAbatibles – TECPORT_files", categoryId: "pistones-abatibles", brandId: "liftmaster" },
  { file: "PPAPistonesAbatibles – TECPORT.html", folder: "PPAPistonesAbatibles – TECPORT_files", categoryId: "pistones-abatibles", brandId: "ppa" },
  { file: "Ruedas y rodamientos – TECPORT.html", folder: "Ruedas y rodamientos – TECPORT_files", categoryId: "ruedas-rodamientos", subtypeFromClass: true },
  { file: "Ruedas y rodamientos – Página 2 – TECPORT.html", folder: "Ruedas y rodamientos – Página 2 – TECPORT_files", categoryId: "ruedas-rodamientos", subtypeFromClass: true },
  { file: "Pivotes y bisagras – TECPORT.html", folder: "Pivotes y bisagras – TECPORT_files", categoryId: "pivotes-bisagras" },
  { file: "Barreras Automáticas – TECPORT.html", folder: "Barreras Automáticas – TECPORT_files", categoryId: "barreras" },
  { file: "Cerca eléctrica – TECPORT.html", folder: "Cerca eléctrica – TECPORT_files", categoryId: "cerca-electrica" },
  { file: "Camaras 1080 – TECPORT.html", folder: "Camaras 1080 – TECPORT_files", categoryId: "cctv", subtype: "1080p" },
  { file: "Camaras 720 – TECPORT.html", folder: "Camaras 720 – TECPORT_files", categoryId: "cctv", subtype: "720p" },
  { file: "Camaras WI FI – TECPORT.html", folder: "Camaras WI FI – TECPORT_files", categoryId: "cctv", subtype: "WiFi" },
  { file: "BenincaControlesYBotoneras – TECPORT.html", folder: "BenincaControlesYBotoneras – TECPORT_files", categoryId: "controles-botoneras", brandId: "beninca" },
  { file: "LiftmasterControlesYBotoneras – TECPORT.html", folder: "LiftmasterControlesYBotoneras – TECPORT_files", categoryId: "controles-botoneras", brandId: "liftmaster" },
  { file: "BenincaRepuestosYAccesorios – TECPORT.html", folder: "BenincaRepuestosYAccesorios – TECPORT_files", categoryId: "repuestos-accesorios", brandId: "beninca" },
  { file: "LiftmasterRepuestosYAccesorios – TECPORT.html", folder: "LiftmasterRepuestosYAccesorios – TECPORT_files", categoryId: "repuestos-accesorios", brandId: "liftmaster" },
  { file: "Herrajes para seccionales – TECPORT.html", folder: "Herrajes para seccionales – TECPORT_files", categoryId: "herrajes-seccionales" },
  { file: "IntercomunicadoresProductos – TECPORT.html", folder: "IntercomunicadoresProductos – TECPORT_files", categoryId: "intercomunicadores" },
];

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractProducts(html, folder) {
  const lines = html.split("\n");
  const products = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('<li class="product ')) continue;

    const classMatch = line.match(/<li class="([^"]+)"/);
    const classes = classMatch ? classMatch[1] : "";

    // The product's link/image/title is on the same or next line.
    const block = line + (lines[i + 1] ?? "");

    const hrefMatch = block.match(/href="https:\/\/www\.tecportcr\.com\/producto\/([^/"]+)\//);
    const imgMatch = block.match(/src="\.\/[^/"]+\/([^"/]+\.(?:jpg|jpeg|png|webp))"/i);
    const nameMatch = block.match(/woocommerce-loop-product__title">([^<]+)</);

    if (!hrefMatch || !imgMatch || !nameMatch) continue;

    const slug = hrefMatch[1];
    const imageFile = decodeURIComponent(imgMatch[1]);
    const name = nameMatch[1].trim();

    let subtype;
    for (const [cls, label] of Object.entries(subtypeByProductCat)) {
      if (classes.includes(cls)) {
        subtype = label;
        break;
      }
    }

    products.push({ slug, imageFile, name, subtype, sourceFolder: folder });
  }

  return products;
}

const allProducts = [];
const seenSlugs = new Set();

for (const entry of categoryManifest) {
  const htmlPath = join(EXPORT_ROOT, entry.file);
  if (!existsSync(htmlPath)) {
    console.warn(`[skip] missing HTML: ${entry.file}`);
    continue;
  }
  const html = readFileSync(htmlPath, "utf-8");
  const parsed = extractProducts(html, entry.folder);

  for (const p of parsed) {
    if (seenSlugs.has(p.slug)) continue; // avoid dupes if a product appears twice
    seenSlugs.add(p.slug);

    const srcImagePath = join(EXPORT_ROOT, entry.folder, p.imageFile);
    let publicImagePath;
    if (existsSync(srcImagePath)) {
      const ext = extname(p.imageFile) || ".jpg";
      const destName = `${p.slug}${ext}`;
      copyFileSync(srcImagePath, join(PRODUCTS_OUT_DIR, destName));
      publicImagePath = `/images/products/${destName}`;
    } else {
      console.warn(`[missing image] ${entry.file} -> ${p.imageFile}`);
      publicImagePath = undefined;
    }

    allProducts.push({
      id: `p-${p.slug}`,
      sku: p.name,
      slug: p.slug,
      name: p.name,
      categoryId: entry.categoryId,
      ...(entry.brandId ? { brandId: entry.brandId } : {}),
      ...((entry.subtype || (entry.subtypeFromClass && p.subtype)) ? { subtype: entry.subtype ?? p.subtype } : {}),
      images: publicImagePath ? [publicImagePath] : [],
      status: "active",
    });
  }
}

writeFileSync(
  join(PROJECT_ROOT, "src", "data", "products.json"),
  JSON.stringify(allProducts, null, 2) + "\n",
);
console.log(`Wrote ${allProducts.length} products.`);

// --- Logo -----------------------------------------------------------------
const logoSrc = join(EXPORT_ROOT, "TECPORT_files", "Nuevo-Logo-Tecport.png");
if (existsSync(logoSrc)) {
  copyFileSync(logoSrc, join(LOGO_OUT_DIR, "logo.png"));
  console.log("Copied logo.");
}

// --- Home "Áreas de servicio" carousel thumbnails --------------------------
const thumbMap = {
  "automatizacion-residencial": "residencial_thum.jpg",
  "automatizacion-condominal": "condominal_thum.jpg",
  "portones-blacksmith": "blacksmith_thum.jpg",
  "barreras-automaticas": "barreras_thum.jpg",
  cctv: "cctv_thum.jpg",
  "cercas-electricas": "cercas_thum.jpg",
  "cortinas-arrollables": "arrollables_thum.jpg",
  "puertas-automaticas": "puertas_automaticas_thum.jpg",
};

mkdirSync(join(LANDINGS_OUT_DIR, "thumbs"), { recursive: true });
for (const [landingSlug, filename] of Object.entries(thumbMap)) {
  const src = join(EXPORT_ROOT, "TECPORT_files", filename);
  if (existsSync(src)) {
    const ext = extname(filename);
    copyFileSync(src, join(LANDINGS_OUT_DIR, "thumbs", `${landingSlug}${ext}`));
  }
}
console.log("Copied home carousel thumbnails.");

// --- Landing body/content images -------------------------------------------
const landingImages = {
  "automatizacion-residencial": { folder: "automatizacion_residencial – TECPORT_files", files: ["automatizacion-residencial-.jpg", "8550W-NEW-1000.jpg"] },
  "automatizacion-condominal": { folder: "automatizacion_condominal – TECPORT_files", files: ["AUTOMATIZACION-CONDOMINAL-.jpg"] },
  "control-de-acceso": { folder: "control_acceso – TECPORT_files", files: ["controlaccesoproximidad02.jpg"] },
  "puertas-automaticas": { folder: "puertas_automaticas – TECPORT_files", files: ["PUERTA-AUTOMATICAS.jpg", "PUERTA-AUTOMATICAS-152-1.jpg", "PUERTA-12546.jpg", "PUERTA-MY-ONE-.jpg"] },
  "portones-blacksmith": { folder: "portones_blacksmith – TECPORT_files", files: ["DSC_7113.jpg"] },
  intercomunicadores: { folder: "intercomunicadores – TECPORT_files", files: ["video-portero-marca-hikvision-cableado-D_NQ_NP_787124-MLU25614541554_052017-F.jpg"] },
  "barreras-automaticas": { folder: "barreras_automaticas – TECPORT_files", files: ["POrtada-barreras-automaticas-400.jpg", "G4000.jpg", "barrera-vehicular-lady-5-988x800-1.jpg"] },
  cctv: {
    folder: "cctv – TECPORT_files",
    files: [
      "cctv1.jpg",
      "Domo-1080P-ColorVu-2.8mm-.jpg",
      "CUBO-WIFI-300x300.jpg",
      "DS2CD2F22FWDIW-300x300.jpg",
      "DS2CE56C0TIRMF-300x300.jpg",
      "20190812213130458.png",
      "20190820171025924.png",
      "20190909173740261.png",
      "20190917130836535.png",
    ],
  },
  "cercas-electricas": { folder: "cercas_electricas – TECPORT_files", files: ["istockphoto-1039491206-612x612-1.jpg"] },
  "cortinas-arrollables": { folder: "cortinas_arrollables – TECPORT_files", files: ["arrollable.jpg"] },
};

const landingImagePaths = {};
for (const [landingSlug, { folder, files }] of Object.entries(landingImages)) {
  const outDir = join(LANDINGS_OUT_DIR, landingSlug);
  mkdirSync(outDir, { recursive: true });
  const publicPaths = [];
  for (const filename of files) {
    const src = join(EXPORT_ROOT, folder, filename);
    if (!existsSync(src)) {
      console.warn(`[missing landing image] ${folder} -> ${filename}`);
      continue;
    }
    const ext = extname(filename);
    const destName = slugify(filename.replace(ext, "")) + ext;
    copyFileSync(src, join(outDir, destName));
    publicPaths.push(`/images/landings/${landingSlug}/${destName}`);
  }
  landingImagePaths[landingSlug] = publicPaths;
}

writeFileSync(
  join(PROJECT_ROOT, "scripts", "landing-images.json"),
  JSON.stringify(landingImagePaths, null, 2) + "\n",
);
console.log("Copied landing content images. See scripts/landing-images.json for the mapping.");
