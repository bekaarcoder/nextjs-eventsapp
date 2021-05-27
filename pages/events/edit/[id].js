import moment from "moment";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { API_URL } from "@/config/index";

export default function EditEventPage({ event }) {
    const [values, setValues] = useState({
        name: event.name,
        performers: event.performers,
        venue: event.venue,
        address: event.address,
        description: event.description,
        date: event.date,
        time: event.time,
    });
    const [imagePreview, setImagePreview] = useState(
        event.image ? event.image.formats.thumbnail.url : null
    );
    const [showModal, setShowModal] = useState(false);

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

        const res = await fetch(`${API_URL}/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
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
                    <h2>Edit Event</h2>
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
                                    value={moment(values.date).format(
                                        "yyyy-MM-DD"
                                    )}
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
                                    Edit Event
                                </button>
                                <Link href="/">
                                    <a className="btn btn-primary ms-3">
                                        Go Back
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </form>

                    <h3 className="my-3">Event Image</h3>
                    {imagePreview ? (
                        <img src={imagePreview} />
                    ) : (
                        <div>
                            <p>No image uploaded</p>
                        </div>
                    )}
                    <div className="mt-3">
                        <button
                            className="btn btn-dark"
                            onClick={() => setShowModal(true)}
                        >
                            <FaImage /> Set Image
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Image Upload"
            >
                Image Upload
            </Modal>
        </Layout>
    );
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${API_URL}/events/${id}`);
    const event = await res.json();

    return {
        props: {
            event: event,
        },
    };
}
