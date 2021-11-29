
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
    forumlink.href = `/forumcommentspage?forum=${quote.id} `
    
    avatar.src = alltogether
    avatar.setAttribute("width","50")
    avatar.setAttribute("height","50")  
	h2.innerText = quote.Forum_name
	p.innerText = quote.Summary
    pd.innerText = quote.Date_created
    section.appendChild(h2)
    section.appendChild(avatar)
    section.appendChild(p)
	section.appendChild(pd)
   
        section.appendChild(forumlink)
	
        fragment.appendChild(section)
    node.appendChild(fragment)    
})


//node.appendChild(fragment)
    
    
    
    //is not iterable 
   /* for(const index of jsondata.forums) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = jsondata.forums[index].Forum_name
		fragment.querySelector('p').innerText = jsondata.forums[index].Summary
		node.appendChild(fragment)
	}
    */
	/*for(const index of jsondata.forums) {
		h2.innerText = forums.Forum_name
        sumar.innerText = forums.Summary
        
        section.appendChild(h2)
		section.appendChild(sumar)
        section.appendChild(section)
		node.appendChild(fragment) 
	}*/
	
}



