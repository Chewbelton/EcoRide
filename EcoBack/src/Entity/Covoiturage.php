<?php

namespace App\Entity;

use App\Repository\CovoiturageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: CovoiturageRepository::class)]
class Covoiturage
{
    #[Groups(["covoit-info"])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 50, nullable: true)]
    private ?string $status = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 255)]
    private ?string $adressDepart = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 255)]
    private ?string $cpDepart = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 50)]
    private ?string $heureDepart = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 50)]
    private ?string $dateDepart = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 255)]
    private ?string $adressArrivee = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 255)]
    private ?string $cpArrivee = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 50)]
    private ?string $heureArrivee = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 50)]
    private ?string $dateArrivee = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column]
    private ?string $price = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column]
    private ?string $nbrPlace = null;

    #[Groups(["covoit-info"])]
    #[ORM\Column(length: 50, nullable: true)]
    private ?string $preferences = null;

    #[Groups(["car-covoit-id"])]
    #[ORM\ManyToOne(inversedBy: 'covoiturages')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Car $car = null;

    /**
     * @var Collection<int, User>
     */
    #[Groups(["user-covoit-id"])]
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'covoiturages')]
    private Collection $user;

    public function __construct()
    {
        $this->user = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getAdressDepart(): ?string
    {
        return $this->adressDepart;
    }

    public function setAdressDepart(string $adressDepart): static
    {
        $this->adressDepart = $adressDepart;

        return $this;
    }

    public function getCpDepart(): ?string
    {
        return $this->cpDepart;
    }

    public function setCpDepart(string $cpDepart): static
    {
        $this->cpDepart = $cpDepart;

        return $this;
    }

    public function getHeureDepart(): ?string
    {
        return $this->heureDepart;
    }

    public function setHeureDepart(string $heureDepart): static
    {
        $this->heureDepart = $heureDepart;

        return $this;
    }

    public function getDateDepart(): ?string
    {
        return $this->dateDepart;
    }

    public function setDateDepart(string $dateDepart): static
    {
        $this->dateDepart = $dateDepart;

        return $this;
    }

    public function getAdressArrivee(): ?string
    {
        return $this->adressArrivee;
    }

    public function setAdressArrivee(string $adressArrivee): static
    {
        $this->adressArrivee = $adressArrivee;

        return $this;
    }

    public function getCpArrivee(): ?string
    {
        return $this->cpArrivee;
    }

    public function setCpArrivee(string $cpArrivee): static
    {
        $this->cpArrivee = $cpArrivee;

        return $this;
    }

    public function getHeureArrivee(): ?string
    {
        return $this->heureArrivee;
    }

    public function setHeureArrivee(string $heureArrivee): static
    {
        $this->heureArrivee = $heureArrivee;

        return $this;
    }

    public function getDateArrivee(): ?string
    {
        return $this->dateArrivee;
    }

    public function setDateArrivee(string $dateArrivee): static
    {
        $this->dateArrivee = $dateArrivee;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getNbrPlace(): ?string
    {
        return $this->nbrPlace;
    }

    public function setNbrPlace(string $nbrPlace): static
    {
        $this->nbrPlace = $nbrPlace;

        return $this;
    }

    public function getPreferences(): ?string
    {
        return $this->preferences;
    }

    public function setPreferences(?string $preferences): static
    {
        $this->preferences = $preferences;

        return $this;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): static
    {
        $this->car = $car;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): static
    {
        if (!$this->user->contains($user)) {
            $this->user->add($user);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        $this->user->removeElement($user);

        return $this;
    }
}
