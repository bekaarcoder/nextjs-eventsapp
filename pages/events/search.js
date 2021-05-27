import qs from "qs";
import { useRouter } from "next/router";
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function SearchPage({ events }) {
    const router = useRouter();
    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="mt-3">
                        Search Results for {router.query.term}
                    </h2>

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

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { description_contains: term },
                { venue_contains: term },
            ],
        },
    });
    const res = await fetch(`${API_URL}/events?${query}`);
    const events = await res.json();

    return {
        props: { events },
    };
}
