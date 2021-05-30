import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";

export default function EventPage({ event }) {
    return (
        <Layout>
            <div className="row mt-4 justify-content-center">
                <div className="col-md-10">
                    <h4 className="text-muted">
                        {new Date(event.date).toDateString("en-US")} at{" "}
                        {event.time}
                    </h4>
                    <h2 className="mb-3">{event.name}</h2>
                    <ToastContainer position="top-center" />
                    <img
                        src={
                            event.image
                                ? event.image.formats.medium.url
                                : "/images/default.jpg"
                        }
                        className="img-fluid"
                    />
                    <h3 className="mt-3">Performers:</h3>
                    <p>{event.performers}</p>
                    <h3>Description:</h3>
                    <p>{event.description}</p>
                    <h3>Venue:</h3>
                    <p>{event.venue}</p>
                    <Link href="/">
                        <a>{"<"} Go Back</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

/* export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();

    const paths = events.map((item) => ({
        params: { slug: item.slug },
    }));

    return {
        paths: paths,
        fallback: true,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const events = await res.json();

    return {
        props: {
            event: events[0],
        },
        revalidate: 1,
    };
} */

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const events = await res.json();

    return {
        props: {
            event: events[0],
        },
    };
}
