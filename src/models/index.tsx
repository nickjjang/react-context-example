import { YES_NO } from "../configs/enums";

export interface PatientModel {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  race?: string;
  ethnicity?: string;
  email?: string;
  phoneNumber?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ReaderModel {
  id?: string;
  status?: string;
}

export interface TestModel {
  CollectorId?: string | null;
  ReaderId?: string | null;
  SampleCollectedOn?: string | Date | null;
  SampleCollectedBy?: string | null;
  TestRunBy?: string;
  TestStartDate?: string | Date | null;
  TestEndDate?: string | Date | null;
  TestComplete?: YES_NO | null;
  TestResult?: string | null;
  TestPhoto?: string | null;
}
