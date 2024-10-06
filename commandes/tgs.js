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
        'author': '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
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
