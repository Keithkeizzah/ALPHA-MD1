const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
zokou({
  'nomCom': "pickupline",
  'reaction': '💫',
  'categorie': "FUN"
}, async (_0x50a2f3, _0x22193f, _0x37bde5) => {
  const {
    repondre: _0x1358da,
    arg: _0x1891cd,
    ms: _0x32f549
  } = _0x37bde5;
  const _0x1b2d46 = await fetch("https://api.popcat.xyz/pickuplines");
  const _0x3b4ebd = await _0x1b2d46.json();
  await _0x1358da(_0x3b4ebd.result);
  console.log(_0x3b4ebd.completion);
});
