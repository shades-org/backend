# HypePitch

## Tech Stack:

1. Backend
   - MongoDB Atlas (Database)
   - ExpressJS (API Framework)
   - Prisma (ORM)
   - Firebase Admin SDK
1. Frontend
   - ReactJS
   - Firebase (Auth)
   - Axios (network requests)

## Basic Auth Flow:

There are basically 2 types of routes:

1. Unprotected
1. Only Pitcher
1. Only Investor
1. Both Investor and Pitcher

Here, we are implementing the role-based access over those endpoints by decrypting the tokens received from client end.

- If "x-firebase-token" is valid, then its a valid Pitcher

- If "x-access-token" is valid, then its a valid Investor.
