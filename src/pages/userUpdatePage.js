import React from "react";
import { useParams } from "react-router-dom";
import { HomeHeader } from "../components/header/homeHeader";
import { Footer } from "../components/footer/footer";
import { UpdateUserBox } from "../components/updateBox/updateUserBox";
import { UpdateUserPasswordBox } from "../components/updateBox/updatePasswordBox";

export function UpdateUserPage() {
  const { updateType } = useParams();
  return (
    <>
      <HomeHeader />
      {updateType === "name" && <UpdateUserBox type="name" />}
      {updateType === "email" && <UpdateUserBox type="email" />}
      {updateType === "passwordUpdate" && <UpdateUserPasswordBox />}
      <Footer />
    </>
  );
}
