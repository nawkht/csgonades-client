const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("EzInit", codes);
      });
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    try {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.refresh();
        console.log("EzRefresh", codes);
      });
    } catch (error) {
      // no-op
    }
  }
}
