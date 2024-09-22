const a38_0xb082fa = function () {
  let _0x5b853d = true;
  return function (_0x100b33, _0x1b71b3) {
    const _0x1ddfbe = _0x5b853d ? function () {
      if (_0x1b71b3) {
        const _0x282f52 = _0x1b71b3.apply(_0x100b33, arguments);
        _0x1b71b3 = null;
        return _0x282f52;
      }
    } : function () {};
    _0x5b853d = false;
    return _0x1ddfbe;
  };
}();
const a38_0x3370ec = a38_0xb082fa(this, function () {
  return a38_0x3370ec.toString().search('(((.+)+)+)+$').toString().constructor(a38_0x3370ec).search('(((.+)+)+)+$');
});
a38_0x3370ec();
const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
let {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("../bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require('../bdd/banGroup');
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('../bdd/onlyAdmin');
const {
  removeSudoNumber,
  addSudoNumber,
  issudo
} = require('../bdd/sudo');
const {
  dbCache
} = require("../cache");
const sleep = _0x18a5a1 => {
  return new Promise(_0x5a8d7f => {
    setTimeout(_0x5a8d7f, _0x18a5a1);
  });
};
zokou({
  'nomCom': "tgs",
  'categorie': "Mods",
  'desc': "download telegram sticker"
}, async (_0x57173b, _0x368836, _0x502677) => {
  const {
    ms: _0x14a60b,
    repondre: _0x545d12,
    arg: _0x28315b,
    nomAuteurMessage: _0x400e9c,
    superUser: _0x5080f0
  } = _0x502677;
  if (!_0x5080f0) {
    _0x545d12("Only Mods can use this command");
    return;
  }
  if (!_0x28315b[0x0]) {
    _0x545d12("put a telegramme stickers link ");
    return;
  }
  let _0x435f92 = _0x28315b.join(" ");
  let _0x419911 = _0x435f92.split('/addstickers/')[0x1];
  let _0x38b123 = "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x419911);
  try {
    let _0x495ade = await axios.get(_0x38b123);
    let _0x328efa = null;
    if (_0x495ade.data.result.is_animated === true || _0x495ade.data.result.is_video === true) {
      _0x328efa = "animated sticker";
    } else {
      _0x328efa = "not animated sticker";
    }
    let _0x1cf012 = "   Zk-stickers-dl\n      \n  *Name :* " + _0x495ade.data.result.name + "\n  *Type :* " + _0x328efa + " \n  *Length :* " + _0x495ade.data.result.stickers.length + "\n  \n      Downloading...";
    await _0x545d12(_0x1cf012);
    for (let _0x24cc3d = 0x0; _0x24cc3d < _0x495ade.data.result.stickers.length; _0x24cc3d++) {
      let _0x37157 = await axios.get("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x495ade.data.result.stickers[_0x24cc3d].file_id);
      let _0x4580fa = await axios({
        'method': "get",
        'url': "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x37157.data.result.file_path,
        'responseType': "arraybuffer"
      });
      const _0x6537c7 = new Sticker(_0x4580fa.data, {
        'pack': _0x400e9c,
        'author': 'ALPHA-MD',
        'type': StickerTypes.FULL,
        'categories': ['🤩', '🎉'],
        'id': "12345",
        'quality': 0x32,
        'background': '#000000'
      });
      const _0x22e267 = await _0x6537c7.toBuffer();
      await _0x368836.sendMessage(_0x57173b, {
        'sticker': _0x22e267
      }, {
        'quoted': _0x14a60b
      });
    }
  } catch (_0x307f07) {
    _0x545d12("we got an error \n", _0x307f07);
  }
});
zokou({
  'nomCom': "crew",
  'categorie': "Mods",
  'desc': "create a new group"
}, async (_0x3f8457, _0x4444e1, _0x29e8f7) => {
  const {
    ms: _0x4a1e3c,
    repondre: _0x335dd7,
    arg: _0x47dcdd,
    auteurMessage: _0x10442c,
    superUser: _0x3c2f07,
    auteurMsgRepondu: _0x3ad30,
    msgRepondu: _0x43b585
  } = _0x29e8f7;
  if (!_0x3c2f07) {
    _0x335dd7("only modds can use this command");
    return;
  }
  ;
  if (!_0x47dcdd[0x0]) {
    _0x335dd7("Please enter the name of the group to create");
    return;
  }
  ;
  if (!_0x43b585) {
    _0x335dd7("Please mention a member added ");
    return;
  }
  const _0x1c3b5b = _0x47dcdd.join(" ");
  const _0x29fbb5 = await _0x4444e1.groupCreate(_0x1c3b5b, [_0x10442c, _0x3ad30]);
  console.log("created group with id: " + _0x29fbb5.gid);
  _0x4444e1.sendMessage(_0x29fbb5.id, {
    'text': "Bienvenue dans " + _0x1c3b5b
  });
});
zokou({
  'nomCom': "join",
  'categorie': "Mods",
  'desc': "join a group by invite link"
}, async (_0x4dd60e, _0x169de1, _0x2949e0) => {
  const {
    arg: _0x4f7962,
    ms: _0x279bce,
    repondre: _0x2677ee,
    verifGroupe: _0x291ab3,
    msgRepondu: _0x16527a,
    verifAdmin: _0x4cfe01,
    superUser: _0x12bf92,
    auteurMessage: _0x3f7723
  } = _0x2949e0;
  if (!_0x12bf92) {
    _0x2677ee("command reserved for the bot owner");
    return;
  }
  let _0x2786cd = _0x4f7962[0x0].split("https://chat.whatsapp.com/")[0x1];
  await _0x169de1.groupAcceptInvite(_0x2786cd);
  _0x2677ee("Succes")["catch"](_0x43ff12 => {
    _0x2677ee("Unknown error");
  });
});
zokou({
  'nomCom': "jid",
  'categorie': 'Mods',
  'desc': "get user jid"
}, async (_0x32fc6e, _0x170697, _0x34c92d) => {
  const {
    arg: _0x52f39e,
    ms: _0x449839,
    repondre: _0x14bf95,
    verifGroupe: _0x5ceb00,
    msgRepondu: _0x5113f9,
    verifAdmin: _0x279125,
    superUser: _0x181a17,
    auteurMessage: _0x1dc957,
    auteurMsgRepondu: _0x588882
  } = _0x34c92d;
  if (!_0x181a17) {
    _0x14bf95("command reserved for the bot owner");
    return;
  }
  if (!_0x5113f9) {
    jid = _0x32fc6e;
  } else {
    jid = _0x588882;
  }
  ;
  _0x170697.sendMessage(_0x32fc6e, {
    'text': jid
  }, {
    'quoted': _0x449839
  });
});
zokou({
  'nomCom': "block",
  'categorie': "Mods",
  'desc': "block user"
}, async (_0x257ade, _0x53e95d, _0x3d060c) => {
  const {
    arg: _0x3ae644,
    ms: _0x5f0879,
    repondre: _0x4135fe,
    verifGroupe: _0x6445af,
    msgRepondu: _0x6a25d2,
    verifAdmin: _0x3b95a3,
    superUser: _0x52fd6d,
    auteurMessage: _0x19647c,
    auteurMsgRepondu: _0x238b1a
  } = _0x3d060c;
  if (!_0x52fd6d) {
    _0x4135fe("command reserved for the bot owner");
    return;
  }
  if (!_0x6a25d2) {
    if (_0x6445af) {
      _0x4135fe("Be sure to mention the person to block");
      return;
    }
    ;
    jid = _0x257ade;
    await _0x53e95d.updateBlockStatus(jid, "block").then(_0x4135fe("succes"));
  } else {
    jid = _0x238b1a;
    await _0x53e95d.updateBlockStatus(jid, "block").then(_0x4135fe("succes"));
  }
  ;
});
zokou({
  'nomCom': "unblock",
  'categorie': "Mods",
  'desc': "unblock user"
}, async (_0x4c7755, _0x541236, _0x1ade28) => {
  const {
    arg: _0x1250af,
    ms: _0x2adad7,
    repondre: _0x2b605,
    verifGroupe: _0x2d4e47,
    msgRepondu: _0xf1f4aa,
    verifAdmin: _0x49787d,
    superUser: _0x4f3216,
    auteurMessage: _0x552955,
    auteurMsgRepondu: _0x2a9e4a
  } = _0x1ade28;
  if (!_0x4f3216) {
    _0x2b605("command reserved for the bot owner");
    return;
  }
  if (!_0xf1f4aa) {
    if (_0x2d4e47) {
      _0x2b605("Please mention the person to be unlocked");
      return;
    }
    ;
    jid = _0x4c7755;
    await _0x541236.updateBlockStatus(jid, 'unblock').then(_0x2b605("succes"));
  } else {
    jid = _0x2a9e4a;
    await _0x541236.updateBlockStatus(jid, "unblock").then(_0x2b605("succes"));
  }
  ;
});
zokou({
  'nomCom': "kickall",
  'categorie': "Group",
  'reaction': '📣',
  'desc': "remove all member of group"
}, async (_0xce27af, _0x208e30, _0x4d49c7) => {
  const {
    auteurMessage: _0x5e9d46,
    ms: _0x176a80,
    repondre: _0x1113b0,
    arg: _0x3392ff,
    verifGroupe: _0x27de9b,
    nomGroupe: _0x103d65,
    infosGroupe: _0x381357,
    nomAuteurMessage: _0x10864f,
    verifAdmin: _0x3fd8c5,
    superUser: _0xbdd4f9,
    prefixe: _0x12744a
  } = _0x4d49c7;
  const _0x39bf18 = await _0x208e30.groupMetadata(_0xce27af);
  if (!_0x27de9b) {
    _0x1113b0("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }
  if (_0xbdd4f9 || _0x5e9d46 == _0x39bf18.owner) {
    _0x1113b0("No_admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.");
    await sleep(0x1388);
    let _0x431d76 = _0x27de9b ? await _0x381357.participants : '';
    try {
      let _0x1f4120 = _0x431d76.filter(_0x444208 => !_0x444208.admin);
      for (const _0x20583a of _0x1f4120) {
        await _0x208e30.groupParticipantsUpdate(_0xce27af, [_0x20583a.id], "remove");
        await sleep(0x1f4);
      }
    } catch (_0x800988) {
      _0x1113b0("I need administration rights");
    }
  } else {
    _0x1113b0("Order reserved for the group owner for security reasons");
    return;
  }
});
zokou({
  'nomCom': 'ban',
  'categorie': "Mods",
  'desc': "ban user from commands"
}, async (_0xa10946, _0x215202, _0x2252a3) => {
  const {
    ms: _0x36c66b,
    arg: _0x4bb3aa,
    auteurMsgRepondu: _0x484b46,
    msgRepondu: _0x4a5041,
    repondre: _0x453d23,
    prefixe: _0x1bb2b5,
    superUser: _0x27ae2d
  } = _0x2252a3;
  if (!_0x27ae2d) {
    _0x453d23("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x4bb3aa[0x0]) {
    _0x453d23("mention the user by typing " + _0x1bb2b5 + "ban add/del to ban/unban the user");
    return;
  }
  ;
  if (_0x4a5041) {
    let _0x3706ab;
    if (dbCache.has("banuser")) {
      _0x3706ab = dbCache.get("banuser").includes(_0x484b46);
    } else {
      let _0x5d4cfc = await isUserBanned();
      _0x3706ab = _0x5d4cfc.includes(origineMessage);
      dbCache.set("banuser", _0x5d4cfc);
    }
    switch (_0x4bb3aa.join(" ")) {
      case "add":
        if (_0x3706ab) {
          _0x453d23("This user is already banned");
          return;
        }
        await addUserToBanList(_0x484b46);
        dbCache.del("banuser");
        _0x453d23("user succesfully banned");
        break;
      case "del":
        if (_0x3706ab) {
          await removeUserFromBanList(_0x484b46);
          dbCache.del("banuser");
          _0x453d23("This user is now free.");
        } else {
          _0x453d23("This user is not banned.");
        }
        break;
      default:
        _0x453d23("bad option");
        break;
    }
  } else {
    _0x453d23("reply the user message");
    return;
  }
});
zokou({
  'nomCom': "bangroup",
  'categorie': "Mods",
  'desc': "ban group from commands"
}, async (_0x27efd6, _0x54e6ea, _0x38c52d) => {
  const {
    ms: _0x36c08b,
    arg: _0x37d9fd,
    auteurMsgRepondu: _0x379639,
    msgRepondu: _0x3d4d60,
    repondre: _0x1f8a25,
    prefixe: _0x2c90f4,
    superUser: _0x50e656,
    verifGroupe: _0x56d2ab
  } = _0x38c52d;
  if (!_0x50e656) {
    _0x1f8a25("This command is only allowed to the bot owner");
    return;
  }
  ;
  if (!_0x56d2ab) {
    _0x1f8a25("order reservation for groups");
    return;
  }
  ;
  if (!_0x37d9fd[0x0]) {
    _0x1f8a25("type " + _0x2c90f4 + "bangroup add/del to ban/unban the group");
    return;
  }
  ;
  let _0x252789;
  if (dbCache.has("bangroup")) {
    _0x252789 = dbCache.get("bangroup").includes(_0x27efd6);
  } else {
    let _0x542a69 = await isGroupBanned();
    _0x252789 = _0x542a69.includes(_0x27efd6);
    dbCache.set("bangroup", _0x542a69);
  }
  switch (_0x37d9fd.join(" ")) {
    case 'add':
      if (_0x252789) {
        _0x1f8a25("This group is already banned");
        return;
      }
      await addGroupToBanList(_0x27efd6);
      dbCache.del("bangroup");
      _0x1f8a25("This group is now banned");
      break;
    case 'del':
      if (_0x252789) {
        removeGroupFromBanList(_0x27efd6);
        dbCache.del("bangroup");
        _0x1f8a25("This group is now free.");
      } else {
        _0x1f8a25("This group is not banned.");
      }
      break;
    default:
      _0x1f8a25("you must put add or del");
      break;
  }
});
zokou({
  'nomCom': 'onlyadmin',
  'categorie': "Group",
  'desc': "only admin can use commands"
}, async (_0x832916, _0x2b2243, _0x630156) => {
  const {
    ms: _0x1a8e03,
    arg: _0x462b99,
    auteurMsgRepondu: _0x50b3ad,
    msgRepondu: _0x150f82,
    repondre: _0x3e6af8,
    prefixe: _0x3f45e0,
    superUser: _0x241451,
    verifGroupe: _0x213a1a,
    verifAdmin: _0x305db0
  } = _0x630156;
  if (_0x241451 || _0x305db0) {
    if (!_0x213a1a) {
      _0x3e6af8("order reservation for groups");
      return;
    }
    ;
    if (!_0x462b99[0x0]) {
      _0x3e6af8("type " + _0x3f45e0 + "onlyadmin add/del to ban/unban the group");
      return;
    }
    ;
    let _0x419780;
    if (dbCache.has("onlyadmin")) {
      _0x419780 = dbCache.get('onlyadmin').includes(_0x832916);
    } else {
      let _0x4b263a = await isGroupOnlyAdmin();
      _0x419780 = _0x4b263a.includes(_0x832916);
      dbCache.set('onlyadmin', _0x4b263a);
    }
    switch (_0x462b99.join(" ")) {
      case "add":
        if (_0x419780) {
          _0x3e6af8("This group is already in onlyadmin mode");
          return;
        }
        await addGroupToOnlyAdminList(_0x832916);
        dbCache.del("onlyadmin");
        _0x3e6af8("This group is now in onlyadmin mode.");
        break;
      case 'del':
        if (_0x419780) {
          await removeGroupFromOnlyAdminList(_0x832916);
          dbCache.del("onlyadmin");
          _0x3e6af8("This group is now free.");
        } else {
          _0x3e6af8("This group is not in onlyadmin mode.");
        }
        break;
      default:
        _0x3e6af8("bad option");
        break;
    }
  } else {
    _0x3e6af8("You are not entitled to this order");
  }
});
zokou({
  'nomCom': "sudo",
  'categorie': "Mods",
  'desc': "add or remove a user from sudo (second owner) list"
}, async (_0x482d50, _0x4b8828, _0x3155a9) => {
  const {
    ms: _0x44d2b7,
    arg: _0x143a9f,
    auteurMsgRepondu: _0x2924b8,
    msgRepondu: _0x4ab0d3,
    repondre: _0x1e46b2,
    prefixe: _0x1f4e9c,
    superUser: _0x10a79a
  } = _0x3155a9;
  if (!_0x10a79a) {
    _0x1e46b2("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x143a9f[0x0]) {
    _0x1e46b2("mention the person by typing " + _0x1f4e9c + "sudo add/del");
    return;
  }
  ;
  if (_0x4ab0d3) {
    switch (_0x143a9f.join(" ")) {
      case "add":
        let _0x518c75 = await issudo(_0x2924b8);
        if (_0x518c75) {
          _0x1e46b2("This user is already sudo");
          return;
        }
        await addSudoNumber(_0x2924b8);
        if (dbCache.has("sudo")) {
          dbCache.del("sudo");
        }
        _0x1e46b2("succes");
        break;
      case "del":
        let _0x1d464f = await issudo(_0x2924b8);
        if (_0x1d464f) {
          await removeSudoNumber(_0x2924b8);
          if (dbCache.has("sudo")) {
            dbCache.del('sudo');
          }
          _0x1e46b2("This user is removed in sudo list.");
        } else {
          _0x1e46b2("This user is not sudo.");
        }
        break;
      default:
        _0x1e46b2("you should put add or del");
        break;
    }
  } else {
    _0x1e46b2("mention the user");
    return;
  }
});
zokou({
  'nomCom': "save",
  'categorie': 'Mods',
  'desc': "forward a message to your personnal chat"
}, async (_0x4cd855, _0x42fdf9, _0x3d061e) => {
  const {
    repondre: _0x143056,
    msgRepondu: _0x379929,
    superUser: _0x1fc3e8,
    auteurMessage: _0x3b74ef
  } = _0x3d061e;
  if (_0x1fc3e8) {
    if (_0x379929) {
      console.log(_0x379929);
      let _0x209038;
      if (_0x379929.imageMessage) {
        let _0x18d1e3 = await _0x42fdf9.downloadAndSaveMediaMessage(_0x379929.imageMessage);
        _0x209038 = {
          'image': {
            'url': _0x18d1e3
          },
          'caption': _0x379929.imageMessage.caption
        };
      } else {
        if (_0x379929.videoMessage) {
          let _0x540925 = await _0x42fdf9.downloadAndSaveMediaMessage(_0x379929.videoMessage);
          _0x209038 = {
            'video': {
              'url': _0x540925
            },
            'caption': _0x379929.videoMessage.caption
          };
        } else {
          if (_0x379929.audioMessage) {
            let _0x34d479 = await _0x42fdf9.downloadAndSaveMediaMessage(_0x379929.audioMessage);
            _0x209038 = {
              'audio': {
                'url': _0x34d479
              },
              'mimetype': "audio/mp4"
            };
          } else {
            if (_0x379929.stickerMessage) {
              let _0x20f6f3 = await _0x42fdf9.downloadAndSaveMediaMessage(_0x379929.stickerMessage);
              let _0x4f9792 = new Sticker(_0x20f6f3, {
                'pack': "ALPHA-MD",
                'type': StickerTypes.CROPPED,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x46,
                'background': 'transparent'
              });
              const _0x28344e = await _0x4f9792.toBuffer();
              _0x209038 = {
                'sticker': _0x28344e
              };
            } else {
              _0x209038 = {
                'text': _0x379929.conversation
              };
            }
          }
        }
      }
      _0x42fdf9.sendMessage(_0x3b74ef, _0x209038);
    } else {
      _0x143056("Mention the message that you want to save");
    }
  } else {
    _0x143056("only mods can use this command");
  }
});
zokou({
  'nomCom': 'mention',
  'categorie': "Mods",
  'desc': "send a message when you are mentionned in group"
}, async (_0x15c07e, _0x4797de, _0x4c2b8f) => {
  const {
    ms: _0x10484c,
    repondre: _0x14cf17,
    superUser: _0x3865eb,
    arg: _0x579fbf
  } = _0x4c2b8f;
  if (!_0x3865eb) {
    _0x14cf17("you do not have the rights for this command");
    return;
  }
  const _0x1a700f = require('../bdd/mention');
  let _0x235980 = await _0x1a700f.recupererToutesLesValeurs();
  data = _0x235980[0x0];
  if (!_0x579fbf || _0x579fbf.length < 0x1) {
    let _0x3d7398;
    if (_0x235980.length === 0x0) {
      _0x14cf17("To activate or modify the mention; follow this syntax: mention link type message\n  The different types are audio, video, image, and sticker.\n  Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Keith");
      return;
    }
    if (data.status == "non") {
      _0x3d7398 = "Desactived";
    } else {
      _0x3d7398 = "Actived";
    }
    mtype = data.type || "no data";
    url = data.url || "no data";
    let _0x51f9dd = "Status: " + _0x3d7398 + "\nType: " + mtype + "\nLink: " + url + "\n\n*Instructions:*\n\nTo activate or modify the mention, follow this syntax: mention link type message\nThe different types are audio, video, image, and sticker.\nExample: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Keith\n\nTo stop the mention, use mention stop";
    _0x14cf17(_0x51f9dd);
    return;
  }
  if (_0x579fbf.length >= 0x2) {
    if (_0x579fbf[0x0].startsWith("http") && (_0x579fbf[0x1] == "image" || _0x579fbf[0x1] == "audio" || _0x579fbf[0x1] == "video" || _0x579fbf[0x1] == 'sticker')) {
      let _0x5e9add = [];
      for (i = 0x2; i < _0x579fbf.length; i++) {
        _0x5e9add.push(_0x579fbf[i]);
      }
      let _0x20afcc = _0x5e9add.join(" ") || '';
      await _0x1a700f.addOrUpdateDataInMention(_0x579fbf[0x0], _0x579fbf[0x1], _0x20afcc);
      await _0x1a700f.modifierStatusId1("oui").then(() => {
        _0x14cf17("mention updated");
      });
    } else {
      _0x14cf17("*Instructions:*\n          To activate or modify the mention, follow this syntax: mention link type message. The different types are audio, video, image, and sticker.");
    }
  } else if (_0x579fbf.length === 0x1 && _0x579fbf[0x0] == "stop") {
    await _0x1a700f.modifierStatusId1("non").then(() => {
      _0x14cf17(" mention stopped ");
    });
  } else {
    _0x14cf17("Please make sure to follow the instructions");
  }
});
