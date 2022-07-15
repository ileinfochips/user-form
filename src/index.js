import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/Index';

import './styles.less';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(    
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
