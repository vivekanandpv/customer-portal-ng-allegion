export interface CustomerViewModelBase {
  folioNumber: number;
  firstName: string;
  lastName: string;
  gender: number;
  email: string;
  maritalStatus: number;
  sourceOfIncome: number;
  annualIncome: number;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  state: string;
  pin: number;
  pan: string;
  dateOfBirth: string;
  mobileNumber: string;
  telephone: string;
  nomineeFirstName: string;
  nomineeLastName: string;
  nomineeRelationship: string;
}

export interface CustomerViewModel extends CustomerViewModelBase {
  id: number;
  accounts?: AccountViewModel[];
}

export interface CustomerCreateViewModel extends CustomerViewModelBase {}

export interface CustomerUpdateViewModel extends CustomerViewModelBase {
  id: number;
}

export interface AccountViewModelBase {
  accountNumber: number;
  type: number;
  rateOfInterest: number;
  status: number;
  closedOn?: string;
  ifsc: string;
  cardNumber?: string;
  cardActive?: true;
  currency: string;
  customerId: number;
}

export interface AccountViewModel extends AccountViewModelBase {
  id: number;
  customer?: CustomerViewModel;
  createdOn: string;
}

export interface AccountCreateViewModel extends AccountViewModelBase {}

export interface AccountUpdateViewModel extends AccountViewModelBase {
  id: number;
}

export interface LoginViewModel {
  username: string;
  password: string;
}

export interface JwtViewModel {
  jwt: string;
}

export interface UserViewModel {
  unique_name: string;
  FullName: string;
  AvatarUrl: string;
  Roles: string[];
  token: string;
}

export interface CustomerIdNamePair {
  id: number;
  fullName: string;
}
