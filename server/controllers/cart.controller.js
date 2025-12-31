import CartProductModel from "../models/cart.model.js";
import CartModel from "../models/cart.model.js";
// import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export async function addtoCartItemController(req, res) {
  try {
    const userId = req.userId;
    const {
      productTitle,
      images,
      rating,
      price,
      quantity,
      subTotal,
      productId,
      countInStock,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "provide productId",
        success: false,
        error: true,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item is already in cart",
      });
    } 
      // const cartItem = new CartProductModel({
      //   quantity: quantity,
      //   userId: userId,
      //   productId: productId,
      // });

      const cartItem = new CartProductModel({
        productTitle: productTitle,
        images: images,
        rating: rating,
        price: price,
        quantity: quantity,
        subTotal: subTotal,
        productId: productId,
        countInStock: countInStock,
        userId: userId,
      });

      const savedItem = await cartItem.save();

      // const updateCartUser = await UserModel.updateOne(
      //   { _id: userId },
      //   {
      //     $push: {
      //       shopping_cart: productId,
      //     },
      //   }
      // );
      return res.status(200).json({
        message: "Item Add successfully",
        data: savedItem,
        error: false,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCartItem(req, res) {
  try {
    const userId = req.userId;
    const cartItems = await CartProductModel.find({
      userId: userId,
    });

    return res.json({
      data: cartItems,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateCartItemQty(req, res) {
  try {
    const userId = req.userId;
    const { _id, quantity,subTotal } = req.body;
    if (!_id || !quantity) {
      return res.status(400).json({
        message: "Provide _id, quantity",
      });
    }

    const updateCartItem = await CartProductModel.updateOne(
      {
        _id: _id,
        userId: userId,
      },
      {
        quantity: quantity,
        subTotal:subTotal
      },{new:true}
    );

    return res.json({
      message: "update cart ",
      error: false,
      success: true,
      data: updateCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deletecartItem(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Provide cart item id",
        error: true,
        success: false,
      });
    }

    // Delete from cart table
    const deleteCartItem = await CartProductModel.deleteOne({
      _id: id,
      userId: userId,
    });

    if (!deleteCartItem) {
      return res.status(404).json({
        message: "The Product in the cart is not found",
        error: true,
        success: false,
      });
    }
    if (deleteCartItem.deletedCount === 0) {
      return res.status(400).json({
        message: "Cart item not deleted",
        error: true,
        success: false,
      });
    }

    // Remove from user's shopping_cart
    // const user = await UserModel.findOne({_id:userId});

    // const cartItems = user?.shopping_cart;
    // const updatedUserCart = [...cartItems.slice(0,cartItems.indexOf(productId)), ...cartItems.slice(cartItems.indexOf(productId)+1)]
    // user.shopping_cart = user.shopping_cart.filter(
    //   (item) => item.toString() !== productId.toString()
    // );

    // user.shopping_cart = updatedUserCart;

    // await user.save();

    return res.json({
      message: "Removed cart item",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
