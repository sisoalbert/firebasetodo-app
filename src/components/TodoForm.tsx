import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";

const TodoForm = () => {
  const db = getDatabase(firebaseApp);
  const [title, setTitle] = useState("");
  //user
  // const [userId, setUserId] = useState("3qUHXU3h2EZimCt5HFPqM1xSg2o1");
  const [userId, setUserId] = useState("OTYSBj0P1megjc1pR0ruGeI2U583");

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        setUserId(user.uid);
        console.log("UID:", user.uid);
        console.log("Email:", user.email);
      } else {
        // User is signed out
        setUserId("");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //If not authenticated go with this code:
  // const addTodo = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const todoRef = ref(db, "/todos");
  //   const todo = {
  //     title,
  //     done: false,
  //   };
  //   console.log("Sending todo:", todo);
  //   push(todoRef, todo)
  //     .then(() => {
  //       console.log("Todo successfully posted to the database.");
  //     })
  //     .catch((error) => {
  //       console.error("Error posting todo to the database:", error);
  //     });
  // };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error("Error: Not authenticated.");
      return;
    }
    const todoRef = ref(db, `/users/${userId}/todos`);
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
