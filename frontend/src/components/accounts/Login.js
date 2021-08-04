

import { useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  Button,
  Card,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

import { Link, Redirect } from "react-router-dom";

const Login = () => {
  

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors,  } = useForm({
    mode: "onBlur",
  });

  const handleRegistration = (data) => { 
dispatch(login(data.username, data.password))
  
  
};
  

  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    username: { required: "Username is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
   
  };
  if (isAuthenticated) {
      return <Redirect to="/" />;
  }

  return (
    <Container className=" pt-lg-5 ">
    
      <Row className=" align-items-center p-md-5">
        <Col className="p-3">
          <Row className="justify-content-center">
            <Image
              src="https://i.ibb.co/0cpTy0h/paperboy.png"
              className="px-3 px-lg-0"
              style={{ width: "16rem" }}
            />{" "}
          </Row>
          <Row className="justify-content-center">
            <h1>Daily Acts</h1>{" "}
          </Row>
          <Row className="justify-content-center">
            <small>Browse thousands of sources • Create & share archives</small>
          </Row>
        </Col>
        <Col>
          {" "}
          <Row className=" justify-content-center ">
            <Card className="p-md-3" style={{ width: "24rem" }}>
              <Card.Body>
                <div className="row justify-content-center ">
                  <small>
                    Need an account? <Link to="/register">Sign Up</Link>
                  </small>
                </div>
                <hr />
                <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <FormControl
                      name="username"
                      ref={register(registerOptions.username)}
                    />
                    <small>{errors.username && errors.username.message}</small>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                      type="password"
                      name="password"
                      ref={register(registerOptions.password)}
                    />
                    <small>{errors.password && errors.password.message}</small>
                  </Form.Group>

                  <div className="row  p-3">
                    <Button
                      style={{ width: "100%" }}
                      type="submit"
                      color="primary"
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
