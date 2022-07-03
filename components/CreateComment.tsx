import { FC, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import TextareaAutosize from 'react-textarea-autosize';
import { UserContext } from '../UserContext';
export const CreateComment: FC<{ postId: string }> = props => {
  const getCommentContent = (): string => {
    if (typeof window !== 'undefined') {
      return (document.getElementById('content') as HTMLInputElement)?.value;
    }
  };

  const mutation = gql`
    mutation createPost($postId: ID!, $author: ID!, $content: String!, $createdAt: String!) {
      createComment(postId: $postId, author: $author, content: $content, createdAt: $createdAt)
    }
  `;

  const { setValue } = useContext(UserContext);
  const [_submitComment, { data }] = useMutation(mutation);

  const submitComment = () => {
    if (getCommentContent().length !== 0) {
      _submitComment({ variables: { postId: props.postId, author: 'unknown', content: getCommentContent(), createdAt: new Date().getTime().toString() } }).then(() => setValue({ reloadCommentsList: true }));

      if (typeof window !== 'undefined') {
        (document.getElementById('content') as HTMLInputElement).value = '';
      }
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.which == '13') e.preventDefault();
    if (e.key === 'Enter') submitComment();
  };

  return (
    <div>
      <div className='grid grid-rows-[max-content_max-content] bg-zwav-gray-300 p-[8px] rounded-[8px] gap-y-[6px]'>
        <TextareaAutosize id='content' onKeyPress={e => handleKeyPress(e)} placeholder='say something...' className='bg-zwav-gray-400 rounded-[6px] pl-[4px] pr-[2px] outline-none text-white no-scrollbar resize-none' />
        <button onClick={() => submitComment()} className='w-[80px] rounded-[8px] transition ease-in-out bg-zwav-color hover:bg-zwav-color-hover duration-[0.25s]'>
          <h2 className='text-white'>comment</h2>
        </button>
      </div>
    </div>
  );
};
