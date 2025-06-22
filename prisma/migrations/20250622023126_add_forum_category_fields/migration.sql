-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_forum_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#3B82F6',
    "icon" TEXT NOT NULL DEFAULT 'MessageCircle',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_forum_categories" ("createdAt", "description", "id", "isActive", "name", "slug", "updatedAt") SELECT "createdAt", "description", "id", "isActive", "name", "slug", "updatedAt" FROM "forum_categories";
DROP TABLE "forum_categories";
ALTER TABLE "new_forum_categories" RENAME TO "forum_categories";
CREATE UNIQUE INDEX "forum_categories_slug_key" ON "forum_categories"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
