;
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'

import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { forums, saveforum, oneforum, forumcomments } from './modules/databasecmd.js'
import {forumcheck, forumschema, bothtogether} from './modules/schema.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/v1/forums', async context => {
	const host = context.request.url.host
	console.log("/api/v1/forums") 
    let forumsfromdb = await forums()
    console.log(forumsfromdb)
	forumsfromdb.forEach(forum => {
		forum.url = `https://${host}/api/v1/forums/${forum.id}`
		
	})
	context.response.body = JSON.stringify(forumsfromdb, null, 2)
})


router.post('/api/v1/forums', async context => {
	console.log('POST /v1/forums')
    const token = context.request.headers.get("Authorization")
    const credentials = extractCredentials(token)
    const username = credentials.user
    
    
    
	// get the data from the request body
	const body  = await context.request.body()
	let data = await body.value
    try{
        const validat = forumcheck(data)
        console.log(validat)
        if (validat === false) throw forumcheck.errors
        data.username = username
        const now = new Date().toISOString()
        const date = now.slice(0, 19).replace('T', ' ')
        data.Date_created = date
        // now i save it to db
        await saveforum(data)
        context.response.status = 201
        forumschema.data = data
        forumschema.errors = null
        context.response.body = JSON.stringify(forumschema)
        
    }catch(err) {
        console.log(err)
        context.response.status = 406
        forumschema.status = 406 
        forumschema.errors = forumcheck.errors
        console.log(forumschema)
        context.response.body = JSON.stringify(forumschema)
        
    }
            
})

router.get('/api/v1/forums/:id', async context => {
	console.log("Forum called")
	let forum = await oneforum(context.params.id)
   // one forum works getting comments below
    let comments = await forumcomments(context.params.id)
    
    bothtogether.forum = forum
    bothtogether.comments = comments
    console.log(bothtogether)
    context.response.body = JSON.stringify(bothtogether)
})












router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		saveFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		context.response.status = 400
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		)
	}
})

router.get("/(.*)", async context => {      
// 	const data = await Deno.readTextFile('static/404.html')
// 	context.response.body = data
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

export default router

