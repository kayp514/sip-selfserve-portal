
export type DIDType = 'NATIONAL' | 'TOLL_FREE';
export type DIDStatus = 'IMPORTED' | 'AVAILABLE' | 'RESERVED' | 'ASSIGNED' | 'SUSPENDED' | 'RELEASED';

/**
 * DID's type definition for importing/registering DIDs into inventory
 */
export type ImportDID = {
    number: string;
    carrierId: string;
    type?: DIDType;
    countryCode?: string;
    areaCode?: string;
    region?: string;
    city?: string;
    externalId?: string;
    monthlyCost?: number;
    salePrice?: number;
    capabilities?: { sms?: boolean; voice?: boolean; mms?: boolean };
};

/**
 * DID's type definition for system owners and admins
 */
export type DIDDisplay = {
    id: string;
    number: string;
    type: DIDType;
    status: DIDStatus;
    carrier: {
        id: string;
        name: string;
        prefix: string;
    };
    countryCode?: string;
    areaCode?: string;
    salePrice?: number;
    importedAt: Date;
};


/**
 * DID's type definition for available DIDs for customers to purchase
 */
export type DIDAvailable = {
    id: string;
    number: string;
    type: DIDType;
    countryCode?: string;
    areaCode?: string;
    region?: string;
    city?: string;
    salePrice: number;
    capabilities?: {
        sms: boolean;
        voice: boolean;
        mms: boolean;
    };
};

export type Subscriber = {
    id: string;
    administrative: boolean;
    alias_number: string;
    email: string;
    username: string;
    primary_number: string;
    status: "active" | "inactive" | "pending";
}

export type Carrier = {
    id: string;
    name: string;
    prefix: string;
}