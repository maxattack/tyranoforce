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

TyranoForce::Hero::Hero() :
firingTimer(2),
flickeringTimer(-1),
speed(0,0),
frame(1),
isActive(0),
lives(3),
img(gWorld.assets.image("hero")),
Collider(vec(0.5f * gWorld.view.width(), gWorld.view.height()+16), vec(2,2))
{
	COROUTINE_RESET;
}

bool TyranoForce::Hero::checkForHit(Collider *c) {
	if (isVulnerable() && overlaps(*c)) {
		kill();
		return true;
	} else {
		return false;		
	}
}

void TyranoForce::Hero::kill() {
	isActive = false;
	lives--;
	gWorld.explosions.alloc(pos, true);
	pos = vec(0.5f * gWorld.view.width(), gWorld.view.height() + 16);
}

void TyranoForce::Hero::computeNextMove(float dt) {
	
	// determine target position (default bottom-center)
	vec2 target = vec(0.5f, 0.75f) *gWorld.view.size();
	
	// if powerup
	// TODO powerups
	
	// determine closest enemy
	EnemyUnit *closest = 0;
	for(EnemyIterator i; i.next();) {
		if (i->pos.y < pos.y - 4 && (!closest || i->pos.y > closest->pos.y)) {
			closest = i;
		}
	}
	if (closest) {
		target.x = closest->pos.x;
	}
	
	// spring physics
	vec2 accel = float(kHeroTargetAccel) * (target - pos);
	
	if (flickeringTimer < 0.8f) {
	
		// bullet avoidance
		for(auto& p : gWorld.enemyBullets) {
			vec2 delta = pos - p.pos;
			float distSq = delta.norm();
			if (distSq < kHeroAvoidRadius * kHeroAvoidRadius) {
				float dist = sqrtf(distSq);
				accel += (kHeroAvoidAccel * (kHeroAvoidRadius - dist) / dist) * delta;
			}
		}
		// TODO missiles
	
	}
	
	// dumb euler integration
	speed += dt * accel;
	float speedMagnitude = speed.magnitude();
	if (speedMagnitude > kHeroMaxSpeed) {
		speed *= (kHeroMaxSpeed / speedMagnitude);
	}
	pos += dt * speed;
	
	// limits
	float pad = 8;
	if (pos.x < pad) {
		pos.x = pad;
		speed.x = 0;
	} else if (pos.x > gWorld.view.width()-pad) {
		pos.x = gWorld.view.width()-pad;
		speed.x = 0;
	}
	
	if (pos.y < 0) {
		pos.y = 0;
		speed.y = 0;
	} else if (pos.y > gWorld.view.height()) {
		pos.y = gWorld.view.height();
		speed.y = 0;
	}
	
	// drag
	speed -= kHeroDrag * speed * dt;
}

void TyranoForce::Hero::tick() {
	if (flickering()) {
		flickeringTimer -= gWorld.timer.deltaSeconds;
	}
	
	COROUTINE_BEGIN;
	while(lives>0) {
		// TRANSITION IN
		firingTimer = kHeroSecondsPerShoot;
		flickeringTimer = 3;
		isActive = true;
		while(kHeroRestHeight - pos.y > 4) {
			pos.y += 0.1f * (kHeroRestHeight - pos.y);
			COROUTINE_YIELD;
		}
		
		// ACTIVE
		while(isActive) {
			{
				// fire on a regular interval
				firingTimer -= gWorld.timer.deltaSeconds;
				if (firingTimer < 0) {
					firingTimer += kHeroSecondsPerShoot;
					if (gWorld.anyEnemies()) {
						gWorld.assets.sample("shoot")->play();
						gWorld.heroBullets.alloc(pos, vec(0,-kHeroBulletSpeed));
					}
				}

				// integrate motion
				float dt = kHeroTimeScale * gWorld.timer.deltaSeconds / float(kHeroIterations);
				for(int i=0; i<kHeroIterations; ++i) {
					computeNextMove(dt);
				}
				
				// keyed frame
				if (speed.x < -1) {
					frame = 0;
				} else if (speed.x > 1) {
					frame = 2;
				} else {
					frame = 1;
				}
				
			}
			COROUTINE_YIELD;
		}

		// INACTIVE
		firingTimer = kHeroRespawnTime;		
		while(firingTimer > 0) {
			firingTimer -= gWorld.timer.deltaSeconds;
			COROUTINE_YIELD;
		}
		firingTimer = kHeroSecondsPerShoot;
		
	}
	
	COROUTINE_END;
}

void TyranoForce::Hero::draw() {
	if (isActive && (!flickering() || int(8*gWorld.timer.seconds) % 2==0)) {
		gWorld.renderer.drawImage(img, pos, frame);
	}
}
