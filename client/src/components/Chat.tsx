import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io, { Socket } from 'socket.io-client';
import '../styles/Chat.css';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './messages/Messages';

let socket: Socket;

const Chat: React.FC<{ location: Location }> = ({ location }) => {
	const [name, setName] = useState<string>('');
	const [room, setRoom] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<any>([]); //!verify real type
	const ENDPOINT = 'localhost:5000';

	//When the component is rendered is called this function
	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io(ENDPOINT);
		setName(String(name));
		setRoom(String(room));
		socket.emit('join', { name, room }, message => {
			console.log(message);
		});
		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', message => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	// function for sending messages
	const sendMessage = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (message) socket.emit('sendMessage', message, () => setMessage(''));
	};

	console.log(messages);

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} names="string" />
				<Input
					setMessage={setMessage}
					sendMessage={sendMessage}
					message={message}
				/>
				{/* <input
					value={message}
					type="text"
				/> */}
			</div>
		</div>
	);
};

export default Chat;
