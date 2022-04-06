export interface GameAsset {
  id: number;
  name: string;
  description: string;
  type: "string";
  path: "string";
  date_created: Date;
  date_updated: Date;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  rules: string;
  type: string;
  date_created: Date;
  bank_id: number;
  gameAssets?: Array<GameAsset>;
}
