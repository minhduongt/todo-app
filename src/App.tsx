import { useCallback, useState } from "react";
import "./App.css";
import styles from "./components/styles.module.scss";
import { useEffect } from "react";
import { TTodo } from "./types/todo";
import TodoList from "./components/todo/TodoList";
import {
  TODO_APP_STORAGE_KEY,
  TodoStatusEnum,
  TodoStatusEnums,
  getTodoStatusName,
} from "./utils/constanst";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [storedTodoList, setStoredTodoList] =
    useLocalStorage<TTodo[]>(TODO_APP_STORAGE_KEY);
  const [textInput, setTextInput] = useState("");
  const [todoList, setTodoList] = useState<TTodo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<TTodo[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<number | null>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const onSubmit = useCallback(() => {
    const newTodoList = [
      {
        id: new Date().valueOf().toString(),
        task: textInput,
        status: TodoStatusEnum.INITIAL,
      },
      ...todoList,
    ];
    setTodoList(newTodoList);
    setStoredTodoList(newTodoList);
    setTextInput("");
  }, [textInput, todoList]);

  function changeTodoStatus(id: string, status: number) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: status,
        };
      }
      return todo;
    });
    setTodoList(newTodoList);
    setStoredTodoList(newTodoList);
  }

  function onChangeFilteredStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value;

    if (status !== "NaN") {
      setFilteredStatus(Number.parseInt(status));
    } else {
      setFilteredStatus(null);
    }
  }

  function getCompletedTodo(todoList: TTodo[]) {
    const completedTodos = todoList.filter(
      (todo) => todo.status === TodoStatusEnum.COMPLETED
    );
    return completedTodos;
  }

  function removeTodo(id: string) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    setStoredTodoList(newTodoList);
  }

  function removeAllTodoByStatus(status?: number) {
    if (status) {
      const newTodoList = todoList.filter((todo) => todo.status !== status);
      setTodoList(newTodoList);
      setStoredTodoList(newTodoList);
    } else {
      setTodoList([]);
      setStoredTodoList([]);
    }
  }

  function editTodo(id: string, newTask: string) {
    const newTodoList = [...todoList];
    const editedIndex = todoList.findIndex((todo) => todo.id === id);
    if (editedIndex > -1) {
      newTodoList[editedIndex] = {
        ...newTodoList[editedIndex],
        task: newTask,
      };
      setTodoList(newTodoList);
      setStoredTodoList(newTodoList);
    }
  }
  useEffect(() => {
    if (filteredStatus !== null) {
      const foundStatus = TodoStatusEnums.find(
        (status) => status === filteredStatus
      );
      const newFilteredList = todoList.filter(
        (todo) => todo.status === foundStatus
      );
      setFilteredTodoList(newFilteredList);
    }
  }, [filteredStatus]);

  useEffect(() => {
    if (storedTodoList && storedTodoList.length > 0 && todoList.length === 0) {
      setTodoList(storedTodoList);
    }
  }, [storedTodoList]);

  return (
    <div className={styles["app"]}>
      <div className={styles["stack-wrapper"]}>
        <h1>Todo List</h1>
        <input
          placeholder="Add something to do..."
          value={textInput}
          onChange={(e) => onChangeInput(e)}
        />
        <button onClick={onSubmit} disabled={!textInput}>
          Add
        </button>

        <div className={styles["flex-center-wrapper"]}>
          <p>Filter by:</p>
          <select onChange={(e) => onChangeFilteredStatus(e)}>
            <option>All</option>
            {TodoStatusEnums.map((status, index) => (
              <option value={status} key={index}>
                {getTodoStatusName(status)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["flex-between-wrapper"]}>
          <p>{`Current task(s): ${
            filteredStatus ? filteredTodoList.length : todoList.length
          }`}</p>
          <button
            style={{ color: "red" }}
            onClick={() => removeAllTodoByStatus(TodoStatusEnum.COMPLETED)}
            disabled={
              todoList.length > 0 ? getCompletedTodo(todoList).length < 1 : true
            }
          >
            Remove all completed
          </button>
          <button
            style={{ color: "red" }}
            onClick={() => removeAllTodoByStatus()}
            disabled={todoList.length < 1}
          >
            Clear list
          </button>
        </div>

        <div className={styles["todo-list"]}>
          <TodoList
            todoList={filteredStatus ? filteredTodoList : todoList}
            removeTodo={removeTodo}
            changeTodoStatus={changeTodoStatus}
            editTodo={editTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
