import { FC, useState } from "react";
import { FaFlag } from "react-icons/fa";
import { Button, Form, TextArea } from "semantic-ui-react";
import { ReportApi } from "../../api/ReportApi";
import { ButtonWithIcon } from "../../common/ButtonWithIcon";
import { CSGNModal } from "../../common/CSGNModal";
import { ReportAddDto } from "../../models/Report";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";

type Props = {
  nadeId: string;
};

export const ReportNadeButton: FC<Props> = ({ nadeId }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportMsg, setReportMsg] = useState("");
  const displayToast = useDisplayToast();

  function onToggle() {
    setShowReportForm(!showReportForm);
  }

  function onSendReport() {
    const report: ReportAddDto = {
      nadeId,
      message: reportMsg,
    };
    ReportApi.add(report);
    setReportMsg("");
    setShowReportForm(false);
    displayToast({
      severity: "success",
      title: "Report sent",
      message: "Thanks for reporting this nade.\nWe will look into it.",
    });
  }

  return (
    <>
      <div className="report-button-wrapper">
        <ButtonWithIcon
          icon={<FaFlag />}
          backgroundColor="#ab1309"
          value={"Report"}
          onClick={onToggle}
        />
      </div>
      <CSGNModal
        visible={showReportForm}
        onDismiss={onToggle}
        title="Report nade"
      >
        <div className="report-nade">
          <p>Explain why you are reporting this nade.</p>
          <Form onSubmit={onSendReport}>
            <Form.Field>
              <label>Reason</label>
              <TextArea
                placeholder="Report reason..."
                value={reportMsg}
                rows={10}
                onChange={e => setReportMsg(e.currentTarget.value)}
              />
            </Form.Field>
            <Button positive type="submit">
              Send
            </Button>
          </Form>
        </div>
      </CSGNModal>
      <style jsx>{`
        .report-nade {
          min-width: 40vw;
        }
      `}</style>
    </>
  );
};
