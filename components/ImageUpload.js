import { useState } from "react";
import { API_URL } from "@/config/index";

export default function ImageUpload({ eventId, imageUploaded, token }) {
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("files", image);
        formData.append("ref", "events");
        formData.append("refId", eventId);
        formData.append("field", "image");

        const res = await fetch(`${API_URL}/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (res.ok) {
            imageUploaded();
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <input
                        className="form-control"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="d-grid">
                    <input
                        type="submit"
                        className="btn btn-danger btn-block"
                        value="Upload"
                    />
                </div>
            </form>
        </div>
    );
}
