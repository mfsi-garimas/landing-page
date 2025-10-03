import Link from "next/link"
import Image from "next/image";
type Story = {
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
  stories: Story[];
}
export default function StoryGrid({stories}: GridProps) {
    return (
            <>
            {stories.map((story)=> (
                    <div className="col-12 col-md-6 mb-4 story-grid" key={story.id}>
                        <Link href={`/stories/${story.slug}`}>
                            <div className="project-card">
                                <div className="position-relative">
                                    <Image width="400" height="400" src={story.image} alt={story.title} className="img-fluid card-image" />
                                    <span className="tag position-absolute top-0 end-0 m-3">Success Stories</span>
                                </div>
                                <div className="card-content">
                                    <div className="title-link"><h4 className="title">{story.title}</h4></div>
                                    <p className="subtitle">{story.summary}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
            ))}
            </>
    )
}