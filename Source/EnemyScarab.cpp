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

void TyranoForce::EnemyScarab::init(float spawnX) {
	img = assets.image("scarab");
	collider.initWithImage(vec(spawnX, -32), img);
	hp = kHpScarab;
	firingTimer = randomValue() * kScarabSecondsBetweenShots;
}

void TyranoForce::EnemyScarab::tick(World &world) {
	collider.pos.y += 10.f * timer.deltaSeconds;
	
	firingTimer -= timer.deltaSeconds;
	if (firingTimer < 0) {
		firingTimer += kScarabSecondsBetweenShots;
		// TODO: Missiles
	}
	
}

void TyranoForce::EnemyScarab::draw() {
	float framesPerSecond = 10;
	int fr = int(timer.seconds * framesPerSecond) % img->nframes;
	renderer.drawImage(img, collider.pos, fr);
}
