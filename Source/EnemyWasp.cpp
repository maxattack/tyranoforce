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

void TyranoForce::EnemyWasp::init(float spawnX) {
	img = assets.image("wasp");
	collider.initWithImage(vec(spawnX, -16), img);
	collider.halfSize *= 0.5f;
	hp = kHpWasp;
	firingTimer = expovariate(kWaspSecondsBetweenShots);
}

void TyranoForce::EnemyWasp::tick(World &world) {
	collider.pos.y += 35.f * timer.deltaSeconds;
	
	firingTimer -= timer.deltaSeconds;
	if (firingTimer < 0) {
		firingTimer = expovariate(kWaspSecondsBetweenShots);
		world.spawnEnemyBullet(collider.pos, vec(randomValue(-12.5f, 12.5f), 50.f));
	}
}

void TyranoForce::EnemyWasp::draw() {
	float framesPerSecond = 10;
	int fr = int(timer.seconds * framesPerSecond) % img->nframes;
	renderer.drawImage(img, collider.pos, fr);
}
