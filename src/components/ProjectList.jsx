import React, { Component } from "react";
import "./css/projectList.css";

export default class Menu extends Component {

	handleSelect(index) {
		console.log(index);
	}

	render() {
		return (
			<React.Fragment>
				<div id="projectList" style={this.style}>
					<button onClick={this.props.onProjectAddRequest}><div className="tooltip">Add Project</div></button>
					{this.props.projects.map((project) => {
						return (
						<button
							className={project.ico + " workgroup"}
							key={project.projectID}
							onClick={() => this.props.onMenuSelect(project.projectID)}>

							<div className="tooltip">{project.name}</div>
						</button>
						);
					})}
					<button><div className="tooltip">Log Out</div></button>
				</div>
				<div className="separator"></div>
			</React.Fragment>
		);
	}
}
