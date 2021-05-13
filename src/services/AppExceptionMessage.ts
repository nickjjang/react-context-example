/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const ExceptionMessages: { [index: string]: string } = {
  "email-address-or-password-incorrect":
    "Email address or password is incorrect.",
  "user-does-not-exist": "User does not exist.",
  "bad-request": "Bad request.",
  "password-not-enough-uppercase-letters":
    "Password not enough uppercase letters.",
  "user-is-locked-out": "User is locked out.",
  "none-found": "Not found.",
  "user-email-address-already-exists-for-this-tenant":
    "User email address already exists for this tenant.",
};

class AppExceptionMessage {
  status: number;
  field: string;
  value: string;
  constructor(response: any) {
    this.status = response.status;
    const split = response.data.split(":");
    if (split.length > 1) {
      this.field = split[0].trim();
      this.value = split[1].trim();
    } else {
      this.field = "";
      this.value = split[0].trim();
    }
  }

  get message(): string {
    return ExceptionMessages[this.value]
      ? ExceptionMessages[this.value]
      : "Unknown exception occured.";
  }
}

export default AppExceptionMessage;
