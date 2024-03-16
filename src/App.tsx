// App.tsx
import React from 'react';
import './App.css';
import MyLayout from './MyLayout'; // Corrected import

const App: React.FC = () => {
    return (
        <div className="App">
            <MyLayout/> {/* Use MyLayout instead of Layout */}
            <header className="App-header">
                <h1>Bun venit la Grupa Noastră</h1>
                <p>Numele meu este [Panfil] [Ion].</p>
                <p>Sunt în grupa [CR-221].</p>
            </header>
        </div>
    );
};

export default App;
