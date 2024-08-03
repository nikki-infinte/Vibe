const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to search for events based on location
app.get('/events', async (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
      params: {
        city: location, // Adjust as needed
        apikey: 'ushAldoVGtUmFBTGPwLjnF8WKIBATb8z' // Replace with your API key
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error Details:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
