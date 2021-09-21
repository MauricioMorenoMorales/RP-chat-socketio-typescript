import React, { Dispatch, SetStateAction } from 'react';
import '../styles/Input.css';

const Input: React.FC<{
	setMessage: Dispatch<SetStateAction<string>>;
	sendMessage: (event: React.SyntheticEvent) => void;
	message: string;
}> = ({ setMessage, sendMessage, message }) => {
	return (
		<form className="form">
			<input
				className="input"
				type="text"
				placeholder="Type a message..."
				value={message}
				onChange={event => setMessage(event.target.value)}
				onKeyPress={event =>
					event.key === 'Enter' ? sendMessage(event) : null
				}
			/>
			<button className="sendButton" onClick={event => sendMessage(event)}>
				Message
			</button>
		</form>
	);
};

export default Input;
