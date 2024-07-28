import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateType1722122373281 implements MigrationInterface {
    name = 'UpdateDateType1722122373281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "created_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "updated_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment_reply" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment_reply" ADD "created_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment_reply" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comment_reply" ADD "updated_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "created_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updated_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updated_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" date NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" date NOT NULL DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "comment_reply" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comment_reply" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment_reply" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment_reply" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
    }

}
