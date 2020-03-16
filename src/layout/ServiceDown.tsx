import { FC, useState, useEffect } from "react";
import Axios from "axios";

type Props = {};

export const ServiceDown: FC<Props> = ({}) => {
  const [serviceUp, setServiceUp] = useState(true);

  useEffect(() => {
    Axios.get("https://api.csgonades.com")
      .then(() => setServiceUp(true))
      .catch(() => setServiceUp(false));
  }, []);

  return (
    <>
      {!serviceUp && (
        <div className="service-down">
          The service seems to be down at the moment. Refresh the page or come
          back later.
        </div>
      )}

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
