const { keith } = require("../keizzah/keith");
const s = require("../set");
const HerokuClient = require('heroku-client'); // Renamed to avoid redefinition

// Command to set a Heroku config var
keith({
  nomCom: "setvar",
  categorie: "Heroku-client",
  reaction: "🗿"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Only Mods can use this command');
    return;
  }

  if (!arg[0] || !arg[0].includes('=')) {
    repondre('Bad format; Example of usage: Setvar OWNER_NAME=keithkeizzah');
    return;
  }

  const [key, value] = arg.join(" ").split('=');

  const heroku = new HerokuClient({
    token: s.HEROKU_APY_KEY
  });

  const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

  try {
    // Update the Heroku config variable
    await heroku.patch(baseURI + "/config-vars", {
      body: {
        [key]: value
      }
    });

    repondre('That Heroku var is changing, The bot is rebooting....');
  } catch (error) {
    repondre('Error: ' + error.message);
  }
});

// Command to get all Heroku config vars
keith({
  nomCom: "allvar",
  categorie: "Heroku-client",
  reaction: "🗿"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Only Mods can use this command');
    return;
  }

  const heroku = new HerokuClient({
    token: s.HEROKU_APY_KEY
  });

  const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

  try {
    // Get all Heroku config variables
    const vars = await heroku.get(baseURI + '/config-vars');
    let responseStr = '*╭───༺All my Heroku vars༻────╮*\n\n';

    for (const [key, value] of Object.entries(vars)) {
      responseStr += `★ *${key}* = ${value}\n`;
    }

    repondre(responseStr);
  } catch (error) {
    repondre('Error: ' + error.message);
  }
});

// Command to get a specific Heroku config var
keith({
  nomCom: "advar",
  categorie: "Heroku-client",
  reaction: "🗿"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Only Mods can use this command');
    return;
  }

  if (!arg[0]) {
    repondre('Insert the variable name in capital letters');
    return;
  }

  const varName = arg.join(' ').toUpperCase(); // Ensure variable name is in uppercase

  try {
    const heroku = new HerokuClient({
      token: s.HEROKU_APY_KEY
    });

    const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

    // Get specific config variable
    const vars = await heroku.get(baseURI + '/config-vars');

    if (vars[varName]) {
      repondre(`${varName} = ${vars[varName]}`);
    } else {
      repondre('Variable not found');
    }
  } catch (error) {
    repondre('Error: ' + error.message);
  }
});
