export interface Profile {
    user?: User;
    codeSap?: string;
    documentDrivinglicenseFrontal?: string;
    documentDrivinglicenseBack?: string;
    documentSecurityCard?: string;
    idDriver: number;
    companyName?: string;
    companyNit?: string;
    companyId?: number;
    documentCompany?: string;
    roles?: [];
}
export interface User{
    id?: number;
    firstName?: string;
    lastName?: string;
    document?: string;
    email?: string;
    status?: boolean;
    slug?: string;
    phoneNumber?: string;
    documentIdentityCardFrontal?: string;
    documentIdentityCardBack?: string;
}

export interface UserUpdatePhoto{
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    documentIdentityCardFrontal?: string;
    documentIdentityCardBack?: string;
}

export interface UserDriverUpdatePhoto{
    idDriver: number;
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    documentDrivinglicenseFrontal?: string;
    documentDrivinglicenseBack?: string;
    documentSecurityCard?: string;
}
