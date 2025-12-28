'use server';

import { listCarriers, registerCarrier } from "@/lib/db/queries";


async function listCarrier() {
    try {
        const carriers = await listCarriers();
        return { success: true, data: carriers };
    } catch (error) {
        console.error('Failed to list carriers:', error);
        return { success: false, error: 'Failed to fetch carriers' };
    }
}

async function createCarrier(name: string, prefix: string) {
    try {
        const carrier = await registerCarrier({ name, prefix });
        return { success: true, data: carrier };
    } catch (error) {
        console.error('Failed to register carrier:', error);
        return { success: false, error: 'Failed to register carrier' };
    }
}

function getNumbers() { }


export { getNumbers, listCarrier, createCarrier };