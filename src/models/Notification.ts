type AcceptedNadeNotification = {
  id: string;
  type: "accepted-nade";
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type DeclinedNadeNotification = {
  id: string;
  type: "declined-nade";
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

export type FavoriteNotification = {
  id: string;
  type: "favorite";
  nadeId: string;
  nadeSlug?: string;
  bySteamId: string;
  byNickname: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type NewContactNotification = {
  id: string;
  type: "contact-msg";
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type NewNadeNotification = {
  id: string;
  type: "new-nade";
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

export type FavoriteNotificationAgregate = {
  id: string;
  type: "favorite-agregate";
  nadeId: string;
  nadeSlug?: string;
  byNickname: string;
  count: number;
  viewed: boolean;
  createdAt: Date;
};

export type Notification =
  | AcceptedNadeNotification
  | DeclinedNadeNotification
  | FavoriteNotification
  | FavoriteNotificationAgregate
  | NewContactNotification
  | NewNadeNotification;
