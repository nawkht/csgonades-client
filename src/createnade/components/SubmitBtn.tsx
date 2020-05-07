import { FC } from "react";

type Props = {
  onSubmit: () => void;
  disabled?: boolean;
};

export const SumbitBtn: FC<Props> = ({ disabled, onSubmit }) => {
  return (
    <>
      <button onClick={onSubmit} disabled={disabled} className="sumbit-btn">
        SUBMIT
      </button>
      <style jsx>{`
        .sumbit-btn {
          width: 100%;
          background: #63b04a;

          color: white;
          border: none;
          outline: none;
          height: 41px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 14px;
          cursor: pointer;
        }

        .sumbit-btn:hover {
          background: #4d8a3a;
        }

        .sumbit-btn:disabled {
          background: #636363;
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sumbit-btn:disabled:hover {
          background: #636363;
        }
      `}</style>
    </>
  );
};
