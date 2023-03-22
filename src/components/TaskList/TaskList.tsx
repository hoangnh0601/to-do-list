import classNames from 'classnames/bind'
import styles from './taskList.module.scss'
import { Todo } from '../../@types/Todo.type'

const cx = classNames.bind(styles)

type Props = {
  taskDone?: boolean
  todos: Todo[]
  onChangeCheckbox: (id: string, done: boolean) => void
}

function TaskList({ taskDone, todos, onChangeCheckbox }: Props) {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>
        {taskDone ? 'Hoàn thành' : 'Chưa hoàn thành'}
      </h2>
      {todos.map((todo) => (
        <div className={cx('task-wrapper')} key={todo.id}>
          <div className={cx('task')}>
            <input
              className={cx('check-box')}
              type="checkbox"
              id="task"
              checked={todo.done}
              onChange={(e) => onChangeCheckbox(todo.id, e.target.checked)}
            />
            <label
              htmlFor="task"
              className={cx('task-name', { done: todo.done })}
            >
              {todo.name}
            </label>
          </div>
          <div className={cx('action')}>
            <button className={cx('action-btn')}>✍️</button>
            <button className={cx('action-btn')}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
