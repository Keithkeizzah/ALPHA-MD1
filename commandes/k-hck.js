const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
zokou({
  'nomCom': "flirt",
  'reaction': '😅',
  'categorie': 'FUN'
}, async (_0x96fecf, _0x4960ba, _0x392b0f) => {
  const {
    repondre: _0x2846aa,
    arg: _0xcf7a06,
    ms: _0x557cbd
  } = _0x392b0f;
  const _0x3dfb6f = await fetch("https://shizoapi.onrender.com/api/texts/flirt?apikey=");
  const _0xb224c6 = await _0x3dfb6f.json();
  await _0x2846aa(_0xb224c6.result);
  console.log(_0xb224c6.completion);
});
