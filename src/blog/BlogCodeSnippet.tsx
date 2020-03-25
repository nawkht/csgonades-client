import { FC } from "react";
import { Dimensions } from "../constants/Constants";

type Props = {
  code: string;
};

export const BlogCodeSnippet: FC<Props> = ({ code }) => {
  return (
    <>
      <code>
        <pre dangerouslySetInnerHTML={{ __html: code }} />
      </code>
      <style jsx>{`
        code {
        }

        pre {
          max-width: 100%;
          background: #444;
          color: white;
          padding: 30px;
          border-radius: 5px;
          margin-bottom: 40px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          pre {
            margin-left: 0px;
            margin-right: 0px;
          }
        }
      `}</style>
    </>
  );
};
