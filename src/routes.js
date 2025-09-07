import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

function taskNotFound(res) {
  return res.writeHead(404).end(JSON.stringify({ message: 'Task not found.' }))
}

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end(JSON.stringify({ message: 'Task created successfully' }))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: async (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const task = await database.select('tasks', { id })

      if (!task) {
        return taskNotFound(res)
      };

      database.update('tasks', id, {
        ...task,
        title: title ? title : task.title,
        description: description ? description : task.description,
        updated_at: new Date()
      })

      return res.writeHead(200).end(JSON.stringify({ message: 'Task updated successfully' }))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: async (req, res) => {
      const { id } = req.params

      const task = await database.select('tasks', { id })

      if (!task) {
        return taskNotFound(res)
      };

      database.delete('tasks', id)

      return res.writeHead(200).end(JSON.stringify({ message: 'Task deleted successfully' }))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id/complete'),
    handler: async(req, res) => {
      const { id } = req.params

      const task = await database.select('tasks', { id })

      if (!task) {
        return taskNotFound(res)
      }

      database.update('tasks', id, {
        ...task,
        completed_at: task.completed_at ? null : new Date()
      })

      return res.writeHead(200).end(JSON.stringify({ message: 'Task completion status updated successfully' }))
    }
  }
]