<?php

namespace App\Controller;

use App\Entity\Covoiturage;
use App\Repository\CovoiturageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\{JsonResponse, Request, Response};
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

use OpenApi\Attributes as OA;
use OpenApi\Attributes\Property;
use OpenApi\Attributes\RequestBody;

#[Route('api/covoiturage', name: 'app_api_covoiturage_')]
class CovoiturageController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $manager, 
        private CovoiturageRepository $repository,
        private SerializerInterface $serializer,
        private UrlGeneratorInterface $urlGenerator
        )
    {
    }


  /* ____ Creation d'objet ____ */
    #[Route('/create', name: 'create', methods: 'POST')]

    #[OA\Post(
        path:"/api/covoiturage/create",
        summary:"Création d'un nouveau trajet",
        requestBody: new RequestBody(
            required: true,
            description: "Infos du covoiturage",
            content: new OA\JsonContent(
                type: "object",
                properties: [new Property(
                    property: "status",
                    type:"string",
                    example: "À venir"
                ),
                new Property(
                    property: "adressDepart",
                    type: "string",
                    example: "1 rue de la Ville"
                ),
                new Property(
                    property: "cpDepart",
                    type: "string",
                    example: "01256 Ville"
                ),
                new Property(
                    property: "heureDepart",
                    type: "string",
                    example: "10:15"
                ),
                new Property(
                    property: "dateDepart",
                    type: "string",
                    example: "11-11-2025"
                ),
                new Property(
                    property: "adressArrivee",
                    type: "string",
                    example: "2 avenue de la Cité"
                ),
                new Property(
                    property: "cpArrivee",
                    type: "string",
                    example: "14569 Cité"
                ),
                new Property(
                    property: "heureArrivee",
                    type: "string",
                    example: "16:35"
                ),
                new Property(
                    property: "dateArrivee",
                    type: "string",
                    example: "11-11-2025"
                ),
                new Property(
                    property: "price",
                    type: "string",
                    example: "25"
                ),
                new Property(
                    property: "nbrPlace",
                    type: "string",
                    example: "3"
                ),
                new Property(
                    property: "preferences",
                    type: "string",
                    example: null
                )]
            )
        )
    )]

    #[OA\Response(
        response: 201,
        description: "Trajet créé avec succès !",
        content: new OA\JsonContent()
    )]

    public function create(Request $request) : JsonResponse
    {
    $covoiturage = $this->serializer->deserialize(
        $request->getContent(),
        Covoiturage::class,
        'json'
    );

    $this->manager->persist($covoiturage);
    $this->manager->flush();

    $responseData = $this->serializer->serialize($covoiturage, 'json');
    $location = $this->urlGenerator->generate(
        'app_api_covoiturage_read',
        ['id' => $covoiturage->getId()],
        UrlGeneratorInterface::ABSOLUTE_URL,
    );

    return new JsonResponse($responseData, Response::HTTP_CREATED, ["Location" => $location], true);
    }

  /* ____ Lecture d'objet ____ */
    #[Route('/{id}', name: 'read', methods: 'GET')]
    public function read(int $id) : JsonResponse
    {
    $covoiturage = $this->repository->findOneBy(['id' => $id]);

    if($covoiturage) {
        $responseData = $this->serializer->serialize($covoiturage, 'json');
        return new JsonResponse($responseData, Response::HTTP_OK, [], true);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

  /* ____ Modification d'objet ____ */
    #[Route('/{id}', name: 'update', methods: 'PUT')]
    public function update(int $id, Request $request) : JsonResponse
    {
    $covoiturage = $this->repository->findOneBy(['id' => $id]);

    if($covoiturage) {
        $covoiturage = $this->serializer->deserialize(
        $request->getContent(),
        Covoiturage::class,
        'json',
        [AbstractNormalizer::OBJECT_TO_POPULATE => $covoiturage]
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
    $covoiturage = $this->repository->findOneBy(['id' => $id]);

    if($covoiturage) {
        $this->manager->remove($covoiturage);
        $this->manager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
}
