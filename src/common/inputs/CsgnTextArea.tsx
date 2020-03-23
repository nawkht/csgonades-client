import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

export const CsgnTextArea: FC<Props> = ({ value, onChange, label }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="text-area-wrapper">
        <label>{label}</label>
        <textarea value={value} onChange={e => onChange(e.target.value)} />
      </div>
      <style jsx>{`
        .text-area-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          color: ${colors.TEXT};
        }

        textarea {
          border: 1px solid #bbb;
          background: transparent;
          outline: none;
          min-height: 250px;
          resize: none;
          padding: 15px;
          border-radius: 5px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
