export class RetryHelper
{
    public static async retryAsync<T>(action:() => Promise<T>, tries = 5, message?:string):Promise<T>
    {
        try
        {
            return await action();
        }
        catch (err)
        {
            if (tries === 0)
            {
                throw err;
            }

            return await RetryHelper.retryAsync(action, tries - 1, message);
        }
    }
}
