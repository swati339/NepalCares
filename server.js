const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/donation_forum', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

const donationSchema = new mongoose.Schema({
  name: String,
  message: String,
});

const Donation = mongoose.model('Donation', donationSchema);

app.get('/api/donate', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error retrieving donations' });
  }
});

app.post('/api/donate', async (req, res) => {
  try {
    const { name, message } = req.body;
    const newDonation = new Donation({ name, message });
    await newDonation.save();
    res.status(201).json({ success: true, message: 'Donation received successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing donation' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
