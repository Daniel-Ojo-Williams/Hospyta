import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToPost1722107996696 implements MigrationInterface {
    name = 'AddImageToPost1722107996696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:19:19.959109'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
    }

}
