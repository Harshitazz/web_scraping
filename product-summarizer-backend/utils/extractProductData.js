const cheerio = require('cheerio');

const extractProductData = (html) => {
  const $ = cheerio.load(html);

  // List of potential selectors for title, price, and description across different e-commerce sites
  const titleSelectors = [
    '#productTitle',                // Amazon
    '#itemTitle',                   // eBay
    'h1.prod-ProductTitle',         // Walmart
    'h1',                           // Generic h1 tag
    'h2',                           // Generic h2 tag
    'h1.product-title',             // Generic product title class
    'h1.product_name',              // Another generic product title class
    '.product-title-word-break',    // Product title with word-break class
    '.product-name',                // Product name class
    '.shoping_content'              // Shopping content class
  ];

  const priceSelectors = [
    'span.reinventPricePriceToPayMargin.priceToPay span.a-price-whole',  // Specific price selector
    '.priceToPay',                  // Custom selector
    'div.x-price-primary span.ux-textspans',            // eBay
    'span.price-characteristic',    // Walmart
    'span.price-mantissa',          // Walmart
    'strike .price-characteristic', // Walmart
    '.price',                       // Generic price class
    '.product-price',               // Product price class
    '.offer-price',                 // Offer price class
    '.price-characteristic'         // Price characteristic class
  ];

  const descriptionSelectors = [
    '#feature-bullets',             // Amazon
    '#productDescription',          // Amazon
    '#detail_info',                 // eBay
    '.about-desc',                  // Walmart
    '.about-product-description',   // Walmart
    '.description',                 // Generic description class
    '.product-description',         // Product description class
    '#feature-bullets ul'           // Feature bullets in ul format
  ];

  // Function to extract text based on provided selectors
  const extractText = (selectors) => {
    for (const selector of selectors) {
      const text = $(selector).text().trim();
      if (text) return text;  // Return the first non-empty text found
    }
    return '';  // Return empty string if no text is found
  };

  // Extracting title and description using defined selectors
  const title = extractText(titleSelectors);
  const description = extractText(descriptionSelectors);

  // Specific logic for extracting prices
  const extractPrices = (selectors) => {
    for (const selector of selectors) {
      const priceText = $(selector).text().trim();
      if (priceText) {
        // Split the prices using ₹ or $ as delimiters
        const splitPrices = priceText.split(/(?=₹|\$)/).map(price => price.trim());
        // Return the first price found
        if (splitPrices.length > 0) {
          return splitPrices[0];
        }
      }
    }
    return '';  // Return empty string if no price is found
  };

  const price = extractPrices(priceSelectors);

  // Logging extracted data for debugging
  console.log({ title, price, description });

  // Return extracted data object
  return { title, price, description };
};

module.exports = extractProductData;  // Exporting the function for external use
