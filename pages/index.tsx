import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { Button, Input, Row, Col } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const Container = styled.div`
  padding: 5rem 5rem;
`;

const PageText = styled.h2``;

const StyledRow = styled(Row)`
  margin-bottom: 2rem;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const [partyCode, setPartyCode] = useState<ChangeEvent<HTMLInputElement>>();
  const goToPartyRoute = () => {
    router.push("/party/" + partyCode?.target.value);
  };

  return (
    <Container>
      <Head>
        <title>Pool The Party</title>
        <meta name="description" content="Pool a party with your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledRow justify="center">
        <Col>
          <StyledRow justify="center">
            <PageText>Join a party</PageText>
          </StyledRow>
          <StyledRow justify="center">
            <label>
              partycode
              <Input id="partycode" onChange={(e) => setPartyCode(e)} />
            </label>
          </StyledRow>
          <StyledRow justify="center">
            <Button onClick={() => goToPartyRoute()}>Enter</Button>
          </StyledRow>
        </Col>
      </StyledRow>
    </Container>
  );
};

export default Home;
