import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getDatabase, ref, push } from "firebase/database";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";

const TodoForm = () => {
  const db = getDatabase(firebaseApp);

  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const todoRef = ref(db, "/todos");
    const todo = {
      title,
      done: false,
    };
    console.log("Sending todo:", todo);
    push(todoRef, todo)
      .then(() => {
        console.log("Todo successfully posted to the database.");
      })
      .catch((error) => {
        console.error("Error posting todo to the database:", error);
      });
  };

  return (
    <Form>
      <Form.Control
        placeholder="Add your to do todo list here"
        onChange={handleChange}
      />
      <Button
        style={{ width: "100%", marginTop: 20 }}
        type="submit"
        onClick={addTodo}
      >
        Submit
      </Button>
    </Form>
  );
};

export default TodoForm;
