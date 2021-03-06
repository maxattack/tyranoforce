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

TyranoForce::Explosion::Explosion(vec2 apos, bool isBig) :
pos(apos), big(isBig), t(0)
{
	gWorld.assets.sample("boom")->play();
}

ImageAsset *Explosion::asset() const {
	return big ? gWorld.images.bigExplosion : gWorld.images.smallExplosion;
}

bool TyranoForce::Explosion::isComplete() {
	
	return t >= asset()->nframes / kExplosionFPS;
}

void TyranoForce::Explosion::tick() {
	t += gWorld.timer.deltaSeconds;
}

void TyranoForce::Explosion::draw() {
	gWorld.renderer.drawImage(asset(), pos, t * kExplosionFPS);
}

