import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { addAddress, editAddress } from "../../utils/networkCalls";
import "./addressModal.css";

function AddressModal() {
  const [name, setName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const { authState, authDispatch } = useAuth();

  const addressObject = {
    name,
    addressLine,
    city,
    state,
    country,
    pinCode,
    mobileNo,
  };

  function dummyAddress() {
    setName("Ravi Sharma");
    setAddressLine("43/A Greenfield Street");
    setCity("Pune");
    setState("Maharastra");
    setCountry("India");
    setPinCode("311105");
    setMobileNo("9567329473");
  }

  useEffect(() => {
    if (authState.addressToEdit !== "") {
      const address = authState.addresses.find(
        (address) => address._id === authState.addressToEdit
      );
      setName(address.name);
      setAddressLine(address.addressLine);
      setCity(address.city);
      setState(address.state);
      setCountry(address.country);
      setPinCode(address.pinCode);
      setMobileNo(address.mobileNo);
    }
  }, []);

  async function addAddressHandler() {
    authDispatch({
      type: "ADD_TO_ADDRESS",
      payload: addressObject,
    });
    authDispatch({ type: "TOGGLE_ADDRESS_MODAL", payload: false });
    await addAddress(
      name,
      addressLine,
      city,
      state,
      country,
      pinCode,
      mobileNo
    );
  }

  async function editAddressHandler() {
    authDispatch({
      type: "EDIT_ADDRESS",
      payload: { addressId: authState.addressToEdit, address: addressObject },
    });
    authDispatch({ type: "TOGGLE_ADDRESS_MODAL", payload: false });
    await editAddress({
      addressId: authState.addressToEdit,
      name,
      addressLine,
      city,
      state,
      country,
      pinCode,
      mobileNo,
    });
  }

  return (
    <div className="modal-page">
      <div className="modal-box">
        <h3>
          {authState.addressToEdit === "" ? (
            <>Add Address</>
          ) : (
            <>Edit Address</>
          )}
        </h3>
        <div className="address-form">
          <input
            type="text"
            value={name}
            placeholder="Enter name of reciver *"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={addressLine}
            placeholder="Enter street, house no, colony *"
            onChange={(e) => setAddressLine(e.target.value)}
          />
          <input
            type="text"
            value={city}
            placeholder="Enter city *"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            value={state}
            placeholder="Enter state *"
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            value={country}
            placeholder="Enter country *"
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            value={pinCode}
            placeholder="Enter pincode *"
            onChange={(e) => setPinCode(e.target.value)}
          />
          <input
            type="text"
            value={mobileNo}
            placeholder="Enter mobile no *"
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        {error !== "" && <div className="error-message">{error}</div>}
        <div className="action-btn">
          <button
            onClick={() => {
              if (
                (name === "") |
                (addressLine === "") |
                (city === "") |
                (state === "") |
                (country === "") |
                (pinCode === "") |
                (mobileNo === "")
              ) {
                setError("All fields are required");
                return;
              }
              if (authState.addressToEdit === "") addAddressHandler();
              else editAddressHandler();
            }}
          >
            Save
          </button>
          <button onClick={dummyAddress}>Dummy Address</button>
          <button
            onClick={() => {
              authDispatch({ type: "TOGGLE_ADDRESS_MODAL", payload: false });
              authDispatch({ type: "ADDRESS_TO_EDIT", payload: "" });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;
