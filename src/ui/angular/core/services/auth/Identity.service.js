AngularApp.service("IdentityService", function ()
{
    const self = this;

    // Current User Identity
    self.currentUser = undefined;

    // Function to check if the current user is authenticated
    self.isAuthenticated = function ()
    {
        return !!self.currentUser;
    };
});