import React, { useState } from "react";

const SignUpComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        console.log('Form submitted:', { firstName, lastName, email, password, role });

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRole('');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} onSubmit={handleSignUp}>
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(element) => setFirstName(element.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(element) => setLastName(element.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(element) => setEmail(element.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(element) => setPassword(element.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(element) => setRole(element.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="MERCHANT">Merchant</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', width: '100%' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpComponent;
