#include "TyranoForce.h"

void TyranoForce::Input::init() {
	touchBegan = false;
	touching = false;
	touchEnded = false;
}

void TyranoForce::Input::enterFrame() {
	touchBegan = false;
	touchEnded = false;
}

bool TyranoForce::Input::handleEvent(const SDL_Event &event) {
	SDL_Point windowSize;
	SDL_GetWindowSize(window, &windowSize.x, &windowSize.y);
	vec2 k = canvasSize / vec2(windowSize);

	switch(event.type) {
	case SDL_MOUSEBUTTONDOWN:
		if (event.button.button == SDL_BUTTON_LEFT) {
			touchBegan = true;
			touching = true;
			touchPosition = k * vec(event.button.x, event.button.y);
			return true;
		}
		break;

	case SDL_MOUSEMOTION:
		if (touching) {
			touchPosition = k * vec(event.motion.x, event.motion.y);
			return true;
		}
		break;

	case SDL_MOUSEBUTTONUP:
		if (touching) {
			touchEnded = true;
			touching = false;
			touchPosition = k * vec(event.motion.x, event.motion.y);
			return true;
		}
		break;
	}
	
	return false;
}

