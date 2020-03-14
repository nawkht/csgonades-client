import { FC } from "react";

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
        pre {
          background: #444;
          color: white;
          padding: 30px;
          margin-left: -10px;
          margin-right: -10px;
          border-radius: 5px;
          margin-bottom: 40px;
          overflow-y: hidden;
          overflow-x: auto;
        }
      `}</style>
    </>
  );
};
