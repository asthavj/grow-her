// import React, { useState, useEffect } from 'react';
// import { Chart } from 'chart.js/auto';
// import '../styles/profile.css';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [connections, setConnections] = useState([
//     { id: 1, name: 'Priya Patel', role: 'Investor' },
//     { id: 2, name: 'Ananya Sharma', role: 'Entrepreneur' },
//     { id: 3, name: 'Meera Gupta', role: 'Mentor' },
//     { id: 4, name: 'Sneha Reddy', role: 'Business Owner' },
//     { id: 5, name: 'Divya Singh', role: 'Investor' },
//   ]);

//   // Profile data
//   const profileData = {
//     name: 'Yashoda Sharma',
//     type: 'Business',
//     bio: 'I am a tuition teacher, passionate about teaching students new ways to learn and understand.',
//     email: 'tutionclasses@gmail.com',
//     phone: '+1234567890',
//     industry: 'Education',
//     businessType: 'Teacher',
//     fundingGoal: '₹5L+',
//     connectionsCount: 50,
//     pictures: [
//       'https://via.placeholder.com/300x200?text=Teaching+1',
//       'https://via.placeholder.com/300x200?text=Teaching+2',
//       'https://via.placeholder.com/300x200?text=Teaching+3',
//       'https://via.placeholder.com/300x200?text=Teaching+4',
//       'https://via.placeholder.com/300x200?text=Teaching+5',
//       'https://via.placeholder.com/300x200?text=Teaching+6',
//     ]
//   };

//   useEffect(() => {
//     renderProfitTrendsGraph();
//   }, []);

//   const generateRandomProfitData = (months) => {
//     return Array.from({ length: months }, () => Math.floor(Math.random() * 100000) + 50000);
//   };

//   const renderProfitTrendsGraph = () => {
//     const ctx = document.getElementById('profit-trends-chart');
//     if (!ctx) return;

//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const profitData = generateRandomProfitData(months.length);

//     new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: months,
//         datasets: [
//           {
//             label: 'Profit (in ₹)',
//             data: profitData,
//             borderColor: '#00AAC1',
//             backgroundColor: 'rgba(156, 137, 184, 0.2)',
//             fill: true,
//             tension: 0.4,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Profit (in ₹)',
//             },
//           },
//           x: {
//             title: {
//               display: true,
//               text: 'Months',
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: true,
//             position: 'top',
//           },
//         },
//       },
//     });
//   };

//   const filteredConnections = connections.filter(conn =>
//     conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     conn.role.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleLogout = () => {
//     // Perform logout actions here (clear tokens, etc.)
//     // Then redirect to login page
//     navigate('/login');
//   };

//   return (
//     <div className="profile-container">
//       {/* Navigation Bar */}
//       <div className="nav-bar">
//         <div className="logo">
//           <h2>GrowHer</h2>
//         </div>
//         <ul>
//           <li><a href="mainfeed.html">Feed</a></li>
//           <li><a href="connection.html">Connections</a></li>
//           <li><a href="news.html" id="news-nav">News</a></li>
//           <li><a href="profile.html">Profile</a></li>
//           <li><a href="forum.html">Forum</a></li>
//           <li className="logout-item">
//             <button onClick={handleLogout} className="logout-button">
//               Logout
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Rest of the component remains the same */}
//       <div className="main-content">
//         {/* Header Section */}
//         <header>
//           <div className="header-background"></div>
//           <div className="profile-picture">
//             <img src="https://via.placeholder.com/100" alt="Profile" />
//           </div>
//         </header>

//         {/* Profile Details Section */}
//         <section className="profile-details">
//           <h1>{profileData.name}</h1>
//           <p>{profileData.type}</p>
//           <p>{profileData.bio}</p>
//           <button onClick={() => setShowModal(true)}>
//             Connections ({profileData.connectionsCount})
//           </button>
//         </section>

//         {/* Form Details Section */}
//         <section className="form-details">
//           <h2>Details</h2>
//           <div className="details-grid">
//             <div><strong>Email:</strong> {profileData.email}</div>
//             <div><strong>Phone:</strong> {profileData.phone}</div>
//             <div><strong>Industry:</strong> {profileData.industry}</div>
//             <div><strong>Business Type:</strong> {profileData.businessType}</div>
//             <div><strong>Funding Goal:</strong> {profileData.fundingGoal}</div>
//           </div>
//         </section>

//         {/* Profit Trends Graph */}
//         <section className="profit-trends-section">
//           <h2>Profit Trends</h2>
//           <canvas id="profit-trends-chart"></canvas>
//         </section>

//         {/* Posted Pictures Section */}
//         <section className="posted-pictures-section">
//           <h2>Posted Pictures</h2>
//           <div className="picture-grid">
//             {profileData.pictures.map((pic, index) => (
//               <img key={index} src={pic} alt={`Posted ${index + 1}`} />
//             ))}
//           </div>
//         </section>

//         {/* Connections Modal */}
//         {showModal && (
//           <div className="modal">
//             <div className="modal-content">
//               <span className="close" onClick={() => setShowModal(false)}>&times;</span>
//               <h2>Connections</h2>
//               <input
//                 type="text"
//                 placeholder="Search connections..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <ul>
//                 {filteredConnections.map(conn => (
//                   <li key={conn.id}>
//                     <div>{conn.name}</div>
//                     <div className="connection-role">{conn.role}</div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../styles/profile.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const chartRef = useRef(null); // Ref for the chart instance
  const chartCanvasRef = useRef(null); // Ref for the canvas element

  const [connections, setConnections] = useState([
    { id: 1, name: 'Priya Patel', role: 'Investor' },
    { id: 2, name: 'Ananya Sharma', role: 'Entrepreneur' },
    { id: 3, name: 'Meera Gupta', role: 'Mentor' },
    { id: 4, name: 'Sneha Reddy', role: 'Business Owner' },
    { id: 5, name: 'Divya Singh', role: 'Investor' },
  ]);

  // Profile data
  const profileData = {
    name: 'Yashoda Sharma',
    type: 'Business',
    bio: 'I am a tuition teacher, passionate about teaching students new ways to learn and understand.',
    email: 'tutionclasses@gmail.com',
    phone: '+1234567890',
    industry: 'Education',
    businessType: 'Teacher',
    fundingGoal: '₹5L+',
    connectionsCount: 50,
    pictures: [
      'https://via.placeholder.com/300x200?text=Teaching+1',
      'https://via.placeholder.com/300x200?text=Teaching+2',
      'https://via.placeholder.com/300x200?text=Teaching+3',
      'https://via.placeholder.com/300x200?text=Teaching+4',
      'https://via.placeholder.com/300x200?text=Teaching+5',
      'https://via.placeholder.com/300x200?text=Teaching+6',
    ]
  };

  const generateRandomProfitData = (months) => {
    return Array.from({ length: months }, () => Math.floor(Math.random() * 100000) + 50000);
  };

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = chartCanvasRef.current?.getContext('2d');
    if (!ctx) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const profitData = generateRandomProfitData(months.length);

    // Create new chart instance and store the reference
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Profit (in ₹)',
            data: profitData,
            borderColor: '#00AAC1',
            backgroundColor: 'rgba(156, 137, 184, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Profit (in ₹)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const filteredConnections = connections.filter(conn =>
    conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conn.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Perform logout actions here (clear tokens, etc.)
    // Then redirect to login page
    navigate('/login');
  };

  return (
    <div className="profile-container">
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
          <li className="logout-item">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {/* Header Section */}
        <header>
          <div className="header-background"></div>
          <div className="profile-picture">
            <img src="https://via.placeholder.com/100" alt="Profile" />
          </div>
        </header>

        {/* Profile Details Section */}
        <section className="profile-details">
          <h1>{profileData.name}</h1>
          <p>{profileData.type}</p>
          <p>{profileData.bio}</p>
          <button onClick={() => setShowModal(true)}>
            Connections ({profileData.connectionsCount})
          </button>
        </section>

        {/* Form Details Section */}
        <section className="form-details">
          <h2>Details</h2>
          <div className="details-grid">
            <div><strong>Email:</strong> {profileData.email}</div>
            <div><strong>Phone:</strong> {profileData.phone}</div>
            <div><strong>Industry:</strong> {profileData.industry}</div>
            <div><strong>Business Type:</strong> {profileData.businessType}</div>
            <div><strong>Funding Goal:</strong> {profileData.fundingGoal}</div>
          </div>
        </section>

        {/* Profit Trends Graph */}
        <section className="profit-trends-section">
          <h2>Profit Trends</h2>
          <div className="chart-container">
            <canvas ref={chartCanvasRef} id="profit-trends-chart"></canvas>
          </div>
        </section>

        {/* Posted Pictures Section */}
        <section className="posted-pictures-section">
          <h2>Posted Pictures</h2>
          <div className="picture-grid">
            {profileData.pictures.map((pic, index) => (
              <img key={index} src={pic} alt={`Posted ${index + 1}`} />
            ))}
          </div>
        </section>

        {/* Connections Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Connections</h2>
              <input
                type="text"
                placeholder="Search connections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul>
                {filteredConnections.map(conn => (
                  <li key={conn.id}>
                    <div>{conn.name}</div>
                    <div className="connection-role">{conn.role}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;