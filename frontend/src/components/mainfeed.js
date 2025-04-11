import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- ✅ Import useNavigate
import '../styles/mainfeed.css';

const users = [
  { id: 1, username: "SarahJohnson", avatar: "https://via.placeholder.com/40" },
  { id: 2, username: "EmilyDavis", avatar: "https://via.placeholder.com/40" },
  { id: 3, username: "JessicaBrown", avatar: "https://via.placeholder.com/40" },
  { id: 4, username: "LauraSmith", avatar: "https://via.placeholder.com/40" },
  { id: 5, username: "AnnaWilson", avatar: "https://via.placeholder.com/40" }
];

const currentUser = { id: 6, username: "CurrentUser", avatar: "https://via.placeholder.com/40" };
const userConnections = [1, 2];

const hardcodedPosts = [
  { id: 6, content: "This is a post from User1. Loving the new forum design!", username: "User1", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: null },
  { id: 7, content: "User2 here! Just sharing some thoughts on the latest trends.", username: "User2", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: null },
  { id: 8, content: "Hello from User3! Let's discuss some exciting topics.", username: "User3", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: null }
];

const MainFeed = () => {
  const navigate = useNavigate(); // <-- ✅ Define navigate
  const [activeTab, setActiveTab] = useState('connected');
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const merged = [...storedPosts];

    hardcodedPosts.forEach(post => {
      if (!merged.some(p => p.id === post.id)) {
        merged.push(post);
      }
    });

    setPosts(merged);
    localStorage.setItem("posts", JSON.stringify(merged));
  }, []);

  const savePosts = (updatedPosts) => {
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const createPost = () => {
    if (!postContent.trim() && !postImage) return;

    const newPost = {
      id: Date.now(),
      content: postContent,
      username: currentUser.username,
      avatar: currentUser.avatar,
      likes: 0,
      likedBy: [],
      image: postImage ? URL.createObjectURL(postImage) : null
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    setPostContent('');
    setPostImage(null);
  };

  const toggleLike = (postId) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const liked = post.likedBy.includes(currentUser.username);
        return {
          ...post,
          likes: liked ? post.likes - 1 : post.likes + 1,
          likedBy: liked ? post.likedBy.filter(u => u !== currentUser.username) : [...post.likedBy, currentUser.username]
        };
      }
      return post;
    });

    savePosts(updated);
  };

  const filteredPosts = posts
    .filter(post => {
      if (activeTab === 'connected') {
        const postUser = users.find(user => user.username === post.username);
        return userConnections.includes(postUser?.id) || post.username === currentUser.username;
      }
      return true;
    })
    .sort((a, b) => (a.username === currentUser.username ? -1 : 1));

  const handleLogout = () => {
    // Example: clear localStorage or auth tokens
    localStorage.clear();
    navigate('/login'); // <-- ✅ Redirect
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
          <li><a href="/news">News</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/forum">Forum</a></li>
          <li><button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer", padding: "12px" }}>Logout</button></li>
        </ul>
      </div>

      {/* Feed Tabs */}
      <div className="feed-tabs">
        <button onClick={() => setActiveTab('connected')}>Connected</button>
        <button onClick={() => setActiveTab('explore')}>Explore</button>
      </div>

      {/* Create Post Box */}
      <div className="post-create">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
        />
        <button onClick={createPost}>Post</button>
      </div>

      {/* Posts Section */}
      <div className="feed">
        <h3>{activeTab === 'connected' ? 'Connected Feed' : 'Explore Feed'}</h3>
        {filteredPosts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.avatar} alt="avatar" className="avatar" />
              <h4>{post.username}</h4>
            </div>
            {post.image && <img src={post.image} alt="Post" className="post-image" />}
            <p>{post.content}</p>
            <div className="post-actions">
              <button onClick={() => toggleLike(post.id)}>
                Like ({post.likes})
              </button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFeed;