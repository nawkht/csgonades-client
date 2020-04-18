import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight } from "../../models/Nade/Nade";
import { MapPage2 } from "../../maps/MapPage2";
import { useState, useEffect } from "react";

interface Props {
  map: CsgoMap;
  ssrNades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, ssrNades }) => {
  const [nades, setNades] = useState(ssrNades);

  useEffect(() => {
    if (ssrNades.length === 0) {
      (async () => {
        const res = await NadeApi.getByMap(map);
        if (res.isOk()) {
          setNades(res.value);
        } else {
          console.warn(res.error);
        }
      })();
    }
  }, [map, ssrNades.length]);

  return <MapPage2 map={map} allNades={nades} />;
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
