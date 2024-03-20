import { TTodo } from "@/types/todo";
import Todo from "./Todo";
import { motion, AnimatePresence } from "framer-motion";
import { listVar } from "../motion/listVar";

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
        <motion.ul>
          <AnimatePresence mode={"popLayout"}>
            {todoList.map((todo, index) => (
              <motion.li
                key={todo.id}
                variants={listVar(index).item}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Todo
                  todo={todo}
                  removeTodo={removeTodo}
                  changeTodoStatus={changeTodoStatus}
                  editTodo={editTodo}
                />
              </motion.li>
            ))}{" "}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p>No task.</p>
      )}
    </>
  );
}
