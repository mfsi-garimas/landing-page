import {getAllServices} from "@/lib/data/services";
import ServicesGrid from "./grid/services-grid";
import { Suspense } from "react";
async function ServicesData() {
    const services = await getAllServices()
    return <ServicesGrid services={services} />
}
export default async function Services() {
    const services = await getAllServices()
    return(
        <section className="services-section container-fluid" id="services">
            <div className="row">
            <div className="col-12 col-lg-12 mx-auto">
                <h2>PRODUCT ENGINEERING</h2>
                <p className="section-description">
                Discover the impact of bespoke digital solutions tailored precisely to your business's distinct 
                requirements. Our experienced team of professionals ensures you receive outstanding results 
                that consistently exceed your expectations.
                </p>
            </div>
            </div>

            <div className="row justify-content-center">
            <Suspense fallback={<p className="loading">Fetching services...</p>}>
                <ServicesData />
            </Suspense>
            </div>
        </section>   
    )
}