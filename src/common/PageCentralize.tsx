import { FC } from "react";
export const PageCentralize: FC = ({ children }) => {
  return (
    <>
      <div className="page-centralize">{children}</div>
      <style jsx>{`
        .page-centralize {
          max-width: 1280px;
          padding-left: 40px;
          padding-right: 40px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
