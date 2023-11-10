import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import '../../styles/global.scss'
const Layout:FC = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default Layout;