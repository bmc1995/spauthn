import store from '../../app/redux/store';
import { RoleType } from '../../common/models/role';

export const useRBAC = (component: React.ReactNode, validRoles: RoleType[]) => {
  const role = store.getState().auth.user?.role || '';

  if (validRoles.includes(role)) {
    return component;
  }
  return null;
};
