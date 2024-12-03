import React, { useState } from 'react';
import './Faq.css'; // Import the styling

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('Software'); // State to track the selected category
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track the selected question

  const toggleQuestion = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  // FAQ data for each category
  const faqData = {
    Software: [
      {
        question: 'How to Change Password',
        answer: 'To change your password, go to settings and select "Change Password."'
      },
      {
        question: 'How to Change Name and Email Address',
        answer: 'You can change your name and email in your profile settings.'
      },
    ],

    Hardware: [
      {
        question: 'How to check application Version in laptop?',
        answer: 'Go to Control Panel and click on Programs to check the version.'
      },
      {
        question: 'How to check Laptop Serial Number?',
        answer: 'Go to CMD, type `wmic bios get serialnumber`, and hit enter to get the serial number.'
      },
      {
        question: 'How to check system configuration details?',
        answer: 'Go to CMD, type `msinfo32`, and hit enter to see the configuration details.'
      },
    ],

    Guidelines: [
      {
        question: 'What is Infra IT Support?',
        answer: 'EUS stands for End User Support, which focuses on providing assistance for hardware and software issues faced by users.'
      },
      {
        question: 'How can I contact IT Support?',
        answer: 'Users can typically reach End User Support via multiple channels Like Email & Phone'
      },
      {
        question: 'What is remote support?',
        answer: 'Remote support allows technicians to access a user’s computer or device remotely to diagnose and resolve issues without needing to be physically present.'
      },
      {
        question: 'What information should I provide when requesting support',
        answer: 'Include details such as your contact information, a description of the issue, steps to reproduce the problem, and any error messages received.'
      },
      {
        question: 'What is the typical response time for support requests?',
        answer: 'Response times vary by organization but generally range from immediate assistance for critical issues to 24-48 hours for non-urgent requests.'
      },
      {
        question: 'IT Support usually covers:',
        answer: 'IT Support focuses specifically on helping individual users with their technology needs, while IT support may cover broader organizational infrastructure and system maintenance.'
      },
      {
        question: 'IT Support usually covers:',
        answer: 'Operating systems (Windows,), )Productivity suites (Microsoft Office, Google outlook), Software (SAP Mapinfo)'
      },
      {
        question: 'What types of hardware does Infra support?',
        answer: 'Laptops, mobile application'
      },
    ],
    Network: [
      {
        question: 'How to check Lan IP',
        answer: 'Go to cmd & enter type Ipconfig/all, you get all network details.'
      },
      {
        question: 'How to check System MAC address',
        answer: 'Go to cmd and type getmac & enter to get details.'
      },
    ],
  };

  return (
    <div className="faq-wrapper">
      {/* Sidebar */}
      <div className="faq-nav">
        <h3>Categories</h3>
        <p onClick={() => setSelectedCategory('Guidelines')} className={selectedCategory === 'Guidelines' ? 'active-category' : ''}>
          Guidelines
        </p>
        <p onClick={() => setSelectedCategory('Software')} className={selectedCategory === 'Software' ? 'active-category' : ''}>
          Software
        </p>
        <p onClick={() => setSelectedCategory('Hardware')} className={selectedCategory === 'Hardware' ? 'active-category' : ''}>
          Hardware
        </p>
        <p onClick={() => setSelectedCategory('Network')} className={selectedCategory === 'Network' ? 'active-category' : ''}>
          Network
        </p>
      </div>

      {/* FAQ Content */}
      <div className="faq-details">
        {faqData[selectedCategory].map((item, i) => (
          <div key={i} className="faq-item">
            <div
              className="faq-query"
              onClick={() => toggleQuestion(i)}
            >
              {item.question}
              <span className={selectedQuestion === i ? 'open' : ''}>{selectedQuestion === i ? '−' : '+'}</span>
            </div>
            {selectedQuestion === i && (
              <div className="faq-response">
                <p>
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
