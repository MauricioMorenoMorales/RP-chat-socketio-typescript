import '../styles/InfoBar.css';

import onlineIcon from '../assets/onlineIcon.png';
import closeIcon from '../assets/closeIcon.png';

const InfoBar: React.FC<{ room: string }> = ({ room }) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<img src={onlineIcon} alt="online image" className="onlineIcon" />
				<h3>{room}</h3>
			</div>
			<div className="rightInnerContainer">
				<a href="/">
					<img src={closeIcon} alt="close image" />
				</a>
			</div>
		</div>
	);
};

export default InfoBar;
