import { placeOrder } from "../services/cart-service";
import { useCartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";
import React, { useState } from "react";
import "./OrderConfirm.css";
import { OrderType } from "../types/types";

type FormValues = {
  shippingAddress: {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
  };
};

type props = {
  setShowOrderConfirm: (showOrderConfirm: boolean) => void;
};

const OrderConfirm = ({ setShowOrderConfirm }: props) => {
  const { cart, setCart } = useCartContext();
  const { user } = useAuthContext();

  const initialFormState = {
    shippingAddress: {
      name: user.shippingAddress?.name || "",
      street: user.shippingAddress?.street || "",
      zipCode: user.shippingAddress?.zipCode || "",
      city: user.shippingAddress?.city || "",
      country: user.shippingAddress?.country || "",
    },
    billingAddress: {
      name: user.billingAddress?.name || "",
      street: user.billingAddress?.street || "",
      zipCode: user.billingAddress?.zipCode || "",
      city: user.billingAddress?.city || "",
      country: user.billingAddress?.country || "",
    },
  };

  const [FormValues, setFormValues] = useState<FormValues>(initialFormState);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevState) => {
      const [key, subkey] = name.split(".");

      return {
        ...prevState,
        [key]: {
          ...prevState[key as keyof FormValues],
          [subkey as keyof (typeof prevState)[keyof FormValues]]: value,
        },
      };
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedAddresses: FormValues = {
      shippingAddress: FormValues.shippingAddress,
      billingAddress: FormValues.billingAddress,
    };

    try {
      const response = await placeOrder(updatedAddresses);
      if (response.message === "Order placed successfully") {
        setCart([]);
      }
      setShowOrderConfirm(false);
    } catch (error) {
      console.error("Failed to place order", error);
    }
  };

  return (
    <section id="order-conf-wrap">
      <h2>Confirm your order ☑️</h2>
      <form onSubmit={handlePlaceOrder} id="order-conf-form">
        <div id="billing-adress">
          <h3>Billing address 💰</h3>
          <input
            type="text"
            name="billingAddress.name"
            value={FormValues.billingAddress?.name}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.street"
            value={FormValues.billingAddress?.street}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.zipCode"
            value={FormValues.billingAddress?.zipCode}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.city"
            value={FormValues.billingAddress?.city}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.country"
            value={FormValues.billingAddress?.country}
            onChange={changeHandler}
          ></input>
        </div>

        <div id="shipping-adress">
          <h3>Shipping address 📦</h3>
          <input
            type="text"
            name="shippingAddress.name"
            value={FormValues.shippingAddress?.name}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.street"
            value={FormValues.shippingAddress?.street}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.zipCode"
            value={FormValues.shippingAddress?.zipCode}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.city"
            value={FormValues.shippingAddress?.city}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.country"
            value={FormValues.shippingAddress?.country}
            onChange={changeHandler}
          ></input>
        </div>
        <button type="submit">Confirm and pay</button>
      </form>
    </section>
  );
};

export default OrderConfirm;
