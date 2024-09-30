const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
zokou({
  'nomCom': "chat",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x519f4b, _0x75f67d, _0x1ec287) => {
  const {
    repondre: _0x2a6e71,
    arg: _0x4be2d3,
    ms: _0xc63a20
  } = _0x1ec287;
  try {
    if (!_0x4be2d3 || _0x4be2d3.length === 0x0) {
      return _0x2a6e71("Please ask a question.");
    }
    const _0x5d0a29 = _0x4be2d3.join(" ");
    const _0x351572 = await fetch(https://hercai.onrender.com/v3/hercai?question=" + _0x3bd168);
    const _0x4d66b9 = await _0x351572.json();
    if (_0x4d66b9 && _0x4d66b9.result) {
      const _0x12cd9d = _0x4d66b9.result;
      const _0x29d2ee = _0x12cd9d.match(/```([\s\S]*?)```/);
      const _0x18ee4a = [{
        'name': "cta_url",
        'buttonParamsJson': JSON.stringify({
          'display_text': "FOLLOW OUR SUPPORT CHANNEL",
          'url': "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
        })
      }];
      if (_0x29d2ee) {
        const _0x5b6d25 = _0x29d2ee[0x1];
        _0x18ee4a.unshift({
          'name': "cta_copy",
          'buttonParamsJson': JSON.stringify({
            'display_text': "📋 COPY YOUR CODE",
            'id': "copy_code",
            'copy_code': _0x5b6d25
          })
        });
        const _0x272274 = generateWAMessageFromContent(_0x519f4b, {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadata': {},
                'deviceListMetadataVersion': 0x2
              },
              'interactiveMessage': proto.Message.InteractiveMessage.create({
                'body': proto.Message.InteractiveMessage.Body.create({
                  'text': _0x12cd9d
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
                  'buttons': _0x18ee4a
                })
              })
            }
          }
        }, {});
        await _0x75f67d.relayMessage(_0x519f4b, _0x272274.message, {
          'messageId': _0x272274.key.id
        });
      } else {
        const _0x3f8b3f = generateWAMessageFromContent(_0x519f4b, {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadata': {},
                'deviceListMetadataVersion': 0x2
              },
              'interactiveMessage': proto.Message.InteractiveMessage.create({
                'body': proto.Message.InteractiveMessage.Body.create({
                  'text': _0x12cd9d
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
                  'buttons': _0x18ee4a
                })
              })
            }
          }
        }, {});
        await _0x75f67d.relayMessage(_0x519f4b, _0x3f8b3f.message, {
          'messageId': _0x3f8b3f.key.id
        });
      }
    } else {
      throw new Error("Invalid response from the GPT API.");
    }
  } catch (_0x1a7921) {
    console.error("Error getting GPT response:", _0x1a7921.message);
    _0x2a6e71("Error getting response from GPT.");
  }
});
