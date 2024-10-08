const { zokou } = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");

const geniusClient = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({
  nomCom: "guessage",
  reaction: '🎎',
  categorie: "General"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  const reference = arg.join(" ");
  
  if (!reference) {
    return respond("Please specify the book, chapter, and verse you want to read. Example: bible john 3:16");
  }
  
  try {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    
    if (!response.ok) {
      return respond("provide a name example:keith");
    }
    
    const data = await response.json();
    const messageText = `
   ᬑ *ALPHA  GUESS AGE* ᬒ
      
     ⧭ *_Name:_* ${data.name}
      
     ⧭ *_Count:_* ${data.count}
      
      ⧭ *_Estimated Age:_* ${data.age}
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆ `;
    
    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the Bible passage.");
  }
});
