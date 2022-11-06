import React, { FC } from "react";
import { Menu, Layout, Row, Col } from "antd";
import type { MenuProps } from "antd";
import { SupabaseClient, useSession } from "@supabase/auth-helpers-react";
import signOut from "../utils/signOut";
import Link from "next/link";
import styled from "styled-components";
import useIsMobile from "../hooks/useIsMobile";
import { CameraOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const MobileNavigation = styled.div`
  background: #fff;
  height: 80px;
  width: 100%;
  bottom: 0;
  position: fixed;
  z-index: 10;
`;

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
    <MobileNavigation>
      <Row
        justify="space-between"
        align="bottom"
        style={{ padding: "20px 15px" }}
      >
        <Link href={"/"}>
          <Col>
            <Row justify="center">
              <CameraOutlined style={{ fontSize: "20px" }} />
            </Row>
            <Row>Join</Row>
          </Col>
        </Link>
        <Link href={"/my-parties"}>
          <Col>
            <Row justify="center">
              <UserOutlined style={{ fontSize: "20px" }} />
            </Row>
            <Row>My parties</Row>
          </Col>
        </Link>
        <Link href={"create-party"}>
          <Col>
            <Row justify="center">
              <PlusOutlined style={{ fontSize: "20px" }} />
            </Row>
            <Row>Create</Row>
          </Col>
        </Link>
      </Row>
    </MobileNavigation>
  );
};

export default MenuHeader;
