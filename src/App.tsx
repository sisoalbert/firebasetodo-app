import { Link, Route } from "wouter";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => (
  <div>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
  </div>
);

export default App;
