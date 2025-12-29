-- CreateEnum
CREATE TYPE "NumberStatus" AS ENUM ('IMPORTED', 'AVAILABLE', 'RESERVED', 'ASSIGNED', 'SUSPENDED', 'RELEASED');

-- CreateEnum
CREATE TYPE "NumberType" AS ENUM ('LOCAL', 'TOLL_FREE', 'NATIONAL', 'MOBILE');

-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "contact_id" TEXT,
    "onboarding_status" "OnboardingStatus" NOT NULL DEFAULT 'PENDING',
    "onboarded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "display_name" TEXT,
    "email" TEXT,
    "administrative" BOOLEAN NOT NULL,
    "switch_user_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ln_inventory" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "type" "NumberType" NOT NULL DEFAULT 'LOCAL',
    "status" "NumberStatus" NOT NULL DEFAULT 'IMPORTED',
    "country_code" TEXT,
    "area_code" TEXT,
    "region" TEXT,
    "city" TEXT,
    "carrier_id" TEXT NOT NULL,
    "external_id" TEXT,
    "monthly_cost" DECIMAL(10,4),
    "sale_price" DECIMAL(10,4),
    "capabilities" JSONB,
    "imported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ln_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ln_purchase" (
    "id" TEXT NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "subscriber_id" TEXT NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activated_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "auto_renew" BOOLEAN NOT NULL DEFAULT true,
    "purchase_price" DECIMAL(10,4) NOT NULL,
    "recurring_price" DECIMAL(10,4) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "cancelled_at" TIMESTAMP(3),

    CONSTRAINT "ln_purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_uid_key" ON "customer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_contact_id_key" ON "customer"("contact_id");

-- CreateIndex
CREATE INDEX "subscriber_customer_id_idx" ON "subscriber"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_customer_id_username_key" ON "subscriber"("customer_id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "carrier_name_key" ON "carrier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ln_inventory_number_key" ON "ln_inventory"("number");

-- CreateIndex
CREATE INDEX "ln_inventory_status_type_idx" ON "ln_inventory"("status", "type");

-- CreateIndex
CREATE INDEX "ln_inventory_country_code_area_code_idx" ON "ln_inventory"("country_code", "area_code");

-- CreateIndex
CREATE INDEX "ln_inventory_carrier_id_idx" ON "ln_inventory"("carrier_id");

-- CreateIndex
CREATE UNIQUE INDEX "ln_purchase_inventory_id_key" ON "ln_purchase"("inventory_id");

-- CreateIndex
CREATE INDEX "ln_purchase_customer_id_idx" ON "ln_purchase"("customer_id");

-- CreateIndex
CREATE INDEX "ln_purchase_subscriber_id_idx" ON "ln_purchase"("subscriber_id");

-- CreateIndex
CREATE INDEX "ln_purchase_purchased_at_idx" ON "ln_purchase"("purchased_at");

-- AddForeignKey
ALTER TABLE "subscriber" ADD CONSTRAINT "subscriber_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ln_inventory" ADD CONSTRAINT "ln_inventory_carrier_id_fkey" FOREIGN KEY ("carrier_id") REFERENCES "carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ln_purchase" ADD CONSTRAINT "ln_purchase_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "ln_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ln_purchase" ADD CONSTRAINT "ln_purchase_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ln_purchase" ADD CONSTRAINT "ln_purchase_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;
