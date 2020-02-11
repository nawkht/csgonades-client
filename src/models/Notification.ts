type AcceptedNadeNotification = {
  id: string;
  type: "accepted-nade";
  nadeId: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type DeclinedNadeNotification = {
  id: string;
  type: "declined-nade";
  nadeId: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type FavoriteNotification = {
  id: string;
  type: "favorite";
  nadeId: string;
  favoritedBy: string[];
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
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

export type Notification =
  | AcceptedNadeNotification
  | DeclinedNadeNotification
  | FavoriteNotification
  | NewContactNotification
  | NewNadeNotification;
