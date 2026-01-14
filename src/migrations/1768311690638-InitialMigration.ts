import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1768311690638 implements MigrationInterface {
    name = 'InitialMigration1768311690638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
