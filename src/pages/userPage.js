import React from "react";
import { useParams } from "react-router-dom";
import { HomeHeader } from "../components/header/homeHeader";
import { Footer } from "../components/footer/footer";
import { LoginBox } from "../components/authBox/loginBox";
import { ForgotPasswordBox } from "../components/authBox/forgotPasswordBox";
import { SignupBox } from "../components/authBox/signupBox";
import { VerifyCodeBox } from "../components/authBox/verifyCodeBox";
import { PasswordResetBox } from "../components/authBox/passwordReset";
import { UserBox } from "../components/authBox/userBox";

export function UserPage() {
  const { action } = useParams();

  if (action === "verifyCode") return <VerifyCodeBox />;

  if (action === "passwordReset") return <PasswordResetBox />;

  return (
    <>
      <HomeHeader />

      {action === "login" && <LoginBox />}

      {action === "signup" && <SignupBox />}

      {action === "forgotPassword" && <ForgotPasswordBox />}

      {!action && <UserBox />}

      <Footer />
    </>
  );
}
