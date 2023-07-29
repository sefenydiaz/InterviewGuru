import db from '../config/connection'
import Industry from '../models/Industry'
import cleanDB from './cleanDB'

const industryData = require('./industryData.json')

db.once('open', async () => {
  await cleanDB('Industry');

  await Industry.insertMany(industryData);

  console.log('Industries Seeded');
  process.exit(0);
});