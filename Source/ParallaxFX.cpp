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

void TyranoForce::ParallaxFX::init() {
	bg = assets.image("background");
	midL = assets.image("middleLeft");
	midR = assets.image("middleRight");
	topL = assets.image("topLeft");
	topR = assets.image("topRight");
}

void TyranoForce::ParallaxFX::drawBackground() {
	renderer.drawImage(bg, vec(0,0));
	renderer.drawImage(bg, vec(0,bg->h));
	double y = fmod(64 * timer.seconds, 240);
	renderer.drawImage(midL, vec(0, y));
	renderer.drawImage(midL, vec(0, y-midL->h));
	renderer.drawImage(midL, vec(0, y-2*midL->h));
	renderer.drawImage(midR, vec(canvasSize.x, y));
	renderer.drawImage(midR, vec(canvasSize.x, y-midR->h));
	renderer.drawImage(midR, vec(canvasSize.x, y+midR->h));
}

void TyranoForce::ParallaxFX::drawForeground() {
	double y = fmod(300.0 * timer.seconds, topL->h);
	renderer.drawImage(topL, vec(0, y));
	renderer.drawImage(topL, vec(0, y-topL->h));
	renderer.drawImage(topL, vec(0, y+topL->h));
	renderer.drawImage(topR, vec(canvasSize.x, y));
	renderer.drawImage(topR, vec(canvasSize.x, y-topR->h));
	renderer.drawImage(topR, vec(canvasSize.x, y+topR->h));
}

