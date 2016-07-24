import cache = require("memory-cache");

export class CacheManager
{
    public static resolve<T>(key:string, fallback:() => T, expiry?:number):T
    {
        var cacheItem = cache.get(key);

        if (cacheItem)
            return cacheItem;

        var fallbackItem =  fallback();

        cache.put(key, fallbackItem, expiry);

        return fallbackItem;
    }
}