
const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Website categories
const siteCategories = ['tops', 'bottoms', 'shoes', 'accessories'];

// Custom product names
const productNames = {
    'black blouse.jpg': 'Classic Black Blouse',
    'blue blouse.jpg': 'Blue Button-Up Blouse',
    'orange.webp': 'Orange Summer Top',
    'pink blouse.webp': 'Pink Blouse',
    'red top.jpg': 'Red Statement Top',
    'yellow top.jpg': 'Yellow Summer Top'
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
