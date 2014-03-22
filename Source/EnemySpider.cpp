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

TyranoForce::EnemySpider::EnemySpider(float spawnX) :
EnemyUnit(vec(spawnX, -16), gWorld.images.spider, kHpSpider),
time(M_TAU * randomValue()),
firingTimer(randomValue() * kSpiderSecondsBetweenShots),
restX(spawnX - 28.f * sinf(
  0.4f * M_TAU * (gWorld.timer.seconds + time)
)),
vy(175)
{
}

void TyranoForce::EnemySpider::tick() {
	// travel down and slow down
	pos.y += vy * gWorld.timer.deltaSeconds;
	vy += 0.06 * (12.5f - vy); // WARNING: FRAMERATE-DEPENDENT
	
	// zig-zag
	pos.x = restX + 28.f * sin(
		0.4f * M_TAU * (gWorld.timer.seconds + time)
	);
	
	// firing solution
	firingTimer -= gWorld.timer.deltaSeconds;
	if (firingTimer < 0) {
		firingTimer += kSpiderSecondsBetweenShots;
		gWorld.enemyBullets.alloc(pos, vec(-25.f, 50.f));
		gWorld.enemyBullets.alloc(pos, vec(0, 50.f));
		gWorld.enemyBullets.alloc(pos, vec(25.f, 50.f));
	}
}

void TyranoForce::EnemySpider::draw() {
	float framesPerSecond = 10;
	int fr =
		int(gWorld.timer.seconds * framesPerSecond) %
		gWorld.images.spider->nframes;
	gWorld.renderer.drawImage(gWorld.images.spider, pos, fr);
}
