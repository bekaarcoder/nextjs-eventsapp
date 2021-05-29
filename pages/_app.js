import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default MyApp;
