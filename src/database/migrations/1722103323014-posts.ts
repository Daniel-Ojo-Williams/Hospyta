import { MigrationInterface, QueryRunner } from "typeorm";

export class Posts1722103323014 implements MigrationInterface {
    name = 'Posts1722103323014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT 'now', "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()', "title" character varying NOT NULL, "content" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "up_votes" integer NOT NULL DEFAULT '0', "down_votes" integer NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 18:19:37.077471'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 18:19:37.077471'`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
