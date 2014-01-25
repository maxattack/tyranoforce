// TYRANOFORCE
// Copyright (C) 2013 Frederic Tarabout and Max Kaufmann
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

#include "Tyranoforce.h"

using namespace TyranoForce;

void TyranoForce::Explosion::init(ImageAsset *aasset, vec2 apos) {
	pos = apos;
	asset = aasset;
	t = 0;
	assets.sample("boom")->play();
}

bool TyranoForce::Explosion::isComplete() {
	return t >= asset->nframes / kExplosionFPS;
}

void TyranoForce::Explosion::tick() {
	t += timer.deltaSeconds;
}

void TyranoForce::Explosion::draw() {
	renderer.drawImage(asset, pos, t * kExplosionFPS);
}

