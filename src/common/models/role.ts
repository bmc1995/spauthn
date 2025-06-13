export enum Role {
  USER = 'USER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}
export type RoleType = 'ADMIN' | 'EDITOR' | 'USER' | '';

export type Permission = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const RoleHierarchy: Record<RoleType, number> = {
  ADMIN: 3,
  EDITOR: 2,
  USER: 1,
  '': 0,
};

export type RoleOption = {
  label: string;
  value: Role;
};

export type RolePermission = {
  id: number;
  role: Role;
  permission: Permission;
  createdAt: string;
  updatedAt: string;
};

export type RolePermissionOption = {
  label: string;
  value: RolePermission;
};

export type RolePermissionForm = {
  role: Role;
  permission: Permission;
};

export type RoleForm = {
  role: Role;
  permissions: Permission[];
};

export type RoleFormOption = {
  label: string;
  value: RoleForm;
};
