/* each array of objects separate table? */
/* contributors - short arrays converted to string, parsed on recieve? */
/* separate IDs for different kinds of arrays */
const date = new Date()
const dateString = `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()} `
export const FlatData = {
	dialog: {
		show: false/* ack, bin. txt */
	},
	selectedProject: 0,
	projects: [
		{name: 'Alpha One', created: dateString, owner: 'Chad', contributors: 'Anna, Rhod, Amelia', ico: "plane", projectID: 1},
		{name: 'Beta Two', created: dateString, owner: 'Jan', contributors: 'Sasha, Tyis', ico: "boat", projectID: 2},
		{name: 'Tres Pesos', created: dateString, owner: 'Rach', contributors: 'Anna, Tim, Amelia', ico: "medal", projectID: 3},
	],

	tasks: [
		{projectID: 1, name: 'task number one', taskID: 1},
		{projectID: 1, name: 'task number two', taskID: 2},
		{projectID: 2, name: 'assignment 1', taskID: 3},
		{projectID: 2, name: 'obnoxiously long name for assignment 2', taskID: 4},
		{projectID: 2, name: 'assignment 3', taskID: 5},
		{projectID: 3, name: 'task tres', taskID: 6},
	],

	steps: [
		{taskID: 1, id: 1, done: true, name: 'Lorem', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 2, id: 2, done: false, name: 'Ipsum', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 2, id: 3, done: true, name: 'asdfasdf multiline nonsense', notes: ["note to description one", "second note, a nit longer...", "second note, a nit longer..."]},
		{taskID: 3, id: 4, done: false, name: 'Dolor', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 4, id: 5, done: true, name: 'met sit amet',  notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 4, id: 6, done: true, name: 'something', notes: ["note to description one", "second note, a nit longer...", "another one...", 'aaand another one this time two rows note']},
		{taskID: 4, id: 7, done: true, name: 'fuck', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 4, id: 8, done: true, name: 'met sit amet',  notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 4, id: 9, done: true, name: 'something', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 4, id: 10, done: true, name: 'fuck', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 5, id: 11, done: false, name: 'twat', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 5, id: 12, done: false, name: 'bitch', notes: ["note to description one", "second note, a nit longer..."]},
		{taskID: 6, id: 13, done: false, name: 'arse', notes: ["note to description one", "second note, a nit longer..."]},
	]

}