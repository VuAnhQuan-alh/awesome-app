export type IHeadCell<T> = {
  [key in keyof T]?: string;
} & {
  select?: string;
  id: string;
  [key: string]: any;
  actions?: string;
};
