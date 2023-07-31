const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

// const industryData = require('./industryData.json')

db.once('open', async () => {
  try {
    // await cleanDB('User', 'allUsers');
    await User.deleteMany({ })
    await User.create(userSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});