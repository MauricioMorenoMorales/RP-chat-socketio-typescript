import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io, { Socket } from 'socket.io-client';
import '../styles/Chat.css';

let socket: Socket;

const Chat: React.FC<{ location: Location }> = ({ location }) => {
	const [name, setName] = useState<string>('');
	const [room, setRoom] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<Array<string>>([]);
	const ENDPOINT = 'localhost:5000';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io(ENDPOINT);
		setName(String(name));
		setRoom(String(room));
		socket.emit('join', { name, room }, () => {});
		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', message => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	// function for sending messages
	const sendMessage = (event: React.KeyboardEvent) => {
		event.preventDefault();
		if (message) socket.emit('sendMessage', message, () => setMessage(''));
	};

	console.log(message, messages);

	return (
		<div className="outerContainer">
			<div className="container">
				{/* <input
					value={message}
					onChange={event => setMessage(event.target.value)}
					onKeyPress={event =>
						event.key === 'Enter' ? sendMessage(event) : null
					}
					type="text"
				/> */}
			</div>
		</div>
	);
};

export default Chat;

// 16.03
