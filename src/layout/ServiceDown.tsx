import { FC, useState, useEffect } from "react";
import Axios from "axios";
import { CSGNModal } from "../common/CSGNModal";

type Props = {};

export const ServiceDown: FC<Props> = ({}) => {
  const [serviceUp, setServiceUp] = useState(true);

  useEffect(() => {
    Axios.get("https://api.csgonades.com")
      .then(() => setServiceUp(true))
      .catch(() => setServiceUp(false));
  }, []);

  return (
    <CSGNModal
      visible={!serviceUp}
      empty={true}
      onDismiss={() => setServiceUp(true)}
    >
      <div className="service-down">
        <h3>Service Down</h3>
        <p>
          We seem to have some technical difficulties.
          <br /> Refresh the page or come back later.
          <br />
          <br />
          <button className="refresh-btn" onClick={() => location.reload()}>
            Refresh page
          </button>
        </p>
      </div>
      <style jsx>{`
        .service-down {
          background: maroon;
          max-width: 450px;
          border-radius: 5px;
          padding: 30px;
          margin: 0 auto;
          text-align: center;
          color: white;
        }

        .refresh-btn {
          border: none;
          outline: none;
          padding: 15px 30px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
        }

        .refresh-btn:hover {
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
    </CSGNModal>
  );

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
