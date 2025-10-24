<?php

namespace App\Controller;

use App\Entity\Car;
use App\Repository\CarRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\{JsonResponse, Request, Response};
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('api/car', name: 'app_api_car_')]
class CarController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $manager, 
        private CarRepository $repository,
        private SerializerInterface $serializer,
        private UrlGeneratorInterface $urlGenerator
        )
    {

    }


  /* ____ Creation d'objet ____ */
    #[Route('/create', name: 'create', methods: 'POST')]
    public function create(Request $request) : JsonResponse
    {
    $car = $this->serializer->deserialize(
        $request->getContent(),
        Car::class,
        'json'
    );

    $this->manager->persist($car);
    $this->manager->flush();

    $responseData = $this->serializer->serialize($car, 'json');
    $location = $this->urlGenerator->generate(
        'app_api_car_read',
        ['id' => $car->getId()],
        UrlGeneratorInterface::ABSOLUTE_URL,
    );

    return new JsonResponse($responseData, Response::HTTP_CREATED, ["Location" => $location], true);
    }

  /* ____ Lecture d'objet ____ */
    #[Route('/{id}', name: 'read', methods: 'GET')]
    public function read(int $id) : JsonResponse
    {
    $car = $this->repository->findOneBy(['id' => $id]);

    if($car) {
        $responseData = $this->serializer->serialize($car, 'json');
        return new JsonResponse($responseData, Response::HTTP_OK, [], true);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

  /* ____ Modification d'objet ____ */
    #[Route('/{id}', name: 'update', methods: 'PUT')]
    public function update(int $id, Request $request) : JsonResponse
    {
    $car = $this->repository->findOneBy(['id' => $id]);

    if($car) {
        $car = $this->serializer->deserialize(
        $request->getContent(),
        Car::class,
        'json',
        [AbstractNormalizer::OBJECT_TO_POPULATE => $car]
        );

        $this->manager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    
    }

  /* ____ Suppression d'objet ____ */
    #[Route('/delete', name: 'delete', methods: 'DELETE')]
    public function delete(int $id) : JsonResponse
    {
    $car = $this->repository->findOneBy(['id' => $id]);

    if($car) {
        $this->manager->remove($car);
        $this->manager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
}
