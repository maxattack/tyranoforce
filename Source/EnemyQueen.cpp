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

void TyranoForce::EnemyQueen::Turret::tick(EnemyQueen &queen) {
	t -= gWorld.timer.deltaSeconds;
	if (t < 0) {
		t = expovariate(kQueenSecondsBetweenShots);
		gWorld.enemyBullets.alloc(queen.pos + offset, direction);
	}
}

TyranoForce::EnemyQueen::EnemyQueen(float spawnX) :
EnemyUnit(vec(spawnX, -48), gWorld.images.queen, kHpQueen)
{
	int n = arraysize(turrets)/4;
	int pad = 14;
	for(int i=0; i<arraysize(turrets)/2; ++i) {
		turrets[i+i  ].init(vec(-16, (-n+i)*pad+10), vec(-50, 50));
		turrets[i+i+1].init(vec( 16, (-n+i)*pad+10), vec( 50, 50));
	}
}


void TyranoForce::EnemyQueen::tick() {
	pos.y += 10.f * gWorld.timer.deltaSeconds;
	for(int i=0; i<arraysize(turrets); ++i) {
		turrets[i].tick(*this);
	}
	
}

void TyranoForce::EnemyQueen::draw() {
	float framesPerSecond = 10;
	auto img = gWorld.images.queen;
	int fr = int(gWorld.timer.seconds * framesPerSecond) % img->nframes;
	gWorld.renderer.drawImage(img, pos, fr);
}
