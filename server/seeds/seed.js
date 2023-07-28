const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const industryData = require('./industryData.json')

// db.once('open', async () => {
//   await cleanDB('Tech', 'teches');

//   await User.insertMany(industryData);

//   console.log('User Seeded');
//   process.exit(0);
// });