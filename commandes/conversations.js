
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
const fs = require("fs-extra");
const axios = require("axios");
const {
  exec
} = require('child_process');
const ffmpeg = require("fluent-ffmpeg");
const {
  Catbox
} = require("node-catbox");
const catbox = new Catbox();
async function uploadToCatbox(_0x5dbd65) {
  if (!fs.existsSync(_0x5dbd65)) {
    throw new Error("Fichier non existant");
  }
  try {
    const _0x247583 = await catbox.uploadFile({
      'path': _0x5dbd65
    });
    if (_0x247583) {
      return _0x247583;
    } else {
      throw new Error("Erreur lors de la récupération du lien du fichier");
    }
  } catch (_0x421763) {
    throw new Error(String(_0x421763));
  }
}
zokou({
  'nomCom': 'sticker',
  'aliases': ['s'],
  'categorie': "Converter",
  'reaction': "👨🏿‍💻"
}, async (_0x2bc8a3, _0x4b5b95, _0x482f98) => {
  let {
    ms: _0x4fcf6e,
    mtype: _0x5362af,
    arg: _0x5201b7,
    repondre: _0x35fea9,
    nomAuteurMessage: _0x41119
  } = _0x482f98;
  var _0x2df9d0 = JSON.stringify(_0x4fcf6e.message);
  var _0x1a0651 = _0x5362af === "extendedTextMessage" && _0x2df9d0.includes('imageMessage');
  var _0x5f3365 = _0x5362af === 'extendedTextMessage' && _0x2df9d0.includes("videoMessage");
  const _0x19f7a = '' + Math.floor(Math.random() * 0x2710) + ".webp";
  let _0x3eb4a3 = Buffer.from([]);
  let _0x391093;
  let _0x286631;
  try {
    if (_0x5362af === "imageMessage" || _0x1a0651) {
      _0x286631 = _0x4fcf6e.message.imageMessage || _0x4fcf6e.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
      _0x391093 = await downloadContentFromMessage(_0x286631, "image");
      for await (const _0x5216c5 of _0x391093) {
        _0x3eb4a3 = Buffer.concat([_0x3eb4a3, _0x5216c5]);
      }
      const _0x23863f = new Sticker(_0x3eb4a3, {
        'pack': 'ALPHA-MD',
        'author': _0x41119,
        'type': _0x5201b7.includes("crop") || _0x5201b7.includes('c') ? StickerTypes.CROPPED : StickerTypes.FULL,
        'quality': 0x46
      });
      await _0x23863f.toFile(_0x19f7a);
    } else {
      if (_0x5362af === "videoMessage" || _0x5f3365) {
        _0x286631 = _0x4fcf6e.message.videoMessage || _0x4fcf6e.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
        _0x391093 = await downloadContentFromMessage(_0x286631, "video");
        const _0x5bf762 = '' + Math.floor(Math.random() * 0x2710) + ".mp4";
        for await (const _0x80b274 of _0x391093) {
          _0x3eb4a3 = Buffer.concat([_0x3eb4a3, _0x80b274]);
        }
        await fs.promises.writeFile(_0x5bf762, _0x3eb4a3);
        await new Promise((_0x196684, _0x5a66b5) => {
          ffmpeg(_0x5bf762).outputOptions(["-vcodec", "libwebp", '-vf', "fps=15,scale=512:512:force_original_aspect_ratio=decrease", "-loop", '0', "-preset", "default", "-an", "-vsync", '0', '-s', "512:512"]).save(_0x19f7a).on("end", async () => {
            await fs.promises.unlink(_0x5bf762);
            _0x196684();
          }).on("error", _0x556167 => {
            _0x5a66b5(_0x556167);
          });
        });
        const _0x719b7f = new Sticker(await fs.promises.readFile(_0x19f7a), {
          'pack': "ALPHA-MD",
          'author': _0x41119,
          'type': _0x5201b7.includes("crop") || _0x5201b7.includes('c') ? StickerTypes.CROPPED : StickerTypes.FULL,
          'quality': 0x46
        });
        await _0x719b7f.toFile(_0x19f7a);
      } else {
        _0x35fea9("Please mention an image or video!");
        return;
      }
    }
    await _0x4b5b95.sendMessage(_0x2bc8a3, {
      'sticker': await fs.promises.readFile(_0x19f7a)
    }, {
      'quoted': _0x4fcf6e
    });
    await fs.promises.unlink(_0x19f7a);
  } catch (_0x1dc774) {
    _0x35fea9("An error occurred while processing your sticker: " + _0x1dc774.message);
  }
});
zokou({
  'nomCom': 'crop',
  'categorie': "Converter",
  'reaction': '👨🏿‍💻'
}, async (_0x497524, _0x2a874f, _0x496fec) => {
  const {
    ms: _0x5c66c2,
    msgRepondu: _0x148f0f,
    arg: _0x307b51,
    repondre: _0x49a29c,
    nomAuteurMessage: _0x71551
  } = _0x496fec;
  if (!_0x148f0f) {
    _0x49a29c("make sure to mention the media");
    return;
  }
  ;
  if (!_0x307b51[0x0]) {
    pack = _0x71551;
  } else {
    pack = _0x307b51.join(" ");
  }
  ;
  if (_0x148f0f.imageMessage) {
    mediamsg = _0x148f0f.imageMessage;
  } else {
    if (_0x148f0f.videoMessage) {
      mediamsg = _0x148f0f.videoMessage;
    } else {
      if (_0x148f0f.stickerMessage) {
        mediamsg = _0x148f0f.stickerMessage;
      } else {
        _0x49a29c("Uh media please");
        return;
      }
    }
  }
  ;
  var _0x58cce5 = await _0x2a874f.downloadAndSaveMediaMessage(mediamsg);
  let _0x305477 = new Sticker(_0x58cce5, {
    'pack': "Alpha-Md",
    'type': StickerTypes.CROPPED,
    'categories': ['🤩', '🎉'],
    'id': "12345",
    'quality': 0x46,
    'background': "transparent"
  });
  const _0x4b15bc = await _0x305477.toBuffer();
  _0x2a874f.sendMessage(_0x497524, {
    'sticker': _0x4b15bc
  }, {
    'quoted': _0x5c66c2
  });
});
zokou({
  'nomCom': "take",
  'categorie': "Converter",
  'reaction': '👨🏿‍💻'
}, async (_0x2c1a70, _0x4eab2a, _0x31214e) => {
  const {
    ms: _0x2a7ba3,
    msgRepondu: _0x25bd62,
    arg: _0x3479dc,
    repondre: _0x483916,
    nomAuteurMessage: _0xf00a27
  } = _0x31214e;
  if (!_0x25bd62) {
    _0x483916("make sure to mention the media");
    return;
  }
  ;
  if (!_0x3479dc[0x0]) {
    pack = _0xf00a27;
  } else {
    pack = _0x3479dc.join(" ");
  }
  ;
  if (_0x25bd62.imageMessage) {
    mediamsg = _0x25bd62.imageMessage;
  } else {
    if (_0x25bd62.videoMessage) {
      mediamsg = _0x25bd62.videoMessage;
    } else {
      if (_0x25bd62.stickerMessage) {
        mediamsg = _0x25bd62.stickerMessage;
      } else {
        _0x483916("Uh a media please");
        return;
      }
    }
  }
  ;
  var _0x482cd1 = await _0x4eab2a.downloadAndSaveMediaMessage(mediamsg);
  let _0x35c2df = new Sticker(_0x482cd1, {
    'pack': _0xf00a27,
    'type': StickerTypes.FULL,
    'categories': ['🤩', '🎉'],
    'id': "12345",
    'quality': 0x46,
    'background': "transparent"
  });
  const _0x1613f3 = await _0x35c2df.toBuffer();
  _0x4eab2a.sendMessage(_0x2c1a70, {
    'sticker': _0x1613f3
  }, {
    'quoted': _0x2a7ba3
  });
});
zokou({
  'nomCom': "write",
  'categorie': "Converter",
  'reaction': "👨🏿‍💻"
}, async (_0x40cc8b, _0x549459, _0x4f2b22) => {
  const {
    ms: _0x950808,
    msgRepondu: _0x1576da,
    arg: _0x31737d,
    repondre: _0xda8cc5,
    nomAuteurMessage: _0x3296e8
  } = _0x4f2b22;
  if (!_0x1576da) {
    _0xda8cc5("Please mention an image");
    return;
  }
  if (!_0x1576da.imageMessage) {
    _0xda8cc5("This command only works with images");
    return;
  }
  ;
  text = _0x31737d.join(" ");
  if (!text || text === null) {
    _0xda8cc5("Please insert a text");
    return;
  }
  ;
  const _0x1c67b1 = _0x1576da.imageMessage;
  const _0x1f9406 = await _0x549459.downloadAndSaveMediaMessage(_0x1c67b1);
  const _0x32ac27 = new FormData();
  _0x32ac27.append("image", fs.createReadStream(_0x1f9406));
  const _0x5d5a93 = {
    'Authorization': "Client-ID b40a1820d63cd4e",
    ..._0x32ac27.getHeaders()
  };
  const _0x4b5b35 = {
    'method': "post",
    'maxBodyLength': Infinity,
    'url': "https://api.imgur.com/3/image",
    'headers': _0x5d5a93,
    'data': _0x32ac27
  };
  try {
    const _0x26baac = await axios(_0x4b5b35);
    const _0x501358 = _0x26baac.data.data.link;
    console.log(_0x501358);
    const _0x4b0f8b = 'https://api.memegen.link/images/custom/-/' + text + ".png?background=" + _0x501358;
    const _0x3f42f6 = new Sticker(_0x4b0f8b, {
      'pack': _0x3296e8,
      'author': 'ALPHA-MD',
      'type': StickerTypes.FULL,
      'categories': ['🤩', '🎉'],
      'id': "12345",
      'quality': 0x46,
      'background': 'transparent'
    });
    const _0x4db3d2 = await _0x3f42f6.toBuffer();
    _0x549459.sendMessage(_0x40cc8b, {
      'sticker': _0x4db3d2
    }, {
      'quoted': _0x950808
    });
  } catch (_0x454831) {
    console.error("Error uploading to Imgur :", _0x454831);
    _0xda8cc5("An error occurred while creating the meme.");
  }
});
zokou({
  'nomCom': "photo",
  'categorie': "Converter",
  'reaction': "👨🏿‍💻"
}, async (_0x3a0916, _0xb3680, _0x392a95) => {
  const {
    ms: _0x2372b6,
    msgRepondu: _0x5f41bc,
    arg: _0x223db1,
    repondre: _0x2d09b5,
    nomAuteurMessage: _0x3151d1
  } = _0x392a95;
  if (!_0x5f41bc) {
    _0x2d09b5("Reply to a sticker");
    return;
  }
  ;
  if (!_0x5f41bc.stickerMessage) {
    _0x2d09b5("Um mention a non-animated sticker");
    return;
  }
  ;
  let _0x3bba31 = await _0xb3680.downloadAndSaveMediaMessage(_0x5f41bc.stickerMessage);
  let _0x435fcc = await ('' + Math.floor(Math.random() * 0x2710) + ".png");
  exec("ffmpeg -i " + _0x3bba31 + " " + _0x435fcc, _0xf050e6 => {
    fs.unlinkSync(_0x3bba31);
    if (_0xf050e6) {
      _0xb3680.sendMessage(_0x3a0916, {
        'text': "A non-animated sticker please"
      }, {
        'quoted': _0x2372b6
      });
      return;
    }
    let _0x595213 = fs.readFileSync(_0x435fcc);
    _0xb3680.sendMessage(_0x3a0916, {
      'image': _0x595213
    }, {
      'quoted': _0x2372b6
    });
    fs.unlinkSync(_0x435fcc);
  });
});
zokou({
  'nomCom': 'trt',
  'categorie': "Converter",
  'reaction': "👨🏿‍💻"
}, async (_0x3fa31d, _0x1af208, _0x5402ef) => {
  const {
    msgRepondu: _0x59e5fc,
    repondre: _0x13969b,
    arg: _0x1694f
  } = _0x5402ef;
  if (_0x59e5fc) {
    try {
      if (!_0x1694f || !_0x1694f[0x0]) {
        _0x13969b("(eg : trt en)");
        return;
      }
      let _0x6cd4f3 = await traduire(_0x59e5fc.conversation, {
        'to': _0x1694f[0x0]
      });
      _0x13969b(_0x6cd4f3);
    } catch (_0x36a6a6) {
      _0x13969b("Mention a texte Message");
    }
  } else {
    _0x13969b("Mention a text Message");
  }
});
zokou({
  'nomCom': 'url',
  'categorie': "General",
  'reaction': '👨🏿‍💻'
}, async (_0x26aea6, _0x27193a, _0x143277) => {
  const {
    msgRepondu: _0x38b49e,
    repondre: _0x46b6d9
  } = _0x143277;
  if (!_0x38b49e) {
    _0x46b6d9("mention a image or video");
    return;
  }
  let _0x38022b;
  if (_0x38b49e.videoMessage) {
    _0x38022b = await _0x27193a.downloadAndSaveMediaMessage(_0x38b49e.videoMessage);
  } else {
    if (_0x38b49e.imageMessage) {
      _0x38022b = await _0x27193a.downloadAndSaveMediaMessage(_0x38b49e.imageMessage);
    } else {
      _0x46b6d9("mention a image or video");
      return;
    }
  }
  try {
    const _0x4d33ac = await uploadToCatbox(_0x38022b);
    fs.unlinkSync(_0x38022b);
    _0x46b6d9(_0x4d33ac);
  } catch (_0x33d18c) {
    console.error("Error while creating your url :", _0x33d18c);
    _0x46b6d9("Opps error");
  }
});

