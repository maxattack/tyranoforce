
SOURCEDIR = ../Source
LPSOURCEDIR = ../little-polygon/src
ZLIBDIR = $(HOME)/src/emscripten/tests/zlib

CPPSOURCES = \
	$(SOURCEDIR)/EnemyBullet.cpp \
	$(SOURCEDIR)/EnemyMissile.cpp \
	$(SOURCEDIR)/EnemyQueen.cpp \
	$(SOURCEDIR)/EnemyScarab.cpp \
	$(SOURCEDIR)/EnemySpider.cpp \
	$(SOURCEDIR)/EnemyUnit.cpp \
	$(SOURCEDIR)/EnemyWasp.cpp \
	$(SOURCEDIR)/Explosion.cpp \
	$(SOURCEDIR)/HeadsUpDisplay.cpp \
	$(SOURCEDIR)/Hero.cpp \
	$(SOURCEDIR)/HeroBullet.cpp \
	$(SOURCEDIR)/Images.cpp \
	$(SOURCEDIR)/Input.cpp \
	$(SOURCEDIR)/Main.cpp \
	$(SOURCEDIR)/ParallaxFX.cpp \
	$(SOURCEDIR)/World.cpp \
	$(LPSOURCEDIR)/AssetBundle.cpp \
	$(LPSOURCEDIR)/BasicPlotter.cpp \
	$(LPSOURCEDIR)/LinePlotter.cpp \
	$(LPSOURCEDIR)/SampleAsset.cpp \
	$(LPSOURCEDIR)/SpriteBatch.cpp \
	$(LPSOURCEDIR)/SpritePlotter.cpp \
	$(LPSOURCEDIR)/TextureAsset.cpp \
	$(LPSOURCEDIR)/TilemapAsset.cpp \
	$(LPSOURCEDIR)/Timer.cpp \
	$(LPSOURCEDIR)/Viewport.cpp \
	$(LPSOURCEDIR)/utils.cpp
CSOURCES = \
	$(ZLIBDIR)/adler32.c \
	$(ZLIBDIR)/compress.c \
	$(ZLIBDIR)/crc32.c \
	$(ZLIBDIR)/deflate.c \
	$(ZLIBDIR)/gzclose.c \
	$(ZLIBDIR)/gzlib.c \
	$(ZLIBDIR)/gzread.c \
	$(ZLIBDIR)/gzwrite.c \
	$(ZLIBDIR)/inflate.c \
	$(ZLIBDIR)/infback.c \
	$(ZLIBDIR)/inftrees.c \
	$(ZLIBDIR)/inffast.c \
	$(ZLIBDIR)/trees.c \
	$(ZLIBDIR)/uncompr.c \
	$(ZLIBDIR)/zutil.c


buildit:
	cp ../Assets/assets.bin ./assets.bin
	emcc -O2 $(CSOURCES) -o cstuff.o
	emcc -O2 $(CPPSOURCES) -o cppstuff.o -I../little-polygon/include -I../little-polygon/vectorial/include -std=c++11
	emcc -O2 cstuff.o cppstuff.o -o tyranoforce.html --preload-file assets.bin 

clean:
	rm -f assets.bin *.o tyranoforce.*
	