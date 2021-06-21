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
					<button><div className="tooltip">Add Project</div></button>
					{this.props.projects.map((project) => {
						return (
						<button
							className={project.ico + " workgroup"}
							key={this.props.projects.indexOf(project)}
							onClick={() => this.props.onMenuSelect(this.props.projects.indexOf(project))}>

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
