const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE5udlMzaUdXK2ZkOHZYc1RuTTl1YjRTM0tBaU93VTFCaDgxTm5qenRtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1d0V3hiS2taZDRxZExMSnJHWHFOc2VyN2FoYmdTSVFYcHdZT0JZOEtWOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Q1Q5SGpsN21zOXJOYW9tLzVZUzI2dTU4c3dURFlUcHl3U0VOWWF4VlVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnc1hZNUd3SU5zRGJYdzg5Z09xQjV1K0RxSER2SzFxS0pBREltbHFEY1JZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1JdnhnVzVlcGlnK1ZBSFFCQ09DUTBacDFoV0Z6ZHRPREVOL1d3V1J4MEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVJRmcwelpWbHUyUkNDTDZBOE0xZDd6d2paNjVoNTZFSEVqcEFKT3FQVms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0hwek1CWUVCcGUzNEFZVDQ1aHBTTmRTUlJPTE1xSDFaR0pnbllDT0kwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3o3cGdYZmhnRVhTR3JvSWhYRjFqVnBvMzkwRW9XYUFjZ0ZsSTdJVnNYUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFOQ2pnUjFqWS9ZUDY5WU1TVHI5TGpXaHFIU0JEZGI1TnBtbnNxK2tkTUJFbEdIMkNBc3BRdW8rNGhNa3dVcHVIMUx5Y0NrNWgycmpxVGhJeFhHNEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYyLCJhZHZTZWNyZXRLZXkiOiJ3MDJMVS95Vm9Oblk2U0YwVTZSSXNGbGkwMm11M1NHSUtMY21kUlZvUHk0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGa1lqaGZZOFRGMmNLZXdYVEFrd25nIiwicGhvbmVJZCI6IjM4ZTdjODBhLTVlOGEtNGRlMy05ODM0LWFiZjQ1NGU2MDQ3YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFVjQwcy9DUzFuQjdjUk1QK0tzVjhWVkhlWDQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnJDRG9NcVJQRkJBQ09Panl0VG9xamgxZnRJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNCWURLN0ZZIiwibWUiOnsiaWQiOiIyNjM3ODczODI4NTI6MzFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSzI5cHJvbWF4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZnA4dk1GRUxIUzJiVUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZK2JoYytGZHhpdFRyK0ltVURRM3NDQmhONllSL2tUaUxUdVg5TlBZYVQwPSIsImFjY291bnRTaWduYXR1cmUiOiJ0SjNzdzJlMjIreDVmd0xGSzFpdW10NkJOU1FDM3NDM0l3N0wvRHVNK2FJNFBOVTVOT0l5NkhHMHdFdy8xd2hhc090a2tCbTRkNmpSVWpQbzNPZk1CZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWUp0ZTFYaTRZYmI5QjVJSFdIamNIOEs1TWdoYm1VS292TDRQeUZRTHhiTkNNSVZ3RE9ZSmxxbXdLT2NHNWpqcTRQamhzQzJDeWp5NTNSaFc3RFpZQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODczODI4NTI6MzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1BtNFhQaFhjWXJVNi9pSmxBME43QWdZVGVtRWY1RTRpMDdsL1RUMkdrOSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzIzMDUyNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCa1gifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "k29promax",
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
