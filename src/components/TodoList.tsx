import { useState, useEffect } from 'react'
import styles from './TodoList.module.css'

type Todo = {
  id: number
  title: string
  description: string
}
const defaultTodos: Todo[] = [
  { id: 1, title: 'Göra inluppgiften', description: 'hitta motivation' },
  { id: 2, title: 'Packa', description: 'Pa..cka!?' },
  { id: 3, title: 'Leva life', description: 'Chilla i solen' }
]

const LOCAL_STORAGE_KEY = 'todos'

export default function TodoList() {
 const [todos, setTodos] = useState<Todo[]>(() => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
  const parsed = saved ? JSON.parse(saved) : null
  return parsed && parsed.length > 0 ? parsed : defaultTodos
})

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function markAsDone(id: number) {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
   <div className={styles.todoContainer}>
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={styles.todoItem}>
          <strong>{todo.title}</strong>: {todo.description}
          <button onClick={() => markAsDone(todo.id)}>Klar</button>
        </li>
      ))}
    </ul>
  </div>
  )
}
