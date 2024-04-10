// App.tsx
import React from 'react';
import './App.css';
import MyLayout from './MyLayout'; // Corrected import

const App: React.FC = () => {
    return (
        <div className="App">
            <MyLayout/> {/* Use MyLayout instead of Layout */}

        </div>
    );
};

export default App;
