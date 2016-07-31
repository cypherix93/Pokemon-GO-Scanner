import cache = require("memory-cache");

export class CacheManager
{
    public static async resolve<T>(key:string, fallback:() => Promise<T>, expiry?:number):Promise<T>
    {
        var cacheItem = cache.get(key);

        if (cacheItem)
        {
            return cacheItem;
        }

        var fallbackItem = await fallback();

        cache.put(key, fallbackItem, expiry);

        return fallbackItem;
    }
}