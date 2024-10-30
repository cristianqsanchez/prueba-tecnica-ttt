import { createTodo } from '../actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function NewTodoForm() {
  return (
    <form action={createTodo} className="flex gap-2 mb-4">
      <Input
        name="name"
        type="text"
        min={3}
        required
        placeholder="Add a new todo"
        className="flex-grow"
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  )
}
