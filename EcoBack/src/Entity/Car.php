<?php

namespace App\Entity;

use App\Repository\CarRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CarRepository::class)]
class Car
{
    #[Groups(["car-creation"])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(["car-creation"])]
    #[ORM\Column(length: 50)]
    private ?string $model = null;

    #[Groups(["car-creation"])]
    #[ORM\Column(length: 50)]
    private ?string $plate_number = null;

    #[Groups(["car-creation"])]
    #[ORM\Column(length: 50)]
    private ?string $date_plate_number = null;

    #[Groups(["car-creation"])]
    #[ORM\Column(length: 50)]
    private ?string $fuel = null;

    #[Groups(["car-creation"])]
    #[ORM\Column(length: 50)]
    private ?string $color = null;

    #[Groups(["car-creation"])]
    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[Groups(["car-creation"])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[Groups(["user-car-relation"])]
    #[ORM\ManyToOne(inversedBy: 'cars')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getPlateNumber(): ?string
    {
        return $this->plate_number;
    }

    public function setPlateNumber(string $plate_number): static
    {
        $this->plate_number = $plate_number;

        return $this;
    }

    public function getDatePlateNumber(): ?string
    {
        return $this->date_plate_number;
    }

    public function setDatePlateNumber(string $date_plate_number): static
    {
        $this->date_plate_number = $date_plate_number;

        return $this;
    }

    public function getFuel(): ?string
    {
        return $this->fuel;
    }

    public function setFuel(string $fuel): static
    {
        $this->fuel = $fuel;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
