import ByteBuffer = require("bytebuffer");
const Long = require("long");

const s2 = require("../io/lib/s2");

Long.fromBignum = function(b, signed) {
    return new Long(b.toNumber(), b.shiftRight(32).toNumber(), signed ? false : true);
};

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
            .forEach(elem => buffer.writeVarint64(Long.fromBignum(elem)));

        // Creating MessageQuad for Requests type=106
        buffer.flip();

        return buffer.toBuffer();
    }
}