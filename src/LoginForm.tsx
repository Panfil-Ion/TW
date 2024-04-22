import React, { useState } from 'react';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!username || !password) {
            setError('Please fill in both username and password.');
            return;
        }

        // Trimite datele de autentificare către funcția onLogin
        onLogin(username, password);
    };

    return (
        <div className="login-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Login</h2> {/* Titlul "Login" */}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleSubmit}>Login</button> {/* Butonul "Login" */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;