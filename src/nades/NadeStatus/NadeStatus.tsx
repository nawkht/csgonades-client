import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Status, StatusInfo } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { ThemeColors } from "../../store/SettingsStore/Themes";

type Props = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NadeStatus: FC<Props> = ({ status, statusInfo }) => {
  const { colors } = useTheme();

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
              To make the process go fast,
              <br /> hold your mouse over the <strong>title</strong>,{" "}
              <strong>description</strong>
              <br /> and the <strong>meta panel</strong> to edit them.
            </p>
            <style jsx>{`
              h3 {
                font-size: 24px;
                text-align: center;
              }
              p {
                font-size: 16px;
                text-align: center;
              }
            `}</style>
          </div>
        );
      case "declined":
        return (
          <div>
            <h3>Declined</h3>
            <p>{statusInfo}</p>
            <style jsx>{`
              h3 {
                font-size: 24px;
                text-align: center;
              }
              p {
                font-size: 16px;
                text-align: center;
              }
            `}</style>
          </div>
        );
      default:
        return <></>;
    }
  }

  const statusColors = statusColor(status, colors);

  return (
    <>
      <div className="status-container">{statusText()}</div>
      <style jsx>{`
        .status-container {
          max-width: 400px;
          margin: 0 auto;
          background: ${statusColors.background};
          border: 1px solid ${statusColors.border};
          padding: 12px 18px;
          color: ${statusColors.text};
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-top: 20px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

function statusColor(status: Status, colors: ThemeColors) {
  switch (status) {
    case "accepted":
      return {
        border: colors.BORDER,
        background: "#00f064",
        text: "white",
      };
    case "pending":
      return {
        border: colors.BORDER,
        background: "#f09800",
        text: "white",
      };
    case "declined":
      return {
        border: colors.BORDER,
        background: "#bf0000",
        text: "white",
      };

    default:
      return {
        border: colors.BORDER,
        background: "white",
        text: "#222",
      };
  }
}
