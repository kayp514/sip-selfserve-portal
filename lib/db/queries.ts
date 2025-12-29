import { prisma } from '@/lib/prisma';
import type { ImportDID, DIDStatus, DIDType } from '@/lib/types';

// ============================================================================
// CARRIER MANAGEMENT
// ============================================================================

type CreateCarrierInput = {
    name: string;
    prefix: string;
};

/**
 * Register a new telecom carrier in the system
 */
async function registerCarrier(input: CreateCarrierInput) {
    const carrier = await prisma.carrier.create({
        data: {
            name: input.name,
            prefix: input.prefix,
        },
    });

    return carrier;
}

/**
 * Get carrier by ID
 */
async function getCarrierById(id: string) {
    return prisma.carrier.findUnique({
        where: { id },
    });
}

/**
 * Get carrier by name
 */
async function getCarrierByName(name: string) {
    return prisma.carrier.findUnique({
        where: { name },
    });
}

/**
 * List all carriers
 */
async function listCarriers() {
    return prisma.carrier.findMany({
        orderBy: { name: 'asc' },
    });
}

// ============================================================================
// DID MANAGEMENT
// ============================================================================



/**
 * Import/register a DID into inventory
 */
async function registerDID(input: ImportDID) {
    const did = await prisma.ln_inventory.create({
        data: {
            number: input.number,
            carrier_id: input.carrierId,
            type: input.type ?? 'LOCAL',
            status: 'IMPORTED',
            country_code: input.countryCode,
            area_code: input.areaCode,
            region: input.region,
            city: input.city,
            external_id: input.externalId,
            monthly_cost: input.monthlyCost,
            sale_price: input.salePrice,
            capabilities: input.capabilities,
        },
    });

    return did;
}

/**
 * List DIDs from inventory with optional filters
 */
async function listDIDs(filters?: {
    status?: DIDStatus;
    type?: DIDType;
    carrierId?: string;
}) {
    return prisma.ln_inventory.findMany({
        where: {
            status: filters?.status,
            type: filters?.type,
            carrier_id: filters?.carrierId,
        },
        include: {
            carrier: true,
        },
        orderBy: {
            imported_at: 'desc',
        },
    });
}

/**
 * Get available DIDs for purchase
 */
async function listAvailableDIDs(filters?: {
    type?: DIDType;
    countryCode?: string;
    areaCode?: string;
}) {
    return prisma.ln_inventory.findMany({
        where: {
            status: 'AVAILABLE',
            type: filters?.type,
            country_code: filters?.countryCode,
            area_code: filters?.areaCode,
        },
        include: {
            carrier: true,
        },
        orderBy: [
            { country_code: 'asc' },
            { area_code: 'asc' },
            { number: 'asc' },
        ],
    });
}

/**
 * Get DID by number
 */
async function getDIDByNumber(number: string) {
    return prisma.ln_inventory.findUnique({
        where: { number },
        include: {
            carrier: true,
            purchase: {
                include: {
                    customer: true,
                    subscriber: true,
                },
            },
        },
    });
}

// ============================================================================
// SUBSCRIBER MANAGEMENT
// ============================================================================
function getSubscribers() { }

export {
    listDIDs,
    listAvailableDIDs,
    getDIDByNumber,
    getSubscribers,
    registerDID,
    registerCarrier,
    getCarrierById,
    getCarrierByName,
    listCarriers,
};