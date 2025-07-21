const express = require('express');
const router = express.Router();
const { fetchIntel } = require('../services/ipService');
const { isValidIp } = require('../utils/validateIp');

router.get('/', async (req, res) => {
  const { ip } = req.query;
  if (!ip || !isValidIp(ip)) {
    return res.status(400).json({ error: 'Invalid IP address' });
  }

  try {
    const intel = await fetchIntel(ip);
    res.json(intel);
  } catch (error) {
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit reached, try again later.' });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
