/* ajv 6.12.2: Another JSON Schema Validator */
import Ajv from './ajv.js'
const ajv = new Ajv({allErrors: true})



export const forumcheck = ajv.compile({
    type: "object",
    properties: {
        Forum_name: {
        type: "string",
        minLength: 2,
        maxLenght: 20
    }, 
  Summary: {
        type: "string",
        minLength: 2,
        
    },
  Description: {
      type:"string",
      minLength: 2,    
}, 
  base64: {
      type: "string",
      
},
        
        
    },
   required: ['Forum_name','Summary','Description'] 
    
})

export const commentcheck = ajv.compile({
    type: "object",
    properties: {
        Comment: {
        type: "string",
        minLength: 2    
    },      
    },
   required: ['Comment'] 
    
})



export let forumschema = {
    jsonapi: {
        version: '1.0'
    },
    methods: ['GET','POST'],
    name: 'forums',
    desc: 'All the forums created',
    schema: {       
  Forum_name: 'string',
  Summary: 'string',
  Description: 'string',
  Creator_username: 'string',
  id: 'number',
  Date_created: 'ISO8601 string',
  Image_name: 'string',
  url: 'string',       
    }
        
}

export let bothtogether = { 
    jsonapi: {
        version: '1.0'
    },
    methods: ['GET','POST'],
    name: 'comments',
    desc: 'All the forum comments created',
    schema: {
  Comment: 'string',
  Poster_username: 'string',
  id: 'number',
  Date_posted: 'ISO8601 string',
  forum_id: 'number',
  
        
}
    
    
}