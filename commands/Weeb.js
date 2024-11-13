const axios = require("axios");
const { keith } = require("../keizzah/keith");
const { writeFile } = require("fs/promises");

keith({
  'nomCom': 'waifu',
  'categorie': "Weeb",
  'reaction': '😏'
}, async (_0x1cc88b, _0x4fe653, _0x3e1473) => {
  const { repondre: _0x116efe, ms: _0x144747 } = _0x3e1473;
  try {
    for (let _0x3ecbd5 = 0; _0x3ecbd5 < 5; _0x3ecbd5++) {
      const response = await axios.get('https://api.waifu.pics/sfw/waifu');
      const imageUrl = response.data.url;
      _0x4fe653.sendMessage(_0x1cc88b, { 'image': { 'url': imageUrl } }, { 'quoted': _0x144747 });
    }
  } catch (error) {
    _0x116efe("Error occurred while retrieving the data. :", error);
  }
});

keith({
  'nomCom': "neko",
  'categorie': 'Weeb',
  'reaction': '😺'
}, async (_0x30d46f, _0x13312f, _0x3ddf31) => {
  const { repondre: _0x497f9f, ms: _0x82ee25 } = _0x3ddf31;
  try {
    for (let _0x350a85 = 0; _0x350a85 < 5; _0x350a85++) {
      const response = await axios.get("https://api.waifu.pics/sfw/neko");
      const imageUrl = response.data.url;
      _0x13312f.sendMessage(_0x30d46f, { 'image': { 'url': imageUrl } }, { 'quoted': _0x82ee25 });
    }
  } catch (error) {
    _0x497f9f("Error occurred while retrieving the data. :", error);
  }
});

keith({
  'nomCom': 'shinobu',
  'categorie': "Weeb",
  'reaction': '🦋'
}, async (_0x3e7c37, _0x27f976, _0x40a321) => {
  const { repondre: _0x19bf26, ms: _0x1fce93 } = _0x40a321;
  try {
    for (let _0x26bdfc = 0; _0x26bdfc < 5; _0x26bdfc++) {
      const response = await axios.get('https://api.waifu.pics/sfw/shinobu');
      const imageUrl = response.data.url;
      _0x27f976.sendMessage(_0x3e7c37, { 'image': { 'url': imageUrl } }, { 'quoted': _0x1fce93 });
    }
  } catch (error) {
    _0x19bf26("Error occurred while retrieving the data. :", error);
  }
});

keith({
  'nomCom': 'megumin',
  'categorie': "Weeb",
  'reaction': '💥'
}, async (_0x5b5b48, _0x2c0440, _0x12843d) => {
  const { repondre: _0x191b30, ms: _0x30cb8e } = _0x12843d;
  try {
    for (let _0xebecce = 0; _0xebecce < 5; _0xebecce++) {
      const response = await axios.get("https://api.waifu.pics/sfw/megumin");
      const imageUrl = response.data.url;
      _0x2c0440.sendMessage(_0x5b5b48, { 'image': { 'url': imageUrl } }, { 'quoted': _0x30cb8e });
    }
  } catch (error) {
    _0x191b30("Error occurred while retrieving the data. :", error);
  }
});

keith({
  'nomCom': "cosplay",
  'categorie': "Weeb",
  'reaction': '😏'
}, async (_0x188f33, _0x3c7bf0, _0xebe4f3) => {
  const { repondre: _0x2ecac4, ms: _0x21f6ba } = _0xebe4f3;
  try {
    for (let _0x2894e7 = 0; _0x2894e7 < 5; _0x2894e7++) {
      const response = await axios.get('https://fantox-cosplay-api.onrender.com/', { 'responseType': "arraybuffer" });
      const imageBuffer = response.data;
      await writeFile("./cosplay.jpg", imageBuffer);
      _0x3c7bf0.sendMessage(_0x188f33, { 'image': { 'url': './cosplay.jpg' } }, { 'quoted': _0x21f6ba });
    }
  } catch (error) {
    _0x2ecac4("Error occurred while retrieving the data. :" + error);
  }
});

keith({
  'nomCom': "couplepp",
  'categorie': 'Weeb',
  'reaction': '💞'
}, async (_0x1be179, _0x559097, _0xe65da8) => {
  const { repondre: _0x566b02, ms: _0x2f250f } = _0xe65da8;
  try {
    _0x566b02("she/he doesn't love you :)");
    const response = await axios.get('https://smiling-hosiery-bear.cyclic.app/weeb/couplepp');
    _0x559097.sendMessage(_0x1be179, { 'image': { 'url': response.data.male }, 'caption': "For Man" }, { 'quoted': _0x2f250f });
    _0x559097.sendMessage(_0x1be179, { 'image': { 'url': response.data.female }, 'caption': "_For woman_" }, { 'quoted': _0x2f250f });
  } catch (error) {
    _0x566b02(error);
  }
});
