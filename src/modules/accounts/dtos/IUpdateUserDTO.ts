export interface IUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  driver_license?: string;
  is_admin?: boolean;
  avatar?: string;
}
