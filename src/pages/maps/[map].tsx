import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { MapPage } from "../../maps/MapPage";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight } from "../../models/Nade/Nade";
import { useFilterServerSideNades } from "../../store/MapStore/hooks/useFilteredNades";

interface Props {
  map: CsgoMap;
  nades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, nades }) => {
  const filteredNades = useFilterServerSideNades(nades);

  return <MapPage map={map} ssrNades={filteredNades} />;
};

export const getServerSideProps: GetServerSideProps = async context => {
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
    console.log("Failed to get nades");
    return {
      props: {
        map,
        nades: [],
      },
    };
  }
};

export default Map;
