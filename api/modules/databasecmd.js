
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function forums(){
    
	let sql = `SELECT id,Forum_name,Summary,Description,Creator_username,DATE_FORMAT(Date_created,'%Y-%m-%d') AS Date_created,Image_name FROM Forums`
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

export async function oneforum(data){
    console.log(data)
	let sql = `SELECT Forum_name,Summary,Description,Creator_username,DATE_FORMAT(Date_created,'%Y-%m-%d') AS Date_created,Image_name FROM Forums WHERE id = ${data};`
	const oneforumdb = await db.query(sql)
    console.log(sql)
    return oneforumdb
	    
}

export async function checkifforumexists(data){
    console.log(data)
	let sql = `SELECT Forum_name,Summary,Description,Creator_username,Date_created,Image_name FROM Forums WHERE id = ${data};`
	const oneforumdb = await db.query(sql)
    let checklength  = oneforumdb.length
    if (checklength <= 0) {
        throw 'No forum with that id!'
    }
    return checklength
	    
}
export async function forumcomments(data){
    
	console.log(data)
	let sql = `SELECT Comment_id,Comment,Poster_username,DATE_FORMAT(Date_posted,'%Y-%m-%d') AS Date_posted FROM Comments WHERE forum_id = ${data};`
	const comments = await db.query(sql)
    
    return comments
	    
}


export async function savecomment(data) {
	
	const sql = `INSERT INTO Comments(Comment,Poster_username,Date_posted,forum_id) VALUES('${data.Comment}', "${data.username}", "${data.Date_created}", ${data.forum_id})`
	console.log(sql)
	const records = await db.query(sql)
	return true
}
