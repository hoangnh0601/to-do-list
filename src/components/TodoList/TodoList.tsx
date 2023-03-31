import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import { Todo } from '../../@types/Todo.type'
import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import styles from './todoList.module.scss'

const cx = classNames.bind(styles)

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const todosDone = todos.filter((todo) => todo.done)
  const todosNotDone = todos.filter((todo) => !todo.done)

  // console.log(todos)

  useEffect(() => {
    const todosObj: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    }

    setTodos((prev) => {
      const result = [...prev, todo]

      localStorage.setItem('todos', JSON.stringify(result))
      return result
    })
  }

  const handleChangeCheckbox = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEdit = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id)
    if (foundTodo) setCurrentTodo(foundTodo)
  }

  const editingTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const submitEditTodo = () => {
    setTodos((prev) => {
      const result = prev.map((todo) => {
        if (todo.id === currentTodo?.id) return currentTodo
        return todo
      })
      localStorage.setItem('todos', JSON.stringify(result))

      return result
    })

    setCurrentTodo(null)
  }

  const delTodo = (id: string) => {
    if (currentTodo) setCurrentTodo(null)

    setTodos((prev) => {
      const result = prev.filter((todo) => todo.id !== id)
      localStorage.setItem('todos', JSON.stringify(result))

      return result
    })
  }

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>To do list</h1>
      <TaskInput
        addTodo={addTodo}
        currentTodo={currentTodo}
        editingTodo={editingTodo}
        submitEditTodo={submitEditTodo}
      />
      <TaskList
        todos={todosNotDone}
        onChangeCheckbox={handleChangeCheckbox}
        startEdit={startEdit}
        delTodo={delTodo}
      />
      <TaskList
        taskDone
        todos={todosDone}
        onChangeCheckbox={handleChangeCheckbox}
        startEdit={startEdit}
        delTodo={delTodo}
      />
    </div>
  )
}

export default TodoList
