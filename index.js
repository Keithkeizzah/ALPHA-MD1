const {
  makeWASocket,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  makeInMemoryStore,
  getContentType,
  jidDecode,
  delay,
  downloadMediaMessage,
  downloadContentFromMessage
} = require('@whiskeysockets/baileys');
const {
  Boom
} = require("@hapi/boom");
const {
  default: pino
} = require("pino");
const conf = require('./set');
const fs = require("fs-extra");
let evt = require("./keizzah/keith");
const {
  reagir
} = require("./keizzah/app");
let path = require('path');
const FileType = require("file-type");
const {
  Sticker,
  StickerTypes
} = require('wa-sticker-formatter');
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const NodeCache = require('node-cache');
const prefixe = conf.PREFIXE;
const {
  verifierEtatJid,
  recupererActionJid
} = require('./bdd/antilien');
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require('./bdd/antibot');
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require('./bdd/banGroup');
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
const {
  recupevents
} = require('./bdd/welcome');
const {
  isGroupspam
} = require("./bdd/antispam");
const {
  dbCache
} = require("./cache");
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + '/auth/creds.json', atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != 'zokk') {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    }
  } catch (_0x379127) {
    console.log("Session Invalide " + _0x379127);
    return;
  }
}
authentification();
const logger = pino({
  'level': "silent"
});
const msgCache = new NodeCache({
  'stdTTL': 0x14,
  'checkperiod': 0x78
});
const groupMetadataCache = new NodeCache({
  'stdTTL': 0x1770,
  'checkperiod': 0x1388
});
const CmdColdCache = new NodeCache({
  'stdTTL': 0x3c,
  'checkperiod': 0x3c
});
const store = makeInMemoryStore({
  'logger': logger
});
store.readFromFile("store.json");
setInterval(() => {
  store.writeToFile('store.json');
}, 0x2710);
async function connectToWhatsapp() {
  const {
    saveCreds: _0x1fccdf,
    state: _0x5aa491
  } = await useMultiFileAuthState('./auth');
  const {
    version: _0x5eca85,
    isLatest: _0x1493cf
  } = await fetchLatestBaileysVersion();
  const _0x41381f = makeWASocket({
    'version': _0x5eca85,
    'logger': logger,
    'browser': ['Alpha-md', "safari", "1.0.0"],
    'emitOwnEvents': true,
    'syncFullHistory': true,
    'printQRInTerminal': true,
    'markOnlineOnConnect': false,
    'msgRetryCounterCache': msgCache,
    'receivedPendingNotifications': true,
    'generateHighQualityLinkPreview': true,
    'auth': {
      'creds': _0x5aa491.creds,
      'keys': makeCacheableSignalKeyStore(_0x5aa491.keys, logger)
    },
    'keepAliveIntervalMs': 0x7530,
    'getMessage': async _0x58b084 => {
      if (store) {
        const _0xd3a826 = await store.loadMessage(_0x58b084.remoteJid, _0x58b084.id);
        return _0xd3a826?.['message'] || undefined;
      }
    }
  });
  store?.['bind'](_0x41381f.ev);
  const _0x52375f = new NodeCache({
    'stdTTL': 0x78,
    'checkperiod': 0xf0
  });
  _0x41381f.ev.on("messages.upsert", async _0x2f9e8e => {
    const {
      messages: _0x93054a
    } = _0x2f9e8e;
    const _0x4167ca = _0x93054a[0x0];
    if (!_0x4167ca.message) {
      return;
    }
    const _0x4f1140 = _0x3b971b => {
      if (!_0x3b971b) {
        return _0x3b971b;
      }
      if (/:\d+@/gi.test(_0x3b971b)) {
        let _0x2b62fc = jidDecode(_0x3b971b) || {};
        return _0x2b62fc.user && _0x2b62fc.server && _0x2b62fc.user + '@' + _0x2b62fc.server || _0x3b971b;
      } else {
        return _0x3b971b;
      }
    };
    var _0x5ce64a = getContentType(_0x4167ca.message);
    var _0x4865d2 = _0x5ce64a == "conversation" ? _0x4167ca.message.conversation : _0x5ce64a == 'imageMessage' ? _0x4167ca.message.imageMessage?.["caption"] : _0x5ce64a == 'videoMessage' ? _0x4167ca.message.videoMessage?.["caption"] : _0x5ce64a == "extendedTextMessage" ? _0x4167ca.message?.["extendedTextMessage"]?.["text"] : _0x5ce64a == 'buttonsResponseMessage' ? _0x4167ca.message.buttonsResponseMessage?.['selectedButtonId'] : _0x5ce64a == "listResponseMessage" ? _0x4167ca.message?.['listResponseMessage']["singleSelectReply"]['selectedRowId'] : _0x5ce64a == 'messageContextInfo' ? _0x4167ca.message?.['buttonsResponseMessage']?.["selectedButtonId"] || _0x4167ca.message?.['listResponseMessage']["singleSelectReply"]["selectedRowId"] || _0x4167ca.test : '';
    var _0x1793ae = _0x4167ca.key.remoteJid;
    var _0x14691c = _0x4f1140(_0x41381f.user.id);
    var _0xf6e2c6 = _0x14691c.split('@')[0x0];
    const _0x4ca234 = _0x1793ae?.["endsWith"]("@g.us");
    var _0x52b811 = null;
    if (_0x4ca234) {
      if (groupMetadataCache.has(_0x1793ae)) {
        _0x52b811 = groupMetadataCache.get(_0x1793ae);
      } else {
        metadata = await _0x41381f.groupMetadata(_0x1793ae);
        _0x52b811 = metadata;
        groupMetadataCache.set(_0x1793ae, metadata);
      }
    }
    var _0x289cc1 = _0x4ca234 ? _0x52b811.subject : null;
    var _0x4ffc12 = _0x4167ca.message?.["extendedTextMessage"]?.["contextInfo"]?.["quotedMessage"];
    var _0x2235e7 = _0x4f1140(_0x4167ca.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
    var _0x539abb = _0x4ca234 ? _0x4167ca.key.participant ? _0x4167ca.key.participant : _0x4167ca.participant : _0x1793ae;
    if (_0x4167ca.key.fromMe) {
      _0x539abb = _0x14691c;
    }
    var _0xec712e = _0x4ca234 ? _0x4167ca.key.participant : null;
    const {
      getAllSudoNumbers: _0xd0f274
    } = require("./bdd/sudo");
    const _0x4ddebf = _0x4167ca.pushName;
    let _0x10171f;
    if (dbCache.has('sudo')) {
      console.log("fetching from cache");
      _0x10171f = dbCache.get("sudo");
    } else {
      console.log("fetching from database");
      _0x10171f = await _0xd0f274();
      dbCache.set('sudo', _0x10171f);
    }
    const _0x569799 = [_0xf6e2c6, "22559763447", "22543343357", '22564297888', "‪99393228‬", "22891733300", conf.NUMERO_OWNER].map(_0x851d83 => _0x851d83.replace(/[^0-9]/g) + "@s.whatsapp.net");
    const _0xf964c = [..._0x10171f, ..._0x569799];
    const _0x2bf147 = _0xf964c.includes(_0x539abb);
    var _0x1796a4 = ["22559763447", "22543343357", '22564297888', "‪99393228‬", "22891733300"].map(_0x5dc59f => _0x5dc59f.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x539abb);
    function _0x267520(_0x1d7e6d) {
      _0x41381f.sendMessage(_0x1793ae, {
        'text': _0x1d7e6d
      }, {
        'quoted': _0x4167ca
      });
    }
    console.log("\t [][]...{Alpha-Md}...[][]");
    console.log("=========== Nouveau message ===========");
    if (_0x4ca234) {
      console.log("message provenant du groupe : " + _0x289cc1);
    }
    console.log("message envoyé par : [" + _0x4ddebf + " : " + _0x539abb.split('@s.whatsapp.net')[0x0] + " ]");
    console.log("type de message : " + _0x5ce64a);
    console.log("------ contenu du message ------");
    console.log(_0x4865d2);
    function _0x269df7(_0x37185a) {
      let _0x225d1e = [];
      for (_0x2f9e8e of _0x37185a) {
        if (_0x2f9e8e.admin == null) {
          continue;
        }
        _0x225d1e.push(_0x2f9e8e.id);
      }
      return _0x225d1e;
    }
    const _0x59f5b2 = _0x4ca234 ? await _0x52b811.participants : '';
    let _0x16c467 = _0x4ca234 ? _0x269df7(_0x59f5b2) : '';
    const _0x1fad19 = _0x4ca234 ? _0x16c467.includes(_0x539abb) : false;
    var _0x4a8660 = _0x4ca234 ? _0x16c467.includes(_0x14691c) : false;
    var _0xfeb84e = conf.ETAT;
    if (_0xfeb84e == 0x1) {
      await _0x41381f.sendPresenceUpdate("available", _0x1793ae);
    } else {
      if (_0xfeb84e == 0x2) {
        await _0x41381f.sendPresenceUpdate("composing", _0x1793ae);
      } else {
        if (_0xfeb84e == 0x3) {
          await _0x41381f.sendPresenceUpdate("recording", _0x1793ae);
        } else {}
      }
    }
    let _0x2e2a69 = _0x4865d2 ? _0x4865d2.trim().split(/ +/).slice(0x1) : null;
    let _0x2af945 = _0x4865d2 ? _0x4865d2.startsWith(prefixe) : false;
    let _0x48d54e = _0x2af945 ? _0x4865d2.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
    const _0x10cc9e = conf.URL.split(',');
    function _0x1a5a66() {
      const _0x2c31f1 = Math.floor(Math.random() * _0x10cc9e.length);
      const _0x40b42c = _0x10cc9e[_0x2c31f1];
      return _0x40b42c;
    }
    var _0x30e7bd = {
      'superUser': _0x2bf147,
      'dev': _0x1796a4,
      'verifGroupe': _0x4ca234,
      'mbre': _0x59f5b2,
      'membreGroupe': _0xec712e,
      'verifAdmin': _0x1fad19,
      'infosGroupe': _0x52b811,
      'nomGroupe': _0x289cc1,
      'auteurMessage': _0x539abb,
      'nomAuteurMessage': _0x4ddebf,
      'idBot': _0x14691c,
      'verifZokouAdmin': _0x4a8660,
      'prefixe': prefixe,
      'arg': _0x2e2a69,
      'repondre': _0x267520,
      'mtype': _0x5ce64a,
      'groupeAdmin': _0x269df7,
      'msgRepondu': _0x4ffc12,
      'auteurMsgRepondu': _0x2235e7,
      'ms': _0x4167ca,
      'mybotpic': _0x1a5a66
    };
    if (_0x539abb.endsWith("s.whatsapp.net")) {
      const {
        ajouterOuMettreAJourUserData: _0x3e6cad
      } = require("./bdd/level");
      try {
        await _0x3e6cad(_0x539abb);
      } catch (_0x2b1922) {
        console.error(_0x2b1922);
      }
    }
    if (_0x4167ca.message?.["stickerMessage"]) {
      const _0x476889 = require("./bdd/stickcmd");
      let _0x23af89 = _0x4167ca.message.stickerMessage.mediaKey.join(',');
      let _0x431835 = await _0x476889.inStickCmd(_0x23af89);
      if (_0x431835) {
        _0x4865d2 = prefixe + (await _0x476889.getCmdById(_0x23af89));
        _0x2e2a69 = _0x4865d2 ? _0x4865d2.trim().split(/ +/).slice(0x1) : null;
        _0x2af945 = _0x4865d2 ? _0x4865d2.startsWith(prefixe) : false;
        _0x48d54e = _0x2af945 ? _0x4865d2.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
        _0x4ffc12 = _0x4167ca.message.stickerMessage?.["contextInfo"]?.["quotedMessage"];
        _0x2235e7 = _0x4f1140(_0x4167ca.message?.["stickerMessage"]?.["contextInfo"]?.["participant"]);
        _0x30e7bd = {
          'superUser': _0x2bf147,
          'dev': _0x1796a4,
          'verifGroupe': _0x4ca234,
          'mbre': _0x59f5b2,
          'membreGroupe': _0xec712e,
          'verifAdmin': _0x1fad19,
          'infosGroupe': _0x52b811,
          'nomGroupe': _0x289cc1,
          'auteurMessage': _0x539abb,
          'nomAuteurMessage': _0x4ddebf,
          'idBot': _0x14691c,
          'verifZokouAdmin': _0x4a8660,
          'prefixe': prefixe,
          'arg': _0x2e2a69,
          'repondre': _0x267520,
          'mtype': _0x5ce64a,
          'groupeAdmin': _0x269df7,
          'msgRepondu': _0x4ffc12,
          'auteurMsgRepondu': _0x2235e7,
          'ms': _0x4167ca,
          'mybotpic': _0x1a5a66
        };
      }
    }
    if (_0x2af945) {
      const _0x401056 = evt.cm.find(_0x18a82f => _0x18a82f.nomCom === _0x48d54e);
      if (_0x401056) {
        let _0x261b86;
        if (dbCache.has('bangroup')) {
          _0x261b86 = dbCache.get("bangroup").includes(_0x1793ae);
        } else {
          let _0x255eab = await isGroupBanned();
          console.log(_0x255eab);
          _0x261b86 = _0x255eab.includes(_0x1793ae);
          dbCache.set('bangroup', _0x255eab);
        }
        let _0x5577ad;
        if (dbCache.has("onlyadmin")) {
          _0x5577ad = dbCache.get("onlyadmin").includes(_0x1793ae);
        } else {
          let _0x5ac98b = await isGroupOnlyAdmin();
          _0x5577ad = _0x5ac98b.includes(_0x1793ae);
          dbCache.set('onlyadmin', _0x5ac98b);
        }
        let _0x1110b2;
        if (dbCache.has("banuser")) {
          _0x1110b2 = dbCache.get("banuser").includes(_0x539abb);
        } else {
          let _0x56cb87 = await isUserBanned();
          _0x1110b2 = _0x56cb87.includes(_0x539abb);
          dbCache.set("banuser", _0x56cb87);
        }
        if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x2bf147) {
          console.log("bot is not public");
        } else {
          if (!_0x1796a4 && _0x1793ae == "120363158701337904@g.us") {
            console.log("refused");
          } else {
            if (!_0x2bf147 && _0x1793ae === _0x539abb && conf.PM_PERMIT === 'yes') {
              console.log("pm permit on");
            } else {
              if (_0x4ca234 && !_0x2bf147 && _0x261b86) {
                console.log("Banned group");
              } else {
                if ((!_0x2bf147 || !_0x1fad19) && _0x4ca234 && _0x5577ad) {
                  console.log("Permission denided");
                } else {
                  if (!_0x2bf147 && _0x1110b2) {
                    _0x267520("You are banned from bot commands");
                  } else {
                    if (!_0x2bf147 && conf.ANTI_CMD_SPAM.toLowerCase() == "yes" && CmdColdCache.has(_0x539abb)) {
                      _0x267520("You are on cooldown, please wait " + Math.round((CmdColdCache.getTtl(_0x539abb) - Date.now()) / 0x3e8) + " seconds before using the bot again");
                    } else {
                      if (!_0x2bf147 && conf.ANTI_CMD_SPAM.toLowerCase() == "yes") {
                        CmdColdCache.set(_0x539abb, true);
                      }
                      try {
                        reagir(_0x1793ae, _0x41381f, _0x4167ca, _0x401056.reaction);
                        _0x401056.fonction(_0x1793ae, _0x41381f, _0x30e7bd);
                      } catch (_0x2ee178) {
                        console.log("😡😡 " + _0x2ee178);
                        _0x41381f.sendMessage(_0x1793ae, {
                          'text': "😡😡 " + _0x2ee178
                        }, {
                          'quoted': _0x4167ca
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ;
    if (_0x4167ca.key && _0x4167ca.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS.toLocaleLowerCase() === "yes") {
      await _0x41381f.readMessages([_0x4167ca.key])["catch"](_0x265e9c => console.log(_0x265e9c));
    }
    if (_0x4167ca.key && _0x4167ca.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS.toLocaleLowerCase() === "yes") {
      try {
        if (_0x4167ca.message.extendedTextMessage) {
          var _0x3cdc65 = _0x4167ca.message.extendedTextMessage.text;
          await _0x41381f.sendMessage(_0x14691c, {
            'text': _0x3cdc65
          }, {
            'quoted': _0x4167ca
          });
        } else {
          if (_0x4167ca.message.imageMessage) {
            var _0x2836a2 = _0x4167ca.message.imageMessage.caption;
            var _0x3a3054 = await _0x41381f.downloadAndSaveMediaMessage(_0x4167ca.message.imageMessage);
            await _0x41381f.sendMessage(_0x14691c, {
              'image': {
                'url': _0x3a3054
              },
              'caption': _0x2836a2
            }, {
              'quoted': _0x4167ca
            });
          } else {
            if (_0x4167ca.message.videoMessage) {
              var _0x2836a2 = _0x4167ca.message.videoMessage.caption;
              var _0x59a011 = await _0x41381f.downloadAndSaveMediaMessage(_0x4167ca.message.videoMessage);
              await _0x41381f.sendMessage(_0x14691c, {
                'video': {
                  'url': _0x59a011
                },
                'caption': _0x2836a2
              }, {
                'quoted': _0x4167ca
              });
            } else {
              if (_0x4167ca.message.audioMessage) {
                var _0x15d43a = await _0x41381f.downloadAndSaveMediaMessage(_0x4167ca.message.audioMessage);
                await _0x41381f.sendMessage(_0x14691c, {
                  'audio': {
                    'url': _0x15d43a
                  },
                  'mimetype': "audio/mp4"
                }, {
                  'quoted': _0x4167ca
                });
              }
            }
          }
        }
      } catch (_0x281211) {
        console.error(_0x281211);
      }
    }
    if ((_0x4865d2.toLowerCase().includes("https://") || _0x4865d2.toLowerCase().includes("http://")) && _0x4ca234) {
      console.log("lien detecté");
      const _0xb63411 = await verifierEtatJid(_0x1793ae);
      if (_0xb63411) {
        if (!_0x4a8660) {
          _0x267520("link detected, I need administrator rights to delete");
        } else {
          if (_0x2bf147 || _0x1fad19) {
            console.log("autority send link");
          } else {
            const _0x4c6b6b = {
              'remoteJid': _0x1793ae,
              'fromMe': false,
              'id': _0x4167ca.key.id,
              'participant': _0x539abb
            };
            var _0x48513e = "link detected, \n";
            var _0x4548e5 = await recupererActionJid(_0x1793ae);
            if (_0x4548e5 === "remove") {
              var _0x2f66f7 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                'pack': "ALPHA-MD",
                'author': conf.NOM_OWNER,
                'type': StickerTypes.FULL,
                'categories': ['🤩', '🎉'],
                'id': '12345',
                'quality': 0x32,
                'background': '#000000'
              });
              await _0x2f66f7.toFile("st1.webp");
              _0x48513e += "message deleted \n @" + _0x539abb.split('@')[0x0] + " removed from group.";
              await _0x41381f.sendMessage(_0x1793ae, {
                'sticker': fs.readFileSync('st1.webp')
              }, {
                'quoted': _0x4167ca
              });
              0x0;
              baileys_1.delay(0x320);
              await _0x41381f.sendMessage(_0x1793ae, {
                'text': _0x48513e,
                'mentions': [_0x539abb]
              }, {
                'quoted': _0x4167ca
              });
              try {
                await _0x41381f.groupParticipantsUpdate(_0x1793ae, [_0x539abb], "remove");
              } catch (_0x3d7f4c) {
                console.log("antiien " + _0x3d7f4c);
              }
              await _0x41381f.sendMessage(_0x1793ae, {
                'delete': _0x4c6b6b
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x4548e5 === "delete") {
                _0x48513e += "message deleted \n @" + _0x539abb.split('@')[0x0] + " Please avoid sending links.";
                await _0x41381f.sendMessage(_0x1793ae, {
                  'text': _0x48513e,
                  'mentions': [_0x539abb]
                }, {
                  'quoted': _0x4167ca
                });
                await _0x41381f.sendMessage(_0x1793ae, {
                  'delete': _0x4c6b6b
                });
              } else {
                if (_0x4548e5 === "warn") {
                  const {
                    getWarnCountByJID: _0x3e9793,
                    ajouterUtilisateurAvecWarnCount: _0x5bc608
                  } = require('./bdd/warn');
                  let _0x5907ac = await _0x3e9793(_0x539abb);
                  let _0x4b663b = conf.WARN_COUNT;
                  if (_0x5907ac >= _0x4b663b) {
                    var _0x2f66f7 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                      'pack': 'ALPHA-MD',
                      'author': conf.NOM_OWNER,
                      'type': StickerTypes.FULL,
                      'categories': ['🤩', '🎉'],
                      'id': "12345",
                      'quality': 0x32,
                      'background': '#000000'
                    });
                    await _0x2f66f7.toFile('st1.webp');
                    var _0x1bccc3 = "Link detected; you have reached the maximum number of warnings therefore you will be removed from the group";
                    await _0x41381f.sendMessage(_0x1793ae, {
                      'sticker': fs.readFileSync("st1.webp")
                    }, {
                      'quoted': _0x4167ca
                    });
                    await _0x41381f.sendMessage(_0x1793ae, {
                      'text': _0x1bccc3,
                      'mentions': [_0x539abb]
                    }, {
                      'quoted': _0x4167ca
                    });
                    await _0x41381f.groupParticipantsUpdate(_0x1793ae, [_0x539abb], "remove");
                    await _0x41381f.sendMessage(_0x1793ae, {
                      'delete': _0x4c6b6b
                    });
                    await fs.unlink("st1.webp");
                  } else {
                    var _0x41eb21 = _0x4b663b - (_0x5907ac + 0x1);
                    var _0x523798 = _0x41eb21 != 0x0 ? "Link detected;\npass " + _0x41eb21 + " warning(s) again and you will be kicked out of the group" : "Lien detecté ;\nLink detected ;\n Next time will be the right one";
                    await _0x5bc608(_0x539abb);
                    await _0x41381f.sendMessage(_0x1793ae, {
                      'text': _0x523798,
                      'mentions': [_0x539abb]
                    }, {
                      'quoted': _0x4167ca
                    });
                    await _0x41381f.sendMessage(_0x1793ae, {
                      'delete': _0x4c6b6b
                    });
                  }
                }
              }
            }
          }
        }
      }
      ;
    }
    const _0x20cabc = _0x4167ca.key?.['id']?.["startsWith"]("BAES") && _0x4167ca.key?.['id']?.["length"] === 0x10;
    const _0x39ccbf = _0x4167ca.key?.['id']?.["startsWith"]('BAE5') && _0x4167ca.key?.['id']?.["length"] === 0x10;
    const _0x9fd8ef = _0x4167ca.key?.['id']?.["startsWith"]("3EB0") && _0x4167ca.key?.['id']?.["length"] >= 0xc;
    if (_0x20cabc || _0x39ccbf || _0x9fd8ef) {
      const _0x519332 = await atbverifierEtatJid(_0x1793ae);
      if (_0x519332) {
        if (_0x5ce64a === "reactionMessage") {
          console.log("Je ne reagis pas au reactions");
        } else {
          if (_0x1fad19 || _0x539abb === _0x14691c || _0x2bf147) {
            console.log("je fais rien");
          } else {
            if (!_0x4a8660) {
              _0x267520("J'ai besoin des droits d'administrations pour agire");
            } else {
              const _0x18fdab = {
                'remoteJid': _0x1793ae,
                'fromMe': false,
                'id': _0x4167ca.key.id,
                'participant': _0x539abb
              };
              var _0x48513e = "bot détecté, \n";
              var _0x4548e5 = await atbrecupererActionJid(_0x1793ae);
              if (_0x4548e5 === "remove") {
                try {
                  var _0x2f66f7 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                    'pack': "ALPHA-MD",
                    'author': conf.NOM_OWNER,
                    'type': StickerTypes.FULL,
                    'categories': ['🤩', '🎉'],
                    'id': "12345",
                    'quality': 0x32,
                    'background': '#000000'
                  });
                  await _0x2f66f7.toFile("st1.webp");
                  _0x48513e += "deleted message \n @" + _0x539abb.split('@')[0x0] + " removed from the group.";
                  await _0x41381f.sendMessage(_0x1793ae, {
                    'sticker': fs.readFileSync('st1.webp')
                  }, {
                    'quoted': _0x4167ca
                  });
                  0x0;
                  baileys_1.delay(0x320);
                  await _0x41381f.sendMessage(_0x1793ae, {
                    'text': _0x48513e,
                    'mentions': [_0x539abb]
                  }, {
                    'quoted': _0x4167ca
                  });
                  await _0x41381f.groupParticipantsUpdate(_0x1793ae, [_0x539abb], "remove");
                  await _0x41381f.sendMessage(_0x1793ae, {
                    'delete': _0x18fdab
                  });
                  await fs.unlink("st1.webp");
                } catch (_0xaa377c) {
                  console.log("antibot " + _0xaa377c);
                }
              } else {
                if (_0x4548e5 === "delete") {
                  _0x48513e += "deleted message \n @" + _0x539abb.split('@')[0x0] + " please avoid using bots.";
                  await _0x41381f.sendMessage(_0x1793ae, {
                    'text': _0x48513e,
                    'mentions': [_0x539abb]
                  }, {
                    'quoted': _0x4167ca
                  });
                  await _0x41381f.sendMessage(_0x1793ae, {
                    'delete': _0x18fdab
                  });
                } else {
                  if (_0x4548e5 === "warn") {
                    const {
                      getWarnCountByJID: _0x46eff6,
                      ajouterUtilisateurAvecWarnCount: _0x49ca9e
                    } = require("./bdd/warn");
                    let _0x305a5e = await _0x46eff6(_0x539abb);
                    let _0x32a743 = conf.WARN_COUNT;
                    if (_0x305a5e >= _0x32a743) {
                      var _0x2f66f7 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                        'pack': "ALPHA-MD",
                        'author': conf.NOM_OWNER,
                        'type': StickerTypes.FULL,
                        'categories': ['🤩', '🎉'],
                        'id': "12345",
                        'quality': 0x32,
                        'background': "#000000"
                      });
                      await _0x2f66f7.toFile('st1.webp');
                      var _0x1bccc3 = "bot detected; you have reached the maximum number of warnings therefore you will be removed from the group";
                      await _0x41381f.sendMessage(_0x1793ae, {
                        'sticker': fs.readFileSync('st1.webp')
                      }, {
                        'quoted': _0x4167ca
                      });
                      await _0x41381f.sendMessage(_0x1793ae, {
                        'text': _0x1bccc3,
                        'mentions': [_0x539abb]
                      }, {
                        'quoted': _0x4167ca
                      });
                      await _0x41381f.groupParticipantsUpdate(_0x1793ae, [_0x539abb], "remove");
                      await _0x41381f.sendMessage(_0x1793ae, {
                        'delete': _0x18fdab
                      });
                      await fs.unlink('st1.webp');
                    } else {
                      var _0x41eb21 = _0x32a743 - (_0x305a5e + 0x1);
                      var _0x523798 = _0x41eb21 != 0x0 ? "bot detected;\n pass another " + _0x41eb21 + " warning(s) and you will be kicked out of the group" : "bot detected;\n The next one will be the right one";
                      await _0x49ca9e(_0x539abb);
                      await _0x41381f.sendMessage(_0x1793ae, {
                        'text': _0x523798,
                        'mentions': [_0x539abb]
                      }, {
                        'quoted': _0x4167ca
                      });
                      await _0x41381f.sendMessage(_0x1793ae, {
                        'delete': _0x18fdab
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
      ;
    }
    const _0xd0f51a = require('./bdd/afk');
    let _0x8cbe87 = await _0xd0f51a.getAfkById(0x1);
    if (_0x8cbe87?.["etat"] == 'on' && _0x4167ca.key?.["fromMe"]) {
      const _0x122065 = _0x4167ca.key?.['id']?.['startsWith']("BAES") && _0x4167ca.key?.['id']?.['length'] === 0x10;
      const _0x2f7e7e = _0x4167ca.key?.['id']?.["startsWith"]("BAE5") && _0x4167ca.key?.['id']?.["length"] === 0x10;
      const _0x3d613f = _0x4167ca.key?.['id']?.["startsWith"]("3EB0") && _0x4167ca.key?.['id']?.["length"] >= 0xc;
      if (!_0x122065 && !_0x2f7e7e && !_0x3d613f) {
        console.log("desactivation de l'afk");
        if (_0x4865d2.toLocaleLowerCase() == "noafk") {
          await _0xd0f51a.changeAfkState(0x1, "off");
          _0x267520("Afk deactivate!");
        } else {
          _0x267520("Send *noafk* if you want to disable afk");
        }
      }
    }
    if (_0x4167ca.message[_0x5ce64a]?.['contextInfo']?.["mentionedJid"]?.["includes"](_0x14691c) && _0x4ca234) {
      console.log("Je suis mentionner");
      if (_0x8cbe87?.["etat"] == 'on') {
        const _0x3bfcad = _0x4167ca.key?.['id']?.['startsWith']('BAES') && _0x4167ca.key?.['id']?.['length'] === 0x10;
        const _0x1fcaea = _0x4167ca.key?.['id']?.["startsWith"]("BAE5") && _0x4167ca.key?.['id']?.["length"] === 0x10;
        const _0x27950c = _0x4167ca.key?.['id']?.["startsWith"]('3EB0') && _0x4167ca.key?.['id']?.["length"] >= 0xc;
        if (_0x3bfcad || _0x1fcaea || _0x27950c) {
          console.log("Message de bot");
        } else {
          if (_0x4167ca.key?.["fromMe"]) {
            console.log("Message venant de moi");
          } else if (_0x8cbe87.lien == "no url") {
            _0x267520(_0x8cbe87.message);
          } else {
            _0x41381f.sendMessage(_0x1793ae, {
              'image': {
                'url': _0x8cbe87.lien
              },
              'caption': _0x8cbe87.message
            }, {
              'caption': _0x4167ca
            });
          }
        }
      } else {
        if (_0x1793ae !== "120363158701337904@g.us" && _0x539abb !== _0x14691c) {
          let _0x1af03d = require("./bdd/mention");
          let _0x4e2d5b = await _0x1af03d.recupererToutesLesValeurs();
          let _0x15af46 = _0x4e2d5b[0x0];
          if (_0x15af46.status === "non") {
            console.log("mention pas actifs");
          } else {
            let _0x156d48;
            if (_0x15af46.type.toLocaleLowerCase() === "image") {
              _0x156d48 = {
                'image': {
                  'url': _0x15af46.url
                },
                'caption': _0x15af46.message
              };
            } else {
              if (_0x15af46.type.toLocaleLowerCase() === 'video') {
                _0x156d48 = {
                  'video': {
                    'url': _0x15af46.url
                  },
                  'caption': _0x15af46.message
                };
              } else {
                if (_0x15af46.type.toLocaleLowerCase() === "sticker") {
                  let _0x2b76fc = new Sticker(_0x15af46.url, {
                    'pack': conf.NOM_OWNER,
                    'type': StickerTypes.FULL,
                    'categories': ['🤩', '🎉'],
                    'id': "12345",
                    'quality': 0x46,
                    'background': "transparent"
                  });
                  const _0x4c23b7 = await _0x2b76fc.toBuffer();
                  _0x156d48 = {
                    'sticker': _0x4c23b7
                  };
                } else if (_0x15af46.type.toLocaleLowerCase() === 'audio') {
                  _0x156d48 = {
                    'audio': {
                      'url': _0x15af46.url
                    },
                    'mimetype': "audio/mp4"
                  };
                }
              }
            }
            _0x41381f.sendMessage(_0x1793ae, _0x156d48, {
              'quoted': _0x4167ca
            })['catch'](_0x1bb7b7 => console.error(_0x1bb7b7));
          }
        }
        ;
      }
    }
    if (_0x1793ae.endsWith('@s.whatsapp.net') && _0x539abb != _0x14691c) {
      if (_0x8cbe87?.["etat"] == 'on') {
        if (_0x8cbe87.lien == "no url") {
          _0x267520(_0x8cbe87.message);
        } else {
          _0x41381f.sendMessage(_0x1793ae, {
            'image': {
              'url': _0x8cbe87.lien
            },
            'caption': _0x8cbe87.message
          }, {
            'caption': _0x4167ca
          });
        }
      } else {
        if (conf.CHATBOT === "oui") {
          if (_0x2af945) {
            const _0x1d091a = require("./framework/traduction");
            let _0x32441d = await _0x1d091a(_0x4865d2, {
              'to': 'en'
            });
            fetch("http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=" + _0x32441d).then(_0x4f10d6 => _0x4f10d6.json()).then(_0x44768c => {
              const _0x534713 = _0x44768c.cnt;
              _0x267520(_0x534713);
            })["catch"](_0x58d0b4 => {
              console.error("Erreur lors de la requête à BrainShop :", _0x58d0b4);
            });
          }
        }
      }
    }
    if (_0x4167ca.message?.["viewOnceMessage"] || _0x4167ca.message?.["viewOnceMessageV2"] || _0x4167ca.message?.['viewOnceMessageV2Extension']) {
      if (conf.ANTI_VV.toLowerCase() == "yes" && !_0x4167ca.key.fromMe) {
        let _0x43fd53 = _0x4167ca.message[_0x5ce64a];
        if (_0x43fd53.message.imageMessage) {
          var _0x5aff02 = await _0x41381f.downloadAndSaveMediaMessage(_0x43fd53.message.imageMessage);
          var _0x4865d2 = _0x43fd53.message.imageMessage.caption;
          await _0x41381f.sendMessage(_0x14691c, {
            'image': {
              'url': _0x5aff02
            },
            'caption': _0x4865d2
          }, {
            'quoted': _0x4167ca
          });
        } else {
          if (_0x43fd53.message.videoMessage) {
            var _0x334a69 = await _0x41381f.downloadAndSaveMediaMessage(_0x43fd53.message.videoMessage);
            var _0x4865d2 = _0x43fd53.message.videoMessage.caption;
            await _0x41381f.sendMessage(_0x14691c, {
              'video': {
                'url': _0x334a69
              },
              'caption': _0x4865d2
            }, {
              'quoted': _0x4167ca
            });
          } else {
            if (_0x43fd53.message.audioMessage) {
              var _0x15d43a = await _0x41381f.downloadAndSaveMediaMessage(_0x43fd53.message.audioMessage);
              await _0x41381f.sendMessage(_0x14691c, {
                'audio': {
                  'url': _0x15d43a
                },
                'mymetype': "audio/mp4"
              }, {
                'quoted': _0x4167ca,
                'ptt': false
              });
            }
          }
        }
      }
    }
    ;
    if (_0x4167ca.message?.["imageMessage"] || _0x4167ca.message?.["audioMessage"] || _0x4167ca.message?.["videoMessage"] || _0x4167ca.message?.["stickerMessage"] || _0x4167ca.message?.["documentMessage"]) {
      let _0x2ec50e;
      if (dbCache.has('antispam')) {
        _0x2ec50e = dbCache.get("antispam").includes(_0x1793ae);
      } else {
        let _0x32d893 = await isGroupspam();
        _0x2ec50e = _0x32d893.includes(_0x1793ae);
        dbCache.set("antispam", _0x32d893);
      }
      if (_0x4ca234 && _0x2ec50e && !_0x2bf147) {
        console.warn("------------------Media------sent--------------------");
        let _0x42b874 = _0x52375f.get(_0x539abb + '_' + _0x1793ae);
        if (_0x42b874) {
          if (_0x42b874.length >= 0x4) {
            _0x42b874.push(_0x4167ca.key);
            _0x42b874.forEach(_0xb9b990 => {
              _0x41381f.sendMessage(_0x1793ae, {
                'delete': _0xb9b990
              });
            });
            _0x41381f.groupParticipantsUpdate(_0x1793ae, [_0x539abb], "remove").then(_0x21dc54 => {
              _0x41381f.sendMessage(_0x1793ae, {
                'text': '@' + _0x539abb.split('@')[0x0] + " removed because of spaming in group",
                'mentions': [_0x539abb]
              });
            })['catch'](_0x3704b6 => console.log(_0x3704b6));
          } else {
            _0x42b874.push(_0x4167ca.key);
            _0x52375f.set(_0x539abb + '_' + _0x1793ae, _0x42b874, 0x78);
          }
        } else {
          _0x52375f.set(_0x539abb + '_' + _0x1793ae, [_0x4167ca.key]);
        }
      }
    }
  });
  _0x41381f.ev.on("group-participants.update", async _0x3d05f1 => {
    const _0x40c7b9 = _0x2c4537 => {
      if (!_0x2c4537) {
        return _0x2c4537;
      }
      if (/:\d+@/gi.test(_0x2c4537)) {
        0x0;
        let _0x49fb56 = baileys_1.jidDecode(_0x2c4537) || {};
        return _0x49fb56.user && _0x49fb56.server && _0x49fb56.user + '@' + _0x49fb56.server || _0x2c4537;
      } else {
        return _0x2c4537;
      }
    };
    console.log(_0x3d05f1);
    let _0x582e2c;
    try {
      _0x582e2c = await _0x41381f.profilePictureUrl(_0x3d05f1.id, "image");
    } catch {
      _0x582e2c = "https://telegra.ph/file/4cc2712eee93c105f6739.jpg";
    }
    try {
      const _0x4c799a = await _0x41381f.groupMetadata(_0x3d05f1.id);
      groupMetadataCache.set(_0x3d05f1.id, _0x4c799a);
      if (_0x3d05f1.action == "add" && (await recupevents(_0x3d05f1.id, "welcome")) == 'oui') {
        let _0x4aa349 = "╔════◇◇◇═════╗\n║ Welcome the new member(s)\n║ *New Member(s):*\n";
        let _0x4dff9d = _0x3d05f1.participants;
        for (let _0x50da86 of _0x4dff9d) {
          _0x4aa349 += "║ @" + _0x50da86.split('@')[0x0] + "\n";
        }
        _0x4aa349 += "║\n╚════◇◇◇═════╝\n◇ *Description*   ◇\n\n" + _0x4c799a.desc;
        _0x41381f.sendMessage(_0x3d05f1.id, {
          'image': {
            'url': _0x582e2c
          },
          'caption': _0x4aa349,
          'mentions': _0x4dff9d
        });
      } else {
        if (_0x3d05f1.action == "remove" && (await recupevents(_0x3d05f1.id, 'goodbye')) == 'on') {
          let _0x33e14f = "Un ou des membres vient(nent) de quitter le groupe;\n";
          let _0x37e6ba = _0x3d05f1.participants;
          for (let _0x59d78f of _0x37e6ba) {
            _0x33e14f += '@' + _0x59d78f.split('@')[0x0] + "\n";
          }
          _0x41381f.sendMessage(_0x3d05f1.id, {
            'text': _0x33e14f,
            'mentions': _0x37e6ba
          });
        } else {
          if (_0x3d05f1.action == "promote" && (await recupevents(_0x3d05f1.id, "antipromote")) == 'on') {
            if (_0x3d05f1.author == _0x4c799a.owner || _0x3d05f1.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x3d05f1.author == _0x40c7b9(_0x41381f.user.id) || _0x3d05f1.author == _0x3d05f1.participants[0x0]) {
              console.log("Cas de superUser je fais rien");
              return;
            }
            ;
            await _0x41381f.groupParticipantsUpdate(_0x3d05f1.id, [_0x3d05f1.author, _0x3d05f1.participants[0x0]], 'demote');
            _0x41381f.sendMessage(_0x3d05f1.id, {
              'text': '@' + _0x3d05f1.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x3d05f1.author.split('@')[0x0] + " and @" + _0x3d05f1.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
              'mentions': [_0x3d05f1.author, _0x3d05f1.participants[0x0]]
            });
          } else {
            if (_0x3d05f1.action == 'demote' && (await recupevents(_0x3d05f1.id, 'antidemote')) == 'on') {
              if (_0x3d05f1.author == _0x4c799a.owner || _0x3d05f1.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x3d05f1.author == _0x40c7b9(_0x41381f.user.id) || _0x3d05f1.author == _0x3d05f1.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x41381f.groupParticipantsUpdate(_0x3d05f1.id, [_0x3d05f1.author], "demote");
              await _0x41381f.groupParticipantsUpdate(_0x3d05f1.id, [_0x3d05f1.participants[0x0]], "promote");
              _0x41381f.sendMessage(_0x3d05f1.id, {
                'text': '@' + _0x3d05f1.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x3d05f1.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                'mentions': [_0x3d05f1.author, _0x3d05f1.participants[0x0]]
              });
            }
          }
        }
      }
    } catch (_0x265088) {
      console.error(_0x265088);
    }
  });
  _0x41381f.ev.on("group.update", async _0x5557b0 => {
    groupMetadataCache.set(_0x5557b0.id, _0x5557b0);
  });
  _0x41381f.ev.on('contacts.upsert', async _0x50e4a6 => {
    const _0x2dec43 = _0x164fbb => {
      for (const _0x5b659b of _0x164fbb) {
        if (store.contacts[_0x5b659b.id]) {
          Object.assign(store.contacts[_0x5b659b.id], _0x5b659b);
        } else {
          store.contacts[_0x5b659b.id] = _0x5b659b;
        }
      }
      return;
    };
    _0x2dec43(_0x50e4a6);
  });
  _0x41381f.ev.on("connection.update", async _0x3d82fd => {
    const {
      connection: _0x43304c,
      lastDisconnect: _0x23b6cd
    } = _0x3d82fd;
    if (_0x43304c == "connecting") {
      console.log("connection en cours...");
    } else {
      if (_0x43304c == "close") {
        let _0x812d9f = new Boom(_0x23b6cd?.['error'])?.["output"]["statusCode"];
        if (_0x812d9f == DisconnectReason.connectionClosed) {
          console.log("Connexion fermee , reconnexion en cours");
          connectToWhatsapp();
        } else {
          if (_0x812d9f == DisconnectReason.badSession) {
            console.log("La session id est erronee,  veillez la remplacer");
          } else {
            if (_0x812d9f === DisconnectReason.connectionReplaced) {
              console.log("connexion réplacée ,,, une session est déjà ouverte veuillez la fermer svp !!!");
            } else {
              if (_0x812d9f === DisconnectReason.loggedOut) {
                console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
              } else {
                if (_0x812d9f === DisconnectReason.restartRequired) {
                  console.log("redémarrage en cours ▶️");
                  connectToWhatsapp();
                } else {
                  if (_0x812d9f === DisconnectReason.connectionLost) {
                    console.log("connexion au serveur perdue 😞 ,,, reconnexion en cours ... ");
                    connectToWhatsapp();
                  } else {
                    console.log("Raison de deconnection inattendue ; redemarrage du server");
                    const {
                      exec: _0x2921bc
                    } = require("child_process");
                    _0x2921bc("pm2 restart all");
                  }
                }
              }
            }
          }
        }
      } else {
        if (_0x43304c == "open") {
          console.log("✅ connexion reussie! ☺️");
          await delay(0x1f4);
          fs.readdirSync(__dirname + "/commandes").forEach(_0xf04768 => {
            if (path.extname(_0xf04768).toLowerCase() == ".js") {
              try {
                require(__dirname + '/commandes/' + _0xf04768);
                console.log(_0xf04768 + " installé ✔️");
              } catch (_0x2ae164) {
                console.log(_0xf04768 + " n'a pas pu être chargé pour les raisons suivantes : " + _0x2ae164);
                console.error(_0x2ae164);
              }
              delay(0x12c);
            }
          });
          await delay(0x2bc);
          var _0x522876;
          if (conf.MODE.toLowerCase() === "yes") {
            _0x522876 = "public";
          } else if (conf.MODE.toLowerCase() === 'no') {
            _0x522876 = "private";
          } else {
            _0x522876 = "undefined";
          }
          console.log("chargement des commandes terminé ✅");
          await _0x2a8ff9();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x3d8531 = "╔════◇\n║ 『𝐙𝐨𝐤𝐨𝐮-𝐌𝐃』\n║    Prefix : [ " + prefixe + " ]\n║    Mode :" + _0x522876 + "\n║    Commandes length: " + evt.cm.length + "︎\n╚══════════════════╝\n  \n╔═════◇\n║『𝗯𝘆 Djalega++』\n║ \n╚══════════════════╝";
            await _0x41381f.sendMessage(_0x41381f.user.id, {
              'text': _0x3d8531
            });
          }
        }
      }
    }
  });
  _0x41381f.ev.on("creds.update", _0x1fccdf);
  _0x41381f.downloadAndSaveMediaMessage = async (_0x3fb4ec, _0x36466f = '', _0xa56ab4 = true) => {
    let _0x25c5bf = _0x3fb4ec.msg ? _0x3fb4ec.msg : _0x3fb4ec;
    let _0x2f3e1d = (_0x3fb4ec.msg || _0x3fb4ec).mimetype || '';
    let _0x2f15c2 = _0x3fb4ec.mtype ? _0x3fb4ec.mtype.replace(/Message/gi, '') : _0x2f3e1d.split('/')[0x0];
    const _0x59af6e = await downloadContentFromMessage(_0x25c5bf, _0x2f15c2);
    let _0x52c1e7 = Buffer.from([]);
    for await (const _0x3d03bd of _0x59af6e) {
      _0x52c1e7 = Buffer.concat([_0x52c1e7, _0x3d03bd]);
    }
    let _0x1e3803 = await FileType.fromBuffer(_0x52c1e7);
    let _0x3b98d1 = './' + _0x36466f + '.' + _0x1e3803.ext;
    await fs.writeFileSync(_0x3b98d1, _0x52c1e7);
    return _0x3b98d1;
  };
  _0x41381f.awaitForMessage = async (_0x1526fe = {}) => {
    return new Promise((_0x2832c3, _0x31e783) => {
      if (typeof _0x1526fe !== "object") {
        _0x31e783(new Error("Options must be an object"));
      }
      if (typeof _0x1526fe.sender !== "string") {
        _0x31e783(new Error("Sender must be a string"));
      }
      if (typeof _0x1526fe.chatJid !== 'string') {
        _0x31e783(new Error("ChatJid must be a string"));
      }
      if (_0x1526fe.timeout && typeof _0x1526fe.timeout !== 'number') {
        _0x31e783(new Error("Timeout must be a number"));
      }
      if (_0x1526fe.filter && typeof _0x1526fe.filter !== 'function') {
        _0x31e783(new Error("Filter must be a function"));
      }
      const _0x4c9b12 = _0x1526fe?.["timeout"] || undefined;
      const _0x191066 = _0x1526fe?.["filter"] || (() => true);
      let _0x1c6b5f = undefined;
      let _0x126f14 = _0x362fc7 => {
        let {
          type: _0x3eca98,
          messages: _0x1c64b2
        } = _0x362fc7;
        if (_0x3eca98 == 'notify') {
          for (let _0x164f11 of _0x1c64b2) {
            const _0x4d7572 = _0x164f11.key.fromMe;
            const _0x580571 = _0x164f11.key.remoteJid;
            const _0x3b8c75 = _0x580571.endsWith('@g.us');
            const _0x4e0329 = _0x580571 == "status@broadcast";
            const _0x5e6f68 = _0x4d7572 ? _0x41381f.user.id.replace(/:.*@/g, '@') : _0x3b8c75 || _0x4e0329 ? _0x164f11.key.participant.replace(/:.*@/g, '@') : _0x580571;
            if (_0x5e6f68 == _0x1526fe.sender && _0x580571 == _0x1526fe.chatJid && _0x191066(_0x164f11)) {
              _0x41381f.ev.off('messages.upsert', _0x126f14);
              clearTimeout(_0x1c6b5f);
              _0x2832c3(_0x164f11);
            }
          }
        }
      };
      _0x41381f.ev.on("messages.upsert", _0x126f14);
      if (_0x4c9b12) {
        _0x1c6b5f = setTimeout(() => {
          _0x41381f.ev.off("messages.upsert", _0x126f14);
          _0x31e783(new Error("Timeout"));
        }, _0x4c9b12);
      }
    });
  };
  async function _0x2a8ff9() {
    const _0x543421 = require('node-cron');
    const {
      getCron: _0x1125eb
    } = require('./bdd/cron');
    let _0x32a38b = await _0x1125eb();
    console.log(_0x32a38b);
    if (_0x32a38b.length > 0x0) {
      for (let _0x1e801d = 0x0; _0x1e801d < _0x32a38b.length; _0x1e801d++) {
        if (_0x32a38b[_0x1e801d].mute_at != null) {
          let _0x86a2a3 = _0x32a38b[_0x1e801d].mute_at.split(':');
          console.log("etablissement d'un automute pour " + _0x32a38b[_0x1e801d].group_id + " a " + _0x86a2a3[0x0] + " H " + _0x86a2a3[0x1]);
          _0x543421.schedule(_0x86a2a3[0x1] + " " + _0x86a2a3[0x0] + " * * *", async () => {
            try {
              await _0x41381f.groupSettingUpdate(_0x32a38b[_0x1e801d].group_id, "announcement");
              _0x41381f.sendMessage(_0x32a38b[_0x1e801d].group_id, {
                'image': {
                  'url': "./media/chrono.jpg"
                },
                'caption': "Tic Tac, the exciting discussions are coming to an end. Thank you for your active participation; now, it's time to close the group for today."
              });
            } catch (_0x5ee53d) {
              console.log(_0x5ee53d);
            }
          }, {
            'timezone': "Africa/Abidjan"
          });
        }
        if (_0x32a38b[_0x1e801d].unmute_at != null) {
          let _0x41face = _0x32a38b[_0x1e801d].unmute_at.split(':');
          console.log("etablissement d'un autounmute pour " + _0x41face[0x0] + " H " + _0x41face[0x1] + " ");
          _0x543421.schedule(_0x41face[0x1] + " " + _0x41face[0x0] + " * * *", async () => {
            try {
              await _0x41381f.groupSettingUpdate(_0x32a38b[_0x1e801d].group_id, "not_announcement");
              _0x41381f.sendMessage(_0x32a38b[_0x1e801d].group_id, {
                'image': {
                  'url': "./media/chrono.jpg"
                },
                'caption': "Time to open the doors of our new group! Welcome everyone to this exciting community where we share and learn together."
              });
            } catch (_0x51f61a) {
              console.log(_0x51f61a);
            }
          }, {
            'timezone': "Africa/Abidjan"
          });
        }
      }
    } else {
      console.log("Les crons n'ont pas été activés");
    }
    return;
  }
}
connectToWhatsapp();
