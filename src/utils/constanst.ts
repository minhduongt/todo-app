export const TODO_APP_STORAGE_KEY = "TODO_APP";

export enum TodoStatusEnum {
  INITIAL = 1,
  INCOMPLETE = 2,
  INPROGRESS = 3,
  COMPLETED = 4,
}

export const TodoStatusEnums = [
  TodoStatusEnum.INITIAL,
  TodoStatusEnum.INCOMPLETE,
  TodoStatusEnum.INPROGRESS,
  TodoStatusEnum.COMPLETED,
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

export function getTodoStatusColor(status: number) {
  switch (status) {
    case TodoStatusEnum.INITIAL:
      return "white";
    case TodoStatusEnum.INCOMPLETE:
      return "aqua";
    case TodoStatusEnum.INPROGRESS:
      return "yellow";
    case TodoStatusEnum.COMPLETED:
      return "lightgreen";
    default:
      return "Unknown";
  }
}
