const { keith } = require("../keizzah/keith");
const s = require("../set");
const fs = require('fs');
const HerokuClient = require('heroku-client'); // Renamed to avoid redefinition

// Command to set Heroku variable
keith(
    {
        nomCom: "setvar",
        categorie: "HEROKU-CLIENT"
    }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre, superUser, arg } = commandeOptions;
        
        if (!superUser) {
            repondre('Only Mods can use this command');
            return;
        }
        
        if (!arg[0] || !(arg.join('').split('='))) {
            repondre('Bad format; Example of usage: Setvar OWNER_NAME=keithkeizzah');
            return;
        }

        const text = arg.join(" ");
        const heroku = new HerokuClient({
            token: s.HEROKU_APY_KEY
        });
        
        const baseURI = `/apps/${s.HEROKU_APP_NAME}`;
        
        // Update the Heroku config variable
        await heroku.patch(baseURI + "/config-vars", {
            body: {
                [text.split('=')[0]]: text.split('=')[1]
            }
        });
        
        repondre('That Heroku var is changing, The bot is rebooting....');
    }
);

// Command to list all Heroku variables
keith(
    {
        nomCom: "allvar",
        categorie: "HEROKU-CLIENT"
    }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre, superUser } = commandeOptions;
        
        if (!superUser) {
            repondre('Only Mods can use this command');
            return;
        }

        const heroku = new HerokuClient({
            token: s.HEROKU_APY_KEY
        });
        
        const baseURI = `/apps/${s.HEROKU_APP_NAME}`;
        
        // Get all Heroku config variables
        let h = await heroku.get(baseURI + '/config-vars');
        let str = '*╭───༺All my Heroku vars༻────╮*\n\n';
        
        for (const vr in h) {
            str += `★ *${vr}* = ${h[vr]}\n`;
        }
        
        repondre(str);
    }
);

// Command to get a specific Heroku variable
keith(
    {
        nomCom: "getvar",
        categorie: "HEROKU-CLIENT"
    }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre, superUser, arg } = commandeOptions;
        
        if (!superUser) {
            repondre('Only Mods can use this command');
            return;
        }

        if (!arg[0]) {
            repondre('Insert the variable name in capital letters');
            return;
        }
        
        try {
            const heroku = new HerokuClient({
                token: s.HEROKU_APY_KEY
            });
            
            const baseURI = `/apps/${s.HEROKU_APP_NAME}`;
            
            // Get specific config variable
            let h = await heroku.get(baseURI + '/config-vars');
            
            if (h[arg.join(' ')]) {
                repondre(`${arg.join(' ')} = ${h[arg.join(' ')]}`);
            } else {
                repondre('Variable not found');
            }
        } catch (e) {
            repondre('Error: ' + e);
        }
    }
);
