import { useState } from 'react';

export default function FAQAccordion() {
const faqs = [
    {
        question: "What is Headless WordPress?",
        answer: "Headless WordPress is a setup where WordPress is used as a backend CMS, and the frontend is built with a separate framework like Next.js."
    },
    {
        question: "How does Incremental Static Regeneration (ISR) work?",
        answer: "ISR allows you to update static content after you've built your site. Pages are updated in the background as traffic comes in."
    },
    {
        question: "How are backups managed?",
        answer: "WordPress (in this case) is used for content management, while GitHub is used for code versioning and backup."
    },
    {
        question: "How are projects managed?",
        answer: "Projects are managed via a JSON file and displayed dynamically on the homepage."
    },
    {
        question: "Can I use my own WordPress site as a backend?",
        answer: "Absolutely! You can configure the site to pull content from your own WordPress installation."
    }
];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <button
            className="w-full text-left py-4 flex items-center justify-between focus:outline-none"
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-panel-${idx}`}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            id={`faq-panel-${idx}`}
            className={`overflow-hidden transition-all duration-200 ${openIndex === idx ? 'max-h-40' : 'max-h-0'}`}
            aria-hidden={openIndex !== idx}
          >
            <p className="text-gray-700 pb-4">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
