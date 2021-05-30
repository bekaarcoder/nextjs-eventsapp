import { useRouter } from "next/router";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import DashboardItem from "@/components/DashboardItem";

export default function DashboardPage({ events, token }) {
    const router = useRouter();

    const deleteEvent = async (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            const res = await fetch(`${API_URL}/events/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            } else {
                router.reload();
            }
        }
    };

    return (
        <Layout title="User Dashboard">
            <div className="row justify-content-center mt-4">
                <div className="col-md-10">
                    <h3>Dashboard</h3>
                    <h4 className="mt-4 text-danger">My Events</h4>
                    {events &&
                        events.map((item) => (
                            <DashboardItem
                                key={item.id}
                                event={item}
                                handleDelete={deleteEvent}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    const res = await fetch(`${API_URL}/events/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const events = await res.json();

    return {
        props: { events, token },
    };
}
