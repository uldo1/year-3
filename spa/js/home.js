
/* home.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'foo', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
	} catch(err) {
		console.error(err)
	}
}

async function addContent(node) {
	const response = await fetch('/uploads/upload.json')
	const data = await response.json()
    console.log(data)
	const template = document.querySelector('template#quote')
	for(const index of data.forums) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = data.forums[index].forumname
		fragment.querySelector('p').innerText = data.forums[index].summary
        fragment.querySelector('time').innerText = data.forums[index].date
		node.appendChild(fragment)
	}
	
}
