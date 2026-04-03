export type WeightLevel = 1 | 2 | 3 | 4 | 5;

export interface Argument {
  id: string;
  text: string;
  weight: WeightLevel;
}

export interface Decision {
  id: string;
  title: string;
  pros: Argument[];
  cons: Argument[];
  createdAt: Date;
  updatedAt: Date;
}
