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
