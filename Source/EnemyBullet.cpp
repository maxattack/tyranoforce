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

TyranoForce::EnemyBullet::EnemyBullet(vec2 aPos, vec2 aHeading) :
Collider(aPos, gWorld.images.enemyBullet),
heading(aHeading) {
}

bool TyranoForce::EnemyBullet::isOutsideGameArea() {
	return !gWorld.view.contains(pos, 16);
}

void TyranoForce::EnemyBullet::tick() {
	pos += heading * gWorld.timer.deltaSeconds;
}

void TyranoForce::EnemyBullet::draw() {
	gWorld.renderer.drawImage(gWorld.images.enemyBullet, pos);
}

