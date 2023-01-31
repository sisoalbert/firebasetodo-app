import React from "react";
import { Link, useLocation } from "wouter";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorCode, setErrorCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [location, setLocation] = useLocation();

  const auth = getAuth();

  const Login = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("====================================");
        console.log("user", user);
        console.log("====================================");
        setLocation("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorCode(errorCode);
        setErrorMessage(errorMessage);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
      }}
    >
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 0,
          paddingTop: 20,
        }}
      >
        <Link href="/">
          <Button variant="outline-danger">Home</Button>
        </Link>
      </div>

      <Card style={{ width: "90%", padding: 20 }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </Form.Group>
          {errorCode && (
            <Alert key={"danger"} variant={"danger"}>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              {errorMessage}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={Login}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
