import store from '../../app/redux/store';
import { Role, RoleType } from '../../common/models/role';

export const useRBAC = (component: React.ReactNode, validRoles: RoleType[]) => {
  const role = store.getState().auth.user?.isAdmin ? Role.ADMIN : Role.USER;

  if (validRoles.includes(role)) {
    return component;
  }
  return null;
};
