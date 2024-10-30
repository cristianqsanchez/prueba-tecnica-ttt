'use client'
import { Todo, TodoState } from '../types'
import { removeTodo, updateTodo } from '../actions'
import { formatDistanceToNow } from "date-fns"
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Trash2, Calendar } from 'lucide-react'

type Props = {
  todo: Todo
}

export function TodoItem({ todo }: Props) {
  return (
    <>
      <span className="flex-grow">{todo.name}</span>
      <Select
        value={todo.state}
        onValueChange={(value: TodoState) => updateTodo({ ...todo, state: value })}
      >
        <SelectTrigger className="bg-transparent w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="doing">Doing</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button className='bg-transparent' variant='ghost' size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent
            disabled={{ before: new Date() }}
            mode="single"
            selected={todo.dueDate || undefined}
            onSelect={(date) => {
              if (!date) return
              updateTodo({ ...todo, dueDate: date })
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {todo.dueDate && (
        <span className="text-sm text-muted-foreground">
          Due: {formatDistanceToNow(todo.dueDate)}
        </span>
      )}
      <Button variant="ghost" size="icon" onClick={async () => await removeTodo(todo.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>

    </>
  )
}
