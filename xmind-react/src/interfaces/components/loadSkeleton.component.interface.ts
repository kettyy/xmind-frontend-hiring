import React from "react";

export interface LoadSkeletonProps {
  children: React.ReactNode;
  component?: React.ReactNode;
  /** 加载状态 */
  loading: boolean;
  /** 加载错误 */
  error?: {
    isError: boolean;
    onAgain: () => void;
  };
}
