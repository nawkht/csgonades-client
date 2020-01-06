import { FlagNameValues } from "semantic-ui-react";

export type TournamentCreateDTO = {
  name: string;
  iconUrl: string;
  startDate: Date;
  endDate: Date;
  city: string;
  country: string;
  twitchUrl?: string;
  eventUrl?: string;
};

export type Tournament = {
  id: string;
  name: string;
  iconUrl: string;
  startDate: Date;
  endDate: Date;
  city: string;
  country: FlagNameValues;
  twitchUrl?: string;
  eventUrl?: string;
};
