export function prettyDate(date: Date | string) {
  const jsDate = typeof date === "string" ? new Date(date) : date;

  const month = months[jsDate.getMonth()];
  const dateNumber = jsDate.getDate();
  const year = jsDate.getFullYear();

  return `${month} ${dateNumber}. ${year}`;
}

export function prettyDateTime(date: Date | string) {
  const jsDate = typeof date === "string" ? new Date(date) : date;

  const month = months[jsDate.getMonth()];
  const dateNumber = jsDate.getDate();
  const year = jsDate.getFullYear();
  const hours = jsDate.getHours();
  let minutes: number | string = jsDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${month} ${dateNumber}. ${year} ${hours}:${minutes}`;
}

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export function dateMinutesAgo(date: Date | string) {
  const now = new Date();
  const jsDate = typeof date === "string" ? new Date(date) : date;
  const dif = now.getTime() - jsDate.getTime();

  const SecondsFromNowAndThen = dif / 1000;
  const secondsBetweenDates = Math.abs(SecondsFromNowAndThen);

  return secondsBetweenDates / 60;
}
