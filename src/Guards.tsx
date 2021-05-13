/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const requireLogin = (to: any, from: any, next: any) => {
  if (!to.meta.auth) {
    next.redirect("/login");
    // next();
  } else {
    next();
  }
};
