const { zokou } = require("../framework/zokou");

zokou({
  'nomCom': 'broadcast2',
  'categorie': "Group",
  'reaction': '🏹'
}, async (_0x25a3a1, _0x4ca26d, _0xb76e62) => {
  const {
    repondre: _0x3db4c2,
    arg: _0x541a09,
    nomAuteurMessage: _0x44197a,
    superUser: _0x4b247e
  } = _0xb76e62;

  let _0x42cf53 = _0x541a09.join(" ");
  if (!_0x541a09[0]) {
    _0x3db4c2("After the command *broadcast*, type your message to be sent to all groups you are in.");
    return;
  }
  if (!_0x4b247e) {
    _0x3db4c2("You are not authorized to perform this action.");
    return;
  }

  let _0x4a4d79 = await _0x4ca26d.groupFetchAllParticipating();
  let _0x4dfd72 = Object.entries(_0x4a4d79).map(([_, group]) => group.id);

  await _0x3db4c2("*ALPHA-MD is sending your message to all groups ...*");
  for (let groupId of _0x4dfd72) {
    let _0x4c32d4 = "*🌟𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓🌟*\n\n🀄 Message: " + _0x42cf53 + "\n\n🗣️ Author: " + _0x44197a;
    await _0x4ca26d.sendMessage(groupId, {
      'image': {
        'url': 'https://telegra.ph/file/ee2916cd24336231d8194.jpg'
      },
      'caption': _0x4c32d4
    });
  }
});
