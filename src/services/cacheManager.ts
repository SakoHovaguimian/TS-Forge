import Redis from 'ioredis';

export class RedisCacheManager {
  private client: Redis;

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  // Casting to T, assumes the caller knows the correct type.
  async get<T>(key: string): Promise<T | null> {

    try {

      const value = await this.client.get(key);
      if (value === null) return null;

      return JSON.parse(value) as T;

    } catch (error) {
      throw new Error('Failed to get data from cache');
    }

  }

  async set<T>(key: string, value: T, expirationDurationInSeconds: number | undefined = undefined): Promise<void> {

    try {

      const stringValue = JSON.stringify(value);

      if (expirationDurationInSeconds) {
        await this.client.set(key, stringValue, 'EX', expirationDurationInSeconds);
      } else {
        await this.client.set(key, stringValue);
      }

    } catch (error) {
      throw new Error('Failed to set data to cache');
    }

  }

}
