import React, { Component } from 'react';

import {FlatData} from '../data_flat'
// Component imports
import ProjectList from './ProjectList';
import Content from './Content';
import MessageBox from './MessageBox';
import Menu from './Menu';

export default class App extends Component {

	state =  {...FlatData} ;

	shadowStyle = {
		background: 'linear-gradient(to right, transparent, var(--dark-bg))',
		position: 'absolute',
		width: '25px',
		height: '100%',
		right: '42px',
	}

	handleMenuSelect = (index) => {
		if (this.state.selectedProject !== index) {
			const dialog = {show: true, type: "ack", prompt: "You have changed project view."}
			this.setState({dialog: dialog})
			this.setState({selectedProject: index})
		}
	}

	passTasksProp() {
		const selectedProjectID = this.state.projects[this.state.selectedProject].projectID
		const tasks = this.state.tasks.filter(task => task.projectID === selectedProjectID)
		tasks.forEach(task => task.steps = this.state.steps.filter(step => step.taskID === task.taskID))

		return tasks;
	}

	handleCheckboxChange = (stepID) => {
		const newSteps = this.state.steps.map( step => {
			if (step.id === stepID) step.done = !step.done
			return step
		})
		this.setState({ steps: newSteps})
	}

	handleTaskNameChangeRequest = (taskID) => {
		console.log('task ID '+taskID+' name change request');
		const dialog = {show: true, type: "txt", prompt: "enter new task name...", taskID: taskID}
		this.setState({dialog: dialog})
	}

	handleDialogDismiss = () => this.setState({dialog: {show: false}})

	handleDialogAccept = (result) => {
		if (this.state.dialog.prompt === 'enter new task name...') {
			const newTasks = this.state.tasks.map( task => {
				if (task.taskID === this.state.dialog.taskID) task.name = result
				return task
			})
			this.setState({ tasks: newTasks })
			document.getElementById('messageBoxText').value = ''
		}
		this.setState({dialog: {show: false}})

	}

	render() {
		return (
			<>

				<ProjectList projects={this.state.projects} onMenuSelect={this.handleMenuSelect} />

				<Content
					project={this.state.projects[this.state.selectedProject]}
					tasks={this.passTasksProp()}
					onCheckboxChange={this.handleCheckboxChange}
					onTaskNameChangeRequest={this.handleTaskNameChangeRequest}/>

				<div style={this.shadowStyle}></div>

				<MessageBox
					dialog={this.state.dialog}
					onDialogDismiss={this.handleDialogDismiss}
					onDialogAccept={this.handleDialogAccept}/>

				<Menu></Menu>

			</>
		);
	}
}