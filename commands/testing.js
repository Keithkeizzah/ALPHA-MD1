const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
const pkg = require("@whiskeysockets/baileys");
const {
  generateWAMessageFromContent,
  proto
} = pkg;

zokou({
  'nomCom': "testing",
  'aliases': ["gptbard"],
  'categorie': 'AI'
}, async (_0x4f24eb, _0x27f4a8, _0x492252) => {
  const {
    ms: _0xb9b090,
    repondre: _0x4713e9,
    arg: _0xf6258e
  } = _0x492252;
  if (!_0xf6258e[0x0]) {
    _0x4713e9("Please provide a query for Bard. Example: `bard What is the capital of France?`");
    return;
  }
  try {
    await _0x27f4a8.sendMessage(_0x4f24eb, {
      'text': "Interacting with Bard... Please wait a moment."
    }, {
      'quoted': _0xb9b090
    });
    const _0x1b7633 = _0x492252.nomAuteurMessage || "defaultUser";
    const _0x49d701 = _0xf6258e.join(" ");
    const _0x28dd58 = "https://api.guruapi.tech/ai/gpt3?username=" + _0x1b7633 + '&query=' + encodeURIComponent(_0x49d701);
    const _0x381f5c = await fetch(_0x28dd58);
    const _0x5c94fd = await _0x381f5c.json();
    if (!_0x5c94fd.msg) {
      _0x4713e9("No response received from Bard. Please try again later.");
      return;
    }
    const _0x5013c0 = _0x5c94fd.msg;
    const _0x5294e2 = [{
      'name': 'cta_url',
      'buttonParamsJson': JSON.stringify({
        'display_text': "FOLLOW OUR SUPPORT  CHANNEL",
        'url': "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
      })
    }];
    const _0x38e3dc = generateWAMessageFromContent(_0x4f24eb, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': {
            'deviceListMetadata': {},
            'deviceListMetadataVersion': 0x2
          },
          'interactiveMessage': proto.Message.InteractiveMessage.create({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': _0x5013c0
            }),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': "> *POWERED BY ALPHA-MD*"
            }),
            'header': proto.Message.InteractiveMessage.Header.create({
              'title': '',
              'subtitle': '',
              'hasMediaAttachment': false
            }),
            'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
              'buttons': _0x5294e2
            })
          })
        }
      }
    }, {});
    await _0x27f4a8.relayMessage(_0x4f24eb, _0x38e3dc.message, {
      'messageId': _0x38e3dc.key.id
    });
  } catch (_0x4237ef) {
    _0x4713e9("A fatal error has occurred... \n " + _0x4237ef.message);
  }
});
