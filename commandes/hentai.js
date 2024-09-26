const {
  zokou
} = require("../framework/zokou");
const axios = require('axios');
const cheerio = require("cheerio");
let hdb = require("../bdd/hentai");
zokou({
  nomCom: "hwaifu",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/waifu'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});


  /////////////// hneko //////////
zokou({
  nomCom: "trap",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/trap'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

zokou({
  nomCom: "hneko",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/neko'//apiWaifu("neko"); // Remplace avec ton lien réel

  try { for (let i = 0 ;i < 5 ; i++) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});
zokou({
  nomCom: "blowjob",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/blowjob'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});
zokou({
  'nomCom': "porn",
  'categorie': "Hentai",
  'reaction': '🙄',
  'desc': "send random hentai videos"
}, async (_0x31851d, _0x2edd04, _0x25a8b1) => {
  const {
    repondre: _0x559836,
    ms: _0x5bb474,
    verifGroupe: _0x44ceee,
    superUser: _0x115ef0
  } = _0x25a8b1;
  if (!_0x44ceee && !_0x115ef0) {
    _0x559836("This command is reserved for groups only.");
    return;
  }
  let _0x17866c = await hdb.checkFromHentaiList(_0x31851d);
  if (!_0x17866c && !_0x115ef0) {
    _0x559836("This group is not a group of perverts, calm down my friend.");
    return;
  }
  try {
    let _0x6d6d0f = await hentai();
    let _0x3f2f53;
    if (_0x6d6d0f.length > 0xa) {
      _0x3f2f53 = 0xa;
    } else {
      _0x3f2f53 = _0x6d6d0f.length;
    }
    let _0x285dae = Math.floor(Math.random() * _0x3f2f53);
    _0x2edd04.sendMessage(_0x31851d, {
      'video': {
        'url': _0x6d6d0f[_0x285dae].video_1
      },
      'caption': "*Title :* " + _0x6d6d0f[_0x285dae].title + " \n *Category :* " + _0x6d6d0f[_0x285dae].category
    }, {
      'quoted': _0x5bb474
    });
  } catch (_0x478c30) {
    console.log(_0x478c30);
  }
});
async function hentai() {
  return new Promise((_0x54913d, _0xdf1c80) => {
    const _0x1acb88 = Math.floor(Math.random() * 0x481);
    axios.get('https://sfmcompile.club/page/' + _0x1acb88).then(_0x578b10 => {
      const _0x222f86 = cheerio.load(_0x578b10.data);
      const _0x2a6347 = [];
      _0x222f86("#primary > div > div > ul > li > article").each(function (_0x5384ae, _0x4432be) {
        _0x2a6347.push({
          'title': _0x222f86(_0x4432be).find("header > h2").text(),
          'link': _0x222f86(_0x4432be).find("header > h2 > a").attr("href"),
          'category': _0x222f86(_0x4432be).find("header > div.entry-before-title > span > span").text().replace("in ", ''),
          'share_count': _0x222f86(_0x4432be).find("header > div.entry-after-title > p > span.entry-shares").text(),
          'views_count': _0x222f86(_0x4432be).find("header > div.entry-after-title > p > span.entry-views").text(),
          'type': _0x222f86(_0x4432be).find("source").attr("type") || 'image/jpeg',
          'video_1': _0x222f86(_0x4432be).find("source").attr('src') || _0x222f86(_0x4432be).find("img").attr("data-src"),
          'video_2': _0x222f86(_0x4432be).find("video > a").attr("href") || ''
        });
      });
      _0x54913d(_0x2a6347);
    });
  });
}
