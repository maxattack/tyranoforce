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

TyranoForce::SpawnIconFX::SpawnIconFX(int aLevel) :
level(aLevel),
barNib(gWorld.assets.image("barNib"))
{
	COROUTINE_DISABLE;
	
	switch(level) {
		case 1:
			activeIcon = gWorld.assets.image("activeIconA");
			inactiveIcon = gWorld.assets.image("inactiveIconA");
			break;
		case 2:
			activeIcon = gWorld.assets.image("activeIconB");
			inactiveIcon = gWorld.assets.image("inactiveIconB");
			break;
		case 3:
			activeIcon = gWorld.assets.image("activeIconC");
			inactiveIcon = gWorld.assets.image("inactiveIconC");
			break;
		default:
			activeIcon = gWorld.assets.image("activeIconD");
			inactiveIcon = gWorld.assets.image("inactiveIconD");
			break;
	}
	
	spawnLocked[0] = gWorld.assets.image("spawnLocked0");
	spawnLocked[1] = gWorld.assets.image("spawnLocked1");
	spawnLocked[2] = gWorld.assets.image("spawnLocked2");
	
}


float TyranoForce::SpawnIconFX::xpos() {
	float dx = gWorld.view.width()/4;
	return dx*level - gWorld.view.width()/8;
}

ImageAsset *TyranoForce::SpawnIconFX::img() {
	return active ? activeIcon : inactiveIcon;
}

void TyranoForce::SpawnIconFX::draw() {
	COROUTINE_BEGIN;
	
	// transition in
	for(t=0; t<0.15f; t+=gWorld.timer.deltaSeconds) {
		{
			int frame = int(3 * t/0.15f);
			float pos = xpos();
			gWorld.renderer.drawImage(barNib, vec(pos-16, gWorld.view.height()+1));
			gWorld.renderer.drawImage(spawnLocked[frame], vec(pos, gWorld.view.height()-2));
		}
		COROUTINE_YIELD;
	}
	
	// main loop
	for(;;) {
		{
			float pos = xpos();
			gWorld.renderer.drawImage(barNib, vec(pos-16, gWorld.view.height()+1));
			gWorld.renderer.drawImage(img(), vec(pos, gWorld.view.height()-2));
		}
		COROUTINE_YIELD;
	}
	
	COROUTINE_END;
}

//----------------------------------------------------------------------------

TyranoForce::HeadsUpDisplay::HeadsUpDisplay() :
icons{SpawnIconFX(1), SpawnIconFX(2), SpawnIconFX(3), SpawnIconFX(3)},
arrowPosition((0.5f * gWorld.view.width())),
easedArrowPosition(arrowPosition),
charge(0.0f),
chargeLevel(0),
showPortrait(false),
heroFace(gWorld.assets.image("heroFace")),
dinoFace(gWorld.assets.image("dinoFace"))
{
}

float TyranoForce::HeadsUpDisplay::actualCharge() {
	return easeOut2(charge);
}

void TyranoForce::HeadsUpDisplay::tick() {
	
	if (gWorld.input.touching()) {
		arrowPosition = clamp(gWorld.input.touchPosition().x, 16, gWorld.view.width()-16);
	}
	
	easedArrowPosition = easeTowards(
		easedArrowPosition,
		arrowPosition,
		0.2f,
		gWorld.timer.deltaSeconds
	);

	float secondsToCharge = 6;
	charge = clamp(charge + gWorld.timer.deltaSeconds/secondsToCharge);
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
			case 1: gWorld.assets.sample("charging1")->play(); break;
			case 2: gWorld.assets.sample("charging2")->play(); break;
			case 3: gWorld.assets.sample("charging3")->play(); break;
			case 4: gWorld.assets.sample("charging4")->play(); break;
		}
	}
	
	if (gWorld.input.touchEnded()) {
		gWorld.discharge();
		if (chargeLevel) {
			gWorld.assets.sample("spawn")->play();
			for(int i=0; i<chargeLevel; ++i) {
				icons[i].hide();
			}
			chargeLevel = 0;
		}
		charge = 0;
	}

}

void TyranoForce::HeadsUpDisplay::draw() {
	// draw the UI
	if (showPortrait) {
		gWorld.renderer.drawImage(dinoFace, vec(0, 4));
		gWorld.renderer.drawImage(heroFace, vec(gWorld.view.width(), 4));
	}
	
	for(int i=0; i<4; ++i) {
		icons[i].draw();
	}
//	gWorld.renderer.drawLabelCentered(
//		gWorld.assets.font("flixel"),
//		vec(0.5f*gWorld.view.width(), gWorld.view.height()-16),
//		rgb(0xffffff),
//		"60s Remaining"
//	);
}



