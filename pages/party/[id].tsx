import type { NextPage, GetServerSideProps } from "next";
import { Row, Col } from "antd";
import { HeartOutlined, HeartFilled, DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";
import Head from "next/head";
import { supabase } from "../../utils/supabaseClient";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import { useSession } from "@supabase/auth-helpers-react";
import { Party, PartyImage } from "../../types";

const StyledImage = styled(Image)`
  opacity: 1;
  transition: 0.5s ease;
`;

const Middle = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
  width: 195px;
  height: 195px;
  border: solid 1px white;
  position: relative;
  :hover {
    ${StyledImage} {
      opacity: 0.6;
    }
    ${Middle} {
      opacity: 1;
    }
  }
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
    .select("name, id, user_id, images(id, image_url, image_text, created_at)")
    .eq("party_id", context.params?.id)
    .single();

  const party: Party = await JSON.parse(JSON.stringify(data));

  return { props: { party } };
};

interface PartyPageProps {
  party: Party;
}

const PartyPage: NextPage<PartyPageProps> = ({ party }) => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const session = useSession();

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

  const deleteImage = async (imageId: string) => {
    await supabase.from("images").delete().eq("id", imageId);
    router.replace(router.asPath);
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
    insertImageReference(generatedFileName, party.id).then(() => {
      setUploading(false);
      router.replace(router.asPath);
    });
  };

  const isPartyOwner = party?.user_id === session?.user.id;

  if (!party) {
    return <DefaultErrorPage statusCode={404} withDarkMode={false} />;
  }

  return (
    <>
      <Head>
        <title>{party.name}</title>
      </Head>
      <Row justify="center">
        <h1>{party.name}</h1>
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
        {party.images
          ?.sort(
            (a: PartyImage, b: PartyImage) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((img: PartyImage) => (
            <Col key={img.image_text}>
              <ImageContainer>
                <StyledImage
                  src={img.image_url}
                  alt=""
                  width={300}
                  height={300}
                  layout="responsive"
                  style={{ border: "solid 1px white" }}
                />
                <Middle>
                  <HeartOutlined />
                  {isPartyOwner && (
                    <DeleteFilled onClick={() => deleteImage(img.id)} />
                  )}
                </Middle>
              </ImageContainer>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default PartyPage;
