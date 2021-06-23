import React, { Component } from 'react';
import Task from './Task'
import ProjectInfo from './ProjectInfo'

export default class Content extends Component {

	scrollwrapStyle = {
		flexGrow: 1,
		minHeight: '100px',
		height: '100%',
		overflow: 'scroll hidden',
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		paddingRight: "25px"
	}

	countDoneTasks() {
		let doneTasks = 0
		this.props.tasks.forEach(task => {
			task.steps.every(step => step.done) && doneTasks++
		})
		return doneTasks
	}

	render() {
		return (
			<div id="scrollwrap" style={this.scrollwrapStyle}>
				<ProjectInfo
					project={this.props.project}
					tasksLength={this.props.tasks.length}
					tasksDone={this.countDoneTasks()}
					onProjectEditRequest={(projectID)=>this.props.onProjectEditRequest(projectID)}
					onProjectDeleteRequest={(projectID)=>this.props.onProjectDeleteRequest(projectID)}
					onTaskAddRequest={this.props.onTaskAddRequest}>
				</ProjectInfo>
				{this.props.tasks.map( task => {
					return (
					<Task
						name={task.name}
						steps={task.steps}
						id={task.id}
						key={this.props.tasks.indexOf(task)}
						onStepNameChangeRequest={(stepID) => this.props.onStepNameChangeRequest(stepID)}
						onCheckboxChange={ (stepID) => this.props.onCheckboxChange(stepID) }
						onTaskNameChangeRequest={(taskID) => this.props.onTaskNameChangeRequest(task.taskID)}
						onTaskDeleteRequest={(taskID) => this.props.onTaskDeleteRequest(task.taskID)}
						onStepAddRequest={(taskID) => this.props.onStepAddRequest(task.taskID)}
						onTaskAddRequest={this.props.onTaskAddRequest}>

					</Task>);
				})}
			</div>
		);
	}
}