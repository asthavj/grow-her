import React, { useState, useEffect } from 'react';
import '../styles/forum.css'; // Ensure this CSS file exists and is styled for React

const forumData = {
  categories: ['Startups', 'Investments', 'Marketing', 'Technology', 'Mentorship'],
  threads: [
    {
      category: 'Startups',
      title: 'How to pitch to investors?',
      content: 'Looking for tips on how to create a compelling pitch deck.',
      author: 'Jane Doe',
    },
    {
      category: 'Investments',
      title: 'Best industries to invest in 2024?',
      content: 'What are the emerging industries with high growth potential?',
      author: 'John Smith',
    },
    {
      category: 'Marketing',
      title: 'Effective social media strategies for startups',
      content: 'Share your best practices for organic growth on social media.',
      author: 'Alice Johnson',
    },
    {
      category: 'Technology',
      title: 'Top tech trends for 2024',
      content: 'Discuss the latest advancements in AI, blockchain, and IoT.',
      author: 'Bob Brown',
    },
    {
      category: 'Mentorship',
      title: 'How to find a good mentor?',
      content: 'Tips for identifying and approaching potential mentors.',
      author: 'Charlie Davis',
    },
  ],
};

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredThreads, setFilteredThreads] = useState(forumData.threads);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = forumData.threads.filter(thread => thread.category === selectedCategory);
      setFilteredThreads(filtered);
    } else {
      setFilteredThreads(forumData.threads);
    }
  }, [selectedCategory]);

  return (
    <div className="forum-page">
      <div className="nav-bar">
        <div className="logo">
          <h2>GrowHer</h2>
        </div>
        <ul>
          <li><a href="/mainfeed">Feed</a></li>
          <li><a href="/connection">Connections</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/forum">Forum</a></li>
        </ul>
      </div>

      <div className="forum-container">
        <h1>Forum</h1>

        <div className="categories">
          {forumData.categories.map(category => (
            <div
              key={category}
              className={`category ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="threads">
          {filteredThreads.length === 0 ? (
            <p>No threads found in this category.</p>
          ) : (
            filteredThreads.map((thread, index) => (
              <div key={index} className="thread">
                <h3>{thread.title}</h3>
                <p>{thread.content}</p>
                <p><strong>Author:</strong> {thread.author}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
