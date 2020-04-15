import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight } from "../../models/Nade/Nade";
import { MapPage2 } from "../../maps/MapPage2";

interface Props {
  map: CsgoMap;
  nades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, nades }) => {
  return <MapPage2 map={map} allNades={nades} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const map = context.query.map as CsgoMap;

  const results = await NadeApi.getByMap(map);

  if (results.isOk()) {
    return {
      props: {
        map,
        nades: results.value,
      },
    };
  } else {
    return {
      props: {
        map,
        nades: [],
      },
    };
  }
};

export default Map;
