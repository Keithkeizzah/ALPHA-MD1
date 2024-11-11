const { keith } = require("../keizzah/keith");
const { exec } = require("child_process");

// Command configuration
keith(
  {
    nomCom: "reboot",
    categorie: "Mods",
    reaction: "👨🏿‍💼",
    aliases: ["restart", "reload"], // Adding aliases for the command
  },
  async (dest, z, com) => {
    const { repondre, superUser } = com;

    // Check if the user is authorized
    if (!superUser) {
      return repondre("This command is for owner only");
    }

    // Notify the user and restart the process
    repondre("*restarting...*");
    exec("pm2 restart all");
  }
);
