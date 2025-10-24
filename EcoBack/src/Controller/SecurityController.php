<?php

namespace App\Controller;

use DateTimeImmutable;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\{JsonResponse, Request, Response};
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

use OpenApi\Attributes as OA;
use OpenApi\Attributes\Property;
use OpenApi\Attributes\RequestBody;

#[Route('/api', name: 'app_api_')]
class SecurityController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $manager,
        private UserRepository $repository,
        private SerializerInterface $serializer,
        private UrlGeneratorInterface $urlGenerator
        )
    {
    }

    /* Inscription de l'utilistateur */
    #[Route('/registration', name: 'registration', methods: 'POST')]

    #[OA\Post(
        path:"/api/registration",
        summary:"Inscription d'un nouvel utilisateur",
        requestBody: new RequestBody(
            required: true,
            description: "Donnéesde l'utilisateur à inscrire",
            content: new OA\JsonContent(
                type: "object",
                properties: [new Property(
                    property: "email",
                    type:"string",
                    example: "adresse@mail.com"
                ),
                new Property(
                    property: "password",
                    type: "string",
                    example: "Test-123"
                ),
                new Property(
                    property: "first_name",
                    type: "string",
                    example: "Prenom"
                ),
                new Property(
                    property: "last_name",
                    type: "string",
                    example: "Nom"
                ),
                new Property(
                    property: "phone_number",
                    type: "string",
                    example: "0102030405"
                ),
                new Property(
                    property: "adress",
                    type: "string",
                    example: "1, rue de la Ville"
                ),
                new Property(
                    property: "postal_code",
                    type: "string",
                    example: "01234 Ville"
                ),
                new Property(
                    property: "pseudo",
                    type: "string",
                    example: "TestPseudo"
                ),
                new Property(
                    property: "birth_date",
                    type: "string",
                    example: "01-01-1995"
                ),
                new Property(
                    property: "photo",
                    type: "blob"
                )]
            )
        )
    )]

    #[OA\Response(
        response: 201,
        description: "Utilisateur inscrit avec succès",
        content: new OA\JsonContent(
            type: "object",
            properties: [new Property(
                property: "user",
                type:"string",
                example: "Nom d'utilisateur"
            ),
            new Property(
                property: "api_token",
                type: "string",
                example: "31a023e212f116124a36af14ea0c1c3806eb9378"
            ),
            new Property(
                property: "roles",
                type: "array",
                items: new OA\Items(
                    type: "string",
                    example: "connected"
                )
            )]
        )
    )]

    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
        $user->setCreatedAt(new DateTimeImmutable());

        $this->manager->persist($user);
        $this->manager->flush();

        return new JsonResponse(
            ['user' => $user->getUserIdentifier(),
            'api_token' => $user->getApiToken(),
            'roles' => $user->getRoles()
        ],
            Response::HTTP_CREATED
        );
    }

    /* Connexion de l'utilisateur */
    #[Route('/login', name: 'login', methods: 'POST')]

    #[OA\Post(
        path:"/api/login",
        summary:"Connexion d'un utilisateur",
        requestBody: new RequestBody(
            required: true,
            description: "Identifiants de l'utilisateur",
            content: new OA\JsonContent(
                type: "object",
                properties: [new Property(
                    property: "username",
                    type:"string",
                    example: "adresse@mail.com"
                ),
                new Property(
                    property: "password",
                    type: "string",
                    example: "Test_123"
                )]
            )
        )
    )]

    #[OA\Response(
        response: 201,
        description: "Connexion réussi",
        content: new OA\JsonContent(
            type: "object",
            properties: [new Property(
                property: "user",
                type:"string",
                example: "Nom d'utilisateur"
            ),
            new Property(
                property: "api_token",
                type: "string",
                example: "31a023e212f116124a36af14ea0c1c3806eb9378"
            ),
            new Property(
                property: "roles",
                type: "array",
                items: new OA\Items(
                    type: "string",
                    example: "connected"
                )
            )]
        )
    )]

    public function login(#[CurrentUser] ?User $user): JsonResponse
    {
        if(null === $user) {
            return new JsonResponse(
                ['message' => 'Missing credentials'],
                Response::HTTP_UNAUTHORIZED
            );
        }

        return new JsonResponse([
            'user' => $user->getUserIdentifier(),
            'api_token' => $user->getApiToken(),
            'roles' => $user->getRoles()
        ]);
    }

  /* Lecture de l'objet user */
    #[Route('/account/me', name: 'read', methods: 'GET')]

    #[OA\Get(
        path: "/api/account/me",
        summary: "Récupérer toutes les informations de l'objet User"
    )]
    #[OA\Response(
        response: 200,
        description: "Tous les champs utilisateurs retournés"
    )]

    public function me(): JsonResponse
    {
        $user = $this->getUser();

        $responseData = $this->serializer->serialize($user, "json");

        return new JsonResponse($responseData, Response::HTTP_OK, [], true);
    }

  /* Modification de l'objet user */
    #[Route('/account/edit', name: 'update', methods: 'PUT')]

    #[OA\Put(
        path: "/api/account/edit",
        summary: "Modifier son compte utilisateur avec l'un ou tous les champs",
        requestBody: new RequestBody(
            required: true,
            description: "Nouvelles données éventuelles de l'utilisateur à mettre à jour",
            content: new OA\JsonContent(
                type: "object",
                properties: [new Property(
                    property: "first_name",
                    type: "string",
                    example: "Nouveau prénom"
                )]
            )
        )
    )]

    #[OA\Response(
        response: 204,
        description: "Utilisateur modifié avec succès"
    )]

    public function edit(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = $this->serializer->deserialize(
            $request->getContent(),
            User::class,
            "json",
            [AbstractNormalizer::OBJECT_TO_POPULATE => $this->getUser()]
        );
        $user->setUpdatedAt(new DateTimeImmutable());

        if (isset($request->toArray()["password"])) {
            $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
        }

        $this->manager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
