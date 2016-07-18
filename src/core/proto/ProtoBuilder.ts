import protobuf = require("protobufjs");

export class ProtoBuilder
{
    public static buildPokemonProto()
    {
        var builder = protobuf.loadProtoFile("pokemon.proto");

        var pokemonProto = builder.build() as any;

        return {
            request: pokemonProto.RequestEnvelop,
            response: pokemonProto.ResponseEnvelop
        };
    }
}