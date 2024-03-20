import { TTodo } from "@/types/todo";
import {
  TodoStatusEnum,
  getTodoStatusColor,
  getTodoStatusName,
} from "@/utils/constanst";
import styles from "./styles.module.scss";
import { IconButton } from "../button/IconButton";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";
import { useState } from "react";

type TTodoProps = {
  todo: TTodo;
  changeTodoStatus: Function;
  removeTodo: Function;
  editTodo: Function;
};

export default function Todo({
  todo,
  changeTodoStatus,
  removeTodo,
  editTodo,
}: TTodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.task);

  function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleChangeStatus(status: number) {
    changeTodoStatus(todo.id, status);
  }

  function handleRemoveClick() {
    removeTodo(todo.id);
  }

  function handleEditTask() {
    editTodo(todo.id, text);
    setIsEditing(false);
  }

  function getChangeStatusButtons(status: number) {
    switch (status) {
      case TodoStatusEnum.INCOMPLETE:
        return (
          <button
            style={{ color: getTodoStatusColor(TodoStatusEnum.INPROGRESS) }}
            onClick={() => handleChangeStatus(TodoStatusEnum.INPROGRESS)}
          >
            {`Mark as ${getTodoStatusName(TodoStatusEnum.INPROGRESS)}`}
          </button>
        );
      case TodoStatusEnum.INPROGRESS:
        return (
          <>
            <button
              style={{ color: getTodoStatusColor(TodoStatusEnum.INCOMPLETE) }}
              onClick={() => handleChangeStatus(TodoStatusEnum.INCOMPLETE)}
            >
              {`Mark as ${getTodoStatusName(TodoStatusEnum.INCOMPLETE)}`}
            </button>
            <button
              style={{ color: getTodoStatusColor(TodoStatusEnum.COMPLETED) }}
              onClick={() => handleChangeStatus(TodoStatusEnum.COMPLETED)}
            >
              {`Mark as ${getTodoStatusName(TodoStatusEnum.COMPLETED)}`}
            </button>
          </>
        );
      case TodoStatusEnum.COMPLETED:
        return (
          <button
            style={{ color: getTodoStatusColor(TodoStatusEnum.INPROGRESS) }}
            onClick={() => handleChangeStatus(TodoStatusEnum.INPROGRESS)}
          >
            {`Mark as ${getTodoStatusName(TodoStatusEnum.INPROGRESS)}`}
          </button>
        );
    }
  }
  return (
    <div
      className={
        todo.status === TodoStatusEnum.COMPLETED
          ? styles["completed-todo"]
          : styles["todo"]
      }
    >
      <div className={styles["todo-task"]}>
        {isEditing ? (
          <input value={text} onChange={onChangeText} />
        ) : (
          <p>{todo.task}</p>
        )}
        {isEditing ? (
          <IconButton
            onClick={handleEditTask}
            icon={<MdDownloadDone size={"1.5rem"} />}
          ></IconButton>
        ) : (
          <IconButton
            onClick={() => setIsEditing(true)}
            icon={<MdOutlineModeEdit size={"1.5rem"} />}
          ></IconButton>
        )}
      </div>

      <p style={{ color: getTodoStatusColor(todo.status) }}>
        {getTodoStatusName(todo.status)}
      </p>
      <div className={styles["stack-center-wrapper"]}>
        {todo.status === TodoStatusEnum.INITIAL ? (
          <button onClick={() => handleChangeStatus(TodoStatusEnum.INCOMPLETE)}>
            Start
          </button>
        ) : (
          <>{getChangeStatusButtons(todo.status)}</>
        )}
      </div>
      <IconButton
        onClick={() => handleRemoveClick()}
        icon={<TiDeleteOutline size={"1.5rem"} color="red" />}
      ></IconButton>
    </div>
  );
}
