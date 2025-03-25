import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">About Mytic Wisdom</h1>
        <div className="card">
          <p>
            Mytic Wisdom is an application that connects ancient Indian mythology with modern life challenges.
            Drawing from the rich traditions of Upanishads, Mahabharata, Ramayana, and Manusmriti, we provide
            guidance and wisdom for your personal and professional problems.
          </p>
          <p className="mt-4">
            Our AI-powered system analyzes your question and finds relevant stories, teachings, and principles
            from these ancient texts that can help you navigate life's complexities with wisdom and clarity.
          </p>
        </div>

        <h2 className="section-title mt-6">The Sources of Wisdom</h2>
        <div className="card">
          <h3>Upanishads</h3>
          <p>
            Philosophical texts that form the theoretical basis for Hinduism. They contain discussions on metaphysics,
            philosophy, and spiritual knowledge, exploring the nature of reality, consciousness, and the self.
          </p>

          <h3 className="mt-4">Mahabharata</h3>
          <p>
            One of the major Sanskrit epics of ancient India, the Mahabharata is a narrative of the Kurukshetra War
            and the fates of the Kaurava and the Pandava princes. It contains philosophical and devotional material,
            including the Bhagavad Gita.
          </p>

          <h3 className="mt-4">Ramayana</h3>
          <p>
            An ancient Indian epic poem that narrates the journey of Rama, a prince of Ayodhya, whose wife Sita is
            abducted by Ravana, the demon king of Lanka. It explores themes of duty, righteousness, honor, and virtue.
          </p>

          <h3 className="mt-4">Manusmriti</h3>
          <p>
            An ancient legal text and constitution among the many Dharmaśāstras of Hinduism. It addresses social,
            moral, and legal codes, presenting a worldview of natural law and social obligations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
