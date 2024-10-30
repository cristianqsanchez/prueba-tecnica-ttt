'use server'

import { revalidatePath } from "next/cache"
import { Todo } from "./types"
import { getAuth } from "@/app/utils/auth"
import { BACKEND_URL } from "@/app/config"

const { userAuth } = getAuth()

export async function createTodo(formData: FormData) {
  const todoName = formData.get('name')

  await fetch(`${BACKEND_URL}/tasks`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userAuth}`
    },
    method: 'POST',
    body: JSON.stringify({
      name: todoName,
    })
  })

  revalidatePath('/tasks')
}

export async function fetchTodos() {
  const todos = await fetch(`${BACKEND_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${userAuth}`}
  }).then(res => res.json())

  return todos as Todo[]
}

export async function removeTodo(todoId: number) {
  await fetch(`${BACKEND_URL}/tasks/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userAuth}`
    },
    method: 'DELETE',
  })

  revalidatePath('/tasks')
}

export async function updateTodo(todo: Todo) {
  await fetch(`${BACKEND_URL}/tasks/${todo.id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userAuth}`
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  })

  revalidatePath('/tasks')
}
