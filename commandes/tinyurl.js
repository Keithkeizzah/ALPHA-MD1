const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
const {
  ndown
} = require('nayan-media-downloader');
const goat = require("api-dylux");
const {
  mediafireDl
} = require("../framework/dl/Function");
zokou({
  'nomCom': "gdrive",
  'reaction': '🗼',
  'categorie': 'Download'
}, async (_0x57a607, _0x130367, _0x2e4136) => {
  const {
    ms: _0x4e04bd,
    repondre: _0x3922ef,
    arg: _0x2580ea
  } = _0x2e4136;
  const _0xcd0660 = _0x2580ea.join(" ");
  if (!_0xcd0660) {
    return _0x3922ef("Please insert a Google Drive link!");
  }
  if (!_0xcd0660.includes('drive.google.com')) {
    return _0x3922ef("That is not a Google Drive link!");
  }
  try {
    const _0x6db48e = await fetch("https://api-smd.onrender.com/api/gdrive?url=" + _0xcd0660);
    if (!_0x6db48e.ok) {
      throw new Error("Network response was not ok.");
    }
    const _0x5d51f9 = await _0x6db48e.json();
    await _0x3922ef("*ALPHA-MD* is downloading media from Google Drive. Please wait...");
    if (_0x5d51f9 && _0x5d51f9.downloadUrl) {
      const _0x220152 = _0x5d51f9.downloadUrl;
      const _0x517f02 = _0x5d51f9.mimetype.split('/')[0x0];
      if (_0x517f02 === "audio" || _0x517f02 === "video" || _0x517f02 === "image") {
        await _0x130367.sendMessage(_0x57a607, {
          [_0x517f02]: {
            'url': _0x220152
          },
          'caption': '*' + _0x5d51f9.fileName + "*\n\n> *POWERED BY ALPHA-MD*"
        }, {
          'quoted': _0x4e04bd
        });
      } else {
        const _0x17bad4 = _0x5d51f9.fileName.split('.').pop();
        await _0x130367.sendMessage(_0x57a607, {
          'document': {
            'url': _0x220152,
            'filename': _0x5d51f9.fileName
          },
          'caption': _0x17bad4.toUpperCase() + ": *" + _0x5d51f9.fileName + "*\n\n> *POWERED BY ALPHA-MD*"
        }, {
          'quoted': _0x4e04bd
        });
      }
    } else {
      await _0x3922ef("Failed to retrieve the media. Please try again later.");
    }
  } catch (_0x558608) {
    console.error("Error fetching media:", _0x558608);
    await _0x3922ef("Failed to retrieve the media. Please try again later.");
  }
});
zokou({
  'nomCom': "fetch",
  'categorie': "Search",
    'reaction': '🗼',
}, async (_0x34e935, _0x726ab, _0x295c2d) => {
  const {
    ms: _0x449a3e,
    repondre: _0x356671,
    arg: _0x3dfafe
  } = _0x295c2d;
  let _0x5d7675 = _0x3dfafe.join(" ");
  if (!/^https?:\/\//.test(_0x5d7675)) {
    return _0x356671("Start the *URL* with http:// or https://");
  }
  try {
    const _0x2cc4d4 = new URL(_0x5d7675);
    const _0x13de0d = '' + _0x2cc4d4.origin + _0x2cc4d4.pathname + '?' + _0x2cc4d4.searchParams.toString();
    const _0x1ec58c = await fetch(_0x13de0d);
    if (!_0x1ec58c.ok) {
      return _0x356671("Failed to fetch the URL. Status: " + _0x1ec58c.status + " " + _0x1ec58c.statusText);
    }
    const _0x129025 = _0x1ec58c.headers.get('content-length');
    if (_0x129025 && parseInt(_0x129025) > 104857600) {
      return _0x356671("Content-Length exceeds the limit: " + _0x129025);
    }
    const _0x2730c2 = _0x1ec58c.headers.get('content-type');
    console.log('Content-Type:', _0x2730c2);
    if (/image\/.*/.test(_0x2730c2)) {
      await _0x726ab.sendMessage(_0x34e935, {
        'image': {
          'url': _0x13de0d
        },
        'caption': "> > *POWERED BY ALPHA-MD*"
      }, {
        'quoted': _0x449a3e
      });
      return;
    } else {
      if (/video\/.*/.test(_0x2730c2)) {
        await _0x726ab.sendMessage(_0x34e935, {
          'video': {
            'url': _0x13de0d
          },
          'caption': "> > *POWERED BY ALPHA-MD*"
        }, {
          'quoted': _0x449a3e
        });
        return;
      } else {
        if (/text|json/.test(_0x2730c2)) {
          let _0x52b911 = Buffer.from(await _0x1ec58c.arrayBuffer());
          try {
            const _0x3cc237 = JSON.parse(_0x52b911);
            console.log("Parsed JSON:", _0x3cc237);
            _0x52b911 = JSON.stringify(_0x3cc237, null, 0x2);
          } catch (_0x4de044) {
            console.error("Error parsing JSON:", _0x4de044);
            _0x52b911 = _0x52b911.toString();
          } finally {
            _0x356671(_0x52b911.slice(0x0, 0x10000));
          }
        } else {
          await _0x726ab.sendMessage(_0x34e935, {
            'document': {
              'url': _0x13de0d
            },
            'caption': "> > *POWERED BY ALPHA-MD*"
          }, {
            'quoted': _0x449a3e
          });
        }
      }
    }
  } catch (_0x334d2e) {
    console.error("Error fetching data:", _0x334d2e.message);
    _0x356671("Error fetching data: " + _0x334d2e.message);
  }
});
