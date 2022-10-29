import React, { FC } from "react";
import { Menu, Layout, Row, Col } from "antd";
import type { MenuProps } from "antd";
import { SupabaseClient, useSession } from "@supabase/auth-helpers-react";
import signOut from "../utils/signOut";
import Link from "next/link";

const { Header } = Layout;

interface MenuHeaderProps {
  supabaseClient: SupabaseClient;
}

const MenuHeader: FC<MenuHeaderProps> = (props) => {
  const { supabaseClient } = props;
  const session = useSession();
  const logout = <div onClick={() => signOut(supabaseClient)}>Log Out</div>;
  const menuItems: MenuProps["items"] = [
    {
      label: <Link href={"/"}>Pool The Party</Link>,
      key: "frontpage",
    },
    {
      label: <Link href={"/my-parties"}>My parties</Link>,
      key: "parties",
    },
    {
      label: <Link href={"/create-party"}>Create party</Link>,
      key: "createparty",
    },
  ];
  if (session) {
    menuItems.push({ label: logout, key: "logout" });
  }
  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <Menu items={menuItems} mode={"horizontal"} />
      </Header>
    </Layout>
  );
};

export default MenuHeader;
