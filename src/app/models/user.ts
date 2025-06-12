import { UserProperty } from "./user-property";

export class User {
  id: number = 0;
  username?: string = "";
  email?: string = "";
  password?: string = "";
  workspaceId?: number = 0;
  firstName?: string = "";
  lastName?: string = "";
  address?: string = "";
  country?: string = "";
  phone?: string = "";
  allowEmailReminders?: boolean = false;
  profileCompleted?: boolean = false;
  role?: string = "";
  isInMyWorkspace?: boolean = false;
}