
/* newforum.js */

let converter
window.addEventListener('input', async event => {
  console.log('inputted')
	converter = new showdown.Converter({'tables': true, 'tasklists': true, 'strikethrough': true})
  const options = converter.getOptions()
  console.log(options)
console.log('change')
const markdown = document.querySelector("textarea[name='description']").value
console.log(markdown)
const html = converter.makeHtml(markdown)
console.log(html)
document.querySelector("article[name='markdownprev']").value = html
document.getElementById("markd").innerHTML = html
	
}) //kkas pa vidu



import { customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('NEWFORUM: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'newforum'
		customiseNavbar(['home', 'logout', 'newforum'])
		if(localStorage.getItem('authorization') === null) loadPage('login')
		// there is a token in localstorage
		node.querySelector('form').addEventListener('submit', await uploadData)
	} catch(err) {
		console.error(err)
	}
}

async function uploadData(event) {
	console.log('func UPLOAD DATA')
	event.preventDefault()
	const element = document.querySelector('input[name="file"]')
    const forum = event.target.querySelector('input[name="forum"]').value
   
    const summary = event.target.querySelector('textarea[name="Summary"]').value
  
    const otherdsec = event.target.querySelector('article[name="markdownprev"]').value 
    
	
	const file = document.querySelector('input[name="file"]').files[0]
	file.base64 = await file2DataURI(file)
	file.user = localStorage.getItem('username')
    file.Forum_name = forum
    file.Summary = summary
    file.Description = otherdsec
    
    // var tepat visu
	console.log(file)
	const url = '/api/v1/forums'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(file)
	}
    
    /*
     * const uri = "/api/v1/forums"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": localStorage.getItem('authorization'),
            
        },
       
    } 
     */
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
    
	showMessage('file uploaded')
	loadPage('home')
}
