const { zokou } = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");

const geniusClient = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({
  nomCom: "guessage",
  reaction: '🎎',
  categorie: "General"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const name = arg.join(" ");
  
  if (!name) {
    return respond("Please specify a name. Example: keith");
  }
  
  try {
    const response = await axios.get(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
    
    if (response.status !== 200) {
      return respond("Could not retrieve data. Please try again.");
    }
    
    const data = response.data;
    const messageText = `
ᬑ *ALPHA GUESS AGE* ᬒ
      
⧭ *_Name:_* ${data.name}
⧭ *_Count:_* ${data.count}
⧭ *_Estimated Age:_* ${data.age}
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆ `;
    
    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the age estimate.");
  }
});
zokou({
  nomCom: "guesscountry",
  reaction: '🎎',
  categorie: "General"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const name = arg.join(" ");
  
  if (!name) {
    return respond("Please specify a name. Example: keith");
  }
  
  try {
    const response = await axios.get(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`);
    
    if (response.status !== 200) {
      return respond("Could not retrieve data. Please try again.");
    }
    
    const data = response.data;
    let output = `
ᬑ *ALPHA GUESS COUNTRY* ᬒ
      
⧭ *_Name:_* ${data.name}
⧭ *_Count:_* ${data.count}
⧭ *_Likely Countries:_*`;

    data.country.forEach((c, index) => {
      output += `\n${index + 1}. ${c.country_id} (${(c.probability * 100).toFixed(2)}%)`;
    });

    output += `
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆ `;

    await respond(output);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the data. Please try again.");
  }
});
