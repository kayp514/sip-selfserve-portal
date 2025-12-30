'use server';

import { revalidatePath } from "next/cache";
import { listCarriers, registerCarrier, listDIDs as queryListDIDs, registerDID } from "@/lib/db/queries";
import type { DIDType, DIDStatus } from "@/lib/types";


import {
    createNextSessionCookie,
    clearNextSessionCookie,
    clearSessionCookieServer,
    createSessionCookieServer,
    setNextServerSession,
} from "@tern-secure/nextjs/admin";


/**
 * Server action to list all carriers
 */
async function listCarrier() {
    try {
        const carriers = await listCarriers();
        return { success: true, data: carriers };
    } catch (error) {
        console.error('Failed to list carriers:', error);
        return { success: false, error: 'Failed to fetch carriers' };
    }
}

/**
 * Server action to register a new carrier
 */
async function createCarrier(name: string, prefix: string) {
    try {
        await registerCarrier({ name, prefix });
        revalidatePath("/dashboard/carrier");
        return { success: true };
    } catch (error) {
        console.error('Failed to register carrier:', error);
        return { success: false, error: 'Failed to register carrier' };
    }
}

/**
 * Server action to list DIDs with optional filters
 */
async function listDIDs(filters?: {
    status?: DIDStatus;
    type?: DIDType;
    carrierId?: string;
}) {
    try {
        const dids = await queryListDIDs(filters);
        return { success: true, data: dids };
    } catch (error) {
        console.error('Failed to list DIDs:', error);
        return { success: false, error: 'Failed to fetch DIDs' };
    }
}

/**
 * Server action to import a DID
 */
async function importDID(data: {
    number: string;
    carrierId: string;
    type: 'NATIONAL' | 'TOLL_FREE';
    countryCode?: string;
    areaCode?: string;
    region?: string;
    city?: string;
    externalId?: string;
    monthlyCost?: number;
    salePrice?: number;
    capabilities?: { sms: boolean; voice: boolean; mms: boolean };
}) {
    try {
        await registerDID({
            number: data.number,
            carrierId: data.carrierId,
            type: data.type,
            countryCode: data.countryCode,
            areaCode: data.areaCode,
            region: data.region,
            city: data.city,
            externalId: data.externalId,
            monthlyCost: data.monthlyCost,
            salePrice: data.salePrice,
            capabilities: data.capabilities,
        });
        revalidatePath("/dashboard/phone-did");
        return { success: true };
    } catch (error) {
        console.error('Failed to import DID:', error);
        return { success: false, error: 'Failed to import DID' };
    }
}


export { listCarrier, createCarrier, listDIDs, importDID };

export {
    clearNextSessionCookie,
    clearSessionCookieServer,
    createSessionCookieServer,
    setNextServerSession,
    createNextSessionCookie,
};