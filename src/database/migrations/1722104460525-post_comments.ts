import { MigrationInterface, QueryRunner } from "typeorm";

export class PostComments1722104460525 implements MigrationInterface {
    name = 'PostComments1722104460525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT 'now', "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()', "post_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 19:11:48.291505'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 19:11:48.291505'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 19:11:48.291505'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 19:11:48.291505'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 19:11:48.291505'`);
        await queryRunner.query(`ALTER TABLE "post_category" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 19:11:48.291505'`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
