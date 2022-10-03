export type ITask = {
  name: string;
  type: number;
  isDeleted: boolean;
  id: number;
};
export type ITaskItem = {
  taskId: number;
  name: string;
  billable: boolean;
  id?: number;
};

export type IStateTask = {
  listTask: ITask[];
  loading: boolean;
  error: string;
};
