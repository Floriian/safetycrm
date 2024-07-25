import { User } from "../user.schema";

type UserCols = keyof User;
interface Cols {
  name: UserCols;
  headerName: string;
}
export const userTableCols: Cols[] = [
  { headerName: "ID", name: "id" },
  { headerName: "Name", name: "name" },
  { headerName: "Email", name: "email" },
];
