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
                    example: "123-password"
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
                    example: "ROLE_USER"
                )
            )]
        )
    )]

    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));

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
                    example: "123-password"
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
                    example: "ROLE_USER"
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
    #[Route('/account/{id}', name: 'read', methods: 'GET')]
    public function read(int $id) : JsonResponse
    {
    $user = $this->repository->findOneBy(['id' => $id]);

    if($user) {
        $responseData = $this->serializer->serialize($user, 'json');
        return new JsonResponse($responseData, Response::HTTP_OK, [], true);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

  /* Modification de l'objet user */
    #[Route('/{id}', name: 'update', methods: 'PUT')]
    public function update(int $id, Request $request) : JsonResponse
    {
    $user = $this->repository->findOneBy(['id' => $id]);

    if($user) {
        $user = $this->serializer->deserialize(
        $request->getContent(),
        User::class,
        'json',
        [AbstractNormalizer::OBJECT_TO_POPULATE => $user]
        );

        $this->manager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    
    }
}
