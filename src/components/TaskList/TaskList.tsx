import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Todo } from '../../@types/Todo.type'
import styles from './taskList.module.scss'
import todoPropTypes from '../PropTypes/todo.proptypes'

const cx = classNames.bind(styles)

type Props = {
  taskDone?: boolean
  todos: Todo[]
  onChangeCheckbox: (id: string, done: boolean) => void
  startEdit: (id: string) => void
  delTodo: (id: string) => void
}

function TaskList({
  taskDone,
  todos,
  onChangeCheckbox,
  startEdit,
  delTodo,
}: Props) {
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
              id={`task ${todo.id}`}
              checked={todo.done}
              onChange={(e) => onChangeCheckbox(todo.id, e.target.checked)}
            />
            <label
              htmlFor={`task ${todo.id}`}
              className={cx('task-name', { done: todo.done })}
            >
              {todo.name}
            </label>
          </div>
          <div className={cx('action')}>
            <button
              onClick={() => startEdit(todo.id)}
              className={cx('action-btn')}
            >
              ✍️
            </button>
            <button
              onClick={() => delTodo(todo.id)}
              className={cx('action-btn')}
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

TaskList.propTypes = {
  taskDone: PropTypes.bool,
  todos: PropTypes.arrayOf(todoPropTypes).isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}

export default TaskList
