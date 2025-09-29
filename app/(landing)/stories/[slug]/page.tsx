import { getBySlug } from "@/lib/data/success_stories"
import Image from "next/image";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    slug: string;
  };
}

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