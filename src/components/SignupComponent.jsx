import React, {useState} from "react";
import {post} from "../clients/HttpClient";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from 'react-router-dom';

const SignUpComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("CUSTOMER");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

       console.log('Form submitted:', { firstName, lastName, email, password, role });

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role
        }
        if (!email || !password || !role) {
            setErrorMessage('At least Email, Password and Role is required for User signup');
            return;
        }
        setErrorMessage('');

        const apiUrl = 'http://localhost:8080/user/signup'
        post(apiUrl, userData, onSuccess, onError)

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRole("CUSTOMER")
    };

    const onSuccess = (response) => {
        console.log('Sign up successful:', response.data);
    };

    const onError = (error) => {
        console.error('Sign up error:', error);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form style={{ width: "250px" }} onSubmit={handleSignUp}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <h2 className="text-center">Sign Up</h2>
                <FormGroup>
                    <Label htmlFor="firstName">First Name:</Label>
                    <Input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name:</Label>
                    <Input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="role">Role:</Label>
                    <Input
                        type="select"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="MERCHANT">Merchant</option>
                        <option value="ADMIN">Admin</option>
                    </Input>
                </FormGroup>
                <Button color="primary" type="submit" block>Sign Up</Button>
                <p>Already have an account? <Link to="/login">Login</Link></p>

            </Form>
        </div>
    );
};

export default SignUpComponent;