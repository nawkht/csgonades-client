import { AxiosError } from "axios";

type ApiErrorTypes = "NOT_FOUND" | "UNKNOWN";

export type ApiError = {
  type: ApiErrorTypes;
  message: string;
};

export const apiErrorFromAxios = (error: AxiosError): ApiError => {
  switch (error.code) {
    case "400":
      return {
        type: "NOT_FOUND",
        message: error.message
      };
      break;

    default:
      return {
        type: "UNKNOWN",
        message: error.message
      };
  }
};
