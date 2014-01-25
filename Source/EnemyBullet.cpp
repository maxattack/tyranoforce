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

void TyranoForce::EnemyBullet::init(vec2 aPos, vec2 aHeading) {
	img = assets.image("bullet");
	collider.initWithImage(aPos, img);
	heading = aHeading;
}

bool TyranoForce::EnemyBullet::isOutsideGameArea() {
	return collider.pos.x < -16 ||
	       collider.pos.x > canvasSize.x+16 ||
	       collider.pos.y < -16 ||
	       collider.pos.y > canvasSize.y+16;
}

void TyranoForce::EnemyBullet::tick() {
	collider.pos += heading * timer.deltaSeconds;
}

void TyranoForce::EnemyBullet::draw() {
	renderer.drawImage(img, collider.pos);
}
