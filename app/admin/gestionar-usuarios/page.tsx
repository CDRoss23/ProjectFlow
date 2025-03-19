import React from 'react';
import Sliderbar from '../../componentes/sliderbar';

function Gestor() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center px-6">
            <Sliderbar />
            
            <h1 className="text-4xl font-bold mt-8 mb-6">Gestor de usuarios</h1>


        </div>
    );
}
export default Gestor;