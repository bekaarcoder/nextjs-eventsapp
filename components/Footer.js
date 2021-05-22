import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-5">
            <p className="text-center">Copyright &copy; Rock Events 2021</p>
            <p className="text-center">
                Made with{" "}
                <span className="text-danger">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        class="bi bi-heart-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                    </svg>
                </span>{" "}
                using NextJS
            </p>
        </footer>
    );
}
