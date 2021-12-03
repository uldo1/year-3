
/* home.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'newforum', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
        
    await addContent(node)
	}catch(err) {
		console.error(err)
	}
    
}

async function addContent(node) {
    console.log("calling add content")
    const uri = "/api/v1/forums"
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": localStorage.getItem('authorization'),
            
        },
       
    }
    
  const response = await fetch(uri, options)
  let jsondata = await response.json()
  
    
    const template = document.querySelector('template#forumdetails')
    
    
	
    jsondata.forEach( quote => {
    
    const fragment = template.content.cloneNode(true)
	const section = document.createElement('section')
	const avatar = document.createElement("img")
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const pd = document.createElement('p')
    
    const forumlink = document.createElement('a')
    
    const uploads = "/uploads/"
    const pathtoimg =quote.Image_name
    const alltogether = String(uploads+pathtoimg)
    
    forumlink.innerText = "Show forum"
    forumlink.href = `/forumcommentspage?forum=${quote.id}`
    
    avatar.src = alltogether
    avatar.setAttribute("width","50")
    avatar.setAttribute("height","50")  
	h2.innerText = quote.Forum_name
	p.innerText = quote.Summary
    if (quote.commdate != null){
      pd.innerText = quote.commdate  
    }else{
       pd.innerText = quote.Date_created 
    }
       
    section.appendChild(h2)
    section.appendChild(avatar)
    section.appendChild(p)
	section.appendChild(pd)
   
    section.appendChild(forumlink)
	
    fragment.appendChild(section)
    node.appendChild(fragment)    
})
	
}



