import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
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
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    return {
        props: { events },
    };
}
