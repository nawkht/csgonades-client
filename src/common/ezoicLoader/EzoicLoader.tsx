import Head from "next/head";
import { FC, memo } from "react";

type Props = {
  codes: number[];
};

const isBrowser = typeof window !== "undefined";

export const EzoicLoader: FC<Props> = memo(({ codes }) => {
  if (!isBrowser) {
    return null;
  }

  const codeString = codes.join(",");

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            var ezstandalone = ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
            ezstandalone.cmd.push(function() {
              ezstandalone.define(${codeString}); ezstandalone.enable(); ezstandalone.display();
            });
            console.log("Ezoic loaded")
            `,
          }}
        ></script>
        <script src="//www.ezojs.com/ezoic/sa.min.js"></script>
      </Head>
      <style jsx>{``}</style>
    </>
  );
});
