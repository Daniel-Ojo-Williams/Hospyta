import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCategory1722103858694 implements MigrationInterface {
    name = 'PostCategory1722103858694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT 'now', "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()', "category" character varying NOT NULL, CONSTRAINT "PK_388636ba602c312da6026dc9dbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_388636ba602c312da6026dc9dbc" FOREIGN KEY ("category_id") REFERENCES "post_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_388636ba602c312da6026dc9dbc"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 19:03:02.658607'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 19:03:02.658607'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updated_at" SET DEFAULT '2024-07-27 19:03:02.658607'`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "created_at" SET DEFAULT '2024-07-27 19:03:02.658607'`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "post_category"`);
    }

}
