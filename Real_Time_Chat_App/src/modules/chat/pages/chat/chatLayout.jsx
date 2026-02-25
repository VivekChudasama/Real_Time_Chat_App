import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ConversationsList from '../../components/chatList/conversationsList';
import './chatLayout.css'
import ChatWindow from '../../components/chatWindow/chatWindow';

const ChatLayout = ({ currentUser }) => {
    // current user for chatting
    const [selectedChatUser, setSelectedChatUser] = useState(null);

    useEffect(() => {
        setSelectedChatUser(null);
    }, [currentUser]);

    const SelectConversation = (conversationUser) => {
        setSelectedChatUser(conversationUser);
    };

    // Handler to navigate 
    const BackToConversations = () => {
        setSelectedChatUser(null);
    };

    return (
        <Container fluid className="h-100 p-0 d-flex flex-column bg-light ownai-chatlayout">
            <div className="flex-grow-1 d-flex overflow-hidden">

                {/*Conversations List 
                */}
                <div
                    className={` flex-column border-end bg-white conversations-sidebar ${selectedChatUser ? 'd-none d-lg-flex' : 'd-flex'}`}
                >
                    <div className="h-100 w-100 d-lg-block " >
                        <ConversationsList
                            currentUser={currentUser}
                            selectedId={selectedChatUser?.id}
                            onSelect={SelectConversation}
                        />
                    </div>
                </div>

                {/*Chat Window
                   */}
                <div className={`flex-grow-1 flex-column h-100 bg-white  ${selectedChatUser ? 'd-flex' : 'd-none d-lg-flex'}`}>
                    <ChatWindow
                        currentUser={currentUser}
                        selectedUser={selectedChatUser}
                        onBack={BackToConversations}
                    />
                </div>
            </div>
        </Container>
    );
};

export default ChatLayout;