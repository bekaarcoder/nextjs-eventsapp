import Link from "next/link";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function Home({ events }) {
    console.log(events);
    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="mt-3">Upcoming Events</h2>

                    {events.length === 0 && (
                        <p className="lead text-center mt-3">
                            No events available
                        </p>
                    )}

                    {events.map((item) => (
                        <EventItem key={item.id} event={item} />
                    ))}

                    {events.length > 0 && (
                        <div className="text-center">
                            <Link href="/events">
                                <a className="btn btn-sm btn-outline-danger">
                                    View All Events
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    return {
        props: { events: events.slice(0, 4), revalidate: 1 },
    };
}
