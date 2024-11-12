const googleTTS = require("google-tts-api");
const { keith: keithHandler } = require("../keizzah/keith");

// Function to handle French text-to-speech (TTS)
const frenchTTS = {
  "nomCom": "ftt",
  "categorie": "tts",
  "reaction": '👄'
};

keithHandler(frenchTTS, async (message, chat, args) => {
  const { ms: messageReference, arg: inputText, repondre: reply } = args;

  // Check if input text is provided
  if (!inputText[0]) {
    reply("Please enter a word or a phrase.");
    return;
  }

  // Join input text to form the full sentence
  const sentence = inputText.join(" ");

  // Set language and options for French TTS
  const ttsOptions = {
    lang: 'fr',
    slow: false,
    host: "https://translate.google.com"
  };

  // Get the audio URL for the sentence
  const audioUrl = googleTTS.getAudioUrl(sentence, ttsOptions);
  console.log(audioUrl);

  // Prepare the audio message
  const audioMessage = {
    url: audioUrl
  };

  const audioOptions = {
    audio: audioMessage,
    mimetype: "audio/mp4"
  };

  // Send the audio message back
  const sendOptions = {
    quoted: messageReference,
    ptt: true // send as a voice message
  };
  chat.sendMessage(message, audioOptions, sendOptions);
});

// Function to handle Japanese text-to-speech (TTS)
const japaneseTTS = {
  "nomCom": "jtt",
  "categorie": "tts",
  "reaction": '👄'
};

keithHandler(japaneseTTS, async (message, chat, args) => {
  const { ms: messageReference, arg: inputText, repondre: reply } = args;

  // Check if input text is provided
  if (!inputText[0]) {
    reply("Please enter a word or a phrase.");
    return;
  }

  // Join input text to form the full sentence
  const sentence = inputText.join(" ");

  // Set language and options for Japanese TTS
  const ttsOptions = {
    lang: 'ja',
    slow: false,
    host: "https://translate.google.com"
  };

  // Get the audio URL for the sentence
  const audioUrl = googleTTS.getAudioUrl(sentence, ttsOptions);
  console.log(audioUrl);

  // Prepare the audio message
  const audioMessage = {
    url: audioUrl
  };

  const audioOptions = {
    audio: audioMessage,
    mimetype: "audio/mp4"
  };

  // Send the audio message back
  const sendOptions = {
    quoted: messageReference,
    ptt: true // send as a voice message
  };
  chat.sendMessage(message, audioOptions, sendOptions);
});

// Function to handle English text-to-speech (TTS)
const englishTTS = {
  "nomCom": "say",
  "categorie": "tts",
  "reaction": '👄'
};

keithHandler(englishTTS, async (message, chat, args) => {
  const { ms: messageReference, arg: inputText, repondre: reply } = args;

  // Check if input text is provided
  if (!inputText[0]) {
    reply("Please enter a word or a phrase.");
    return;
  }

  // Join input text to form the full sentence
  const sentence = inputText.join(" ");

  // Set language and options for English TTS
  const ttsOptions = {
    lang: 'en',
    slow: false,
    host: "https://translate.google.com"
  };

  // Get the audio URL for the sentence
  const audioUrl = googleTTS.getAudioUrl(sentence, ttsOptions);
  console.log(audioUrl);

  // Prepare the audio message
  const audioMessage = {
    url: audioUrl
  };

  const audioOptions = {
    audio: audioMessage,
    mimetype: "audio/mp4"
  };

  // Send the audio message back
  const sendOptions = {
    quoted: messageReference,
    ptt: true // send as a voice message
  };
  chat.sendMessage(message, audioOptions, sendOptions);
});
