import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // removes authentication
    window.location.href = "/login"; // force redirect and refresh
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero text-white text-center">
        <div className="hero-content">
          <br />
          <br />
          <h1
            className="display-4 fw-bold"
            style={{ color: "black", backgroundColor: "white", fontSize: 70 }}
          >
            Track. Trade. Learn.
          </h1>
          <p
            className="lead mb-4"
            style={{ color: "white", backgroundColor: "black", fontSize: 30 }}
          >
            Your all-in-one stock market dashboard starts here.
          </p>

          <button
            className="btn btn-warning custom-btn"
            onClick={() => navigate("/login")}
          >
            <b style={{ fontSize: 30 }}>Login</b>
          </button>
          <br />
          <br />
          <button
            className="btn btn-warning custom-btn"
            onClick={() => navigate("/register")}
          >
            <b style={{ fontSize: 30 }}>Register</b>
          </button>
        </div>
      </section>

      {/* Features section using Carousel */}
      <section className="feature-carousel-wrapper py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">
            What You Can Do with StockDash
          </h2>

          <div
            id="featureCarousel"
            className="carousel slide text-center"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="carousel-text-card mx-auto">
                  <h4>📊 Real-Time Stock Listings</h4>
                  <p>
                    Explore market activity with live or simulated prices,
                    trends, and filters.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-text-card mx-auto">
                  <h4>💼 Portfolio Management</h4>
                  <p>
                    Track your virtual investments, calculate P&L, and monitor
                    portfolio growth.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-text-card mx-auto">
                  <h4>🛒 Buy & Sell Stocks</h4>
                  <p>
                    Simulate real trading with virtual money. Practice decisions
                    without risk.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-text-card mx-auto">
                  <h4>📈 Visual Analytics</h4>
                  <p>
                    View charts and graphs of your portfolio value and daily
                    performance.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-text-card mx-auto">
                  <h4>🔐 Secure User Login</h4>
                  <p>
                    Register and login securely with JWT-based authentication
                    and personalized access.
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#featureCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#featureCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <br />

        {/* FAQ's Section */}
        <div
          className="container my-5"
          style={{ backgroundColor: "transparent" }}
        >
          <h2
            className="text-center mb-4"
            style={{
              backgroundColor: "darkGreen",
              color: "white",
              fontSize: 50,
              borderRadius: 100,
            }}
          >
            Frequently Asked Questions
          </h2>
          <div
            className="accordion"
            id="faqAccordion"
            style={{ backgroundColor: "black" }}
          >
            {/* FAQ 1 */}
            <div
              className="accordion-item"
              style={{ backgroundColor: "black", color: "white", fontSize: 25 }}
            >
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  style={{
                    fontSize: 30,
                    backgroundColor: "purple",
                    color: "white",
                  }}
                >
                  📊 What is a Stock Market Dashboard?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  A stock market dashboard is a web-based tool that helps you
                  track real-time prices, your investment portfolio,
                  profit/loss, and other analytics in one place. It's designed
                  to give you smart insights for better decision-making.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div
              className="accordion-item"
              style={{ backgroundColor: "black", color: "white", fontSize: 25 }}
            >
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  style={{ fontSize: 30 }}
                >
                  🔐 Is my investment data secure on this platform?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, your data is stored securely using industry-standard
                  encryption and is only accessible to you. We do not share or
                  sell your data to third parties.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div
              className="accordion-item"
              style={{ backgroundColor: "black", color: "white", fontSize: 25 }}
            >
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  style={{
                    fontSize: 30,
                    backgroundColor: "purple",
                    color: "white",
                  }}
                >
                  📈 How often are stock prices updated?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Stock prices are updated in near real-time using public APIs.
                  You can also manually refresh using the "Refresh Prices"
                  button on the dashboard.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div
              className="accordion-item"
              style={{ backgroundColor: "black", color: "white", fontSize: 25 }}
            >
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  style={{ fontSize: 30 }}
                >
                  📌 Can I simulate buying and selling stocks?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Absolutely! Our dashboard includes a virtual trading feature
                  where you can simulate buy/sell operations to track
                  performance without real investments.
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div
              className="accordion-item"
              style={{ backgroundColor: "black", color: "white", fontSize: 25 }}
            >
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  style={{
                    fontSize: 30,
                    backgroundColor: "purple",
                    color: "white",
                  }}
                >
                  🧠 What features make this dashboard different from others?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Our dashboard offers live profit/loss tracking, pie charts of
                  holdings, portfolio insights, contact support, and a
                  responsive design built with modern web technologies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="cta-section text-center py-5 text-dark"
        style={{ backgroundColor: "aqua" }}
      >
        <h2 className="mb-2" style={{ textAlign: "center" }}>
          Ready to explore the markets?
        </h2>
        <button
          className="btn btn-warning btn-lg"
          onClick={() => navigate("/register")}
        >
          <b>Get Started</b>
        </button>
      </section>

      {/* Footer */}
      <footer className="footer text-center text-white py-3">
        <p className="mb-0" style={{ fontSize: 30 }}>
          © 2025 Stock Dashboard | Built with React & Node.js
          <br />
          <button
            onClick={handleLogout}
            className="nav-btn3"
            style={{
              backgroundColor: "red",
              fontSize: 15,
              borderRadius: 20,
              textAlign: "right",
            }}
          >
            👋 Logout 👋
          </button>
        </p>
      </footer>
    </div>
  );
}

export default Home;
