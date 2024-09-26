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
nomCom: "ass",
  'categorie': "Hentai",
  'reaction': '🍑'
}, async (_0xc103f1, _0xfe64c2, _0x5c47af) => {
  const {
    repondre: _0x357a56,
    ms: _0x937036
  } = _0x5c47af;
  try {
    for (let _0x1a66b1 = 0x0; _0x1a66b1 < 0x5; _0x1a66b1++) {
      const _0x4650c0 = await axios.get("https://api.maher-zubair.tech/nsfw/ass");
      const _0x484cac = _0x4650c0.data.url;
      _0xfe64c2.sendMessage(_0xc103f1, {
        'image': {
          'url': _0x484cac
        }
      }, {
        'quoted': _0x937036
      });
    }
  } catch (_0x212fd0) {
    _0x357a56("Error occurred while retrieving data :", _0x212fd0);
  }
});
zokou({
  'nomCom': "fuck",
  'categorie': "Hentai",
  'reaction': "💦 "
}, async (_0x337bd2, _0xa26cbc, _0x1cd89a) => {
  const {
    repondre: _0x25b1a0,
    ms: _0x1ba260
  } = _0x1cd89a;
  try {
    for (let _0x511944 = 0x0; _0x511944 < 0x5; _0x511944++) {
      const _0xb9d064 = await axios.get("https://api.maher-zubair.tech/nsfw/fuck");
      const _0x33c531 = _0xb9d064.data.url;
      _0xa26cbc.sendMessage(_0x337bd2, {
        'image': {
          'url': _0x33c531
        }
      }, {
        'quoted': _0x1ba260
      });
    }
  } catch (_0x406298) {
    _0x25b1a0("Error occurred while retrieving data :", _0x406298);
  }
});
zokou({
  'nomCom': "pussy",
  'categorie': "Hentai",
  'reaction': '😋'
}, async (_0x152ea0, _0x18dfe0, _0x16cb71) => {
  const {
    repondre: _0x54f8b3,
    ms: _0x548051
  } = _0x16cb71;
  try {
    for (let _0x3a663a = 0x0; _0x3a663a < 0x5; _0x3a663a++) {
      const _0x22d7f0 = await axios.get('https://api.maher-zubair.tech/nsfw/pussy');
      const _0x12304c = _0x22d7f0.data.url;
      _0x18dfe0.sendMessage(_0x152ea0, {
        'image': {
          'url': _0x12304c
        }
      }, {
        'quoted': _0x548051
      });
    }
  } catch (_0x4067b6) {
    _0x54f8b3("Error occurred while retrieving data :", _0x4067b6);
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
