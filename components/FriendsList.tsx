import { parseTwemoji } from '@utils/parseTwemoji';
import type { FC } from 'react';

export const FriendsList: FC = () => {
  const users = [
    { username: 'dave', pfp: 'https://vignette.wikia.nocookie.net/berd/images/d/dd/Goose.png/revision/latest?cb=20200418070559' },
    { username: 'billy', pfp: 'https://vignette.wikia.nocookie.net/berd/images/d/dd/Goose.png/revision/latest?cb=20200418070559' }
  ];

  return (
    <div className='sticky top-[80px] bg-zwav-gray-300 p-[4px] rounded-[8px]'>
      <h1 className='text-white text-center'>friends</h1>
      <div className='h-[2px] bg-zwav-gray-100 mt-[1px] mb-[3px]'></div>
      {users.map(({ username, pfp }, index) => (
        <div key={index} className='grid grid-cols-[max-content_max-content] gap-x-[6px] p-[4px]'>
          <img src={pfp} className='rounded-[50%] object-cover aspect-square select-none' height='40px' width='40px' />
          <h2 className='text-white self-center mr-[auto]'>{parseTwemoji(username)}</h2>
        </div>
      ))}
    </div>
  );
};
