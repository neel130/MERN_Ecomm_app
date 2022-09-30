const Cart = require("../model/cartSchema")



exports.addCartItems = async (req, res) => {
    const { userId, products } = req.body
    try {

        const savedCart = await Cart.findOne({ userId });

        if (savedCart) {
            let updateCart;
            console.log(Array.isArray(products))
            // console.log(products)
            if (Array.isArray(products) === false) {
                updateCart = await Cart.findByIdAndUpdate(savedCart._id, {
                    $push: {
                        products: products
                    }
                }, {
                    new: true
                })
                return res.status(201).json({ success: "cart update product successful", updateCart })
            }

            else {
                products.map(async (product) => {
                    updateCart = await Cart.findByIdAndUpdate(savedCart._id, {
                        $push: {
                            products: product
                        }
                    }, {
                        new: true
                    })

                })
                return res.status(201).json({ success: "cart update product successful", updateCart })
            }
        }
        const cartItem = await Cart.create({
            userId, products
        })

        return res.status(201).json({ success: "item added to cart successful", cartItem })

    } catch (error) {
        console.log(`error ${error}`)
    }
}



exports.getCartItem = async (req, res) => {
    const id = req.params.id
    try {
        if (!id) {
            return res.status(400).json({ error: "missing require fields" })
        }

        const cartItems = await Cart.findOne({ userId: id });
        return res.status(200).json({ success: "findindin cartitems successful", cartItems })

    } catch (error) {
        console.log(`error ${error}`)
    }
}