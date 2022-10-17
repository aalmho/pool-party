import type { NextPage, GetServerSideProps } from "next";
import { Row, Col } from "antd";
import styled from "styled-components";
import Head from "next/head";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

export type Image = {
  image_url: string;
};

export type Party = {
  name: string;
  id: string;
  images: Image[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await supabase
    .from("parties")
    .select("name, id, images(image_url)")
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
    console.log(publicUrl);
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);

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
    <div>
      <Head>
        <title>{party[0].name}</title>
      </Head>
      <Row justify="center">
        <h1>{party[0].name}</h1>
      </Row>
      <Row justify="center">
        <label htmlFor="single">{uploading ? "Uploading ..." : "Upload"}</label>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={(e) => uploadImage(e)}
          disabled={uploading}
        />
      </Row>
      <Row justify="center">
        <Row>
          <h1>Images</h1>
        </Row>

        <Row>
          {party[0].images?.map((img: Image) => (
            <Col>
              <Image
                src={img.image_url}
                alt={party[0].name}
                width={300}
                height={300}
              />
            </Col>
          ))}
        </Row>
      </Row>
    </div>
  );
};

export default PartyPage;
