const {
  keith
} = require("../keizzah/keith");
const {
  default: axios
} = require("axios");
const pkg = require("@whiskeysockets/baileys");
const {
  generateWAMessageFromContent,
  proto
} = pkg;

keith({
  'nomCom': "technews",
  'reaction': '📰',
  'categorie': 'News'
}, async (command, message, context) => {
  const {
    reply: replyToUser,
    messageQuote: quotedMessage
  } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    // Preparing the message content
    const messageContent = `*ALPHA-MD*\n\n${news}\n\n> *Powered by keithkeizzah*`;

    // Sending the message with an image and caption
    await message.sendMessage(command, {
      'image': {
        'url': thumbnail
      },
      'caption': messageContent
    }, {
      'quoted': quotedMessage
    });

  } catch (error) {
    console.error("Error fetching tech news:", error);
    await replyToUser("Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});

keith({
  'nomCom': "tempmail",
  'aliases': ['mail', 'temp'],
  'reaction': '📧',
  'categorie': "General"
}, async (_0x15d59a, _0x4afeec, _0xfb2be5) => {
  const {
    repondre: _0x389c8d,
    prefixe: _0x1348c1,
    ms: _0xd52df1
  } = _0xfb2be5;
  try {
    const _0x30ee20 = Math.random().toString(0x24).substring(0x2, 0xc);
    const _0x231d8d = _0x30ee20 + "@1secmail.com";
    await _0x4afeec.sendMessage(_0x15d59a, {
      'text': "Your temporary email is: " + _0x231d8d + "\n\nYou can use this email for temporary purposes. I will notify you if you receive any emails."
    }, {
      'quoted': _0xd52df1
    });
    const _0x2584e2 = async () => {
      try {
        const _0x52ad21 = await fetch("https://www.1secmail.com/api/v1/?action=getMessages&login=" + _0x30ee20 + "&domain=1secmail.com");
        const _0x14f845 = await _0x52ad21.json();
        if (_0x14f845 && _0x14f845.length > 0x0) {
          for (const _0x473566 of _0x14f845) {
            const _0x344bd6 = await fetch("https://www.1secmail.com/api/v1/?action=readMessage&login=" + _0x30ee20 + "&domain=1secmail.com&id=" + _0x473566.id);
            const _0x4784a4 = await _0x344bd6.json();
            const _0x4ce790 = _0x4784a4.textBody.match(/(https?:\/\/[^\s]+)/g);
            const _0x392106 = _0x4ce790 ? _0x4ce790.join("\n") : "No links found in the email content.";
            await _0x4afeec.sendMessage(_0x15d59a, {
              'text': "You have received a new email!\n\nFrom: " + _0x4784a4.from + "\nSubject: " + _0x4784a4.subject + "\n\n" + _0x4784a4.textBody + "\n\nLinks found:\n" + _0x392106
            }, {
              'quoted': _0xd52df1
            });
          }
        }
      } catch (_0x43267d) {
        console.error("Error checking temporary email:", _0x43267d.message);
      }
    };
    const _0x3b8e24 = setInterval(_0x2584e2, 0x7530);
    setTimeout(() => {
      clearInterval(_0x3b8e24);
      _0x4afeec.sendMessage(_0x15d59a, {
        'text': "Your temporary email session has ended. Please create a new temporary email if needed."
      }, {
        'quoted': _0xd52df1
      });
    }, 0x927c0);
  } catch (_0x1730b7) {
    console.error("Error generating temporary email:", _0x1730b7.message);
    await _0x4afeec.sendMessage(_0x15d59a, {
      'text': "Error generating temporary email. Please try again later."
    }, {
      'quoted': _0xd52df1
    });
  }
});

keith({
  'nomCom': "bing",
  'aliases': ["dalle", "dal"],
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x2c97cc, _0x338749, _0x49b5cd) => {
  const {
    repondre: _0x6162b8,
    arg: _0x34188f,
    ms: _0x3ce799
  } = _0x49b5cd;
  try {
    if (!_0x34188f || _0x34188f.length === 0x0) {
      return _0x6162b8("Please enter the necessary information to generate the image.");
    }
    const _0x5bb7e1 = _0x34188f.join(" ");
    const _0x3ed3ee = "https://widipe.com/dalle?text=" + _0x5bb7e1;
    _0x338749.sendMessage(_0x2c97cc, {
      'image': {
        'url': _0x3ed3ee
      },
      'caption': "*Powered by ALPHA-MD*"
    }, {
      'quoted': _0x3ce799
    });
  } catch (_0x119122) {
    console.error('Erreur:', _0x119122.message || "Une erreur s'est produite");
    _0x6162b8("Oops, an error occurred while processing your request");
  }

});
keith({
  'nomCom': "time",
  'aliases': ["clock", "live", "now"],
  'reaction': '⌚',
  'categorie': "General"
}, async (_0xb00379, _0x5206a1, _0x335312) => {
  const {
    repondre: _0x10e76d,
    arg: _0x11f077,
    ms: _0x35801f
  } = _0x335312;
  try {
    if (!_0x11f077 || _0x11f077.length === 0x0) {
      return _0x10e76d("Enter the name of the country you want to know its time and date");
    }
    const _0x54401d = _0x11f077.join(" ");
    const _0x92fada = await fetch("https://levanter.onrender.com/time?code=" + _0x54401d);
    const _0x23f003 = await _0x92fada.json();
    const _0x129939 = _0x23f003.result[0x0].name;
    const _0x38f95e = _0x23f003.result[0x0].time;
    const _0x3332e9 = _0x23f003.result[0x0].timeZone;
    await _0x10e76d("Live Time in *" + _0x129939 + "* Stats:\n\n*Date & Time:* " + _0x38f95e + "\n*TimeZone:* " + _0x3332e9 + "\n\n> *POWERED BY ALPHA-MD*");
  } catch (_0x5b8cd2) {
    _0x10e76d("That country name is incorrect!");
  }

});
keith({
  'nomCom': 'dare',
  'reaction': '😁',
  'categorie': "Fun"
}, async (_0x441810, _0x49f70e, _0x5560e8) => {
  const {
    repondre: _0x14aa8f,
    arg: _0x242526,
    ms: _0x34b160
  } = _0x5560e8;
  const _0x5ce1af = await fetch("https://shizoapi.onrender.com/api/texts/dare?apikey=shizo");
  const _0x197195 = await _0x5ce1af.json();
  await _0x14aa8f(_0x197195.result);
  console.log(_0x197195.completion);
});
keith({
  'nomCom': "truth",
  'reaction': '🤩',
  'categorie': 'Fun'
}, async (_0x52257e, _0x544d31, _0x279cb5) => {
  const {
    repondre: _0x42fdef,
    arg: _0x20906f,
    ms: _0x53e8da
  } = _0x279cb5;
  const _0x57946c = await fetch('https://shizoapi.onrender.com/api/texts/truth?apikey=shizo');
  const _0x27a10a = await _0x57946c.json();
  await _0x42fdef(_0x27a10a.result);
  console.log(_0x27a10a.completion);
});



keith({
  'nomCom': 'jokes',
  'reaction': '🤩',
  'categorie': "Fun"
}, async (_0x34ca3d, _0x261a9b, _0x1033a6) => {
  const {
    repondre: _0x2fa695,
    arg: _0x3775a1,
    ms: _0x21734f
  } = _0x1033a6;
  try {
    const _0xb540d6 = await fetch("https://api.popcat.xyz/joke");
    if (!_0xb540d6.ok) {
      throw new Error("Network response was not ok.");
    }
    const _0x559bd6 = await _0xb540d6.json();
    await _0x2fa695(_0x559bd6.joke);
    console.log(_0x559bd6.joke);
  } catch (_0x141b35) {
    console.error("Error fetching joke:", _0x141b35.message);
    await _0x2fa695("Failed to fetch a joke. Please try again later.");
  }
});
keith({
  'nomCom': "advice",
 'aliases': ["wisdom",  "wise"],
  'reaction': "🗨️",
  'categorie': "Fun"
}, async (_0xa2de23, _0x27275c, _0x1bc249) => {
  const {
    repondre: _0x39478b,
    arg: _0x5a5068,
    ms: _0x219512
  } = _0x1bc249;
  try {
    const _0xe783d7 = await fetch("https://api.adviceslip.com/advice");
    const _0x100640 = await _0xe783d7.json();
    const _0x2f9050 = _0x100640.slip.advice;
    await _0x39478b("*Here is an advice for you:* \n" + _0x2f9050);
  } catch (_0x5a0490) {
    console.error("Error:", _0x5a0490.message || "An error occurred");
    _0x39478b("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "trivia",
  'reaction': '🤔',
  'categorie': 'Fun'
}, async (_0x3204f7, _0x204d8e, _0x88bd02) => {
  const {
    repondre: _0x579330,
    prefixe: _0x43b20f,
    ms: _0x2a0f96
  } = _0x88bd02;
  try {
    const _0x5759c9 = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    if (_0x5759c9.status !== 0xc8) {
      return _0x579330("Invalid response from the trivia API. Status code: " + _0x5759c9.status);
    }
    const _0x5ea735 = await _0x5759c9.json();
    if (_0x5ea735 && _0x5ea735.results && _0x5ea735.results[0x0]) {
      const _0x282619 = _0x5ea735.results[0x0];
      const _0x347101 = _0x282619.question;
      const _0x327083 = _0x282619.correct_answer;
      const _0x539989 = [..._0x282619.incorrect_answers, _0x327083].sort();
      const _0x91ed12 = _0x539989.map((_0x105c45, _0x25f458) => _0x25f458 + 0x1 + ". " + _0x105c45).join("\n");
      await _0x204d8e.sendMessage(_0x3204f7, {
        'text': "Here's a trivia question for you: \n\n" + _0x347101 + "\n\n" + _0x91ed12 + "\n\nI will send the correct answer in 10 seconds..."
      }, {
        'quoted': _0x2a0f96
      });
      setTimeout(async () => {
        await _0x204d8e.sendMessage(_0x3204f7, {
          'text': "The correct answer is: " + _0x327083
        }, {
          'quoted': _0x2a0f96
        });
      }, 0x2710);
    } else {
      throw new Error("Invalid response format from the trivia API.");
    }
  } catch (_0x2a37bd) {
    console.error("Error getting trivia:", _0x2a37bd.message);
    await _0x204d8e.sendMessage(_0x3204f7, {
      'text': "Error getting trivia. Please try again later."
    }, {
      'quoted': _0x2a0f96
    });
  }
});
keith({
  'nomCom': "inspire",
  'reaction': '✨',
  'categorie': "General"
}, async (_0x4045c5, _0x5ba7da, _0x15450e) => {
  const {
    repondre: _0x36323f,
    arg: _0x2ee1f0,
    ms: _0x3c40b6
  } = _0x15450e;
  try {
    const _0x5e67cb = await fetch("https://type.fit/api/quotes");
    const _0x3e14ca = await _0x5e67cb.json();
    const _0x131cb9 = Math.floor(Math.random() * _0x3e14ca.length);
    const _0x472c18 = _0x3e14ca[_0x131cb9];
    await _0x36323f("*Here is an inspirational quote for you:* \n\"" + _0x472c18.text + "\" - " + _0x472c18.author);
  } catch (_0x2104fa) {
    console.error("Error:", _0x2104fa.message || "An error occurred");
    _0x36323f("Oops, an error occurred while processing your request");
  }




keith({
  'nomCom': 'messi',
  'categorie': 'Modern-Logo',
  'reaction': '😋'
}, async (_0xcae205, _0x5a5ec6, _0x29720a) => {
  const {
    repondre: _0x331660,
    ms: _0x38d2e4
  } = _0x29720a;
  try {
    const _0x2d74e4 = await axios.get("https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/Messi.json");
    const _0x405077 = _0x2d74e4.data;
    if (!Array.isArray(_0x405077) || _0x405077.length === 0x0) {
      throw new Error("No images found in the response.");
    }
    for (let _0x22c970 = 0x0; _0x22c970 < 0x5; _0x22c970++) {
      const _0x4b0fd2 = Math.floor(Math.random() * _0x405077.length);
      const _0x253b22 = _0x405077[_0x4b0fd2];
      await _0x5a5ec6.sendMessage(_0xcae205, {
        'image': {
          'url': _0x253b22
        }
      }, {
        'quoted': _0x38d2e4
      });
    }
  } catch (_0x10e4f8) {
    console.error("Error occurred while retrieving data:", _0x10e4f8);
    _0x331660("Error occurred while retrieving data: " + _0x10e4f8.message);
  }
});
keith({
  'nomCom': "lulcat",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your text.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/lulcat?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "sadcat",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your text.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/sadcat?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "nokia",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("Your text");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/nokia?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "unforgivable" ,
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("example keith projects are all trash.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/unforgivable?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "pooh",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("make yourself meme.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/pooh?text1=&text2=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "oogway",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("make your own quotes here.example; better late than never.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/oogway?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "biden",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your text.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/biden?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "drip",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your image url.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/drip?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "clown",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your image url.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/clown?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "ad",
'aliases': ["advert", "adverts", "advertisement"],
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your image url dog😬");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/ad?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "blur",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("insert your image url dog😬😬.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/blur?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "meme",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("insert your image url to generate your meme.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/mnm?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "pet",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your image url.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/pet?image=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "alert",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your text.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/alert?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
keith({
  'nomCom': "caution",
  'reaction': '📡',
  'categorie': 'AI'
}, async (_0x22ef9c, _0x5287a8, _0x2ccd49) => {
  const {
    repondre: _0x2b1a81,
    arg: _0x885e30,
    ms: _0x4eb9fe
  } = _0x2ccd49;
  try {
    if (!_0x885e30 || _0x885e30.length === 0) {
      return _0x2b1a81("your text.");
    }
    const _0x30bcaa = _0x885e30.join(" ");
    const _0x93b128 = "https://api.popcat.xyz/caution?text=" + _0x30bcaa;
    _0x5287a8.sendMessage(_0x22ef9c, {
      'image': {
        'url': _0x93b128
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': _0x4eb9fe
    });
  } catch (_0x3fe80d) {
    console.error("Erreur:", _0x3fe80d.message || "Une erreur s'est produite");
    _0x2b1a81("Oops, an error occurred while processing your request");
  }
});
