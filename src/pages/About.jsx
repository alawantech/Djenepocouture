import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-content">
            <h1 className="page-title">About Golden Threads</h1>
            <p className="page-subtitle">
              Where craftsmanship meets elegance, and every stitch tells a story of dedication and passion.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Master Tailor at Work" 
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="story-section">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <div className="story-text">
              <p>
                Founded in 2003, Golden Threads began as a small family business with a simple vision: 
                to create exceptional clothing that combines traditional craftsmanship with contemporary style. 
                What started as a passion project has grown into one of the city's most trusted names in bespoke tailoring.
              </p>
              <p>
                Our master tailors bring decades of experience to every piece they create. Using time-honored 
                techniques passed down through generations, combined with modern innovations, we ensure that 
                each garment not only fits perfectly but also reflects your unique personality and style.
              </p>
              <p>
                At Golden Threads, we believe that clothing is more than fabric and thread – it's an expression 
                of who you are. That's why we take the time to understand your needs, preferences, and lifestyle 
                to create garments that you'll treasure for years to come.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <Award size={48} />
              <h3>Excellence</h3>
              <p>We never compromise on quality. Every stitch, every detail is executed with precision and care.</p>
            </div>
            <div className="value-card">
              <Users size={48} />
              <h3>Personal Service</h3>
              <p>Each client receives individual attention and personalized service throughout their journey with us.</p>
            </div>
            <div className="value-card">
              <Clock size={48} />
              <h3>Timeless Craft</h3>
              <p>We honor traditional tailoring methods while embracing modern techniques and innovations.</p>
            </div>
            <div className="value-card">
              <Heart size={48} />
              <h3>Passion</h3>
              <p>Our love for the craft drives us to create exceptional pieces that exceed expectations.</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-detail">
          <h2 className="section-title">Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Bespoke Suits</h3>
              <p>Custom-made suits tailored specifically to your measurements and preferences. From business attire to wedding suits, each piece is crafted with meticulous attention to detail.</p>
            </div>
            <div className="service-item">
              <h3>Formal Wear</h3>
              <p>Elegant evening gowns, cocktail dresses, and formal wear for special occasions. We create stunning pieces that make you feel confident and beautiful.</p>
            </div>
            <div className="service-item">
              <h3>Alterations & Repairs</h3>
              <p>Professional alterations and repairs to ensure your existing garments fit perfectly and maintain their quality and appearance.</p>
            </div>
            <div className="service-item">
              <h3>Consultation</h3>
              <p>Personal styling consultations to help you choose the perfect fabrics, cuts, and designs that complement your body type and lifestyle.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img 
                src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Master Tailor" 
              />
              <h3>Michael Thompson</h3>
              <p>Master Tailor & Founder</p>
              <span>25+ years experience</span>
            </div>
            <div className="team-member">
              <img 
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Senior Designer" 
              />
              <h3>Sarah Chen</h3>
              <p>Senior Designer</p>
              <span>15+ years experience</span>
            </div>
            <div className="team-member">
              <img 
                src="https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Alterations Specialist" 
              />
              <h3>David Rodriguez</h3>
              <p>Alterations Specialist</p>
              <span>12+ years experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;