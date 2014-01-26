#include "TyranoForce.h"

SDL_Window *TyranoForce::window;
vec2 TyranoForce::canvasSize;
AssetRef TyranoForce::assets;
SpritePlotterRef TyranoForce::renderer;
Timer TyranoForce::timer;

int main(int argc, char *argv[]) {
	int w = 160;
	int h = 320;
	TyranoForce::window = initContext("TyranoForce", 3*w, 3*h);
	SDL_GetWindowSize(TyranoForce::window, &w, &h);
	TyranoForce::canvasSize = vec(w/3,h/3);

	Mix_Music *music = Mix_LoadMUS("sv_ttt.xm");
	if (music) {
		Mix_PlayMusic(music, -1);
	} else {
		auto err = SDL_GetError();
		LOG(("%s\n", err));
	}

	TyranoForce::assets = loadAssets("assets.bin");
	if (!TyranoForce::assets) {
		LOG_MSG("NO ASSETS");
		return -1;
	}

	TyranoForce::renderer = createSpritePlotter();
	TyranoForce::timer.reset();
	TyranoForce::World world;
	world.init();

	auto done = false;
	while(!done) {
		glClear(GL_COLOR_BUFFER_BIT);
		world.input.enterFrame();
		SDL_Event event;
		while(SDL_PollEvent(&event)) {
			if (!world.input.handleEvent(event)) {
				done |= (event.type == SDL_QUIT) ||
						(event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE);
			}
		}
		TyranoForce::timer.tick();
		world.tick();
		world.draw();
		SDL_GL_SwapWindow(TyranoForce::window);
	}

	return 0;
}
