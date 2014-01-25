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

#define NIB_X           10
#define NIB_OFFSET_Y    15

void TyranoForce::SpawnIconFX::init(int alevel) {
	level = alevel;
	COROUTINE_DISABLE;
	
	switch(level) {
		case 1:
			activeIcon = assets.image("activeIconA");
			inactiveIcon = assets.image("inactiveIconA");
			break;
		case 2:
			activeIcon = assets.image("activeIconB");
			inactiveIcon = assets.image("inactiveIconB");
			break;
		case 3:
			activeIcon = assets.image("activeIconC");
			inactiveIcon = assets.image("inactiveIconC");
			break;
		default:
			activeIcon = assets.image("activeIconD");
			inactiveIcon = assets.image("inactiveIconD");
			break;
	}
	
	barNib = assets.image("barNib");
	spawnLocked[0] = assets.image("spawnLocked0");
	spawnLocked[1] = assets.image("spawnLocked1");
	spawnLocked[2] = assets.image("spawnLocked2");
	
}


float TyranoForce::SpawnIconFX::xpos() {
	float dx = canvasSize.x/4;
	return dx*level - canvasSize.x/8;
}

ImageAsset *TyranoForce::SpawnIconFX::img() {
	return active ? activeIcon : inactiveIcon;
}

void TyranoForce::SpawnIconFX::draw() {
	COROUTINE_BEGIN;
	
	// transition in
	for(t=0; t<0.15f; t+=timer.deltaSeconds) {
		{
			int frame = int(3 * t/0.15f);
			float pos = xpos();
			renderer.drawImage(barNib, vec(pos-16, canvasSize.y+1));
			renderer.drawImage(spawnLocked[frame], vec(pos, canvasSize.y-2));
		}
		COROUTINE_YIELD;
	}
	
	// main loop
	for(;;) {
		{
			float pos = xpos();
			renderer.drawImage(barNib, vec(pos-16, canvasSize.y+1));
			renderer.drawImage(img(), vec(pos, canvasSize.y-2));
		}
		COROUTINE_YIELD;
	}
	
	COROUTINE_END;
}

//----------------------------------------------------------------------------

void TyranoForce::HeadsUpDisplay::init() {

	arrowPosition = easedArrowPosition = 0.5f * canvasSize.x;
	charge = 0.f;
	chargeLevel = 0;
	showPortrait = false;
	for(int i=0; i<4; ++i) {
		icons[i].init(i+1);
	}
	heroFace = assets.image("heroFace");
	dinoFace = assets.image("dinoFace");
}

float TyranoForce::HeadsUpDisplay::actualCharge() {
	return easeOut2(charge);
}

void TyranoForce::HeadsUpDisplay::tick(World& world) {
	
	if (world.input.touching) {
		arrowPosition = clamp(world.input.touchPosition.x, 16, canvasSize.x-16);
	}
	
	easedArrowPosition = easeTowards(
		easedArrowPosition,
		arrowPosition,
		0.2f,
		clamp(60 * timer.deltaSeconds, 0, 0.999f)
	);

	float secondsToCharge = 6;
	charge = clamp(charge + timer.deltaSeconds/secondsToCharge);
	float ch = actualCharge();
	int prevLevel = chargeLevel;
	if (ch > 0.99f) {
		chargeLevel = 4;
	} else if (ch > 0.715f) {
		chargeLevel = 3;
	} else if (ch > 0.425f) {
		chargeLevel = 2;
	} else if (ch > 0.15f) {
		chargeLevel = 1;
	} else {
		chargeLevel = 0;
	}

	if (chargeLevel != prevLevel) {
		if (prevLevel) {
			icons[prevLevel-1].setInactive();
		}
		icons[prevLevel].show();
		switch(chargeLevel) {
			case 1: assets.sample("charging1")->play(); break;
			case 2: assets.sample("charging2")->play(); break;
			case 3: assets.sample("charging3")->play(); break;
			case 4: assets.sample("charging4")->play(); break;
		}
	}
	
	if (world.input.touchEnded) {
		world.discharge();
		if (chargeLevel) {
			assets.sample("spawn")->play();
			for(int i=0; i<chargeLevel; ++i) {
				icons[i].hide();
			}
			chargeLevel = 0;
		}
		charge = 0;
	}
	
//	charge = easeTowards(charge, 0.f, 0.5f, 60.f * deltaTime);
}

void TyranoForce::HeadsUpDisplay::draw() {
	// draw the UI
	if (showPortrait) {
		renderer.drawImage(dinoFace, vec(0, 4));
		renderer.drawImage(heroFace, vec(canvasSize.x, 4));
	}
	
	for(int i=0; i<4; ++i) {
		icons[i].draw();
	}
	renderer.drawLabelCentered(assets.font("flixel"), vec(0.5f*canvasSize.x, canvasSize.y-16), rgb(0xffffff), "60s Remaining");
}

