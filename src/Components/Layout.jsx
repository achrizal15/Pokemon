import Menu from "./Menu"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return (
        <div className="h-screen">
            {/* 
                Layout head and menu
            */}
            <Navbar />
            <Menu />
            <section className="container mx-auto px-4 pb-20 py-4">
                {children}
            </section>
        </div>
    )
}
export default Layout