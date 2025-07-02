import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout