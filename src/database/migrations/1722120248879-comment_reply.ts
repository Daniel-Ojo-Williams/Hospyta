import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentReply1722120248879 implements MigrationInterface {
    name = 'CommentReply1722120248879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_reply" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" character varying NOT NULL DEFAULT 'now', "updated_at" character varying NOT NULL DEFAULT 'now()', "reply" character varying NOT NULL, "comment_id" uuid, "user_id" uuid, CONSTRAINT "PK_ba2e38e6e586556dfcb9fb41d1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" character varying NOT NULL DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updated_at" character varying NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment_reply" ADD CONSTRAINT "FK_6a17fe6cb7c32abb552a3cac3e5" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_reply" ADD CONSTRAINT "FK_6499a0b82f218b256048fd0ae34" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_reply" DROP CONSTRAINT "FK_6499a0b82f218b256048fd0ae34"`);
        await queryRunner.query(`ALTER TABLE "comment_reply" DROP CONSTRAINT "FK_6a17fe6cb7c32abb552a3cac3e5"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post_category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '2024-07-27 21:19:32.504299'`);
        await queryRunner.query(`DROP TABLE "comment_reply"`);
    }

}
