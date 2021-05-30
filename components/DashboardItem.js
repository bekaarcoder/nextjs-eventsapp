import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export default function DashboardItem({ event, handleDelete }) {
    return (
        <div className="card my-3">
            <div className="card-body d-flex justify-content-between">
                <h5>
                    <Link href={`/events/${event.slug}`}>
                        <a className="nounderline text-dark">{event.name}</a>
                    </Link>
                </h5>
                <div>
                    <Link href={`/events/edit/${event.id}`}>
                        <a className="nounderline">
                            <FaPencilAlt /> Edit
                        </a>
                    </Link>
                    <a
                        href="#"
                        className="nounderline text-danger ms-3"
                        onClick={() => handleDelete(event.id)}
                    >
                        <FaTrashAlt /> Delete
                    </a>
                </div>
            </div>
        </div>
    );
}
