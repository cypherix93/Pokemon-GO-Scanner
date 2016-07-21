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
AngularApp.service("HeartbeatTestService", function HeartbeatTestService()
{
    const self = this;
    
    self.getMockHeartbeat = function ()
    {
        return {
            "cells": [
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268184,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                            "Latitude": 40.914350390444774,
                            "Longitude": -73.13233279212388
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268184,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                            "Latitude": 40.91404597417046,
                            "Longitude": -73.13030434790015
                        },
                        {
                            "Latitude": 40.91495821454345,
                            "Longitude": -73.13177958185224
                        },
                        {
                            "Latitude": 40.91491801136429,
                            "Longitude": -73.130488752666
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268183,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "34661eb76ab441959f1d7d9e48ea618b.16",
                            "LastModifiedMs": {
                                "low": 161254589,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.912707,
                            "Longitude": -73.129914,
                            "Team": 2,
                            "GuardPokemonId": 55,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 4146,
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
                            "FortId": "4c9b1580a4af4b9fb64caf92d4646dcb.16",
                            "LastModifiedMs": {
                                "low": -268406320,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.913789,
                            "Longitude": -73.130037,
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
                            "FortId": "cafffa7640d34675a79083d11af8f27e.16",
                            "LastModifiedMs": {
                                "low": -26682971,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.911927,
                            "Longitude": -73.130451,
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
                            "FortId": "ce781d518b154aacbe034b266b0d459b.16",
                            "LastModifiedMs": {
                                "low": 160958094,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.912178,
                            "Longitude": -73.129775,
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
                            "FortId": "d51b27a27be842219a22ea66e24290a8.16",
                            "LastModifiedMs": {
                                "low": 161528114,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.913077,
                            "Longitude": -73.129301,
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
                            "Latitude": 40.912194794230516,
                            "Longitude": -73.13177958185224
                        },
                        {
                            "Latitude": 40.9117216950672,
                            "Longitude": -73.13067315728276
                        },
                        {
                            "Latitude": 40.913200289330625,
                            "Longitude": -73.1313185722673
                        },
                        {
                            "Latitude": 40.91219611392052,
                            "Longitude": -73.13076535953523
                        },
                        {
                            "Latitude": 40.91175562865314,
                            "Longitude": -73.13141077425885
                        },
                        {
                            "Latitude": 40.91220368864039,
                            "Longitude": -73.13030434790015
                        },
                        {
                            "Latitude": 40.91368095568905,
                            "Longitude": -73.13196398542526
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268192,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268192,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                            "Latitude": 40.92198809383835,
                            "Longitude": -73.1346378204724
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268191,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                    "NearbyPokemon": [
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -186887123,
                                "high": -1759479441,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 116,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 287468637,
                                "high": -783147616,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 13,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 1493336205,
                                "high": 1617468560,
                                "unsigned": true
                            }
                        }
                    ]
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268191,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268190,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268190,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268189,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [
                        {
                            "Latitude": 40.921623340403116,
                            "Longitude": -73.1250487494265
                        },
                        {
                            "Latitude": 40.92105962136598,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.92134645441061,
                            "Longitude": -73.12320465111361
                        },
                        {
                            "Latitude": 40.92197308326289,
                            "Longitude": -73.124311111888
                        },
                        {
                            "Latitude": 40.92068971626472,
                            "Longitude": -73.12394229222537
                        },
                        {
                            "Latitude": 40.92123328062258,
                            "Longitude": -73.12449552149597
                        },
                        {
                            "Latitude": 40.921220646096224,
                            "Longitude": -73.12338906161484
                        },
                        {
                            "Latitude": 40.92146473854476,
                            "Longitude": -73.12348126680963
                        },
                        {
                            "Latitude": 40.921666088215545,
                            "Longitude": -73.124311111888
                        },
                        {
                            "Latitude": 40.9219655543769,
                            "Longitude": -73.12477213562876
                        },
                        {
                            "Latitude": 40.92203598755933,
                            "Longitude": -73.12421890702817
                        },
                        {
                            "Latitude": 40.92113637097097,
                            "Longitude": -73.12385008721667
                        }
                    ],
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
                        "high": -1981268189,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                            "Latitude": 40.92277841229597,
                            "Longitude": -73.12763046204549
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": [
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -1604085475,
                                "high": 786228063,
                                "unsigned": true
                            }
                        }
                    ]
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268188,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "008e0a79aff441caa01bac4ddd85cc8a.16",
                            "LastModifiedMs": {
                                "low": 65955718,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.919069,
                            "Longitude": -73.128582,
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
                            "FortId": "a276d9195a2f433c8a2f17f821b02b19.16",
                            "LastModifiedMs": {
                                "low": 166919396,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.920277,
                            "Longitude": -73.12848,
                            "Team": 2,
                            "GuardPokemonId": 121,
                            "GuardPokemonLevel": null,
                            "Enabled": true,
                            "FortType": null,
                            "GymPoints": {
                                "low": 4000,
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
                    "WildPokemon": [
                        {
                            "EncounterId": {
                                "low": 1964986605,
                                "high": -508847824,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 172252852,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.92060676953739,
                            "Longitude": -73.12901351036531,
                            "SpawnPointId": "89e83f24027",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 46
                            },
                            "TimeTillHiddenMs": 323624
                        }
                    ],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.92076153310383,
                            "Longitude": -73.12799927575035
                        }
                    ],
                    "MapPokemon": [
                        {
                            "SpawnpointId": "89e83f24027",
                            "EncounterId": {
                                "low": 1964986605,
                                "high": -508847824,
                                "unsigned": true
                            },
                            "PokedexTypeId": 46,
                            "ExpirationTimeMs": {
                                "low": 172576476,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.92060676953739,
                            "Longitude": -73.12901351036531
                        }
                    ],
                    "NearbyPokemon": [
                        {
                            "PokedexNumber": 46,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": 1964986605,
                                "high": -508847824,
                                "unsigned": true
                            }
                        }
                    ]
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268188,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "b50dd901eeb349469810672901b9a9e6.16",
                            "LastModifiedMs": {
                                "low": 141251561,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.918831,
                            "Longitude": -73.123612,
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
                            "FortId": "e54bc8d7eb514abd9afa8c6df9259484.16",
                            "LastModifiedMs": {
                                "low": -31636579,
                                "high": 341,
                                "unsigned": false
                            },
                            "Latitude": 40.917884,
                            "Longitude": -73.123664,
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
                    "SpawnPoint": [
                        {
                            "Latitude": 40.91821228112466,
                            "Longitude": -73.124311111888
                        },
                        {
                            "Latitude": 40.918680332860816,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.9188816815139,
                            "Longitude": -73.12467993095505
                        },
                        {
                            "Latitude": 40.91835194410736,
                            "Longitude": -73.12421890702817
                        },
                        {
                            "Latitude": 40.91870802141647,
                            "Longitude": -73.12403449719686
                        },
                        {
                            "Latitude": 40.91875708563768,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.91824750254284,
                            "Longitude": -73.12403449719686
                        },
                        {
                            "Latitude": 40.91950323300998,
                            "Longitude": -73.12421890702817
                        },
                        {
                            "Latitude": 40.91888290195757,
                            "Longitude": -73.1236656770876
                        },
                        {
                            "Latitude": 40.91866648845575,
                            "Longitude": -73.12375788217074
                        },
                        {
                            "Latitude": 40.91886905736689,
                            "Longitude": -73.12357347196723
                        },
                        {
                            "Latitude": 40.91860357998164,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.91874324122729,
                            "Longitude": -73.12375788217074
                        },
                        {
                            "Latitude": 40.918679109740204,
                            "Longitude": -73.12486434026523
                        },
                        {
                            "Latitude": 40.91823365833935,
                            "Longitude": -73.12394229222537
                        },
                        {
                            "Latitude": 40.91841485337261,
                            "Longitude": -73.12412670213114
                        },
                        {
                            "Latitude": 40.91891059088446,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.91827519069533,
                            "Longitude": -73.12421890702817
                        },
                        {
                            "Latitude": 40.918735709632806,
                            "Longitude": -73.12421890702817
                        },
                        {
                            "Latitude": 40.918833838312224,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.91869417718105,
                            "Longitude": -73.12394229222537
                        },
                        {
                            "Latitude": 40.91914716053058,
                            "Longitude": -73.1244033167106
                        },
                        {
                            "Latitude": 40.91895965441685,
                            "Longitude": -73.1236656770876
                        },
                        {
                            "Latitude": 40.919127003550265,
                            "Longitude": -73.12375788217074
                        },
                        {
                            "Latitude": 40.91900118769589,
                            "Longitude": -73.12394229222537
                        },
                        {
                            "Latitude": 40.918373320730225,
                            "Longitude": -73.12385008721667
                        },
                        {
                            "Latitude": 40.9190502512903,
                            "Longitude": -73.12375788217074
                        },
                        {
                            "Latitude": 40.918121683564316,
                            "Longitude": -73.12421890702817
                        },
                        {
                            "Latitude": 40.91822612498352,
                            "Longitude": -73.1244033167106
                        },
                        {
                            "Latitude": 40.91891812037436,
                            "Longitude": -73.12338906161484
                        },
                        {
                            "Latitude": 40.91860989158532,
                            "Longitude": -73.1244033167106
                        },
                        {
                            "Latitude": 40.91847776244007,
                            "Longitude": -73.12403449719686
                        },
                        {
                            "Latitude": 40.91926544410287,
                            "Longitude": -73.12467993095505
                        },
                        {
                            "Latitude": 40.9191257829523,
                            "Longitude": -73.12477213562876
                        },
                        {
                            "Latitude": 40.918302878508506,
                            "Longitude": -73.1244033167106
                        },
                        {
                            "Latitude": 40.919049030429186,
                            "Longitude": -73.12477213562876
                        },
                        {
                            "Latitude": 40.91892443522065,
                            "Longitude": -73.12394229222537
                        },
                        {
                            "Latitude": 40.918777241321095,
                            "Longitude": -73.12449552149597
                        },
                        {
                            "Latitude": 40.91893827947203,
                            "Longitude": -73.12403449719686
                        },
                        {
                            "Latitude": 40.91875586278022,
                            "Longitude": -73.12486434026523
                        },
                        {
                            "Latitude": 40.9185482018737,
                            "Longitude": -73.12348126680963
                        }
                    ],
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
                        "high": -1981268187,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "3cdb579e5c1a417b9a838bb738a28bfa.16",
                            "LastModifiedMs": {
                                "low": 144412438,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.917123,
                            "Longitude": -73.125384,
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
                            "FortId": "65853d5986634a1696436d94d7be7a1a.16",
                            "LastModifiedMs": {
                                "low": 152881916,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.915631,
                            "Longitude": -73.124969,
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
                            "FortId": "8190c74a6611482dbdeee6ac8f661719.16",
                            "LastModifiedMs": {
                                "low": 77359119,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.916346,
                            "Longitude": -73.125867,
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
                            "FortId": "aca27c23ec22497ca8d9f4d19e7ca765.16",
                            "LastModifiedMs": {
                                "low": 132006618,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.917208,
                            "Longitude": -73.124232,
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
                            "FortId": "bbcd9197d308401e946a442195a57284.16",
                            "LastModifiedMs": {
                                "low": 158542192,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.91704,
                            "Longitude": -73.123488,
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
                            "FortId": "ee8dd57bef684d148b7fb5bb923379ec.16",
                            "LastModifiedMs": {
                                "low": 149804979,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.915943,
                            "Longitude": -73.123818,
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
                        "high": -1981268187,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [
                        {
                            "FortId": "ee57171109d348db81c3eb00719a09ed.16",
                            "LastModifiedMs": {
                                "low": 156093502,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.915746,
                            "Longitude": -73.126229,
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
                            "Latitude": 40.917517765971915,
                            "Longitude": -73.12735385137572
                        },
                        {
                            "Latitude": 40.91619151736358,
                            "Longitude": -73.12772266552759
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268186,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268186,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
                        "high": 342,
                        "unsigned": false
                    },
                    "Fort": [],
                    "SpawnPoint": [],
                    "WildPokemon": [
                        {
                            "EncounterId": {
                                "low": -1322896003,
                                "high": -1994718209,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 172252852,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.920256972716636,
                            "Longitude": -73.12975113270815,
                            "SpawnPointId": "89e83f26a4b",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 19
                            },
                            "TimeTillHiddenMs": 76184
                        },
                        {
                            "EncounterId": {
                                "low": -432325571,
                                "high": -2005440577,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 172252852,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.920404193486505,
                            "Longitude": -73.1291979161746,
                            "SpawnPointId": "89e83f26a7d",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 16
                            },
                            "TimeTillHiddenMs": 288288
                        },
                        {
                            "EncounterId": {
                                "low": -2084097875,
                                "high": -1131110417,
                                "unsigned": true
                            },
                            "LastModifiedMs": {
                                "low": 172252852,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.92032744152671,
                            "Longitude": -73.1291979161746,
                            "SpawnPointId": "89e83f26a7b",
                            "pokemon": {
                                "Id": null,
                                "PokemonId": 19
                            },
                            "TimeTillHiddenMs": 596888
                        }
                    ],
                    "IsTruncatedList": null,
                    "FortSummary": [],
                    "DecimatedSpawnPoint": [
                        {
                            "Latitude": 40.92010346801698,
                            "Longitude": -73.12975113270815
                        },
                        {
                            "Latitude": 40.920631890025234,
                            "Longitude": -73.1312263702385
                        }
                    ],
                    "MapPokemon": [
                        {
                            "SpawnpointId": "89e83f26a4b",
                            "EncounterId": {
                                "low": -1322896003,
                                "high": -1994718209,
                                "unsigned": true
                            },
                            "PokedexTypeId": 19,
                            "ExpirationTimeMs": {
                                "low": 172329036,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.920256972716636,
                            "Longitude": -73.12975113270815
                        },
                        {
                            "SpawnpointId": "89e83f26a7d",
                            "EncounterId": {
                                "low": -432325571,
                                "high": -2005440577,
                                "unsigned": true
                            },
                            "PokedexTypeId": 16,
                            "ExpirationTimeMs": {
                                "low": 172541140,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.920404193486505,
                            "Longitude": -73.1291979161746
                        },
                        {
                            "SpawnpointId": "89e83f26a7b",
                            "EncounterId": {
                                "low": -2084097875,
                                "high": -1131110417,
                                "unsigned": true
                            },
                            "PokedexTypeId": 19,
                            "ExpirationTimeMs": {
                                "low": 172849740,
                                "high": 342,
                                "unsigned": false
                            },
                            "Latitude": 40.92032744152671,
                            "Longitude": -73.1291979161746
                        }
                    ],
                    "NearbyPokemon": [
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -1322896003,
                                "high": -1994718209,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 16,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -432325571,
                                "high": -2005440577,
                                "unsigned": true
                            }
                        },
                        {
                            "PokedexNumber": 19,
                            "DistanceMeters": 200,
                            "EncounterId": {
                                "low": -2084097875,
                                "high": -1131110417,
                                "unsigned": true
                            }
                        }
                    ]
                },
                {
                    "S2CellId": {
                        "low": 1073741824,
                        "high": -1981268185,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268185,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                        "high": -1981268193,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                            "Latitude": 40.92735926445807,
                            "Longitude": -73.13002774047186
                        },
                        {
                            "Latitude": 40.92786626021151,
                            "Longitude": -73.13187178365739
                        }
                    ],
                    "MapPokemon": [],
                    "NearbyPokemon": []
                },
                {
                    "S2CellId": {
                        "low": -1073741824,
                        "high": -1981268193,
                        "unsigned": true
                    },
                    "AsOfTimeMs": {
                        "low": 172252852,
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
                }
            ]
        };
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