import { useContext } from "react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Rock Events
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse d-inline"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/events">
                                <a className="nav-link">Events</a>
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link href="/events/add">
                                        <a className="nav-link">Add Event</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/account/dashboard">
                                        <a className="nav-link">Dashboard</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className="nav-link"
                                        onClick={() => logout()}
                                    >
                                        <FaSignOutAlt /> Logout
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link href="/account/login">
                                        <a className="nav-link">
                                            <FaSignInAlt /> Login
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Search />
            </div>
        </nav>
    );
}
