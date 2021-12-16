export interface IYMMobileInfo {
  smsId: string;
  mobile: string;
  customSmsId: null | string;
}

export interface IYMRes {
  code: string;
  data: IYMMobileInfo[];
}

export interface IMyMembership {
  accepted_at: string;
  id: number;
  is_owner: boolean;
  permissions: string[];
  role_id: number;
}
