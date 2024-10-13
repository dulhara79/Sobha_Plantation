import React, { useState } from 'react';
import { FaRobot, FaQuestionCircle } from 'react-icons/fa';
import './Chatbot.css';  // Ensure this points to the correct CSS file

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null); // Track which question is selected

  const toggleChatbot = () => {
    setOpen(!open);
    setMessage('');
    setActiveQuestion(null); // Reset active question when toggling
  };

  const handleFAQClick = (question, answer) => {
    setActiveQuestion(question);
    setMessage(answer);
  };

  const faqs = [
    {
      question: 'How do I create an account on your website?',
      answer: 'You can create an account by clicking on the "Sign in" button at the top of the homepage and following the instructions to fill in your details.'
    },
    {
      question: 'How can I reset my password?',
      answer: 'If you’ve forgotten your password, click on the "Forgot Password" link on the login page, and follow the steps to reset it.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We only accept payments via credit or debit cards. Unfortunately, we do not accept cash or other forms of payment.'
    },
    {
      question: 'How long will it take to receive my order?',
      answer: 'Delivery times depend on your location, but orders are typically delivered within 1-3 business days.'
    },
    {
      question: 'Do you offer shipping outside of the local area?',
      answer: 'No, we currently only serve local customers. All deliveries are limited to our local service area.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team via 0112 751 757 / 075 216 9421, sobhaplantationsltd@gmail.com, or live chat during our business hours. You can also fill out the contact form on our website, and we’ll get back to you promptly.'
    },
    {
      question: 'Where is your company located?',
      answer: 'Our company are located at 317/23, Nikaweratiya, Kurunagala, Sri Lanka. For more details on office locations or service areas, please visit the "Contact Us" or "Locations" page.'
    },
    {
      question: 'What should I do if I receive a damaged or incorrect product?',
      answer: 'If you receive a damaged or incorrect product, please contact our customer service within 24 hours of delivery, and we will arrange for a replacement or refund.'
    }
  ];

  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${open ? 'open' : ''}`} onClick={toggleChatbot}>
        <FaRobot size={30} color="#fff" />
      </div>

      {open && (
        <div className="chatbot-popup animate-popup">
          <h3>🤖 Welcome! How can I help you today?</h3>
          <p>Select a question to get an answer:</p>
          {faqs.map((faq, index) => (
            <button key={index} className={`faq-question ${activeQuestion === faq.question ? 'active' : ''}`} onClick={() => handleFAQClick(faq.question, faq.answer)}>
              <FaQuestionCircle style={{ marginRight: '10px' }} />
              {faq.question}
            </button>
          ))}
          {message && (
            <div className="faq-answer">
              <h4>{activeQuestion}</h4>
              <p>{message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
