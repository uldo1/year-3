
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function forums(){
    
	let sql = `SELECT id,Forum_name,Summary,Description,Creator_username,Date_created,Image_name FROM Forums`
	const forumsdb = await db.query(sql)
    console.log(forumsdb)
    return forumsdb
	    
}

export async function saveforum(data) {
	
	const sql = `INSERT INTO Forums(Forum_name,Summary,Description,Image_name,Creator_username,Date_created) VALUES("${data.Forum_name}", "${data.Summary}", "${data.Description}", "${data.Image_name}","${data.username}", "${data.Date_created}")`
	console.log(sql)
	const records = await db.query(sql)
	return true
}


