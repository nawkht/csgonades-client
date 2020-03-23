import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
};

export const CsgnInput: FC<Props> = ({ onChange, value, label }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="input-wrapper">
        {!!label && <label>{label}</label>}
        <input value={value} onChange={e => onChange(e.target.value)}></input>
      </div>
      <style jsx>{`
        .input-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        label {
          margin-bottom: 5px;
          color: ${colors.TEXT};
        }

        input {
          outline: none;
          border: 1px solid #bbb;
          padding: 10px;
          border-radius: 5px;
          background: transparent;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
