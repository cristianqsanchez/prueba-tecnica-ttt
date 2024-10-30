import { Todo, TodoState } from "./types"
import { fetchTodos } from "./actions"
import { TodoItem } from "./components/todo-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewTodoForm } from "./components/new-todo-form"

export default async function Page() {
  const todos = await fetchTodos()

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.state]) {
      acc[todo.state] = []
    }
    acc[todo.state].push(todo)
    return acc
  }, {} as Record<TodoState, Todo[]>)

  const stateColors: Record<TodoState, string> = {
    todo: 'bg-yellow-100 border-yellow-300',
    doing: 'bg-blue-100 border-blue-300',
    done: 'bg-green-100 border-green-300'
  }
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Todo List <span className="text-xs muted-foreground">{todos.length}</span></CardTitle>
      </CardHeader>
      <CardContent>
        <NewTodoForm />
       {(['todo', 'doing', 'done'] as TodoState[]).map(state => (
          <div key={state} className="mb-4">
            <h3 className="font-semibold mb-2 capitalize">{state} <span className='text-xs text-muted-foreground'>{groupedTodos[state]?.length ?? 0}</span></h3>
            <ul className="space-y-2">
              {groupedTodos[state]?.map(todo => (
                <li key={todo.id} className={`flex items-center gap-2 p-2 rounded border ${stateColors[todo.state]}`}>
                  <TodoItem todo={todo} />
               </li>
              ))}
            </ul>
            <hr className='w-full h-1' />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
