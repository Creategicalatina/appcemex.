export interface TypeConveyorListDTO {
    idTypeConveyor: number;
    nameTypeConveyor: string;
    descriptionTypeConveyor: string;
}

export interface ConveyorListDTO {
    idConveyor: number;
    codeSap: string;
    typeConveyorId: number;
    company?: Company;
    user?: User;
}

export interface Company {
    nameCompany: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    document: string;
    email: string;
    status: boolean;
    slug: string;
}

export interface Driver{

    idDriver: number;
    user: User;
    codeSap: string;
    conveyorId: number;
    typeConveyorId: number;
    status: boolean;
    documentDrivinglicense?: File;
}

export interface CreateConveyorManTruck{
    firstName: string;
    lastName: string;
    document: string;
    phoneNumber: string;
    role: string;
    email: string;
    codeSap: string;
    conveyorId: number;
    typeConveyorId: number;
    documentDrivinglicenseFrontal?: File;
    documentDrivinglicenseBack?: File;
    documentIdentityCardFrontal?: File;
    documentIdentityCardBack?: File;
    documentSecurityCard?: File;
}

export interface CreateConveyorAdminLogistThird{
    firstName: string;
    lastName: string;
    document: string;
    phoneNumber: string;
    role: string;
    email: string;
    nameCompany: string;
    nitCompany: number;
    typeConveyorId: number;
    documentCompany?: File;
    documentIdentityCardFrontal?: File;
    documentIdentityCardBack?: File;
}

export interface CreateConveyorDrive{
    firstName: string;
    lastName: string;
    document: string;
    phoneNumber: string;
    role: string;
    email: string;
    codeSap: string;
    conveyorId: number;
    typeConveyorId: string;
    documentDrivinglicenseFrontal?: File;
    documentDrivinglicenseBack?: File;
    documentIdentityCardFrontal?: File;
    documentIdentityCardBack?: File;
    documentSecurityCard?: File;
}
