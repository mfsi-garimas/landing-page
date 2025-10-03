import { getBySlug } from "@/lib/data/success_stories"
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function SuccessStoriesDetails(context: { params: Promise<{slug: string}> }) {
  const {slug} =  await context.params;
  const data = await getBySlug(slug);
    if(!data) {
        notFound();
    }
    return (
        <section className="services-section container-fluid">
            <div className="row">
                <div className="col-12 col-lg-6 mx-auto">
                    <Image src={data.image} alt={data.title} width="300" height="300" className="details-image"/>
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