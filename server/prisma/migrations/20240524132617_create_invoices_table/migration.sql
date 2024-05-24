-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "reference_month" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdf_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_pdf_id_key" ON "invoices"("pdf_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_pdf_id_fkey" FOREIGN KEY ("pdf_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
