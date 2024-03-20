export const TODO_APP_STORAGE_KEY = "TODO_APP";

export enum TodoStatusEnum {
  INITIAL = 0,
  INCOMPLETE = 1,
  INPROGRESS = 2,
  COMPLETED = 3,
}

export const TodoStatusEnums = [
  TodoStatusEnum.INITIAL,
  TodoStatusEnum.COMPLETED,
  TodoStatusEnum.INCOMPLETE,
  TodoStatusEnum.INPROGRESS,
];

export function getTodoStatusName(status: number) {
  switch (status) {
    case TodoStatusEnum.INITIAL:
      return "Initial";
    case TodoStatusEnum.INCOMPLETE:
      return "InCompleted";
    case TodoStatusEnum.INPROGRESS:
      return "In Progress";
    case TodoStatusEnum.COMPLETED:
      return "Completed";
    default:
      return "Unknown";
  }
}
