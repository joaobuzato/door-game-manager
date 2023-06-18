export type Room = {
  id: string;
  title: string;
  text: string;
  path: string;
  doors?: Door[];
  actions?: Action[];
  expandedTexts?: ExpandedText[];
};

export type ExpandedText = {
  id: number;
  sentence: string;
  text: string;
};

export type Door = {
  id: number;
  path: string;
  text: string;
  color?: string;
};

export type Action = {
  id: number;
  type: string;
  element: string;
  buttonText: string;
  param: number;
  text: string;
  conditions: Condition[];
};
export type Condition = {
  type: string;
  element1: string | number;
  element2: string | number;
};

export type Item = {
  //id:number,
  name: string;
  param: number;
};
