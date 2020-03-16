import { FC } from "react";

type Props = {};

export const ServiceDown: FC<Props> = ({}) => {
  return (
    <>
      <div className="service-down">
        The service seems to be down at the moment. Refresh the page or come
        back later.
      </div>
      <style jsx>{`
        .service-down {
          background: maroon;
          color: white;
          padding: 20px;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
};
