import {MigrationInterface, QueryRunner} from "typeorm";

export class usersChangeField1641226687524 implements MigrationInterface {
    name = 'usersChangeField1641226687524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
