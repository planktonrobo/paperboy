import React from "react";
import { useForm } from "react-hook-form";
import { Form,  FormControl, Button, Card, Row, Col, Image, Container } from "react-bootstrap";
import { register as registera} from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom'

const RegisterForm = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch, control } = useForm({
    mode: "onBlur"
  });

  
  const handleRegistration = (data) => {
    
    
    dispatch(registera( data.name, data.password, data.email));
    
    
  
  }

  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    name: { required: "Username is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    },
    password2: { validate: (value) => value === watch('password') }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
}


  return (
  <Container className='pb-3 pt-lg-5'> 

    <Row className='h-100 align-items-center p-md-5'>
    
      <Col className='p-3'>
        <Row className='justify-content-center'><Image src="https://i.ibb.co/0cpTy0h/paperboy.png" className='px-3 px-lg-0' style={{width: '16rem'}}/> </Row><Row className='justify-content-center'><h1 >Daily Acts</h1> </Row><Row className='justify-content-center'><small>Browse thousands of sources • Create & share archives</small></Row></Col>
      <Col > <Row className=' justify-content-center '>
    <Card  className='p-md-3' style={{width: '25rem'}}>
      <Card.Body>
        <div className='row justify-content-center '><small>Already have an account? <Link to="/login">Sign In</Link></small></div>
        <hr/>
    <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
    <Form.Group>
        <Form.Label>Email</Form.Label>
        <FormControl
          type="email"
          name="email"
          ref={register(registerOptions.email)}
        />
        <small >
          {errors.email && errors.email.message}
        </small>
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <FormControl name="name" ref={register(registerOptions.name)} />
        <small >
          {errors.name && errors.name.message}
        </small>
      </Form.Group>
     
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <FormControl
          type="password"
          name="password"
          ref={register(registerOptions.password)}
        />
        <small >
          {errors.password && errors.password.message}
        </small>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Passwword</Form.Label>
        <FormControl
          type="password"
          name="password2"
          ref={register({validate: (value) => value === watch('password')|| "Passwords don't match."})}
        />
        <small >
          {errors.password2 && errors.password2.message}
        </small>
      </Form.Group>
      <div className='row  p-3'>
      <Button style={{width: '100%'}} type="submit" color="primary">Sign Up</Button></div>
    </Form>
    </Card.Body>
    </Card>
    </Row>
    </Col>
   
    </Row>
    </Container>
   
  
  );
};

export default RegisterForm;
