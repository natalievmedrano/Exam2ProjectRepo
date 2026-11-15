
const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Website categories
const siteCategories = ['tops', 'bottoms', 'shoes', 'accessories'];

// Custom product names
const productNames = {

    //tops
    'blueTop.png': 'Classic Blue Blouse',
    'brownTop.png': 'Long Sleeve Brown Blouse',
    'pinkTop.png': 'Chic Pink Summer Top',
    'purpleTop.png': 'Chic Purple Blouse',
    'whiteTop.png': 'White Statement Top',
    'zebraTop.png': 'Long-Sleeve Zebra Top',

    //pants
    'khakiPant.png': 'Long Khaki Pants',
    'blackPant.png': 'Stylish Black Slacks',
    'corduroy.png': 'Beautiful Corduroy Pants',
    'lightBluePant.png': 'Fashionable Light Blue Jeans',
    'stripedPant.png': 'Chic Striped Pants'
};

// Product collection
const products = [];

siteCategories.forEach(category => {
    const folderPath = path.join(__dirname, '../public/images', category);

    if (fs.existsSync(folderPath)) {
        const productImg = fs.readdirSync(folderPath);

        productImg.forEach((image, index) => {
            products.push({
                id: `${category}-${index + 1}`,

                name: productNames[image] || image
                    .replace(/\.[^/.]+$/, '')
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, letter => letter.toUpperCase()),

                category: category,
                image: `${category}/${image}`
            });
        });
    }
});

// For the homepage
router.get('/', (req, res) => {
    res.render('pages/home');
});

// For the shop page
router.get('/shop', (req, res) => {
    const category = req.query.category;

    let filteredProducts = products;

    if (category) {
        filteredProducts = products.filter(product =>
            product.category === category
        );
    }

    res.render('pages/shop', {
        products: filteredProducts,
        selectedCategory: category || 'all'
    });
});

module.exports = router;
