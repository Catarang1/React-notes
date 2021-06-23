import React, { Component } from 'react';
import './css/content.css'

import OwnerIco from '../assets/person.svg'
import ContributorsIco from '../assets/group.svg'
import TaskCountIco from '../assets/number.svg'
import TaskDoneCountIco from '../assets/graph.svg'
/* import DoneTaskIco from '../assets/checkbox.svg' */

export default class ProjectInfo extends Component {
	state = {  }

	countFinishedTasks() {
		let finishedTasks = 0
		this.props.tasks.forEach(task => {
			let finishedSteps = task.steps.filter(step => step.done)
			if (finishedSteps.length === task.steps.length) finishedTasks++
		})
		return finishedTasks;
	}

	render() {
		return (
			<div className="tab_border">
				<div className="tab">
					<p>Created {this.props.project.created}</p>
					<h1>Project {this.props.project.name}</h1>
					<div className="buttonRow">
						<button onClick={() => this.props.onProjectEditRequest(this.props.project.projectID)} className="edit"></button>
						<button onClick={() => this.props.onProjectDeleteRequest(this.props.project.projectID)} className="trash"></button>
						<button onClick={this.props.onTaskAddRequest} className="add"></button>
					</div>
					<ul>
						<li><img src={OwnerIco} alt="owner" /><span>{this.props.project.owner} is owner</span></li>
						<li><img src={ContributorsIco} alt="contributors" /><span>{this.props.project.contributors} are collaborating</span></li>
						<li><img src={TaskCountIco} alt="task count" /><span>{this.props.tasksLength} tasks in project</span></li>
						<li><img src={TaskDoneCountIco} alt="task count" /><span>{this.props.tasksDone} tasks are done</span></li>
					</ul>
				</div>
			</div>
		);
	}
}