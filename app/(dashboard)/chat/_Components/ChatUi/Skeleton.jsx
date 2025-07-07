import React from "react";
import skeletonStyles from "./Skeleton.module.css";

const ChatSkeleton = () => {
  const skeletonMessages = new Array(20).fill(0);

  return (
    <div className={skeletonStyles.chatSkeletonWrapper}>
      {/* Header */}
      <div className={skeletonStyles.skeletonHeader}></div>

      {/* Messages */}
      <div className={skeletonStyles.skeletonChatBody}>
        {skeletonMessages.map((_, i) => (
          <div
            key={i}
            className={`${skeletonStyles.skeletonMessage} ${
              i % 2 === 0 ? skeletonStyles.received : skeletonStyles.sent
            }`}
          >
            <div className={skeletonStyles.skeletonSender}></div>
            <div className={skeletonStyles.skeletonBubble}></div>
            <div className={skeletonStyles.skeletonTime}></div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={skeletonStyles.skeletonInputBar}>
        <div className={skeletonStyles.skeletonInputIcon}></div>
        <div className={skeletonStyles.skeletonInput}></div>
        <div className={skeletonStyles.skeletonSendIcon}></div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
