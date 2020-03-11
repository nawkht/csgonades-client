const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.define(...codes);
      ezstandalone.enable();
      ezstandalone.display();
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    try {
      ezstandalone.define(...codes);
      ezstandalone.refresh();
    } catch (error) {
      // no-op
    }
  }
}
