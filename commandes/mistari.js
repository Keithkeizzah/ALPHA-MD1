const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");

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
    if (!_0x4be2d3 || _0x4be2d3.length === 0) {
      return _0x2a6e71("Please ask a question.");
    }

    const _0x5d0a29 = _0x4be2d3.join(" ");
    const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(_0x5d0a29)}`);
    const _0x4d66b9 = response.data;

    if (_0x4d66b9 && _0x4d66b9.result) {
      const _0x12cd9d = _0x4d66b9.result;
      const _0x29d2ee = _0x12cd9d.match(/```([\s\S]*?)```/);
      const buttons = [{
        'name': "cta_url",
        'buttonParamsJson': JSON.stringify({
          'display_text': "FOLLOW OUR SUPPORT CHANNEL",
          'url': "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
        })
      }];

      if (_0x29d2ee) {
        const _0x5b6d25 = _0x29d2ee[1];
        buttons.unshift({
          'name': "cta_copy",
          'buttonParamsJson': JSON.stringify({
            'display_text': "📋 COPY YOUR CODE",
            'id': "copy_code",
            'copy_code': _0x5b6d25
          })
        });
      }

      const messageContent = {
        'viewOnceMessage': {
          'message': {
            'messageContextInfo': {
              'deviceListMetadata': {},
              'deviceListMetadataVersion': 2
            },
            'interactiveMessage': {
              'body': {
                'text': _0x12cd9d
              },
              'footer': {
                'text': "> *POWERED BY ALPHA-MD*"
              },
              'header': {
                'title': '',
                'subtitle': '',
                'hasMediaAttachment': false
              },
              'nativeFlowMessage': {
                'buttons': buttons
              }
            }
          }
        }
      };

      const message = generateWAMessageFromContent(_0x519f4b, messageContent, {});
      await _0x75f67d.relayMessage(_0x519f4b, message.message, {
        'messageId': message.key.id
      });

    } else {
      throw new Error("Invalid response from the GPT API.");
    }
  } catch (error) {
    console.error("Error getting GPT response:", error.message);
    _0x2a6e71("Error getting response from GPT.");
  }
});
