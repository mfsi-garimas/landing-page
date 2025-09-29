import Link from "next/link"
type Service = {
    id: number,
    title: string,
    summary: string
}

type ServicesGridProps = {
  services: Service[];
}
export default function ServicesGrid({services}: ServicesGridProps) {
    return (
            <>
            {services.map((service)=> (
                <div className="col-12 col-md-6 col-lg-3 d-flex" key={service.id}>
                    <div className="card-item bg-mvp">
                        <span className="tag">Our Services</span>
                        <h4>{service.title}</h4>
                        <p>{service.summary}</p>
                        <Link href="/#contact" className="btn mt-4">Talk to a Product Expert →</Link>
                    </div>
                </div>
            ))}
            </>
    )
}