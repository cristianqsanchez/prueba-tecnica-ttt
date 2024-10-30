export type TodoState = 'todo' | 'doing' | 'done'

export type Todo = {
  id: number
  name: string
  state: TodoState
  dueDate: Date
  updatedAt: string
}
