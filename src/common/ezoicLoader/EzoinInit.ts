const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.define(...codes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> Ezoic display");
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    try {
      setTimeout(() => {
        ezstandalone.define(...codes);
        ezstandalone.refresh();
      }, 1000);
      console.log("> Ezoic refresh");
    } catch (error) {
      // no-op
    }
  }
}
