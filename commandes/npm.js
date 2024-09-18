const { zokou } = require('../framework/zokou');
const axios = require("axios")
zokou({
  'nomCom': "npm",
  'categorie': 'Search',
  'aliases': ['npmstalk', 'npstalk', "pmstalk"]
}, async (_0xbde2f6, _0x19a172, _0x21b91b) => {
  const {
    ms: _0x5ef25f,
    repondre: _0x1103bb,
    arg: _0x36ee25
  } = _0x21b91b;
  const _0x2d1eac = _0x36ee25.join(" ");
  if (!_0x2d1eac) {
    return _0x1103bb("Please provide a package name to search for.");
  }
  try {
    const _0x2c80f0 = "https://api.prabath-md.tech/api/npmsearch?q=" + encodeURIComponent(_0x2d1eac);
    const _0x4fbe6c = await axios.get(_0x2c80f0);
    const _0x2ecb21 = _0x4fbe6c.data;
    if (_0x2ecb21 && _0x2ecb21.data && _0x2ecb21.data.data) {
      const {
        name: _0x1a065d,
        description: _0xa0741,
        version: _0x1f8f89,
        packageLink: _0x3ca668,
        downloadLink: _0x42c30e,
        publishedDate: _0x669dfa,
        owner: _0x4dde79,
        homepage: _0x2cd9f9,
        license: _0x5e5a75,
        readme: _0xfb2d79
      } = _0x2ecb21.data.data;
      const _0x50bbfd = "*ALPHA-MD NPM STALKER*:\n\n" + ("*Name:* " + _0x1a065d + "\n*Owner:* " + _0x4dde79 + "\n*Version:* " + _0x1f8f89 + "\n") + ("*Published:* " + _0x669dfa + "\n*Description:* " + _0xa0741 + "\n") + ("*Package Link:* " + _0x3ca668 + "\n*Download Link:* " + _0x42c30e + "\n") + ("*Homepage:* " + _0x2cd9f9 + "\n*License:* " + _0x5e5a75 + "\n") + ("*Readme:* " + (_0xfb2d79 || 'N/A') + "\n\n*_POWERED BY ALPHA-MD_*");
      await _0x19a172.sendMessage(_0xbde2f6, {
        'text': _0x50bbfd
      }, {
        'quoted': _0x5ef25f
      });
    } else {
      throw new Error("Invalid response from the API.");
    }
  } catch (_0x43e5ec) {
    console.error("Error getting API response:", _0x43e5ec.message);
    await _0x1103bb("Error getting response from the API.");
  }
});
