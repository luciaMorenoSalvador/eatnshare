/*
  Warnings:

  - The primary key for the `RecipeStepTimer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "RecipeStepTool_recipeId_idx";

-- AlterTable
ALTER TABLE "RecipeStepTimer" DROP CONSTRAINT "RecipeStepTimer_pkey",
ADD CONSTRAINT "RecipeStepTimer_pkey" PRIMARY KEY ("recipeId", "stepNumber");

-- CreateIndex
CREATE INDEX "RecipeStepTool_recipeId_stepNumber_idx" ON "RecipeStepTool"("recipeId", "stepNumber");
