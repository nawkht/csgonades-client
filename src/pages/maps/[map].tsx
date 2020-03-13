import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { MapPage } from "../../maps/MapPage";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight } from "../../models/Nade/Nade";
import { NadeFilterProvider } from "../../store2/FilterStore/context";
import { withRedux } from "../../utils/WithRedux";

interface Props {
  map: CsgoMap;
  nades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, nades }) => {
  return (
    <NadeFilterProvider nades={nades}>
      <MapPage key={map} map={map} />
    </NadeFilterProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const map = context.query.map as CsgoMap;

  const results = await NadeApi.getByMap(map);

  if (results.isErr()) {
    return {
      props: {
        map,
        nades: [],
      },
    };
  }

  return {
    props: {
      map,
      nades: results.value,
    },
  };
};

export default withRedux(Map, { ssr: false });
