import { Redis } from "ioredis";

const redis = new Redis("rediss://default:AWoJAAIjcDEyNjc1NWZiOTRjMzM0YzIxYjNkYTlkOTYwZmU1MjM0NnAxMA@frank-bug-27145.upstash.io:6379")

export default redis;