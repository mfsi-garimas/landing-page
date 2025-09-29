import getAll from "@/lib/data/testimonials"
import Image from "next/image"
export default async function Testimonials() {
    function chunkArray<T>(arr: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
    const data = await getAll()
    const slides = chunkArray(data, 3); 
    return (
        <section className="testimonials-section container-fluid" id="testimonials">
            <div className="row">
            <div className="col-12 col-lg-6">
                <h2>OUR HAPPY CLIENTS</h2>
                <p className="subtitle">Dummy ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className="col-12 col-lg-6 text-end buttons-testimonial">
                <a className="btn-carousel" href="#testimonialCarousel" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </a>
                <a className="btn-carousel" href="#testimonialCarousel" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
            </div>
            </div>

            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((group, slideIndex) => (
          <div
            className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}
            key={slideIndex}
          >
            <div className="row">
              {group.map((testimonial, index) => (
                <div className={`col-12 col-md-4 ${index === 0 ? '' : 'd-none d-md-block'}`} key={index}>
                  <div className="testimonial-card">
                    <span className="quote-icon">“</span>
                    <p>{testimonial.message}</p>
                    <div className="client-info">
                      <div className="client-details">
                        <h5>{testimonial.name}</h5>
                        <p>{testimonial.company}</p>
                      </div>
                      <Image
                        src={testimonial.clientLogo}
                        alt={`${testimonial.company} Logo`}
                        className="client-logo"
                        width={100}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Carousel controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
        </section>
    )
}