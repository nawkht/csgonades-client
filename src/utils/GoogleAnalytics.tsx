import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export class GoogleAnalytics {
  static setUserId(userId: string) {
    if (IS_BROWSER) {
      try {
        ReactGA.ga("set", "userId", userId);
      } catch (error) {
        // no-op
      }
    }
  }

  static event(category: string, action: string) {
    if (IS_BROWSER) {
      try {
        ReactGA.event({ category, action });
      } catch (error) {
        // no-op
      }
    }
  }

  static timing(category: string, variable: string, duration: number) {
    if (IS_BROWSER) {
      try {
        ReactGA.timing({ category, variable, value: duration });
      } catch (error) {
        // no-op
      }
    }
  }
}
