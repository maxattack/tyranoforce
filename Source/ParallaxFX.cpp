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

TyranoForce::ParallaxFX::ParallaxFX() :
bg(gWorld.assets.image("background")),
midL(gWorld.assets.image("middleLeft")),
midR(gWorld.assets.image("middleRight")),
topL(gWorld.assets.image("topLeft")),
topR(gWorld.assets.image("topRight")) {
}

void TyranoForce::ParallaxFX::drawBackground() {
	gWorld.renderer.drawImage(bg, vec(0,0));
	gWorld.renderer.drawImage(bg, vec(0,bg->h));
	double y = fmod(64 * gWorld.timer.seconds, 240);
	gWorld.renderer.drawImage(midL, vec(0, y));
	gWorld.renderer.drawImage(midL, vec(0, y-midL->h));
	gWorld.renderer.drawImage(midL, vec(0, y-2*midL->h));
	gWorld.renderer.drawImage(midR, vec(gWorld.view.width(), y));
	gWorld.renderer.drawImage(midR, vec(gWorld.view.width(), y-midR->h));
	gWorld.renderer.drawImage(midR, vec(gWorld.view.width(), y+midR->h));
}

void TyranoForce::ParallaxFX::drawForeground() {
	double y = fmod(300.0 * gWorld.timer.seconds, topL->h);
	gWorld.renderer.drawImage(topL, vec(0, y));
	gWorld.renderer.drawImage(topL, vec(0, y-topL->h));
	gWorld.renderer.drawImage(topL, vec(0, y+topL->h));
	gWorld.renderer.drawImage(topR, vec(gWorld.view.width(), y));
	gWorld.renderer.drawImage(topR, vec(gWorld.view.width(), y-topR->h));
	gWorld.renderer.drawImage(topR, vec(gWorld.view.width(), y+topR->h));
}

