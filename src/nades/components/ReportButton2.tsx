import { FC, useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { ReportApi } from "../../api/ReportApi";
import { CSGNModal } from "../../common/CSGNModal";
import { ReportAddDto } from "../../models/Report";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";

type Props = {
  nadeId: string;
};

export const ReportButton2: FC<Props> = ({ nadeId }) => {
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
      <div className="report-btn-container">
        <Button
          fluid
          onClick={onToggle}
          content="Report"
          icon="flag"
          labelPosition="left"
          color="red"
        />
      </div>
      <CSGNModal
        visible={showReportForm}
        onDismiss={onToggle}
        title="Report nade"
      >
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
      </CSGNModal>
      <style jsx>{`
        .report-btn-container {
          width: 48%;
        }
      `}</style>
    </>
  );
};
