const isBrowser = typeof window !== "undefined";

type Ezoic = typeof ezstandalone | null;

const ezoic: Ezoic = ezstandalone;

export function ezoicInit(codes: number[]) {
  if (isBrowser && ezoic && !ezoic.enabled) {
    try {
      ezoic.DEBUG = true;
      ezoic.init();
      ezoic.define(...codes);
      ezoic.enable();
      ezoic.display();
    } catch (error) {
      // no-op
    }

    console.log("> ezstandalone enabled");
  } else if (isBrowser && ezoic && ezstandalone.enabled) {
    setTimeout(() => {
      try {
        // @ts-ignore
        ezoic.cmd.push(function() {
          ezoic.refresh();
          console.log("> ezstandalone refresh");
        });
      } catch (error) {
        // no-op
      }
    }, 1000);
  }
}
