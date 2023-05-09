import { useEffect, useState } from "react";
import HeaderEmployee from "../../../components/Layout/HeaderEmployee";
import MenuEmployee from "../../../components/Layout/MenuEmployee";
import { useRouter } from "next/router";
import { getProvinsi } from "../../../services/Libs/hooks/Provinsi/useProvinsi";
import Image from "next/image";
import main from "@assets/icon/ic_main.svg";
import { getToken } from "@helpers/token";
import { Cookies } from "react-cookie";
import axios from "axios";

export default function menu() {
  const router = useRouter();

  const cookies = new Cookies();
  const token = getToken();
  const { query } = useRouter();
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      // router.push("/mitra/daftarkonsultasi");
      router.push("/");
    }

    // console.log("router change");
  }, [router]);

  const logoutHanlder = async () => {
    const token = getToken();
    await axios({
      url: process.env.NEXT_PUBLIC_API_URL + "/data_user/keluar",
      method: "post",
      headers: { Authorization: `${token}` },
    }).then(() => {
      cookies.remove("Email", { path: "/" });
      cookies.remove("Username", { path: "/" });
      cookies.remove("token", { path: "/" });
      router.push("/login/jobhunt");
    });
  };
  return (
    <>
      <div>
        <HeaderEmployee logoutHanlder={logoutHanlder} />
        <MenuEmployee />
      </div>
    </>
  );
}
