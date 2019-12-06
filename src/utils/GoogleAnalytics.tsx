import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export class GoogleAnalytics {
  static event(category: string, action: string) {
    if (IS_BROWSER) {
      ReactGA.event({ category, action });
    }
  }

  static timing(category: string, variable: string, duration: number) {
    if (IS_BROWSER) {
      ReactGA.timing({ category, variable, value: duration });
    }
  }
}
