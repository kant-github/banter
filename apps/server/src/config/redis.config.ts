import { Redis } from 'ioredis';

const redis = new Redis("redis://localhost:6379");


export default redis;
