import "./message.css"
const MessageItem = ({ message, isMe }) => {
    return (
        <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'} mb-3 ownai-message`}>
            {!isMe && (
                <div className="d-flex align-items-baseline mb-1 ms-1">
                    <span className="text-muted extra-small message-time">{message.time}</span>
                </div>
            )}
            
            {/* Time for Me */}
            {isMe && (
                <div className="d-flex align-items-center mt-1 me-1">
                    <span className="text-muted extra-small message-time" >{message.time}</span>
                </div>
            )}

            <div
                className={`p-3 position-relative message-bubble ${isMe ? 'bg-primary text-white rounded-start-3 rounded-bottom-3 me' : 'bg-light text-dark rounded-end-3 rounded-bottom-3 other'}`}
                >

                {/* Text Content */}
                {message.type === 'text' && (
                    <p className="mb-0 text-break message-text">{message.content}</p>
                )}
            </div>
        </div>
    );
};

export default MessageItem;
