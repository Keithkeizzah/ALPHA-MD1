const { zokou } = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");

const geniusClient = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({
  nomCom: "instastalk",
  reaction: '🎎',
  categorie: "General"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/instainfo?username=${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid username");
    }
    
    const userInfo = response.data; // Assuming the API returns the user info directly

    const messageText = `
┌──「 *ALPHA INSTAGRAM STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || "Unknown"}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || "Unknown"}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://instagram.com/${userInfo.username || "unknown"}
└────────────`;
    
    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});
