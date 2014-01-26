#include "TyranoForce.h"

SDL_Window *TyranoForce::window;
vec2 TyranoForce::canvasSize;
AssetRef TyranoForce::assets;
SpritePlotterRef TyranoForce::renderer;
Timer TyranoForce::timer;

#if __IPHONEOS__
static void update(void *context) {
	auto world = (TyranoForce::World*) context;
	glClear(GL_COLOR_BUFFER_BIT);
	world->input.enterFrame();
	SDL_Event event;
	while(SDL_PollEvent(&event)) {
		if (!world->input.handleEvent(event)) {
			auto done = (event.type == SDL_QUIT) ||
			            (event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE);
			if (done) {
				delete world;
				exit(0);
			}
		}
	}
	TyranoForce::timer.tick();
	world->tick();
	world->draw();
	SDL_GL_SwapWindow(TyranoForce::window);
}
#endif

int main(int argc, char *argv[]) {
	int canvasW = 160;
	int canvasH = 240;
	int pixelW = 4 * canvasW;
	int pixelH = 4 * canvasH;
	TyranoForce::window = initContext("TyranoForce", pixelW, pixelH);
	SDL_GetWindowSize(TyranoForce::window, &pixelW, &pixelH);
	TyranoForce::canvasSize = vec(canvasW, canvasW * pixelH / double(pixelW));

	Mix_Music *music = Mix_LoadMUS("sv_ttt.xm");
	if (music) {
		Mix_PlayMusic(music, -1);
	} else {
#if DEBUG
		auto err = SDL_GetError();
		LOG(("%s\n", err));
#endif
	}

	TyranoForce::assets = loadAssets("assets.bin");
	if (!TyranoForce::assets) {
		LOG_MSG("NO ASSETS");
		return -1;
	}

	TyranoForce::renderer = createSpritePlotter();
	TyranoForce::timer.reset();
	TyranoForce::World *world = new TyranoForce::World();
	world->init();

#if __IPHONEOS__
	SDL_iPhoneSetAnimationCallback(TyranoForce::window, 1, update, world);
#else

	auto done = false;
	while(!done) {
		glClear(GL_COLOR_BUFFER_BIT);
		world->input.enterFrame();
		SDL_Event event;
		while(SDL_PollEvent(&event)) {
			if (!world->input.handleEvent(event)) {
				done |= (event.type == SDL_QUIT) ||
						(event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE);
			}
		}
		TyranoForce::timer.tick();
		world->tick();
		world->draw();
		SDL_GL_SwapWindow(TyranoForce::window);
	}

#endif
	return 0;
}
