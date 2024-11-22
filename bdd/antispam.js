// Load environment variables from .env file
require("dotenv").config();

// Import the required module for PostgreSQL connection
const { Pool } = require('pg');

// Get the database URL from environment or fallback to a default
const databaseUrl = process.env.DATABASE_URL || "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";

// SSL configuration for PostgreSQL connection
const sslConfig = { rejectUnauthorized: false };

// PostgreSQL connection setup
const poolConfig = {
  connectionString: databaseUrl,
  ssl: sslConfig
};

// Create a new pool instance for database connection
const pool = new Pool(poolConfig);

// Function to create the 'antispam' table if it doesn't exist
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS antispam (
        groupeJid TEXT PRIMARY KEY
      );
    `);
    console.log("La table 'antispam' a été créée avec succès.");
  } catch (error) {
    console.error("Une erreur est survenue lors de la création de la table 'antispam':", error);
  }
};

// Call createTable function
createTable();

// Function to add a group JID to the 'antispam' table
async function addGroupToSpamList(groupJid) {
  const client = await pool.connect();
  try {
    await client.query("INSERT INTO antispam (groupeJid) VALUES ($1)", [groupJid]);
    console.log("Groupe JID " + groupJid + " ajouté à la liste des groupes bannis.");
  } catch (error) {
    console.error("Erreur lors de l'ajout du groupe banni :", error);
  } finally {
    client.release();
  }
}

// Function to retrieve all group JIDs from the 'antispam' table
async function getSpamGroups() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM antispam");
    const groups = result.rows.map(row => row.groupeJid);
    return groups;
  } catch (error) {
    console.error("Erreur lors de la vérification du groupe antispam :", error);
    return [];
  } finally {
    client.release();
  }
}

// Function to remove a group JID from the 'antispam' table
async function removeGroupFromSpamList(groupJid) {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM antispam WHERE groupeJid = $1", [groupJid]);
    console.log("Groupe JID " + groupJid + " supprimé de la liste des groupes spam.");
  } catch (error) {
    console.error("Erreur lors de la suppression du groupe spam :", error);
  } finally {
    client.release();
  }
}

// Export the functions as a module
const antispamFunctions = {
  addGroupToSpamList,
  getSpamGroups,
  removeGroupFromSpamList
};

module.exports = antispamFunctions;
