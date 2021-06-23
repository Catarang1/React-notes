import React, { Component } from 'react';
import './css/messageBox.css'

import FillIco from '../assets/m_txt.svg'
import NotificationIco from '../assets/m_ack.svg'
import DecisionIco from '../assets/m_bin.svg'

import Tick from '../assets/m_check.svg'
import Cross from '../assets/m_cross.svg'

export default class MessageBox extends Component {

	iconDictionary = {
		txt: <img src={FillIco} alt="warning"></img>,
		ack: <img src={NotificationIco} alt="notification"></img>,
		bin: <img src={DecisionIco} alt="decide"></img>
	}

	renderContent() {
		if (this.props.dialog.type === 'txt') {
			return <input id="messageBoxText" type="text" placeholder={this.props.dialog.prompt}></input>
		} else { return <p>{this.props.dialog.prompt}</p> }
	}

	renderTickButton() {
		if (this.props.dialog.type ==='txt') {
			return <img onClick={() => this.props.onDialogAccept(document.getElementById('messageBoxText').value)} src={Tick} alt="accept"></img>
		} else if (this.props.dialog.type ==='bin') {
			return <img onClick={() => this.props.onDialogAccept(true)} src={Tick} alt="accept"></img>
		} else return ""
	}

	render() {
		return (
			<div id="messageBox" className={this.props.dialog.show ? "show" : ""}>
				{this.iconDictionary[this.props.dialog.type]}
				<span>
					{this.renderContent()}
				</span>
				<img onClick={this.props.onDialogDismiss} src={Cross} alt="dismiss"></img>
				{this.renderTickButton()}
			</div>
		);
	}
}