import React, { FC, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { PartyImage } from "../types";
import styled from "styled-components";
import { DeleteFilled, HeartOutlined } from "@ant-design/icons";
import { supabase } from "../utils/supabaseClient";
import router from "next/router";

const StyledModal = styled(Modal)`
  border-radius: 15px;
  width: 100%;
  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-content {
    border-radius: 20px;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
`;

interface ImageModalProps {
  image: PartyImage;
  isPartyOwner: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ImageModal: FC<ImageModalProps> = ({
  image,
  isPartyOwner,
  isModalOpen,
  setIsModalOpen,
}) => {
  const deleteImage = async (imageId: string) => {
    await supabase.from("images").delete().eq("id", imageId);
    router.replace(router.asPath);
  };
  return (
    <StyledModal
      footer={[
        <div key="likeanddelete">
          <HeartOutlined />
          {isPartyOwner && (
            <DeleteFilled onClick={() => deleteImage(image!.id)} />
          )}
        </div>,
      ]}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <StyledImage alt="" src={image?.image_url!} height={2400} width={2400} />
    </StyledModal>
  );
};

export default ImageModal;
