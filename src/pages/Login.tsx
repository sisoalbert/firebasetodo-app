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
        console.log(user.toJSON());

        console.log("user", user.email);
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

// {
//   "uid": "3qUHXU3h2EZimCt5HFPqM1xSg2o1",
//   "email": "s@t.com",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "providerData": [
//       {
//           "providerId": "password",
//           "uid": "s@t.com",
//           "displayName": null,
//           "email": "s@t.com",
//           "phoneNumber": null,
//           "photoURL": null
//       }
//   ],
//   "stsTokenManager": {
//       "refreshToken": "APJWN8ev8Vnmj3WGPeUtA8cBeOS16i1CnkN5ELi7InpGND8VLz8lvTXD-th8C8hHa-ta1DWi6vhrcw_nJdmSptpPZSxlb7LUFKceINBAnNeMfB3qe5lq3g2TyrncZKw3kY20epxVli7zc3WKqndlqQTvRQZZ1Q6mHjoZNAnT1Y0SYVBqMwtHbh_D6YRIMCxTr9wwgn2ILFqG",
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNWI0MDljNmYyMmM0MDNlMWY5MWY5ODY3YWM0OTJhOTA2MTk1NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG9kb2ZpcmViYXNlc3VwIiwiYXVkIjoidG9kb2ZpcmViYXNlc3VwIiwiYXV0aF90aW1lIjoxNjc1MTk3NjQ2LCJ1c2VyX2lkIjoiM3FVSFhVM2gyRVppbUN0NUhGUHFNMXhTZzJvMSIsInN1YiI6IjNxVUhYVTNoMkVaaW1DdDVIRlBxTTF4U2cybzEiLCJpYXQiOjE2NzUxOTc2NDYsImV4cCI6MTY3NTIwMTI0NiwiZW1haWwiOiJzQHQuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNAdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.bRIxVFpKoe_CBYCkcE23jnE4-ivuHWvc1Dy4VAvms5PNwlQIyH9Rpj17KfMtw_KpYXFtC6fI55YU_orcw0oZ2Kn3XWtEpfZ_GYV2M0vPeys3ElqjDWCW8ZcfLAwRC9-TuoXhHaUm5hZ22ZVqJJ9gjsmoWXIej2TBJ-ZvCg7x2y7uuI3bwTGhK5EQB8Y_PfXXzapsa5BVSbaIQIj7EfwQUlky2R-QDHkaaQEBIjRmn-HYnLrnMFS8jbW-FsitRr1laB49fTA7q_LGUwnGXsvkWhI6h5i6NSQWEiSy4KYMTg7xmWWYDsO3IqoX7jnBJMwXEEsuhqW6AKBthzcYEIV-WA",
//       "expirationTime": 1675201246444
//   },
//   "createdAt": "1675196403580",
//   "lastLoginAt": "1675197646600",
//   "apiKey": "AIzaSyAwJp7h8R7JWcpwbJGjntm8IM2KVFguEOI",
//   "appName": "[DEFAULT]"
// }
