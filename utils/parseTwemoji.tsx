import Twemoji from 'react-twemoji';

export const parseTwemoji = (content: any) => {
  return (
    <Twemoji noWrapper={true} options={{ className: 'twemoji' }}>
      <span>{content}</span>
    </Twemoji>
  );
};
