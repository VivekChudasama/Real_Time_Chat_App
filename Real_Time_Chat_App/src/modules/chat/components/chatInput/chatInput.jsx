import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaMicrophone } from 'react-icons/fa';
import { BsStars } from "react-icons/bs";
import { BsCardImage } from "react-icons/bs";
import "../chatInput/chatInput.css"


const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="p-3 bg-white border-top ownai-chatinput ">
            <Form onSubmit={handleSubmit}>
                <InputGroup className="align-items-center bg-light rounded-pill px-2 py-1">
                    {/* Attachment Button */}
                    <Button variant="link" className="text-secondary shadow-none border-0 text-decoration-none">
                        <BsCardImage size={18} />
                    </Button>

                    {/* Text Input */}
                    <Form.Control
                        placeholder="Type your message..."
                        className="bg-transparent border-0 shadow-none text-input-fontsize"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {/* Right Side */}
                    <div className="d-flex align-items-center gap-2 ">
                        <Button variant="link" className="text-primary shadow-none border-0 p-1 text-decoration-none">
                            <BsStars size={18} />
                        </Button>
                        <Button variant="link" className="text-secondary shadow-none border-0 p-1 text-decoration-none">
                            <FaMicrophone size={18} />
                        </Button>

                        {/* Send Button */}
                        <Button
                            id="chat-input-btn"
                            type="submit"
                            className="btn btn-primary rounded-3 text-white d-flex align-items-center justify-content-center ms-2 "
                            disabled={!message.trim()}
                        >
                            <span className="small fw-bold">Send</span>
                        </Button>
                    </div>
                </InputGroup>
            </Form>
        </div>
    );
};

export default ChatInput;
