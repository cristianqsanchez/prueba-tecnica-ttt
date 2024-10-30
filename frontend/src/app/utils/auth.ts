import { cookies } from "next/headers"

const cookieStore = cookies()

export function getAuth() {
  const userAuth = cookieStore.get('authToken')?.value
  const userId = cookieStore.get('userId')?.value
  const userName = cookieStore.get('userName')?.value

  return { userAuth, userId, userName }
}

export function logout() {
  cookieStore.delete('authToken')
  cookieStore.delete('userId')
  cookieStore.delete('userName')
}
