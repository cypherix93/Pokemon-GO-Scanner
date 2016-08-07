# PokéRadar

Application that scans nearby locations of Pokémon, Pokéstops, Gyms etc. for Pokémon GO.

> Sorry guys. Looks like Niantic changed a lot on their server side, rendering all API calls to not work anymore. This project will be abandoned until further notice.
> <br>
> If you still want to contribute, please check out the [contribution guidelines](CONTRIBUTING.md).

---

### What's working:

- Worked around Niantic's throttling shenanigans by adding a whole bunch worker accounts in a cluster that can efficiently do heartbeats now. _We are back!_
- Web UI with Google Maps that can show nearby **Pokemon**, **Pokestops** and **Gyms** in a relatively large radius.
- Search feature for quickly finding **Pokemon** / **Pokestops** / **Gyms** in a certain location.

### Roadmap (still WIP):

- Filter map markers by type.
- Faster API queries.
- Larger radius of scanning.

### Contributions

If you want to contribute, please check out the [contribution guidelines](CONTRIBUTING.md).

### Thanks to:

- [Armax's](https://github.com/Armax) project [Poké.io](https://github.com/Armax/Pokemon-GO-node-api), which is almost entirely the core of my project. I copied over most of the functionality to clean, organize, and port to Typescript for ease of extension.
- [tejado](https://github.com/tejado) for the [Pokemon GO API library / demo](https://github.com/tejado/pgoapi).
- [AHAAAAAAA](https://github.com/AHAAAAAAA/) for providing his [proof of conept](https://github.com/AHAAAAAAA/PokemonGo-Map/).

### Disclaimer

Use this at your own risk. This project is purely for educational purposes, use a fake accout to test and _NEVER_ use your real account. If your account gets banned for querying the API in this manner, then it's on you.

### License (MIT)

Copyright (c) 2016 Bik Ghosh

<blockquote>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <br><br>

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. <br><br>

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</blockquote>