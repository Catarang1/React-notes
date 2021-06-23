import React, { Component } from 'react';
import './css/content.css'

export default class Step extends Component {

	render() {
		return (
			<div className="step">
				<div className="step_headline">
					{React.createElement('input',
						{type: 'checkbox',
						checked: this.props.done,
						onChange: this.props.onCheckboxChange})}
					<h2 onClick={this.props.onStepNameChangeRequest} className="stepHeadline">{this.props.name}</h2>
				</div>
				<ul>
					{this.props.notes.map( note => {
						return <li key={this.props.notes.indexOf(note)}>{note}</li>
					})}
				</ul>
			</div>
		);
	}
}