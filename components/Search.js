import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
    const [term, setTerm] = useState("");

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`);
        setTerm("");
    };

    return (
        <form className="ms-auto" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search events"
                className="form-control"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />
        </form>
    );
}
