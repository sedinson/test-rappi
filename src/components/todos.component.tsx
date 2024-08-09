import { Button, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { ToDo, useTodo } from "../providers/todo.provider";

export function TodosComponent() {
  const { todos, onSelectToDo, onSearch, onSort } = useTodo();

  const handleSelectToDo = (todo: ToDo) => {
    onSelectToDo(todo);
  }

  const handleSort = () => {
    onSort();
  }

  const handleSearch = (event: any) => {
    onSearch(event.target.value);
  }

  return (
    <div>
      <input type="text" onChange={handleSearch} />
      <Button onClick={handleSort}>
        Sort
      </Button>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todos.map((todo) => (
          <ListItemButton alignItems="flex-start" key={todo.id} onClick={() => handleSelectToDo(todo)}>
            <ListItemText
              primary={todo.title}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {todo.completed ? 'Completado' : 'Pendiente'}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}