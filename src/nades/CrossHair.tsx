import { FC } from "react";

type Props = {};

export const CrossHair: FC<Props> = ({}) => {
  return (
    <>
      <svg
        viewBox="0 0 100 101"
        style={{ position: "relative", top: 2, left: 1 }}
      >
        <defs>
          <style>{".prefix__a{fill:#fff}"}</style>
        </defs>
        <title>{"Untitled-2"}</title>
        <path className="prefix__a" d="M.5 45.5h36v7H.5z" />
        <path d="M36 46v6H1v-6h35m1-1H0v8h37v-8z" />
        <path className="prefix__a" d="M46.5.5h7v36h-7z" />
        <path d="M53 1v35h-6V1h6m1-1h-8v37h8V0z" />
        <path className="prefix__a" d="M46.5 64.5h7v36h-7z" />
        <path d="M53 65v35h-6V65h6m1-1h-8v37h8V64z" />
        <path className="prefix__a" d="M63.5 45.5h36v7h-36z" />
        <path d="M99 46v6H64v-6h35m1-1H63v8h37v-8z" />
      </svg>
      <style jsx>{``}</style>
    </>
  );
};
