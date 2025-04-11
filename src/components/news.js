import React, { useEffect, useState } from 'react';
import '../styles/news.css';

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [industry, setIndustry] = useState('general');
  const apiKey = '6906351a1c604e3ab5a28639481299d7'; // Replace with your own NewsAPI key
  const proxyUrl = 'https://api.allorigins.win/raw?url=';

  useEffect(() => {
    fetchNews(industry);
  }, [industry]);

  const fetchNews = async (industry) => {
    const url = `https://newsapi.org/v2/top-headlines?category=${industry}&apiKey=${apiKey}`;
    try {
      const response = await fetch(proxyUrl + encodeURIComponent(url));
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'ok') {
        setArticles(data.articles);
      } else {
        console.error('Error fetching news:', data.message);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="logo">
          <h2>GrowHer</h2>
        </div>
        <ul>
          <li><a href="/mainfeed">Feed</a></li>
          <li><a href="/connection">Connections</a></li>
          <li><a href="/news" id="news-nav">News</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/forum">Forum</a></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="news-section">
          <h3>Latest News</h3>

          {/* Industry Filter */}
          <div className="industry-filter">
            <label htmlFor="industry-select">Filter by Industry:</label>
            <select id="industry-select" value={industry} onChange={handleIndustryChange}>
              <option value="general">General</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          {/* News Articles */}
          <div id="news-articles" className="news-articles">
            {articles.length === 0 ? (
              <p>No trending articles available right now.</p>
            ) : (
              articles.map((article, index) => (
                <div key={index} className="news-article">
                  <h4>{article.title}</h4>
                  <p>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
