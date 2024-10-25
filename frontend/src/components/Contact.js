import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://getform.io/f/bgdyewxa", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmissionStatus('Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmissionStatus('There was an error sending your message.');
            }
        } catch (error) {
            setSubmissionStatus('There was an error sending your message.');
        }
    };
  return (
    <div className="contact-page bg-gray-50 py-16 px-4 sm:px-8 lg:px-16 text-gray-800">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">We're here to help! Reach out to us with any questions, feedback, or support needs.</p>
      </section>

      {/* Contact Form */}
      <section className="contact-form bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-600 font-medium">Full Name</label>
              <input name='name' value={formData.name} 
                  onChange={handleChange} type="text" id="name" placeholder="Your Name" className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
              <input name='email' value={formData.email} 
                  onChange={handleChange}  type="email" id="email" placeholder="Your Email" className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-600 font-medium">Subject</label>
            <input  name='subject' 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required  type="text"  placeholder="Topic" className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-600 font-medium">Message</label>
            <textarea name="message" 
                  rows="10" 
                 
                  value={formData.message} 
                  onChange={handleChange} id="message" placeholder="Write your message here..." className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>
         
          <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Send Message</button>
          {submissionStatus && <p className='text-white text-center'>{submissionStatus}</p>}
        </form>
      </section>

      {/* Contact Info */}
      <section className="contact-info mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Also Get in Touch Through</h2>
        <p className="text-lg mb-4">Phone: (+91) 9301-9874-52</p>
        <p className="text-lg mb-4">Email: altafpatel8485@gmail.com</p>
        {/* <p className="text-lg">Address: 123 ShopEase Ave, Commerce City, ST 12345</p> */}
      </section>
    </div>
  );
};

export default Contact;
