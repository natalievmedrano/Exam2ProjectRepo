
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

    //bottoms
    "bottoms-1":{
        description:'Stylish classic black slacks. Perfect for a polished and classy look.',
        price: 40.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "bottoms-2":{
        description: 'Flashy corduroy pants that bring a classic style to your closet.',
        price: 45.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "bottoms-3":{
        description: 'Stylish versatile khaki pants. Perfect for casual everyday outings',
        price: 35.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    
    "bottoms-4":{
        description:'Classic light blue jeans that make a great addition to any outfit.',
        price: 30.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    "bottoms-5":{
        description:'Chic striped pants that add a unique and fun pattern to your closet.',
        price: 45.00,
        sizes: ['XS', 'S', 'M','L', 'XL', '2XL']
    },

    //shoes
    
    "shoes-1":{
        description:'Elegant sparkly blue shoes that add a stylish touch to your beautiful outift.',
        price:23.00,
        sizes: ['6', '7', '8','9', 'Request Custom Size']
    },

    "shoes-2":{
        description: 'Fun Sparkly sneakers that bring the ultimate shine and personality to your closet.',
        price:30.00,
        sizes: ['6', '7', '8','9', 'Request Custom Size']
    },

    "shoes-3":{
        description:'Classic brown heeled boots that create an effortlessly perfect timeless look',
        price: 50.00,
        sizes: ['6', '7', '8','9', 'Request Custom Size']
    },

    //accessories
    
    "accessories-1":{
        description: 'Stylish beautiful brown leather purse that compliments any outfit perfectly.',
        price: 40.00,
        sizes: ['One Size']
    },

    "accessories-2":{
        description:'Cute sunglasses that add the perfect finishing touch to your ICONIC outfit.',
        price: 15.00,
        sizes: ['One Size']
    },

    "accessories-3":{
        description:'Beautiful pink petal earrings, adds a delicate and feminine touch!',
        price:20.00,
        sizes: ['Silver', 'Gold']
    }

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

// tracking orders
const orders = [];

router.get('/orders', (req, res) => {

    res.render('pages/orderTracker', {
        orders
    });

});

// shop page
router.get('/shop', (req, res) => {
    const category = req.query.category;
    const search = req.query.search;

    let filteredProducts = products;

    //by category   
    if (category) {
        filteredProducts = products.filter(product =>
            product.category === category
        );
    }
    //by name
    if(search){
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase().trim())
        );
    }

    res.render('pages/shop', {
        products: filteredProducts,
        selectedCategory: category || 'all',
        search: search|| ''
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

// shopping cart page
const cart = [];

router.get('/cart', (req, res) => {
    res.render('pages/shoppingCart', {
        cartItems: cart
    });   
});

router.post('/cart/add/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);

    if(product) {
        cart.push({...product, quantity: 1});
    }
    res.redirect('/cart');
});

router.post('/cart/remove/:id', (req, res) => {
    const itemIndex = cart.findIndex(item => item.id === req.params.id);
    
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
    res.redirect('/cart');
});

//checkout page
router.get('/checkout', (req,res) => {
    if(cart.length === 0) {
        return res.redirect('/cart');
    }

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += (item.quantity || 1) * item.price;
    });

    res.render('pages/checkout', {
        cartItems: cart,
        totalPrice: totalPrice
    });
});

//for order confirmation 
router.post('/checkout', (req,res) => {
    const {name, email, address, city, state, zip } = req.body;

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += (item.quantity || 1) * item.price;
    });

    const order = {
        name,
        email,
        address,
        city,
        state,
        zip,
        items: [...cart],
        total: totalPrice
    };

    cart.length = 0;

    res.render('pages/orderConfirmation', {
        order: order
    });
})

// admin page

// admin page
router.get('/admin', (req, res) => {
    res.render('pages/admin', {
        products
    });
});

//admin add product
router.post('/admin/add', (req, res) => {

    const {
        name,
        category,
        price,
        image,
        description
    } = req.body;

    products.push({
        id: `product-${Date.now()}`,
        name,
        category,
        image,
        description,
        price: parseFloat(price),
        sizes: ['S', 'M', 'L', 'XL']
    });

    res.redirect('/admin');
});

// admin delete product
router.post('/admin/delete/:id', (req, res) => {

    const index = products.findIndex(
        product => product.id === req.params.id
    );

    if (index !== -1) {
        products.splice(index, 1);
    }

    res.redirect('/admin');
});

module.exports = router;
