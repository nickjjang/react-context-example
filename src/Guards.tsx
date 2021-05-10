export const requireLogin = (to: any, from: any, next: any) => {
  if (!to.meta.auth) {
    next.redirect("/login");
    // next();
  } else {
    next();
  }
};
