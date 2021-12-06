-- CreateEnum
CREATE TYPE "VideoProvider" AS ENUM ('YOUTUBE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "md5" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "provider" "VideoProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "ProfilePhoto" (
    "photoId" TEXT NOT NULL,
    "profileUsername" TEXT NOT NULL,

    CONSTRAINT "ProfilePhoto_pkey" PRIMARY KEY ("photoId")
);

-- CreateTable
CREATE TABLE "ProfileReport" (
    "id" TEXT NOT NULL,
    "reportedUsername" TEXT NOT NULL,
    "authorUsername" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteRecipes" (
    "username" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "FavoriteRecipes_pkey" PRIMARY KEY ("username","recipeId")
);

-- CreateTable
CREATE TABLE "CertifiedChef" (
    "username" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "CertifiedChef_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "authorUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipePhoto" (
    "photoId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipePhoto_pkey" PRIMARY KEY ("photoId","recipeId")
);

-- CreateTable
CREATE TABLE "RecipeVideo" (
    "videoId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeVideo_pkey" PRIMARY KEY ("videoId","recipeId")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("name","recipeId")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "number" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("number","recipeId")
);

-- CreateTable
CREATE TABLE "RecipeStepPhoto" (
    "recipePhotoId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeStepPhoto_pkey" PRIMARY KEY ("recipePhotoId","stepNumber")
);

-- CreateTable
CREATE TABLE "RecipeStepVideoTiming" (
    "videoId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "seconds" BIGINT NOT NULL,

    CONSTRAINT "RecipeStepVideoTiming_pkey" PRIMARY KEY ("recipeId","stepNumber")
);

-- CreateTable
CREATE TABLE "RecipeStepTimer" (
    "stepNumber" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "seconds" BIGINT NOT NULL,

    CONSTRAINT "RecipeStepTimer_pkey" PRIMARY KEY ("stepNumber")
);

-- CreateTable
CREATE TABLE "RecipeStepTool" (
    "stepNumber" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "RecipeStepTool_pkey" PRIMARY KEY ("stepNumber")
);

-- CreateTable
CREATE TABLE "RecipeReport" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "authorUsername" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeRating" (
    "recipeId" TEXT NOT NULL,
    "authorUsername" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "RecipeRating_pkey" PRIMARY KEY ("recipeId","authorUsername")
);

-- CreateIndex
CREATE INDEX "Photo_md5_idx" ON "Photo"("md5");

-- CreateIndex
CREATE INDEX "Video_video_idx" ON "Video"("video");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_role_idx" ON "User"("name", "role");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_accessToken_key" ON "UserToken"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePhoto_profileUsername_key" ON "ProfilePhoto"("profileUsername");

-- CreateIndex
CREATE INDEX "ProfileReport_authorUsername_reportedUsername_idx" ON "ProfileReport"("authorUsername", "reportedUsername");

-- CreateIndex
CREATE INDEX "CertifiedChef_stars_idx" ON "CertifiedChef"("stars");

-- CreateIndex
CREATE INDEX "Recipe_authorUsername_idx" ON "Recipe"("authorUsername");

-- CreateIndex
CREATE UNIQUE INDEX "RecipePhoto_photoId_key" ON "RecipePhoto"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeVideo_videoId_key" ON "RecipeVideo"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeVideo_recipeId_key" ON "RecipeVideo"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_name_idx" ON "RecipeIngredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStepVideoTiming_stepNumber_recipeId_key" ON "RecipeStepVideoTiming"("stepNumber", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStepTimer_stepNumber_recipeId_key" ON "RecipeStepTimer"("stepNumber", "recipeId");

-- CreateIndex
CREATE INDEX "RecipeStepTool_recipeId_idx" ON "RecipeStepTool"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStepTool_stepNumber_recipeId_key" ON "RecipeStepTool"("stepNumber", "recipeId");

-- CreateIndex
CREATE INDEX "RecipeReport_authorUsername_idx" ON "RecipeReport"("authorUsername");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePhoto" ADD CONSTRAINT "ProfilePhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePhoto" ADD CONSTRAINT "ProfilePhoto_profileUsername_fkey" FOREIGN KEY ("profileUsername") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileReport" ADD CONSTRAINT "ProfileReport_reportedUsername_fkey" FOREIGN KEY ("reportedUsername") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileReport" ADD CONSTRAINT "ProfileReport_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipes" ADD CONSTRAINT "FavoriteRecipes_username_fkey" FOREIGN KEY ("username") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipes" ADD CONSTRAINT "FavoriteRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertifiedChef" ADD CONSTRAINT "CertifiedChef_username_fkey" FOREIGN KEY ("username") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipePhoto" ADD CONSTRAINT "RecipePhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipePhoto" ADD CONSTRAINT "RecipePhoto_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeVideo" ADD CONSTRAINT "RecipeVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeVideo" ADD CONSTRAINT "RecipeVideo_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStepPhoto" ADD CONSTRAINT "RecipeStepPhoto_recipePhotoId_recipeId_fkey" FOREIGN KEY ("recipePhotoId", "recipeId") REFERENCES "RecipePhoto"("photoId", "recipeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStepPhoto" ADD CONSTRAINT "RecipeStepPhoto_stepNumber_recipeId_fkey" FOREIGN KEY ("stepNumber", "recipeId") REFERENCES "RecipeStep"("number", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStepVideoTiming" ADD CONSTRAINT "RecipeStepVideoTiming_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "RecipeVideo"("videoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStepVideoTiming" ADD CONSTRAINT "RecipeStepVideoTiming_stepNumber_recipeId_fkey" FOREIGN KEY ("stepNumber", "recipeId") REFERENCES "RecipeStep"("number", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStepTimer" ADD CONSTRAINT "RecipeStepTimer_stepNumber_recipeId_fkey" FOREIGN KEY ("stepNumber", "recipeId") REFERENCES "RecipeStep"("number", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStepTool" ADD CONSTRAINT "RecipeStepTool_stepNumber_recipeId_fkey" FOREIGN KEY ("stepNumber", "recipeId") REFERENCES "RecipeStep"("number", "recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeReport" ADD CONSTRAINT "RecipeReport_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeReport" ADD CONSTRAINT "RecipeReport_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRating" ADD CONSTRAINT "RecipeRating_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRating" ADD CONSTRAINT "RecipeRating_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "Profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
