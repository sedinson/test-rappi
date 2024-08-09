import { Typography } from "@mui/material";
import { useTodo } from "../providers/todo.provider";

export function TodoComponent() {
  const { user, todo } = useTodo();

  if (!todo) return null;

  return (
    <div>
      <Typography>
        <b>{user?.name}</b>
        {user?.email}
      </Typography>
      <Typography>
        {todo?.title}
        <span>
          {todo?.completed ? 'Completada' : 'Pendiente'}
        </span>
      </Typography>
    </div>
  );
}