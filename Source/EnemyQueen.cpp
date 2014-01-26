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

void TyranoForce::EnemyQueen::Turret::init(vec2 aOffset, vec2 dir) {
	offset = aOffset;
	direction = dir;
	t = expovariate(kQueenSecondsBetweenShots);
}

void TyranoForce::EnemyQueen::Turret::tick(World &world, EnemyQueen &queen) {
	t -= timer.deltaSeconds;
	if (t < 0) {
		t = expovariate(kQueenSecondsBetweenShots);
		world.spawnEnemyBullet(queen.collider.pos + offset, direction);
	}
}

void TyranoForce::EnemyQueen::init(float spawnX) {
	img = assets.image("queen");
	collider.initWithImage(vec(spawnX, -48), img);
	hp = kHpQueen;
	
	int n = arraysize(turrets)/4;
	int pad = 14;
	for(int i=0; i<arraysize(turrets)/2; ++i) {
		turrets[i+i  ].init(vec(-16, (-n+i)*pad+10), vec(-50, 50));
		turrets[i+i+1].init(vec( 16, (-n+i)*pad+10), vec( 50, 50));
	}
}


void TyranoForce::EnemyQueen::tick(World &world) {
	collider.pos.y += 10.f * timer.deltaSeconds;
	for(int i=0; i<arraysize(turrets); ++i) {
		turrets[i].tick(world, *this);
	}
	
}

void TyranoForce::EnemyQueen::draw() {
	float framesPerSecond = 10;
	int fr = int(timer.seconds * framesPerSecond) % img->nframes;
	renderer.drawImage(img, collider.pos, fr);
}
