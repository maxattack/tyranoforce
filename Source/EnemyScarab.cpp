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

TyranoForce::EnemyScarab::EnemyScarab(float spawnX) :
EnemyUnit(vec(spawnX, -32), gWorld.images.scarab, kHpScarab),
firingTimer(randomValue() * kScarabSecondsBetweenShots)
{
}

void TyranoForce::EnemyScarab::tick() {
	pos.y += 10.f * gWorld.timer.deltaSeconds;
	
	firingTimer -= gWorld.timer.deltaSeconds;
	if (firingTimer < 0) {
		firingTimer += kScarabSecondsBetweenShots;
		
		gWorld.enemyMissiles.alloc(pos+vec(12,6), (0.5f-0.2f)*M_PI);
		gWorld.enemyMissiles.alloc(pos+vec(-12,6), (0.5f+0.2f)*M_PI);
	}
	
}

void TyranoForce::EnemyScarab::draw() {
	float framesPerSecond = 10;
	auto img = gWorld.images.scarab;
	int fr = int(gWorld.timer.seconds * framesPerSecond) % img->nframes;
	gWorld.renderer.drawImage(img, pos, fr);
}
