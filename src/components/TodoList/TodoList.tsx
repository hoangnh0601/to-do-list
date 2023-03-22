import classNames from 'classnames/bind'
import styles from './todoList.module.scss'
import { useState } from 'react'

import { TaskInput } from '../TaskInput'
import { TaskList } from '../TaskList'
import { Todo } from '../../@types/Todo.type'

const cx = classNames.bind(styles)

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const todosDone = todos.filter((todo) => todo.done)
  const todosNotDone = todos.filter((todo) => !todo.done)

  console.log(todos)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    }

    setTodos((prev) => [...prev, todo])
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
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>To do list</h1>
      <TaskInput addTodo={addTodo} />
      <TaskList todos={todosNotDone} onChangeCheckbox={handleChangeCheckbox} />
      <TaskList
        taskDone
        todos={todosDone}
        onChangeCheckbox={handleChangeCheckbox}
      />
    </div>
  )
}

export default TodoList
