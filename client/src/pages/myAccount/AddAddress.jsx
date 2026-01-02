import React from "react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { API_PATH } from "../../utils/apiPath";
import { postData } from "../../utils/api";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";

function AddAddress({ setAddressPanel }) {
  const [formField, setFormField] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true,
  });

  const {alertBox, setAddress,} = useContext(AppContext)
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postData(API_PATH.ADDRESS.ADD, formField);

    if (response?.success) {
      alertBox("Address added successfully","success");
      setAddress(response.data)
      setAddressPanel(false);
    } else {
      alertBox(response?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
   window.scrollTo(0, 0);
  }, [])
  return (
    <div
      className="bg-white text-black lg:w-[50%] h-[80%] p-4 rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h1>Add Address</h1>
        <IoIosClose
          className="text-2xl hover:text-primary cursor-pointer"
          onClick={() => setAddressPanel(false)}
        />
      </div>
      <form className="py-5" onSubmit={handleSubmit}>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="w-full flex items-center flex-wrap gap-5">
            <div className="w-[93.5%] relative">
              <label htmlFor="address">
                <input
                  type="text"
                  name="address_line"
                  value={formField.address_line}
                  onChange={onChangeInput}
                  placeholder={"Address Line"}
                  className="border border-gray-500 outline-0 py-2 px-2 w-full"
                />
              </label>
            </div>
            <div className="w-[45%] relative">
              <label htmlFor="city">
                <input
                  type="text"
                  name="city"
                  value={formField.city}
                  onChange={onChangeInput}
                  placeholder={"City"}
                  className="border border-gray-500 outline-0 py-2 px-2 w-full"
                />
              </label>
            </div>
            <div className="w-[45%] relative">
              <label htmlFor="state">
                <input
                  type="text"
                  name="state"
                  value={formField.state}
                  onChange={onChangeInput}
                  placeholder={"State"}
                  className="border border-gray-500 outline-0 py-2 px-2 w-full"
                />
              </label>
            </div>
            <div className="w-[45%] relative">
              <label htmlFor="pincode">
                <input
                  type="text"
                  name="pincode"
                  value={formField.pincode}
                  onChange={onChangeInput}
                  placeholder={"Pin Code"}
                  className="border border-gray-500 outline-0 py-2 px-2 w-full"
                />
              </label>
            </div>
            <div className="w-[45%] relative">
              <label htmlFor="country">
                <input
                  type="text"
                  name="country"
                  value={formField.country}
                  onChange={onChangeInput}
                  placeholder={"Country"}
                  className="border border-gray-500 outline-0 py-2 px-2 w-full"
                />
              </label>
            </div>
            <div className="w-[45%] relative">
              <PhoneInput
                defaultCountry="pk"
                className="w-full"
                value={formField.mobile}
                onChange={(value) =>
                  setFormField((prev) => ({
                    ...prev,
                    mobile: value || "",
                  }))
                }
              />
            </div>
            <div className="w-[45%] relative">
              <label htmlFor="status">
                <select
                  name="status"
                  value={formField.status}
                  onChange={(e) =>
                    setFormField((prev) => ({
                      ...prev,
                      status: e.target.value === "true",
                    }))
                  }
                  className="border border-gray-500 py-2 px-2 w-full"
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="flex items-center gap-5">
          <button
            type="submit"
            className="py-2 px-5 cursor-pointer bg-primary text-white w-25"
          >
            Save
          </button>
          <button
            type="button"
            className="py-2 px-5 border border-primary text-primary cursor-pointer w-25"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
