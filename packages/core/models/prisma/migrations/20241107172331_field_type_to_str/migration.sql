-- AlterTable
ALTER TABLE "analyzed_lecture" ALTER COLUMN "thumbnails_id" SET NOT NULL,
ALTER COLUMN "thumbnails_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "frame" ALTER COLUMN "frame_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "segment" ALTER COLUMN "frames_id" SET NOT NULL,
ALTER COLUMN "frames_id" SET DATA TYPE TEXT;
