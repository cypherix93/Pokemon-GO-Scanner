// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "ui.bootstrap",
        "toastr",
        "uiGmapgoogle-maps"
    ]);

var apprequire = function(pathFromApp)
{
    const path = require("path");
    
    return require(path.join("../app/", pathFromApp));
};
// Configure Angular App Preferences
AngularApp.config(["toastrConfig", function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
}]);

AngularApp.config(["uiGmapGoogleMapApiProvider", function (uiGmapGoogleMapApiProvider)
{
    uiGmapGoogleMapApiProvider.configure({
        key: process.env.GOOGLE_MAPS_API_KEY
    });
}]);
// Configure Angular App Routes
AngularApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(false);
}]);
// Configure Angular App Initialization
AngularApp.run(["$rootScope", "$state", function ($rootScope, $state)
{
    $state.go("home");
}]);
AngularApp.service("IPCService", function IPCService()
{
    const self = this;
    
    const IpcClient = require("electron-ipc-tunnel/client").default;
    
    const client = new IpcClient();
    
    self.send = function (channel, request)
    {
        return client.send(channel, request);
    }
});
AngularApp.service("AuthService", ["$q", "$window", function ($q, $window)
{
    const self = this;

}]);
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
AngularApp.service("HeartbeatTestService", function HeartbeatTestService()
{
    const self = this;
    
    self.getMockHeartbeat = function ()
    {
        return {
            "cells": [
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268182,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268181,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268181,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.911357970474775,
                            "Longitude": -73.1313185722673
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268180,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "b5d073be0d614a2e99a78eed8b1c1e4c.16",
                            "LastModifiedMs": {
                                "low": 79508289,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.909922,
                            "Longitude": -73.12709,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268180,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268179,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268179,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "efb2f4b3b1894eafbf766b2e3b1af3ff.16",
                            "LastModifiedMs": {
                                "low": 196649288,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91022,
                            "Longitude": -73.124707,
                            "Team": 1,
                            "GuardPokemonId": 62,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 14411,
                                "high": 0,
                                "unsigned": false
                            },
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.90817178286398,
                            "Longitude": -73.12338906161484
                        },
                        {
                            "Latitude": 40.9096831911025,
                            "Longitude": -73.12578638458236
                        },
                        {
                            "Latitude": 40.90954350214406,
                            "Longitude": -73.12587858880927
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268178,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "6ec8a04fa39b44aab7ec75935f5b83c5.16",
                            "LastModifiedMs": {
                                "low": 195779406,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.911379,
                            "Longitude": -73.123745,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "a55ff6a8f3ac465ea59aa9a2b3c2f6fe.16",
                            "LastModifiedMs": {
                                "low": 189150067,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913059,
                            "Longitude": -73.125425,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "a93435c074b240b796fc0f436ca191ef.16",
                            "LastModifiedMs": {
                                "low": 189172634,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913018,
                            "Longitude": -73.12508,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "ca3e8304a13a41f8aec1a715a4d39873.16",
                            "LastModifiedMs": {
                                "low": -622057253,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.911963,
                            "Longitude": -73.125505,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.912177358016685,
                            "Longitude": -73.12348126680963
                        },
                        {
                            "Latitude": 40.911974761662414,
                            "Longitude": -73.1236656770876
                        },
                        {
                            "Latitude": 40.91089883976805,
                            "Longitude": -73.12467993095505
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268178,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "153ebbf2294443a190f45c0f044020dc.16",
                            "LastModifiedMs": {
                                "low": -172112507,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.911902,
                            "Longitude": -73.12801,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "1f35281bdba4432581a36f3ebc1b5bd3.16",
                            "LastModifiedMs": {
                                "low": 183815159,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.912396,
                            "Longitude": -73.129054,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "80ed25e970924a08989d0746d23991b8.16",
                            "LastModifiedMs": {
                                "low": -1540576429,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.912233,
                            "Longitude": -73.127533,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268177,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "b9da636781614252970b87a4bbe6e790.11",
                            "LastModifiedMs": {
                                "low": -278331061,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.915741,
                            "Longitude": -73.126769,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.91364590556512,
                            "Longitude": -73.12661622128421
                        },
                        {
                            "Latitude": 40.914306517911804,
                            "Longitude": -73.12846029204326
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268177,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "2a7089c0afba40a6b51c483862808798.11",
                            "LastModifiedMs": {
                                "low": 198815601,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.915506,
                            "Longitude": -73.125876,
                            "Team": 3,
                            "GuardPokemonId": 59,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 2000,
                                "high": 0,
                                "unsigned": false
                            },
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "5465c4dd4bd44fb9b9f048e909dd3d9e.16",
                            "LastModifiedMs": {
                                "low": -416544625,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.913542,
                            "Longitude": -73.124941,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "632fc8a458904e4ca87055b3873d95a6.16",
                            "LastModifiedMs": {
                                "low": 194314467,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914822,
                            "Longitude": -73.124228,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "6d7fad54298d4c5d8e0c60ded5164338.16",
                            "LastModifiedMs": {
                                "low": 194341471,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914745,
                            "Longitude": -73.123693,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "7a30b8ec0d1b4010aba998a59733653e.16",
                            "LastModifiedMs": {
                                "low": 194315887,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914472,
                            "Longitude": -73.124229,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "7af280ab354640f3a695692d0ec43dd7.16",
                            "LastModifiedMs": {
                                "low": 150326891,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914035,
                            "Longitude": -73.123708,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "7cf4cc6963874560b059102912548527.16",
                            "LastModifiedMs": {
                                "low": 82703659,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913264,
                            "Longitude": -73.12434,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "8a5958ba17884f728447fe0e0917fc41.16",
                            "LastModifiedMs": {
                                "low": 99016466,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914078,
                            "Longitude": -73.124465,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "8b9eb31616f140acb3098e178cb7b293.16",
                            "LastModifiedMs": {
                                "low": 159245589,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.915365,
                            "Longitude": -73.125121,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "e57902b509d6434984ff914525c96666.12",
                            "LastModifiedMs": {
                                "low": 152595655,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914782,
                            "Longitude": -73.125571,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [
                        {
                            "EncounterId": {
                                "low": 1812348125,
                                "high": -1260429280,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 199587562,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91522635200844,
                            "Longitude": -73.12385008721667,
                            "SpawnPointId": "89e83f2ff83",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 19
                            },
                            "TimeTillHiddenMs": -199587563
                        },
                        {
                            "EncounterId": {
                                "low": 202074797,
                                "high": -1721454096,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 199587562,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91458336576634,
                            "Longitude": -73.12467993095505,
                            "SpawnPointId": "89e83f2f935",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 19
                            },
                            "TimeTillHiddenMs": 446186
                        },
                        {
                            "EncounterId": {
                                "low": 185061645,
                                "high": -1558080240,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 199587562,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91378178631328,
                            "Longitude": -73.12394229222537,
                            "SpawnPointId": "89e83f2fc4b",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 16
                            },
                            "TimeTillHiddenMs": 626818
                        },
                        {
                            "EncounterId": {
                                "low": -633559571,
                                "high": -1910984657,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 199587562,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91498977073803,
                            "Longitude": -73.12329685638284,
                            "SpawnPointId": "89e83f2ffe7",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 13
                            },
                            "TimeTillHiddenMs": 820978
                        },
                        {
                            "EncounterId": {
                                "low": 1515972525,
                                "high": -1822662416,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 199587562,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91418572865019,
                            "Longitude": -73.12458772624413,
                            "SpawnPointId": "89e83f2fc01",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 66
                            },
                            "TimeTillHiddenMs": 46106
                        }
                    ],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.914044805807606,
                            "Longitude": -73.12569418031818
                        },
                        {
                            "Latitude": 40.91366349470391,
                            "Longitude": -73.1236656770876
                        }
                    ],
                    "MapPokemon": [
                        {
                            "SpawnpointId": "89e83f2ff83",
                            "EncounterId": {
                                "low": 1812348125,
                                "high": -1260429280,
                                "unsigned": true
                            },
                            "PokedexTypeId": 19,
                            "ExpirationTimeMs": {
                                "low": -1,
                                "high": -1,
                                "unsigned": false
                            },
                            "Latitude": 40.91522635200844,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "SpawnpointId": "89e83f2f935",
                            "EncounterId": {
                                "low": 202074797,
                                "high": -1721454096,
                                "unsigned": true
                            },
                            "PokedexTypeId": 19,
                            "ExpirationTimeMs": {
                                "low": 200033748,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91458336576634,
                            "Longitude": -73.12467993095505
                        },
                        {
                            "SpawnpointId": "89e83f2fc4b",
                            "EncounterId": {
                                "low": 185061645,
                                "high": -1558080240,
                                "unsigned": true
                            },
                            "PokedexTypeId": 16,
                            "ExpirationTimeMs": {
                                "low": 200214380,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91378178631328,
                            "Longitude": -73.12394229222537
                        },
                        {
                            "SpawnpointId": "89e83f2ffe7",
                            "EncounterId": {
                                "low": -633559571,
                                "high": -1910984657,
                                "unsigned": true
                            },
                            "PokedexTypeId": 13,
                            "ExpirationTimeMs": {
                                "low": 200408540,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91498977073803,
                            "Longitude": -73.12329685638284
                        },
                        {
                            "SpawnpointId": "89e83f2fc01",
                            "EncounterId": {
                                "low": 1515972525,
                                "high": -1822662416,
                                "unsigned": true
                            },
                            "PokedexTypeId": 66,
                            "ExpirationTimeMs": {
                                "low": 199633668,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91418572865019,
                            "Longitude": -73.12458772624413
                        }
                    ],
                    "NearbyPokemon": [
                        {
                            "PokedexNumber": 16,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 1358580429,
                                "high": 1934251984,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 1812348125,
                                "high": -1260429280,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 202074797,
                                "high": -1721454096,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 935569005,
                                "high": 1865166000,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 16,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 185061645,
                                "high": -1558080240,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 13,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -633559571,
                                "high": -1910984657,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 66,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 1515972525,
                                "high": -1822662416,
                                "unsigned": true
                            }
                        }
                    ]
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268176,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "31b2bb9fbfd24396b154946101ff4b49.16",
                            "LastModifiedMs": {
                                "low": 175806155,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.912852,
                            "Longitude": -73.120544,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "3b09dd94f6c74be1b5dbad19f21ccbb9.11",
                            "LastModifiedMs": {
                                "low": 189334477,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914322,
                            "Longitude": -73.121069,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "4e43ed1d70a74ba88f6d1e4c13774b0c.16",
                            "LastModifiedMs": {
                                "low": 144403971,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914701,
                            "Longitude": -73.122734,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "67a7ac51099a485f858e11cbc1f2a3b7.16",
                            "LastModifiedMs": {
                                "low": 137389539,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914035,
                            "Longitude": -73.122512,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "79a689d49e1a49bc8f4f0bc430663420.16",
                            "LastModifiedMs": {
                                "low": 162363460,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913451,
                            "Longitude": -73.122493,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "8ee95efa68324ab9b2f555ea4b8d2895.16",
                            "LastModifiedMs": {
                                "low": 160508631,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913123,
                            "Longitude": -73.121746,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "93f7d40edb6a4b7390f7b9b7b65a4ac3.11",
                            "LastModifiedMs": {
                                "low": 187111693,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913968,
                            "Longitude": -73.121606,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "c4244bb3705b42399497f17b02f112f7.11",
                            "LastModifiedMs": {
                                "low": 189336201,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914423,
                            "Longitude": -73.1217,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "f57a14cb3a8747c68c23219987d05e4c.16",
                            "LastModifiedMs": {
                                "low": 199572210,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.914556,
                            "Longitude": -73.120552,
                            "Team": 1,
                            "GuardPokemonId": 131,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 3000,
                                "high": 0,
                                "unsigned": false
                            },
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "fb723706f9d743aabd47dbf6b41036cd.16",
                            "LastModifiedMs": {
                                "low": 89381304,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913443,
                            "Longitude": -73.12108,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.91326829658765,
                            "Longitude": -73.12154494990449
                        },
                        {
                            "Latitude": 40.91492054657053,
                            "Longitude": -73.12283582966454
                        },
                        {
                            "Latitude": 40.91396422395829,
                            "Longitude": -73.12311244580715
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": [
                        {
                            "PokedexNumber": 41,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 431926541,
                                "high": 517695760,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 13,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 395241805,
                                "high": -456878512,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -1449148291,
                                "high": -1268101889,
                                "unsigned": true
                            }
                        }
                    ]
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268176,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "96f5c95e866b4695b4448c55797fd592.16",
                            "LastModifiedMs": {
                                "low": 190066589,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913655,
                            "Longitude": -73.118438,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "9d898367201a4cb3bd26829ef6494416.16",
                            "LastModifiedMs": {
                                "low": -597341961,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.912679,
                            "Longitude": -73.119483,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "ce5af986538e428eb62fa06063e8f1b0.16",
                            "LastModifiedMs": {
                                "low": 175336645,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913075,
                            "Longitude": -73.120119,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.91341788422208,
                            "Longitude": -73.11896316851187
                        },
                        {
                            "Latitude": 40.91364064289607,
                            "Longitude": -73.11942420304179
                        },
                        {
                            "Latitude": 40.91296998820623,
                            "Longitude": -73.1200696498219
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268175,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268175,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "2c57190fc02244799e16522a88a02f74.16",
                            "LastModifiedMs": {
                                "low": 189760478,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91225,
                            "Longitude": -73.122716,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "4106086ad88649abbf68eaaea86a3e41.16",
                            "LastModifiedMs": {
                                "low": -541826567,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.912328,
                            "Longitude": -73.1219,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "5138bc095bb643269880d362069c39f3.16",
                            "LastModifiedMs": {
                                "low": -3545757,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.911314,
                            "Longitude": -73.120883,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.911462473046086,
                            "Longitude": -73.12025406285295
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268174,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "6c9fa6402f564498876551ddf0d1433a.16",
                            "LastModifiedMs": {
                                "low": 193303506,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.909769,
                            "Longitude": -73.121738,
                            "Team": 2,
                            "GuardPokemonId": 143,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 6069,
                                "high": 0,
                                "unsigned": false
                            },
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "d0d728319ce94da2b0c98913d398ffcb.16",
                            "LastModifiedMs": {
                                "low": -326412464,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.910021,
                            "Longitude": -73.122725,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268174,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268173,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "3bad7c9242d843ef874348ca8d4f80db.16",
                            "LastModifiedMs": {
                                "low": -21206973,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.905973,
                            "Longitude": -73.119933,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        },
                        {
                            "FortId": "8706d4da55954ea280d8524fac7ac441.16",
                            "LastModifiedMs": {
                                "low": -621136671,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.904776,
                            "Longitude": -73.117756,
                            "Team": null,
                            "GuardPokemonId": null,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": 1,
                            "GymPoints": null,
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268173,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268172,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.90867721820387,
                            "Longitude": -73.1149982331927
                        },
                        {
                            "Latitude": 40.90850983831095,
                            "Longitude": -73.11490602457704
                        },
                        {
                            "Latitude": 40.909185700247065,
                            "Longitude": -73.11582810906171
                        },
                        {
                            "Latitude": 40.9075748100832,
                            "Longitude": -73.11481381592424
                        },
                        {
                            "Latitude": 40.908815733001816,
                            "Longitude": -73.11592031730584
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268172,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 199587562,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "79fe57efc1bc40638f074f2ebdd32220.16",
                            "LastModifiedMs": {
                                "low": 194578215,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.906263,
                            "Longitude": -73.115053,
                            "Team": 2,
                            "GuardPokemonId": 42,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 6247,
                                "high": 0,
                                "unsigned": false
                            },
                            "IsInBattle": null,
                            "ActiveFortModifier": null,
                            "LureInfo": null,
                            "CooldownCompleteMs": null,
                            "Sponsor": null,
                            "RenderingType": null
                        }
                    ],
                    "SpawnPoint": [],
                    "WildPokemon": [],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.905970223153915,
                            "Longitude": -73.114352772103
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                }
            ]
        }
    
    }
});
AngularApp.service("ModalService", ["$q", "$http", "$compile", "$rootScope", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.element = element;
        _instance.state = "default";

        _instance.onOpen = options.onOpen;
        _instance.onClose = options.onClose;

        // Init the modal
        _instance.element.modal({
            show: false
        });

        // Width fix
        _instance.element.width(options.width);

        // Event Handlers
        _instance.element.on("show", function ()
        {
            // Margin fix
            _instance.element.css("margin-left", -(_instance.element.width() / 2));

            if (_instance.onOpen)
                _instance.onOpen();
        });
        _instance.element.on("hidden", function ()
        {
            if (_instance.onClose)
                _instance.onClose();
        });

        // Open and Close functions
        _instance.open = function ()
        {
            _instance.element.modal("show");
        };
        _instance.close = function ()
        {
            _instance.element.modal("hide");
        };
    };

    // Create modal from Template URL
    exports.createModal = function (templateUrl, options)
    {
        var def = $q.defer();

        // Get the template markup from the URL provided
        $http.get(templateUrl)
            .success(function (response)
            {
                var element = angular.element(response);

                var scope = $rootScope.$new(true);
                $compile(element)(scope);

                angular.element("#content-container").append(element);

                var modalInstance = new ModalInstance(element, options || {width: 600});

                def.resolve(modalInstance);
            });

        return def.promise;
    };

    // Store for all the global modals
    exports.modals = {};

    exports.waitUntilReady = function (modalName)
    {
        var def = $q.defer();

        var watch = $rootScope.$watch(function()
        {
            return !!exports.modals[modalName];
        }, function()
        {
            def.resolve(exports.modals[modalName]);
            watch();
        });

        return def.promise;
    };

    // Global modals init function
    exports.initGlobalModals = function ()
    {
    };
}]);
AngularApp.component("homeComponent", {
    controller: "HomeController as Home",
    templateUrl: "templates/app/home/Home.template.html"
});
AngularApp.controller("HomeController", ["HeartbeatTestService", function HomeController(HeartbeatTestService)
{
    const MapPokemon = apprequire("./core/models/map/MapPokemon").MapPokemon;
    
    const self = this;
        
    self.map = {
        center: {
            latitude: 40.925493,
            longitude: -73.123182
        },
        zoom: 16,
        options: {
            disableDefaultUI: true,
            zoomControl: true
        }
    };
    
    self.pokemonMarkers = [];
    
    var heartbeat = HeartbeatTestService.getMockHeartbeat();
    
    var pokemons = _.flatten(
        heartbeat.cells
        .map(x => x.MapPokemon)
    );
    
    for (let pokemon of pokemons)
    {
        let latitude = pokemon.Latitude;
        let longitude = pokemon.Longitude;
        let pokemonId = pokemon.PokedexTypeId;
        
        self.pokemonMarkers.push(new MapPokemon(latitude, longitude, pokemonId));
    }
    
    console.log(self.pokemonMarkers);
}]);
AngularApp.config(["$stateProvider", function ($stateProvider)
{
    $stateProvider.state("home",
        {
            url: "/",
            templateUrl: "views/home/index.html",
            onEnter: ["$rootScope", function($rootScope)
            {
                $rootScope.PageName = "Home"
            }]
        });
}]);
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put('templates/app/home/Home.template.html','<ui-gmap-google-map center="Home.map.center" zoom="Home.map.zoom" options="Home.map.options">\r\n    <ui-gmap-marker ng-repeat="pokemon in Home.pokemonMarkers" idkey="pokemon.id" coords="pokemon.coords" options="{icon: pokemon.pokemon.icons.small}">\r\n    </ui-gmap-marker>\r\n</ui-gmap-google-map>');}]);