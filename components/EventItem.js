import Link from "next/link";

export default function EventItem({ event }) {
    return (
        <div className="card my-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={
                                event.image
                                    ? event.image.formats.thumbnail.url
                                    : "/images/event1.jpg"
                            }
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-8">
                        <h6 className="text-muted">
                            {new Date(event.date).toDateString("en-US")}{" "}
                            {event.time}
                        </h6>
                        <h3 className="card-title">{event.name}</h3>
                        <h5 className="card-subtitle">{event.venue}</h5>
                        <Link href={`/events/${event.slug}`}>
                            <a className="btn btn-danger mt-4">More Details</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
