const users = [];

module.exports.addUser = ({ id, name, room }) => {
	name = name.replace(' ', '').toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find(
		user => user.room === room && user.name === name,
	);

	if (existingUser) {
		return { error: 'Username is taken' };
	}
	const user = { id, name, room };
	users.push(user);
	return { user };
};

module.exports.removeUser = id => {
	const index = users.findIndex(user => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

module.exports.getUser = id => users.find(user => user.id === id);

module.exports.getUsersInRoom = room =>
	users.filter(user => user.room === room);
