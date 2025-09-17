function About() {
  return (
    <section className="about-section">
      <div className="container">
        <h1 className="page-title">About Global iMatrix</h1>
        
        <div className="about-content">
          <div className="about-image">
            <div className="placeholder-image">
              <span>Company Image</span>
            </div>
          </div>
          
          <div className="about-text">
            <h2 className="section-title">Our Mission</h2>
            <p className="text-content">
              Global iMatrix is dedicated to delivering cutting-edge software solutions 
              that empower businesses to thrive in the digital age. We combine technical 
              expertise with creative innovation to build applications that make a real difference.
            </p>
            
            <h3 className="subsection-title">Our Values</h3>
            <ul className="values-list">
              <li>Innovation-driven development</li>
              <li>Client-focused solutions</li>
              <li>Quality and reliability</li>
              <li>Continuous learning and growth</li>
            </ul>
            
            <h3 className="subsection-title">Our Expertise</h3>
            <p className="text-content">
              With years of experience in mobile and web development, we specialize in 
              React, React Native, Node.js, and modern cloud technologies. Our team 
              delivers scalable, secure, and user-friendly applications that exceed expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About