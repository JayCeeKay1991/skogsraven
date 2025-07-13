import React, { useState } from "react";
import "./Profile.css";
import { useAuthContext } from "../contexts/AuthContext";
import { UserType } from "../types/types";
import { updateProfile } from "../services/user-service";

type FormValuesProfile = {
  email: string;

  shippingAddress?: {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
  };
  billingAddress?: {
    name: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
  };
};

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState("");

  const initialFormState = {
    email: user.email,

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

  const [formValuesProfile, setFormValuesProfile] =
    useState<FormValuesProfile>(initialFormState);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValuesProfile((prevState) => {
      const [key, subkey] = name.split(".");
      if (subkey) {
        return {
          ...prevState,
          [key]: {
            ...(prevState[key as keyof FormValuesProfile] as any),
            [subkey]: value,
          },
        };
      } else {
        return { ...prevState, [key]: value };
      }
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedUserData: UserType = {
        _id: user._id,
        email: formValuesProfile.email,
        password: user.password,
        shippingAddress: formValuesProfile.shippingAddress,
        billingAddress: formValuesProfile.billingAddress,
      };

      const updatedUser = await updateProfile(updatedUserData);
      if (updatedUser) setUser(updatedUser);
      alert("Profile updated!");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unknown error occurred. Sorry!";
      setError(errorMessage);
    }
  };

  return (
    <div id="profile-wrap">
      {error ? (
        <>{error}</>
      ) : user && user._id ? (
        <form id="profile-form" onSubmit={submitHandler}>
          <h3>Personal data 👱</h3>
          <input
            type="email"
            name="email"
            value={formValuesProfile.email}
            onChange={changeHandler}
          ></input>

          <h3>Shipping address 📦</h3>
          <input
            type="text"
            name="shippingAddress.name"
            value={formValuesProfile.shippingAddress?.name}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.street"
            value={formValuesProfile.shippingAddress?.street}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.zipCode"
            value={formValuesProfile.shippingAddress?.zipCode}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.city"
            value={formValuesProfile.shippingAddress?.city}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingAddress.country"
            value={formValuesProfile.shippingAddress?.country}
            onChange={changeHandler}
          ></input>

          <h3>Billing address 💰</h3>
          <input
            type="text"
            name="billingAddress.name"
            value={formValuesProfile.billingAddress?.name}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingAddress.street"
            value={formValuesProfile.billingAddress?.street}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingAddress.zipCode"
            value={formValuesProfile.billingAddress?.zipCode}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingAddress.city"
            value={formValuesProfile.billingAddress?.city}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingAddress.country"
            value={formValuesProfile.billingAddress?.country}
            onChange={changeHandler}
          ></input>

          <button id="save-profile-changes-button" type="submit">
            Save Changes
          </button>
        </form>
      ) : (
        <h3>Log in to see your user data.</h3>
      )}
    </div>
  );
};

export default Profile;
