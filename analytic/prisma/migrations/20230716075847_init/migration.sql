-- CreateTable
CREATE TABLE "UrlRedirectAnalytic" (
    "id" SERIAL NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UrlRedirectAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlMapAnalytic" (
    "id" SERIAL NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UrlMapAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlMapAnalytic_shortUrl_key" ON "UrlMapAnalytic"("shortUrl");
