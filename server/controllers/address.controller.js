import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export async function addAddressController(req, res) {
  try {
    const { address_line, city, state, pincode, country, mobile, status } =
      req.body;
    const userId = req.userId;

    const address = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
    });

    const saveAddress = await address.save();

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { address_details: saveAddress._id },
      },
      { new: true }
    );

    return res.status(200).json({
      data: saveAddress,
      message: "Address Added successfully",
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
export async function addressDetail(req, res) {
  try {
    const userId = req.userId;

    const addresses = await AddressModel.find({ userId });

    return res.json({
      message: "Address details",
      error: false,
      success: true,
      data: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateAddressDetails(req, res) {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile, status } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const updateAddress = await AddressModel.findOneAndUpdate(
      { userId: userId },
      {
        address_line,
        mobile,
        city,
        state,
        pincode,
        country,
        status,
      },
      { new: true }
    );

    // if (!updateAddress) {
    //   return res.status(404).json({
    //     message: "Address not found",
    //     success: false,
    //     error: true,
    //   });
    // }

    return res.json({
      message: "Address updated successfully",
      error: false,
      success: true,
      data: updateAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

