const {
  keith
} = require("../keizzah/keith");
const {
  Sticker,
  StickerTypes
} = require('wa-sticker-formatter');
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require("../bdd/antilien");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require("../bdd/antibot");
const {
  search,
  download
} = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require('../set');
const {
  default: axios
} = require("axios");
const {
  getBinaryNodeChild,
  getBinaryNodeChildren
} = require('@whiskeysockets/baileys')['default'];
keith({
  'nomCom': 'broadcast',
  'aliase': 'spread'
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x25a3a1, _0x4ca26d, _0xb76e62) => {
  const {
    ms: _0x10bf11,
    repondre: _0x3db4c2,
    arg: _0x541a09,
    verifGroupe: _0x598510,
    nomGroupe: _0x3da248,
    infosGroupe: _0x4924a2,
    nomAuteurMessage: _0x44197a,
    verifAdmin: _0x338b7e,
    superUser: _0x4b247e
  } = _0xb76e62;
  let _0x42cf53 = _0x541a09.join(" ");
  if (!_0x541a09[0x0]) {
    _0x3db4c2("After the command *broadcast*, type your message to be sent to all groups you are in.");
    return;
  }
  if (!_0x4b247e) {
    _0x3db4c2("You are too weak To do that");
    return;
  }
  ;
  let _0x4a4d79 = await _0x4ca26d.groupFetchAllParticipating();
  let _0x4dfd72 = Object.entries(_0x4a4d79).slice(0x0).map(_0x39537f => _0x39537f[0x1]);
  let _0x4d59bc = _0x4dfd72.map(_0x58bd9f => _0x58bd9f.id);
  await _0x3db4c2("*ALPHA-MD is sending your message to all groups ,,,💀*...");
  for (let _0x4a7237 of _0x4d59bc) {
    let _0x4c32d4 = "*🌟𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓🌟*\n\n🀄 Message: " + _0x42cf53 + "\n\n🗣️ Author: " + _0x44197a;
    await _0x4ca26d.sendMessage(_0x4a7237, {
      'image': {
        'url': 'https://i.imgur.com/HDLN3If.jpeg'
      },
      'caption': '' + _0x4c32d4
    });
  }
});
keith({
  'nomCom': "disap-off",
  'categorie': "Group",
  'reaction': '㋛'
}, async (_0x262dd9, _0x12d2a0, _0x2267ba) => {
  const {
    ms: _0x39fb55,
    repondre: _0x131746,
    arg: _0x1d9fed,
    verifGroupe: _0x5cfe2f,
    nomGroupe: _0x1e4532,
    infosGroupe: _0x430868,
    nomAuteurMessage: _0x181353,
    verifAdmin: _0x5693df,
    superUser: _0x8b2e8c
  } = _0x2267ba;
  if (!_0x5cfe2f) {
    _0x131746("This command works in groups only");
    return;
  }
  ;
  if (!_0x5693df) {
    _0x131746("You are not an admin here!");
    return;
  }
  ;
  await _0x12d2a0.groupToggleEphemeral(_0x262dd9, 0);
  _0x131746("Dissapearing messages successfully turned off!");
});
keith({
  'nomCom': 'disap',
  'categorie': "Group",
  'reaction': '❦'
}, async (_0x29075f, _0x4d6f5e, _0x37e54b) => {
  const {
    ms: _0x30a567,
    repondre: _0x1ba525,
    arg: _0x26dd60,
    verifGroupe: _0x25e082,
    nomGroupe: _0x141eb3,
    infosGroupe: _0x3cbbf1,
    nomAuteurMessage: _0x20d4df,
    verifAdmin: _0x4b5df4,
    superUser: _0x445411
  } = _0x37e54b;
  if (!_0x25e082) {
    _0x1ba525("This command works in groups only");
    return;
  }
  ;
  if (!_0x4b5df4) {
    _0x1ba525("You are not an admin here!");
    return;
  }
  ;
  _0x1ba525("*Do you want to turn on disappearing messages?*\n\nIf yes type _*disap1* for messages to disappear after 1 day._\n_or *disap7* for messages to disappear after 7 days._\n_or *disap90* for messages to disappear after 90 days._\n\n To turn in off, type *disap-off*");
});
keith({
  'nomCom': 'req',
  'alias': 'requests'
  'categorie': "Group",
  'reaction': "⚪ "
}, async (_0x11db5d, _0x5cfd34, _0x2511c5) => {
  const {
    ms: _0x313745,
    repondre: _0x4536a6,
    arg: _0x41a716,
    verifGroupe: _0x1115e4,
    nomGroupe: _0x22f456,
    infosGroupe: _0x55c9f2,
    nomAuteurMessage: _0x29e6b0,
    verifAdmin: _0x12a8cf,
    superUser: _0x5695e8
  } = _0x2511c5;
  if (!_0x1115e4) {
    _0x4536a6("This command works in groups only");
    return;
  }
  ;
  if (!_0x12a8cf) {
    _0x4536a6("You are not an admin here, what will you do if there are pending requests?!");
    return;
  }
  ;
  const _0x13892e = await _0x5cfd34.groupRequestParticipantsList(_0x11db5d);
  if (_0x13892e.length === 0x0) {
    return _0x4536a6("there are no pending join requests.");
  }
  let _0xa0d26e = '';
  _0x13892e.forEach((_0x50dd53, _0x56b384) => {
    _0xa0d26e += '+' + _0x50dd53.jid.split('@')[0x0];
    if (_0x56b384 < _0x13892e.length - 0x1) {
      _0xa0d26e += "\n";
    }
  });
  _0x5cfd34.sendMessage(_0x11db5d, {
    'text': "Pending Participants:- 🕓\n" + _0xa0d26e + "\n\nUse the command approve or reject to approve or reject these join requests."
  });
  respondre(_0xa0d26e);
});
keith({
  'nomCom': 'reject',
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x435ba3, _0x26953d, _0x109244) => {
  const {
    ms: _0xda1c2a,
    repondre: _0x516422,
    arg: _0x3eefb4,
    verifGroupe: _0xbbcad,
    nomGroupe: _0x2f0b6f,
    infosGroupe: _0x338e54,
    nomAuteurMessage: _0xae28cf,
    verifAdmin: _0x360eaa,
    superUser: _0x3364b8
  } = _0x109244;
  if (!_0xbbcad) {
    _0x516422("This command works in groups only");
    return;
  }
  ;
  if (!_0x360eaa) {
    _0x516422("You are not an admin here!");
    return;
  }
  ;
  const _0x3a30b7 = await _0x26953d.groupRequestParticipantsList(_0x435ba3);
  if (_0x3a30b7.length === 0x0) {
    return _0x516422("there are no pending join requests for this group.");
  }
  for (const _0x494480 of _0x3a30b7) {
    const _0x86d56 = await _0x26953d.groupRequestParticipantsUpdate(_0x435ba3, [_0x494480.jid], "reject");
    console.log(_0x86d56);
  }
  _0x516422("all pending join requests have been rejected.");
});
keith({
  'nomCom': "disap90",
  'categorie': 'Group',
  'reaction': '⚪'
}, async (_0x10302b, _0x47006b, _0x58f2e6) => {
  const {
    ms: _0x802fba,
    repondre: _0x24b534,
    arg: _0x4eec8c,
    verifGroupe: _0x14063a,
    nomGroupe: _0x56a57b,
    infosGroupe: _0xbe73cf,
    nomAuteurMessage: _0x80bfe0,
    verifAdmin: _0x13a9b9,
    superUser: _0x35f6dd
  } = _0x58f2e6;
  if (!_0x14063a) {
    _0x24b534("This command works in groups only");
    return;
  }
  ;
  if (!_0x13a9b9) {
    _0x24b534("You are not an admin here!");
    return;
  }
  ;
  await _0x47006b.groupToggleEphemeral(_0x10302b, 7776000);
  _0x10302b("Dissapearing messages successfully turned on for 90 days!");
});
keith({
  'nomCom': "disap7",
  'categorie': 'Group',
  'reaction': '⚪'
}, async (_0x29ba75, _0x3f34c8, _0x2c32dd) => {
  const {
    ms: _0x3b41fc,
    repondre: _0x2dde00,
    arg: _0x1b6cf5,
    verifGroupe: _0x2d4b84,
    nomGroupe: _0x48bd08,
    infosGroupe: _0x1fd3f7,
    nomAuteurMessage: _0xd6a6b6,
    verifAdmin: _0x5bee0c,
    superUser: _0x16db8f
  } = _0x2c32dd;
  if (!_0x2d4b84) {
    _0x2dde00("This command works in groups only");
    return;
  }
  ;
  if (!_0x5bee0c) {
    _0x2dde00("You are not an admin here!");
    return;
  }
  ;
  await _0x3f34c8.groupToggleEphemeral(_0x29ba75, 604800);
  _0x29ba75("Dissapearing messages successfully turned on for 7 days!");
});
keith({
  'nomCom': "disap1",
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x587965, _0x5ac338, _0x108b07) => {
  const {
    ms: _0x4af22a,
    repondre: _0x36f4ac,
    arg: _0x3e4926,
    verifGroupe: _0x7fca8c,
    nomGroupe: _0x597cb6,
    infosGroupe: _0xcdd96,
    nomAuteurMessage: _0x46ab38,
    verifAdmin: _0xd09583,
    superUser: _0xe6ea6c
  } = _0x108b07;
  if (!_0x7fca8c) {
    _0x36f4ac("This command works in groups only");
    return;
  }
  ;
  if (!_0xd09583) {
    _0x36f4ac("You are not an admin here!");
    return;
  }
  ;
  await _0x5ac338.groupToggleEphemeral(_0x587965, 86400);
  _0x587965("Dissapearing messages successfully turned on for 24 hours");
});
keith({
  'nomCom': "approve",
  'categorie': "Group",
  'reaction': "⚪"
}, async (_0x4a24cd, _0x970a90, _0x4e7e09) => {
  const {
    ms: _0x2eca6c,
    repondre: _0x365df1,
    arg: _0x5a6af5,
    verifGroupe: _0x5d9204,
    nomGroupe: _0x2643a9,
    infosGroupe: _0x49544a,
    nomAuteurMessage: _0x2d520a,
    verifAdmin: _0x190c4d,
    superUser: _0x56e758
  } = _0x4e7e09;
  if (!_0x5d9204) {
    _0x365df1("This command works in groups only");
    return;
  }
  ;
  if (!_0x190c4d) {
    _0x365df1("You are not an admin here!");
    return;
  }
  ;
  const _0x263027 = await _0x970a90.groupRequestParticipantsList(_0x4a24cd);
  if (_0x263027.length === 0x0) {
    return _0x365df1("there are no pending join requests.");
  }
  for (const _0x22bb31 of _0x263027) {
    const _0x3e1b92 = await _0x970a90.groupRequestParticipantsUpdate(_0x4a24cd, [_0x22bb31.jid], "approve");
    console.log(_0x3e1b92);
  }
  _0x365df1("all pending participants have been approved to join.");
});
keith({
  'nomCom': 'vcf',
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x552a48, _0x8eb429, _0x3ae9ad) => {
  const {
    ms: _0x1c4af5,
    repondre: _0x5d8bda,
    arg: _0x52a421,
    verifGroupe: _0x1918da,
    nomGroupe: _0x1b48c6,
    infosGroupe: _0x336530,
    nomAuteurMessage: _0x5c957f,
    verifAdmin: _0x4872c5,
    superUser: _0x381dfa
  } = _0x3ae9ad;
  if (!_0x4872c5) {
    _0x5d8bda("You are not an admin here!");
    return;
  }
  ;
  if (!_0x1918da) {
    _0x5d8bda("This command works in groups only");
    return;
  }
  ;
  let _0x4b4d52 = await _0x8eb429.groupMetadata(_0x552a48);
  let _0x4b1805 = "Alpha";
  let _0x218bcd = 0x0;
  for (let _0x29379e of _0x4b4d52.participants) {
    _0x4b1805 += "BEGIN:VCARD\nVERSION:3.0\nFN:[" + _0x218bcd++ + "] +" + _0x29379e.id.split('@')[0x0] + "\nTEL;type=CELL;type=VOICE;waid=" + _0x29379e.id.split('@')[0x0] + ':+' + _0x29379e.id.split('@')[0x0] + "\nEND:VCARD\n";
  }
  await _0x5d8bda("A moment, *ALPHA-MD* Is compiling " + _0x4b4d52.participants.length + " contacts into a vcf...");
  await fs.writeFileSync('./contacts.vcf', _0x4b1805.trim());
  await _0x8eb429.sendMessage(_0x552a48, {
    'document': fs.readFileSync('./contacts.vcf'),
    'mimetype': 'text/vcard',
    'fileName': '' + _0x4b4d52.subject + ".Vcf",
    'caption': "VCF for " + _0x4b4d52.subject + "\nTotal Contacts: " + _0x4b4d52.participants.length + "\n*KEEP USING ALPHA-MD*"
  }, {
    'ephemeralExpiration': 0x15180,
    'quoted': _0x1c4af5
  });
  fs.unlinkSync('./contacts.vcf');
});
keith({
  'nomCom': 'tagall',
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x4d8a34, _0x165efa, _0x61bc9c) => {
  const {
    ms: _0x4b829a,
    repondre: _0x37dec7,
    arg: _0x587542,
    verifGroupe: _0x18b736,
    nomGroupe: _0x535639,
    infosGroupe: _0x348c6f,
    nomAuteurMessage: _0x59495c,
    verifAdmin: _0x5cc612,
    superUser: _0x325d10
  } = _0x61bc9c;
  if (!_0x18b736) {
    _0x37dec7("✋🏿 ✋🏿this command works in groups only idiot❌");
    return;
  }
  if (!_0x587542 || _0x587542 === " ") {
    mess = "Aucun Message";
  } else {
    mess = _0x587542.join(" ");
  }
  ;
  let _0xc5206e = _0x18b736 ? await _0x348c6f.participants : '';
  var _0x33fb9e = '';
  _0x33fb9e += "========================\n  \n        ✨ *ALPHA-MD* ✨\n========================\n\n👥 Group : " + _0x535639 + " 🚀 \n👤 Author : *" + _0x59495c + "* 👋 \n📜 Message : *" + mess + "* 📝\n========================\n\n\n\n\n";
  let _0x2f96b1 = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
  let _0x41942c = Math.floor(Math.random() * (_0x2f96b1.length - 0x1));
  for (const _0x25def8 of _0xc5206e) {
    _0x33fb9e += _0x2f96b1[_0x41942c] + "      @" + _0x25def8.id.split('@')[0x0] + "\n";
  }
  if (_0x5cc612 || _0x325d10) {
    _0x165efa.sendMessage(_0x4d8a34, {
      'text': _0x33fb9e,
      'mentions': _0xc5206e.map(_0x5eca31 => _0x5eca31.id)
    }, {
      'quoted': _0x4b829a
    });
  } else {
    _0x37dec7("command reserved for admins");
  }
});
keith({
  'nomCom': "invite",
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x1b7bb7, _0x440dff, _0x46f6d8) => {
  const {
    repondre: _0x346ab8,
    nomGroupe: _0x3eee14,
    nomAuteurMessage: _0x538a0c,
    verifGroupe: _0x146a8b
  } = _0x46f6d8;
  if (!_0x146a8b) {
    _0x346ab8("wait bro , you want the link to my dm?");
    return;
  }
  ;
  var _0x5e1ceb = await _0x440dff.groupInviteCode(_0x1b7bb7);
  var _0x2da87f = "https://chat.whatsapp.com/" + _0x5e1ceb;
  let _0x24f1e0 = "Hello " + _0x538a0c + " , here is the group link of " + _0x3eee14 + " \n\n\nClick Here To Join :" + _0x2da87f;
  _0x346ab8(_0x24f1e0);
});
keith({
  'nomCom': "promote",
  'categorie': "Group",
  'reaction': "⚪"
}, async (_0x3c0734, _0xdb7cf, _0x5b4b94) => {
  let {
    repondre: _0xb390a3,
    msgRepondu: _0x492e43,
    infosGroupe: _0x3abc48,
    auteurMsgRepondu: _0x581c2d,
    verifGroupe: _0x582b30,
    auteurMessage: _0x501047,
    superUser: _0x234f00,
    idBot: _0x2eebd9
  } = _0x5b4b94;
  let _0x3ec438 = _0x582b30 ? await _0x3abc48.participants : '';
  if (!_0x582b30) {
    return _0xb390a3("For groups only");
  }
  const _0x223957 = _0x218ffe => {
    for (const _0x43db8d of _0x3ec438) {
      if (_0x43db8d.id !== _0x218ffe) {
        continue;
      } else {
        return true;
      }
    }
  };
  const _0x16d1d8 = _0x549a30 => {
    let _0x209ef2 = [];
    for (m of _0x549a30) {
      if (m.admin == null) {
        continue;
      }
      _0x209ef2.push(m.id);
    }
    return _0x209ef2;
  };
  const _0x4db1ea = _0x582b30 ? _0x16d1d8(_0x3ec438) : '';
  let _0x43fbcb = _0x582b30 ? _0x4db1ea.includes(_0x581c2d) : false;
  let _0x2c0737 = _0x223957(_0x581c2d);
  let _0x576c53 = _0x582b30 ? _0x4db1ea.includes(_0x501047) : false;
  zkad = _0x582b30 ? _0x4db1ea.includes(_0x2eebd9) : false;
  try {
    if (_0x576c53 || _0x234f00) {
      if (_0x492e43) {
        if (zkad) {
          if (_0x2c0737) {
            if (_0x43fbcb == false) {
              var _0x26092a = "🎊🍾  @" + _0x581c2d.split('@')[0x0] + " Has been promoted as a group Admin.";
              await _0xdb7cf.groupParticipantsUpdate(_0x3c0734, [_0x581c2d], 'promote');
              _0xdb7cf.sendMessage(_0x3c0734, {
                'text': _0x26092a,
                'mentions': [_0x581c2d]
              });
            } else {
              return _0xb390a3("This member is already an administrator of the group.");
            }
          } else {
            return _0xb390a3("This user is not part of the group.");
          }
        } else {
          return _0xb390a3("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        _0xb390a3("please tag the member to be nominated");
      }
    } else {
      return _0xb390a3("Sorry I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (_0x4fab96) {
    _0xb390a3("oups " + _0x4fab96);
  }
});
keith({
  'nomCom': "demote",
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x376c53, _0x19813a, _0x143d9c) => {
  let {
    repondre: _0x2e28f2,
    msgRepondu: _0x1f6836,
    infosGroupe: _0x5c12c3,
    auteurMsgRepondu: _0xa68eea,
    verifGroupe: _0x2ec8fd,
    auteurMessage: _0x4ba449,
    superUser: _0x130d05,
    idBot: _0x3ed330
  } = _0x143d9c;
  let _0x591ffb = _0x2ec8fd ? await _0x5c12c3.participants : '';
  if (!_0x2ec8fd) {
    return _0x2e28f2("For groups only");
  }
  const _0x5834fe = _0x5b8290 => {
    for (const _0x2d1115 of _0x591ffb) {
      if (_0x2d1115.id !== _0x5b8290) {
        continue;
      } else {
        return true;
      }
    }
  };
  const _0x478577 = _0x12f49a => {
    let _0x6d883b = [];
    for (m of _0x12f49a) {
      if (m.admin == null) {
        continue;
      }
      _0x6d883b.push(m.id);
    }
    return _0x6d883b;
  };
  const _0x46ec83 = _0x2ec8fd ? _0x478577(_0x591ffb) : '';
  let _0x1580b1 = _0x2ec8fd ? _0x46ec83.includes(_0xa68eea) : false;
  let _0x18562a = _0x5834fe(_0xa68eea);
  let _0x202d1b = _0x2ec8fd ? _0x46ec83.includes(_0x4ba449) : false;
  zkad = _0x2ec8fd ? _0x46ec83.includes(_0x3ed330) : false;
  try {
    if (_0x202d1b || _0x130d05) {
      if (_0x1f6836) {
        if (zkad) {
          if (_0x18562a) {
            if (_0x1580b1 == false) {
              _0x2e28f2("This member is not a group administrator.");
            } else {
              var _0x142c60 = '@' + _0xa68eea.split('@')[0x0] + " was removed from his position as a group administrator\n";
              await _0x19813a.groupParticipantsUpdate(_0x376c53, [_0xa68eea], "demote");
              _0x19813a.sendMessage(_0x376c53, {
                'text': _0x142c60,
                'mentions': [_0xa68eea]
              });
            }
          } else {
            return _0x2e28f2("This user is not part of the group.");
          }
        } else {
          return _0x2e28f2("Sorry I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        _0x2e28f2("please tag the member to be removed");
      }
    } else {
      return _0x2e28f2("Sorry I cannot perform this action because you are not an administrator of the group.");
    }
  } catch (_0x18da8c) {
    _0x2e28f2("oups " + _0x18da8c);
  }
});
keith({
  'nomCom': "remove",
 'alias': "kik",
  'categorie': "Group",
  'reaction': "⚪"
}, async (_0x31e804, _0x1cb01e, _0xe4a4d6) => {
  let {
    repondre: _0x11d233,
    msgRepondu: _0x432c0d,
    infosGroupe: _0x5f284a,
    auteurMsgRepondu: _0x1d7ec6,
    verifGroupe: _0x3d796e,
    nomAuteurMessage: _0x2c0211,
    auteurMessage: _0x552e2b,
    superUser: _0x107130,
    idBot: _0x5926fc
  } = _0xe4a4d6;
  let _0x789c34 = _0x3d796e ? await _0x5f284a.participants : '';
  if (!_0x3d796e) {
    return _0x11d233("for groups only");
  }
  const _0x4bcd8a = _0x5cc244 => {
    for (const _0x578e06 of _0x789c34) {
      if (_0x578e06.id !== _0x5cc244) {
        continue;
      } else {
        return true;
      }
    }
  };
  const _0xd78e76 = _0x28fd03 => {
    let _0x332c5e = [];
    for (m of _0x28fd03) {
      if (m.admin == null) {
        continue;
      }
      _0x332c5e.push(m.id);
    }
    return _0x332c5e;
  };
  const _0x39b87b = _0x3d796e ? _0xd78e76(_0x789c34) : '';
  let _0x418229 = _0x3d796e ? _0x39b87b.includes(_0x1d7ec6) : false;
  let _0x1b5950 = _0x4bcd8a(_0x1d7ec6);
  let _0x5791cf = _0x3d796e ? _0x39b87b.includes(_0x552e2b) : false;
  zkad = _0x3d796e ? _0x39b87b.includes(_0x5926fc) : false;
  try {
    if (_0x5791cf || _0x107130) {
      if (_0x432c0d) {
        if (zkad) {
          if (_0x1b5950) {
            if (_0x418229 == false) {
              var _0x252c38 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                'pack': 'ALPHA-MD',
                'author': _0x2c0211,
                'type': StickerTypes.FULL,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x32,
                'background': "#000000"
              });
              await _0x252c38.toFile("st.webp");
              var _0x39da0d = '@' + _0x1d7ec6.split('@')[0x0] + " was removed from the group.\n";
              await _0x1cb01e.groupParticipantsUpdate(_0x31e804, [_0x1d7ec6], "remove");
              _0x1cb01e.sendMessage(_0x31e804, {
                'text': _0x39da0d,
                'mentions': [_0x1d7ec6]
              });
            } else {
              _0x11d233("This member cannot be removed because he is an administrator of the group.");
            }
          } else {
            return _0x11d233("This user is not part of the group.");
          }
        } else {
          return _0x11d233("Sorry, I cannot perform this action because I am not an administrator of the group.");
        }
      } else {
        _0x11d233("please tag the member to be removed");
      }
    } else {
      return _0x11d233("Sorry I cannot perform this action because you are not an administrator of the group .");
    }
  } catch (_0x402600) {
    _0x11d233("oups " + _0x402600);
  }
});
keith({
  'nomCom': "add",
  'categorie': "Group",
  'reaction': '⚪'
}, async (_0x3cd028, _0x3d021c, _0x536baa) => {
  let {
    repondre: _0x16aaca,
    msgRepondu: _0x2f27ee,
    infosGroupe: _0x3c01a8,
    auteurMsgRepondu: _0x244c23,
    verifGroupe: _0x4a1058,
    nomAuteurMessage: _0x564034,
    auteurMessage: _0x96e86e,
    superUser: _0x4dad8a,
    idBot: _0xe5a0aa
  } = _0x536baa;
  if (!_0x4a1058) {
    return _0x16aaca("for groups only");
  }
  const _0x137ea1 = await message.groupMetadata(message.jid);
  const _0x47215f = await isAdmin(_0x137ea1, message.client.user.jid);
  if (!_0x47215f) {
    return await message.send("_I'm not admin._");
  }
  match = match || message.reply_message.jid;
  if (!match) {
    return await message.send("Example : add 254757835036");
  }
  match = jidToNum(match);
  const _0x23fe6c = await message.Add(match);
  if (_0x23fe6c == "403") {
    return await message.send("_Failed, Invite sent_");
  } else {
    if (_0x23fe6c && _0x23fe6c != '200') {
      return await message.send(_0x23fe6c, {
        'quoted': message.data
      });
    }
  }
});
keith({
  'nomCom': "del",
  'categorie': 'super-User',
  'reaction': '⚪'
}, async (_0xb5182d, _0x1994c2, _0x4c6b4f) => {
  const {
    ms: _0xd31d0,
    repondre: _0x155412,
    verifGroupe: _0x3f1a5c,
    auteurMsgRepondu: _0x3bd245,
    idBot: _0x2e48c4,
    msgRepondu: _0x1c542f,
    verifAdmin: _0x388774,
    superUser: _0x38b7cf
  } = _0x4c6b4f;
  if (!_0x1c542f) {
    _0x155412("Please mention the message to delete.");
    return;
  }
  if (_0x38b7cf && _0x3bd245 == _0x2e48c4) {
    if (_0x3bd245 == _0x2e48c4) {
      const _0x1e3ffb = {
        'remoteJid': _0xb5182d,
        'fromMe': true,
        'id': _0xd31d0.message.extendedTextMessage.contextInfo.stanzaId
      };
      await _0x1994c2.sendMessage(_0xb5182d, {
        'delete': _0x1e3ffb
      });
      return;
    }
  }
  if (_0x3f1a5c) {
    if (_0x388774 || _0x38b7cf) {
      try {
        const _0x590539 = {
          'remoteJid': _0xb5182d,
          'id': _0xd31d0.message.extendedTextMessage.contextInfo.stanzaId,
          'fromMe': false,
          'participant': _0xd31d0.message.extendedTextMessage.contextInfo.participant
        };
        await _0x1994c2.sendMessage(_0xb5182d, {
          'delete': _0x590539
        });
        return;
      } catch (_0xd699eb) {
        _0x155412("I need admin rights.");
      }
    } else {
      _0x155412("Sorry, you are not an administrator of the group.");
    }
  }
});
keith({
  'nomCom': "ginfo",
  'categorie': "Group"
}, async (_0x4a9ea0, _0xd21895, _0x2be62d) => {
  const {
    ms: _0x51e007,
    repondre: _0x223b5b,
    verifGroupe: _0x5150d1
  } = _0x2be62d;
  if (!_0x5150d1) {
    _0x223b5b("order reserved for the group only");
    return;
  }
  ;
  try {
    ppgroup = await _0xd21895.profilePictureUrl(_0x4a9ea0, "image");
  } catch {
    ppgroup = conf.IMAGE_MENU;
  }
  const _0x387e43 = await _0xd21895.groupMetadata(_0x4a9ea0);
  let _0x50f5f3 = {
    'image': {
      'url': ppgroup
    },
    'caption': "*━━━━『GROUP INFO』━━━━*\n\n*🎐Name:* " + _0x387e43.subject + "\n\n*🔩Group's ID:* " + _0x4a9ea0 + "\n\n*🔍Desc:* \n\n" + _0x387e43.desc
  };
  _0xd21895.sendMessage(_0x4a9ea0, _0x50f5f3, {
    'quoted': _0x51e007
  });
});
keith({
  'nomCom': "antilink",
  'categorie': 'Group',
  'reaction': '🔗'
}, async (_0x438373, _0x41bf64, _0x3585df) => {
  var {
    repondre: _0x19b3e5,
    arg: _0x2bd763,
    verifGroupe: _0x622981,
    superUser: _0x500b8b,
    verifAdmin: _0x120d10
  } = _0x3585df;
  if (!_0x622981) {
    return _0x19b3e5("*This Command works in Groups Only*");
  }
  if (_0x500b8b || _0x120d10) {
    const _0x49b54e = await verifierEtatJid(_0x438373);
    try {
      if (!_0x2bd763 || !_0x2bd763[0x0] || _0x2bd763 === " ") {
        _0x19b3e5("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.");
        return;
      }
      ;
      if (_0x2bd763[0x0] === 'on') {
        if (_0x49b54e) {
          _0x19b3e5("the antilink is already activated for this group");
        } else {
          await ajouterOuMettreAJourJid(_0x438373, "oui");
          _0x19b3e5("the antilink is activated successfully");
        }
      } else {
        if (_0x2bd763[0x0] === "off") {
          if (_0x49b54e) {
            await ajouterOuMettreAJourJid(_0x438373, "non");
            _0x19b3e5("The antilink has been successfully deactivated");
          } else {
            _0x19b3e5("antilink is not activated for this group");
          }
        } else {
          if (_0x2bd763.join('').split('/')[0x0] === 'action') {
            let _0x42eed = _0x2bd763.join('').split('/')[0x1].toLowerCase();
            if (_0x42eed == "remove" || _0x42eed == 'warn' || _0x42eed == "delete") {
              await mettreAJourAction(_0x438373, _0x42eed);
              _0x19b3e5("The anti-link action has been updated to " + _0x2bd763.join('').split('/')[0x1]);
            } else {
              _0x19b3e5("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x19b3e5("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.");
          }
        }
      }
    } catch (_0x4911cd) {
      _0x19b3e5(_0x4911cd);
    }
  } else {
    _0x19b3e5("You are not entitled to this order");
  }
});
keith({
  'nomCom': "antibot",
  'categorie': "Group",
  'reaction': '🔗'
}, async (_0x10600e, _0x566d49, _0x39f323) => {
  var {
    repondre: _0x3a5226,
    arg: _0x208137,
    verifGroupe: _0x54e3d8,
    superUser: _0x530318,
    verifAdmin: _0x2ca941
  } = _0x39f323;
  if (!_0x54e3d8) {
    return _0x3a5226("*for groups only*");
  }
  if (_0x530318 || _0x2ca941) {
    const _0x7d2e2e = await atbverifierEtatJid(_0x10600e);
    try {
      if (!_0x208137 || !_0x208137[0x0] || _0x208137 === " ") {
        _0x3a5226("antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.");
        return;
      }
      ;
      if (_0x208137[0x0] === 'on') {
        if (_0x7d2e2e) {
          _0x3a5226("the antibot is already activated for this group");
        } else {
          await atbajouterOuMettreAJourJid(_0x10600e, "oui");
          _0x3a5226("the antibot is successfully activated");
        }
      } else {
        if (_0x208137[0x0] === "off") {
          if (_0x7d2e2e) {
            await atbajouterOuMettreAJourJid(_0x10600e, 'non');
            _0x3a5226("The antibot has been successfully deactivated");
          } else {
            _0x3a5226("antibot is not activated for this group");
          }
        } else {
          if (_0x208137.join('').split('/')[0x0] === 'action') {
            let _0x34da36 = _0x208137.join('').split('/')[0x1].toLowerCase();
            if (_0x34da36 == 'remove' || _0x34da36 == "warn" || _0x34da36 == "delete") {
              await mettreAJourAction(_0x10600e, _0x34da36);
              _0x3a5226("The anti-bot action has been updated to " + _0x208137.join('').split('/')[0x1]);
            } else {
              _0x3a5226("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x3a5226("antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.");
          }
        }
      }
    } catch (_0x1bbc33) {
      _0x3a5226(_0x1bbc33);
    }
  } else {
    _0x3a5226("You are not entitled to this order");
  }
});
keith({
  'nomCom': 'group',
  'categorie': 'Group'
}, async (_0x2d59b8, _0x2275c8, _0x5f4044) => {
  const {
    repondre: _0xfb264d,
    verifGroupe: _0x377691,
    verifAdmin: _0x44d46c,
    superUser: _0x5e7e76,
    arg: _0x4ff7de
  } = _0x5f4044;
  if (!_0x377691) {
    _0xfb264d("order reserved for group only");
    return;
  }
  ;
  if (_0x5e7e76 || _0x44d46c) {
    if (!_0x4ff7de[0x0]) {
      _0xfb264d("Instructions:\n\nType group open or close");
      return;
    }
    const _0x44d4cb = _0x4ff7de.join(" ");
    switch (_0x44d4cb) {
      case "open":
        await _0x2275c8.groupSettingUpdate(_0x2d59b8, "not_announcement");
        _0xfb264d("Group opened successfully.\nNow Participants can send messages.");
        break;
      case "close":
        await _0x2275c8.groupSettingUpdate(_0x2d59b8, "announcement");
        _0xfb264d("Group closed successfully");
        break;
      default:
        _0xfb264d("Please don't invent an option");
    }
  } else {
    _0xfb264d("This command is for admins only!");
    return;
  }
});
keith({
  'nomCom': 'gname',
  'categorie': "Group"
}, async (_0x672650, _0x5ec171, _0x2683f6) => {
  const {
    arg: _0xd3f2cb,
    repondre: _0x3918f4,
    verifAdmin: _0x2bdab6
  } = _0x2683f6;
  if (!_0x2bdab6) {
    _0x3918f4("order reserved for administrators of the group");
    return;
  }
  ;
  if (!_0xd3f2cb[0x0]) {
    _0x3918f4("Please enter the group name");
    return;
  }
  ;
  const _0x3a3d79 = _0xd3f2cb.join(" ");
  await _0x5ec171.groupUpdateSubject(_0x672650, _0x3a3d79);
  _0x3918f4("group name refresh: *" + _0x3a3d79 + '*');
});
keith({
  'nomCom': "gdesc",
  'categorie': 'Group'
}, async (_0x16f421, _0x497c9c, _0x2509bd) => {
  const {
    arg: _0x5b8f88,
    repondre: _0x399ee2,
    verifAdmin: _0x3040e9
  } = _0x2509bd;
  if (!_0x3040e9) {
    _0x399ee2("order reserved for administrators of the group");
    return;
  }
  ;
  if (!_0x5b8f88[0x0]) {
    _0x399ee2("Please enter the group description");
    return;
  }
  ;
  const _0x2b1639 = _0x5b8f88.join(" ");
  await _0x497c9c.groupUpdateDescription(_0x16f421, _0x2b1639);
  _0x399ee2("group description update: *" + _0x2b1639 + '*');
});
keith({
  'nomCom': "revoke",
  'categorie': "Group"
}, async (_0x4d8338, _0x1b4e81, _0x4a8b88) => {
  const {
    arg: _0x1c9174,
    repondre: _0x6d5d11,
    verifGroupe: _0x47073e,
    verifAdmin: _0x1d26a4
  } = _0x4a8b88;
  if (!_0x1d26a4) {
    _0x6d5d11("for admins.");
    return;
  }
  ;
  if (!_0x47073e) {
    _0x6d5d11("This command is only allowed in groups.");
  }
  ;
  await _0x1b4e81.groupRevokeInvite(_0x4d8338);
  _0x6d5d11("group link revoked.");
});
keith({
  'nomCom': "gpp",
  'categorie': "Group"
}, async (_0x3d5471, _0x548cc4, _0x53bfd5) => {
  const {
    repondre: _0x4a5695,
    msgRepondu: _0x545710,
    verifAdmin: _0x475ce2
  } = _0x53bfd5;
  if (!_0x475ce2) {
    _0x4a5695("order reserved for administrators of the group");
    return;
  }
  ;
  if (_0x545710.imageMessage) {
    const _0x56ff71 = await _0x548cc4.downloadAndSaveMediaMessage(_0x545710.imageMessage);
    await _0x548cc4.updateProfilePicture(_0x3d5471, {
      'url': _0x56ff71
    }).then(() => {
      _0x548cc4.sendMessage(_0x3d5471, {
        'text': "Group pfp changed"
      });
      fs.unlinkSync(_0x56ff71);
    })["catch"](() => _0x548cc4.sendMessage(_0x3d5471, {
      'text': err
    }));
  } else {
    _0x4a5695("Please mention an image");
  }
});
keith({
  'nomCom': "hidetag",
  'categorie': "Group",
  'reaction': '🎤'
}, async (_0x16f60c, _0x45b07d, _0x132596) => {
  const {
    repondre: _0x1d30f7,
    msgRepondu: _0x202dee,
    verifGroupe: _0x364330,
    arg: _0x3cb0c3,
    verifAdmin: _0x5569a9,
    superUser: _0x47ee30
  } = _0x132596;
  if (!_0x364330) {
    _0x1d30f7("This command is only allowed in groups.");
  }
  ;
  if (_0x5569a9 || _0x47ee30) {
    let _0xf15160 = await _0x45b07d.groupMetadata(_0x16f60c);
    let _0x1fac6b = [];
    for (const _0x337595 of _0xf15160.participants) {
      _0x1fac6b.push(_0x337595.id);
    }
    if (_0x202dee) {
      console.log(_0x202dee);
      let _0x4d52b7;
      if (_0x202dee.imageMessage) {
        let _0x2615ce = await _0x45b07d.downloadAndSaveMediaMessage(_0x202dee.imageMessage);
        _0x4d52b7 = {
          'image': {
            'url': _0x2615ce
          },
          'caption': _0x202dee.imageMessage.caption,
          'mentions': _0x1fac6b
        };
      } else {
        if (_0x202dee.videoMessage) {
          let _0x5dd842 = await _0x45b07d.downloadAndSaveMediaMessage(_0x202dee.videoMessage);
          _0x4d52b7 = {
            'video': {
              'url': _0x5dd842
            },
            'caption': _0x202dee.videoMessage.caption,
            'mentions': _0x1fac6b
          };
        } else {
          if (_0x202dee.audioMessage) {
            let _0x5769b4 = await _0x45b07d.downloadAndSaveMediaMessage(_0x202dee.audioMessage);
            _0x4d52b7 = {
              'audio': {
                'url': _0x5769b4
              },
              'mimetype': "audio/mp4",
              'mentions': _0x1fac6b
            };
          } else {
            if (_0x202dee.stickerMessage) {
              let _0x4bbfc9 = await _0x45b07d.downloadAndSaveMediaMessage(_0x202dee.stickerMessage);
              let _0x1d87a0 = new Sticker(_0x4bbfc9, {
                'pack': "ALPHA-MD-tag",
                'type': StickerTypes.CROPPED,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x46,
                'background': "transparent"
              });
              const _0x1858c6 = await _0x1d87a0.toBuffer();
              _0x4d52b7 = {
                'sticker': _0x1858c6,
                'mentions': _0x1fac6b
              };
            } else {
              _0x4d52b7 = {
                'text': _0x202dee.conversation,
                'mentions': _0x1fac6b
              };
            }
          }
        }
      }
      _0x45b07d.sendMessage(_0x16f60c, _0x4d52b7);
    } else {
      if (!_0x3cb0c3 || !_0x3cb0c3[0x0]) {
        _0x1d30f7("Enter the text to announce or mention the message to announce");
        ;
        return;
      }
      ;
      _0x45b07d.sendMessage(_0x16f60c, {
        'text': _0x3cb0c3.join(" "),
        'mentions': _0x1fac6b
      });
    }
  } else {
    _0x1d30f7("Command reserved for administrators.");
  }
});
keith({
  'nomCom': 'apk',
  'aliases': ['app', 'playstore']
  'reaction': '✨',
  'categorie': 'Download'
}, async (_0x27dd70, _0x2692b0, _0x4f1584) => {
  const {
    repondre: _0x301a87,
    arg: _0x2affe9,
    ms: _0x8b2178
  } = _0x4f1584;
  try {
    const _0x719b10 = _0x2affe9.join(" ");
    if (!_0x719b10) {
      return _0x301a87("*Enter the name of the application to search for*");
    }
    const _0x44a5d5 = await search(_0x719b10);
    if (_0x44a5d5.length === 0x0) {
      return _0x301a87("*can't find application, please enter another name*");
    }
    const _0x3a8e1d = await download(_0x44a5d5[0x0].id);
    const _0x1c94fe = parseInt(_0x3a8e1d.size);
    if (_0x1c94fe > 0x12c) {
      return _0x301a87("The file exceeds 300 MB, unable to download.");
    }
    const _0x458a50 = _0x3a8e1d.dllink;
    const _0x5dec52 = "*💫ALPHA-MD APK💫*\n\n*Name :* " + _0x3a8e1d.name + "\n*Id :* " + _0x3a8e1d["package"] + "\n*Last Update :* " + _0x3a8e1d.lastup + "\n*Size :* " + _0x3a8e1d.size + "\n";
    const _0x39f412 = (_0x3a8e1d?.['name'] || 'Downloader') + ".apk";
    const _0x26eaf2 = await axios.get(_0x458a50, {
      'responseType': "stream"
    });
    const _0xe4dda4 = fs.createWriteStream(_0x39f412);
    _0x26eaf2.data.pipe(_0xe4dda4);
    await new Promise((_0x4abc2a, _0x524bb5) => {
      _0xe4dda4.on("finish", _0x4abc2a);
      _0xe4dda4.on('error', _0x524bb5);
    });
    const _0xff05cd = {
      'document': fs.readFileSync(_0x39f412),
      'mimetype': "application/vnd.android.package-archive",
      'fileName': _0x39f412
    };
    _0x2692b0.sendMessage(_0x27dd70, {
      'image': {
        'url': _0x3a8e1d.icon
      },
      'caption': _0x5dec52
    }, {
      'quoted': _0x8b2178
    });
    _0x2692b0.sendMessage(_0x27dd70, _0xff05cd, {
      'quoted': _0x8b2178
    });
    fs.unlinkSync(_0x39f412);
  } catch (_0x142036) {
    console.error("Erreur lors du traitement de la commande apk:", _0x142036);
    _0x301a87("*Error during apk command processing*");
  }
});
const cron = require("../bdd/cron");
keith({
  'nomCom': "automute",
  'categorie': 'Group'
}, async (_0x444245, _0x2934b, _0x4eecb5) => {
  const {
    arg: _0x4106f1,
    repondre: _0x934e06,
    verifAdmin: _0x3fde41
  } = _0x4eecb5;
  if (!_0x3fde41) {
    _0x934e06("You are not an administrator of the group");
    return;
  }
  group_cron = await cron.getCronById(_0x444245);
  if (!_0x4106f1 || _0x4106f1.length == 0x0) {
    let _0x1d5ff9;
    if (group_cron == null || group_cron.mute_at == null) {
      _0x1d5ff9 = "No time set for automatic mute";
    } else {
      _0x1d5ff9 = "The group will be muted at " + group_cron.mute_at.split(':')[0x0] + " " + group_cron.mute_at.split(':')[0x1];
    }
    let _0x8a8f69 = "* *State:* " + _0x1d5ff9 + "\n        * *Instructions:* To activate automatic mute, add the minute and hour after the command separated by ':'\n        Example automute 9:30\n        * To delete the automatic mute, use the command *automute del*";
    _0x934e06(_0x8a8f69);
    return;
  } else {
    let _0x24e77e = _0x4106f1.join(" ");
    if (_0x24e77e.toLowerCase() === 'del') {
      if (group_cron == null) {
        _0x934e06("No cronometrage is active");
      } else {
        await cron.delCron(_0x444245);
        _0x934e06("The automatic mute has been removed; restart to apply changes").then(() => {
          exec("pm2 restart all");
        });
      }
    } else if (_0x24e77e.includes(':')) {
      await cron.addCron(_0x444245, "mute_at", _0x24e77e);
      _0x934e06("Setting up automatic mute for " + _0x24e77e + " ; restart to apply changes").then(() => {
        exec("pm2 restart all");
      });
    } else {
      _0x934e06("Please enter a valid time with hour and minute separated by :");
    }
  }
});
keith({
  'nomCom': "autounmute",
  'categorie': 'Group'
}, async (_0x3d99a0, _0xab3213, _0xc7b6c9) => {
  const {
    arg: _0x4301f6,
    repondre: _0x3df118,
    verifAdmin: _0x3aeb6a
  } = _0xc7b6c9;
  if (!_0x3aeb6a) {
    _0x3df118("You are not an administrator of the group");
    return;
  }
  group_cron = await cron.getCronById(_0x3d99a0);
  if (!_0x4301f6 || _0x4301f6.length == 0x0) {
    let _0x2b7be9;
    if (group_cron == null || group_cron.unmute_at == null) {
      _0x2b7be9 = "No time set for autounmute";
    } else {
      _0x2b7be9 = "The group will be un-muted at " + group_cron.unmute_at.split(':')[0x0] + "H " + group_cron.unmute_at.split(':')[0x1];
    }
    let _0x3df4ba = "* *State:* " + _0x2b7be9 + "\n      * *Instructions:* To activate autounmute, add the minute and hour after the command separated by ':'\n      Example autounmute 7:30\n      * To delete autounmute, use the command *autounmute del*";
    _0x3df118(_0x3df4ba);
    return;
  } else {
    let _0x42ff3c = _0x4301f6.join(" ");
    if (_0x42ff3c.toLowerCase() === 'del') {
      if (group_cron == null) {
        _0x3df118("No cronometrage has been activated");
      } else {
        await cron.delCron(_0x3d99a0);
        _0x3df118("The autounmute has been removed; restart to apply the changes").then(() => {
          exec("pm2 restart all");
        });
      }
    } else if (_0x42ff3c.includes(':')) {
      await cron.addCron(_0x3d99a0, "unmute_at", _0x42ff3c);
      _0x3df118("Setting up autounmute for " + _0x42ff3c + "; restart to apply the changes").then(() => {
        exec("pm2 restart all");
      });
    } else {
      _0x3df118("Please enter a valid time with hour and minute separated by :");
    }
  }
});
keith({
  'nomCom': 'fkick',
  'categorie': "Group"
}, async (_0x57c236, _0x1171b1, _0x17357a) => {
  const {
    arg: _0x2fce5f,
    repondre: _0x19f8d1,
    verifAdmin: _0x4145c4,
    superUser: _0xe5451b,
    verifZokouAdmin: _0x1045af
  } = _0x17357a;
  if (_0x4145c4 || _0xe5451b) {
    if (!_0x1045af) {
      _0x19f8d1("You need administrative rights to perform this command");
      return;
    }
    if (!_0x2fce5f || _0x2fce5f.length == 0x0) {
      _0x19f8d1("Please enter the country code whose members will be removed");
      return;
    }
    let _0x569ebc = await _0x1171b1.groupMetadata(_0x57c236);
    let _0x4671eb = _0x569ebc.participants;
    for (let _0x40524f = 0x0; _0x40524f < _0x4671eb.length; _0x40524f++) {
      if (_0x4671eb[_0x40524f].id.startsWith(_0x2fce5f[0x0]) && _0x4671eb[_0x40524f].admin === null) {
        await _0x1171b1.groupParticipantsUpdate(_0x57c236, [_0x4671eb[_0x40524f].id], "remove");
      }
    }
  } else {
    _0x19f8d1("Sorry, you are not an administrator of the group");
  }
});
keith({
  'nomCom': 'nsfw',
  'categorie': "Group"
}, async (_0x28c09c, _0x4427ee, _0x1e9ef3) => {
  const {
    arg: _0x25a647,
    repondre: _0x4cbac3,
    verifAdmin: _0x5005ac
  } = _0x1e9ef3;
  if (!_0x5005ac) {
    _0x4cbac3("Sorry, you cannot enable NSFW content without being an administrator of the group");
    return;
  }
  let _0x3eff52 = require('../bdd/hentai');
  let _0x3ce3ab = await _0x3eff52.checkFromHentaiList(_0x28c09c);
  if (_0x25a647[0x0] == 'on') {
    if (_0x3ce3ab) {
      _0x4cbac3("NSFW content is already active for this group");
      return;
    }
    ;
    await _0x3eff52.addToHentaiList(_0x28c09c);
    _0x4cbac3("NSFW content is now active for this group");
  } else {
    if (_0x25a647[0x0] == "off") {
      if (!_0x3ce3ab) {
        _0x4cbac3("NSFW content is already disabled for this group");
        return;
      }
      ;
      await _0x3eff52.removeFromHentaiList(_0x28c09c);
      _0x4cbac3("NSFW content is now disabled for this group");
    } else {
      _0x4cbac3("You must enter \"on\" or \"off\"");
    }
  }
});
keith({
  'nomCom': "antiword",
  'categorie': "Group",
  'reaction': '🔗'
}, async (_0x19997a, _0x2151a6, _0x391bbd) => {
  var {
    repondre: _0x49b599,
    arg: _0x264587,
    verifGroupe: _0x4f54f9,
    superUser: _0x4d4ce7,
    verifAdmin: _0x339195
  } = _0x391bbd;
  if (!_0x4f54f9) {
    return _0x49b599("*This command is for groups only*");
  }
  if (_0x4d4ce7 || _0x339195) {
    const _0x27c90d = await verifierEtatJid(_0x19997a);
    try {
      if (!_0x264587 || !_0x264587[0x0] || _0x264587 === " ") {
        _0x49b599("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.");
        return;
      }
      ;
      if (_0x264587[0x0] === 'on') {
        if (_0x27c90d) {
          _0x49b599("the antiword is already activated for this group");
        } else {
          await ajouterOuMettreAJourJid(_0x19997a, "oui");
          _0x49b599("the antiword is activated successfully");
        }
      } else {
        if (_0x264587[0x0] === "off") {
          if (_0x27c90d) {
            await ajouterOuMettreAJourJid(_0x19997a, "non");
            _0x49b599("The antiword has been successfully deactivated");
          } else {
            _0x49b599("antiword is not activated for this group");
          }
        } else {
          if (_0x264587.join('').split('/')[0x0] === "action") {
            let _0x4d4acb = _0x264587.join('').split('/')[0x1].toLowerCase();
            if (_0x4d4acb == "remove" || _0x4d4acb == "warn" || _0x4d4acb == 'delete') {
              await mettreAJourAction(_0x19997a, _0x4d4acb);
              _0x49b599("The anti-word action has been updated to " + _0x264587.join('').split('/')[0x1]);
            } else {
              _0x49b599("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x49b599("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the word sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.");
          }
        }
      }
    } catch (_0x36d395) {
      _0x49b599(_0x36d395);
    }
  } else {
    _0x49b599("You are not entitled to this order");
  }
});
keith({
  'nomCom': "antilink-all",
  'categorie': 'Group',
  'reaction': '🔗'
}, async (_0x361fd1, _0x130af0, _0x35d3de) => {
  var {
    repondre: _0x4d7c89,
    arg: _0x1cb91f,
    verifGroupe: _0x26e001,
    superUser: _0x145176,
    verifAdmin: _0x2c8ecb
  } = _0x35d3de;
  if (!_0x26e001) {
    return _0x4d7c89("*This Command works in Groups Only*");
  }
  if (_0x145176 || _0x2c8ecb) {
    const _0x49977a = await verifierEtatJid(_0x361fd1);
    try {
      if (!_0x1cb91f || !_0x1cb91f[0x0] || _0x1cb91f === " ") {
        _0x4d7c89("type antilink-all on to activate the antilink-all feature\nor antilink-all off to deactivate the antilink-all feature\nThen antilink-all action/remove to directly remove the link without notice\nor antilink-all action/warn to give warnings\nor antilink-all action/delete to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.");
        return;
      }
      ;
      if (_0x1cb91f[0x0] === 'on') {
        if (_0x49977a) {
          _0x4d7c89("antilink-all is already activated for this group");
        } else {
          await ajouterOuMettreAJourJid(_0x361fd1, "oui");
          _0x4d7c89("the antilink-all is activated successfully");
        }
      } else {
        if (_0x1cb91f[0x0] === 'off') {
          if (_0x49977a) {
            await ajouterOuMettreAJourJid(_0x361fd1, 'non');
            _0x4d7c89("The antilink-all has been successfully deactivated");
          } else {
            _0x4d7c89("antilink-all is not activated for this group");
          }
        } else {
          if (_0x1cb91f.join('').split('/')[0x0] === "action") {
            let _0x21f427 = _0x1cb91f.join('').split('/')[0x1].toLowerCase();
            if (_0x21f427 == 'remove' || _0x21f427 == "warn" || _0x21f427 == "delete") {
              await mettreAJourAction(_0x361fd1, _0x21f427);
              _0x4d7c89("The anti-link action has been updated to " + _0x1cb91f.join('').split('/')[0x1]);
            } else {
              _0x4d7c89("The only actions available are warn, remove, and delete");
            }
          } else {
            _0x4d7c89("Look, type antilink-all on to activate the antilink-all feature\nor antilink-all off to deactivate the antilink-all feature\nor antilink-all action/remove to directly remove the link without notice\nor antilink-all action/warn to give warnings\nor antilink-all action/delete to remove the link without any sanctions\n\nPlease note that by default, the antilink-all feature is set to delete.\n\n*KEEP USING ALPHA-MD*");
          }
        }
      }
    } catch (_0x46e41f) {
      _0x4d7c89(_0x46e41f);
    }
  } else {
    _0x4d7c89("You are not allowed to use this command");
  }
});
