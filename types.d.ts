export type PartyImage = {
    id: string;
    image_url: string;
    image_text: string;
    created_at: Date;
  };
  
  export type Party = {
    name: string;
    id: string;
    images: Image[];
    user_id: string;
    party_id: string;
  };