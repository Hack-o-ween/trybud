import { useState } from 'react';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [stats, setStats] = useState({
    points: 0,
    rejections: 0,
    connections: 0,
    events: 0,
  });

  const level = Math.floor(stats.points / 100) + 1;

  const connectWallet = async () => {
    try {
      // @ts-ignore - Freighter API
      if (window.freighter) {
        // @ts-ignore
        const publicKey = await window.freighter.getPublicKey();
        setAddress(publicKey);
        setConnected(true);
        alert('✅ Wallet connected! Address: ' + publicKey.substring(0, 10) + '...');
      } else {
        alert('❌ Please install Freighter wallet extension!');
        window.open('https://www.freighter.app/', '_blank');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('❌ Failed to connect. Make sure Freighter is on "Local" network!');
    }
  };

  const logRejection = () => {
    setStats(prev => ({
      ...prev,
      points: prev.points + 10,
      rejections: prev.rejections + 1,
    }));
    alert('🎉 +10 points! Every rejection makes you stronger!');
  };

  const logConnections = () => {
    const input = prompt('How many new LinkedIn connections did you make?');
    const count = parseInt(input || '0');
    if (count > 0) {
      setStats(prev => ({
        ...prev,
        points: prev.points + (count * 5),
        connections: prev.connections + count,
      }));
      alert(`🎉 +${count * 5} points! Keep networking!`);
    }
  };

  const logEvent = () => {
    setStats(prev => ({
      ...prev,
      points: prev.points + 50,
      events: prev.events + 1,
    }));
    alert('🎉 +50 points! Event attendance = BIG GAINS!');
  };

  const getLevelTitle = (lvl: number): string => {
    if (lvl === 1) return '👔 Intern';
    if (lvl === 2) return '💼 Junior Dev';
    if (lvl === 3) return '🎯 Mid-Level';
    if (lvl === 4) return '🚀 Senior Dev';
    if (lvl === 5) return '👑 Tech Lead';
    return '🏆 CTO';
  };

  const getCharacterEmoji = (lvl: number): string => {
    if (lvl === 1) return '👔';
    if (lvl === 2) return '💼';
    if (lvl === 3) return '🎯';
    if (lvl === 4) return '🚀';
    if (lvl === 5) return '👑';
    return '🏆';
  };

  return (
    <div className="app">
      {!connected ? (
        <div className="landing">
          <h1>🎮 JOBQUEST</h1>
          <h2>Turn Rejections into Wins!</h2>
          <p className="subtitle">Every rejection, connection, and event = XP 🚀</p>
          <button onClick={connectWallet} className="connect-btn">
            🔗 Connect Wallet to Play
          </button>
          <p className="help-text">Need Freighter wallet? Click to install!</p>
        </div>
      ) : (
        <div className="game">
          <header className="header">
            <div className="stats-bar">
              <span>💎 Points: {stats.points}</span>
              <span>⭐ Level {level}: {getLevelTitle(level)}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(stats.points % 100)}%` }}
              />
              <span className="progress-text">{stats.points % 100}/100 to next level</span>
            </div>
          </header>

          <main className="dashboard">
            <div className="character">
              <div className="character-avatar">
                {getCharacterEmoji(level)}
              </div>
              <p className="character-title">{getLevelTitle(level)}</p>
            </div>

            <div className="player-stats">
              <h3>📊 YOUR JOURNEY</h3>
              <p>📧 Rejections Conquered: {stats.rejections}</p>
              <p>🤝 Connections Made: {stats.connections}</p>
              <p>🎉 Events Attended: {stats.events}</p>
            </div>

            <div className="actions">
              <button onClick={logRejection} className="action-btn rejection">
                📧 Got Rejected? +10 pts
              </button>
              <button onClick={logConnections} className="action-btn connections">
                🤝 Made Connections? +5 pts each
              </button>
              <button onClick={logEvent} className="action-btn event">
                🎉 Attended Event? +50 pts
              </button>
            </div>

            <p className="wallet-address">
              Connected: {address.substring(0, 8)}...{address.substring(address.length - 8)}
            </p>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
