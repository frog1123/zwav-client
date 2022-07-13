import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { UserContext } from 'UserContext';

import { Comment } from '@components/Comment';

export const CommentsList: FC = () => {
  const query = gql`
    query ($id: ID!, $commentsLimit: Int!, $commentsOffset: Int!) {
      post(id: $id, commentsLimit: $commentsLimit, commentsOffset: $commentsOffset) {
        content
        createdAt
        comments {
          author {
            id
            username
          }
          content
          createdAt
        }
      }
    }
  `;

  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { value, setValue } = useContext(UserContext);

  const { error, loading, data, refetch, fetchMore } = useQuery(query, { variables: { id: useRouter().query.id, commentsLimit: limit, commentsOffset: 0 }, fetchPolicy: 'cache-and-network' });

  if (error)
    return (
      <div className='flex justify-center'>
        <h1 className='text-white'>something went wrong :/</h1>
      </div>
    );

  if (loading)
    return (
      <div className='flex justify-center'>
        <h1 className='text-white'>loading...</h1>
      </div>
    );

  const fetchMoreComments = () => {
    return fetchMore({
      variables: {
        commentsLimit: limit,
        commentsOffset: offset + limit
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.post.comments.length !== 0) setOffset(offset + 10);
        return Object.assign({}, prev, {
          post: Object.assign({}, prev.post, {
            comments: [...prev.post.comments, ...fetchMoreResult.post.comments]
          })
        });
      }
    });
  };

  if (value.reloadCommentsList) refetch().then(() => setValue({ reloadCommentsList: false }));
  if (value.fetchMoreCommentsList) fetchMoreComments().then(() => setValue({ fetchMoreCommentsList: false }));

  return (
    <>
      {data.post.comments.length > 0 ? <div className='bg-zwav-gray-100 h-[2px] w-[100%] mt-[4px] rounded-[1px]'></div> : ''}
      <div className='pl-[4px] pr-[4px]'>
        {data.post.comments.map((comment: any, index: number) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </>
  );
};
