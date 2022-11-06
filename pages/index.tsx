import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { Divider, Input, Row, Col } from "antd";
import { useRouter } from "next/router";
import { KeyboardEvent } from "react";

const Container = styled.div`
  position: absolute;
  top: 20%;
  padding: 0 20px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  border: none;
  background: #eeeeee;
  border-radius: 50px;
  height: 50px;
`;

const StyledRow = styled(Row)`
  margin-bottom: 2rem;
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

      <StyledRow justify="center">
        <Col style={{ width: "100%" }}>
          <Row justify="center">
            <h1>Join</h1>
          </Row>
          <Row style={{ marginBottom: "70px" }} justify="center">
            The party starts and ends here
          </Row>
          <StyledRow justify="center">
            <StyledInput
              placeholder="Enter party code"
              id="partycode"
              onPressEnter={(e) => goToPartyRoute(e)}
            />
          </StyledRow>
          <Divider plain>Or</Divider>
          <Row justify="center">QR code</Row>
        </Col>
      </StyledRow>
    </Container>
  );
};

export default Home;
