export type DID = {
    id: string;
    number: string;
    areaCode: number;
    type: "local" | "toll-free";
    region: string;
    price: number;
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