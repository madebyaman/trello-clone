import React, { useState } from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from './styles';
import { useFocus } from './utils/useFocus';

type NewItemFormProps = {
  onAdd(text: string): void;
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(text);
  };

  return (
    <NewItemFormContainer onSubmit={handleSubmit}>
      <NewItemInput
        value={text}
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton type="submit">Create</NewItemButton>
    </NewItemFormContainer>
  );
};
