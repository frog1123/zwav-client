import Twemoji from 'react-twemoji';

export const parseTwemoji = (content: any, cursor: string) => {
  return (
    <Twemoji noWrapper={true} options={{ className: `twemoji !cursor-${cursor}` }}>
      <span>{content}</span>
    </Twemoji>
  );
};
