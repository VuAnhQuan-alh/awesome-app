export type ITasksType = {
  id: string;
  title: string;
  author: string;
  year: number;
  reviews: {
    positive: number;
    negative: number;
  };
  progress: unknown;
};

export enum TARGET {
  TASKS = "TASKS",
}
