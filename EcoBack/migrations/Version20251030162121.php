<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251030162121 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE covoiturage (id INT AUTO_INCREMENT NOT NULL, status VARCHAR(50) NOT NULL, adress_depart VARCHAR(255) NOT NULL, cp_depart VARCHAR(255) NOT NULL, heure_depart VARCHAR(50) NOT NULL, date_depart VARCHAR(50) NOT NULL, adress_arrivee VARCHAR(255) NOT NULL, cp_arrivee VARCHAR(255) NOT NULL, heure_arrivee VARCHAR(50) NOT NULL, date_arrivee VARCHAR(50) NOT NULL, price INT NOT NULL, nbr_place INT NOT NULL, preferences VARCHAR(50) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE covoiturage');
    }
}
