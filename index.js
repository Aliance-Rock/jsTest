class UserService {
	username
	password
	constructor(username, password) {
		this.username = username
		this.password = password
	}
	get username() {
		return this.username
	}
	get password() {
		throw 'You are not allowed get password!'
	}
	static authenticate_user(username, password) {
		return new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest()
			xhr.open(
				'GET',
				'https://jsonplaceholder.typicode.com/users', //authenticate?username=' +	username + '&password=' +	password,
				true
			)
			xhr.responseType = 'json'
			xhr.setRequestHeader('Content-Type', 'application/json')
			xhr.onload = function () {
				if (xhr.status !== 200) {
					if (reject) console.log('Это провал!!!!', xhr.response)
				} else {
					console.log('Это победа!):', xhr.response)
					resolve(xhr.response)
				}
			}
			xhr.onerror = function () {
				console.log('Something went wrong in static method!')
			}

			xhr.send()
		})
	}
}

$('#login').click(function logIn() {
	let username = $('#username').val()
	let password = $('#password').val()
	let res = UserService.authenticate_user(username, password)
	if (res === true) {
		document.location.href = '/home'
	} else {
		alert('Да не уже ли работает: ошибка!!!!)))')
	}
})

let userService = new UserService('qqwert', 123)
console.log('Username:', userService.username)
console.log('Password:', userService.password)
console.log(UserService.authenticate_user())
