import { NavLink } from 'react-router-dom';

export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand ms-3" href="/">
                <img
                    src="/favicon.svg"   // public folder se directly
                    alt="Logo"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {/* &nbsp; MyApp */}
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"       // 🔹 "data-toggle" -> "data-bs-toggle"
                data-bs-target="#navbarSupportedContent"  // 🔹 "data-target" -> "data-bs-target"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto"> {/* 🔹 Bootstrap 5 uses "me-auto" instead of "mr-auto" */}
                    <li className="nav-item active">
                        <NavLink className="nav-link ps-3" to="/">
                            Home <span className="sr-only"></span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link ps-3" to="/AddProduct">
                            Add Product
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
