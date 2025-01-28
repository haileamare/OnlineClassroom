import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './auth/auth-helper';

const container = document.getElementById('root');
// Use hydrateRoot for client-side rendering to attach to the server-rendered markup
if (container.hasChildNodes()) {
    alert('hellow from hydrate')
    hydrateRoot(
        container,
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>

    )
}
else {
    alert('hellow from createroot')
    createRoot(container).render(
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>

    )
}
