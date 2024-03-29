import '../../styles/messages/Message.css';

//! Remueve elementos por default
const Message: React.FC<any> = ({
	message: { user, text },
	name = 'Mariana',
}) => {
	let isSendByCurrentUser: boolean = false;
	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSendByCurrentUser = true;
	}
	const response = `text`;

	return isSendByCurrentUser ? (
		<div className="messageContainer justifyEnd">
			<p className="sentText pr-10">{trimmedName}</p>
			<div className="messageBox backgroundBlue">
				{/* <p class="messageText colorWhite">{response}</p> */}
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div className="messageBox backgroundLight">
				{/* <p class="messageText colorDark">{response}</p> */}
			</div>
			<p className="sentText pl-10">{user}</p>
		</div>
	);
};

export default Message;
