import { FC } from "react";

type Props = {
  title: string;
};

export const NadeTitle: FC<Props> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>

      <style jsx>{`
        h1 {
          font-size: 28px;
          margin: 0;
          padding: 0;
          font-weight: 300;
          color: white;
          text-align: left;
          padding: 10px 0px;
        }

        @media only screen and (max-width: 800px) {
          h1 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};
