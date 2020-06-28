/**
 * task
 */

export interface ITask {
  complete: boolean;
  dedline: Date;
  id: string;
  taskName: string;
}

/**
 * task list
 */
export interface ITaskList {
  tasks: ITask[];
}
