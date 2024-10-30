'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { BACKEND_URL } from './config'
 
export async function signin(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  await fetch(`${BACKEND_URL}/users`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => res.json())

  redirect('/login')
}

export async function login(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  const authTokenResponse = await fetch(`${BACKEND_URL}/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => res.json())

  const cookieStore = cookies()

  cookieStore.set({
    name: 'authToken',
    value: authTokenResponse.access_token
  })

  cookieStore.set({
    name: 'userId',
    value: authTokenResponse.id
  })

  cookieStore.set({
    name: 'userName',
    value: authTokenResponse.username
  })

  redirect('/tasks')
}
