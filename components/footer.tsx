export default function Footer() {
    return (
        <footer className="main-footer container-fluid">
            <div className="row">
            <div className="col-12 col-md-4 mb-4">
                <div className="footer-logo">
                <div className="footer-logo-text">Chromezy</div>
                </div>
                <p className="footer-description">Not just about software & Product development; we're your tech partners, crafting modern digital solutions for next-gen excellence!</p>
                <p>+1 xx xxx 0901</p>
                <p>sales@xxxx.com</p>
            </div>

            <div className="col-6 col-md-2 mb-4">
                <div className="footer-link-group">
                <h5>Services</h5>
                <a href="/">Home</a>
                <a href="/about">About Us</a>
                </div>
            </div>

            <div className="col-6 col-md-2 mb-4">
                <div className="footer-link-group">
                    <h5>Insights</h5>
                    <a href="/#services">AI</a>
                    <a href="/#services">MVP</a>
                    <a href="/#services">SaaS</a>
                </div>
            </div>

            <div className="col-12 col-md-4 mb-4">
                <div className="footer-link-group">
                <h5>Work with us</h5>
                <a href="/#contact">Contact us</a>
                </div>
            </div>
            </div>

            <div className="row footer-bottom justify-content-between align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start">
                © Copyright 20xx | xxxx xxxx, All Rights Reserved | Designed by Debarshis Naik
            </div>
            <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
                Connect with us: <a href="#">FB</a> <a href="#">IG</a> <a href="#">LI</a>
            </div>
            </div>
        </footer>
    )
}