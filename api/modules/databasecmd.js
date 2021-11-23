
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function forums(){
    
	let sql = `SELECT id AS id,Forum_name,Summary,Description,Creator_username,Date_created FROM Forums`
	const forumsdb = await db.query(sql)
    console.log(forumsdb)
    return forumsdb
	
    
    
}

export async function register(credentials) {
	credentials.pass = await hash(credentials.pass, salt)
	const sql = `INSERT INTO accounts(user, pass) VALUES("${credentials.user}", "${credentials.pass}")`
	console.log(sql)
	const records = await db.query(sql)
	return true
}
