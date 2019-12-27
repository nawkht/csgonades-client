import { Result } from "neverthrow";

export type AppError = {
  status: number;
  message: string;
};

export type AppResult<T> = Promise<Result<T, AppError>>;

export const getError = <T>(error: any): AppError => {
  const correctErrorType = error as AppError;
  return correctErrorType;
};
