export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    status?: boolean;
    slug: string;
    phoneNumber: string;
    roles: string;
    documentIdentityCardFrontal?: string;
    documentIdentityCardBack?: string;
    driver?: Driver;
    company?: Company;
}

export interface Driver{
    codeSap: string;
    documentDrivinglicenseFrontal?: string;
    documentDrivinglicenseBack?: string;
    documentSecurityCard?: string;
}

export interface Company{
    companyId?: number;
    companyName: string;
    companyNit: string;
    documentCompany?: string;
}
