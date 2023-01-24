import { useRef } from 'react'
import './App.css'
import { useDeleteTodoMutation, useGetAllTodosQuery, usePostTodoMutation, useUpdateTodoMutation } from './redux/services/todoApi'

function App() {
  const ref = useRef()
  const { data, isLoading } = useGetAllTodosQuery()
  const [postTodo, { isLoading: isCreating }] = usePostTodoMutation()
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  if (isLoading) return 'Loading...'

  const handleSave = () => {
    const data = {
      todoName: ref.current.value,
      isComplete: false
    }
    postTodo(data)
    ref.current.value = ''
  }

  const handleChecked = (id, valueComplete) => {
    const data = {
      isComplete: !valueComplete
    }
    updateTodo({ id, data })
  }

  return (
    <div className='App'>
      <h2>TODO APP</h2>
      <input ref={ref} type='text' />
      <button onClick={handleSave}>Add Todo</button>
      <div class='content-container'>
        {data && data.map(({ todoName, isComplete, _id }, i) => (
          <div key={i}>
            <p className='contents'>
              <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>{todoName}</span>
              <span>
                <input type='checkbox' checked={isComplete ?? false} onChange={() => handleChecked(_id, isComplete)} />
                <i className="fa-solid fa-trash" onClick={() => deleteTodo(_id)}></i>
              </span>
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
