import { prisma } from '@/lib/prisma';

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
// PLACEHOLDER FUNCTIONS
// ============================================================================

function registerDID() { }
function getNumbers() { }
function getSubscribers() { }

export { 
  getNumbers, 
  getSubscribers, 
  registerDID, 
  registerCarrier,
  getCarrierById,
  getCarrierByName,
  listCarriers,
};