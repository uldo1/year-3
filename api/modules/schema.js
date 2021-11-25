/* ajv 6.12.2: Another JSON Schema Validator */
import Ajv from './ajv.js'
const ajv = new Ajv(allErrors: true)



export const forumcheck = ajv.compile({
    properties: {
        Forum_name{
        type: "string",
        minLength: 2,
        maxLenght: 20,
    }, 
  Summary: {
        type: "string",
        minLength: 2,
        
    },
  Description: {
      type:"string"
      minLength: 2,    
}, 
  Avatar_path: {
      type: "string",
      minLength: 3,
},
        
        
    },
   required: ['Summary','Description','Avatar_path'] 
    
}
)

export let forumschema = {
    jsonapi:{
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
  Avatar_path: 'string',
  url: 'string',
        
    },
    
    
    
    
}