<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251015123904 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE config (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE covoiturage_user (covoiturage_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_F862CC4962671590 (covoiturage_id), INDEX IDX_F862CC49A76ED395 (user_id), PRIMARY KEY(covoiturage_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE covoiturage_user ADD CONSTRAINT FK_F862CC4962671590 FOREIGN KEY (covoiturage_id) REFERENCES covoiturage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE covoiturage_user ADD CONSTRAINT FK_F862CC49A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE car ADD user_id INT NOT NULL, ADD brand_id INT NOT NULL');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D44F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
        $this->addSql('CREATE INDEX IDX_773DE69DA76ED395 ON car (user_id)');
        $this->addSql('CREATE INDEX IDX_773DE69D44F5D008 ON car (brand_id)');
        $this->addSql('ALTER TABLE covoiturage ADD cars_id INT NOT NULL');
        $this->addSql('ALTER TABLE covoiturage ADD CONSTRAINT FK_28C79E898702F506 FOREIGN KEY (cars_id) REFERENCES car (id)');
        $this->addSql('CREATE INDEX IDX_28C79E898702F506 ON covoiturage (cars_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE covoiturage_user DROP FOREIGN KEY FK_F862CC4962671590');
        $this->addSql('ALTER TABLE covoiturage_user DROP FOREIGN KEY FK_F862CC49A76ED395');
        $this->addSql('DROP TABLE config');
        $this->addSql('DROP TABLE covoiturage_user');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69DA76ED395');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D44F5D008');
        $this->addSql('DROP INDEX IDX_773DE69DA76ED395 ON car');
        $this->addSql('DROP INDEX IDX_773DE69D44F5D008 ON car');
        $this->addSql('ALTER TABLE car DROP user_id, DROP brand_id');
        $this->addSql('ALTER TABLE covoiturage DROP FOREIGN KEY FK_28C79E898702F506');
        $this->addSql('DROP INDEX IDX_28C79E898702F506 ON covoiturage');
        $this->addSql('ALTER TABLE covoiturage DROP cars_id');
    }
}
