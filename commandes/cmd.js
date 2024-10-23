const axios = require("axios");
const {
  zokou
} = require(__dirname + "/../framework/zokou");
const {
  format
} = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const runtime = function (_0x499069) {
  _0x499069 = Number(_0x499069);
  var _0x4e8e54 = Math.floor(_0x499069 / 86400);
  var _0x4b87a9 = Math.floor(_0x499069 % 86400 / 3600);
  var _0x314a18 = Math.floor(_0x499069 % 3600 / 60);
  var _0x4c05d4 = Math.floor(_0x499069 % 60);
  var _0xc2f771 = _0x4e8e54 > 0 ? _0x4e8e54 + (_0x4e8e54 == 1 ? " day, " : " d, ") : '';
  var _0x3debf9 = _0x4b87a9 > 0 ? _0x4b87a9 + (_0x4b87a9 == 1 ? " hour, " : " h, ") : '';
  var _0x436fa0 = _0x314a18 > 0 ? _0x314a18 + (_0x314a18 == 1 ? " minute, " : " m, ") : '';
  var _0x204401 = _0x4c05d4 > 0 ? _0x4c05d4 + (_0x4c05d4 == 1 ? " second" : " s") : '';
  return _0xc2f771 + _0x3debf9 + _0x436fa0 + _0x204401;
};
const fetchGitHubStats = async () => {
  try {
    const _0x576808 = await axios.get("https://api.github.com/repos/Beltahtech/SCENE-MD3");
    const _0x487892 = _0x576808.data.forks_count;
    const _0x3eb38d = _0x576808.data.stargazers_count;
    const _0x1c676e = _0x487892 * 2 + _0x3eb38d * 2;
    return {
      'forks': _0x487892,
      'stars': _0x3eb38d,
      'totalUsers': _0x1c676e
    };
  } catch (_0x4acbc3) {
    console.error("Error fetching GitHub stats:", _0x4acbc3);
    return {
      'forks': 0x0,
      'stars': 0x0,
      'totalUsers': 0x0
    };
  }
};
zokou({
  'nomCom': "sing",
  'categorie': "General"
}, async (_0x2a9b4b, _0x1dc443, _0x4fb9c3) => {
  let {
    ms: _0x49e3ce,
    repondre: _0x34fa3c,
    prefixe: _0x5956df,
    nomAuteurMessage: _0x96beef
  } = _0x4fb9c3;
  let {
    cm: _0x3b4a14
  } = require(__dirname + "/../framework/zokou");
  var _0x174852 = {};
  var _0x11b6fb = "public";
  if (s.MODE.toLocaleLowerCase() != "public") {
    _0x11b6fb = "Private";
  }
  _0x3b4a14.map(async (_0x5275c3, _0x5c5acb) => {
    const _0x4c2895 = _0x5275c3.categorie.toUpperCase();
    if (!_0x174852[_0x4c2895]) {
      _0x174852[_0x4c2895] = [];
    }
    _0x174852[_0x4c2895].push(_0x5275c3.nomCom);
  });
  moment.tz.setDefault("Africa/Nairobi");
  const _0x1a368c = moment().format("HH:mm:ss");
  const _0x442c47 = moment().format("DD/MM/YYYY");
  const _0x169ecb = moment().hour();
  let _0x439ae0 = "𝐆𝐨𝐨𝐝 𝐍𝐢𝐠𝐡𝐭 😴 ";
  if (_0x169ecb >= 0 && _0x169ecb <= 11) {
    _0x439ae0 = "𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠 🌄";
  } else {
    if (_0x169ecb >= 12 && _0x169ecb <= 16) {
      _0x439ae0 = "𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧 🌃";
    } else {
      if (_0x169ecb >= 16 && _0x169ecb <= 21) {
        _0x439ae0 = "𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠 ⛅";
      } else if (_0x169ecb >= 21 && _0x169ecb <= 23) {
        _0x439ae0 = "𝐆𝐨𝐨𝐝 𝐍𝐢𝐠𝐡𝐭 😴 ";
      }
    }
  }
  const {
    totalUsers: _0xee3521
  } = await fetchGitHubStats();
  const _0x28b926 = _0xee3521.toLocaleString();
  let _0x27b8ec = "\n> " + _0x439ae0 + " ,*" + _0x96beef + "*\n\n╭─────═[ 𝐒𝐂𝐄𝐍𝐄-𝐌𝐃 ]═─────⊷\n┴╭───────────────···\n⬡│▸ *Owner :* " + s.OWNER_NAME + "\n⬡│▸ *Prefix :* *[ " + s.PREFIXE + " ]*\n⬡│▸ *Time :* " + _0x1a368c + "\n⬡│▸ *Date :* " + _0x442c47 + " \n⬡│▸ *Mode :* " + _0x11b6fb + "\n⬡│▸ *Time Zone :* Africa/Nairobi\n⬡│▸ *Total Users :* 78" + _0x28b926 + " \n⬡│▸ *Ram :* " + format(os.totalmem() - os.freemem()) + '/' + format(os.totalmem()) + " \n⬡│▸ *Uptime :* " + runtime(process.uptime()) + " \n┬╰────────────────···\n╘✦•·············•••••••••···············•••••••••··················•✦\n> 𝐁𝐄𝐋𝐓𝐀𝐇 𝐓𝐄𝐂𝐇 ©𝟐𝟎𝟐𝟒 \n\n> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐁𝐄𝐋𝐓𝐀𝐇 𝐇𝐀𝐂𝐊𝐈𝐍𝐆 𝐓𝐄𝐀𝐌\n" + readmore;
  let _0x4950fb = "*◇𝐒𝐂𝐄𝐍𝐄-𝐌𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒◇*\n";
  const _0x31971e = Object.keys(_0x174852).sort();
  let _0x55246b = 1;
  for (const _0x11d8c6 of _0x31971e) {
    _0x4950fb += "\n*╭──❒⁠⁠⁠⁠ " + _0x11d8c6.toUpperCase() + " ❒⁠⁠⁠⁠━━─⊷*\n│╭────────────";
    const _0x2ca521 = _0x174852[_0x11d8c6].sort();
    for (const _0x5d9a11 of _0x2ca521) {
      _0x4950fb += " \n│ " + _0x55246b++ + ". " + _0x5d9a11;
    }
    _0x4950fb += "\n│╰───────────\n╰══════════════⊷\n";
  }
  _0x4950fb += readmore + "\n𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗙𝗢𝗥 𝗟𝗢𝗩𝗜𝗡𝗚 𝗦𝗖𝗘𝗡𝗘-𝗠𝗗\n";
  try {
    await _0x1dc443.sendMessage(_0x2a9b4b, {
      'text': _0x27b8ec + _0x4950fb,
      'contextInfo': {
        'mentionedJid': [_0x96beef],
        'externalAdReply': {
          'title': "😡𝐁𝐄𝐋𝐓𝐀𝐇 𝐓𝐄𝐂𝐇 𝐁𝐎𝐓𝐒😡",
          'body': "𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐁𝐄𝐋𝐓𝐀𝐇 𝐇𝐀𝐂𝐊𝐈𝐍𝐆 𝐓𝐄𝐀𝐌",
          'thumbnailUrl': "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",
          'sourceUrl': "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
          'mediaType': 0x1,
          'renderLargerThumbnail': true
        }
      }
    });
  } catch (_0x14f7db) {
    console.log("🥵🥵 Menu erreur " + _0x14f7db);
    _0x34fa3c("🥵🥵 Menu erreur " + _0x14f7db);
  }
});
