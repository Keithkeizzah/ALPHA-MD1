const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
zokou({
 "nomCom": "mistari",
  "reaction": '📡',
  "categorie": 'IA',
  "desc": "Chatgpt Ai , ask him question and request"
};
a19_0x336d04(a19_0x4f8cc1, async (_0x1d53cf, _0x59fd2e, _0x31195a) => {
  const {
    repondre: _0x4ebdd5,
    arg: _0x4c09f8,
    ms: _0xe571e4
  } = _0x31195a;
  try {
    if (!_0x4c09f8 || _0x4c09f8.length === 0x0) {
      return _0x4ebdd5("Please ask a question.");
    }
    const _0x4aea88 = _0x4c09f8.join(" ");
    const _0x19c26e = await a19_0x17eeb6.get("https://api.cafirexos.com/api/chatgpt?text=" + encodeURI(_0x4aea88) + "&name=Kaizoku&prompt=" + encodeURI("You are an Whatsapp bot AI called ALPHA-MD"));
    const _0x16c257 = _0x19c26e.data;
    if (_0x16c257) {
      _0x4ebdd5(_0x16c257.resultado);
    } else {
      _0x4ebdd5("Error during response generation.");
    }
  } catch (_0x7900d6) {
    console.error("Erreur:", _0x7900d6.message || "Une erreur s'est produite");
    _0x4ebdd5("Oops, an error occurred while processing your request.");
  }
});
