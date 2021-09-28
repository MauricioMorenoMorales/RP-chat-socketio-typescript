const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, getUser, getUsersInRoom, removeUser } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

app.use(router);

io.on('connection', socket => {
	console.log('We have a new connection!!!');

	socket.on('join', ({ name, room }, callback) => {
		console.log(`User ${name} joined room ${room}`);
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to the room ${user.room}`,
		});

		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name}, has joined` });

		callback(`The connection is ok`);
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', { user: user.name, text: message });
		callback();
	});

	socket.on('disconnect', userName => {
		console.log('User had left!!!');
		removeUser(userName);
	});
});

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
