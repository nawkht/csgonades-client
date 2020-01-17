import { FC, useState } from "react";
import { Button, Dropdown, DropdownProps } from "semantic-ui-react";
import { Status, StatusInfo } from "../../../models/Nade/Nade";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";

type Props = {
  status: Status;
  statusInfo?: StatusInfo;
  onSave: (status: Status, statusInfo?: StatusInfo) => void;
};

export const StatusEditor: FC<Props> = ({ status, statusInfo, onSave }) => {
  const { colors } = useTheme();
  const [curStatus, setCurStatus] = useState(status);
  const [curStatusInfo, setCurStatusInfo] = useState(statusInfo);
  const shouldDisplayInfo = curStatus === "declined" || curStatus === "deleted";

  function onChange(_: any, data: DropdownProps) {
    const newStatus = data.value as Status;
    setCurStatus(newStatus);
  }

  function onSaveClicked() {
    onSave(curStatus, curStatusInfo);
  }

  return (
    <>
      <div className="status-editor">
        <Dropdown
          onChange={onChange}
          options={[
            { key: "pending", value: "pending", text: "Pending" },
            { key: "accepted", value: "accepted", text: "Accepted" },
            { key: "declined", value: "declined", text: "Declined" }
          ]}
          value={curStatus}
        />

        <br />
        {shouldDisplayInfo && (
          <textarea
            onChange={e => setCurStatusInfo(e.target.value)}
            placeholder={"Reason..."}
            value={curStatusInfo}
          />
        )}

        <br />
        <br />
        <Button positive onClick={onSaveClicked}>
          Save
        </Button>
      </div>
      <style jsx>{`
        .status-editor {
        }

        textarea {
          resize: none;
          width: 100%;
          outline: none;
          border: 1px solid ${colors.PRIMARY_BORDER};
          padding: 6px 12px;
          margin-top: 12px;
        }
      `}</style>
    </>
  );
};
