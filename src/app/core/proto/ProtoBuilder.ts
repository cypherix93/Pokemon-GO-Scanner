import protobuf = require("protobufjs");
import path = require("path");

const pathToProtoFile = path.join(__dirname + "/pokemon.proto");

export class ProtoBuilder
{
    public static buildPokemonProto()
    {
        var builder = protobuf.loadProtoFile(pathToProtoFile);

        var pokemonProto = builder.build() as any;

        return {
            request: pokemonProto.RequestEnvelop,
            response: pokemonProto.ResponseEnvelop
        };
    }
}