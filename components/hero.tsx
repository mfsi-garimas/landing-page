import getAllClientLogo from "@/lib/data/client_logo"
import Image from "next/image";
export default async function Hero() {
    const clientLogo = await getAllClientLogo();
    return (
        <section className="hero">
            <p className="tagline">⚡ Introducing AI Automation</p>
            <h1>
            from <span className="concept">CONCEPT</span> <br />
            to <span className="reality">REALITY</span>
            </h1>
            <p className="subtitle">We Engineer your Software Success & Digital Transformation.</p>
            <p className="description">
            At Chromezy, we translate your ideas into market-ready solutions quickly and 
            precisely. Leveraging the power of technology and prioritizing user needs, 
            we deliver products that are both cutting-edge and user-centric.
            </p>

            <div className="row justify-content-center stats mt-5">
            <div className="col-6 col-md-3">
                <h3>200%</h3>
                <p>Revenue Growth</p>
            </div>
            <div className="col-6 col-md-3">
                <h3>4X</h3>
                <p>Speed to Market</p>
            </div>
            <div className="col-6 col-md-3">
                <h3>73%</h3>
                <p>New Orders</p>
            </div>
            <div className="col-6 col-md-3">
                <h3>10K+</h3>
                <p>Active Users</p>
            </div>
            </div>

            <div className="logos text-center container d-flex flex-wrap justify-content-center">
                {clientLogo.map((logo)=> (
                    <Image width="100" height="50" src={logo.image} alt={logo.name} key={logo.id} />
                ))}
            </div>
        </section>
    )
}