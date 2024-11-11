const {
  keith
} = require("../keizzah/keith");
const {
  default: axios
} = require("axios");
keith({
  'nomCom': "wallpaper",
  'reaction': '🙌',
  'categorie': "AI-LOGO"
}, async (_0x383089, _0x5f221f, _0x443e35) => {
  const {
    repondre: _0x53482f,
    arg: _0x59bce7,
    ms: _0x3dd4f0
  } = _0x443e35;
  const _0x230438 = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
  const _0x4ec65c = await _0x230438.json();
  const _0x451fb6 = _0x4ec65c.urls.regular;
  let _0xa87037 = {
    'image': {
      'url': _0x451fb6
    },
    'caption': "*POWERED BY ALPHA-MD*"
  };
  return await _0x5f221f.sendMessage(_0x383089, _0xa87037, {
    'quoted': _0x3dd4f0
  });
});
keith({
  'nomCom': "random",
  'reaction': '🥂',
  'categorie': "AI-LOGO"
}, async (_0x106175, _0x4e034a, _0x2094e7) => {
  const {
    repondre: _0x302587,
    arg: _0x3898c2,
    ms: _0x3082b2
  } = _0x2094e7;
  const _0x54c129 = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
  const _0x2eeb68 = await _0x54c129.json();
  const _0x2c4590 = _0x2eeb68.urls.regular;
  let _0x5b4b29 = {
    'image': {
      'url': _0x2c4590
    },
    'caption': "*POWERED BY ALPHA-MD*"
  };
  return await _0x4e034a.sendMessage(_0x106175, _0x5b4b29, {
    'quoted': _0x3082b2
  });
});
keith({
  'nomCom': "nature",
  'reaction': '🦗',
  'categorie': "AI-LOGO"
}, async (_0x15185a, _0x252cd2, _0x3ca93e) => {
  const {
    repondre: _0x24b3b1,
    arg: _0x39dca1,
    ms: _0x1e3b1c
  } = _0x3ca93e;
  const _0x5653a3 = await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc");
  const _0x1e0a63 = await _0x5653a3.json();
  const _0x2c338d = _0x1e0a63.urls.regular;
  let _0x3bae21 = {
    'image': {
      'url': _0x2c338d
    },
    'caption': "*POWERED BY ALPHA-MD*"
  };
  return await _0x252cd2.sendMessage(_0x15185a, _0x3bae21, {
    'quoted': _0x1e3b1c
  });
});
keith({
  'nomCom': "generate",
  'reaction': '📡',
  'categorie': 'AI-LOGO'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Please enter the necessary information to generate the image.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://www.samirxpikachu.run.place/marjia?prompt=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "extract",
  'reaction': '📡',
  'categorie': 'AI-LOGO'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Please insert the image url Alpha-Md will extract it for you.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://www.samirxpikachu.run.place/extract/text?url=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "bing",
  'reaction': '📡',
  'categorie': 'AI-LOGO'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Please describe your image and Alpha Md will generate it.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://www.samirxpikachu.run.place/flux?prompt=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "bing2",
  'reaction': '📡',
  'categorie': 'AI-LOGO'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Please describe your image and Alpha Md will generate it.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://www.samirxpikachu.run.place/marjia?prompt=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "ilama",
  'reaction': '📡',
  'categorie': 'AI-LOGO'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Please describe your image and Alpha Md will generate it.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://www.samirxpikachu.run.place/multi/Ml?prompt=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "beautify",
  'reaction': '📡',
  'categorie': 'AI-LOGO'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Kindly enter a valid image url to beautify your image.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://samirxpikachuio.onrender.com/remacne?url=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
