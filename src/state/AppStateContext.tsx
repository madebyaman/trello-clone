import React, { createContext, useContext, Dispatch, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import { appStateReducer, AppState, List, Task } from './appStateReducer';
import { Action } from './actions';
import { DragItem } from '../DragItem';

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use Static typing' }],
    },
  ],
  draggedItem: null,
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
