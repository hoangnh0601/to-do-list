import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { useState } from 'react'

import { Todo } from '../../@types/Todo.type'
import todoPropTypes from '../PropTypes/todo.proptypes'

import styles from './taskInput.module.scss'

const cx = classNames.bind(styles)

type Props = {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editingTodo: (name: string) => void
  submitEditTodo: () => void
}

function TaskInput({
  addTodo,
  currentTodo,
  editingTodo,
  submitEditTodo,
}: Props) {
  const [name, setName] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editingTodo(e.target.value)
    } else {
      setName(e.target.value)
    }
  }

  const hanleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (currentTodo) {
      submitEditTodo()
      setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  return (
    <>
      <form className={cx('form')}>
        <input
          className={cx('input')}
          type="text"
          placeholder="Caption goes here"
          value={currentTodo ? currentTodo.name : name}
          onChange={handleInput}
        />
        <button onClick={hanleSubmit} className={cx('btn')}>
          {currentTodo ? '✓' : '+'}
        </button>
      </form>
    </>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([todoPropTypes, PropTypes.oneOf([null])]),
  editingTodo: PropTypes.func.isRequired,
  submitEditTodo: PropTypes.func.isRequired,
}
export default TaskInput
