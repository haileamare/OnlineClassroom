import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

const container = document.getElementById('root');
// Use hydrateRoot for client-side rendering to attach to the server-rendered markup
if(container.hasChildNodes()){
    alert('hellow from hydrate')
    hydrateRoot(
        container,
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    )
}
else{
    alert('hellow from createroot')
    createRoot(container).render(
        <BrowserRouter>
        <App/>
        </BrowserRouter>
    )
}
