
const { keith } = require("../keizzah/keith");
const Heroku = require('heroku-client');
const s = require("../set");

keith({
  nomCom: 'allvar',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner. or Alpha owner 💀,,idiot*");
  }
const appname = s.HEROKU_APP_NAME
const herokuapi = s.HEROKU_APY_KEY

  const heroku = new Heroku({
    token: herokuapi,
  });

  const baseURI = `/apps/${appname}/config-vars`;

  try {
    // Fetch config vars from Heroku API
    let configVars = await heroku.get(baseURI);

    let str = '*╭───༺All my Heroku vars༻────╮*\n\n';
    
    // Loop through the returned config vars and format them
    for (let key in configVars) {
      if (configVars.hasOwnProperty(key)) {
        str += `★ *${key}* = ${configVars[key]}\n`;
      }
    }

    // Send the formatted response back to the user
    repondre(str);

  } catch (error) {
    console.error('Error fetching Heroku config vars:', error);
    repondre('Sorry, there was an error fetching the config vars.');
  }
};

keith({
  nomCom: 'setvar',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner. or Alpha owner 💀,,*");
  }
const appname = s.HEROKU_APP_NAME
const herokuapi = s.HEROKU_APY_KEY

  
  const input = arg.split('=');
  if (input.length !== 2) {
    return reply('Incorrect Usage:\nProvide the key and value correctly.\nExample: setvar ANTICALL=yes');
  }

  const [key, value] = input;

 
  const herok = new Heroku({
    token: herokuapi,
  });

  const baseURI = `/apps/${appname}/config-vars`;

  try {
    
    await herok.patch(baseURI, {
      body: {
        [key]: value,
      },
    });

    
    await repondre(`*✅ The variable ${key} = ${value} has been set successfully.Bot is restarting...*`);
  } catch (error) {
    
    console.error('Error setting config variable:', error);
    await repondre('❌ There was an error setting the variable. Please try again later.\n' + error );
  }
};
