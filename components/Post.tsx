import type { FC } from 'react';

export const Post: FC<{ title: string; content?: string }> = props => {
  return (
    <div className='bg-zinc-800 rounded-[8px] mb-[6px] p-[10px] break-words'>
      <h1 className='text-white'>{props.title}</h1>
      <h1 className='text-white'>{props.content}</h1>
    </div>
  );
};
