type RegisterPlaceholder = {
  type: "@@advert/REGISTER_PLACEHOLDER";
  code: number;
  page: string;
};

export const registerAdAction = (
  code: number,
  page: string
): RegisterPlaceholder => ({
  type: "@@advert/REGISTER_PLACEHOLDER",
  code,
  page,
});

export type AdvertActions = RegisterPlaceholder;
