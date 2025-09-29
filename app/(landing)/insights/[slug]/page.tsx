import { getBySlug } from "@/lib/data/insights"
import { notFound } from "next/navigation";
export default async function InsightsDetails(context: { params: Promise<{slug: string}> }) {
    const {slug} =  await context.params;
    const data = await getBySlug(slug)
    if(!data) {
        notFound()
    }
    return (
        <section className="services-section container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6 mx-auto">
                    <img src={data.image} alt={data.title} className="details-image"/>
                </div>
                <div className="col-12 col-lg-6 mx-auto">
                    <h2>{data.title}</h2>
                    <p className="section-description">
                    {data.description}
                    </p>
                </div>
            </div>
        </section>
    )
}