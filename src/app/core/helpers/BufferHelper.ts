import ByteBuffer = require("bytebuffer");

import Long = require("long");

const s2 = require("s2geometry-node");

export class BufferHelper
{
    public static getWalkBuffer(latitude, longitude)
    {
        var origin = new s2.S2CellId(new s2.S2LatLng(latitude, longitude)).parent(15);
        var walk = [origin.id()];

        // 10 before and 10 after
        var next = origin.next();
        var prev = origin.prev();

        for (var i = 0; i < 10; i++)
        {
            // in range(10):
            walk.push(prev.id());
            walk.push(next.id());
            next = next.next();
            prev = prev.prev();
        }

        walk.sort((a, b) => a - b);

        return walk;
    }
}