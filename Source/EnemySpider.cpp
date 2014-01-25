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

void TyranoForce::EnemySpider::init(float spawnX) {
	img = assets.image("spider");
	collider.initWithImage(vec(spawnX, -16), img);
	time = M_TAU * randomValue();
	firingTimer = randomValue() * kSpiderSecondsBetweenShots;
	
	restX = spawnX - 28.f * sin(
		0.4f * M_TAU * (timer.seconds + time)
	);
	
	vy = 175;
	hp = kHpSpider;
	
}

void TyranoForce::EnemySpider::tick(World &world) {
	// travel down and slow down
	collider.pos.y += vy * timer.deltaSeconds;
	vy += 0.06 * (12.5f - vy); // WARNING: FRAMERATE-DEPENDENT
	
	// zig-zag
	collider.pos.x = restX + 28.f * sin(
		0.4f * M_TAU * (timer.seconds + time)
	);
	
	// firing solution
	firingTimer -= timer.deltaSeconds;
	if (firingTimer < 0) {
		firingTimer += kSpiderSecondsBetweenShots;
		world.spawnEnemyBullet(collider.pos, vec(-25.f, 50.f));
		world.spawnEnemyBullet(collider.pos, vec(0, 50.f));
		world.spawnEnemyBullet(collider.pos, vec(25.f, 50.f));
	}
}

void TyranoForce::EnemySpider::draw() {
	float framesPerSecond = 10;
	int fr = int(timer.seconds * framesPerSecond) % img->nframes;
	renderer.drawImage(img, collider.pos, fr);
}
