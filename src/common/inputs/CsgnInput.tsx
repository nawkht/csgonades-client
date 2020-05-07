import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FaStarOfLife } from "react-icons/fa";
import { Popup } from "semantic-ui-react";

type Props = {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
};

export const CsgnInput: FC<Props> = ({
  onChange,
  value,
  label,
  placeholder,
  required,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="input-wrapper">
        {!!label && (
          <label>
            {label}{" "}
            {!!required && (
              <Popup
                size="tiny"
                inverted
                position="top center"
                content="Required"
                trigger={
                  <span className="req">
                    <FaStarOfLife />
                  </span>
                }
              />
            )}
          </label>
        )}
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
      <style jsx>{`
        .input-wrapper {
          display: flex;
          flex-direction: column;
        }

        .req {
          color: red;
          display inline-block;
          font-size: 6px;
          margin: 0;
          padding: 0;
          position: relative;
          top: -4px;
        }

        label {
          margin-bottom: 5px;
          color: ${colors.TEXT};
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }

        input {
          outline: none;
          border: 1px solid rgba(0, 0, 0, 0.15);
          padding: 11px 16px;
          border-radius: 5px;
          color: ${colors.TEXT};
          background: ${colors.DP03};
          height: 43px;
        }

        input:focus {
          border: 1px solid ${colors.filterBgHover};
        }

        input::placeholder {
          color: #ccc;
          font-weight: 300;
        }
      `}</style>
    </>
  );
};
