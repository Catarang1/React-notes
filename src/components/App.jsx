import React, { Component } from 'react';

import {FlatData} from '../data_flat'
// Component imports
import ProjectList from './ProjectList';
import Content from './Content';
import MessageBox from './MessageBox';
import Menu from './Menu';
import Request from './enums'

export default class App extends Component {

	state =  {...FlatData}

	showDialog(type, prompt, detail) {
		let newDialog = { show: true, type: type, prompt: prompt }
		if (detail !== undefined) {
			detail.stepID !== undefined && (newDialog.stepID = detail.stepID)
			detail.taskID !== undefined && (newDialog.taskID = detail.taskID)
			detail.projectID !== undefined && (newDialog.projectID = detail.projectID)
			detail.request !== undefined && (newDialog.request = detail.request)
		}
		this.setState({ dialog: newDialog})
	}

	hideDialog = () => {
		this.setState({ dialog: {show:false} })
	}

	generateNewId(element) {
		let newID = 0
		let existingIDs;

		if (element === "project")  existingIDs = this.state.projects.map( project => project.projectID)
		else if (element === "task") existingIDs = this.state.tasks.map( task => task.taskID)
		else if (element === "step") existingIDs = this.state.steps.map( step => step.id)
		else return undefined

		while (existingIDs.includes(newID)) newID++
		return newID
	}

	createTodayTimestamp() {
		let date = new Date()
		return `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()} `
	}

	handleMenuSelect = (index) => {
		if (this.state.selectedProject !== index) {
			this.setState({selectedProject: index})
		}
	}

	passTasksProp() {
		const tasks = this.state.tasks.filter(task => task.projectID === this.state.selectedProject)
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

	handleDialogAccept = (result) => {
		let newProjects, newTasks, newSteps
		switch(this.state.dialog.request) {

			case Request.TASK_NAME_EDIT:
				newTasks = this.state.tasks.map( task => {
					if (task.taskID === this.state.dialog.taskID) task.name = result
					return task
				})
				this.setState({ tasks: newTasks })
				document.getElementById('messageBoxText').value = ''
				break

			case Request.STEP_NAME_EDIT:
				newSteps = this.state.steps.map(step => {
				if (step.id === this.state.dialog.stepID) {step.name = result}
					return step
				})
				this.setState({ steps: newSteps })
				break

			case Request.TASK_DELETE:
				newTasks = this.state.tasks.filter( task => task.taskID !== this.state.dialog.taskID)
				this.setState({tasks: newTasks})
				newSteps = this.state.steps.filter(step => step.taskID !== this.state.dialog.taskID)
				this.setState({ steps: newSteps })
				break

			case Request.PROJECT_DELETE:
				newProjects = this.state.projects.filter(project => project.projectID !== this.state.dialog.projectID)
				let deletedProjectID = this.state.projects.filter( project => project.projectID === this.state.dialog.projectID)[0].projectID
				newTasks = this.state.tasks.filter(task => task.projectID !== deletedProjectID)
				let deletedTasksIDs = this.state.tasks.filter(task => task.projectID === deletedProjectID).map(task => task.taskID)
				newSteps = this.state.steps.filter(step => !deletedTasksIDs.includes(step.taskID))
				this.setState({projects: newProjects, tasks: newTasks, steps: newSteps, selectedProject: this.state.projects[0].projectID})
				break

			case Request.PROJECT_NAME_EDIT:
				newProjects = this.state.projects.map(project => {
					if (project.projectID === this.state.dialog.projectID) project.name = result
					return project
				})
				this.setState({projects: newProjects})
				break

			default: return;
		}
		this.hideDialog()
	}

	handleStepAddRequest = (taskID) => {
		this.setState({steps : [...this.state.steps, {
			taskID: taskID,
			id: this.generateNewId("step"),
			done: false,
			name: 'New Step',
			notes: ["New Note for new step"]}]})
	}

	handleTaskAddRequest = () => {
		this.setState({ tasks: [...this.state.tasks, {
			projectID: this.state.selectedProject,
			name: 'New Task',
			taskID: this.generateNewId('task')}] })
	}

	handleProjectAddRequest = () => {
		this.setState({projects: [...this.state.projects, {
			name: 'New Project',
			created: this.createTodayTimestamp(),
			owner: 'You',
			contributors: 'Nobody',
			ico: "boat",
			projectID: this.generateNewId('project')}] })
	}

	handleProjectEditRequest = (projectID) =>
		this.showDialog('txt', "Enter new project name...", {projectID: projectID, request: Request.PROJECT_NAME_EDIT})

	handleProjectDeleteRequest = (projectID) =>
		this.showDialog('bin', "Do you really want to delete this project?", {projectID: projectID, request: Request.PROJECT_DELETE})

	handleTaskDeleteRequest = (taskID) =>
		this.showDialog('bin', "Do you really want to delete this task?", {taskID:taskID, request: Request.TASK_DELETE})

	handleTaskNameChangeRequest = (taskID) =>
		this.showDialog('txt', "enter new task name...", {taskID: taskID, request: Request.TASK_NAME_EDIT})

	handleStepNameChangeRequest = (stepID) =>
		this.showDialog('txt', "enter new step name...", {stepID: stepID, request: Request.STEP_NAME_EDIT})

	render() {
		return (
			<>
				<ProjectList
					projects={this.state.projects}
					onMenuSelect={this.handleMenuSelect}
					onProjectAddRequest={this.handleProjectAddRequest} />

				<Content
					project={this.state.projects.find(project => project.projectID === this.state.selectedProject)}
					tasks={this.passTasksProp()}
					onProjectEditRequest={this.handleProjectEditRequest}
					onProjectDeleteRequest={this.handleProjectDeleteRequest}
					onStepNameChangeRequest={this.handleStepNameChangeRequest}
					onCheckboxChange={this.handleCheckboxChange}
					onTaskNameChangeRequest={this.handleTaskNameChangeRequest}
					onTaskDeleteRequest={this.handleTaskDeleteRequest}
					onStepAddRequest={this.handleStepAddRequest}
					onTaskAddRequest={this.handleTaskAddRequest} />

				<div id="shadow"></div>

				<MessageBox
					dialog={this.state.dialog}
					onDialogDismiss={this.hideDialog}
					onDialogAccept={this.handleDialogAccept} />

				<Menu />
			</>
		);
	}
}