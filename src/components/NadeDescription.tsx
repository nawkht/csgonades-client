export const NadeDescription = () => {
  return (
    <>
      <div className="nade-desc-wrapper">
        <div className="nade-desc-title">Title</div>
        <div className="nade-desc-body">Description</div>
      </div>
      <style jsx>{`
        .nade-desc-wrapper {
          background: white;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
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
