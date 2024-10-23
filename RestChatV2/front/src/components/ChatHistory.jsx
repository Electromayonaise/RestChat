import React from 'react';

const ChatHistory = ({ sender, receiver }) => {
  return (
    <div>
      <h3>Chat History</h3>
      <p>Sender: {sender}</p>
      <p>Receiver: {receiver}</p>
    </div>
  );
};

export default ChatHistory;
