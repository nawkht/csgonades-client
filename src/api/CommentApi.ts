import { NadeComment } from "../models/NadeComment";

export class NadeCommentApi {
  static async byNadeId(_: string): Promise<NadeComment[]> {
    return fakeComments();
  }
}

const fakeComments = () => {
  const comment1: NadeComment = {
    id: "1",
    body: "This is a test"
  };
  const comment2: NadeComment = {
    id: "2",
    body: "Hello World"
  };

  return [comment1, comment2];
};
