AngularApp.filter("expiration", function ()
{
    return function (milliseconds)
    {
        var mins = milliseconds / 1000 / 60;
        
        if (mins < 1)
            return "Less than a minute";
        
        var days = milliseconds / 1000 / 60 / 60 / 24;
        
        if (days > 7)
            return "An eternity";
        
        return moment.duration(milliseconds, "ms").format("d[d] h[h] m[m]");
    };
});