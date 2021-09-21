import '../../styles/messages/Messages.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import { IMessage } from '../../interfaces/message.interface';

const Messages: React.FC<any> = ({ messages, names }) => {
	return (
		<ScrollToBottom>
			{messages.map((message, index) => (
				<div key={index}>
					<Message message={message} />
				</div>
			))}
		</ScrollToBottom>
	);
};

export default Messages;
