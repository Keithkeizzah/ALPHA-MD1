
// Import the node-cache module
const NodeCache = require("node-cache");

// Configuration for the dbCache
const dbCacheConfig = {
  stdTTL: 6000,  // Time to live (in seconds)
  checkperiod: 5000  // Period for checking expired keys (in seconds)
};

// Create and export the dbCache instance
module.exports.dbCache = new NodeCache(dbCacheConfig);

// Configuration for the wcgCache
const wcgCacheConfig = {
  stdTTL: 0,  // No expiration time
  checkperiod: 5000  // Period for checking expired keys (in seconds)
};

// Create and export the wcgCache instance
module.exports.wcgCache = new NodeCache(wcgCacheConfig);
