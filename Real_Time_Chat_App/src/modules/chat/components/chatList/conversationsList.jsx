import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { LiaSearchSolid } from "react-icons/lia";
import { fetchUsers, fetchMessages } from "../../services/chatApi";
import "./conversationList.css";

const ConversationsList = ({ currentUser, selectedId, onSelect }) => {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();

      const promises = users.map(async (user) => {
        const room = [currentUser.uid, user.uid].sort().join("_");
        let lastMsg = "";
        let time = "";

          const msgs = await fetchMessages(room);
          if (msgs && msgs.length > 0) {
            const last = msgs[msgs.length - 1];
            lastMsg = last.content;

            // Format Time
            if (last.message_at) {
              const dateObj = last.message_at.seconds
                ? new Date(last.message_at.seconds * 1000)
                : new Date(last.message_at);
              if (!isNaN(dateObj)) {
                time = dateObj.toLocaleTimeString([], {hour:'numeric', minute:'numeric' });
              }
            }
          }

        return {
          id: user.uid,
          user: {
            name: user.username,
            avatar: user.profile_image,
          },
          lastMessage: lastMsg,
          time: time,
        };
      });

      const results = await Promise.all(promises);
      setConversations(results.filter(Boolean)); 
    };
    if (currentUser) {
      loadUsers();
    }
  }, [currentUser]);

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex flex-column h-100 ownai-conversationlist ownai-conversationlist">
      {/* Header Area */}
      <div className="p-3 pb-2">
        <h5 className="fw-bold mb-3">My Messages</h5>

        {/* Search Bar */}
        <InputGroup className="mb-3">
          <InputGroup.Text
            className="bg-light border-end-0 text-muted search-icon"
          >
            <LiaSearchSolid />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            className="bg-light border-start-0 shadow-none text-muted"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* List Area */}
      <div className="flex-grow-1 overflow-auto px-2">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`d-flex align-items-center p-3 mb-2 rounded-3 cursor-pointer transition-colors conversation-item ${selectedId === conversation.id ? 'active' : 'hover-bg-light'} `}
          >
            {/* Avatar */}
                        <div className="me-3 position-relative">
                            {conversation.user.avatar && !conversation.user.avatar.includes('via.placeholder') ? (
                                <img
                                    src={conversation.user.avatar}
                                    alt={conversation.user.name}
                                    className="rounded-circle object-fit-cover conversation-avatar"
                                />
                            ) : (
                                <div
                                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white conversation-avatar"
                                >
                                </div>
                            )}
                        </div>

            {/* Content */}
            <div className="flex-grow-1 overflow-hidden">
              <div className="d-flex justify-content-between align-items-baseline mb-1">
                <h6 className="mb-0 fw-semibold text-truncate">
                  {conversation.user.name}
                </h6>
                <small
                  className="text-muted ms-2 last-conversation-time"
                >
                  {conversation.time}
                </small>
              </div>
              <p className="mb-0 text-muted text-truncate small">
                {conversation.lastMessage || (
                  <span className="fst-italic">Start a conversation</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
