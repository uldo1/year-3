
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
  console.log(jsondata)
    
    const template = document.querySelector('template#forumdetails')
    const fragment = template.content.cloneNode(true)
    /*const section = document.createElement('section')
    const h2 = document.createElement('h2')
    const sumar = document.createElement('p')*/
	
    jsondata.forEach( quote => {
	const section = document.createElement('section')
	const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const pd = document.createElement('p')
   
	h2.innerText = quote.Forum_name
	p.innerText = quote.Summary
    pd.innerText = quote.Date_created
    section.appendChild(h2)
    section.appendChild(p)
	section.appendChild(pd)    
	fragment.appendChild(section)
})

console.log(fragment)
node.appendChild(fragment)
    
    
    
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



