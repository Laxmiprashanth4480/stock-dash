import { useState } from "react";
import axios from "axios";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact/submit",
        formData
      );
      alert(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="contact-background">
      <div className="contact-container">
        <br />
        <br />
        <h2 className="contact-heading">📬 Contact Us 📬</h2>
        <form onSubmit={handleSubmit} className="contact-card">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            onChange={handleChange}
            className="contact-input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            onChange={handleChange}
            className="contact-input"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            placeholder="Your Message"
            onChange={handleChange}
            className="contact-textarea"
            rows={4}
            required
          />
          <button type="submit" className="contact-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
