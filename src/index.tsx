import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PaintPage from "./components/pages/PaintPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/:id',
                element:<PaintPage/>
            },
            {
                path:'/',
                element:<Navigate to={`f${(+new Date()).toString(16)}`} replace />
            }
        ]
    },
])
root.render(
        <RouterProvider router={router}/>
);
