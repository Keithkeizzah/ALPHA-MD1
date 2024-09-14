const { zokou } = require("../framework/zokou");
const { translate } = require("@vitalets/google-translate-api");  // Fixed import statement

zokou({
  'nomCom': "surah",
  'reaction': '📓',
  'categorie': "Quran"
}, async (context, args, options) => {
  const { repondre: sendResponse, arg: commandArgs } = options;
  const elementQuery = commandArgs.join(" ").trim();

  if (!elementQuery) {
    return sendResponse("Please provide a Surah name or number.");
  }

  try {
    // Fetch data from the Quran endpoint
    let response = await fetch(`https://quran-endpoint.vercel.app/quran/${elementQuery}`);
    if (!response.ok) {
      return sendResponse("Could not find information for the provided Surah. Please check the name or number.");
    }

    let json = await response.json();

    // Translate Tafsir from Indonesian to Urdu and English
    let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur' });
    let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en' });

    // Format the message
    let formattedMessage = `
*❪𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐐𝐔𝐑𝐀𝐍❫*\n
🕋 *Quran: The Holy Book ♥️🌹قرآن مجید🌹♥️*\n
📖 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
💫Type: ${json.data.type.en}\n
✅Number of verses: ${json.data.ayahCount}\n
⚡🔮 *Explanation (Urdu):*\n
${translatedTafsirUrdu.text}\n
⚡🔮 *Explanation (English):*\n
${translatedTafsirEnglish.text}`;

    // Send recitation if available
    if (json.data.recitation.full) {
      await context.sendFile(json.data.recitation.full, 'recitation.mp3', 'Recitation');
    }

    await sendResponse(formattedMessage);

  } catch (error) {
    console.error(error);
    await sendResponse(`Error: ${error.message}`);
  }
});
