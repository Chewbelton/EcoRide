<?php

namespace App\DataFixtures;

use App\Entity\Car;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Exception;

class CarFixtures extends Fixture
{
    /** @throws Exception */
    public function load(ObjectManager $manager): void
    {
        for($i = 1; $i <= 20; $i++) {
            $date = date('2015-06-02');
            $newDate = date('Y-m-d', strtotime($date . "+$i days"));

            $car = (new Car())
                ->setModel("Color$i")
                ->setPlateNumber("$i-number-$i")
                ->setDatePlateNumber($newDate)
                ->setFuel("Essence")
                ->setColor("Couleur");

            $manager->persist($car);
        }

        $manager->flush();
    }
}
