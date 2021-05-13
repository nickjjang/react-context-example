/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ENUMS from "./enums";

export const READER_STATUS_LIST = [
  { label: "Online", value: ENUMS.READER_STATUS.ONLINE },
  { label: "Offline", value: ENUMS.READER_STATUS.ONLINE },
];

export const GENDER_LIST = [
  { label: "Male", value: ENUMS.GENDER.MALE },
  { label: "Female", value: ENUMS.GENDER.FEMALE },
  { label: "Other", value: ENUMS.GENDER.OTHER },
  { label: "Decline to identity", value: ENUMS.GENDER.DI },
];

export const RACE_LIST = [
  { label: "American Indian or Alaskan Native", value: ENUMS.RACE.AI_AN },
  { label: "Asian", value: ENUMS.RACE.A },
  { label: "Black or African American", value: ENUMS.RACE.B_AA },
  { label: "Native Hawaiian or Pacific Islander", value: ENUMS.RACE.NH_PI },
  { label: "White", value: ENUMS.RACE.W },
  { label: "Other", value: ENUMS.RACE.O },
  { label: "Declined to identify", value: ENUMS.RACE.DI },
];

export const ETHNICITY_LIST = [
  { label: "Hispanic or Latino", value: ENUMS.ETHNICITY.H_L },
  { label: "Not Hispanic or Latino", value: ENUMS.ETHNICITY.NH_NL },
  { label: "Declined to identify", value: ENUMS.ETHNICITY.DI },
];

export const TEST_RESULT_LIST = [
  { label: "Positive", value: ENUMS.TEST_RESULT.POSITIVE },
  { label: "Negative", value: ENUMS.TEST_RESULT.NEGATIVE },
  { label: "Error", value: ENUMS.TEST_RESULT.ERROR },
  { label: "No Result", value: ENUMS.TEST_RESULT.NO_RESULT },
];

export interface ConstantValues {
  label?: string | number;
  value?: string | number;
}

export const GET_VALUE = (
  list: Array<any>,
  valueField: string,
  key: string,
  keyField: string
): string | null => {
  for (let i = 0, ni = list.length; i < ni; i++) {
    const item = list[i];
    if (item[keyField] === key) {
      return item[valueField];
    }
  }
  return null;
};

export const GET_ITEM = (
  list: Array<any>,
  key: string,
  keyField: string
): any | null => {
  for (let i = 0, ni = list.length; i < ni; i++) {
    const item = list[i];
    if (item[keyField] === key) {
      return item;
    }
  }
  return null;
};
