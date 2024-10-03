const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");
zokou({
  'nomCom': "lyric",
  'reaction': '✨',
  'categorie': "Search"
}, async (_0x2c525a, _0x320466, _0x2b4e5d) => {
  const {
    repondre: _0x4f14e6,
    arg: _0x38e2b0,
    ms: _0x2552bf
  } = _0x2b4e5d;
  try {
    if (!_0x38e2b0 || _0x38e2b0.length === 0) {
      return _0x4f14e6("please provide me the song name");
    }
    const _0x7cc1aa = _0x38e2b0.join(" ");
    const _0x2ea02b = await Client.songs.search(_0x7cc1aa);
    const _0x18db38 = _0x2ea02b[0];
    console.log(_0x18db38);
    const _0xf7fa0f = await _0x18db38.lyrics();
    const _0x293b10 = await _0x18db38.artist.name;
    const _0x50fc19 = await _0x18db38.title;
    const _0x1020ca = "*ALPHA-MD LYRICS FINDER*\n\n*TITLE* - " + _0x50fc19 + "\n\n*ARTIST* - " + _0x293b10 + "\n\n" + _0xf7fa0f;
    await _0x320466.sendMessage(_0x2c525a, {
      'image': {
        'url': "./media/lyrics.jpg"
      },
      'caption': _0x1020ca
    }, {
      'quoted': _0x2552bf
    });
  } catch (_0x249c4f) {
    _0x4f14e6("Error occured" + _0x249c4f);
    console.log(_0x249c4f);
  }
});
