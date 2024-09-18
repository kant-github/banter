export type GroupChatType = {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;
  };
  
export type GroupChatUserType = {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
    isOnline?: boolean;
  };
  
 export type MessageType = {
    id: string;
    message: string;
    group_id: string;
    name: string;
    created_at: string;
  };
  