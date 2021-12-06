/*
  Warnings:

  - The primary key for the `RecipeStepTool` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "RecipeStepTool_recipeId_stepNumber_idx";

-- AlterTable
ALTER TABLE "RecipeStepTool" DROP CONSTRAINT "RecipeStepTool_pkey",
ADD CONSTRAINT "RecipeStepTool_pkey" PRIMARY KEY ("recipeId", "stepNumber");
