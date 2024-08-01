const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUFGWDIzd0VmVldMMEVNTVhTcWYvdDVGMGpDbHNqU3dHWnFXWkt0VGoyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGRJczVkODBhYkFCWDkzZzZpZEczWVEyeisyOU1sR0V5V2RReHNKR25CVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlQUZBWnlyVzQrTlI2cWtEeDRLRGZ4L1ZJWkEraHF4M3FUTXJ1dHRzZDJvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXNVc4ZDBtM1hEVUFDeHZMeVBMc3JaS2NCTENHbXk5VmE4YlMxMm5rY3g4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFOUDJoVWhQajNaSEREWGQxcFRtR29xVE05RE51cVJ1V0Q2UnBySDRHWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1GT1FCQkQvazNLc2JUd2hnaE5sQllvN2x5TW1tYmNuUzJaT0U2ZExFV2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFWSkpvRzNzSGNJNURIL2IreTJBWDZ3U1JDeXlBdkg1eEQvdWpiYWduRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlhKWmtPRFJWcWxUNDRzRUxBNHNMUEFEWitHdVl6QWVKaFhxSkNtSGFFMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtBTUdDT1l0NkQwbWdObGNQMFRGTDFEbEs5eGlrT0prOUdaQ2daVTNCWjlRcEFjWEUzWGhCT21vN21jUUloQTF2cVZSK2UvSTZlOHJ6amZ6V21YWUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiI2WitqN0F1b2E5eU40aEZ6b2NoQ0gvYzJPY1BSZHhzeUdTUzRhbllwS3VVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCYWp5QUYzUlJDR0RxVTF1V1NhV3JRIiwicGhvbmVJZCI6ImM1NmFmYWIyLWJjODEtNGE5NC04M2VjLTdmMWJmYzM0ZWY3NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiNkp3SFIwTXd6cC9ab2VIeTZKbmVVS1dMY2M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjlONkZLSWRrVGNlVVFxUDVVS0dBbm5vYzFvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZGUkYxUTFWIiwibWUiOnsiaWQiOiIyNTU3NDg0MDkyMTI6MzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSm92aW4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01HWTQ2Y0VFSUd2cmJVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFRTmxiNW1waFZwV2NXdldDS25ZTHY1NGxsdjU3ZXZTaDVvaGo0VHpQVnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRVcWdFL1FQR0hXN1lndDVVOHpEempmbGIwMFFVdzQxRjJQOXVHM1ZjdUJaWlp2UzRNam1reE1CVW9Eb29XWGRxWElpM3RSdHNCZjNIY0NhUTliNkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3c3dxRkp0SzRLM2hVTWJmdnB6bUZ5QkxxOVBnTHdwUEpLSFZDODkzVkpkcjhyNzFwSzFwV09hMVplK1ZpTWh5bWpTS1FQVTAzeHNoMmRjQVZ6SnZBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc0ODQwOTIxMjozNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXa0RaVytacVlWYVZuRnIxZ2lwMkM3K2VKWmIrZTNyMG9lYUlZK0U4ejFiIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNTA1MTAyfQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255748409212",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'online',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
