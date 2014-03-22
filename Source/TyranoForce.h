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

#define kMissileSpeed                   40.0
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
	// Input Preprocessor
	
	class Input {
	private:
		vec2 mTouchPosition;
		bool mTouchBegan;
		bool mTouching;
		bool mTouchEnded;
		
		
	public:
		
		vec2 touchPosition() const { return mTouchPosition; }
		bool touchBegan() const { return mTouchBegan; }
		bool touching() const { return mTouching; }
		bool touchEnded() const { return mTouchEnded; }
		
		Input();
        void enterFrame();
        bool handleEvent(const SDL_Event &event);
	};

	//------------------------------------------------------------
	// Background / Foreground Scrolling Effects

    class ParallaxFX {
	private:
        ImageAsset *bg;
        ImageAsset *midL;
        ImageAsset *midR;
        ImageAsset *topL;
        ImageAsset *topR;
        
	public:
		ParallaxFX();
        void drawBackground();
        void drawForeground();
    };
    
	//------------------------------------------------------------
	// Helper View for HUD to animate spawn icons in
	
	class SpawnIconFX {
	private:
		COROUTINE_PARAMETER;
		int level;
		float t;
		bool active;
		ImageAsset *activeIcon;
		ImageAsset *inactiveIcon;
		ImageAsset *barNib;
		ImageAsset *spawnLocked[3];
		
	public:
		SpawnIconFX(int aLevel);

		void draw();
		
		float xpos();
		ImageAsset *img();
		void show() { COROUTINE_RESET; active=true; }
		void hide() { COROUTINE_DISABLE; }
		void setInactive() { active = false; }
	};
	
	//------------------------------------------------------------
	// Overlay UI and player input controller
	
	class HeadsUpDisplay {
	private:
		SpawnIconFX icons[4];
		float arrowPosition;
		float easedArrowPosition;
		float charge;
		int chargeLevel;
		ImageAsset *dinoFace;
		ImageAsset *heroFace;
		bool showPortrait;
	
	public:
		HeadsUpDisplay();
		void showPortraits() { showPortrait = true; }
		
		float actualCharge();
		float getArrowPosition() const { return arrowPosition; }
		float getEasedArrowPosition() const { return easedArrowPosition; }
		float getCharge() const { return charge; }
		int getChargeLevel() const { return chargeLevel; }
		
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	// Collidable objects
	
	struct Collider {
		vec2 pos;
		vec2 halfSize;
		
		Collider(vec2 aPos, vec2 aHalfSize) :
		pos(aPos), halfSize(aHalfSize) {
        }
        
        Collider(vec2 aPos, ImageAsset *img) :
		pos(aPos), halfSize(0.5f * vec(img->w, img->h)) {
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
	
    class EnemyBullet;
    
	class Hero : public Collider {
	private:
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
		
	public:
		Hero();
		bool flickering() { return flickeringTimer > 0.f; }
		bool isVulnerable() { return isActive && !flickering(); }
		
		bool checkForHit(Collider *c);
		void kill();
		void resetSpawnPosition();
		void incrementShieldCount();
		void incrementPower();
		void blowUp();
		void setInactive(float duration);
		
		void computeNextMove(float dt);
		
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class HeroBullet : public Collider {
	private:
		vec2 heading;
		
	public:
		HeroBullet(vec2 pos, vec2 heading);
		
		bool isOutsideGameArea();
		
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class Explosion {
	private:
		vec2 pos;
		bool big;
		float t;
		
		ImageAsset *asset() const;
		
	public:
		Explosion(vec2 pos, bool isBig);
		
		bool isComplete();
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class EnemyUnit : public Collider {
	protected:
		int hp;
		
	public:
		EnemyUnit(vec2 position, ImageAsset *asset, int hp);
		
		bool takeDamage(int damage, bool bigExplosion=true);
	};
	
	//------------------------------------------------------------
	
	class EnemyWasp : public EnemyUnit {
	private:
		float firingTimer;
		
	public:
		EnemyWasp(float spawnX);
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class EnemySpider : public EnemyUnit {
	private:
		float time;
		float firingTimer;
		float restX;
		float vy;
	
	public:
		EnemySpider(float spawnX);
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class EnemyScarab : public EnemyUnit {
	private:
		float firingTimer;
	
	public:
		EnemyScarab(float spawnX);
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class EnemyQueen : public EnemyUnit {
	private:
		struct Turret {
			vec2 offset;
			vec2 direction;
			float t;
			
			void init(vec2 offset, vec2 dir);
			void tick(EnemyQueen &queen);
		};
		
		Turret turrets[12];
	
	public:
		
		EnemyQueen(float spawnX);
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class EnemyBullet : public Collider {
	private:
		vec2 heading;
	
	public:
		EnemyBullet(vec2 pos, vec2 heading);
		
		bool isOutsideGameArea();
		
		void tick();
		void draw();
	};
	
	//------------------------------------------------------------
	
	class EnemyMissile : public EnemyUnit {
	private:
		float radians;
		vec2 heading;
	
	public:
		EnemyMissile(vec2 pos, float aRadians);
		
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
			EnemyMissile *missile;
		};
		EnemyIterator();
		bool next();
		
		operator EnemyUnit*() { return curr; }
		EnemyUnit* operator->() { return curr; }
		EnemyUnit& operator*() { return *curr; }
	};
	
	
	//------------------------------------------------------------
	// Facade class for gameplay
	
	class Images {
	public:
		ImageAsset *heroBullet;
		ImageAsset *enemyBullet;
		ImageAsset *enemyMissile;
		ImageAsset *smallExplosion;
		ImageAsset *bigExplosion;
		ImageAsset *wasp;
		ImageAsset *spider;
		ImageAsset *scarab;
		ImageAsset *queen;
		ImageAsset *dino;
		
		Images();
	};
	
	class World : public Singleton<World> {
	public:
		SDL_Window *window;
		Viewport view;
		AssetRef assets;
		Images images;
		BasicPlotterRef plotter;
		SpritePlotter renderer;
		Timer timer;
		
        Input input;
        ParallaxFX parallax;
		HeadsUpDisplay hud;
		Hero hero;
		CompactPool<EnemyBullet> enemyBullets;
		CompactPool<EnemyMissile> enemyMissiles;
		CompactPool<EnemyWasp> wasps;
		CompactPool<EnemySpider> spiders;
		CompactPool<EnemyScarab> scarabs;
		CompactPool<EnemyQueen> queens;
		CompactPool<HeroBullet> heroBullets;
		CompactPool<Explosion> explosions;
		
		bool done;
		
		bool anyEnemies() const {
			return wasps.count() ||
			       spiders.count() ||
			       scarabs.count() ||
			       queens.count() ||
			       enemyMissiles.count();
		}
		
		World();
		
		void draw();
		void tick();
		
		void discharge();
	};
	
}

#define gWorld TyranoForce::World::getInstance()

