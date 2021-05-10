import { YES_NO } from "../configs/enums";

export interface ContactInfoModel {
  streetAddress1?: string | null;
  streetAddress2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipcode?: string | null;
  primaryPhone?: string | null;
  secondaryPhone?: string | null;
  primaryPhoneVerified?: boolean;
}

export interface RoleModel {
  role: string;
  supplier: null | string;
  practice: any;
}

export interface UserMetaData {
  field: {
    fieldId?: string;
  };
  fieldData?: string;
}
export interface UserModel {
  id?: string;
  userId?: string;
  patientId?: string | null;
  acceptedTermsOfUse?: boolean;
  acceptedTermsOfUseForTenant?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  race?: string;
  ethnicity?: string;
  emailAddress?: string;
  phoneNumber?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  password?: string;
  confirmPassword?: string;
  status?: string;
  contactInfo?: null | ContactInfoModel;
  roles?: Array<RoleModel>;
  currentRole?: null | RoleModel;
  mfaEnable?: boolean;
  defaultRole?: null | RoleModel;
  createdOn?: string;
  lastUpdatedOn?: string;
  customData?: Array<UserMetaData>;
}

export interface ReaderModel {
  id?: string;
  status?: string;
}

export interface TestModel {
  Id: string | null;
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

export interface PageModel {
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  content: Array<any>;
}

export interface DeviceDataFormModel {
  deviceDataModelId?: string;
  devicePropertySetId?: string;
  ownerId?: string;
  data?: {
    CollectorId?: string;
    SampleCollectedOn?: string;
    SampleCollectedBy?: string;
  };
}
