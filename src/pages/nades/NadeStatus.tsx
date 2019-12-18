import { FC } from "react";
import { Status, StatusInfo } from "../../models/Nade";

type Props = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NadeStatus: FC<Props> = ({ status }) => {
  if (status === "pending") {
    return (
      <>
        <div className="status-container">
          <h3>Waiting for approval</h3>
          <p>
            This nade is going through approval. Come back later to see if it
            has been approved.
          </p>
          <p>
            To make the process go fast add a title, description and other
            fields on this page.
          </p>
        </div>
        <style jsx>{`
          .status-container {
            margin-bottom: 18px;
            background: #ff8400;
            border: 1px solid #b55e00;
            padding: 12px 18px;
            color: white;
            border-radius: 4px;
          }
        `}</style>
      </>
    );
  }

  return null;
};
