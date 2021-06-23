import React, { Component } from 'react';
import Step from './Step'
import './css/content.css'

export default class Task extends Component {

	isDone() {
		return this.props.steps.every(step => step.done)
	}

	getPercFinished() {
		let totalSteps = this.props.steps.length
		let finishedSteps = 0
		this.props.steps.forEach( step => {
			step.done && finishedSteps ++
		});

		return (finishedSteps / totalSteps * 100).toFixed(0) || 100
	}

	getProgressColor() {
		return this.isDone() ? "var(--green)" : "var(--red)"
	}

	getProgressRadialValue() {
		return 74 / 100 * this.getPercFinished()
	}

	render() {
		return (
			<div className={"tab_border task " + (this.isDone() ? "green" : "red")}><div className="tab">
				<div className="progressTab">
					<svg className="progressCircle" width="36" height="36">
						<circle r="12" cx="18" cy="18"stroke="var(--dark-bg)" strokeWidth="9" fill="none"></circle>
						<circle r="12" cx="18" cy="18" className="progress" fill="none" stroke={this.getProgressColor()} strokeWidth="4" strokeLinecap="round"
							strokeDasharray={this.getProgressRadialValue() + ' 1000'}></circle>

					</svg>
					<span>{this.getPercFinished()}%</span>
				</div>
				<h1 className="taskHeadline" onClick={this.props.onTaskNameChangeRequest}>{this.props.name}</h1>
				<div className="buttonRow">
					<button onClick={() => this.props.onTaskNameChangeRequest(this.props.id)} className="edit"></button>
					<button onClick={() => this.props.onTaskDeleteRequest(this.props.id)} className="trash"></button>
					<button onClick={() => this.props.onStepAddRequest(this.props.id)} className="add"></button>
				</div>
				<div className="steps">
					{this.props.steps.map((step) => {
						return <Step
							key={step.id}
							done={step.done}
							name={step.name}
							notes={step.notes}
							onStepNameChangeRequest={ () => this.props.onStepNameChangeRequest(step.id) }
							onCheckboxChange={ () => this.props.onCheckboxChange(step.id) }>
						</Step>
					})}
				</div>


			</div></div>
		);
	}
}

