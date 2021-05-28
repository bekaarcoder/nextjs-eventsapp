import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
const PER_PAGE = 2;

export default function EventsPage({ events, page, total }) {
    const lastPage = Math.ceil(total / PER_PAGE);
    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="mt-3">Events</h2>

                    {events.length === 0 && (
                        <p className="lead text-center mt-3">
                            No events available
                        </p>
                    )}

                    {events.map((item) => (
                        <EventItem key={item.id} event={item} />
                    ))}

                    <div className="d-flex justify-content-between">
                        {page > 1 && (
                            <Link href={`/events?page=${page - 1}`}>
                                <a className="btn btn-sm btn-dark">
                                    <FaArrowLeft /> Prev
                                </a>
                            </Link>
                        )}

                        {page < lastPage && (
                            <Link href={`/events?page=${page + 1}`}>
                                <a className="btn btn-sm btn-dark ms-auto">
                                    Next <FaArrowRight />
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

    const totalRes = await fetch(`${API_URL}/events/count`);
    const total = await totalRes.json();

    const res = await fetch(
        `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
    );
    const events = await res.json();

    return {
        props: { events, page: +page, total },
    };
}
