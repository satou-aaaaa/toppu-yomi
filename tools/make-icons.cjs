// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、細くなりながら下へのびる竜巻の渦。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <g fill="none" stroke-width="7" stroke-linecap="round"><path d="M18 24 h64" stroke="#f6d77a"/><path d="M26 40 h46" stroke="#fffdf7"/><path d="M34 56 h30" stroke="#fffdf7"/><path d="M42 72 h16" stroke="#7fc4ef"/><path d="M48 86 h4" stroke="#7fc4ef"/></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
