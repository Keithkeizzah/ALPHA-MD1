const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUd1eFl0U1YrcUNGbzRncTNVZjNjUm5PU3dxWnRhdDBud0orendLb3RFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXhkVDNuczk4bXlBc0pYVkhvM1FPek8wL3p3VlpWaGNlZmpwMmVMVDNTWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSUt0ZDhXakdJL3ZzZzVtVlRyTkc2cHk5ODNLODJ3SDBVTmtPbFBlUmtRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiTm0zSDFaZkFzOXFMTjBkSGdCc3EvdktWOUxQNXpFdUFBVXVCdUIvWVhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndGSHMzMms3U3B5Z3A2Y0V6d0hsMWN1ZENONWhQc05QQTZsYjAxN3VKSEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFXcEtCSUM5SzlTcFlxeWRqVUZCK2czVmRXQTEyQXJkdzFsWnQyZ3phME09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK01obFBEM1lvaHhvMXNxcEtISUgvNDdEUmFLTWdubjZCYXZ4SlRLSFJrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFNydm1URXZpa29sRmw5dGQxektjdysxNzQ4bHZ3S2M1QkJ1enFON0FHcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFaRkVuTlZOY1laajEvdVEvbnZNNnZyUjQvSG5UMndTODlKSlp0UEF4azE2RGN0SGQ4RVlSNjR3emEvUlBRR2N2eHB6UUVXK1FtbklxaUd5WmZMOUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6InRCcDE2SHJkMi91Nk5tdkVjYVJvRDYwSGpDbVpUc09zQ0hpV2RIS3QyRk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImJFRDVGSlhBUmV1aDVYcHZWc3I5UkEiLCJwaG9uZUlkIjoiNGNhMzgyN2QtZDY4NC00ZWMxLWI5MzctZTRlMDk1NWU0NTI0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhpM05MaStETUdQVzlFT3E4MVRLOW4wSVFUVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyZFpRSWtyS3pCaGRTOEw1bm5wOGNjeHA4cjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTU5MTUpQTUMiLCJtZSI6eyJpZCI6IjI1NTcxODczMjEyMjo2OEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWJJcUpZSEVQT2NnN1VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL1QyMzc3TFBTYlRaOURDR213LzNMbnhsNnNVRkxseHJodHN2VjJwUEZBST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOFlIeXgyZGRKWWtIQ3FGeFd1M0p1M1RLcnByNjB3aWcrMW94QnQvQXFFK1d0TFRlMmVEZm9hQ0hpZzlSZ3FMN3BSeHJFZ0tPRHgyV2JOOUdLWlNQQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6ImxjcEg2aTVnOHN1ZzNrTExwOEhya2ZoM080WG1neVppOFVjbjFnMGliTWZnTHZDeVZ4Z005aXpqaEZYbWI4WG0xTkxLdit0OEVzalVXSDNtRlFNUkJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzE4NzMyMTIyOjY4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmYwOXQrK3l6MG0wMmZRd2hwc1A5eTU4WmVyRkJTNWNhNGJiTDFkcVR4UUMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE4MTQ2NTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTEs2In0=',
    PREFIXE: process.env.PREFIX || "~",
    OWNER_NAME: process.env.OWNER_NAME || "KEITH-KEIZZAH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254748387615",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ALPHA-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
