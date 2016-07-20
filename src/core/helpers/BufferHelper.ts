import ByteBuffer = require("bytebuffer");

import bignum = require("bignum");
import Long = require("long");

const s2 = require("simple-s2-node");

export class BufferHelper
{
    public static getWalkBuffer(latitude, longitude)
    {
        var origin = s2.CellId.from_lat_lng(s2.LatLng.from_degrees(latitude, longitude)).parent(15);
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

        // Generating walk data using s2 geometry
        var buffer = new ByteBuffer(21 * 10).LE();

        walk
            .sort((a, b) => a.cmp(b))
            .forEach(elem => buffer.writeVarint64(BufferHelper.convertBigNumToLong(elem)));

        // Creating MessageQuad for Requests type=106
        buffer.flip();

        return buffer.toBuffer();
    }

    private static convertBigNumToLong(b, signed?):Long
    {
        const lowMask = new bignum("ffffffff", 16);

        var low = b.and(lowMask).toNumber();
        var high = b.shiftRight(32).and(lowMask).toNumber();

        return new Long(low, high, !signed);
    }
}