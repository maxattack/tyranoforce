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

void TyranoForce::Hero::init()  {
	COROUTINE_RESET;
	firingTimer = 2;
	flickeringTimer = -1;
	speed = vec(0,0);
	frame = 1;
	isActive = 0;
	lives = 3;
	img = assets.image("hero");
	collider.init(vec(0.5f * canvasSize.x, canvasSize.y+16), vec(2,2));
}

bool TyranoForce::Hero::checkForHit(World& world, EnemyBullet &bullet) {
	if (isVulnerable() && collider.overlaps(bullet.collider)) {
		kill(world);
		return true;
	} else {
		return false;		
	}
}

void TyranoForce::Hero::kill(World &world) {
	isActive = false;
	lives--;
	world.spawnExplosion(collider.pos, true);
	collider.pos = vec(0.5f * canvasSize.x, canvasSize.y + 16);
}

void TyranoForce::Hero::computeNextMove(World &world, float dt) {
	
	// determine target position (default bottom-center)
	vec2 target = 0.5f * vec(canvasSize.x, canvasSize.y);
	
	// if powerup
	// TODO powerups
	
	// determine closest enemy
	EnemyUnit *closest = 0;
	for(EnemyIterator i(&world); i.next();) {
		if (i.curr->collider.pos.y < collider.pos.x - 4 && (!closest || i.curr->collider.pos.y > closest->collider.pos.y)) {
			closest = i.curr;
		}
	}
	if (closest) {
		target.x = closest->collider.pos.x;
	}
	
	// spring physics
	vec2 accel = kHeroTargetAccel * (target - collider.pos);
	
	if (flickeringTimer < 0.8f) {
	
		// bullet avoidance
		for(EnemyBullet *p=world.enemyBullets.begin(); p!=world.enemyBullets.end(); ++p) {
			vec2 delta = collider.pos - p->collider.pos;
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
	collider.pos += dt * speed;
	
	// limits
	float pad = 8;
	if (collider.pos.x < pad) {
		collider.pos.x = pad;
		speed.x = 0;
	} else if (collider.pos.x > canvasSize.x-pad) {
		collider.pos.x = canvasSize.x-pad;
		speed.x = 0;
	}
	
	if (collider.pos.y < 0) {
		collider.pos.y = 0;
		speed.y = 0;
	} else if (collider.pos.y > canvasSize.y) {
		collider.pos.y = canvasSize.y;
		speed.y = 0;
	}
	
	// drag
	speed -= kHeroDrag * speed * dt;
}

void TyranoForce::Hero::tick(World &world) {
	if (flickering()) {
		flickeringTimer -= timer.deltaSeconds;
	}
	
	COROUTINE_BEGIN;
	while(lives>0) {
		// TRANSITION IN
		firingTimer = kHeroSecondsPerShoot;
		flickeringTimer = 3;
		isActive = true;
		while(kHeroRestHeight - collider.pos.y > 4) {
			collider.pos.y += 0.1f * (kHeroRestHeight - collider.pos.y);
			COROUTINE_YIELD;
		}
		
		// ACTIVE
		while(isActive) {
			{
				// fire on a regular interval
				firingTimer -= timer.deltaSeconds;
				if (firingTimer < 0) {
					firingTimer += kHeroSecondsPerShoot;
					if (world.anyEnemies()) {
						assets.sample("shoot")->play();
						world.spawnHeroBullet(collider.pos, vec(0,-kHeroBulletSpeed));
					}
				}

				// integrate motion
				float dt = kHeroTimeScale * timer.deltaSeconds / float(kHeroIterations);
				for(int i=0; i<kHeroIterations; ++i) {
					computeNextMove(world, dt);
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
			firingTimer -= timer.deltaSeconds;
			COROUTINE_YIELD;
		}
		firingTimer = kHeroSecondsPerShoot;
		
	}
	
	COROUTINE_END;
}

void TyranoForce::Hero::draw() {
	if (isActive && (!flickering() || int(8*timer.seconds) % 2==0)) {
		renderer.drawImage(img, collider.pos, frame);
	}
}
