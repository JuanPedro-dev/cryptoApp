export interface Data {
  source: string;
  title: string;
  imageurl: string;
  url: string;
  body: string;
}

export interface News { 
  Data: Data[];
}
