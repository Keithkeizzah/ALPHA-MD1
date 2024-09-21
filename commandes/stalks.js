const goat = require("api-dylux");
const { zokou } = require("../framework/zokou");

zokou({
  'nomCom': "instastalk",
  'reaction': '📷',
  'categorie': "STALKERS"
}, async (_0x1586d0, _0xf413a6, _0x5c156a) => {
  const {
    repondre: _0x3dfa33,
    prefixe: _0x33b470,
    arg: _0x80864c,
    ms: _0x2975a2
  } = _0x5c156a;

  const username = _0x80864c.join(" ");
  if (!username) {
    return _0x3dfa33("Please provide a valid Instagram username like: " + _0x33b470 + "instastalk keizzah_keith");
  }

  try {
    const response = await fetch(`https://www.noobs-api.000.pe/dipto/instainfo?username=${encodeURIComponent(username)}`);
    const data = await response.json();

    if (!data.data || !data.data.user_info) {
      return _0x3dfa33("Couldn't fetch the data for username: " + username + ". Please check the username and try again.");
    }

    const userInfo = data.data.user_info;
    const message = `
┌──「 *ALPHA INSTAGRAM STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || "Unknown"}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || "Unknown"}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://instagram.com/${userInfo.username || "unknown"}
└────────────`;

    await _0xf413a6.sendMessage(_0x1586d0, {
      'image': {
        'url': userInfo.profile_pic_url
      },
      'caption': message
    }, {
      'quoted': _0x2975a2
    });
  } catch (error) {
    return _0x3dfa33("Error: " + error.toString());
  }
});
