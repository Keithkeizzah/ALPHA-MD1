const goat = require("api-dylux");
const {
  zokou
} = require("../framework/zokou");
zokou({
  'nomCom': "instastalk",
  'aliases': ["igstalk"],
  'reaction': '📷',
  'categorie': "STALKERS"
}, async (_0x1586d0, _0xf413a6, _0x5c156a) => {
  const {
    repondre: _0x3dfa33,
    prefixe: _0x33b470,
    arg: _0x80864c,
    ms: _0x2975a2
  } = _0x5c156a;
  const _0x3b4855 = _0x80864c.join(" ");
  if (!_0x3b4855) {
    return _0x3dfa33("Give me a valid Instagram username like: " + _0x33b470 + "instastalk keizzah_keith");
  }
  try {
    let _0xbbc48c = await fetch("https://www.noobs-api.000.pe/dipto/instainfo?username=" + encodeURIComponent(_0x3b4855));
    let _0x7b04fd = await _0xbbc48c.json();
    if (!_0x7b04fd.data || !_0x7b04fd.data.user_info) {
      return _0x3dfa33("Couldn't fetch the data for username: " + _0x3b4855 + ". Please check the username and try again.");
    }
    let _0x43d07f = _0x7b04fd.data.user_info;
    let _0x14feb0 = "\n┌──「 *ALPHA INSTAGRAM STALK* \n▢ *🔖Name:* " + (_0x43d07f.full_name || 'Unknown') + "\n▢ *🔖Username:* " + (_0x43d07f.username || "Unknown") + "\n▢ *👥Followers:* " + (_0x43d07f.followers || 'Unknown') + "\n▢ *🫂Following:* " + (_0x43d07f.following || "Unknown") + "\n▢ *📌Bio:* " + (_0x43d07f.biography || "No Bio") + "\n▢ *🔗 External Link:* " + (_0x43d07f.external_url || "No Link") + "\n\n▢ *🔗 Profile Link:* https://instagram.com/" + (_0x43d07f.username || "unknown") + "\n└────────────";
    await _0xf413a6.sendMessage(_0x1586d0, {
      'image': {
        'url': _0x43d07f.profile_pic_url
      },
      'caption': _0x14feb0
    }, {
      'quoted': _0x2975a2
    });
  } catch (_0x5969df) {
    return _0x3dfa33("Error: " + _0x5969df.toString());
  }
});
