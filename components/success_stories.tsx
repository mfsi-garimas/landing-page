import getAll from "@/lib/data/success_stories"
import StoryGrid from "./grid/story-grid"
import { Suspense } from "react"
async function StoryData() {
    const stories = await getAll()
    return <StoryGrid stories={stories} />
}
export default async function SuccessStories() {
    return (
        <section className="success-stories container-fluid" id="success-stories">
            <div className="row">
                <div className="col-12 col-lg-4 text-content">
                    <h2>SUCCESS STORIES</h2>
                    <p>
                    Dummy ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                    </p>
                </div>

                <div className="col-12 col-lg-8">
                    <div className="row">
                       <Suspense fallback={<p className="loading">Fetching success stories...</p>}>
                            <StoryData />
                        </Suspense> 
                    </div>
                </div>
            </div>    
        </section>
    )
}