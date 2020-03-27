import { FC } from "react";
import Head from "next/head";

type Props = {};

export const EzoicHead: FC<Props> = ({}) => {
  return (
    <Head>
      <script src="//www.ezojs.com/ezoic/sa.min.js" />
    </Head>
  );
};
