-- CreateTable
CREATE TABLE "UrlMap" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UrlMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlMap_short_url_key" ON "UrlMap"("short_url");
