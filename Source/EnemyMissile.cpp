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

#include "TyranoForce.h"

TyranoForce::EnemyMissile::EnemyMissile(vec2 aPos, float aRadians) :
EnemyUnit(aPos, gWorld.images.enemyMissile, 1),
radians(aRadians),
heading(unitVector(radians)) {
	halfSize.y = halfSize.x;
}

bool TyranoForce::EnemyMissile::isOutsideGameArea() {
	return !gWorld.view.contains(pos, 16);
}

void TyranoForce::EnemyMissile::tick() {
	auto offset = gWorld.hero.pos - pos;
	radians = easeRadians(
		radians,
		offset.radians(),
		0.015f,
		gWorld.timer.deltaSeconds
	);
	radians = clamp(radians, 0.333f*M_PI, 0.666f*M_PI);
	heading = unitVector(radians);
	pos += (kMissileSpeed * gWorld.timer.deltaSeconds) * heading;
}

void TyranoForce::EnemyMissile::draw() {
	gWorld.renderer.drawImage(gWorld.images.enemyMissile, pos, heading.clockwise());
}

