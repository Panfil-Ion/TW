import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Adaugă importul pentru ReactDOM
import './App.css';
import MyLayout from './MyLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');

    useEffect(() => {
        const loggedInUserStr = localStorage.getItem('loggedInUser');
        if (loggedInUserStr) {
            const loggedInUser = JSON.parse(loggedInUserStr);
            setUsername(loggedInUser.username);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (username: string, password: string) => {
        if (!username || !password) {
            setLoginError('Please fill in both username and password.');
            return;
        }

        const usersStr = localStorage.getItem('users');
        if (usersStr) {
            const users = JSON.parse(usersStr);
            const foundUser = users.find((user: any) => user.email === username && user.password === password); // Modificăm 'username' în 'email' pentru a fi consecvenți
            if (foundUser) {
                setIsLoggedIn(true);
                setUsername(username);
                localStorage.setItem('loggedInUser', JSON.stringify({ username, password }));
            } else {
                setLoginError('Invalid username or password.');
            }
        } else {
            setLoginError('No registered users found.');
        }
    };


    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('loggedInUser');
    };

    const handleRegister = (email: string, password: string) => {
        const usersStr = localStorage.getItem('users');
        let users = usersStr ? JSON.parse(usersStr) : [];
        users.push({ email, password }); // Modificăm 'username' în 'email' pentru a fi consecvenți
        localStorage.setItem('users', JSON.stringify(users));

        setIsLoggedIn(true);
        setUsername(email);
        localStorage.setItem('loggedInUser', JSON.stringify({ username: email, password }));
    };


    return (
        <div className="App">
            <div className="centered-form">
                {isLoggedIn ? (
                    <>
                        <MyLayout handleLogout={handleLogout} />
                    </>
                ) : (
                    <>
                        {showRegisterForm ? (
                            <>
                                <RegisterForm onRegister={handleRegister} />
                                <button onClick={() => setShowRegisterForm(false)}>Back to Login</button>
                            </>
                        ) : (
                            <>
                                <LoginForm onLogin={handleLogin} />
                                <button onClick={() => setShowRegisterForm(true)}>Register</button>
                                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

export default App;
