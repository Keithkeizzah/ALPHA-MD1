const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({ nomCom: "matrix",
    categorie: "Modern-Logo", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
    if (!arg || arg == "") {
        repondre("*__Exemple : * " + prefixe + "hacker Keith");
        return;
    }
    try {
        let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
        let anu = await mumaker.ephoto("https://en.ephoto360.com/create-matrix-movie-photo-effects-online-741.html", arg); //
        //
       // let res = Object.values(anu)[3];
        // console.log("&€"+res);
      //  let lien = "https://e1.yotools.net" + res;
        repondre("*processing...*");
        await zk.sendMessage(origineMessage, { image: { url:anu.image}, caption: "\t *Powered by Alpha Md*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
