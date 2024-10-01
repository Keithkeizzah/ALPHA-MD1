const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "mistari",
  reaction: '📡',
  categorie: 'IA',
  desc: "ChatGPT AI, ask it questions and make requests"
});

a19_0x336d04(a19_0x4f8cc1, async (_0x1d53cf, _0x59fd2e, _0x31195a) => {
  const { repondre, arg, ms } = _0x31195a;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please ask a question.");
    }

    const query = arg.join(" ");
    const response = await axios.get(`https://api.cafirexos.com/api/chatgpt?text=${encodeURI(query)}&name=Kaizoku&prompt=${encodeURI("You are a WhatsApp bot AI called ALPHA-MD")}`);
    
    const result = response.data;
    if (result) {
      repondre(result.resultado);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
