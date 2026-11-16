
const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Website categories
const siteCategories = ['tops', 'bottoms', 'shoes', 'accessories'];

// custom product names
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
    'stripedPant.png': 'Chic Striped Pants',

    //shoes
    'blueHeel.png': 'Classy Blue Heels',
    'brownBoots.png': 'Brown Heeled Boots',
    'sparklyShoes.png': 'Fun Sparkly Sneakers',

    //accessories
    'brownPurse.png': 'Brown Purse',
    'pinkEarring.png': 'Classic Pink Petal Earrings',
    'glasses.png': 'Stylish Sunglasses'
};

//product information/details

const productDetails = {
    //tops
    'tops-1': {
        description: 'Classic everyday blue blouse for everyday wear. This elegant piece is made of 100% cotton, making it very lightweight, and perfect to wear for any occassion.',
        price: 25.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    'tops-2':{
        description: 'Stylish long sleeve brown blouse. Made of 95% polyester, this beautiful blouse is perfect for nights out, classy dinners, or everyday wear.',
        price: 35.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "tops-3":{
        description:'A chic pink summer top, perfect for adding a feminine touch to your closet.',
        price: 22.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "tops-4":{
        description:'A beautiful dazzling purple blouse that brings elegance and a pop of color to your life.',
        price: 22.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "tops-5":{
        description: 'A timeless white top that can be styled perfectly for casual outfits',
        price: 32.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "tops-6":{
        description:'A bold long-sleeve zebra print top, amazing for adding a statment pieve to your closet.',
        price: 30.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

}


//collection
const products = [];

siteCategories.forEach(category => {
    const folderPath = path.join(__dirname, '../public/images', category);

    if (fs.existsSync(folderPath)) {
        const productImg = fs.readdirSync(folderPath).sort();

        productImg.forEach((image, index) => {
            products.push({
                id: `${category}-${index + 1}`,

                name: productNames[image] || image
                    .replace(/\.[^/.]+$/, '')
                    .replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, letter => letter.toUpperCase()),

                category: category,
                image: `${category}/${image}`,
                description: productDetails[`${category}-${index + 1}`]?.description || 'A beautiful addition to your wardrobe.',
                price: productDetails[`${category}-${index + 1}`]?.price || 19.99,
                sizes: productDetails[`${category}-${index + 1}`]?.sizes || ['One Size']
            });
        });
    }
});

// homepage
router.get('/', (req, res) => {
    res.render('pages/home');
});

// login page
const users = [];

router.get('/login', (req, res) => {
    res.render('pages/login');
});

// login user
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        res.redirect('/shop');

    } catch (error) {
        res.status(500).send('Login failed');
    }
});

// register page
router.get('/register', (req, res) => {
    res.render('pages/register');
});

// register user
router.post('/register', (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(400).send('Account already exists with this email');
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password
        };

        users.push(newUser);
        res.redirect('/login');
        
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});



// shop page
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

// product page
router.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.render('pages/productInfo', {
        product: product
    });
});

module.exports = router;
