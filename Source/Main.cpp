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

int main(int argc, char *argv[]) {

	static TyranoForce::World world;

//	Mix_Music *music = Mix_LoadMUS("sv_ttt.xm");
//	if (music) {
//		Mix_PlayMusic(music, -1);
//	}
	
#if EMSCRIPTEN
	
	emscripten_set_main_loop([]() {
		gWorld.tick();
		gWorld.draw();
	}, 60, 1);
	
	
#elif __IPHONEOS__

	SDL_iPhoneSetAnimationCallback(world.window, 1, [](void *context) {
		gWorld.tick();
		gWorld.draw();
	}, 0);
	
#else

	while(!world.done) {
		world.tick();
		world.draw();
	}

#endif
	
	return 0;
}
