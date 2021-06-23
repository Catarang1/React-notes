import SettingsIco from "../assets/settings.svg"
import LogOutIco from "../assets/cross.svg"
import LanguageIco from "../assets/location.svg"

const Menu = () => {
	return (
		<ul id="menu">
			<li>
				<span><img src={SettingsIco} alt="Settings" /> Settings</span>
				<div className="underline"></div>
			</li>

			<li>
				<span><img src={LanguageIco} alt="Settings" /> Language</span>
				<div className="underline"></div>
			</li>

			<li>
				<span><img src={LogOutIco} alt="Settings" /> Log Out</span>
				<div className="underline"></div>
			</li>
		</ul>
	);
}

export default Menu;