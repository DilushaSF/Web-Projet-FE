// TODO : Add relevant Params Here
export interface SignupParams {
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobilePhone: string;
    password: string;
    eircode: string;
}

export interface LoginParams {
    mobilePhone: string;
    password: string;
}