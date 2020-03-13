import { FC, memo, useMemo } from "react";

type Props = {
  icon: any;
  onClick?: () => void;
  value: string;
  backgroundColor: string;
  loading?: boolean;
  small?: boolean;
};

export const ButtonWithIcon: FC<Props> = memo(
  ({ icon, onClick, value, backgroundColor, loading, small }) => {
    const classNameBuild = useMemo(() => {
      const base = ["btn"];
      if (small) {
        base.push("small");
      }
      return base.join(" ");
    }, [small]);

    return (
      <>
        <button className={classNameBuild} onClick={onClick}>
          {loading && <span className="loading">Loading...</span>}
          {!loading && (
            <>
              <span className="btn-icon">
                <span className="btn-icon-fa">{icon}</span>
              </span>
              <span className="btn-label">{value}</span>
            </>
          )}
        </button>
        <style jsx>{`
          .btn {
            width: 100%;
            cursor: pointer;
            border: none;
            outline: none;
            appearance: none;
            background: ${backgroundColor};
            border-radius: 5px;
            display: flex;
            transition: background 0.15s;
            align-items: center;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }

          .btn:hover {
            background: ${LightenDarkenColor(backgroundColor, -10)};
          }

          .btn:hover .btn-icon {
            background: ${LightenDarkenColor(backgroundColor, -20)};
          }

          .loading {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-align: center;
            color: white;
          }

          .btn-icon {
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 16px;
            color: white;
            width: 40px;
            height: 40px;
            border-right: 1px solid ${LightenDarkenColor(backgroundColor, -20)};
            background: ${LightenDarkenColor(backgroundColor, -10)};
            transition: background 0.15s;
          }

          .btn-icon-fa {
            position: relative;
            top: 2px;
          }

          .btn-label {
            flex: 1;
            display: block;
            color: white;
            font-size: 16px;
            text-align: center;
            width: 100%;
            font-weight: 400;
          }

          .small .btn-label {
            font-size: 14px;
            padding-left: 4px;
            padding-right: 4px;
          }

          .small .btn-icon {
            height: 30px;
            width: 30px;
            font-size: 14px;
          }

          .small .btn-icon-fa {
            position: relative;
            top: 1px;
            left: 1px;
          }
        `}</style>
      </>
    );
  }
);

function LightenDarkenColor(col: string, amt: number) {
  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
