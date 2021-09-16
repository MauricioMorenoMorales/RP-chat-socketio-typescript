import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Join</h1>
				<div>
					<input placeholder="Name" type="text" className="joinInput" />
				</div>
				<div>
					<input placeholder="Room" type="text" className="joinInput mt-20" />
				</div>
				<Link to="/">
					<button className="button mt-20" type="submit">
						Sign In
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
