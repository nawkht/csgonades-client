import { Colors } from "../../constants/colors";

export const NadeDescription = () => {
  return (
    <>
      <div className="nade-desc-wrapper">
        <div className="nade-desc-body">Description</div>
      </div>
      <style jsx>{`
        .nade-desc-wrapper {
          background: white;
          border-top: 1px solid ${Colors.PRIMARY_BORDER};
        }

        .nade-desc-title {
          padding: 12px;
          font-size: 1.6em;
        }

        .nade-desc-body {
          padding: 12px;
        }
      `}</style>
    </>
  );
};
