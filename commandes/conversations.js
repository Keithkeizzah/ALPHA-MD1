const a24_0x81cf52 = function () {
  let _0xe59b83 = true;
  return function (_0x159c50, _0x21fdff) {
    const _0x26d665 = _0xe59b83 ? function () {
      if (_0x21fdff) {
        const _0x10c9f4 = _0x21fdff.apply(_0x159c50, arguments);
        _0x21fdff = null;
        return _0x10c9f4;
      }
    } : function () {};
    _0xe59b83 = false;
    return _0x26d665;
  };
}();
const a24_0x11011f = a24_0x81cf52(this, function () {
  return a24_0x11011f.toString().search("(((.+)+)+)+$").toString().constructor(a24_0x11011f).search("(((.+)+)+)+$");
});
a24_0x11011f();
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  zokou
} = require("../framework/zokou");
const traduire = require("../framework/traduction");
const {
  downloadMediaMessage,
  downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const fs = require('fs-extra');
const axios = require("axios");
const FormData = require("form-data");
const {
  exec
} = require("child_process");
async function uploadToTelegraph(_0x3a77bd) {
  if (!fs.existsSync(_0x3a77bd)) {
    throw new Error("Fichier non existant");
  }
  try {
    const _0x14ec22 = new FormData();
    _0x14ec22.append("file", fs.createReadStream(_0x3a77bd));
    const {
      data: _0x2f5205
    } = await axios.post('https://telegra.ph/upload', _0x14ec22, {
      'headers': {
        ..._0x14ec22.getHeaders()
      }
    });
    if (_0x2f5205 && _0x2f5205[0x0] && _0x2f5205[0x0].src) {
      return "https://telegra.ph" + _0x2f5205[0x0].src;
    } else {
      throw new Error("Erreur lors de la récupération du lien de la vidéo");
    }
  } catch (_0x51cdd3) {
    throw new Error(String(_0x51cdd3));
  }
}
zokou({
  'nomCom': "sticker",
  'categorie': "Conversion",
  'reaction': '👨🏿‍💻',
  'desc': "convert image or video into sticker in full size",
  'alias': ['s']
}, async (_0x685981, _0x310edb, _0x277acf) => {
  let {
    ms: _0x540f64,
    mtype: _0x55f251,
    arg: _0x7abfb2,
    repondre: _0x2f0093,
    nomAuteurMessage: _0x53e5ed
  } = _0x277acf;
  var _0x2a0279 = JSON.stringify(_0x540f64.message);
  var _0x24d457 = _0x55f251 === "extendedTextMessage" && _0x2a0279.includes("imageMessage");
  var _0x301235 = _0x55f251 === "extendedTextMessage" && _0x2a0279.includes("videoMessage");
  const _0x150124 = '' + Math.floor(Math.random() * 0x2710) + ".webp";
  if (_0x55f251 === "imageMessage" || _0x24d457) {
    let _0x52b7d4;
    if (_0x540f64.message.imageMessage) {
      _0x52b7d4 = _0x540f64.message.imageMessage;
    } else {
      _0x52b7d4 = _0x540f64.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
    }
    const _0x395ed6 = await downloadContentFromMessage(_0x52b7d4, 'image');
    let _0x39071c = Buffer.from([]);
    for await (const _0x7c5e3d of _0x395ed6) {
      _0x39071c = Buffer.concat([_0x39071c, _0x7c5e3d]);
    }
    sticker = new Sticker(_0x39071c, {
      'pack': 'Zokou-Md',
      'author': _0x53e5ed,
      'type': _0x7abfb2.includes('crop') || _0x7abfb2.includes('c') ? StickerTypes.CROPPED : StickerTypes.FULL,
      'quality': 0x64
    });
  } else {
    if (_0x55f251 === 'videoMessage' || _0x301235) {
      let _0x255467;
      if (_0x540f64.message.videoMessage) {
        _0x255467 = _0x540f64.message.videoMessage;
      } else {
        _0x255467 = _0x540f64.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
      }
      const _0x6a50b0 = await downloadContentFromMessage(_0x255467, 'video');
      let _0x22764c = Buffer.from([]);
      for await (const _0x6ef11b of _0x6a50b0) {
        _0x22764c = Buffer.concat([_0x22764c, _0x6ef11b]);
      }
      sticker = new Sticker(_0x22764c, {
        'pack': "Zokou-Md",
        'author': _0x53e5ed,
        'type': _0x7abfb2.includes('-r') || _0x7abfb2.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
        'quality': 0x28
      });
    } else {
      _0x2f0093("Please mention an image or video!");
      return;
    }
  }
  await sticker.toFile(_0x150124);
  await _0x310edb.sendMessage(_0x685981, {
    'sticker': fs.readFileSync(_0x150124)
  }, {
    'quoted': _0x540f64
  });
  try {
    fs.unlinkSync(_0x150124);
  } catch (_0x5e3ad1) {
    console.log(_0x5e3ad1);
  }
});
zokou({
  'nomCom': "scrop",
  'categorie': 'Conversion',
  'reaction': "👨🏿‍💻",
  'desc': "convert image or video into sticker in cropped size",
  'alias': ['sc']
}, async (_0x4d394f, _0x3ed43e, _0x25b89f) => {
  const {
    ms: _0x21051b,
    msgRepondu: _0x491404,
    arg: _0x2ffefe,
    repondre: _0x5c2406,
    nomAuteurMessage: _0xbee180
  } = _0x25b89f;
  if (!_0x491404) {
    _0x5c2406("make sure to mention the media");
    return;
  }
  ;
  if (!_0x2ffefe[0x0]) {
    pack = _0xbee180;
  } else {
    pack = _0x2ffefe.join(" ");
  }
  ;
  if (_0x491404.imageMessage) {
    mediamsg = _0x491404.imageMessage;
  } else {
    if (_0x491404.videoMessage) {
      mediamsg = _0x491404.videoMessage;
    } else {
      if (_0x491404.stickerMessage) {
        mediamsg = _0x491404.stickerMessage;
      } else {
        _0x5c2406("Uh media please");
        return;
      }
    }
  }
  ;
  var _0x1161fb = await _0x3ed43e.downloadAndSaveMediaMessage(mediamsg);
  let _0x52202c = new Sticker(_0x1161fb, {
    'pack': pack,
    'type': StickerTypes.CROPPED,
    'categories': ['🤩', '🎉'],
    'id': "12345",
    'quality': 0x46,
    'background': 'transparent'
  });
  const _0x383479 = await _0x52202c.toBuffer();
  _0x3ed43e.sendMessage(_0x4d394f, {
    'sticker': _0x383479
  }, {
    'quoted': _0x21051b
  });
});
zokou({
  'nomCom': "take",
  'categorie': "Conversion",
  'reaction': '👨🏿‍💻',
  'desc': "change sticker packname or author name",
  'alias': ["steal"]
}, async (_0x3f09f9, _0x1781b0, _0x4b0ae4) => {
  const {
    ms: _0xb027aa,
    msgRepondu: _0x1737ac,
    arg: _0x2013aa,
    repondre: _0x24bfd5,
    nomAuteurMessage: _0x382d94
  } = _0x4b0ae4;
  if (!_0x1737ac) {
    _0x24bfd5("make sure to mention the media");
    return;
  }
  ;
  if (!_0x2013aa[0x0]) {
    pack = _0x382d94;
  } else {
    pack = _0x2013aa.join(" ");
  }
  ;
  if (_0x1737ac.imageMessage) {
    mediamsg = _0x1737ac.imageMessage;
  } else {
    if (_0x1737ac.videoMessage) {
      mediamsg = _0x1737ac.videoMessage;
    } else {
      if (_0x1737ac.stickerMessage) {
        mediamsg = _0x1737ac.stickerMessage;
      } else {
        _0x24bfd5("Uh a media please");
        return;
      }
    }
  }
  ;
  var _0x5083b4 = await _0x1781b0.downloadAndSaveMediaMessage(mediamsg);
  let _0x5bba7a = new Sticker(_0x5083b4, {
    'pack': pack,
    'type': StickerTypes.FULL,
    'categories': ['🤩', '🎉'],
    'id': "12345",
    'quality': 0x46,
    'background': "transparent"
  });
  const _0x58e164 = await _0x5bba7a.toBuffer();
  _0x1781b0.sendMessage(_0x3f09f9, {
    'sticker': _0x58e164
  }, {
    'quoted': _0xb027aa
  });
});
zokou({
  'nomCom': "write",
  'categorie': "Conversion",
  'reaction': '👨🏿‍💻',
  'desc': "Write any text under image and return sticker",
  'alias': ['sw']
}, async (_0x4ee27b, _0x16de4f, _0x46ce1a) => {
  const {
    ms: _0x1b4144,
    msgRepondu: _0x3f77d6,
    arg: _0x538b8b,
    repondre: _0x111b19,
    nomAuteurMessage: _0x42f5e0
  } = _0x46ce1a;
  if (!_0x3f77d6) {
    _0x111b19("Please mention an image");
    return;
  }
  if (!_0x3f77d6.imageMessage) {
    _0x111b19("The command only works with images");
    return;
  }
  ;
  text = _0x538b8b.join(" ");
  if (!text || text === null) {
    _0x111b19("Make sure to insert text");
    return;
  }
  ;
  const _0x59838d = _0x3f77d6.imageMessage;
  const _0x59b372 = await _0x16de4f.downloadAndSaveMediaMessage(_0x59838d);
  const _0x18d40e = new FormData();
  _0x18d40e.append("image", fs.createReadStream(_0x59b372));
  const _0x231178 = {
    'Authorization': "Client-ID b40a1820d63cd4e",
    ..._0x18d40e.getHeaders()
  };
  const _0x5c9618 = {
    'method': "post",
    'maxBodyLength': Infinity,
    'url': "https://api.imgur.com/3/image",
    'headers': _0x231178,
    'data': _0x18d40e
  };
  try {
    const _0x177ffa = await axios(_0x5c9618);
    const _0xc2b67d = _0x177ffa.data.data.link;
    console.log(_0xc2b67d);
    const _0x21b5d0 = 'https://api.memegen.link/images/custom/-/' + text + ".png?background=" + _0xc2b67d;
    const _0x3fabe0 = new Sticker(_0x21b5d0, {
      'pack': _0x42f5e0,
      'author': 'Alpha-Md',
      'type': StickerTypes.FULL,
      'categories': ['🤩', '🎉'],
      'id': "12345",
      'quality': 0x46,
      'background': "transparent"
    });
    const _0x442c33 = await _0x3fabe0.toBuffer();
    _0x16de4f.sendMessage(_0x4ee27b, {
      'sticker': _0x442c33
    }, {
      'quoted': _0x1b4144
    });
  } catch (_0x15e54d) {
    console.error("Error uploading to Imgur :", _0x15e54d);
    _0x111b19("An error occurred while creating the meme.");
  }
});
zokou({
  'nomCom': "photo",
  'categorie': "Conversion",
  'reaction': '👨🏿‍💻',
  'desc': "get image from sticker"
}, async (_0x4f9cb3, _0x6e901, _0x39738b) => {
  const {
    ms: _0x3265ec,
    msgRepondu: _0x27631f,
    arg: _0x41200b,
    repondre: _0x4fe68c,
    nomAuteurMessage: _0x6a44ed
  } = _0x39738b;
  if (!_0x27631f) {
    _0x4fe68c("make sure to mention the media");
    return;
  }
  ;
  if (!_0x27631f.stickerMessage) {
    _0x4fe68c("Um mention a non-animated sticker");
    return;
  }
  ;
  let _0x420d65 = await _0x6e901.downloadAndSaveMediaMessage(_0x27631f.stickerMessage);
  let _0x691aed = await ('' + Math.floor(Math.random() * 0x2710) + '.png');
  exec("ffmpeg -i " + _0x420d65 + " " + _0x691aed, _0x1cbfce => {
    fs.unlinkSync(_0x420d65);
    if (_0x1cbfce) {
      _0x6e901.sendMessage(_0x4f9cb3, {
        'text': "A non-animated sticker please"
      }, {
        'quoted': _0x3265ec
      });
      return;
    }
    let _0xee993c = fs.readFileSync(_0x691aed);
    _0x6e901.sendMessage(_0x4f9cb3, {
      'image': _0xee993c
    }, {
      'quoted': _0x3265ec
    });
    fs.unlinkSync(_0x691aed);
  });
});
zokou({
  'nomCom': "trt",
  'categorie': "Conversion",
  'reaction': "👨🏿‍💻",
  'desc': "translate any text"
}, async (_0x3a27bc, _0x2f2054, _0x182180) => {
  const {
    msgRepondu: _0x443959,
    repondre: _0x120425,
    arg: _0x2287d2
  } = _0x182180;
  if (_0x443959) {
    try {
      if (!_0x2287d2 || !_0x2287d2[0x0]) {
        _0x120425("(eg : trt en)");
        return;
      }
      let _0x1844d5 = await traduire(_0x443959.conversation, {
        'to': _0x2287d2[0x0]
      });
      _0x120425(_0x1844d5);
    } catch (_0x5f02de) {
      _0x120425("Mention a texte Message");
    }
  } else {
    _0x120425("Mention a texte Message");
  }
});
zokou({
  'nomCom': 'url',
  'categorie': "Conversion",
  'reaction': "👨🏿‍💻",
  'desc': "convert image or video into sticker"
}, async (_0x5c9054, _0x5b09bc, _0x28cf04) => {
  const {
    msgRepondu: _0x382be7,
    repondre: _0xe9e79a
  } = _0x28cf04;
  if (!_0x382be7) {
    _0xe9e79a("mention a image or video");
    return;
  }
  let _0x1afadf;
  if (_0x382be7.videoMessage) {
    _0x1afadf = await _0x5b09bc.downloadAndSaveMediaMessage(_0x382be7.videoMessage);
  } else {
    if (_0x382be7.imageMessage) {
      _0x1afadf = await _0x5b09bc.downloadAndSaveMediaMessage(_0x382be7.imageMessage);
    } else {
      _0xe9e79a("mention a image or video");
      return;
    }
  }
  try {
    const _0x47883d = await uploadToTelegraph(_0x1afadf);
    fs.unlinkSync(_0x1afadf);
    _0xe9e79a(_0x47883d);
  } catch (_0x3928af) {
    console.error("Erreur lors de la création du lien Telegraph :", _0x3928af);
    _0xe9e79a("Opps error");
  }
});
