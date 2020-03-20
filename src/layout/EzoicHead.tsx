import { FC, memo } from "react";
import Head from "next/head";
import { useAdRefresher } from "./useAdRefresher";

type Props = {};

export const EzoicHead: FC<Props> = memo(({}) => {
  useAdRefresher();

  console.log("> EzoicHead render");

  return (
    <>
      <Head>
        <script
          key="ez-init"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                var runEzoicStandalone = false;
                var ezstandalone = ezstandalone || {};
                ezstandalone.cmd = ezstandalone.cmd || [];
                ezstandalone.cmd.push(function() {
                  ezstandalone.setIsPWA();
                });`,
          }}
        />
        <script
          key="ez-script"
          defer
          async
          src="//www.ezojs.com/ezoic/sa.min.js"
        />
      </Head>
    </>
  );
});
