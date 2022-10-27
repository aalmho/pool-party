import type { NextPage } from "next";
import styled from "styled-components";
import { Row, Input, Button, Form } from "antd";
import Head from "next/head";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";

const Container = styled.div`
  padding: 0 2rem;
`;
const PageHeader = styled.h1``;

const StyledRow = styled(Row)`
  margin: 2rem;
`;

const createRandomPartyId = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idLength = 10;
  let id = "";
  for (let i = 0; i <= idLength; i++) {
    let randomNumber = Math.floor(Math.random() * characters.length);
    id += characters.substring(randomNumber, randomNumber + 1);
  }
  return id;
};

type CreatePartyForm = {
  partyName: string;
};

const CreateParty: NextPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const session = useSession();

  const createParty = async (id: string, name: string) => {
    await supabase
      .from("parties")
      .insert({ party_id: id, name: name, user_id: session?.user.id });
  };

  const onFinnish = async (values: CreatePartyForm) => {
    const id = createRandomPartyId();
    createParty(id, values.partyName).then(() => {
      router.push("/party/" + id);
    });
  };

  return (
    <Container>
      <Head>
        <title>Create a party</title>
      </Head>
      <Row justify="center">
        <PageHeader>Create A Party</PageHeader>
      </Row>
      <Form form={form} onFinish={onFinnish}>
        <StyledRow justify="center">Name your party</StyledRow>
        <StyledRow justify="center">
          <Form.Item name="partyName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </StyledRow>
        <StyledRow justify="center">
          <Button htmlType="submit">Start pooling</Button>
        </StyledRow>
      </Form>
    </Container>
  );
};

export default CreateParty;
