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

#define CANVAS_WIDTH 160
#define CANVAS_HEIGHT 240

//SDL_GetWindowSize(TyranoForce::window, &pixelW, &pixelH);
//TyranoForce::canvasSize = vec(canvasW, canvasW * pixelH / double(pixelW));

static Viewport makeViewport() {
	Viewport view;
	view.setSizeWithWidth(CANVAS_WIDTH);
	return view;
}

TyranoForce::World::World() :
Singleton<World>(this),
window(initContext("TyranoForce", 4*CANVAS_WIDTH, 4*CANVAS_HEIGHT)),
view(makeViewport()),
plotter(createBasicPlotter(512)),
renderer(plotter),
assets(loadAssets("assets.bin")),
done(false)
{
}

void TyranoForce::World::draw() {
	glClear(GL_COLOR_BUFFER_BIT);
	renderer.begin(view);
	parallax.drawBackground();
	parallax.drawForeground();
	renderer.drawImage(images.dino, vec(hud.getEasedArrowPosition(), -6));
	for(auto& queen : queens) { queen.draw(); }
	for(auto& scarab : scarabs) { scarab.draw(); }
	for(auto& spider : spiders) { spider.draw(); }
	for(auto& wasp : wasps) { wasp.draw(); }
	for(auto& explosion : explosions) { explosion.draw(); }
	for(auto& missile : enemyMissiles) { missile.draw(); }
	for(auto& bullet : enemyBullets) { bullet.draw(); }
	for(auto& bullet : heroBullets) { bullet.draw(); }
	hero.draw();
	hud.draw();
	renderer.end();
	SDL_GL_SwapWindow(window);	
}

template<typename EnemyType>
static bool collideBulletWith(HeroBullet &bullet, CompactPool<EnemyType> &enemies) {
	for (EnemyType *e=enemies.begin(); e!=enemies.end();) {
		if (bullet.overlaps(*e)) {
			if (e->takeDamage(kHeroBulletDamage)) {
				enemies.release(e);
			}
			gWorld.explosions.alloc(bullet.pos, false);
			gWorld.heroBullets.release(&bullet);
			return true;
		} else {
			e++;
		}
	}
	return false;
}

void TyranoForce::World::tick() {
	timer.tick();
	input.enterFrame();
	SDL_Event event;
	while(SDL_PollEvent(&event)) {
		if (!input.handleEvent(event)) {
			done |= (event.type == SDL_QUIT) ||
			(event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE);
		}
	}
	
	hud.tick();
	
	// tick actors
	auto h = view.height()+30;
	for (EnemyWasp *p=wasps.begin(); p!=wasps.end();) {
		p->tick();
		if(p->pos.y < h) { ++p; } else { wasps.release(p); }
	}
	
	for (EnemySpider *p=spiders.begin(); p!=spiders.end();) {
		p->tick();
		if(p->pos.y < h) { ++p; } else { spiders.release(p); }
	}
	
	for (EnemyScarab *p=scarabs.begin(); p!=scarabs.end();) {
		p->tick();
		if(p->pos.y < h) { ++p; } else { scarabs.release(p); }
	}
	
	for (EnemyQueen *p=queens.begin(); p!=queens.end();) {
		p->tick();
		if(p->pos.y < h+30) { ++p; } else { queens.release(p); }
	}
	
	hero.tick();
	
	// tick hero bullets
	for(HeroBullet *p=heroBullets.begin(); p!=heroBullets.end();) {
		p->tick();
		if (p->isOutsideGameArea()) {
			heroBullets.release(p);
		} else if (!(
			collideBulletWith(*p, enemyMissiles) ||
			collideBulletWith(*p, wasps) ||
			collideBulletWith(*p, spiders) ||
			collideBulletWith(*p, scarabs) ||
			collideBulletWith(*p, queens)
		)) {
			++p;
		}
	}
	
	// tick enemy bullets
	for(EnemyBullet *p=enemyBullets.begin(); p!=enemyBullets.end();) {
		p->tick();
		if (p->isOutsideGameArea()) {
			enemyBullets.release(p);
		} else if (hero.checkForHit(p)) {
			enemyBullets.release(p);
		} else {
			++p;
		}
	}
	for(EnemyMissile *p=enemyMissiles.begin(); p!=enemyMissiles.end();) {
		p->tick();
		if (p->isOutsideGameArea()) {
			enemyMissiles.release(p);
		} else if (hero.checkForHit(p)) {
			enemyMissiles.release(p);
		} else {
			++p;
		}
	}
	
	
	// tick other effects
	for(Explosion *p=explosions.begin(); p!=explosions.end();) {
		p->tick();
		if (p->isComplete()) { explosions.release(p); } else { ++p; }
	}
}

void TyranoForce::World::discharge() {
	switch(hud.getChargeLevel()) {
		case 1:
			wasps.alloc(hud.getArrowPosition());
			break;
		case 2:
			spiders.alloc(hud.getArrowPosition());
			break;
		case 3:
			scarabs.alloc(hud.getArrowPosition());
			break;
		case 4:
			queens.alloc(hud.getArrowPosition());
			break;
	}
}

TyranoForce::EnemyIterator::EnemyIterator() {
	curr = 0;
	COROUTINE_RESET;
}

bool TyranoForce::EnemyIterator::next() {
	COROUTINE_BEGIN;
	for(wasp=gWorld.wasps.begin(); wasp!=gWorld.wasps.end(); ++wasp) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(spider=gWorld.spiders.begin(); spider!=gWorld.spiders.end(); ++spider) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(scarab=gWorld.scarabs.begin(); scarab!=gWorld.scarabs.end(); ++scarab) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(queen=gWorld.queens.begin(); queen!=gWorld.queens.end(); ++queen) {
		COROUTINE_YIELD_RESULT(true);
	}
	for(missile=gWorld.enemyMissiles.begin(); missile!=gWorld.enemyMissiles.end(); ++missile) {
		COROUTINE_YIELD_RESULT(true);
	}
	curr = 0;
	COROUTINE_END;
	return false;
}

