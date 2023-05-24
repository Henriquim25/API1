const knex = require('../database/knex')

class NotesController{

  async create(request,response){
    const {title , description ,tags ,links} = request.body
    const {user_id:userId} = request.params

    const user = await knex('users').where('id',userId).first()
    if(!user)
      return response.status(404).json({
        error: 'User Not Found'
      })
    
    const noteId = await knex("notes").insert({
      title,
      description,
      user_id:user.id,
    })

    const linksInserted = await Promise.all(links.map(link => knex('links').insert({
      note_id:noteId,
      url: link,
    })
  ))

    return response.json({linksInserted})

    const tagsInsert = tags.map(name =>{
      return {
        note_id,
        name,
        user_id,
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()
  }

  async show(request,response){
    const {id} = request.params

    const note = await knex('notes').where({id }).first()
    const tags = await knex('tags').where({note_id:id }).orderBy('name')
    const links = await knex('links').where({note_id:id }).orderBy('created_at')

    return response.json({
      ...note,
      tags,
      links
    })
  }

  async delete(request , response){
    const {id} = request.params
    
    await knex("notes").where({id}).delete()

    return response.json()
  }
}
module.exports = NotesController