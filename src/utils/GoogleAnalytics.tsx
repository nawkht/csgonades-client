import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";
const IS_PROD = process.env.NODE_ENV === "production";

export class GoogleAnalytics {
  static event(category: string, action: string) {
    if (IS_BROWSER) {
      try {
        this.init();
        ReactGA.event({ category, action });
      } catch (error) {
        // no-op
      }
    }
  }

  static timing(category: string, variable: string, duration: number) {
    if (IS_BROWSER) {
      try {
        this.init();
        ReactGA.timing({ category, variable, value: duration });
      } catch (error) {
        // no-op
      }
    }
  }

  static async pageView(page: string) {
    try {
      this.init();
      ReactGA.pageview(page);
    } catch (error) {
      // no-op
    }
  }

  private static init() {
    if (IS_BROWSER && !window.GA_INITIALIZED) {
      ReactGA.initialize("UA-71896446-6", {
        testMode: IS_PROD ? false : true,
        debug: IS_PROD ? false : false
      });
      window.GA_INITIALIZED = true;
    }
  }
}
