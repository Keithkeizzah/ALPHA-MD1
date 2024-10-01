const a19_0x1059e8 = (() => {
  let initialized = true;
  return function (context, callback) {
    const executeCallback = initialized
      ? function () {
          if (callback) {
            const result = callback.apply(context, arguments);
            callback = null; // Ensure callback is only called once
            return result;
          }
        }
      : function () {};
    initialized = false; // Prevent further calls
    return executeCallback;
  };
})();

const translateFunction = a19_0x1059e8(this, function () {
  return translateFunction.toString().search("(((.+)+)+)+$").toString().constructor(translateFunction).search("(((.+)+)+)+$");
});

translateFunction();

const { zokou: registerCommand } = require("../framework/zokou");
const axios = require("../framework/traduction").default;

const chatbotConfig = {
  nomCom: "omega",
  reaction: '📡',
  categorie: 'IA',
  desc: "chatbot Ai , talk with him"
};

registerCommand(chatbotConfig, async (sender, reply, command) => {
  const { repondre: respond, ms, arg } = command;
  
  if (!arg || !arg[0]) {
    return respond("Yes, I'm listening to you.");
  }

  try {
    const translationOptions = { to: 'en' };
    const translatedText = await axios(arg.join(" "), translationOptions);
    console.log(translatedText);
    
    const response = await fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${translatedText}`);
    const data = await response.json();
    const responseText = data.cnt;
    
    console.log(responseText);
    
    const replyOptions = { to: 'en' };
    const finalTranslation = await axios(responseText, replyOptions);
    respond(finalTranslation);
  } catch (error) {
    console.error("Error:", error);
    respond("Oops, an error occurred: " + error);
  }
});

const imageGeneratorConfig = {
  nomCom: "bing3",
  reaction: '📡',
  categorie: 'IA',
  desc: "Image generator by prompt"
};

registerCommand(imageGeneratorConfig, async (sender, reply, command) => {
  const { repondre: respond, arg, ms } = command;
  
  if (!arg || arg.length === 0) {
    return respond("Please enter the necessary information to generate the image.");
  }

  try {
    const query = arg.join(" ");
    const response = await axios.get(`http://api.maher-zubair.tech/ai/photoleap?q=${query}`);
    const result = response.data;

    if (result.status === 200) {
      const imageUrl = result.result;
      const imageMessage = {
        image: { url: imageUrl },
        caption: "*powered by ZOKOU-MD*"
      };
      const replyOptions = { quoted: ms };
      reply.sendMessage(sender, imageMessage, replyOptions);
    } else {
      respond("Error during image generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    respond("Oops, an error occurred while processing your request.");
  }
});

const chatgptConfig = {
  nomCom: "mistari",
  reaction: '📡',
  categorie: 'IA',
  desc: "ChatGPT AI, ask him questions and requests"
};

registerCommand(chatgptConfig, async (sender, reply, command) => {
  const { repondre: respond, arg, ms } = command;

  if (!arg || arg.length === 0) {
    return respond("Please ask a question.");
  }

  try {
    const question = arg.join(" ");
    const response = await axios.get(`https://api.cafirexos.com/api/chatgpt?text=${encodeURIComponent(question)}&name=Kaizoku&prompt=${encodeURIComponent("You are a Whatsapp bot AI called ZOKOU-MD")}`);
    const result = response.data;

    if (result) {
      respond(result.resultado);
    } else {
      respond("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    respond("Oops, an error occurred while processing your request.");
  }
});
