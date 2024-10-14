# Banter

Banter is a chat application built using [Next.js](https://nextjs.org/) and [PostgreSQL](https://www.postgresql.org/). This guide will walk you through the local setup process.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)

## Prerequisites

Before setting up Banter locally, ensure you have the following tools installed:

- **Node.js**
- **Yarn** (package manager)
- **Docker** (for running PostgreSQL and Redis)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kant-github/banter.git
2. **Install the dependencies:**
   ```bash
   yarn install
3. **Setup Envs:**
    ##### Copy the given lines in apps/web's .env file
   ```code
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
5. **Database Setup:**
    ##### Run this in your terminal
   ```bash
   docker run -d -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
6. **Gnerate DB client:**
   ```bash
   cd packages/db && npx prisma generate && cd ../..
7. **Start Redis locally:**
   ```bash
   docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
8. **Start the application locally:**
   ```bash
   yarn dev
#### Go the browser at localhost:3000



