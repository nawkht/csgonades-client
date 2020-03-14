const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.define(...codes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> Ezoic display", codes);
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    try {
      ezstandalone.define(...codes);
      ezstandalone.refresh();
      console.log("> Ezoic refresh", codes);
    } catch (error) {
      // no-op
    }
  }
}
