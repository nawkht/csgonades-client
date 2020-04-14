import { FC, useRef, useState, useMemo } from "react";

type Props = {
  value: string;
};

export const BlogCopyPaste: FC<Props> = ({ value }) => {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const confirmClassName = useMemo(() => {
    const base = ["copy-confirm"];
    if (displayConfirm) {
      base.push("visible");
    }
    return base.join(" ");
  }, [displayConfirm]);

  function copyToClipboard() {
    if (!ref.current) {
      return;
    }
    const node = ref.current;

    node.select();
    node.setSelectionRange(0, 99999);

    /* Copy the text inside the text field */
    document.execCommand("copy");

    setDisplayConfirm(true);
    setTimeout(() => {
      setDisplayConfirm(false);
    }, 1500);
  }

  return (
    <>
      <div className="copy-paste">
        <div className={confirmClassName}>Copied to clipboard</div>
        <input ref={ref} defaultValue={value} />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <style jsx>{`
        .copy-paste {
          position: relative;
          display: flex;
          margin-bottom: 20px;
          margin-top: 20px;
        }

        .copy-confirm {
          position: absolute;
          bottom: 100%;
          right: 0;
          background: #79c900;
          color: white;
          margin-left: 10px;
          margin-bottom: 10px;
          padding: 5px;
          border-radius: 5px;
          opacity: 0;
          transition: opacity 0.5s;
          white-space: nowrap;
        }

        .visible {
          opacity: 1;
        }

        input {
          flex: 1;
          padding: 15px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          border: none;
          background: rgba(201, 101, 0, 0.2);
          outline: none;
        }

        button {
          border: none;
          background: rgba(201, 101, 0, 0.9);
          padding: 15px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          cursor: pointer;
          color: white;
        }
      `}</style>
    </>
  );
};
