const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";

export function ezoicInit(codes: number[]) {
  if (!codes.length) {
    return;
  }

  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("EzInit", codes);
      });

      ezstandalone.init();
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
