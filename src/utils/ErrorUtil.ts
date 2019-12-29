import { Result } from "neverthrow";
import { err } from "neverthrow";

export type AppError = {
  status: number;
  message: string;
};

export type AppResult<T> = Promise<Result<T, AppError>>;

export const extractApiError = (error: any): Result<any, AppError> => {
  if (error?.response?.data) {
    const apiError = error.response.data as AppError;
    return err(apiError);
  }

  const unknownError: AppError = {
    status: error?.status || 500,
    message: error?.message || "Unknown error"
  };

  console.warn("# Unknown error", error);

  return err(unknownError);
};
