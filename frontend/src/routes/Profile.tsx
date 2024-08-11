import React, { useState } from "react";
import "./Profile.css";
import { useAuthContext } from "../contexts/AuthContext";
import { UserType } from "../types/types";
import { updateProfile } from "../services/user-service";

type FormValuesProfile = {
  email: string;
  password: string;
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
  const initialFormState = {
    email: user.email,
    password: user.password,
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
    setFormValuesProfile({ ...formValuesProfile, [name]: value });
  };

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUserData: UserType = {
      _id: user._id,
      email: formValuesProfile.email,
      password: formValuesProfile.password,
      shippingAddress: formValuesProfile.shippingAddress,
      billingAddress: formValuesProfile.billingAddress,
    };

    const updatedUser = await updateProfile(updatedUserData);
    if (updatedUser) setUser(updatedUser);
  };

  return (
    <div id="profile-wrap">
      {user && user._id ? (
        <form id="profile-form" onSubmit={submithandler}>
          <h3>Personal data 👱</h3>
          <input
            type="email"
            name="email"
            value={formValuesProfile.email}
            onChange={changeHandler}
          ></input>
          <input
            type="password"
            name="password"
            value={formValuesProfile.password}
            onChange={changeHandler}
          ></input>

          <h3>Shipping address 📦</h3>
          <input
            type="text"
            name="shippingName"
            value={formValuesProfile.shippingAddress?.name}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingStreet"
            value={formValuesProfile.shippingAddress?.street}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingZipCode"
            value={formValuesProfile.shippingAddress?.zipCode}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingCity"
            value={formValuesProfile.shippingAddress?.city}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="shippingCountry"
            value={formValuesProfile.shippingAddress?.country}
            onChange={changeHandler}
          ></input>

          <h3>Billing address 💰</h3>
          <input
            type="text"
            name="billingName"
            value={formValuesProfile.billingAddress?.name}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingStreet"
            value={formValuesProfile.billingAddress?.street}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingZipCode"
            value={formValuesProfile.billingAddress?.zipCode}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingCity"
            value={formValuesProfile.billingAddress?.city}
            onChange={changeHandler}
          ></input>
          <input
            type="text"
            name="billingCountry"
            value={formValuesProfile.billingAddress?.country}
            onChange={changeHandler}
          ></input>

          <button id="save-profile-changes-button" type="submit">
            Save Changes
          </button>
        </form>
      ) : (
        <h2>Log in to see your user data 👱</h2>
      )}
    </div>
  );
};

export default Profile;
