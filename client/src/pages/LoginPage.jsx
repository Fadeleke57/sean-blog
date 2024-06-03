import React, { useState, useContext} from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from  '../UserContext.jsx'
import './PostPage.css'

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const context = useContext(UserContext);
    if (!context) {
        throw new Error("LoginPage must be used within a UserProvider");
    }
    const { setUserInfo } = context;

    async function login(e) {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.ok) {
            const userInfo = await response.json();
            setUserInfo(userInfo);
            setRedirect(true);
        } else {
            alert('WRONG CREDENTIALS');
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-wrapper">
        <form className="login" onSubmit={login}>
            <h1>Admin Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
        </div>

    );
}