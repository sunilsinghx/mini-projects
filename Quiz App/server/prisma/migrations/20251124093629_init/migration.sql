-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "answerIdx" INTEGER NOT NULL,
    "options" JSONB NOT NULL
);
