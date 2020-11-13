

class Users {

	constructor(){
		this.people = [];
	}

	addUser(id,name,chat){

		let user ={id,name,chat}

		this.people.push(user);

		return this.people;
	}

	getUser(id){

		let user= this.people.filter( user => user.id === id)[0];

		return user
	}

	getUsers(){
		return this.people;
	}


	getUserChat(chat){

		let userByChat =this.people.filter(user => userchat=== chat);

		return userByChat;

	}

	deleteUser(id){

		let userDelete = this.getUser(id);
		this.people = this.people.filter(user=> user.id != id);

		return userDelete
	}


}

module.exports = {
	Users
}