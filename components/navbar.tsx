import Link from "next/link"
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">
                Chromezy
            </a>

            <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                {/* <form className="d-none d-lg-flex ms-4 me-auto">
                <input className="form-control form-control-sm bg-dark text-white border-0" type="search" placeholder="Search" />
                </form> */}

                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link active" href="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/#services">Services</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/#testimonials">Testimonials</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/#insights">Featured Insights</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/#success-stories">Success Stories</Link></li>
                </ul>

                <a href="/#contact" className="btn btn-contact">Contact Us</a>
            </div>
            </div>
        </nav>
    )
}