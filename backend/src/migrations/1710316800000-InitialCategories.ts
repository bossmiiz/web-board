import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCategories1710316800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO categories (name, "createdAt", "updatedAt")
            VALUES 
                ('History', NOW(), NOW()),
                ('Food', NOW(), NOW()),
                ('Pets', NOW(), NOW()),
                ('Health', NOW(), NOW()),
                ('Fashion', NOW(), NOW()),
                ('Exercise', NOW(), NOW()),
                ('Others', NOW(), NOW())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM categories
            WHERE name IN ('History', 'Food', 'Pets', 'Health', 'Fashion', 'Exercise', 'Others')
        `);
  }
}
