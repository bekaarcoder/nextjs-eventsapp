import { FaUser } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { register, error } = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password do not match.");
            return;
        }

        register({ username, email, password });
    };

    return (
        <Layout title="Register">
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <h3>Register Here</h3>
                    <ToastContainer position="top-center" />
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="my-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
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
                        <div className="mb-3">
                            <label className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">
                            Register
                        </button>
                        <p className="mt-3">
                            Already a user?{" "}
                            <Link href="/account/login">
                                <a>Login here</a>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
