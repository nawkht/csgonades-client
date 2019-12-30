import { Result } from "neverthrow";
import { err } from "neverthrow";
import { AxiosError } from "axios";

export type AppError = {
  status: number;
  message: string;
};

export type AppResult<T> = Promise<Result<T, AppError>>;

export const extractApiError = (badError: any): Result<any, AppError> => {
  let error: AxiosError = badError;
  if (error.response) {
    if (typeof error.response.data === "object") {
      const apiError = error.response.data as AppError;
      return err(apiError);
    } else {
      const apiError: AppError = {
        status: error.response.status,
        message: error.response.statusText
      };
      return err(apiError);
    }
  }

  const unknownError: AppError = {
    status: 500,
    message: "Unknown error"
  };

  console.warn("# Unknown error", error, error.response);

  return err(unknownError);
};
