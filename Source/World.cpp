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

void TyranoForce::World::init() {
	input.init();
	parallax.init();
	hud.init();
	hero.init();
	dino = assets.image("dino");
}

void TyranoForce::World::draw() {
	renderer.begin(canvasSize);
	parallax.drawBackground();
	parallax.drawForeground();
	
	renderer.drawImage(dino, vec(hud.easedArrowPosition, -6));

	for(EnemyQueen *p=queens.begin(); p!=queens.end(); ++p) { p->draw(); }
	for(EnemyScarab *p=scarabs.begin(); p!=scarabs.end(); ++p) { p->draw(); }
	for(EnemySpider *p=spiders.begin(); p!=spiders.end(); ++p) { p->draw(); }
	for(EnemyWasp *p=wasps.begin(); p!=wasps.end(); ++p) { p->draw(); }
	
	for(Explosion *p=explosions.begin(); p!=explosions.end(); ++p) { p->draw(); }
	
	for(EnemyBullet *p=enemyBullets.begin(); p!=enemyBullets.end(); ++p) { p->draw(); }
	for(HeroBullet *p=heroBullets.begin(); p!=heroBullets.end(); ++p) { p->draw(); }
	
	hero.draw();
	
	hud.draw();
	
	renderer.end();
}

template<typename EnemyType, int N>
static bool collideBulletWith(World& world, HeroBullet &bullet, CompactPoolWithBuffer<EnemyType, N> &enemies) {
	for (EnemyType *e=enemies.begin(); e!=enemies.end();) {
		if (bullet.collider.overlaps(e->collider)) {
			if (e->takeDamage(world, kHeroBulletDamage)) {
				world.releaseEnemyUnit(e);
			}
			world.spawnExplosion(bullet.collider.pos, false);
			world.heroBullets.release(&bullet);
			return true;
		} else {
			e++;
		}
	}
	return false;
}

void TyranoForce::World::tick() {
	hud.tick(*this);
	
	// tick actors
	for (EnemyWasp *p=wasps.begin(); p!=wasps.end();) {
		p->tick(*this);
		if(p->collider.pos.y < 270) { ++p; } else { wasps.release(p); }
	}
	
	for (EnemySpider *p=spiders.begin(); p!=spiders.end();) {
		p->tick(*this);
		if(p->collider.pos.y < 270) { ++p; } else { spiders.release(p); }
	}
	
	for (EnemyScarab *p=scarabs.begin(); p!=scarabs.end();) {
		p->tick(*this);
		if(p->collider.pos.y < 270) { ++p; } else { scarabs.release(p); }
	}
	
	for (EnemyQueen *p=queens.begin(); p!=queens.end();) {
		p->tick(*this);
		if(p->collider.pos.y < 300) { ++p; } else { queens.release(p); }
	}
	
	hero.tick(*this);
	
	// tick hero bullets
	for(HeroBullet *p=heroBullets.begin(); p!=heroBullets.end();) {
		p->tick();
		if (p->isOutsideGameArea()) {
			heroBullets.release(p);
		} else if (!(
			collideBulletWith(*this, *p, wasps) ||
			collideBulletWith(*this, *p, spiders) ||
			collideBulletWith(*this, *p, scarabs) ||
			collideBulletWith(*this, *p, queens)
		)) {
			++p;
		}
	}
	
	// tick enemy bullets
	for(EnemyBullet *p=enemyBullets.begin(); p!=enemyBullets.end();) {
		p->tick();
		if (p->isOutsideGameArea()) {
			enemyBullets.release(p);
		} else if (hero.checkForHit(*this, *p)) {
			enemyBullets.release(p);
		} else {
			++p;
		}
	}
	
	// tick other effects
	for(Explosion *p=explosions.begin(); p!=explosions.end();) {
		p->tick();
		if (p->isComplete()) {
			explosions.release(p);
		} else {
			++p;
		}
	}
}

void TyranoForce::World::discharge() {
	switch(hud.chargeLevel) {
		case 1:
			if (!wasps.isFull()) { wasps.alloc()->init(hud.arrowPosition); }
			break;
		case 2:
			if (!spiders.isFull()) { spiders.alloc()->init(hud.arrowPosition); }
			break;
		case 3:
			if (!scarabs.isFull()) { scarabs.alloc()->init(hud.arrowPosition); }
			break;
		case 4:
			if (!queens.isFull()) { queens.alloc()->init(hud.arrowPosition); }
			break;
	}
}

void TyranoForce::World::spawnEnemyBullet(vec2 pos, vec2 heading) {
	if (!enemyBullets.isFull()) {
		enemyBullets.alloc()->init(pos, heading);
	}
}

void TyranoForce::World::spawnHeroBullet(vec2 pos, vec2 heading) {
	if (!heroBullets.isFull()) {
		heroBullets.alloc()->init(pos, heading);
	}
}

void TyranoForce::World::spawnExplosion(vec2 pos, bool isBig) {
	if (!explosions.isFull()) {
		explosions.alloc()->init(isBig ? assets.image("explosion") : assets.image("expl"), pos);
	}
}

void TyranoForce::World::releaseEnemyUnit(EnemyUnit *unit) {
	if (wasps.active((EnemyWasp*)unit)) {
		wasps.release((EnemyWasp*)unit);
	} else if (spiders.active((EnemySpider*)unit)) {
		spiders.release((EnemySpider*)unit);
	} else if (scarabs.active((EnemyScarab*)unit)) {
		scarabs.release((EnemyScarab*)unit);
	} else if (queens.active((EnemyQueen*)unit)) {
		queens.release((EnemyQueen*)unit);
	}
}

TyranoForce::EnemyIterator::EnemyIterator(World *aWorld) {
	curr = 0;
	world = aWorld;
	COROUTINE_RESET;
}

bool TyranoForce::EnemyIterator::next() {
	COROUTINE_BEGIN;
	for(wasp=world->wasps.begin(); wasp!=world->wasps.end(); ++wasp) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(spider=world->spiders.begin(); spider!=world->spiders.end(); ++spider) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(scarab=world->scarabs.begin(); scarab!=world->scarabs.end(); ++scarab) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(queen=world->queens.begin(); queen!=world->queens.end(); ++queen) {
		COROUTINE_YIELD_RESULT(true);
	}
	curr = 0;
	COROUTINE_END;
	return false;
}

