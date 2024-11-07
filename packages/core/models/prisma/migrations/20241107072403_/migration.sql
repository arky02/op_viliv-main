/*
  Warnings:

  - You are about to drop the column `left_trial_contents` on the `academy` table. All the data in the column will be lost.
  - You are about to drop the column `academy_member_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `AcademyPaymentCard` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[academy_id,phone_number]` on the table `academy_member` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone_number` on table `academy_member` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AcademyPaymentCard" DROP CONSTRAINT "AcademyPaymentCard_academyId_fkey";

-- DropForeignKey
ALTER TABLE "_AcademyClassToAcademyMember" DROP CONSTRAINT "_AcademyClassToAcademyMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_AcademyClassToAcademyMember" DROP CONSTRAINT "_AcademyClassToAcademyMember_B_fkey";

-- DropForeignKey
ALTER TABLE "_AcademyMemberToLecture" DROP CONSTRAINT "_AcademyMemberToLecture_A_fkey";

-- DropForeignKey
ALTER TABLE "_AcademyMemberToLecture" DROP CONSTRAINT "_AcademyMemberToLecture_B_fkey";

-- DropForeignKey
ALTER TABLE "academy" DROP CONSTRAINT "academy_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "academy_class" DROP CONSTRAINT "academy_class_academy_id_fkey";

-- DropForeignKey
ALTER TABLE "academy_member" DROP CONSTRAINT "academy_member_academy_id_fkey";

-- DropForeignKey
ALTER TABLE "academy_member" DROP CONSTRAINT "academy_member_phone_number_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "lecture" DROP CONSTRAINT "lecture_academy_class_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_academy_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_academy_member_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_academyId_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_academy_class_id_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_user_id_fkey";

-- AlterTable
ALTER TABLE "academy" DROP COLUMN "left_trial_contents",
ADD COLUMN     "credit" INTEGER NOT NULL DEFAULT 360000;

-- AlterTable
ALTER TABLE "academy_member" ALTER COLUMN "phone_number" SET NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "academy_member_id";

-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "AcademyPaymentCard";

-- CreateTable
CREATE TABLE "academy_payment_card" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "card_number" TEXT NOT NULL,
    "card_name" TEXT NOT NULL,
    "billing_key" TEXT NOT NULL,
    "academy_id" TEXT NOT NULL,

    CONSTRAINT "academy_payment_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analyzed_lecture" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lecture_id" TEXT NOT NULL,
    "thumbnails_id" INTEGER[],

    CONSTRAINT "analyzed_lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "segment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time_stamp" INTEGER NOT NULL,
    "summarization" TEXT[],
    "analyzed_lecture_id" TEXT NOT NULL,
    "frames_id" INTEGER[],

    CONSTRAINT "segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_with_timestamp" (
    "id" TEXT NOT NULL,
    "time_stamp" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "segment_id" TEXT NOT NULL,

    CONSTRAINT "text_with_timestamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "analyzed_lecture_id" TEXT NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frame" (
    "id" TEXT NOT NULL,
    "frame" TEXT NOT NULL,
    "frame_id" INTEGER NOT NULL,
    "is_thumbnail" BOOLEAN NOT NULL DEFAULT false,
    "segment_id" TEXT NOT NULL,

    CONSTRAINT "frame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "full_summarization" (
    "id" TEXT NOT NULL,
    "summarization" TEXT NOT NULL,
    "analyzed_lecture_id" TEXT NOT NULL,

    CONSTRAINT "full_summarization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academy_payment_card_academy_id_key" ON "academy_payment_card"("academy_id");

-- CreateIndex
CREATE UNIQUE INDEX "analyzed_lecture_lecture_id_key" ON "analyzed_lecture"("lecture_id");

-- CreateIndex
CREATE UNIQUE INDEX "full_summarization_analyzed_lecture_id_key" ON "full_summarization"("analyzed_lecture_id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_member_academy_id_phone_number_key" ON "academy_member"("academy_id", "phone_number");
