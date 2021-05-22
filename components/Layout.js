import Head from "next/head";

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <div className="container">{children}</div>
        </div>
    );
}

Layout.defaultProps = {
    title: "Rock Events | Find the best rock concerts and musical events",
    description: "Find the best rock concerts and musical events around you",
    keywords: "music, events, rock, concerts",
};
