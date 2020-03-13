import { GetStaticPaths, GetStaticProps, NextPage } from "next";
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

type MapParams = {
  params: {
    map: CsgoMap;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: MapParams[] = [
    { params: { map: "dust2" } },
    { params: { map: "mirage" } },
    { params: { map: "inferno" } },
    { params: { map: "overpass" } },
    { params: { map: "train" } },
    { params: { map: "cache" } },
    { params: { map: "nuke" } },
    { params: { map: "vertigo" } },
    { params: { map: "cobblestone" } },
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const map = params.map as CsgoMap;

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
