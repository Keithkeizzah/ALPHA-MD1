const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUQ0R1pKQ1VpeGFZZURkVW9CQTdtZzVCeGdIMG4zSUtSWk1vR2NyNnoyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNktxMlBCL0c5YjZRUUkzTUF1aW5ueHBVYkJtNnVCY1JrZ3dFVmR4a1Zsbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSzlISnVLK0RJUDF2R2hNbWk1eUdwaWdHT0UvUGw4bDVveFJKSldvMTBzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVYWU3VUd5czZMQ2R6K2h6VVlMQzdkWm1CS1AwQ3pKZTAxeE4vQ1NENEhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFNVE9ZVm4wNUJPRnl2T0k4amZIdDdqT1cvSU9VZDI3YzZqa2JtTXdkWEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndGSmVjbEV4UjJXTzZ0eFNhY08xMFZmRC9PaGwwMEptbEQ4ZDB2TUsyaTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpLblUycksvNXlEa0dBQ1crOU1Cbkx5RlN0VzZwZ0VrYzVUaDhWZlNuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0o3aDJBcmhwWFg0QnE2RWl0S3NvZ2p4OXBnSlBxWXd1REFPZkdReC94bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhhZFl5Um9jbmljUGpXbVBJZzI2NC9kVlJKb2lxc3hpei9hOVowM0t1bjhZRjJIQm5BQXFiYklSVytXbmxVS04zUmtmbmRVYUJqVTEwQWo5V044VGhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiJRSU9lckw2SURMb1ZoOFNBYTdyUGdTbnp2UXFadVMzZ2dOOVJPRUp1NTJrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUWmRQSjZaS1Q0bXV1eFR1ZVhxbURnIiwicGhvbmVJZCI6ImY0YWI1OWJlLTk1YzYtNDA5YS1hYThhLTIwYmRmMjcwNGU2NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwZlJrZUV0NmU4K3ZiSWwzenpIOTRIRWpmL0U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDY1cDVRMlVMVDRWMlBwTHNYK2JpOU16SzZ3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhTNUZZOTFaIiwibWUiOnsiaWQiOiIyMzMyMDc0MTU0Njk6MzdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tDUzBlVU5FS2Z2bjdnR0dCSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNRS1B6OEFZRkZHUGtWWXVLamJpTC9vd0Y2TzJ3Uy9yY1hIVHZteFZ5ekk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlN1YVlVT3JBNGdvRHVvTFkzSVNsTDcrUTlKbDhVTnN6bTN1QTcxUjVEQmhmMitCTzhKUDRKT01iNWNpTmIwdVcrU0oxWkNLSUNKMS8zbFpkT3lVVENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBTmJBOFloM0dCd2t5bVpUNXR3NlFzd3lEVWJPU3lzWDQ5eldOejdCK1R6YlVKd1duMjVLa0FPMTNJdmUvY1dMWFJWaFZsZEZHNGNGL09SSmhSY0hpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzIwNzQxNTQ2OTozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkMENqOC9BR0JSUmo1RldMaW8yNGkvNk1CZWp0c0V2NjNGeDA3NXNWY3N5In19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjg1NzU0MTN9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
