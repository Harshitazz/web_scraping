// routes/productRoutes.js
const express = require('express');
const axios = require('axios');
const extractProductData = require('../utils/extractProductData');

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    const productData = extractProductData(response.data);
    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
});

module.exports = router;
