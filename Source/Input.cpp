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

#include "TyranoForce.h"

TyranoForce::Input::Input() : mTouchBegan(false), mTouching(false), mTouchEnded(false) {
}

void TyranoForce::Input::enterFrame() {
	mTouchBegan = false;
	mTouchEnded = false;
}

bool TyranoForce::Input::handleEvent(const SDL_Event &event) {
	SDL_Point windowSize;
	SDL_GetWindowSize(gWorld.window, &windowSize.x, &windowSize.y);
	vec2 k = gWorld.view.size() / vec2(windowSize);

	switch(event.type) {
	case SDL_MOUSEBUTTONDOWN:
		if (event.button.button == SDL_BUTTON_LEFT) {
			mTouchBegan = true;
			mTouching = true;
			mTouchPosition = k * vec(event.button.x, event.button.y);
			return true;
		}
		break;

	case SDL_MOUSEMOTION:
		if (mTouching) {
			mTouchPosition = k * vec(event.motion.x, event.motion.y);
			return true;
		}
		break;

	case SDL_MOUSEBUTTONUP:
		if (mTouching) {
			mTouchEnded = true;
			mTouching = false;
			mTouchPosition = k * vec(event.motion.x, event.motion.y);
			return true;
		}
		break;
	}
	
	return false;
}

