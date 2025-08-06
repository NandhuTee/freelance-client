const MessageBox = ({ message, isSender }) => {
  return (
    <div className={`mb-2 flex ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow 
        ${isSender ? 'bg-green-100 text-right' : 'bg-white text-left'}`}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBox;
