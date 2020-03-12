import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../api/NadeApi";
import { Nade } from "../../models/Nade/Nade";
import { NadeNotFound } from "../../nades/NadeNotFound";
import { NadePage } from "../../nades/NadePage";
import { withRedux } from "../../utils/WithRedux";

type Props = {
  nade: Nade;
};

const NadePageComponent: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    return <NadeNotFound />;
  } else {
    return <NadePage nade={nade} />;
  }
};

export const getServerSideProps: GetServerSideProps = async context => {
  const nadeId = context.query.nade as string;

  const result = await NadeApi.byId(nadeId);

  if (result.isErr()) {
    context.res.statusCode = 404;
    return {
      props: {
        nade: null,
      },
    };
  }

  return {
    props: {
      nade: result.value,
    },
  };
};

export default withRedux(NadePageComponent, { ssr: false });
