import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<div>Hello from children</div>
            }
        ]
    },
])
root.render(
    <RouterProvider router={router}/>
);
