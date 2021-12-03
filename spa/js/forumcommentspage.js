
/* home.js */
let converter
window.addEventListener('input', async event => {
  console.log('inputted')
	converter = new showdown.Converter({'tables': true, 'tasklists': true, 'strikethrough': true})
  const options = converter.getOptions()
  console.log(options)
console.log('change')
const markdown =  document.querySelector("textarea[name='commentarea']").value
console.log(markdown)
const html = converter.makeHtml(markdown)
console.log(html)
document.querySelector("article[name='markdownpreview']").value = html
document.getElementById("markd").innerHTML = html
	
})





import { customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'


export async function setup(node) {
	console.log('forumspage: setup')
	try {
        if(localStorage.getItem('authorization') === null) loadPage('login')
		console.log(node)
		document.querySelector('header p').innerText = 'comment and oneforum'
		customiseNavbar(['home', 'logout', 'newforum'])
		
		await addContent(node)
        node.querySelector("form[name='uploadcom']").addEventListener('submit', await uploadData)
		
	} catch(err) {
		console.error(err)
	}
    
}

async function addContent(node) {
    console.log("calling add content")
    const uripar = new URLSearchParams(window.location.search)
    const forumidparam = uripar.get('forum')
    const uri = `/api/v1/forums/${forumidparam}`
    console.log(uri)
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": localStorage.getItem('authorization'),
            
        },
       
    }
    
  const response = await fetch(uri, options)
  let jsondata = await response.json()
  console.log(jsondata)
  
    
    const template = document.querySelector('template#forumdetails')
    const fragment = template.content.cloneNode(true)
    
    const section = document.createElement('section')
	const avatar = document.createElement("img")
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const pd = document.createElement('p')
    const des = document.createElement('article')
    const linebreak = document.createElement('br');
    const uploads = "/uploads/"
    const pathtoimg =jsondata.forum[0].Image_name
    const alltogether = String(uploads+pathtoimg)

    avatar.src = alltogether
	h2.innerText = jsondata.forum[0].Forum_name
	p.innerText = jsondata.forum[0].Summary
    des.innerHTML = jsondata.forum[0].Description
    pd.innerText = jsondata.forum[0].Date_created
    section.appendChild(h2)
    section.appendChild(avatar)
    section.appendChild(p)
	section.appendChild(pd)
    section.appendChild(des)
    
	fragment.appendChild(section)
    node.appendChild(fragment)
    

    console.log(jsondata.comments)
    
	
    jsondata.comments.forEach( quote => {
    
    const comfragment = template.content.cloneNode(true)
	const comsection = document.createElement('section')
	const linebreak = document.createElement('br');
    const art = document.createElement('article')
    const dp = document.createElement('p')
    const poster = document.createElement('p')
    console.log(poster)
    
	art.innerHTML = quote.Comment
    dp.innerText = quote.Date_posted
    poster.innerText = quote.Poster_username
   
    comsection.appendChild(art)
	comsection.appendChild(dp)
    comsection.appendChild(poster)
    comsection.appendChild(linebreak);
	comfragment.appendChild(comsection)
    node.appendChild(comfragment)    
})

// adding the form at the end
    
const templateform = document.querySelector('template#commentform')
const fragmentform = templateform.content.cloneNode(true)
node.appendChild(fragmentform)
    
    
}



async function uploadData(event) {
	console.log('func UPLOAD Comment')
	event.preventDefault()
    const uripar = new URLSearchParams(window.location.search)
    const forumidparam = uripar.get('forum')
    const uricom = `/api/v1/forums/${forumidparam}`
	console.log(uricom)
    
    
    const altcom = document.querySelector("article[name='markdownpreview']").value
    console.log(altcom)
    const otherdsec = event.target.querySelector('article[name="markdownpreview"]').value 
    console.log(otherdsec)
	let file = {    
    }
    file.Comment = otherdsec
    
    console.log(file.Comment)
    
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(file)
	}
    
   
	const responsecom = await fetch(uricom, options)
	console.log(responsecom)
	const jsonrsp = await responsecom.json()
	console.log(jsonrsp)
    
	loadPage('home')
    
}






