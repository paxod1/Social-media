import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Message.css';
import SideNav from './SideNav';

const socket = io('http://localhost:5001');

function Message() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const loginInfo = useSelector((state) => state.userlogin?.LoginInfo[0]);
  const userId = loginInfo?.id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/admin/AllUsers');
        const usersData = response.data.filter(user => user._id !== userId);
        setUsers(usersData);

        const profilePromises = usersData.map(user => axios.get(`http://localhost:5001/profile/${user._id}`));
        const profilesResponse = await Promise.all(profilePromises);
        const profilesData = profilesResponse.map(res => res.data);
        setUserProfiles(profilesData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    socket.on('chat message', (data) => {
      if (data.room === getRoomId(userId, selectedUser?._id)) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.msg, sender: data.sender, timestamp: data.timestamp },
        ]);
      }
    });

    socket.on('roomMessages', (msgs) => {
      setMessages(msgs);
    });

    return () => {
      socket.off('chat message');
      socket.off('roomMessages');
    };
  }, [selectedUser]);

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const roomId = getRoomId(userId, selectedUser._id);
      const newMessage = { text: message, sender: userId, timestamp: new Date().toISOString() };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit('chat message', { room: roomId, msg: message, sender: userId });
      setMessage('');
    }
  };

   const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
    const roomId = getRoomId(userId, user._id);
    socket.emit('joinRoom', roomId);
  };

  const getRoomId = (id1, id2) => {
    return [id1, id2].sort().join('_');
  };

  return (

    <div className="message-container">
      <div className='SideNav'>
        <SideNav/>
      </div>
      <div className="users-list">
        <h2>Users</h2>
        {users.map((user, index) => (
          <div key={user._id} onClick={() => handleUserSelect(user)} className='user-list-show'>
            <img src={`/Images/${user.ProfilePic}`||'https://via.placeholder.com/150'} className="post-avatar" />
            {user.username}
          </div>
        ))}
      </div>
      <div className="chat-area">
        {selectedUser && (
          <>
            <h2>Chat with {selectedUser.username}</h2>
            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message-item ${msg.sender === userId ? 'my-message' : 'other-message'}`}>
                  <div className="message-content">{msg.text}</div>
                  <div className="message-timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
