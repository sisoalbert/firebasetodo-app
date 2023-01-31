// Import this if your are using react-bootstrap library
import "bootstrap/dist/css/bootstrap.min.css";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
