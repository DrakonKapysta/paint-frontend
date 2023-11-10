import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import "../../assets/global.css";
const Layout:FC = () => {
    return (
        <div>
            Header
            <Outlet/>
            Footer
        </div>
    );
};

export default Layout;