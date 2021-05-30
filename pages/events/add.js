import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";

export default function AddEventPage({ token }) {
    const [values, setValues] = useState({
        name: "",
        performers: "",
        venue: "",
        address: "",
        description: "",
        date: "",
        time: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasEmptyFields = Object.values(values).some(
            (element) => element === ""
        );

        if (hasEmptyFields) {
            toast.error("Please fill all the fields.");
            return false;
        }

        const res = await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error("Not Authorized");
                return;
            }
            toast.error("Something Went Wrong!");
        } else {
            const data = await res.json();
            router.push(`/events/${data.slug}`);
        }
    };

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <Layout title="Add New Event">
            <div className="row justify-content-center mt-4">
                <div className="col-md-10">
                    <h2>Add Event</h2>
                    <ToastContainer position="top-center" />
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-3">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={values.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Performers</label>
                                <input
                                    type="text"
                                    name="performers"
                                    className="form-control"
                                    value={values.performers}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    className="form-control"
                                    value={values.venue}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={values.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
                                    value={values.date}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    className="form-control"
                                    value={values.time}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="form-label">
                                    Event Description
                                </label>
                                <textarea
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    value={values.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    className="btn btn-danger"
                                    type="submit"
                                >
                                    Add Event
                                </button>
                                <Link href="/">
                                    <a className="btn btn-primary ms-3">
                                        Go Back
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    return {
        props: { token },
    };
}
