import Link from "next/link"
type Insights = {
    id: number,
    title: string,
    summary: string,
    image: string,
    slug: string,
    createdAt: Date,
    updatedAt: Date,
    description: string
}

type GridProps = {
  insights: Insights[];
}
export default function InsightsGrid({insights}: GridProps) {
    return (
            <>
            {insights.map((insight)=> (
                    <div className="col-12 col-md-4" key={insight.id}>
                        <div className="insight-card">
                            <img src={insight.image} className="card-img-top" alt={insight.title} />
                            <div className="card-body">
                                <h5 className="card-title">{insight.title}</h5>
                                <p className="card-text">{insight.summary}</p>
                                <Link href={`/insights/${insight.slug}`} className="read-more">Read More →</Link>
                            </div>
                        </div>
                    </div>
            ))}
            </>
    )
}