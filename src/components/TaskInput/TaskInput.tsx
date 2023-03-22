import classNames from 'classnames/bind'
import styles from './taskInput.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

type Props = {
  addTodo: (name: string) => void
}

function TaskInput({ addTodo }: Props) {
  const [name, setName] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const hanleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    addTodo(name)
    setName('')
  }

  return (
    <>
      <form className={cx('form')}>
        <input
          className={cx('input')}
          type="text"
          placeholder="Caption goes here"
          value={name}
          onChange={handleInput}
        />
        <button onClick={hanleSubmit} className={cx('btn')}>
          +
        </button>
      </form>
    </>
  )
}

export default TaskInput
