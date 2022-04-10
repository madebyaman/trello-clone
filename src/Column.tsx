import { ColumnContainer, ColumnTitle } from './styles';
import { FC } from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { Card } from './Card';
import { addTask } from './state/actions';

type ColumnProps = {
  text: string;
  children?: React.ReactNode;
  id: string;
};

export const Column: FC<ColumnProps> = ({ id, text, children }) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
