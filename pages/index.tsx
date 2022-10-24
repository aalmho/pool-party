import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { Button, Input, Row, Col } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";

const Container = styled.div`
  padding: 0 20rem;
`;
const PageHeader = styled.h1``;

const PageText = styled.h2``;

const StyledRow = styled(Row)`
  margin: 2rem;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const goToPartyRoute = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    router.push("/party/" + value);
  };

  return (
    <Container>
      <Head>
        <title>Pool The Party</title>
        <meta name="description" content="Pool a party with your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row justify="center">
        <PageHeader>Pool The Party</PageHeader>
      </Row>

      <StyledRow justify="center">
        <Col>
          <StyledRow justify="center">
            <PageText>Join a pool</PageText>
          </StyledRow>
          <StyledRow justify="center">
            <Input onPressEnter={(e) => goToPartyRoute(e)} />
          </StyledRow>
        </Col>
      </StyledRow>
      <StyledRow justify="center">Or</StyledRow>

      <StyledRow justify="center">
        <Link href={"/create-party"}>
          <Button>Create a party</Button>
        </Link>
      </StyledRow>
    </Container>
  );
};

export default Home;
