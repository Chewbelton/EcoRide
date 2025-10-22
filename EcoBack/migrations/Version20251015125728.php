<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251015125728 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE role_user (role_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_332CA4DDD60322AC (role_id), INDEX IDX_332CA4DDA76ED395 (user_id), PRIMARY KEY(role_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_reviews (user_id INT NOT NULL, reviews_id INT NOT NULL, INDEX IDX_317DF505A76ED395 (user_id), INDEX IDX_317DF5058092D97F (reviews_id), PRIMARY KEY(user_id, reviews_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE role_user ADD CONSTRAINT FK_332CA4DDD60322AC FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE role_user ADD CONSTRAINT FK_332CA4DDA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_reviews ADD CONSTRAINT FK_317DF505A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_reviews ADD CONSTRAINT FK_317DF5058092D97F FOREIGN KEY (reviews_id) REFERENCES reviews (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE config ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE config ADD CONSTRAINT FK_D48A2F7CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_D48A2F7CA76ED395 ON config (user_id)');
        $this->addSql('ALTER TABLE settings ADD config_id INT NOT NULL');
        $this->addSql('ALTER TABLE settings ADD CONSTRAINT FK_E545A0C524DB0683 FOREIGN KEY (config_id) REFERENCES config (id)');
        $this->addSql('CREATE INDEX IDX_E545A0C524DB0683 ON settings (config_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE role_user DROP FOREIGN KEY FK_332CA4DDD60322AC');
        $this->addSql('ALTER TABLE role_user DROP FOREIGN KEY FK_332CA4DDA76ED395');
        $this->addSql('ALTER TABLE user_reviews DROP FOREIGN KEY FK_317DF505A76ED395');
        $this->addSql('ALTER TABLE user_reviews DROP FOREIGN KEY FK_317DF5058092D97F');
        $this->addSql('DROP TABLE role_user');
        $this->addSql('DROP TABLE user_reviews');
        $this->addSql('ALTER TABLE config DROP FOREIGN KEY FK_D48A2F7CA76ED395');
        $this->addSql('DROP INDEX IDX_D48A2F7CA76ED395 ON config');
        $this->addSql('ALTER TABLE config DROP user_id');
        $this->addSql('ALTER TABLE settings DROP FOREIGN KEY FK_E545A0C524DB0683');
        $this->addSql('DROP INDEX IDX_E545A0C524DB0683 ON settings');
        $this->addSql('ALTER TABLE settings DROP config_id');
    }
}
