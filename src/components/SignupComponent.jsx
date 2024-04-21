import React, {useState} from "react";
import {post} from "../clients/HttpClient";
import {Alert} from "reactstrap";

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

    const formFormat = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        width: '100%',
        alignContent: 'center',
        marginLeft: '1px',
        marginTop: '110px'
    }
    const formStyle = {width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}
    const btnStyle = {
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        width: '100%'
    }
    const formElements = {width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px'}

    return (<div style={formFormat}>
            <form style={formElements} onSubmit={handleSignUp}>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(element) => setFirstName(element.target.value)}
                        style={formStyle}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(element) => setLastName(element.target.value)}
                        style={formStyle}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(element) => setEmail(element.target.value)}
                        style={formStyle}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(element) => setPassword(element.target.value)}
                        style={formStyle}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(element) => setRole(element.target.value)}
                        style={formStyle}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="MERCHANT">Merchant</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" style={btnStyle}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpComponent;