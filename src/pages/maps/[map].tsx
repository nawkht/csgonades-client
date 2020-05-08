import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight } from "../../models/Nade/Nade";
import { MapPage2 } from "../../maps/MapPage2";

interface Props {
  map: CsgoMap;
  ssrNades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, ssrNades }) => {
  if (!ssrNades) {
    return null;
  }

  return <MapPage2 key={map} map={map} allNades={ssrNades} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const map = context.query.map as CsgoMap;

  const results = await NadeApi.getByMap(map);

  if (results.isOk()) {
    return {
      props: {
        map,
        ssrNades: results.value,
      },
    };
  } else {
    return {
      props: {
        map,
        ssrNades: [],
      },
    };
  }
};

export default Map;
