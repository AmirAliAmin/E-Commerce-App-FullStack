import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export async function addtoCartItemController(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({
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
      res.status(400).json({
        message: "Item is already in cart",
        success: false,
        error: true,
      });
    } else {
      const cartItem = new CartProductModel({
        quantity: 1,
        userId: userId,
        productId: productId,
      });

      const save = await cartItem.save();

      const updateCartUser = await UserModel.updateOne(
        { _id: userId },
        {
          $push: {
            shopping_cart: productId,
          },
        }
      );
    }

    return res.status(200).json({
      message: "Item Add successfully",
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
    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return res.json({
      data: cartItem,
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
    const { _id, quantity } = req.body;

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
      }
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
    const { _id, productId } = req.body;

    if (!_id || !productId) {
      return res.status(400).json({
        message: "Provide _id and productId",
        error: true,
        success: false,
      });
    }

    // Delete from cart table
    const deleteCartItem = await CartProductModel.deleteOne({
      _id,
      userId,
    });

    if (deleteCartItem.deletedCount === 0) {
      return res.status(400).json({
        message: "Cart item not deleted",
        error: true,
        success: false,
      });
    }

    // Remove from user's shopping_cart
    const user = await UserModel.findById(userId);

    user.shopping_cart = user.shopping_cart.filter(
      (item) => item.toString() !== productId.toString()
    );

    await user.save();

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

