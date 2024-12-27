// thanks chatgpt😻😻

const { keith } = require("../keizzah/keith");
const Heroku = require('heroku-client');
const s = require("../set");

// Command to retrieve Heroku config vars
keith({
  nomCom: 'allvar',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { repondre, superUser } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner 💀*");
  }

  const appname = s.HEROKU_APP_NAME;
  const herokuapi = s.HEROKU_API_KEY;

  const heroku = new Heroku({
    token: herokuapi,
  });

  const baseURI = `/apps/${appname}/config-vars`;

  try {
    // Fetch config vars from Heroku API
    const configVars = await heroku.get(baseURI);

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
});

// Command to set a Heroku config var
keith({
  nomCom: 'setvar',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { repondre, superUser, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner 💀*");
  }

  const appname = s.HEROKU_APP_NAME;
  const herokuapi = s.HEROKU_API_KEY;

  if (!arg || arg.length !== 1 || !arg[0].includes('=')) {
    return repondre('Incorrect Usage:\nProvide the key and value correctly.\nExample: setvar ANTICALL=yes');
  }

  const [key, value] = arg[0].split('=');

  const heroku = new Heroku({
    token: herokuapi,
  });

  const baseURI = `/apps/${appname}/config-vars`;

  try {
    // Set the new config var
    await heroku.patch(baseURI, {
      body: {
        [key]: value,
      },
    });

    // Notify success
    await repondre(`*✅ The variable ${key} = ${value} has been set successfully. The bot is restarting...*`);
  } catch (error) {
    console.error('Error setting config variable:', error);
    await repondre(`❌ There was an error setting the variable. Please try again later.\n${error.message}`);
  }
});
