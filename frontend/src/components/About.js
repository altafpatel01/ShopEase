import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../image/IMG_20221013_231307.jpg'
const About = () => {
  const navigate= useNavigate()
  return (
    <div className="about-page bg-gray-50 text-gray-800">
      {/* Hero Section */}
      {/* <section className="hero bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center"> */}
      <section className="hero bg-soft-pastel-blue text-white py-20 text-center">
        
        <h1 className="text-4xl font-bold mb-2">Your One-Stop Shop for Modern Living</h1>
        <p className="text-lg">Bringing Quality and Convenience to Your Doorstep</p>
      </section>

      {/* About Us Content */}
      <section className="about-content py-16 px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Story</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          Hey, this is <b>Altaf Patel</b>. This project was built by me to enhance my MERN skills. It showcases a full-fledged eCommerce platform, incorporating efficient backend and frontend capabilities, user-friendly design, and essential features for a modern shopping experience.          </p>
        </div>

        {/* Milestones */}
        <div className="milestones flex flex-col sm:flex-row justify-center gap-8 my-12">
          {["Founded in 2020", "100K+ Satisfied Customers", "Wide Product Range", "Global Shipping"].map((milestone, idx) => (
            <div key={idx} className="milestone-card flex flex-col items-center p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-all duration-300">
              <span className="text-blue-600 text-xl font-semibold">{milestone}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="values py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="flex flex-wrap justify-center gap-8 px-8">
          {[
            { title: "Quality", description: "Only the best products" },
            { title: "Trust", description: "Your reliable partner" },
            { title: "Satisfaction", description: "Putting you first" },
            { title: "Innovation", description: "Always evolving" },
          ].map((value, idx) => (
            <div key={idx} className="value-card text-center p-4 bg-white shadow-md rounded-lg w-56 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-blue-600 text-xl font-semibold">{value.title}</h3>
              <p className="text-sm mt-2">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="team py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">My Protfolio</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Altaf Patel", role: "click to visit" },
            // { name: "Altaf ", role: "Head of Marketing" },
            // { name: "Sarah Lee", role: "Product Designer" },
          ].map((member, idx) => (
            <div key={idx} className="team-member text-center bg-white shadow-lg rounded-lg p-4 w-48 transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"><img src={profile} className='overflow-hidden rounded-full aspect-square' alt='profile'/></div> {/* Placeholder for image */}
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <a href='https://altafpatel01.github.io/Portfolio-website/' className="text-sm text-blue-900">{member.role}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="testimonial-carousel max-w-2xl mx-auto">
          <blockquote className="text-lg italic mb-4">"ShopEase transformed my shopping experience!"</blockquote>
          <p className="text-sm text-gray-500">Altaf Patel</p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta bg-soft-pastel-blue text-white py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Explore the Best Products Today</h2>
        <button onClick={()=>{navigate('/products')}} className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full transform hover:scale-105 transition-all duration-300">
          Start Shopping
        </button>
      </section>
    </div>
  );
};

export default About;
