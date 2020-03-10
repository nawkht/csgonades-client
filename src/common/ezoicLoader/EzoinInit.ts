const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";
export function ezoicInit(codes: number[]) {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.DEBUG = false;
      ezstandalone.init();
      ezstandalone.define(...codes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> Ez init");
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    setTimeout(() => {
      try {
        ezstandalone.define(...codes);
        ezstandalone.refresh();
        console.log("> Ez refresh");
      } catch (error) {
        // no-op
      }
    }, 1000);
  }
}
