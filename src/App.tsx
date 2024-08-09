import { TodoComponent } from './components/todo.component'
import { TodosComponent } from './components/todos.component'
import { TodoProvider } from './providers/todo.provider'
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className='container'>
        <TodosComponent />
        <TodoComponent />
      </div>
    </TodoProvider>
  )
}

export default App
