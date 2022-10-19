import type { NextPage, GetServerSideProps } from "next";
import { Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Head from "next/head";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

export type Image = {
  image_url: string;
  image_text: string;
  created_at: Date;
};

export type Party = {
  name: string;
  id: string;
  images: Image[];
};

const StyledImage = styled.div`
  width: 195px;
  height: 195px;
  border: solid 1px white;
`;

const UploadButton = styled.label`
  background-color: blue;
  color: white;
  padding: 0.6rem;
  border-radius: 5px;
  cursor: pointer;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await supabase
    .from("parties")
    .select("name, id, images(image_url, image_text, created_at)")
    .eq("party_id", context.params?.id);

  const party: Party = await JSON.parse(JSON.stringify(data));

  return { props: { party } };
};

interface PartyPageProps {
  party: Party[];
}

const PartyPage: NextPage<PartyPageProps> = ({ party }) => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const insertImageReference = async (fileName: string, imageFK: string) => {
    const imagePath = "/storage/v1/object/public/images/";
    const publicUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL + imagePath + fileName;
    await supabase.from("images").insert({
      image_text: fileName,
      party_id: imageFK,
      image_url: publicUrl,
    });
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    console.log(event.target.files);

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = file.name.substring(0, file.name.indexOf("."));
    const generatedFileName = `${fileName}${Math.random()}.${fileExt}`;

    await supabase.storage.from("images").upload(generatedFileName, file);
    insertImageReference(generatedFileName, party[0].id).then(() => {
      setUploading(false);
      router.replace(router.asPath);
    });
  };

  return (
    <>
      <Head>
        <title>{party[0].name}</title>
      </Head>
      <Row justify="center">
        <h1>{party[0].name}</h1>
      </Row>
      <Row justify="center" style={{ marginBottom: "2rem" }}>
        <UploadButton htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </UploadButton>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={(e) => uploadImage(e)}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </Row>
      <Row justify="center">
        {party[0].images
          ?.sort(
            (a: Image, b: Image) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((img: Image) => (
            <Col key={img.image_text}>
              <StyledImage>
                <Image
                  src={img.image_url}
                  alt=""
                  width={300}
                  height={300}
                  layout="responsive"
                  style={{ border: "solid 1px white" }}
                />
              </StyledImage>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default PartyPage;
