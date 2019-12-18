import { FC } from "react";
import { NadeItem } from "./NadeItem";
import { Nade } from "src/models/Nade";
import { useRouter } from "next/router";

interface Props {
  nades: Nade[];
}

const NadeList: FC<Props> = ({ nades }) => {
  const router = useRouter();

  function onNadeClick(id: string) {
    router.push(`/nade/${id}`);
  }

  if (nades.length === 0) {
    return (
      <>
        <div className="nadelist-nonades">No nades :(</div>
        <style jsx>{`
          .nadelist-nonades {
            margin: 18px;
            background: white;
            text-align: center;
            padding: 12px;
            font-size: 1.4em;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div id="nadelist">
        {nades.map(nade => (
          <NadeItem onClick={onNadeClick} key={nade.title} nade={nade} />
        ))}
      </div>
      <style jsx>
        {`
          #nadelist {
            display: flex;
            padding: 18px;
          }
        `}
      </style>
    </>
  );
};

export { NadeList };
