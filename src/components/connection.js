import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import '../styles/connection.css';

const socket = io(); // Connect to backend

const defaultAvatar = 'default.jpg'; // fallback image

const hardcodedProfiles = [
  { name: 'Emily', id: 'user1', avatar: 'user1.jpg' },
  { name: 'Sabrina', id: 'user2', avatar: 'user2.jpg' },
  { name: 'Julia', id: 'user3', avatar: 'user3.jpg' },
];

const potentialConnections = [
  { name: 'Priyanka', id: 'userA', avatar: 'user4.jpg' },
  { name: 'Rhea', id: 'userB', avatar: 'user5.webp' },
  { name: 'Mary Johnson', id: 'userC', avatar: 'user6.jpg' },
];

const Connections = ({ username }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [connectedProfiles, setConnectedProfiles] = useState(hardcodedProfiles);
  const [potential, setPotential] = useState(potentialConnections);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setChatMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    setChatMessages([]); // Optional: reset or fetch chat history
  };

  const handleSend = () => {
    if (!message.trim() || !selectedProfile) {
      alert('Please select a profile to chat with.');
      return;
    }

    const data = {
      sender: username,
      recipient: selectedProfile.id,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, { ...data }]);
    socket.emit('sendMessage', data);
    setMessage('');
  };

  const connectUser = (userId) => {
    const user = potential.find(u => u.id === userId);
    if (user) {
      setPotential(prev => prev.filter(u => u.id !== userId));
      setConnectedProfiles(prev => [...prev, user]);
      alert(`You connected with ${user.name}!`);
    }
  };

  return (
    <>
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

      <div className="chat-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Profiles</h2>
          <ul className="profile-list">
            {connectedProfiles.map(profile => (
              <li key={profile.id} onClick={() => handleSelectProfile(profile)}>
                <img src={profile.avatar} alt={profile.name} className="profile-image" />
                {profile.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-header">
            <img
              id="chat-profile-image"
              src={selectedProfile ? selectedProfile.avatar : defaultAvatar}
              alt="Profile"
              className="profile-image"
            />
            <h2 id="chat-profile-name">{selectedProfile ? selectedProfile.name : 'Select a Profile'}</h2>
          </div>
          <div className="chat-messages" id="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === username ? 'sent' : 'received'}`}>
                <strong>{msg.sender === username ? 'You' : msg.sender}: </strong>{msg.message}
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              id="message-input"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button id="send-button" onClick={handleSend}>Send</button>
          </div>
        </div>

        {/* Right Panel – Potential Connections */}
        <div className="potential-connections-container">
          <div className="potential-connections">
            <h2>Potential Connections</h2>
            <ul className="profile-list">
              {potential.map(user => (
                <li key={user.id}>
                  <img src={user.avatar} alt={user.name} className="profile-image" />
                  <span className="name">{user.name}</span>
                  <button className="connect-btn" onClick={() => connectUser(user.id)}>Connect</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connections;
