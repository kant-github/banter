import { Redis } from 'ioredis';

const redis = new Redis("rediss://default:AXArAAIjcDE2NWU2OGY1YjM0Njk0YzA1YjhjMjM5MWY5NTZiYjliMnAxMA@aware-albacore-28715.upstash.io:6379");


export default redis;
