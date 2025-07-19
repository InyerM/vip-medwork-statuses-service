# VIP Medwork - Statuses Microservice

This repository contains the statuses microservice required by the VIP Medwork system.

---

## 🧰 Technologies

• NestJS • TypeScript • PostgreSQL • TypeORM • RabbitMQ • Docker • Zod

---

## 📦 Requirements

• Docker • Docker Compose (optional if using multiple services)

---

## 🚀 How to Run a Microservice

Each microservice has its own Dockerfile. You can build and run it individually:

1. Navigate to the microservice folder

cd statuses-service # or providers-service, etc.

2. Build the Docker image

```bash
docker build -t vip-medwork-statuses .
```

Replace vip-medwork-statuses with the appropriate name for each service.

3. Run the container

```bash
docker run -d --env-file .env vip-medwork-statuses
```

---

## 🗂 Folder Structure (Each Service)

```bash
/src
  /app             → Application files (app.module.ts)
  /modules         → Feature modules (statuses, etc.)
  /common          → Common files (utils, enums, etc.)
  /router          → API routes
  /main.ts         → App bootstrap file
```

---

## 📚 How to Seed the Database

1. Navigate to the microservice folder

```bash
cd statuses-service
```

2. Copy scripts/seed.sql to your PostgreSQL database

```bash
psql -U <username> -d <database> -f scripts/seed.sql
```

---

## ⚠️ Notes

• Each service must be configured with its own .env file. • All responses should follow the
GenericResponse<T> structure. • Run the seed script to populate the database with initial data.

---

## 👨‍💻 Author

Built by Inyer 👨‍💻
