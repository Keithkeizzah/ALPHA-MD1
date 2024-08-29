const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");
zokou({
  'nomCom': "bible",
  'reaction': '📓',
  'categorie': "God-first"
}, async (_0x4cf29d, _0x20141d, _0x220f4b) => {
  const {
    repondre: _0x367c6f,
    arg: _0x3ef7d3,
    ms: _0x428b1c
  } = _0x220f4b;
  const _0xeccdd8 = _0x3ef7d3.join(" ");
  if (!_0xeccdd8) {
    return _0x367c6f("Please specify the book, the chapter and the verse you want to read. Example: bible john 3:16");
  }
  let _0x13c9ce = await fetch("https://bible-api.com/" + _0xeccdd8);
  if (!_0x13c9ce.ok) {
    return _0x367c6f("Please specify the chapter number or name. Example: bible john 3:16");
  }
  let _0x5a4afb = await _0x13c9ce.json();
  let _0x5aeaed = "📖 *THE HOLY BIBLE*\n\n📜 *_WE'RE READING:_* " + _0x5a4afb.reference + "\n\n🔢 *_NUMBER OF VERSES:_* " + _0x5a4afb.verses.length + "\n\n🤍 *_NOW READ:_* " + _0x5a4afb.text + "\n\n🌍 *_LANGUAGE_:* " + _0x5a4afb.translation_name + "\n\n\n╭────────────────◆\n│ *_Powered by ALPHA-MD._*\n╰─────────────────◆";
  await _0x367c6f(_0x5aeaed);
});
