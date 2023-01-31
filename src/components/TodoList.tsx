import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { Button, FormCheck } from "react-bootstrap";

import firebaseApp from "../firebase";
import { Todo } from "../types";

const TodoList = () => {
  const db = getDatabase(firebaseApp);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const todoRef = ref(db, "/todos");

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: Todo[] = [];

      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      }

      setTodoList(newTodoList);
    });
  }, [db]);

  const changeTodoCompletion = (todo: Todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { done: !todo.done });
  };

  const deleteTodo = (todo: Todo) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    remove(todoRef);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h1>Todo List</h1>
      {todoList.map((todo, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FormCheck
              key={index}
              checked={todo.done}
              onChange={() => changeTodoCompletion(todo)}
              label={todo.title}
            />
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
