import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
                    crossorigin="anonymous"
                ></script>
            </Head>
            <Header />
            {router.pathname === "/" && <Showcase />}
            <div className="container">{children}</div>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "Rock Events | Find the best rock concerts and musical events",
    description: "Find the best rock concerts and musical events around you",
    keywords: "music, events, rock, concerts",
};
