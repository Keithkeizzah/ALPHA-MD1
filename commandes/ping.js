const { zokou } = require("../framework/zokou");
const yts = require("yt-search");

zokou({
  'nomCom': "video",
  'categorie': "Search",
  'reaction': '🎥'
}, async (_0x2bd86c, _0x4cf97c, _0xf7a930) => {
  const { ms: _0x140ad7, repondre: _0x52a6f9, arg: _0x381269 } = _0xf7a930;

  if (!_0x381269[0]) {
    _0x52a6f9("Please insert a song/video name.");
    return;
  }

  try {
    let searchQuery = _0x381269.join(" ");
    let videoResults = await yts(searchQuery);

    if (videoResults && videoResults.videos.length > 0) {
      const videoUrl = videoResults.videos[0].url;
      const response = await fetch(`https://api.giftedtech.us.kg/api/download/ytmp4v2?url=${encodeURIComponent(videoUrl)}&apikey=ibrahimadams`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        const messageData = {
          image: { url: videoResults.videos[0].thumbnail },
          caption: `Bmw is downloading ${jsonResponse.result.title} by ${videoResults.videos[0].author.name}\nTime: ${videoResults.videos[0].timestamp}\n\n\n> ©Ibrahim Adams`
        };

        await _0x4cf97c.sendMessage(_0x2bd86c, messageData, { quoted: _0x140ad7 });
        await _0x4cf97c.sendMessage(_0x2bd86c, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: _0x140ad7 });
        _0x52a6f9("Downloaded Successfully ✅");
      } else {
        _0x52a6f9("Searching...⏳");
      }
    } else {
      _0x52a6f9("No videos found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    _0x52a6f9("Searching...⏳");
  }
});

zokou({
  'nomCom': "play",
  'categorie': "Download",
  'reaction': '🎧'
}, async (_0x201245, _0x299acb, _0x2e7335) => {
  const { ms: _0x44363d, repondre: _0x583693, arg: _0x55bab5 } = _0x2e7335;

  if (!_0x55bab5[0]) {
    _0x583693("Please insert a song name.");
    return;
  }

  try {
    let searchQuery = _0x55bab5.join(" ");
    let audioResults = await yts(searchQuery);

    if (audioResults && audioResults.videos.length > 0) {
      const audioUrl = audioResults.videos[0].url;
      const response = await fetch(`https://api.giftedtech.us.kg/api/download/ytmp3v2?url=${encodeURIComponent(audioUrl)}&apikey=ibrahimadams`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        const messageData = {
          image: { url: audioResults.videos[0].thumbnail },
          caption: `*ALPHA SONG PLAYER*\n\n*◁ II ▷ 1:00 •* ${audioResults.videos[0].timestamp}\n\n*keith*`
        };

        await _0x299acb.sendMessage(_0x201245, messageData, { quoted: _0x44363d });
        await _0x299acb.sendMessage(_0x201245, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: _0x44363d });
        _0x583693(`*Bmw Just Downloaded ${jsonResponse.result.title}*\n\n*®Adams 2024*`);
      } else {
        _0x583693("Failed to download audio. Please try again later.");
      }
    } else {
      _0x583693("No audio found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    _0x583693("An error occurred while searching or downloading the audio.");
  }
});

zokou({
  'nomCom': "song",
  'categorie': "Download",
  'reaction': '🎸'
}, async (_0xddd680, _0x46f4ce, _0x3fbada) => {
  const { ms: _0x8deac8, repondre: _0xfff881, arg: _0x2ef9e6 } = _0x3fbada;

  if (!_0x2ef9e6[0]) {
    _0xfff881("Please insert a song name.");
    return;
  }

  try {
    let searchQuery = _0x2ef9e6.join(" ");
    let songResults = await yts(searchQuery);

    if (songResults && songResults.videos.length > 0) {
      const songUrl = songResults.videos[0].url;
      const response = await fetch(`https://api.giftedtech.us.kg/api/download/ytmp3v2?url=${encodeURIComponent(songUrl)}&apikey=ibrahimadams`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        const messageData = {
          image: { url: songResults.videos[0].thumbnail },
          caption: `*BMW SONG PLAYER*\n\n*◁ II ▷ 1:00 •* ${songResults.videos[0].timestamp}\n\n*©Ibrahim Adams*`
        };

        await _0x46f4ce.sendMessage(_0xddd680, messageData, { quoted: _0x8deac8 });
        await _0x46f4ce.sendMessage(_0xddd680, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: _0x8deac8 });
        _0xfff881(`*Bmw Just Downloaded ${jsonResponse.result.title}*\n\n*®Adams 2024*`);
      } else {
        _0xfff881("Failed to download audio. Please try again later.");
      }
    } else {
      _0xfff881("No audio found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    _0xfff881("An error occurred while searching or downloading the audio.");
  }
});
