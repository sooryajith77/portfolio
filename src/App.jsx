


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import profileImg from "./assets/Screenshot 2026-06-26 213913.png";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaChartLine } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import NeuralBackground from "./components/NeuralBackground";
import { useTypewriter } from "./components/useTypewriter";
import { AiOutlineMail } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { IoIosLaptop } from "react-icons/io";

import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiMui,
} from "react-icons/si";
function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Typewriter effect for the hero role line
  const typedRole = useTypewriter(
    ["Full Stack Developer", "Technical Writer", "React Developer"],
    { typingSpeed: 65, deletingSpeed: 35, pauseTime: 1400 }
  );

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init("bjIMMf7Ya0fut3Tq3");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("soorya8590@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);

    // Validation checks
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill in all required fields (Name, Email, Message)"
      });
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ submitted: false, success: false, message: "" }), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please enter a valid email address"
      });
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ submitted: false, success: false, message: "" }), 3000);
      return;
    }

    try {
      const serviceId = 'service_kvo0il9';
      const templateId = 'template_987s4y3';

      const templateParams = {
        to_email: 'soorya8590@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Contact Form Message',
        message: formData.message,
        reply_to: formData.email
      };

      console.log("Sending email with params:", templateParams);

      const response = await emailjs.send(serviceId, templateId, templateParams);

      console.log("Email sent successfully!", response);

      setFormStatus({
        submitted: true,
        success: true,
        message: " Message sent successfully! I'll get back to you soon."
      });

      // Clear form
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus({
        submitted: true,
        success: false,
        message: "❌ Failed to send message. Please try again or email me directly at soorya8590@gmail.com"
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ submitted: false, success: false, message: "" }), 4000);
    }
  };

  // Function to handle hire button click - scrolls to contact form
  const handleHireClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
     ;
    }
  };

  const socials = [
    { name: "github", icon: <FaGithub />, link: "https://git.upcode.in/sooryajith2004" },
    { name: "linkedin", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/sooryajith-s-a2a16537a/" },
    { name: "twitter", icon: <FaTwitter />, link: "https://twitter.com" },
    { name: "instagram", icon: <FaInstagram />, link: "https://instagram.com/_sooryajith._" },
    { name: "whatsapp", icon: <FaWhatsapp />, link: "https://wa.me/+918590797138" }
  ];

  // Projects data
 const projects = [
  {
    title: "CRM System",
    desc: "Customer Relationship Management system with authentication and role-based access",
    tech: ["React", "Node.js", "PostgreSQL", "JWT"],
    category: "fullstack",
    features: ["User auth", "Lead & company, Deals, Tickets management"],
    github: "https://github.com/sooryajith77/CRM",
    demo: "https://crm-idg36a66y-sooryajiths-projects-978018ba.vercel.app",
   documentation: "https://github.com/sooryajith77/CRM/blob/master/README.md",
    image: "/images/crm-dashboard.png",
    color: "#8b5cf6"
  },
  {
    title: "SHOPCO | Technical Documentation Project",
    desc: "Ecommerce Application",
    tech: ["React", "Node.js", "PostgreSQL", "JWT"],
    category: "fullstack",
    features: ["User authentication", "E-commerce management"],
    github: "https://github.com/sooryajith77/shopco",
    demo: "https://your-shopco-demo.vercel.app",
    documentation: "https://github.com/sooryajith77/shopco/blob/master/README.md",
    image: "/images/shopco.png",
    color: "#06b6d4"
  },
  
];

 const skills = [
  {
    name: "React.js",
    level: 85,
    icon: <FaReact />,
    color: "#ff1b3d",
  },
  {
    name: "Node.js",
    level: 80,
    icon: <FaNodeJs />,
    color: "#ff1b3d",
  },
  {
    name: "JavaScript",
    level: 85,
    icon: <SiJavascript />,
    color: "#ff1b3d",
  },
  {
    name: "Express.js",
    level: 80,
    icon: <SiExpress />,
    color: "#ff1b3d",
  },
  {
    name: "MongoDB",
    level: 75,
    icon: <SiMongodb />,
    color: "#ff1b3d",
  },
  {
    name: "HTML5",
    level: 85,
    icon: <FaHtml5 />,
    color: "#ff1b3d",
  },
  {
    name: "CSS3",
    level: 85,
    icon: <FaCss3Alt />,
    color: "#ff1b3d",
  },
  {
    name: "PostgreSQL",
    level: 85,
    icon: <SiPostgresql />,
    color: "#ff1b3d",
  },
  {
    name: "Git",
    level: 85,
    icon: <FaGitAlt />,
    color: "#ff1b3d",
  },
  {
    name: "TypeScript",
    level: 85,
    icon: <SiTypescript />,
    color: "#ff1b3d",
  },
  {
    name: "Redux",
    level: 85,
    icon: <SiRedux />,
    color: "#ff1b3d",
  },
  {
    name: "Next.js",
    level: 85,
    icon: <SiNextdotjs />,
    color: "#ff1b3d",
  },
  {
    name: "Material UI",
    level: 85,
    icon: <SiMui />,
    color: "#ff1b3d",
  },
];

  const achievements = [
  {
    title: "CRM System",
    description:
      "Built a production-ready CRM with JWT authentication, role-based access, PostgreSQL, Sequelize, dashboard analytics, and deployment on Vercel & Render."
  },
  {
    title: "SHOPCO E-Commerce",
    description:
      "Developed a responsive full-stack e-commerce platform with authentication, product management, shopping cart, wishlist, and REST APIs."
  },
  {
    title: "Full Stack Developer",
    description:
      "Strong knowledge of React.js, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, Git, and REST API development."
  }
];

  return (
    <div className="app">
      {/* Animated 3D red/black neural network background — fixed behind all content */}
      <NeuralBackground />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <motion.div
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="logo-text">portfolio</span>
          </motion.div>

          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            {["Home", "Projects", "Skills", "Achievements", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container row-layout">
          <div className="hero-left">
            <img
              src={profileImg}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="hero-right">
            <h1>Hi, I'm <span className="gradient-text">Sooryajith</span></h1>
            <h2>{typedRole}<span className="type-cursor">|</span></h2>
            <p>Passionate about building scalable and beautiful web applications.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>View Projects</button>
              <button className="btn-secondary" onClick={() => window.open("https://git.upcode.in/sooryajith2004", "_blank")}>GitHub</button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Some of my best work</p>
            <div className="filter-buttons">
              {["all", "fullstack", "frontend", "backend"].map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "all" ? "All" : filter === "fullstack" ? "Full Stack" : filter === "frontend" ? "Frontend" : "Backend"}
                </button>
              ))}
            </div>
          </motion.div>

         <div className="projects-grid">
  {projects
    .filter((p) => activeFilter === "all" || p.category === activeFilter)
    .map((project, index) => (
      <motion.div
        key={index}
        className="project-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
        style={{ transformPerspective: 800 }}
      >
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />

        {/* Project Title */}
        <h3 className="project-title">{project.title}</h3>

        {/* Description */}
        <p className="project-description">{project.desc}</p>

        {/* Technologies */}
        <div className="project-tech">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="project-links">
        
<a
  href={project.github}
  className="project-link"
  target="_blank"
  rel="noopener noreferrer"
>
  Code →
</a>

<a
  href={project.demo}
  className="project-link"
  target="_blank"
  rel="noopener noreferrer"
>
  Demo →
</a>

<a
  href={project.documentation}
  className="project-link"
  target="_blank"
  rel="noopener noreferrer"
>
  Documentation →
</a>
        </div>
      </motion.div>
    ))}
</div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-subtitle">Technologies I work with</p>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div
  className="skill-icon"
  style={{
    background: `${skill.color}20`,
    color: skill.color,
  }}
>
  {skill.icon}
</div>
                <h3 className="skill-name">{skill.name}</h3>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    style={{ background: skill.color }}
                  />
                </div>
                <span className="skill-percent">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
     <section id="achievements" className="section">
  <div className="container">
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="section-title">Achievements</h2>
      <p className="section-subtitle">
        Highlights of my development journey
      </p>
    </motion.div>

    <div className="timeline">
      {achievements.map((item, index) => (
        <motion.div
          key={index}
          className="timeline-item"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
        >
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <h3 className="timeline-role">{item.title}</h3>
            <p className="timeline-date">{item.year}</p>
            <p className="timeline-description">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Education Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">Academic background</p>
          </motion.div>

          <motion.div
            className="education-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="education-icon">🎓</div>
            <h3 className="education-degree">Bachelor of Computer application</h3>
            <p className="education-university">Calicut University, Kerala</p>
            <p className="education-year">2022 - 2025</p>
            <p className="education-cgpa">CGPA: 5.6/10</p>
          </motion.div>
        </div>
      </section>
{/* Training & Certifications Section */}
<section className="section">
  <div className="container">
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="section-title">Training & Certifications</h2>
      <p className="section-subtitle">
        Professional training and certifications
      </p>
    </motion.div>

    <motion.div
      className="education-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="education-icon"><IoIosLaptop />
</div>

      <h3 className="education-degree">
        Full Stack Web Development
      </h3>

      <p className="education-university">
        MERN Stack | Upcode Software Labs
      </p>

      <p className="education-year">
        6-Month Course
      </p>

      <p className="education-cgpa">
        React.js • Node.js • Express.js • MongoDB • PostgreSQL • REST APIs
      </p>
    </motion.div>
  </div>
</section>
      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Send me a message — I'll receive it directly to my inbox!</p>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder=""
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <AnimatePresence>
                {formStatus.submitted && (
                  <motion.div
                    className={`form-status ${formStatus.success ? "success" : "error"}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <div className="contact-grid">
            <motion.div
              className="contact-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="contact-icon"><AiOutlineMail /></div>
              <h3>Email Directly</h3>
              <p>soorya8590@gmail.com</p>
              <button className="contact-btn" onClick={copyEmail}>
                {copiedEmail ? "Copied! ✓" : "Copy Email"}
              </button>
            </motion.div>

            <motion.div
              className="contact-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="contact-icon"><MdWorkOutline />
</div>
              <h3>Open to Work</h3>
              <p>Full Stack Developer</p>
              <button
                className="available-badge"
                onClick={handleHireClick}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "linear-gradient(135deg, #ff1b3d 0%, #b0091f 100%)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Available for hire
              </button>
            </motion.div>
          </div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>Connect with me</h3>
            <div className="social-icons">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Surya | Full Stack Developer</p>
          <p className="footer-quote">"Code, Learn, Build, Repeat"</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;