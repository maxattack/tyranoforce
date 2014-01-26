#pragma once
#include <littlepolygon_graphics.h>
#include <littlepolygon_sprites.h>
#include <littlepolygon_pools.h>
#include <littlepolygon_utils.h>

#define kDamageBasic                    5
#define kDamageIntermediate             10
#define kDamageAdvanced                 20

#define kHpWasp                         5
#define kHpSpider                       15
#define kHpScarab                       35
#define kHpQueen                        70

#define kWaspSecondsBetweenShots        2.0
#define kSpiderSecondsBetweenShots      2.5
#define kScarabSecondsBetweenShots      3.0
#define kQueenSecondsBetweenShots       4.0

#define kMissileSpeed                   1.25
#define kMissileSpreadDegrees           17.5

#define kHeroInitialLives               3
#define kHeroSecondsPerShoot            0.4
#define kHeroAvoidRadius                64
#define kHeroCaptureRadius              96
#define kHeroTargetAccel                2
#define kHeroAvoidAccel                 5
#define kHeroCaptureAccel               3.75
#define kHeroMaxSpeed                   80
#define kHeroDrag                       0.5
#define kHeroRestHeight                 200.0
#define kHeroTimeScale                  2.5
#define kHeroIterations                 4
#define kHeroBulletSpeed                200.0
#define kHeroBulletDamage               5

#define kHeroRespawnTime                1.5

#define kPowerUpSpeed                   0.25
#define kPowerUpTypeShield              0
#define kPowerUpTypePower               1


#define kExplosionFPS                   20.0f

namespace TyranoForce {

	//------------------------------------------------------------
	// Context (parameters "passed in" from app)
    
	extern vec2 canvasSize;
	extern SDL_Window *window;
	extern AssetRef assets;
	extern SpritePlotterRef renderer;
	extern Timer timer;
    
	//------------------------------------------------------------
	// Input Preprocessor
	
	struct Input {
		bool touchBegan;
		bool touching;
		bool touchEnded;
		
		vec2 touchPosition;
		
		void init();
        void enterFrame();
        bool handleEvent(const SDL_Event &event);
	};

	//------------------------------------------------------------
	// Background / Foreground Scrolling Effects

    struct ParallaxFX {
        ImageAsset *bg;
        ImageAsset *midL;
        ImageAsset *midR;
        ImageAsset *topL;
        ImageAsset *topR;
        
		void init();
        void drawBackground();
        void drawForeground();
    };
    
	//------------------------------------------------------------
	// Helper View for HUD to animate spawn icons in
	
	struct SpawnIconFX {
		COROUTINE_PARAMETER;
		int level;
		float t;
		bool active;
		ImageAsset *activeIcon;
		ImageAsset *inactiveIcon;
		ImageAsset *barNib;
		ImageAsset *spawnLocked[3];
		
		void init(int aLevel);
		void draw();
		
		float xpos();
		ImageAsset *img();
		void show() { COROUTINE_RESET; active=true; }
		void hide() { COROUTINE_DISABLE; }
		void setInactive() { active = false; }
	};
	
	//------------------------------------------------------------
	// Overlay UI and player input controller
	
	struct World;
	
	struct HeadsUpDisplay {
		SpawnIconFX icons[4];
		float arrowPosition;
		float easedArrowPosition;
		float charge;
		int chargeLevel;
		ImageAsset *dinoFace;
		ImageAsset *heroFace;
		bool showPortrait;
		
		void init();
		void showPortraits() { showPortrait = true; }
		
		float actualCharge();
		
		void tick(World& world);
		void draw();
	};
	
	//------------------------------------------------------------
	// Collidable objects
	
	struct Collider {
		vec2 pos;
		vec2 halfSize;
		
		void init(vec2 aPos, vec2 aHalfSize) {
			pos = aPos;
            halfSize = aHalfSize;
        }
        
        void initWithImage(vec2 aPos, ImageAsset *img) {
            pos = aPos;
			halfSize = 0.5f * vec(img->w, img->h);
		}
		
		bool overlaps(const Collider &c) const {
            vec2 offset = pos - c.pos;
            vec2 extent = halfSize + c.halfSize;
            return offset.x * offset.x < extent.x * extent.x &&
                   offset.y * offset.y < extent.y * extent.y;
		}
	};
	
	//------------------------------------------------------------
	// Specialized Game Objects
	
    struct EnemyBullet;
    
	struct Hero {
        Collider collider;
        ImageAsset *img;
		COROUTINE_PARAMETER;
		vec2 speed;
		float firingTimer;
		float flickeringTimer;
		int numShields;
		int power;
		int frame;
		bool isActive;
		int lives;
		
		void init();
		bool flickering() { return flickeringTimer > 0.f; }
		bool isVulnerable() { return isActive && !flickering(); }
		
		bool checkForHit(World& world, EnemyBullet &bullet);
		void kill(World &world);
		void resetSpawnPosition();
		void incrementShieldCount();
		void incrementPower();
		void blowUp();
		void setInactive(float duration);
		
		void computeNextMove(World &world, float dt);
		
		void tick(World &world);
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct HeroBullet {
        Collider collider;
        ImageAsset *img;
		vec2 heading;
		
		void init(vec2 pos, vec2 heading);
		
		bool isOutsideGameArea();
		
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct Explosion {
		ImageAsset *asset;
		vec2 pos;
		float t;
		
		void init(ImageAsset *asset, vec2 pos);
		
		bool isComplete();
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct EnemyUnit {
        Collider collider;
        ImageAsset *img;
		int hp;
		float flickerTime;
		
		bool takeDamage(World &world, int damage);
	};
	
	//------------------------------------------------------------
	
	struct EnemyWasp : EnemyUnit {
		float firingTimer;
		
		void init(float spawnX);
		void tick(World &world);
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct EnemySpider : EnemyUnit {
		float time;
		float firingTimer;
		float restX;
		float vy;
		
		void init(float spawnX);
		void tick(World &world);
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct EnemyScarab : EnemyUnit {
		float firingTimer;
		
		void init(float spawnX);
		void tick(World &world);
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct EnemyQueen : EnemyUnit {
		struct Turret {
			vec2 offset;
			vec2 direction;
			float t;
			
			void init(vec2 offset, vec2 dir);
			void tick(World &world, EnemyQueen &queen);
		};
		
		Turret turrets[12];
		
		void init(float spawnX);
		void tick(World &world);
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct EnemyBullet {
        Collider collider;
        ImageAsset *img;
		vec2 heading;
		
		void init(vec2 pos, vec2 heading);
		
		bool isOutsideGameArea();
		
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	struct EnemyIterator {
        COROUTINE_PARAMETER;
		union {
			EnemyUnit *curr;
			EnemyWasp *wasp;
			EnemySpider *spider;
			EnemyScarab *scarab;
			EnemyQueen *queen;
		};
		World *world;
		EnemyIterator(World *world);
		bool next();
	};
	
	
	//------------------------------------------------------------
	// Facade class for gameplay
	
	struct World {
        Input input;
        ParallaxFX parallax;
		HeadsUpDisplay hud;
		Hero hero;
		CompactPoolWithBuffer<EnemyBullet, 256> enemyBullets;
		CompactPoolWithBuffer<EnemyWasp, 32> wasps;
		CompactPoolWithBuffer<EnemySpider, 16> spiders;
		CompactPoolWithBuffer<EnemyScarab, 8> scarabs;
		CompactPoolWithBuffer<EnemyQueen, 8> queens;
		CompactPoolWithBuffer<HeroBullet, 64> heroBullets;
		CompactPoolWithBuffer<Explosion, 64> explosions;
		
		ImageAsset *dino;
		
		bool anyEnemies() const {
			return wasps.count() ||
			       spiders.count() ||
			       scarabs.count() ||
			       queens.count();
		}
		
		void init();
		
		void draw();
		void tick();
		
		void discharge();
		void spawnEnemyBullet(vec2 pos, vec2 heading);
		void spawnHeroBullet(vec2 pos, vec2 heading);
		void spawnExplosion(vec2 pos, bool isBig);
		void releaseEnemyUnit(EnemyUnit *unit);
	};
	
}

