# Project Name

This project is an API service built with Express.js, Redis, and PostgreSQL. It uses a variety of middlewares such as `morgan`, `helmet`, and `cors`, and includes support for structured logging, validation, and scheduled cron jobs.

## Features

- **Express API**: RESTful endpoints for managing resources.
- **Security**: Uses Helmet to secure HTTP headers.
- **Redis Integration**: Caching layer implemented with Redis for faster data access.
- **Cron Jobs**: Dynamic scheduling of tasks to run at various intervals, such as every day, every second day, or third day.
- **Validation**: Uses `express-validator` to handle request body, query, and param validations.
- **Logging**: Implemented with Winston for structured and detailed logging.
- **Error Handling**: Custom error handling with proper error codes and messages.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js -- Express
- PostgreSQL
- Redis

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:RahulSomaraj/stroll_interview.git
   cd stroll_interview
   npm install --legacy-peer-deps
   npm run dev
   ```

## Redis Caching

By integrating Redis, the application allows multiple users to fetch data without constant database hits.
This boosts performance and reduces the load on the PostgreSQL database, especially in high-traffic scenarios.

## Backend Scaling

- **Pods and Garbage Collection**: Ensure your backend has enough pods to manage increased user traffic. Proper garbage collection helps optimize memory usage, particularly with large datasets.

## Database Partitioning & Sharding

- **Efficient Querying**: Database partitioning and sharding are based on regions, ensuring users from different parts of the world can access data quickly and with minimal latency.
- **Example**: With 196 countries (regions) and 1,000 questions, each region’s queries are optimized by fetching only the relevant questions, reducing the load on the database.

## Redis for Instant Access

Redis caches the region-specific data, allowing for faster responses and reducing the need to query the database frequently. This is essential for maintaining high performance with a large user base.

## Cron Jobs

The system uses cron jobs to regularly update question indices in the database. These jobs ensure that even if the server goes down, the data remains up-to-date and the system functions smoothly. If a region’s questions are exhausted, the index resets to 0, ensuring continuous data availability.

## Summary

This project is optimized for scalability and high availability. Key improvements include:

- **Redis caching** for enhanced performance.
- **Database partitioning and sharding** to handle global user data efficiently.
- **Dynamic cron jobs** to ensure seamless data updates and retrieval.

With these features, the system can handle large-scale user requests with minimal delays and maximum performance, providing a smooth and efficient user experience.
