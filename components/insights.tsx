import getAll from "@/lib/data/insights"
import InsightsGrid from "./grid/insights-grid"
import { Suspense } from "react"
async function InsightsData() {
    const data = await getAll()
    return <InsightsGrid insights={data} />
}
export default async function Insights() {
    return (
        <section className="featured-insights container-fluid" id="insights">
            <div className="row">
                <div className="col-12">
                    <h2>FEATURED INSIGHTS</h2>
                    <p className="subtitle">Were you looking to explore a specific topic? You&apos;re in the right spot.</p>
                </div>
            </div>
            <div className="row">
                <Suspense fallback={<p className="loading">Fetching insights...</p>}>
                <InsightsData />
                </Suspense>
            </div>
        </section>
    )
}