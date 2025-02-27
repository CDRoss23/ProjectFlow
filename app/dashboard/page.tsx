import React from 'react';
import Navbar from '../componentes/navbar';

function dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
            <Navbar />
            <h1>Dashboard Page</h1>
        </div>
    );
}

export default dashboard;