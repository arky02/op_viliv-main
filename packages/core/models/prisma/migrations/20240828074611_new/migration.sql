-- CreateEnum
CREATE TYPE "LectureStatus" AS ENUM ('PENDING', 'ONREVIEW', 'FAILED', 'OPENED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "AcademyMemberRole" AS ENUM ('OWNER', 'MANAGER', 'TEACHER');

-- CreateEnum
CREATE TYPE "SubscribePlan" AS ENUM ('FREE', 'LIGHT', 'STANDARD', 'PRO', 'ENTERPRISE');

-- CreateTable
CREATE TABLE "academy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "post_code" TEXT,
    "address" TEXT,
    "address_detail" TEXT,
    "left_trial_contents" INTEGER NOT NULL DEFAULT 360000,
    "plan_id" TEXT NOT NULL,

    CONSTRAINT "academy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_class" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "invite_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "academy_id" TEXT NOT NULL,

    CONSTRAINT "academy_class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "date" DATE NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "academy_class_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "status" "LectureStatus" NOT NULL,

    CONSTRAINT "lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "name" "SubscribePlan" NOT NULL DEFAULT 'FREE',
    "duration" INTEGER NOT NULL,
    "contents_limit" INTEGER NOT NULL,
    "academy_member_limit" INTEGER NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "academy_member_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "expire_date" DATE NOT NULL,
    "academy_id" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyPaymentCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardNumber" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "billingKey" TEXT NOT NULL,
    "academyId" TEXT NOT NULL,

    CONSTRAINT "AcademyPaymentCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "phone_number" TEXT NOT NULL,
    "hashedPassword" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "refresh_token_expires_in" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_member" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "role" "AcademyMemberRole" NOT NULL,
    "is_pending" BOOLEAN NOT NULL DEFAULT true,
    "is_alert_subscribed" BOOLEAN NOT NULL DEFAULT true,
    "academy_id" TEXT NOT NULL,
    "phone_number" TEXT,

    CONSTRAINT "academy_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "is_pending" BOOLEAN NOT NULL DEFAULT true,
    "academy_class_id" TEXT,
    "phone_number" TEXT NOT NULL,
    "user_id" TEXT,
    "academyId" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AcademyClassToAcademyMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AcademyMemberToLecture" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "academy_id_key" ON "academy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "academy_class_invite_code_key" ON "academy_class"("invite_code");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyPaymentCard_academyId_key" ON "AcademyPaymentCard"("academyId");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "_AcademyClassToAcademyMember_AB_unique" ON "_AcademyClassToAcademyMember"("A", "B");

-- CreateIndex
CREATE INDEX "_AcademyClassToAcademyMember_B_index" ON "_AcademyClassToAcademyMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AcademyMemberToLecture_AB_unique" ON "_AcademyMemberToLecture"("A", "B");

-- CreateIndex
CREATE INDEX "_AcademyMemberToLecture_B_index" ON "_AcademyMemberToLecture"("B");

-- AddForeignKey
ALTER TABLE "academy" ADD CONSTRAINT "academy_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_class" ADD CONSTRAINT "academy_class_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture" ADD CONSTRAINT "lecture_academy_class_id_fkey" FOREIGN KEY ("academy_class_id") REFERENCES "academy_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_academy_member_id_fkey" FOREIGN KEY ("academy_member_id") REFERENCES "academy_member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyPaymentCard" ADD CONSTRAINT "AcademyPaymentCard_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "academy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_member" ADD CONSTRAINT "academy_member_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_member" ADD CONSTRAINT "academy_member_phone_number_fkey" FOREIGN KEY ("phone_number") REFERENCES "user"("phone_number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academy_class_id_fkey" FOREIGN KEY ("academy_class_id") REFERENCES "academy_class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "academy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademyClassToAcademyMember" ADD CONSTRAINT "_AcademyClassToAcademyMember_A_fkey" FOREIGN KEY ("A") REFERENCES "academy_class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademyClassToAcademyMember" ADD CONSTRAINT "_AcademyClassToAcademyMember_B_fkey" FOREIGN KEY ("B") REFERENCES "academy_member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademyMemberToLecture" ADD CONSTRAINT "_AcademyMemberToLecture_A_fkey" FOREIGN KEY ("A") REFERENCES "academy_member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademyMemberToLecture" ADD CONSTRAINT "_AcademyMemberToLecture_B_fkey" FOREIGN KEY ("B") REFERENCES "lecture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
