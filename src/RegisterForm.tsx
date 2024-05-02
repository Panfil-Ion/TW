import React, { useState } from 'react';

const RegisterForm: React.FC<{ onRegister: (email: string, password: string) => void }> = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!email || !password) {
            setError('Please fill in both email and password.');
            return;
        }

        // Verificăm dacă utilizatorul există deja în localStorage
        const usersStr = localStorage.getItem('users');
        if (usersStr) {
            const users = JSON.parse(usersStr);
            const foundUser = users.find((user: any) => user.email === email);
            if (foundUser) {
                setError('This email is already registered.');
            } else {
                // Adăugăm noul utilizator în localStorage
                const newUser = { email, password };
                localStorage.setItem('users', JSON.stringify([...users, newUser]));
                onRegister(email, password);
            }
        } else {
            // Dacă nu există niciun utilizator înregistrat încă, creăm un nou array de utilizatori
            const newUser = { email, password };
            localStorage.setItem('users', JSON.stringify([newUser]));
            onRegister(email, password);
        }
    };

    return (
        <div className="register-form">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Register</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
        </div>
    );
};

export default RegisterForm;