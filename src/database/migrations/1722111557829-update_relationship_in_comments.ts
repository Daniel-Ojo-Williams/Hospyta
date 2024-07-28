import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationshipInComments1722111557829 implements MigrationInterface {
    name = 'UpdateRelationshipInComments1722111557829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "comment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 20:20:43.593432'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "comment"`);
    }

}
