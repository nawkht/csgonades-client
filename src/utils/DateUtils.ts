import moment from "moment";

export function dateFromNow(date: Date | string) {
  return moment(date).fromNow();
}

export function prettyDate(date: Date | string) {
  return moment(date).format("MMM Do YYYY");
}
