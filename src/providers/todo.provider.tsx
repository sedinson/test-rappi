import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

interface TodoProps {
  children: ReactNode;
}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: unknown,
  phone: string,
  website: string,
  company: unknown;
}

export interface ContextToDo {
  todos: ToDo[];
  todo?: ToDo;
  user?: User;
  onSelectToDo: (todo: ToDo) => void;
  onSearch: (value: string) => void;
  onSort: () => void;
}

const DEFAULT_DATA: ContextToDo = {
  todos: [],
  onSelectToDo: () => null,
  onSearch: () => null,
  onSort: () => null,
};

const Context = createContext<ContextToDo>(DEFAULT_DATA);

export function TodoProvider({children}: TodoProps) {
  const [allTodos, setAllTodos] = useState<ToDo[]>([]);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [todo, setTodo] = useState<ToDo | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const onSelectToDo = useCallback((todo: ToDo) => setTodo(todo), []);
  const onSort = useCallback(() => {
    setTodos((prev) => [...prev].sort((a) => a.completed ? -1 : 1));
  }, []);

  const onSearch = useCallback((value: string) => {
    setTodos(
      allTodos.filter((todo) => todo.title.includes(value)),
    );
  },  [allTodos]);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((res) => res.json())
      .then((data) => {
        setAllTodos(data);
        setTodos(data);
      });
  }, []);

  useEffect(() => {
    if (!todo?.userId) return;

    fetch(`https://jsonplaceholder.typicode.com/users/${todo?.userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [todo?.userId]);

  return (
    <Context.Provider value={{ todos, todo, user, onSelectToDo, onSort, onSearch }}>
      {children}
    </Context.Provider>
  )
}

export const useTodo = () => useContext(Context);
