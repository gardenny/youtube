import React from 'react';

export default function CommentInfo({ comments }) {
  return (
    <>
      {comments &&
        comments.map(({ authorProfileImageUrl, authorDisplayName, likeCount, textOriginal }, index) => (
          <div className="flex mb-4" key={index}>
            <img className="w-10 h-10 rounded-full mr-4" src={authorProfileImageUrl} alt={authorDisplayName} />
            <div>
              <p className="font-medium mb-1">{authorDisplayName}</p>
              <p className="text-sm">{textOriginal}</p>
              <div className="flex items-center gap-x-2 mt-2">
                <img src="/icons/like.svg" alt="좋아요" />
                <span className="text-xs">{Number(likeCount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
