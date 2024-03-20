import { TTodo } from "@/types/todo";
import Todo from "./Todo";

type TTodoListProps = {
  todoList: TTodo[];
  removeTodo: Function;
  editTodo: Function;
  changeTodoStatus: Function;
};

export default function TodoList({
  todoList,
  removeTodo,
  editTodo,
  changeTodoStatus,
}: TTodoListProps) {
  return (
    <>
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            changeTodoStatus={changeTodoStatus}
            editTodo={editTodo}
          />
        ))
      ) : (
        <p>No task.</p>
      )}
    </>
  );
}
