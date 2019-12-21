import { FC } from "react";
import { Status, StatusInfo } from "../../../models/Nade";
import { Colors } from "../../../../constants/colors";

type Props = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NadeStatus: FC<Props> = ({ status, statusInfo }) => {
  if (status === "accepted") {
    return null;
  }

  function statusText() {
    switch (status) {
      case "pending":
        return (
          <div>
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
        );
      case "declined":
        return (
          <div>
            <h3>Declined</h3>
            <p>{statusInfo}</p>
          </div>
        );
      default:
        return <></>;
    }
  }

  const statusColors = statusColor(status);

  return (
    <>
      <div className="status-container">{statusText()}</div>
      <style jsx>{`
        .status-container {
          position: relative;
          margin-bottom: 18px;
          background: ${statusColors.background};
          border: 1px solid ${statusColors.border};
          padding: 12px 18px;
          color: ${statusColors.text};
          border-radius: 4px;
        }

        .status-edit {
          position: absolute;
          top: 5px;
          right: 5px;
        }
      `}</style>
    </>
  );
};

function statusColor(status: Status) {
  switch (status) {
    case "accepted":
      return {
        border: Colors.PRIMARY_BORDER,
        background: "#00f064",
        text: "white"
      };
    case "pending":
      return {
        border: Colors.PRIMARY_BORDER,
        background: "#f09800",
        text: "white"
      };
    case "declined":
      return {
        border: Colors.PRIMARY_BORDER,
        background: "#bf0000",
        text: "white"
      };

    default:
      return {
        border: Colors.PRIMARY_BORDER,
        background: "white",
        text: "#222"
      };
  }
}
