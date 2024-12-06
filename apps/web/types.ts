export type GroupChatType = {
  id: string;
  user_id: number;
  title: string;
  passcode: string;
  created_at: string;
  groupImage: string;
};

export type GroupChatUserType = {
  id: number;
  group_id: string;
  user_id: number;
  joined_at: string;
  user: UserType;
};

export type UserType = {
  id: number;
  name: string;
  image: string;
  email: string;
  bio: string;
  provider: string;
  oauth_id: string;
  created_at: string;
};

export type MessageType = {
  id: string;
  group_id: string;
  user_id: number;
  message: string;
  name: string;
  created_at: string;
  user?: UserType;
  LikedUsers: LikedUser[];
};

export type LikedUser = {
  id: number;
  message_id: string;
  user_id: number;
  username: string
  created_at: string;
};
