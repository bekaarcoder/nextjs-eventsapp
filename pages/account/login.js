import { FaUser } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error } = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <Layout title="Login">
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <h3>Login Here</h3>
                    <ToastContainer position="top-center" />
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">
                            Login
                        </button>
                        <p className="mt-3">
                            New user?{" "}
                            <Link href="/account/register">
                                <a>Register here</a>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
