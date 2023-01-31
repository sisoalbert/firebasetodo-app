// Import this if your are using react-bootstrap library
import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Link } from "wouter";
import { Button, FormCheck } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 0,
          paddingTop: 20,
        }}
      >
        <Link href="/login">
          <Button variant="outline-danger">Login</Button>
        </Link>
      </div>
      <div style={{ padding: 20 }}>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}
