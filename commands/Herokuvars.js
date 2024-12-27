const { keith } = require("../keizzah/keith");
const s = require("../set");
const Heroku = require('heroku-client'); // Renamed to avoid redefinition

// Setvar command
keith(
  {
    nomCom: "setvar",
    categorie: "HEROKU-CLIENT",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser, arg } = commandeOptions;

    
    if (!arg[0] || !arg.join('').includes('=')) {
      repondre('Bad format; Example of usage: Setvar OWNER_NAME=keithkeizzah');
      return;
    }

    const text = arg.join(" ");
    const heroku = new Heroku({ token: s.HEROKU_APY_KEY });
    const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

    try {
      await heroku.patch(baseURI + "/config-vars", {
        body: {
          [text.split('=')[0]]: text.split('=')[1],
        },
      });
      await repondre('That Heroku var is changing. The bot is rebooting....');
    } catch (error) {
      repondre('Error: ' + error.message);
    }
  }
);

// Allvar command
keith(
  {
    nomCom: "allvar",
    categorie: "HEROKU-CLIENT",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser } = commandeOptions;

   
    const heroku = new Heroku({ token: s.HEROKU_APY_KEY });
    const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

    try {
      const h = await heroku.get(baseURI + '/config-vars');
      let str = '*╭───༺All my Heroku vars༻────╮*\n\n';
      for (const vr in h) {
        str += `★ *${vr}* = ${h[vr]}\n`;
      }
      repondre(str);
    } catch (error) {
      repondre('Error: ' + error.message);
    }
  }
);

// Getvar command
keith(
  {
    nomCom: "getvar",
    categorie: "HEROKU-CLIENT",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser, arg } = commandeOptions;

    
    if (!arg[0]) {
      repondre('Insert the variable name in capital letters');
      return;
    }

    try {
      const heroku = new Heroku({ token: s.HEROKU_APY_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;
      const h = await heroku.get(baseURI + '/config-vars');

      if (h[arg.join(' ')]) {
        return repondre(`${arg.join(' ')} = ${h[arg.join(' ')]}`);
      }

      repondre('Variable not found');
    } catch (error) {
      repondre('Error: ' + error.message);
    }
  }
);
