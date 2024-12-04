import userModel from '../models/userModel.js'


// Add items to cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to Cart!"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Adding to Cart failed!"})
        
    }
}

// Remove items to cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success: true, message: "Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Removing from cart failed"})
    }
}

// Fetch User Cart
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success: true, cartData: cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Cannot get cart details"})
    }
}

export {addToCart,removeFromCart,getCart}