javascript
zokou({
  nomCom: "tikstalk",
  reaction: '🎎',
  categorie: "General"
}, async (context, message, params) => {
  const { respond, arg } = params; // corrected from repondre to respond
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://api.giftedtechnexus.co.ke/api/stalk/tiktokstalk?username=${encodeURIComponent(username)}&apikey=giftedtechk`);
    
    if (response.status !== 200 || !response.data.success) {
      return respond("Invalid username");
    }
    
    const { user, stats } = response.data.result;

    const messageText = `
┌──「 *ALPHA TIKTOK STALK* 」
▢ *🔖 Name:* ${user.nickname || 'Unknown'}
▢ *🔖 Username:* ${user.uniqueId || 'Unknown'}
▢ *👥 Followers:* ${stats.followerCount || 'Unknown'}
▢ *🫂 Following:* ${stats.followingCount || 'Unknown'}
▢ *📌 Bio:* ${user.signature || 'No Bio'}
▢ *🔗 External Link:* ${user.bioLink?.link || 'No Link'}
▢ *🔗 Profile Link:* https://tiktok.com/@${user.uniqueId || 'unknown'}
└────────────`;
    
    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});
