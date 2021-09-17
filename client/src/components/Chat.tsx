import { useEffect, useState } from 'react';
import queryString from 'query-string';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

const Chat: React.FC<{ location: Location }> = ({ location }) => {
	const [name, setName] = useState<string>('');
	const [room, setRoom] = useState<string>('');
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

	return (
		<div>
			<p>Chat</p>
			<p></p>
		</div>
	);
};

export default Chat;
