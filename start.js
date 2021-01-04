const fs = require("fs");
var validSkills = [ "mining", "building", "excavation", "woodcutting", "farming", "agility", "endurance", "combat", "archery", "smithing", "flying", "swimming", "fishing", "crafting", "magic", "slayer", "hunter", "taming", "cooking", "alchemy" ];
const validKeys = [ "skills", "req_wear", "req_tool", "req_weapon", "req_use", "req_place", "req_break", "req_craft", "req_biome", "req_kill", "xp_value_general", "xp_value_break", "xp_value_craft", "xp_value_place", "xp_value_breed", "xp_value_tame", "xp_value_kill", "xp_value_smelt", "xp_value_cook", "xp_value_trigger", "xp_value_brew", "xp_value_grow", "info_ore", "info_log", "info_plant", "info_smelt", "info_cook", "info_brew", "biome_effect_negative", "biome_effect_positive", "biome_mob_multiplier", "xp_bonus_biome", "xp_bonus_held", "xp_bonus_worn", "xp_bonus_dimension", "xp_multiplier_dimension", "fish_pool", "fish_enchant_pool", "mob_rare_drop", "level_up_command", "player_specific", "block_specific", "item_specific", "vein_blacklist" ];
const validKeys2 = [ "salvage", "treasure", "req_use_enchantment" ];
const validInfo = [ "extraChance" ];
const validSkillsInfo = [ "color" ];
const validSalvage = [ "salvageMax", "baseChance", "chancePerLevel", "maxChance", "xpPerItem", "levelReq" ];
const validBiomeMobMultiplier = [ "speedBonus", "damageBonus", "hpBonus" ];
const validFishPool = [ "startWeight", "startLevel", "endWeight", "endLevel", "enchantLevelReq", "xp", "minCount", "maxCount" ];
const validFishEnchantPool = [ "levelReq", "levelPerLevel", "chancePerLevel", "maxChance", "maxLevel" ];
const validTreasure = [ "startChance", "startLevel", "endChance", "endLevel", "xpPerItem", "minCount", "maxCount" ];
const validInfoKeys = [ "info_ore", "info_log", "info_plant", "info_smelt", "info_cook", "info_brew" ];
const validPlayerSpecific = [ "ignoreReq" ];
const validBlockSpecific = [ "growsUpwards" ];
const validItemSpecific = [ "meleeWeapon", "archeryWeapon", "magicWeapon", "autoValueOffsetWear", "autoValueOffsetWeapon", "autoValueOffsetTool" ];

const blacklistChars = [ ' ', ',', '/', '\\', '-' ];
const jsonConstructor = {}.constructor;

var corrupt = false;
if( !fs.existsSync( "./oldData/" ) )
	 fs.mkdirSync( "./oldData/" );
oldData = {};
oldData2 = {};
validKeys.forEach( key =>
{
	var path = `./oldData/${key}.json`;
	if( fs.existsSync( path ) )
	{
		try
		{
			oldData[ key ] = require( path );
		}
		catch( e )
		{
			console.log( `${path} is corrupted! Please fix, or remove the file before reattempting` );
			corrupt = true;
		}
	}
});
validKeys2.forEach( key =>
{
	var path = `./oldData/${key}.json`;
	if( fs.existsSync( path ) )
	{
		try
		{
			oldData2[ key ] = require( path );
		}
		catch( e )
		{
			console.log( `${path} is corrupted! Please fix, or remove the file before reattempting` );
			corrupt = true;
		}
	}
});
if( corrupt )
	return;
dupes = 0, dupes2 = 0;
if( !fs.existsSync( "./data/" ) )
	fs.mkdirSync( "./data/" );
data = {};
data2 = {};

//ONLY THESE COLORS WORK BELOW 1.15: 0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff
addData( "skills", "engineering", { "color": 0xffffff } );

//Examples
addData2( "req_use_enchantment", 	"some_mod:some_enchantment",	1,
{
	"magic": 5
});
addData2( "req_use_enchantment", 	"some_mod:some_enchantment",	2,
{
	"agility": 10
});
addData( "xp_value_place", 			"some_mod:some_block",								{ "magic": 5 } );
addData( "item_specific", 			"some_mod:gun",										{ "archeryWeapon": 1 } );
addData( "item_specific", 			"some_mod:sword",									{ "meleeWeapon": 1 } );
addData( "item_specific", 			"some_mod:staff",									{ "magicWeapon": 1 } );
addData( "item_specific", 			"minecraft:wooden_pickaxe",							{ "autoValueOffsetTool": -10 } );
addData( "item_specific", 			"minecraft:stone_pickaxe",							{ "autoValueOffsetTool": -10 } );

addData( "req_wear", "minecraft:elytra",												{ "agility": 40, "endurance": 20 } );
										   
addData( "req_wear", "minecraft:netherite_helmet",										{ "endurance": 60 } );
addData( "req_wear", "minecraft:netherite_chestplate",									{ "endurance": 60 } );
addData( "req_wear", "minecraft:netherite_leggings",									{ "endurance": 60 } );
addData( "req_wear", "minecraft:netherite_boots",										{ "endurance": 60 } );
addData( "req_wear", "minecraft:diamond_helmet",										{ "endurance": 40 } );
addData( "req_wear", "minecraft:diamond_chestplate",									{ "endurance": 40 } );
addData( "req_wear", "minecraft:diamond_leggings",										{ "endurance": 40 } );
addData( "req_wear", "minecraft:diamond_boots",											{ "endurance": 40 } );
addData( "req_wear", "minecraft:iron_helmet",											{ "endurance": 30 } );
addData( "req_wear", "minecraft:iron_chestplate",										{ "endurance": 30 } );
addData( "req_wear", "minecraft:iron_leggings",											{ "endurance": 30 } );
addData( "req_wear", "minecraft:iron_boots",											{ "endurance": 30 } );
addData( "req_wear", "minecraft:chainmail_helmet",										{ "endurance": 20 } );
addData( "req_wear", "minecraft:chainmail_chestplate",									{ "endurance": 20 } );
addData( "req_wear", "minecraft:chainmail_leggings",									{ "endurance": 20 } );
addData( "req_wear", "minecraft:chainmail_boots",										{ "endurance": 20 } );
addData( "req_wear", "minecraft:golden_helmet",											{ "endurance": 10 } );
addData( "req_wear", "minecraft:golden_chestplate",										{ "endurance": 10 } );
addData( "req_wear", "minecraft:golden_leggings",										{ "endurance": 10 } );
addData( "req_wear", "minecraft:golden_boots",											{ "endurance": 10 } );
addData( "req_wear", "minecraft:leather_helmet",										{ "endurance": 5 } );
addData( "req_wear", "minecraft:leather_chestplate",									{ "endurance": 5 } );
addData( "req_wear", "minecraft:leather_leggings",										{ "endurance": 5 } );
addData( "req_wear", "minecraft:leather_boots",											{ "endurance": 5 } );
addData( "req_wear", "minecraft:turtle_helmet",											{ "endurance": 15, "swimming": 5 } );
addData( "req_tool", "minecraft:netherite_pickaxe",										{ "mining": 60 } );
addData( "req_tool", "minecraft:netherite_shovel",										{ "excavation": 60 } );
addData( "req_tool", "minecraft:netherite_axe",											{ "woodcutting": 60 } );
addData( "req_tool", "minecraft:netherite_hoe",											{ "farming": 40 } );
addData( "req_tool", "minecraft:diamond_pickaxe",										{ "mining": 40 } );
addData( "req_tool", "minecraft:diamond_shovel",										{ "excavation": 40 } );
addData( "req_tool", "minecraft:diamond_axe",											{ "woodcutting": 40 } );
addData( "req_tool", "minecraft:diamond_hoe",											{ "farming": 30 } );
addData( "req_tool", "minecraft:golden_pickaxe",										{ "mining": 30 } );
addData( "req_tool", "minecraft:golden_shovel",											{ "excavation": 30 } );
addData( "req_tool", "minecraft:golden_axe",											{ "woodcutting": 30 } );
addData( "req_tool", "minecraft:golden_hoe",											{ "farming": 50 } );
addData( "req_tool", "minecraft:iron_pickaxe",											{ "mining": 20 } );
addData( "req_tool", "minecraft:iron_shovel",											{ "excavation": 20 } );
addData( "req_tool", "minecraft:iron_axe",												{ "woodcutting": 20 } );
addData( "req_tool", "minecraft:iron_hoe",												{ "farming": 20 } );
addData( "req_tool", "minecraft:stone_pickaxe",											{ "mining": 10 } );
addData( "req_tool", "minecraft:stone_shovel",											{ "excavation": 10 } );
addData( "req_tool", "minecraft:stone_axe",												{ "woodcutting": 10 } );
addData( "req_tool", "minecraft:stone_hoe",												{ "farming": 10 } );
addData( "req_tool", "minecraft:wooden_pickaxe",										{ "mining": 1 } );
addData( "req_tool", "minecraft:wooden_shovel",											{ "excavation": 1 } );
addData( "req_tool", "minecraft:wooden_axe",											{ "woodcutting": 1 } );
addData( "req_tool", "minecraft:wooden_hoe",											{ "farming": 1 } );
addData( "req_weapon", "minecraft:crossbow",											{ "archery": 10 } );
addData( "req_weapon", "minecraft:netherite_pickaxe",									{ "combat": 60 } );
addData( "req_weapon", "minecraft:netherite_shovel",									{ "combat": 60 } );
addData( "req_weapon", "minecraft:netherite_axe",										{ "combat": 65 } );
addData( "req_weapon", "minecraft:netherite_sword",										{ "combat": 60 } );
addData( "req_weapon", "minecraft:diamond_pickaxe",										{ "combat": 40 } );
addData( "req_weapon", "minecraft:diamond_shovel",										{ "combat": 40 } );
addData( "req_weapon", "minecraft:diamond_axe",											{ "combat": 45 } );
addData( "req_weapon", "minecraft:diamond_sword",										{ "combat": 40 } );
addData( "req_weapon", "minecraft:golden_pickaxe",										{ "combat": 30 } );
addData( "req_weapon", "minecraft:golden_shovel",										{ "combat": 30 } );
addData( "req_weapon", "minecraft:golden_axe",											{ "combat": 35 } );
addData( "req_weapon", "minecraft:golden_sword",										{ "combat": 30 } );
addData( "req_weapon", "minecraft:iron_pickaxe",										{ "combat": 20 } );
addData( "req_weapon", "minecraft:iron_shovel",											{ "combat": 20 } );
addData( "req_weapon", "minecraft:iron_axe",											{ "combat": 25 } );
addData( "req_weapon", "minecraft:iron_sword",											{ "combat": 20 } );
addData( "req_weapon", "minecraft:stone_pickaxe",										{ "combat": 10 } );
addData( "req_weapon", "minecraft:stone_shovel",										{ "combat": 10 } );
addData( "req_weapon", "minecraft:stone_axe",											{ "combat": 15 } );
addData( "req_weapon", "minecraft:stone_sword",											{ "combat": 10 } );
addData( "req_weapon", "minecraft:wooden_pickaxe",										{ "combat": 1 } );
addData( "req_weapon", "minecraft:wooden_shovel",										{ "combat": 1 } );
addData( "req_weapon", "minecraft:wooden_axe",											{ "combat": 1 } );
addData( "req_weapon", "minecraft:wooden_sword",										{ "combat": 1 } );
addData( "req_use", "minecraft:firework_rocket",										{ "flying": 5 } );
addData( "req_use", "minecraft:stonecutter",											{ "building": 10 } );
addData( "req_craft", "minecraft:stonecutter",											{ "crafting": 10 } );
addData( "req_place", "minecraft:stonecutter",											{ "building": 10 } );
addData( "req_use", "minecraft:smoker",													{ "cooking": 10 } );
addData( "req_craft", "minecraft:smoker",												{ "crafting": 10 } );
addData( "req_place", "minecraft:smoker",												{ "building": 10 } );
addData( "req_use", "minecraft:blast_furnace",											{ "smithing": 10 } );
addData( "req_craft", "minecraft:blast_furnace",										{ "crafting": 10 } );
addData( "req_place", "minecraft:blast_furnace",										{ "building": 10 } );
addData( "req_use", "minecraft:enchanting_table",										{ "mining": 25 } );
addData( "req_place", "minecraft:enchanting_table",										{ "building": 25 } );
addData( "req_place", "minecraft:scaffolding",											{ "building": 10 } );
addData( "req_place", "minecraft:oak_sapling",											{ "farming": 5, "woodcutting": 10 } );
addData( "req_place", "minecraft:birch_sapling",										{ "farming": 10, "woodcutting": 15 } );
addData( "req_place", "minecraft:spruce_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "req_place", "minecraft:jungle_sapling",										{ "farming": 20, "woodcutting": 35 } );
addData( "req_place", "minecraft:dark_oak_sapling",										{ "farming": 10, "woodcutting": 25 } );
addData( "req_place", "minecraft:acacia_sapling",										{ "farming": 5, "woodcutting": 15 } );
addData( "xp_bonus_held", "minecraft:golden_pickaxe",									{ "mining": 50 } );
addData( "xp_bonus_held", "minecraft:golden_shovel",									{ "excavation": 50 } );
addData( "xp_bonus_held", "minecraft:golden_axe",										{ "woodcutting": 50, "combat": 50 } );
addData( "xp_bonus_held", "minecraft:golden_sword",										{ "combat": 50 } );
addData( "xp_bonus_held", "minecraft:golden_hoe",										{ "farming": 20 } );
addData( "xp_bonus_held", "minecraft:netherite_hoe",									{ "farming": 15 } );
addData( "xp_bonus_held", "minecraft:diamond_hoe",										{ "farming": 10 } );
addData( "xp_bonus_held", "minecraft:iron_hoe",											{ "farming": 5 } );
addData( "xp_bonus_held", "minecraft:stone_hoe",										{ "farming": 2.5 } );
addData( "xp_bonus_held", "minecraft:wooden_hoe",										{ "farming": 1 } );
addData( "xp_bonus_worn", "minecraft:golden_helmet",									{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:golden_chestplate",								{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:golden_leggings",									{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:golden_boots",										{ "mining": 5, "endurance": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_helmet",									{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_chestplate",								{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_leggings",								{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:chainmail_boots",									{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:iron_helmet",										{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:iron_chestplate",									{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:iron_leggings",									{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:iron_boots",										{ "smithing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_helmet",									{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_chestplate",								{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_leggings",									{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:diamond_boots",									{ "magic": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_helmet",									{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_chestplate",								{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_leggings",									{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:leather_boots",									{ "agility": 2.5, "farming": 2.5, "woodcutting": 2.5, "fishing": 2.5 } );
addData( "xp_bonus_worn", "minecraft:turtle_helmet",									{ "swimming": 15, "fishing": 7.5 } );
addData( "xp_bonus_worn", "minecraft:shield",											{ "endurance": 12.5, "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:dragon_head",										{ "flying": 50, "combat": 25 } );
addData( "xp_bonus_worn", "minecraft:carved_pumpkin",									{ "combat": 5 } );
addData( "xp_bonus_worn", "minecraft:heart_of_the_sea",									{ "swimming": 25, "fishing": 10 } );
addData( "xp_bonus_worn", "minecraft:nether_star",										{ "combat": 10, "endurance": 10, "archery": 10, "magic": 10, "flying": 20 } );
addData( "xp_value_break", "minecraft:nether_quartz_ore",								{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:nether_quartz",									{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:coal_ore",										{ "mining": 2 } );
addData( "xp_value_break", "minecraft:iron_ore",										{ "mining": 12 } );
addData( "xp_value_break", "minecraft:gold_ore",										{ "mining": 22 } );
addData( "xp_value_break", "minecraft:diamond_ore",										{ "mining": 35 } );
addData( "xp_value_break", "minecraft:redstone_ore",									{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:lapis_ore",										{ "mining": 5 } );
addData( "xp_value_break", "minecraft:emerald_ore",										{ "mining": 60 } );
addData( "xp_value_break", "minecraft:granite",											{ "mining": 0.4 } );
addData( "xp_value_break", "minecraft:polished_granite",								{ "mining": 0.4 } );
addData( "xp_value_break", "minecraft:diorite",											{ "mining": 0.3 } );
addData( "xp_value_break", "minecraft:polished_diorite",								{ "mining": 0.3 } );
addData( "xp_value_break", "minecraft:andesite",										{ "mining": 0.5 } );
addData( "xp_value_break", "minecraft:polished_andesite",								{ "mining": 0.5 } );
addData( "xp_value_break", "minecraft:stone",											{ "mining": 0.1 } );
addData( "xp_value_break", "minecraft:stone_bricks",									{ "mining": 0.7 } );
addData( "xp_value_break", "minecraft:cobblestone",										{ "mining": 0.5 } );
addData( "xp_value_break", "minecraft:mossy_cobblestone",								{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:netherrack",										{ "mining": 0.1 } );
addData( "xp_value_break", "minecraft:nether_bricks",									{ "mining": 1.5 } );
addData( "xp_value_break", "minecraft:ice",												{ "mining": 0.1 } );
addData( "xp_value_break", "minecraft:rail",											{ "mining": 0.8 } );
addData( "xp_value_break", "minecraft:prismarine",										{ "mining": 2.5 } );
addData( "xp_value_break", "minecraft:dark_prismarine",									{ "mining": 3.5 } );
addData( "xp_value_break", "minecraft:prismarine_bricks",								{ "mining": 4 } );
addData( "xp_value_break", "minecraft:purpur_block",									{ "mining": 2 } );
addData( "xp_value_break", "minecraft:purpur_pillar",									{ "mining": 2.5 } );
addData( "xp_value_break", "minecraft:infested_stone",									{ "mining": 50 } );
addData( "xp_value_break", "minecraft:infested_cobblestone",							{ "mining": 50 } );
addData( "xp_value_break", "minecraft:infested_stone_bricks",							{ "mining": 200 } );
addData( "xp_value_break", "minecraft:infested_mossy_stone_bricks",						{ "mining": 200 } );
addData( "xp_value_break", "minecraft:infested_cracked_stone_bricks",					{ "mining": 200 } );
addData( "xp_value_break", "minecraft:infested_chiseled_stone_bricks",					{ "mining": 200 } );
addData( "xp_value_break", "minecraft:bedrock",											{ "mining": 9001 } );
addData( "req_break", "minecraft:spawner",												{ "combat": 5 } );
addData( "xp_value_break", "minecraft:spawner",											{ "mining": 50, "combat": 150, "endurance": 100 } );
addData( "xp_value_break", "minecraft:dirt",											{ "excavation": 1.5 } );
addData( "xp_value_break", "minecraft:podzol",											{ "excavation": 3, "farming": 1 } );
addData( "xp_value_break", "minecraft:mycelium",										{ "excavation": 6, "farming": 1 } );
addData( "xp_value_break", "minecraft:coarse_dirt",										{ "excavation": 1.7 } );
addData( "xp_value_break", "minecraft:grass_block",										{ "excavation": 2 } );
addData( "xp_value_break", "minecraft:sand",											{ "excavation": 1 } );
addData( "xp_value_break", "minecraft:red_sand",										{ "excavation": 1.2 } );
addData( "xp_value_break", "minecraft:clay",											{ "excavation": 5 } );
addData( "xp_value_break", "minecraft:clay_ball",										{ "excavation": 5 } );
addData( "xp_value_break", "minecraft:gravel",											{ "excavation": 2 } );
addData( "xp_value_break", "minecraft:soul_sand",										{ "excavation": 5 } );
addData( "xp_value_break", "minecraft:snow_block",										{ "excavation": 3.5 } );
addData( "xp_value_break", "minecraft:oak_sapling",										{ "woodcutting": 15 } );
addData( "xp_value_break", "minecraft:birch_sapling",									{ "woodcutting": 12 } );
addData( "xp_value_break", "minecraft:spruce_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "minecraft:jungle_sapling",									{ "woodcutting": 24 } );
addData( "xp_value_break", "minecraft:dark_oak_sapling",								{ "woodcutting": 18 } );
addData( "xp_value_break", "minecraft:acacia_sapling",									{ "woodcutting": 26 } );
addData( "xp_value_grow", "minecraft:oak_sapling",										{ "farming": 10 } );
addData( "xp_value_grow", "minecraft:birch_sapling",									{ "farming": 20 } );
addData( "xp_value_grow", "minecraft:spruce_sapling",									{ "farming": 15 } );
addData( "xp_value_grow", "minecraft:jungle_sapling",									{ "farming": 25 } );
addData( "xp_value_grow", "minecraft:dark_oak_sapling",									{ "farming": 15 } );
addData( "xp_value_grow", "minecraft:acacia_sapling",									{ "farming": 30 } );
addData( "xp_value_break", "minecraft:log",												{ "woodcutting": 8 } );
addData( "xp_value_break", "minecraft:oak_log",											{ "woodcutting": 8 } );
addData( "xp_value_break", "minecraft:birch_log",										{ "woodcutting": 12 } );
addData( "xp_value_break", "minecraft:spruce_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:jungle_log",										{ "woodcutting": 4.5 } );
addData( "xp_value_break", "minecraft:dark_oak_log",									{ "woodcutting": 7 } );
addData( "xp_value_break", "minecraft:acacia_log",										{ "woodcutting": 14 } );
addData( "xp_value_break", "minecraft:oak_wood",										{ "woodcutting": 8 } );
addData( "xp_value_break", "minecraft:birch_wood",										{ "woodcutting": 12 } );
addData( "xp_value_break", "minecraft:spruce_wood",										{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:jungle_wood",										{ "woodcutting": 4.5 } );
addData( "xp_value_break", "minecraft:dark_oak_wood",									{ "woodcutting": 7 } );
addData( "xp_value_break", "minecraft:acacia_wood",										{ "woodcutting": 14 } );
addData( "xp_value_break", "minecraft:oak_planks",										{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:birch_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:spruce_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:jungle_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:dark_oak_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:acacia_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "minecraft:oak_leaves",										{ "woodcutting": 0.5 } );
addData( "xp_value_break", "minecraft:birch_leaves",									{ "woodcutting": 0.7 } );
addData( "xp_value_break", "minecraft:spruce_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_break", "minecraft:jungle_leaves",									{ "woodcutting": 0.9 } );
addData( "xp_value_break", "minecraft:dark_oak_leaves",									{ "woodcutting": 0.6 } );
addData( "xp_value_break", "minecraft:acacia_leaves",									{ "woodcutting": 1.1 } );
addData( "xp_value_break", "minecraft:bookshelf",										{ "woodcutting": 50 } );
addData( "xp_value_break", "minecraft:brown_mushroom_block",							{ "farming": 3 } );
addData( "xp_value_break", "minecraft:brown_mushroom",									{ "farming": 10 } );
addData( "xp_value_break", "minecraft:red_mushroom_block",								{ "farming": 4 } );
addData( "xp_value_break", "minecraft:red_mushroom",									{ "farming": 12 } );
addData( "xp_value_break", "minecraft:sugar_cane",										{ "farming": 1.5 } );
addData( "xp_value_break", "minecraft:cactus",											{ "farming": 2 } );
addData( "xp_value_break", "minecraft:bamboo",											{ "farming": 0.2, "woodcutting": 0.4 } );
addData( "xp_value_break", "minecraft:bamboo_sapling",									{ "farming": 0.2, "woodcutting": 0.4 } );
addData( "xp_value_break", "minecraft:kelp",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:kelp_plant",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:sea_pickle",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:wheat",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:wheat_seeds",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:beetroot",										{ "farming": 1.5 } );
addData( "xp_value_break", "minecraft:beetroots",										{ "farming": 1.5 } );
addData( "xp_value_break", "minecraft:carrot",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:carrots",											{ "farming": 1 } );
addData( "xp_value_break", "minecraft:potato",											{ "farming": 0.75 } );
addData( "xp_value_break", "minecraft:potatoes",										{ "farming": 0.75 } );
addData( "xp_value_break", "minecraft:melon",											{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:melon_seeds",										{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:melon_slice",										{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:pumpkin",											{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:pumpkin_seeds",									{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:cocoa",											{ "farming": 2 } );
addData( "xp_value_break", "minecraft:nether_wart",										{ "farming": 1 } );
addData( "xp_value_break", "minecraft:chorus_flower",									{ "farming": 35 } );
addData( "xp_value_break", "minecraft:chorus_plant",									{ "farming": 2.5 } );
addData( "xp_value_grow", "minecraft:sugar_cane",										{ "farming": 5 } );
addData( "xp_value_grow", "minecraft:cactus",											{ "farming": 6 } );
addData( "xp_value_grow", "minecraft:bamboo",											{ "farming": 1.2 } );
addData( "xp_value_grow", "minecraft:bamboo_sapling",									{ "farming": 1.2 } );
addData( "xp_value_grow", "minecraft:kelp",												{ "farming": 2 } );
addData( "xp_value_grow", "minecraft:kelp_plant",										{ "farming": 2 } );
addData( "xp_value_grow", "minecraft:sea_pickle",										{ "farming": 4 } );
addData( "xp_value_grow", "minecraft:wheat",											{ "farming": 9 } );
addData( "xp_value_grow", "minecraft:wheat_seeds",										{ "farming": 9 } );
addData( "xp_value_grow", "minecraft:beetroot",											{ "farming": 12 } );
addData( "xp_value_grow", "minecraft:beetroots",										{ "farming": 12 } );
addData( "xp_value_grow", "minecraft:carrot",											{ "farming": 8 } );
addData( "xp_value_grow", "minecraft:carrots",											{ "farming": 8 } );
addData( "xp_value_grow", "minecraft:potato",											{ "farming": 6.6 } );
addData( "xp_value_grow", "minecraft:potatoes",											{ "farming": 6.6 } );
addData( "xp_value_grow", "minecraft:cocoa",											{ "farming": 17 } );
addData( "xp_value_grow", "minecraft:nether_wart",										{ "farming": 11 } );
addData( "xp_value_break", "minecraft:lily_pad",										{ "farming": 5 } );
addData( "xp_value_break", "minecraft:dandelion",										{ "farming": 8 } );
addData( "xp_value_break", "minecraft:white_tulip",										{ "farming": 8.5 } );
addData( "xp_value_break", "minecraft:pink_tulip",										{ "farming": 6 } );
addData( "xp_value_break", "minecraft:red_tulip",										{ "farming": 7.5 } );
addData( "xp_value_break", "minecraft:oxeye_daisy",										{ "farming": 8.5 } );
addData( "xp_value_break", "minecraft:sunflower",										{ "farming": 17.5 } );
addData( "xp_value_break", "minecraft:lilac",											{ "farming": 16.5 } );
addData( "xp_value_break", "minecraft:rose_bush",										{ "farming": 13.5 } );
addData( "xp_value_break", "minecraft:peony",											{ "farming": 17.5 } );
addData( "xp_value_break", "minecraft:dead_bush",										{ "farming": 5 } );
addData( "xp_value_break", "minecraft:cobweb",											{ "farming": 5 } );
addData( "xp_value_break", "minecraft:orange_tulip",									{ "farming": 16.5 } );
addData( "xp_value_break", "minecraft:wither_rose",										{ "farming": 35 } );
addData( "xp_value_break", "minecraft:allium",											{ "farming": 12.5 } );
addData( "xp_value_break", "minecraft:poppy",											{ "farming": 11.5 } );
addData( "xp_value_break", "minecraft:vine",											{ "farming": 3.5 } );
addData( "xp_value_break", "minecraft:grass",											{ "farming": 0.25 } );
addData( "xp_value_break", "minecraft:fern",											{ "farming": 0.35 } );
addData( "xp_value_break", "minecraft:sea_grass",										{ "farming": 4.5 } );
addData( "xp_value_break", "minecraft:large_fern",										{ "farming": 5.5 } );
addData( "xp_value_break", "minecraft:tall_grass",										{ "farming": 4.5 } );
addData( "xp_value_break", "minecraft:cornflower",										{ "farming": 5.5 } );
addData( "xp_value_break", "minecraft:azure_bluet",										{ "farming": 4.5 } );
addData( "xp_value_break", "minecraft:lily_of_the_valley",								{ "farming": 9.5 } );
addData( "xp_value_break", "minecraft:blue_orchid",										{ "farming": 20 } );
addData( "xp_value_break", "minecraft:sweet_berry_bush",								{ "farming": 1.25 } );
addData( "xp_value_general", "minecraft:pufferfish",									{ "fishing": 35 } );
addData( "xp_value_general", "minecraft:name_tag",										{ "fishing": 60 } );
addData( "xp_value_general", "minecraft:cod",											{ "fishing": 20 } );
addData( "xp_value_general", "minecraft:salmon",										{ "fishing": 25 } );
addData( "xp_value_general", "minecraft:tropical_fish",									{ "fishing": 200 } );
addData( "xp_value_general", "minecraft:saddle",										{ "fishing": 75 } );
addData( "xp_value_general", "minecraft:tripwire_hook",									{ "fishing": 35 } );
addData( "xp_value_general", "minecraft:leather",										{ "fishing": 25 } );
addData( "xp_value_craft", "minecraft:netherite_helmet",								{ "crafting": 1000, "smithing": 200 } );
addData( "xp_value_craft", "minecraft:netherite_chestplate",							{ "crafting": 1600, "smithing": 320 } );
addData( "xp_value_craft", "minecraft:netherite_leggings",								{ "crafting": 1400, "smithing": 280 } );
addData( "xp_value_craft", "minecraft:netherite_boots",									{ "crafting": 800, "smithing": 160 } );
addData( "xp_value_craft", "minecraft:netherite_pickaxe",								{ "crafting": 600, "smithing": 120 } );
addData( "xp_value_craft", "minecraft:netherite_shovel",								{ "crafting": 200, "smithing": 40 } );
addData( "xp_value_craft", "minecraft:netherite_hoe",									{ "crafting": 400, "smithing": 80 } );
addData( "xp_value_craft", "minecraft:netherite_axe",									{ "crafting": 600, "smithing": 120 } );
addData( "xp_value_craft", "minecraft:netherite_sword",									{ "crafting": 400, "smithing": 80 } );
addData( "xp_value_craft", "minecraft:diamond_helmet",									{ "crafting": 300, "smithing": 60 } );
addData( "xp_value_craft", "minecraft:diamond_chestplate",								{ "crafting": 480, "smithing": 96 } );
addData( "xp_value_craft", "minecraft:diamond_leggings",								{ "crafting": 420, "smithing": 84 } );
addData( "xp_value_craft", "minecraft:diamond_boots",									{ "crafting": 240, "smithing": 48 } );
addData( "xp_value_craft", "minecraft:diamond_pickaxe",									{ "crafting": 180, "smithing": 36 } );
addData( "xp_value_craft", "minecraft:diamond_shovel",									{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:diamond_hoe",										{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:diamond_axe",										{ "crafting": 180, "smithing": 36 } );
addData( "xp_value_craft", "minecraft:diamond_sword",									{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:golden_helmet",									{ "crafting": 150, "smithing": 30 } );
addData( "xp_value_craft", "minecraft:golden_chestplate",								{ "crafting": 240, "smithing": 48 } );
addData( "xp_value_craft", "minecraft:golden_leggings",									{ "crafting": 210, "smithing": 42 } );
addData( "xp_value_craft", "minecraft:golden_boots",									{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:golden_pickaxe",									{ "crafting": 90, "smithing": 18 } );
addData( "xp_value_craft", "minecraft:golden_shovel",									{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "minecraft:golden_hoe",										{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:golden_axe",										{ "crafting": 90, "smithing": 18 } );
addData( "xp_value_craft", "minecraft:golden_sword",									{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:clock",											{ "crafting": 125 } );
addData( "xp_value_craft", "minecraft:light_weighted_pressure_plate",					{ "crafting": 60 } );
addData( "xp_value_craft", "minecraft:iron_helmet",										{ "crafting": 50, "smithing": 10 } );
addData( "xp_value_craft", "minecraft:iron_chestplate",									{ "crafting": 80, "smithing": 16 } );
addData( "xp_value_craft", "minecraft:iron_leggings",									{ "crafting": 70, "smithing": 14 } );
addData( "xp_value_craft", "minecraft:iron_boots",										{ "crafting": 40, "smithing": 8 } );
addData( "xp_value_craft", "minecraft:iron_pickaxe",									{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "minecraft:iron_shovel",										{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "minecraft:iron_hoe",										{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "minecraft:iron_axe",										{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "minecraft:iron_sword",										{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "minecraft:anvil",											{ "crafting": 310, "smithing": 62 } );
addData( "xp_value_craft", "minecraft:iron_trapdoor",									{ "crafting": 40 } );
addData( "xp_value_craft", "minecraft:iron_door",										{ "crafting": 20 } );
addData( "xp_value_craft", "minecraft:hopper",											{ "crafting": 58 } );
addData( "xp_value_craft", "minecraft:compass",											{ "crafting": 45 } );
addData( "xp_value_craft", "minecraft:minecart",										{ "crafting": 50 } );
addData( "xp_value_craft", "minecraft:bucket",											{ "crafting": 30 } );
addData( "xp_value_craft", "minecraft:cauldron",										{ "crafting": 70 } );
addData( "xp_value_craft", "minecraft:flint_and_steel",									{ "crafting": 12 } );
addData( "xp_value_craft", "minecraft:shears",											{ "crafting": 20 } );
addData( "xp_value_craft", "minecraft:blast_furnace",									{ "crafting": 61 } );
addData( "xp_value_craft", "minecraft:heavy_weighted_pressure_plate",					{ "crafting": 20 } );
addData( "xp_value_craft", "minecraft:leather_helmet",									{ "crafting": 75, "smithing": 15 } );
addData( "xp_value_craft", "minecraft:leather_chestplate",								{ "crafting": 120, "smithing": 24 } );
addData( "xp_value_craft", "minecraft:leather_leggings",								{ "crafting": 105, "smithing": 21 } );
addData( "xp_value_craft", "minecraft:leather_boots",									{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "minecraft:turtle_helmet",									{ "crafting": 100, "smithing": 20 } );
addData( "xp_value_craft", "minecraft:crossbow",										{ "crafting": 20, "smithing": 10 } );
addData( "xp_value_craft", "minecraft:stone_pickaxe",									{ "crafting": 15, "smithing": 3 } );
addData( "xp_value_craft", "minecraft:stone_shovel",									{ "crafting": 5, "smithing": 1 } );
addData( "xp_value_craft", "minecraft:stone_hoe",										{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "minecraft:stone_axe",										{ "crafting": 15, "smithing": 3 } );
addData( "xp_value_craft", "minecraft:stone_sword",										{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "minecraft:wooden_pickaxe",									{ "crafting": 9 } );
addData( "xp_value_craft", "minecraft:wooden_shovel",									{ "crafting": 3 } );
addData( "xp_value_craft", "minecraft:wooden_hoe",										{ "crafting": 6 } );
addData( "xp_value_craft", "minecraft:wooden_axe",										{ "crafting": 9 } );
addData( "xp_value_craft", "minecraft:wooden_sword",									{ "crafting": 6 } );
addData( "xp_value_craft", "minecraft:beacon",											{ "crafting": 1000 } );
addData( "xp_value_craft", "minecraft:iron_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:iron_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:iron_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:gold_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:gold_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:gold_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:diamond",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:diamond_block",									{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:emerald",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:emerald_block",									{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:coal",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:coal_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:bone",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:bone_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:redstone",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:redstone_block",									{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:lapis",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:lapis_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:wheat",											{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:hay_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "minecraft:bread",											{ "cooking": 3.5 } );
addData( "xp_value_craft", "minecraft:beetroot_soup",									{ "cooking": 22.5 } );
addData( "xp_value_craft", "minecraft:mushroom_stew",									{ "cooking": 15 } );
addData( "xp_value_craft", "minecraft:rabbit_stew",										{ "cooking": 35 } );
addData( "xp_value_craft", "minecraft:cake",											{ "cooking": 45 } );
addData( "xp_value_craft", "minecraft:cookie",											{ "cooking": 0.75 } );
addData( "xp_value_craft", "minecraft:pumpkin_pie",										{ "cooking": 27.5 } );
addData( "xp_value_breed", "minecraft:chicken",											{ "farming": 10 } );
addData( "xp_value_breed", "minecraft:sheep",											{ "farming": 30 } );
addData( "xp_value_breed", "minecraft:cow",												{ "farming": 35 } );
addData( "xp_value_breed", "minecraft:pig",												{ "farming": 25 } );
addData( "player_specific", "UUID_GOES_HERE",											{ "ignoreReq": 1 } );
addData( "block_specific", "minecraft:sugar_cane",										{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:kelp",											{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:kelp_plant",										{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:bamboo",											{ "growsUpwards": 1 } );
addData( "block_specific", "minecraft:cactus",											{ "growsUpwards": 1 } );
addData( "xp_value_tame", "minecraft:exampleanimal",									{ "taming": 10 } );
addData( "req_kill", "minecraft:silverfish",											{ "combat": 10 } );
addData( "xp_value_kill", "minecraft:silverfish",										{ "combat": 35 } );
addData( "xp_value_kill", "minecraft:zombie",											{ "combat": 15 } );
addData( "xp_value_kill", "minecraft:creeper",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:spider",											{ "combat": 20 } );
addData( "xp_value_kill", "minecraft:skeleton",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:enderman",											{ "combat": 35 } );
addData( "xp_value_kill", "minecraft:wither_skeleton",									{ "combat": 40 } );
addData( "xp_value_kill", "minecraft:slime",											{ "combat": 5 } );
addData( "xp_value_kill", "minecraft:blaze",											{ "combat": 30 } );
addData( "xp_value_kill", "minecraft:drowned",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:evoker",											{ "combat": 40 } );
addData( "xp_value_kill", "minecraft:ravager",											{ "combat": 50 } );
addData( "xp_value_kill", "minecraft:vindicator",										{ "combat": 35 } );
addData( "xp_value_kill", "minecraft:cave_spider",										{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:guardian",											{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:elder_guardian",									{ "combat": 100 } );
addData( "xp_value_kill", "minecraft:husk",												{ "combat": 45 } );
addData( "xp_value_kill", "minecraft:magma_cube",										{ "combat": 7.5 } );
addData( "xp_value_kill", "minecraft:zombie_pigman",									{ "combat": 25 } );
addData( "xp_value_kill", "minecraft:zombie_villager",									{ "combat": 15 } );
addData( "xp_value_kill", "minecraft:ender_dragon",										{ "combat": 2500 } );
addData( "xp_value_kill", "minecraft:wither",											{ "combat": 1000 } );
addData( "xp_value_smelt", "minecraft:cobblestone",										{ "smithing": 0.5 } );
addData( "xp_value_smelt", "minecraft:stone",											{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:stone_bricks",									{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:netherrack",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:nether_bricks",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:polished_blackstone_bricks",						{ "smithing": 2.5 } );
addData( "xp_value_smelt", "minecraft:sand",											{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:red_sand",										{ "smithing": 1.2 } );
addData( "xp_value_smelt", "minecraft:sandstone",										{ "smithing": 3 } );
addData( "xp_value_smelt", "minecraft:red_sandstone",									{ "smithing": 3.6 } );
addData( "xp_value_smelt", "minecraft:coal_ore",										{ "smithing": 8 } );
addData( "xp_value_smelt", "minecraft:iron_ore",										{ "smithing": 12 } );
addData( "xp_value_smelt", "minecraft:gold_ore",										{ "smithing": 18 } );
addData( "xp_value_smelt", "minecraft:nether_gold_ore",									{ "smithing": 22 } );
addData( "xp_value_smelt", "minecraft:nether_quartz_ore",								{ "smithing": 8 } );
addData( "xp_value_smelt", "minecraft:diamond_ore",										{ "smithing": 35 } );
addData( "xp_value_smelt", "minecraft:redstone_ore",									{ "smithing": 15 } );
addData( "xp_value_smelt", "minecraft:lapis_ore",										{ "smithing": 25 } );
addData( "xp_value_smelt", "minecraft:emerald_ore",										{ "smithing": 60 } );
addData( "xp_value_smelt", "minecraft:ancient_debris",									{ "smithing": 60 } );
addData( "xp_value_smelt", "minecraft:clay_ball",										{ "smithing": 1.5, "crafting": 3.5 } );
addData( "xp_value_smelt", "minecraft:clay",											{ "smithing": 6, "crafting": 14 } );
addData( "xp_value_smelt", "minecraft:chainmail_helmet",								{ "smithing": 7.5 } );
addData( "xp_value_smelt", "minecraft:chainmail_chestplate",							{ "smithing": 12 } );
addData( "xp_value_smelt", "minecraft:chainmail_leggings",								{ "smithing": 10.5 } );
addData( "xp_value_smelt", "minecraft:chainmail_boots",									{ "smithing": 6 } );
addData( "xp_value_smelt", "minecraft:iron_helmet",										{ "smithing": 2.5 } );
addData( "xp_value_smelt", "minecraft:iron_chestplate",									{ "smithing": 4 } );
addData( "xp_value_smelt", "minecraft:iron_leggings",									{ "smithing": 3.5 } );
addData( "xp_value_smelt", "minecraft:iron_boots",										{ "smithing": 2 } );
addData( "xp_value_smelt", "minecraft:iron_pickaxe",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:iron_shovel",										{ "smithing": 0.5 } );
addData( "xp_value_smelt", "minecraft:iron_axe",										{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:iron_hoe",										{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:iron_sword",										{ "smithing": 1 } );
addData( "xp_value_smelt", "minecraft:iron_horse_armor",								{ "smithing": 25 } );
addData( "xp_value_smelt", "minecraft:golden_helmet",									{ "smithing": 10 } );
addData( "xp_value_smelt", "minecraft:golden_chestplate",								{ "smithing": 16 } );
addData( "xp_value_smelt", "minecraft:golden_leggings",									{ "smithing": 14 } );
addData( "xp_value_smelt", "minecraft:golden_boots",									{ "smithing": 8 } );
addData( "xp_value_smelt", "minecraft:golden_pickaxe",									{ "smithing": 6 } );
addData( "xp_value_smelt", "minecraft:golden_shovel",									{ "smithing": 2 } );
addData( "xp_value_smelt", "minecraft:golden_axe",										{ "smithing": 6 } );
addData( "xp_value_smelt", "minecraft:golden_hoe",										{ "smithing": 4 } );
addData( "xp_value_smelt", "minecraft:golden_sword",									{ "smithing": 4 } );
addData( "xp_value_smelt", "minecraft:golden_horse_armor",								{ "smithing": 100 } );
addData( "xp_value_smelt", "minecraft:log",												{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:oak_log",											{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:birch_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:spruce_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:jungle_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:dark_oak_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:acacia_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "minecraft:white_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:orange_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:magenta_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:light_blue_terracotta",							{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:yellow_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:lime_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:pink_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:gray_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:light_gray_terracotta",							{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:cyan_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:purple_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:blue_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:brown_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:green_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:red_terracotta",									{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:black_terracotta",								{ "smithing": 1.5 } );
addData( "xp_value_smelt", "minecraft:terracotta",										{ "smithing": 1.5 } );
addData( "info_smelt", "minecraft:cobblestone",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:stone",												{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:stone_bricks",										{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:netherrack",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:nether_bricks",										{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:polished_blackstone_bricks",							{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:sand",												{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:red_sand",											{ "extraChance": 0.9 } );
addData( "info_smelt", "minecraft:sandstone",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:red_sandstone",										{ "extraChance": 0.9 } );
addData( "info_smelt", "minecraft:coal_ore",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:iron_ore",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:gold_ore",											{ "extraChance": 0.5 } );
addData( "info_smelt", "minecraft:nether_gold_ore",										{ "extraChance": 0.75 } );
addData( "info_smelt", "minecraft:nether_quartz_ore",									{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:diamond_ore",											{ "extraChance": 0.25 } );
addData( "info_smelt", "minecraft:redstone_ore",										{ "extraChance": 2 } );
addData( "info_smelt", "minecraft:lapis_ore",											{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:emerald_ore",											{ "extraChance": 0.2 } );
addData( "info_smelt", "minecraft:ancient_debris",										{ "extraChance": 0.33 } );
addData( "info_smelt", "minecraft:clay_ball",											{ "extraChance": 0.5 } );
addData( "info_smelt", "minecraft:clay",												{ "extraChance": 0.5 } );
addData( "info_smelt", "minecraft:chainmail_helmet",									{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:chainmail_chestplate",								{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:chainmail_leggings",									{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:chainmail_boots",										{ "extraChance": 15 } );
addData( "info_smelt", "minecraft:iron_helmet",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_chestplate",										{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_leggings",										{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_boots",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_pickaxe",										{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_shovel",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_axe",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_hoe",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_sword",											{ "extraChance": 5 } );
addData( "info_smelt", "minecraft:iron_horse_armor",									{ "extraChance": 50 } );
addData( "info_smelt", "minecraft:golden_helmet",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_chestplate",									{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_leggings",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_boots",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_pickaxe",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_shovel",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_axe",											{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_hoe",											{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_sword",										{ "extraChance": 2.5 } );
addData( "info_smelt", "minecraft:golden_horse_armor",									{ "extraChance": 50 } );
addData( "info_smelt", "minecraft:log",													{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:oak_log",												{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:birch_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:spruce_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:jungle_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:dark_oak_log",										{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:acacia_log",											{ "extraChance": 1 } );
addData( "info_smelt", "minecraft:white_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:orange_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:magenta_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:light_blue_terracotta",								{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:yellow_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:lime_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:pink_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:gray_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:light_gray_terracotta",								{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:cyan_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:purple_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:blue_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:brown_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:green_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:red_terracotta",										{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:black_terracotta",									{ "extraChance": 1.5 } );
addData( "info_smelt", "minecraft:terracotta",											{ "extraChance": 1.5 } );
addData( "xp_value_cook", "minecraft:mutton",											{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:rabbit",											{ "cooking": 15 } );
addData( "xp_value_cook", "minecraft:salmon",											{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:cod",												{ "cooking": 5 } );
addData( "xp_value_cook", "minecraft:beef",												{ "cooking": 10 } );
addData( "xp_value_cook", "minecraft:porkchop",											{ "cooking": 12.5 } );
addData( "xp_value_cook", "minecraft:chicken",											{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:potato",											{ "cooking": 5 } );
addData( "xp_value_cook", "minecraft:wet_sponge",										{ "cooking": 15, "crafting": 15 } );
addData( "xp_value_cook", "minecraft:cactus",											{ "cooking": 12.5, "crafting": 4 } );
addData( "xp_value_cook", "minecraft:sea_pickle",										{ "cooking": 12.5, "crafting": 3 } );
addData( "xp_value_cook", "minecraft:chorus_fruit",										{ "cooking": 25, "crafting": 22.5 } );
addData( "xp_value_cook", "minecraft:kelp",												{ "cooking": 6, "crafting": 5 } );
addData( "info_cook", "minecraft:mutton",												{ "extraChance": 1 } );
addData( "info_cook", "minecraft:rabbit",												{ "extraChance": 1 } );
addData( "info_cook", "minecraft:salmon",												{ "extraChance": 1.5 } );
addData( "info_cook", "minecraft:cod",													{ "extraChance": 1.75 } );
addData( "info_cook", "minecraft:beef",													{ "extraChance": 0.75 } );
addData( "info_cook", "minecraft:porkchop",												{ "extraChance": 1.25 } );
addData( "info_cook", "minecraft:chicken",												{ "extraChance": 0.5 } );
addData( "info_cook", "minecraft:potato",												{ "extraChance": 0.5 } );
addData( "info_cook", "minecraft:cactus",												{ "extraChance": 2 } );
addData( "info_cook", "minecraft:sea_pickle",											{ "extraChance": 2 } );
addData( "info_cook", "minecraft:chorus_fruit",											{ "extraChance": 0.33 } );
addData( "info_cook", "minecraft:kelp",													{ "extraChance": 0.6 } );
addData( "xp_value_brew", "minecraft:nether_wart",										{ "alchemy": 6 } );
addData( "info_brew", "minecraft:nether_wart",											{ "extraChance": 0.25 } );
addData( "xp_value_brew", "minecraft:ghast_tear",										{ "alchemy": 20 } );
addData( "info_brew", "minecraft:ghast_tear",											{ "extraChance": 0.75 } );
addData( "xp_value_brew", "minecraft:glistering_melon_slice",							{ "alchemy": 12 } );
addData( "info_brew", "minecraft:glistering_melon_slice",								{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:golden_carrot",									{ "alchemy": 11 } );
addData( "info_brew", "minecraft:golden_carrot",										{ "extraChance": 0.5 } );
addData( "xp_value_brew", "minecraft:sugar",											{ "alchemy": 3 } );
addData( "info_brew", "minecraft:sugar",												{ "extraChance": 0.3 } );
addData( "xp_value_brew", "minecraft:magma_cream",										{ "alchemy": 17 } );
addData( "info_brew", "minecraft:magma_cream",											{ "extraChance": 0.6 } );
addData( "xp_value_brew", "minecraft:glowstone_dust",									{ "alchemy": 9 } );
addData( "info_brew", "minecraft:glowstone_dust",										{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:rabbit_foot",										{ "alchemy": 20 } );
addData( "info_brew", "minecraft:rabbit_foot",											{ "extraChance": 0.65 } );
addData( "xp_value_brew", "minecraft:blaze_powder",										{ "alchemy": 9 } );
addData( "info_brew", "minecraft:blaze_powder",											{ "extraChance": 0.35 } );
addData( "xp_value_brew", "minecraft:gunpowder",										{ "alchemy": 7.5 } );
addData( "info_brew", "minecraft:gunpowder",											{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:fermented_spider_eye",								{ "alchemy": 12 } );
addData( "info_brew", "minecraft:fermented_spider_eye",									{ "extraChance": 0.6 } );
addData( "xp_value_brew", "minecraft:spider_eye",										{ "alchemy": 9 } );
addData( "info_brew", "minecraft:spider_eye",											{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:redstone",											{ "alchemy": 8 } );
addData( "info_brew", "minecraft:redstone",												{ "extraChance": 0.4 } );
addData( "xp_value_brew", "minecraft:turtle_helmet",									{ "alchemy": 45 } );
addData( "info_brew", "minecraft:turtle_helmet",										{ "extraChance": 2 } );
addData( "xp_value_brew", "minecraft:dragon_breath",									{ "alchemy": 35 } );
addData( "info_brew", "minecraft:dragon_breath",										{ "extraChance": 3 } );
addData( "xp_value_brew", "minecraft:pufferfish",										{ "alchemy": 5 } );
addData( "info_brew", "minecraft:pufferfish",											{ "extraChance": 0.45 } );
addData( "xp_value_brew", "minecraft:phantom_membrane",									{ "alchemy": 17 } );
addData( "info_brew", "minecraft:phantom_membrane",										{ "extraChance": 0.7 } );
addData( "mob_rare_drop", "minecraft:ender_dragon",										{ "minecraft:dragon_head": 1, "minecraft:dragon_egg": 10 } );
addData( "mob_rare_drop", "minecraft:slime",											{ "minecraft:slime_block": 100 } );
addData( "mob_rare_drop", "minecraft:zombie",											{ "minecraft:beetroot": 40 } );
addData( "mob_rare_drop", "minecraft:sheep",											{ "minecraft:string": 10 } );
addData( "mob_rare_drop", "minecraft:chicken",											{ "minecraft:egg": 10 } );
addData( "biome_mob_multiplier", "minecraft:plains",									{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );
													   
addData( "biome_effect_positive", "minecraft:plains",									{ "minecraft:speed": 0 } );
addData( "xp_bonus_biome", "minecraft:river",											{ "fishing": 5 } );
addData( "biome_mob_multiplier", "minecraft:river",										{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );
addData( "biome_mob_multiplier", "minecraft:beach",										{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );		 
addData( "xp_bonus_biome", "minecraft:desert",											{ "excavation": 10, "farming": -15 } );
addData( "biome_mob_multiplier", "minecraft:desert",									{ "speedBonus": 0.75, "hpBonus": 0.75, "damageBonus": 0.75 } );
addData( "biome_mob_multiplier", "minecraft:the_end",									{ "speedBonus": 1.25, "hpBonus": 2, "damageBonus": 1.25 } );
addData( "biome_mob_multiplier", "minecraft:nether",									{ "hpBonus": 1.5, "damageBonus": 1.5 } );
addData( "xp_bonus_biome", "minecraft:jungle",											{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -25, "farming": -25 } );
addData( "biome_effect_negative", "minecraft:jungle",									{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:jungle",									{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:jungle_hills",									{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -75, "farming": -75 } );
addData( "biome_effect_negative", "minecraft:jungle_hills",								{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:jungle_hills",								{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:bamboo_jungle",									{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -25, "farming": -25 } );
addData( "biome_effect_negative", "minecraft:bamboo_jungle",							{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:bamboo_jungle",								{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:bamboo_jungle_hills",								{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -75, "farming": -75 } );
addData( "biome_effect_negative", "minecraft:bamboo_jungle_hills",						{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:bamboo_jungle_hills",						{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:jungle_edge",										{ "agility": 25, "swimming": 25, "fishing": 25, "combat": 10, "archery": 35, "woodcutting": -75, "farming": -75 } );
addData( "biome_effect_negative", "minecraft:jungle_edge",								{ "minecraft:slowness": 0, "minecraft:weakness": 0 } );
addData( "biome_mob_multiplier", "minecraft:jungle_edge",								{ "speedBonus": 1.5, "hpBonus": 1.25 } );
addData( "xp_bonus_biome", "minecraft:ocean",											{ "swimming": 25, "fishing": 10 } );
addData( "biome_effect_negative", "minecraft:ocean",									{ "minecraft:slowness": 0 } );
addData( "req_biome", "minecraft:deep_ocean",											{ "swimming": 15 } );
addData( "xp_bonus_biome", "minecraft:deep_ocean",										{ "swimming": 50, "fishing": 20 } );
addData( "biome_effect_negative", "minecraft:deep_ocean",								{ "minecraft:slowness": 0 } );
addData( "req_biome", "minecraft:cold_ocean",											{ "swimming": 25, "endurance": 15 } );
addData( "xp_bonus_biome", "minecraft:cold_ocean",										{ "swimming": 50, "fishing": 30 } );
addData( "biome_effect_negative", "minecraft:cold_ocean",								{ "minecraft:slowness": 1, "minecraft:weakness": 0 } );
addData( "req_biome", "minecraft:frozen_ocean",											{ "swimming": 35, "endurance": 15 } );
addData( "xp_bonus_biome", "minecraft:frozen_ocean",									{ "swimming": 75, "fishing": 40 } );
addData( "biome_effect_negative", "minecraft:frozen_ocean",								{ "minecraft:slowness": 2, "minecraft:weakness": 1 } );
addData( "req_biome", "minecraft:deep_frozen_ocean",									{ "swimming": 35, "endurance": 25 } );
addData( "xp_bonus_biome", "minecraft:deep_frozen_ocean",								{ "swimming": 100, "fishing": 50 } );
addData( "biome_effect_negative", "minecraft:deep_frozen_ocean",						{ "minecraft:slowness": 3, "minecraft:weakness": 2 } );
addData( "info_ore", "minecraft:nether_quartz_ore",										{ "extraChance": 0.55 } );
addData( "info_ore", "minecraft:coal_ore",												{ "extraChance": 1 } );
addData( "info_ore", "minecraft:iron_ore",												{ "extraChance": 0.75 } );
addData( "info_ore", "minecraft:gold_ore",												{ "extraChance": 0.5 } );
addData( "info_ore", "minecraft:diamond_ore",											{ "extraChance": 0.33 } );
addData( "info_ore", "minecraft:redstone_ore",											{ "extraChance": 2 } );
addData( "info_ore", "minecraft:lapis_ore",												{ "extraChance": 1.5 } );
addData( "info_ore", "minecraft:emerald_ore",											{ "extraChance": 0.75 } );
addData( "info_ore", "minecraft:glowstone",												{ "extraChance": 0.1 } );
addData( "info_log", "minecraft:log",													{ "extraChance": 1 } );
addData( "info_log", "minecraft:oak_log",												{ "extraChance": 1 } );
addData( "info_log", "minecraft:birch_log",												{ "extraChance": 0.85 } );
addData( "info_log", "minecraft:spruce_log",											{ "extraChance": 0.65 } );
addData( "info_log", "minecraft:jungle_log",											{ "extraChance": 0.55 } );
addData( "info_log", "minecraft:dark_oak_log",											{ "extraChance": 0.5 } );
addData( "info_log", "minecraft:acacia_log",											{ "extraChance": 1.25 } );
addData( "info_log", "minecraft:oak_wood",												{ "extraChance": 1 } );
addData( "info_log", "minecraft:birch_wood",											{ "extraChance": 0.85 } );
addData( "info_log", "minecraft:spruce_wood",											{ "extraChance": 0.65 } );
addData( "info_log", "minecraft:jungle_wood",											{ "extraChance": 0.55 } );
addData( "info_log", "minecraft:dark_oak_wood",											{ "extraChance": 0.5 } );
addData( "info_log", "minecraft:acacia_wood",											{ "extraChance": 1.25 } );
addData( "info_plant", "minecraft:cocoa_beans",											{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:wheat",												{ "extraChance": 0.5 } );
addData( "info_plant", "minecraft:melon",												{ "extraChance": 1 } );
addData( "info_plant", "minecraft:pumpkin",												{ "extraChance": 0.6 } );
addData( "info_plant", "minecraft:beetroot",											{ "extraChance": 1 } );
addData( "info_plant", "minecraft:cactus",												{ "extraChance": 0.45 } );
addData( "info_plant", "minecraft:sugar_cane",											{ "extraChance": 0.33 } );
addData( "info_plant", "minecraft:kelp",												{ "extraChance": 0.25 } );
addData( "info_plant", "minecraft:kelp_plant",											{ "extraChance": 0.25 } );
addData( "info_plant", "minecraft:bamboo",												{ "extraChance": 0.35 } );
addData( "info_plant", "minecraft:sea_pickle",											{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:potatoes",											{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:potato",												{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:carrots",												{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:carrot",												{ "extraChance": 1.5 } );
addData( "info_plant", "minecraft:nether_wart",											{ "extraChance": 0.75 } );
addData2( "salvage", "minecraft:diamond_helmet", "minecraft:diamond",
{
	"salvageMax": 5,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_chestplate", "minecraft:diamond",
{
	"salvageMax": 8,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_leggings", "minecraft:diamond",
{
	"salvageMax": 7,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_boots", "minecraft:diamond",
{
	"salvageMax": 4,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_horse_armor", "minecraft:diamond",
{
	"salvageMax": 7,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_sword", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_axe", "minecraft:diamond",
{
	"salvageMax": 3,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_pickaxe", "minecraft:diamond",
{
	"salvageMax": 3,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_hoe", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_shovel", "minecraft:diamond",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:diamond_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:jukebox", "minecraft:diamond",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:jukebox", "minecraft:oak_planks",
{
	"salvageMax": 8,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:enchanting_table", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 85,
	"xpPerItem": 75,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:enchanting_table", "minecraft:book",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1,
	"maxChance": 95,
	"xpPerItem": 7.5,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:enchanting_table", "minecraft:obsidian",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:golden_helmet", "minecraft:gold_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_chestplate", "minecraft:gold_ingot",
{
	"salvageMax": 8,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_leggings", "minecraft:gold_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_boots", "minecraft:gold_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_horse_armor", "minecraft:gold_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_sword", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_axe", "minecraft:gold_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_pickaxe", "minecraft:gold_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_hoe", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_shovel", "minecraft:gold_ingot",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:clock", "minecraft:gold_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:clock", "minecraft:redstone",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:golden_apple", "minecraft:gold_ingot",
{
	"salvageMax": 8,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:golden_carrot", "minecraft:gold_nugget",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 0.85,
	"maxChance": 80,
	"xpPerItem": 4,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:golden_carrot", "minecraft:carrot",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 80,
	"xpPerItem": 4,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:light_weighted_pressure_plate", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 80,
	"xpPerItem": 35,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:chainmail_helmet", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chainmail_chestplate", "minecraft:iron_ingot",
{
	"salvageMax": 8,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chainmail_leggings", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chainmail_boots", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 50,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:iron_helmet", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_chestplate", "minecraft:iron_ingot",
{
	"salvageMax": 8,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_leggings", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_boots", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_horse_armor", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_sword", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_axe", "minecraft:iron_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_pickaxe", "minecraft:iron_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_hoe", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:iron_shovel", "minecraft:iron_ingot",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:anvil", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:anvil", "minecraft:iron_block",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:chipped_anvil", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:chipped_anvil", "minecraft:iron_block",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:damaged_anvil", "minecraft:iron_ingot",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:damaged_anvil", "minecraft:iron_block",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_trapdoor", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:iron_door", "minecraft:iron_ingot",
{
	"salvageMax": 6,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:hopper", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:hopper", "minecraft:chest",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 10,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:compass", "minecraft:iron_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:compass", "minecraft:redstone",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:minecart", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:bucket", "minecraft:iron_ingot",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:cauldron", "minecraft:iron_ingot",
{
	"salvageMax": 7,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:flint_and_steel", "minecraft:iron_ingot",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:flint_and_steel", "minecraft:flint",
{
	"salvageMax": 1,
	"baseChance": 35,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 3,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:shears", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:blast_furnace", "minecraft:iron_ingot",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:heavy_weighted_pressure_plate", "minecraft:iron_ingot",
{
	"salvageMax": 2,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:leather_helmet", "minecraft:leather",
{
	"salvageMax": 5,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_chestplate", "minecraft:leather",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_leggings", "minecraft:leather",
{
	"salvageMax": 7,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_boots", "minecraft:leather",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:leather_horse_armor", "minecraft:leather",
{
	"salvageMax": 7,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:item_frame", "minecraft:leather",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 7.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:item_frame", "minecraft:stick",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 0.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:book", "minecraft:leather",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:book", "minecraft:paper",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 2,
	"maxChance": 90,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:writable_book", "minecraft:book",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 12.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:saddle", "minecraft:leather",
{
	"salvageMax": 5,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 25,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_sword", "minecraft:cobblestone",
{
	"salvageMax": 2,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_sword", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_axe", "minecraft:cobblestone",
{
	"salvageMax": 3,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_axe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_pickaxe", "minecraft:cobblestone",
{
	"salvageMax": 3,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_pickaxe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_hoe", "minecraft:cobblestone",
{
	"salvageMax": 2,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:stone_hoe", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_shovel", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:stone_shovel", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:wooden_sword", "minecraft:stick",
{
	"salvageMax": 4,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_axe", "minecraft:stick",
{
	"salvageMax": 5,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_pickaxe", "minecraft:stick",
{
	"salvageMax": 5,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_hoe", "minecraft:stick",
{
	"salvageMax": 4,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:wooden_shovel", "minecraft:stick",
{
	"salvageMax": 3,
	"baseChance": 35,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:elytra", "minecraft:phantom_membrane",
{
	"salvageMax": 5,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 100,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:fishing_rod", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 45,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:bow", "minecraft:string",
{
	"salvageMax": 3,
	"baseChance": 60,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:beacon", "minecraft:nether_star",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 200,
	"levelReq": 50
} );
addData2( "salvage", "minecraft:beacon", "minecraft:obsidian",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 3.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:tnt", "minecraft:gunpowder",
{
	"salvageMax": 5,
	"baseChance": 25,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 4,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:brewing_stand", "minecraft:blaze_rod",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:gravel", "minecraft:flint",
{
	"salvageMax": 2,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 85,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:ender_eye", "minecraft:ender_pearl",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:ender_eye", "minecraft:blaze_powder",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 85,
	"xpPerItem": 10,
	"levelReq": 8
} );
addData2( "salvage", "minecraft:magma_cream", "minecraft:slime_ball",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 15,
	"levelReq": 20
} );
addData2( "salvage", "minecraft:jack_o_lantern", "minecraft:carved_pumpkin",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.25,
	"maxChance": 80,
	"xpPerItem": 3,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:jack_o_lantern", "minecraft:torch",
{
	"salvageMax": 1,
	"baseChance": 60,
	"chancePerLevel": 1.5,
	"maxChance": 95,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:furnace", "minecraft:cobblestone",
{
	"salvageMax": 8,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1.25,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:cobblestone_wall", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1.25,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:sandstone_wall", "minecraft:sandstone",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:end_stone_brick_wall", "minecraft:end_stone_bricks",
{
	"salvageMax": 1,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 2.5,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:mossy_cobblestone", "minecraft:vine",
{
	"salvageMax": 1,
	"baseChance": 1,
	"chancePerLevel": 1,
	"maxChance": 15,
	"xpPerItem": 5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:turtle_helmet", "minecraft:scute",
{
	"salvageMax": 5,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 15,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:wheat", "minecraft:wheat_seeds",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:beetroot", "minecraft:beetroot_seeds",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:ladder", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 100,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:oak_leaves", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:birch_leaves", "minecraft:stick",
{
	"salvageMax": 2,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:spruce_leaves", "minecraft:stick",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:jungle_leaves", "minecraft:stick",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:dark_oak_leaves", "minecraft:stick",
{
	"salvageMax": 3,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:acacia_leaves", "minecraft:stick",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 75,
	"xpPerItem": 1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:nether_bricks", "minecraft:nether_brick",
{
	"salvageMax": 4,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 1.5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:end_crystal", "minecraft:ghast_tear",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 0.5,
	"maxChance": 80,
	"xpPerItem": 25,
	"levelReq": 40
} );
addData2( "salvage", "minecraft:end_crystal", "minecraft:ender_eye",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 10,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:egg", "minecraft:chicken_spawn_egg",
{
	"salvageMax": 1,
	"baseChance": 12.5,
	"chancePerLevel": 0,
	"maxChance": 12.5,
	"xpPerItem": 3,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:ghast_tear", "minecraft:ghast_spawn_egg",
{
	"salvageMax": 1,
	"baseChance": 12.5,
	"chancePerLevel": 0.1,
	"maxChance": 25,
	"xpPerItem": 10,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:wither_rose", "minecraft:wither_skeleton_spawn_egg",
{
	"salvageMax": 3,
	"baseChance": 12.5,
	"chancePerLevel": 0.1,
	"maxChance": 25,
	"xpPerItem": 10,
	"levelReq": 50
} );
addData2( "salvage", "minecraft:bedrock", "minecraft:nether_star",
{
	"salvageMax": 666,
	"baseChance": 0.01,
	"chancePerLevel": 0,
	"maxChance": 0.01,
	"xpPerItem": 200,
	"levelReq": 99
} );
addData2( "salvage", "minecraft:emerald_ore", "minecraft:zombie_villager_spawn_egg",
{
	"salvageMax": 1,
	"baseChance": 25,
	"chancePerLevel": 0,
	"maxChance": 25,
	"xpPerItem": 50,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:prismarine_bricks", "minecraft:prismarine_shard",
{
	"salvageMax": 9,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:dark_prismarine", "minecraft:prismarine_shard",
{
	"salvageMax": 8,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:prismarine", "minecraft:prismarine_shard",
{
	"salvageMax": 4,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:sea_lantern", "minecraft:prismarine_crystals",
{
	"salvageMax": 5,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:flower_pot", "minecraft:brick",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:bricks", "minecraft:brick",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:honeycomb_block", "minecraft:honeycomb",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 2,
	"maxChance": 90,
	"xpPerItem": 2,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:scaffolding", "minecraft:bamboo",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 2,
	"levelReq": 12
} );
addData2( "salvage", "minecraft:quartz_block", "minecraft:quartz",
{
	"salvageMax": 4,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 1.5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:daylight_detector", "minecraft:quartz",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 4.5,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:lead", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 50,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 7.5,
	"levelReq": 8
} );
addData2( "salvage", "minecraft:nether_wart_block", "minecraft:nether_wart",
{
	"salvageMax": 9,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 2,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:dragon_head", "minecraft:dragon_egg",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 0.5,
	"maxChance": 20,
	"xpPerItem": 100,
	"levelReq": 50
} );
addData2( "salvage", "minecraft:redstone_torch", "minecraft:redstone",
{
	"salvageMax": 1,
	"baseChance": 60,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:trapped_chest", "minecraft:chest",
{
	"salvageMax": 1,
	"baseChance": 30,
	"chancePerLevel": 1.5,
	"maxChance": 100,
	"xpPerItem": 1.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:chest", "minecraft:oak_planks",
{
	"salvageMax": 8,
	"baseChance": 40,
	"chancePerLevel": 1,
	"maxChance": 80,
	"xpPerItem": 0.8,
	"levelReq": 10
} );
addData2( "salvage", "minecraft:packed_ice", "minecraft:ice",
{
	"salvageMax": 9,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:blue_ice", "minecraft:packed_ice",
{
	"salvageMax": 9,
	"baseChance": 35,
	"chancePerLevel": 0.75,
	"maxChance": 90,
	"xpPerItem": 0.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:magma_block", "minecraft:magma_cream",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 0.75,
	"maxChance": 50,
	"xpPerItem": 0.5,
	"levelReq": 30
} );
addData2( "salvage", "minecraft:sandstone", "minecraft:sand",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 0.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:red_sandstone", "minecraft:red_sand",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 0.5,
	"levelReq": 5
} );
addData2( "salvage", "minecraft:soul_sand", "minecraft:nether_wart",
{
	"salvageMax": 1,
	"baseChance": 0.5,
	"chancePerLevel": 0.05,
	"maxChance": 0.5,
	"xpPerItem": 0.5,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:conduit", "minecraft:heart_of_the_sea",
{
	"salvageMax": 1,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 100,
	"xpPerItem": 50,
	"levelReq": 25
} );
addData2( "salvage", "minecraft:bone_block", "minecraft:bone",
{
	"salvageMax": 3,
	"baseChance": 20,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 2,
	"levelReq": 8
} );
addData2( "salvage", "minecraft:melon", "minecraft:melon_slice",
{
	"salvageMax": 9,
	"baseChance": 30,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 0.35,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:emerald", "minecraft:experience_bottle",
{
	"salvageMax": 16,
	"baseChance": 1,
	"chancePerLevel": 1,
	"maxChance": 100,
	"xpPerItem": 1,
	"levelReq": 15
} );
addData2( "salvage", "minecraft:glass_bottle", "minecraft:glass",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 1.5,
	"maxChance": 90,
	"xpPerItem": 0.35,
	"levelReq": 3
} );
addData2( "salvage", "minecraft:andesite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:rotten_flesh", "minecraft:leather",
{
	"salvageMax": 1,
	"baseChance": 20,
	"chancePerLevel": 0.8,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 12
} );
addData2( "salvage", "minecraft:granite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData2( "salvage", "minecraft:diorite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
{
addData2( "treasure", "minecraft:magma_block", "minecraft:magma_cream",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 2
} );
}
{
addData2( "treasure", "minecraft:netherrack", "minecraft:gold_nugget",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 7.5,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:soul_sand", "minecraft:nether_wart",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:soul_sand", "minecraft:wither_skeleton_skull",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 50,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:soul_sand", "minecraft:ghast_tear",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 125,
	"xpPerItem": 15,
	"minCount": 1,
	"maxCount": 2
} );
}
{
addData2( "treasure", "minecraft:podzol", "minecraft:wheat_seeds",
{
	"startChance": 0.1,
	"startLevel": 10,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:pumpkin_seeds",
{
	"startChance": 0.1,
	"startLevel": 15,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:melon_seeds",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:beetroot_seeds",
{
	"startChance": 0.1,
	"startLevel": 20,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:potato",
{
	"startChance": 0.1,
	"startLevel": 30,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:poisonous_potato",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:carrot",
{
	"startChance": 0.1,
	"startLevel": 30,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:podzol", "minecraft:sweet_berries",
{
	"startChance": 0.1,
	"startLevel": 15,
	"endChance": 1,
	"endLevel": 150,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:coal_ore", "minecraft:diamond",
{
	"startChance": 0.01,
	"startLevel": 1,
	"endChance": 0.1,
	"endLevel": 200,
	"xpPerItem": 100,
	"minCount": 1,
	"maxCount": 1
} );
}
{
addData2( "treasure", "minecraft:stone", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:granite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 3,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 2,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:diorite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 3,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:andesite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 3,
	"endLevel": 100,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:gravel", "minecraft:diamond",
{
	"startChance": 0.01,
	"startLevel": 50,
	"endChance": 0.1,
	"endLevel": 200,
	"xpPerItem": 100,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:gravel", "minecraft:bone",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 100,
	"xpPerItem": 8,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:gravel", "minecraft:gunpowder",
{
	"startChance": 0.2,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 125,
	"xpPerItem": 4,
	"minCount": 1,
	"maxCount": 4
} );
}
{
addData2( "treasure", "minecraft:sand", "minecraft:clay",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 200,
	"xpPerItem": 2,
	"minCount": 1,
	"maxCount": 4
} );
}
{
addData2( "treasure", "minecraft:grass_block", "minecraft:wheat",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.5,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 2
} );
addData2( "treasure", "minecraft:grass_block", "minecraft:wheat_seeds",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 75,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "minecraft:grass_block", "minecraft:tall_grass",
{
	"startChance": 0.08,
	"startLevel": 1,
	"endChance": 0.8,
	"endLevel": 100,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:grass_block", "minecraft:grass",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 100,
	"xpPerItem": 3,
	"minCount": 1,
	"maxCount": 1
} );
}
{
addData2( "treasure", "minecraft:dirt", "minecraft:cake",
{
	"startChance": 0.01,
	"startLevel": 1,
	"endChance": 0.05,
	"endLevel": 999,
	"xpPerItem": 1000,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:dirt", "minecraft:bone",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 1,
	"endLevel": 125,
	"xpPerItem": 8,
	"minCount": 1,
	"maxCount": 3
} );
}
{
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_13",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_cat",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_blocks",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_chirp",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_far",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_mall",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_mellohi",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_stal",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_strad",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_ward",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_11",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_wait",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "minecraft:bookshelf", "minecraft:music_disc_pigstep",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 0.2,
	"endLevel": 100,
	"xpPerItem": 12.5,
	"minCount": 1,
	"maxCount": 1
} );
}
addData( "fish_pool", "minecraft:leather_helmet",										{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:leather_chestplate",									{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:leather_leggings",										{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:leather_boots",										{ "startWeight": 100, "startLevel": 5, "endWeight": 10, "endLevel": 80, "xp": 35, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_shovel",										{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_pickaxe",										{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_axe",											{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_sword",											{ "startWeight": 100, "startLevel": 1, "endWeight": 5, "endLevel":  80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:wooden_hoe",											{ "startWeight": 100, "startLevel": 1, "endWeight": 10, "endLevel": 80, "xp": 15, "enchantLevelReq": 1 } );
addData( "fish_pool", "minecraft:bow",													{ "startWeight": 100, "startLevel": 1, "endWeight": 25, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:fishing_rod",											{ "startWeight": 40, "startLevel": 1, "endWeight": 100, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_helmet",										{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_chestplate",									{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_leggings",									{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:chainmail_boots",										{ "startWeight": 50, "startLevel": 15, "endWeight": 15, "endLevel": 80, "xp": 35, "enchantLevelReq": 10 } );
addData( "fish_pool", "minecraft:iron_helmet",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_chestplate",										{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_leggings",										{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_boots",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_shovel",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_pickaxe",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_axe",												{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_sword",											{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:iron_hoe",												{ "startWeight": 75, "startLevel": 20, "endWeight": 20, "endLevel": 85, "xp": 45, "enchantLevelReq": 20 } );
addData( "fish_pool", "minecraft:golden_helmet",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_chestplate",									{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_leggings",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_boots",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_shovel",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_pickaxe",										{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_axe",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_sword",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:golden_hoe",											{ "startWeight": 5, "startLevel": 35, "endWeight": 35, "endLevel": 90, "xp": 55, "enchantLevelReq": 45 } );
addData( "fish_pool", "minecraft:diamond_helmet",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_chestplate",									{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_leggings",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_boots",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_shovel",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_pickaxe",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_axe",											{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_sword",										{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:diamond_hoe",											{ "startWeight": 0, "startLevel": 60, "endWeight": 25, "endLevel": 95, "xp": 150, "enchantLevelReq": 60 } );
addData( "fish_pool", "minecraft:netherite_helmet",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_chestplate",									{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_leggings",									{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_boots",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_shovel",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_pickaxe",									{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_axe",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_sword",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:netherite_hoe",										{ "startWeight": 0, "startLevel": 80, "endWeight": 3, "endLevel": 100, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "minecraft:kelp",													{ "startWeight": 500, "startLevel": 1, "endWeight": 25, "endLevel": 75, "xp": 0.25, "minCount": 5, "maxCount": 24 } );
addData( "fish_pool", "minecraft:lily_pad",												{ "startWeight": 500, "startLevel": 1, "endWeight": 25, "endLevel": 75, "xp": 0.25, "minCount": 5, "maxCount": 24 } );
addData( "fish_pool", "minecraft:string",												{ "startWeight": 200, "startLevel": 1, "endWeight": 15, "endLevel": 80, "xp": 0.35, "minCount": 5, "maxCount": 16 } );
addData( "fish_pool", "minecraft:heart_of_the_sea",										{ "startWeight": 1, "startLevel": 1, "endWeight": 1, "endLevel": 1, "xp": 250, "minCount": 1, "maxCount": 1 } );
addData( "fish_pool", "minecraft:nautilus_shell",										{ "startWeight": 1, "startLevel": 1, "endWeight": 5, "endLevel": 25, "xp": 250, "minCount": 1, "maxCount": 3 } );
addData( "fish_pool", "minecraft:nether_star",											{ "startWeight": 0, "startLevel": 95, "endWeight": 1, "endLevel": 150, "xp": 666, "minCount": 1, "maxCount": 1 } );
addData( "fish_enchant_pool", "minecraft:bane_of_arthropods",							{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 10 } );
addData( "fish_enchant_pool", "minecraft:depth_strider",								{ "levelReq": 20, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:efficiency",									{ "levelReq": 25, "levelPerLevel": 30, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 10 } );
addData( "fish_enchant_pool", "minecraft:feather_falling",								{ "levelReq": 5, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:fortune",										{ "levelReq": 35, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:frost_walker",									{ "levelReq": 25, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:looting",										{ "levelReq": 35, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:luck_of_the_sea",								{ "levelReq": 15, "levelPerLevel": 15, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:lure",											{ "levelReq": 20, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:mending",										{ "levelReq": 50, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:silk_touch",									{ "levelReq": 40, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:channeling",									{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:multishot",									{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "minecraft:projectile_protection",						{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:blast_protection",								{ "levelReq": 25, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:protection",									{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:sharpness",									{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:sweeping",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:smite",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:thorns",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:unbreaking",									{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 75, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:quick_charge",									{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 5 } );
addData( "fish_enchant_pool", "minecraft:power",										{ "levelReq": 20, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 8 } );
addData( "fish_enchant_pool", "minecraft:punch",										{ "levelReq": 15, "levelPerLevel": 20, "chancePerLevel": 1, "maxChance": 90, "maxLevel": 10 } );
addData( "fish_enchant_pool", "minecraft:piercing",										{ "levelReq": 35, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 80, "maxLevel": 7 } );
addData( "fish_enchant_pool", "minecraft:riptide",										{ "levelReq": 25, "levelPerLevel": 25, "chancePerLevel": 1, "maxChance": 85, "maxLevel": 7 } );
addData( "level_up_command", "fishing",													{ "give >player< minecraft:cookie >level<": 100 } );
addData( "vein_blacklist", "all_dimensions",											{ "minecraft:furnace": 0, "minecraft:chest": 0, "minecraft:trapped_chest": 0, "minecraft:shulker_box": 0, "minecraft:barrel": 0, "minecraft:dropper": 0, "minecraft:dispenser": 0 } );
addData( "vein_blacklist", "minecraft:overworld",										{ "minecraft:stone": 0 } );
addData( "vein_blacklist", "minecraft:the_nether",										{ "minecraft:netherrack": 0 } );
addData( "vein_blacklist", "minecraft:the_end",											{ "minecraft:end_stone": 0 } );
addData( "xp_multiplier_dimension", "all_dimensions",									{ "engineering": 1.0 } );
addData( "xp_bonus_dimension", "all_dimensions",										{  } );
addData( "xp_bonus_dimension", "minecraft:the_end",										{ "flying": 50, "combat": 20, "archery": 50, "endurance": 20 } );
addData( "xp_bonus_dimension", "minecraft:the_nether",									{ "combat": 25, "archery": 25, "endurance": 25, "flying": 250, "farming": -25 } );
{
addData( "xp_value_break", "oresandmetals:light_animica_ore",							{ "mining": 85 } );
addData( "req_break", "oresandmetals:light_animica_ore",								{ "mining": 90 } );
addData( "xp_value_break", "oresandmetals:dark_animica_ore",							{ "mining": 85 } );
addData( "req_break", "oresandmetals:dark_animica_ore",									{ "mining": 90 } );
addData( "xp_value_break", "oresandmetals:banite_ore",									{ "mining": 75 } );
addData( "req_break", "oresandmetals:banite_ore",										{ "mining": 80 } );
addData( "xp_value_break", "oresandmetals:necrite_ore",									{ "mining": 65 } );
addData( "req_break", "oresandmetals:necrite_ore",										{ "mining": 70 } );
addData( "xp_value_break", "oresandmetals:phasmatite_ore",								{ "mining": 65 } );
addData( "req_break", "oresandmetals:phasmatite_ore",									{ "mining": 70 } );
addData( "xp_value_break", "oresandmetals:orichalcite_ore",								{ "mining": 55 } );
addData( "req_break", "oresandmetals:orichalcite_ore",									{ "mining": 60 } );
addData( "xp_value_break", "oresandmetals:drakolith_ore",								{ "mining": 55 } );
addData( "req_break", "oresandmetals:drakolith_ore",									{ "mining": 60 } );
addData( "xp_value_break", "oresandmetals:runite_ore",									{ "mining": 45 } );
addData( "req_break", "oresandmetals:runite_ore",										{ "mining": 50 } );
addData( "xp_value_break", "oresandmetals:adamantite_ore",								{ "mining": 30 } );
addData( "req_break", "oresandmetals:adamantite_ore",									{ "mining": 35 } );
addData( "xp_value_break", "oresandmetals:mithril_ore",									{ "mining": 20 } );
addData( "req_break", "oresandmetals:mithril_ore",										{ "mining": 25 } );
addData( "xp_value_break", "oresandmetals:tin_ore",										{ "mining": 7 } );
addData( "req_break", "oresandmetals:tin_ore",											{ "mining": 5 } );
addData( "xp_value_break", "oresandmetals:copper_ore",									{ "mining": 4 } );
addData( "req_break", "oresandmetals:copper_ore",										{ "mining": 5 } );
addData( "req_wear", "oresandmetals:elder_rune_helmet",									{ "endurance": 90 } );
addData( "req_wear", "oresandmetals:elder_rune_chestplate",								{ "endurance": 90 } );
addData( "req_wear", "oresandmetals:elder_rune_leggings",								{ "endurance": 90 } );
addData( "req_wear", "oresandmetals:elder_rune_boots",									{ "endurance": 90 } );
addData( "req_wear", "oresandmetals:banite_helmet",										{ "endurance": 80 } );
addData( "req_wear", "oresandmetals:banite_chestplate",									{ "endurance": 80 } );
addData( "req_wear", "oresandmetals:banite_leggings",									{ "endurance": 80 } );
addData( "req_wear", "oresandmetals:banite_boots",										{ "endurance": 80 } );
addData( "req_wear", "oresandmetals:necronium_helmet",									{ "endurance": 70 } );
addData( "req_wear", "oresandmetals:necronium_chestplate",								{ "endurance": 70 } );
addData( "req_wear", "oresandmetals:necronium_leggings",								{ "endurance": 70 } );
addData( "req_wear", "oresandmetals:necronium_boots",									{ "endurance": 70 } );
addData( "req_wear", "oresandmetals:orikalkum_helmet",									{ "endurance": 60 } );
addData( "req_wear", "oresandmetals:orikalkum_chestplate",								{ "endurance": 60 } );
addData( "req_wear", "oresandmetals:orikalkum_leggings",								{ "endurance": 60 } );
addData( "req_wear", "oresandmetals:orikalkum_boots",									{ "endurance": 60 } );
addData( "req_wear", "oresandmetals:rune_helmet",										{ "endurance": 50 } );
addData( "req_wear", "oresandmetals:rune_chestplate",									{ "endurance": 50 } );
addData( "req_wear", "oresandmetals:rune_leggings",										{ "endurance": 50 } );
addData( "req_wear", "oresandmetals:rune_boots",										{ "endurance": 50 } );
addData( "req_wear", "oresandmetals:adamant_helmet",									{ "endurance": 35 } );
addData( "req_wear", "oresandmetals:adamant_chestplate",								{ "endurance": 35 } );
addData( "req_wear", "oresandmetals:adamant_leggings",									{ "endurance": 35 } );
addData( "req_wear", "oresandmetals:adamant_boots",										{ "endurance": 35 } );
addData( "req_wear", "oresandmetals:mithril_helmet",									{ "endurance": 25 } );
addData( "req_wear", "oresandmetals:mithril_chestplate",								{ "endurance": 25 } );
addData( "req_wear", "oresandmetals:mithril_leggings",									{ "endurance": 25 } );
addData( "req_wear", "oresandmetals:mithril_boots",										{ "endurance": 25 } );
addData( "req_wear", "oresandmetals:steel_helmet",										{ "endurance": 15 } );
addData( "req_wear", "oresandmetals:steel_chestplate",									{ "endurance": 15 } );
addData( "req_wear", "oresandmetals:steel_leggings",									{ "endurance": 15 } );
addData( "req_wear", "oresandmetals:steel_boots",										{ "endurance": 15 } );
addData( "req_wear", "oresandmetals:bronze_helmet",										{ "endurance": 5 } );
addData( "req_wear", "oresandmetals:bronze_chestplate",									{ "endurance": 5 } );
addData( "req_wear", "oresandmetals:bronze_leggings",									{ "endurance": 5 } );
addData( "req_wear", "oresandmetals:bronze_boots",										{ "endurance": 5 } );
addData( "req_tool", "oresandmetals:elder_rune_pickaxe",								{ "mining": 90 } );
addData( "req_tool", "oresandmetals:elder_rune_shovel",									{ "excavation": 90 } );
addData( "req_tool", "oresandmetals:elder_rune_axe",									{ "woodcutting": 90 } );
addData( "req_tool", "oresandmetals:banite_pickaxe",									{ "mining": 80 } );
addData( "req_tool", "oresandmetals:banite_shovel",										{ "excavation": 80 } );
addData( "req_tool", "oresandmetals:banite_axe",										{ "woodcutting": 80 } );
addData( "req_tool", "oresandmetals:necronium_pickaxe",									{ "mining": 70 } );
addData( "req_tool", "oresandmetals:necronium_shovel",									{ "excavation": 70 } );
addData( "req_tool", "oresandmetals:necronium_axe",										{ "woodcutting": 70 } );
addData( "req_tool", "oresandmetals:orikalkum_pickaxe",									{ "mining": 60 } );
addData( "req_tool", "oresandmetals:orikalkum_shovel",									{ "excavation": 60 } );
addData( "req_tool", "oresandmetals:orikalkum_axe",										{ "woodcutting": 60 } );
addData( "req_tool", "oresandmetals:rune_pickaxe",										{ "mining": 50 } );
addData( "req_tool", "oresandmetals:rune_shovel",										{ "excavation": 50 } );
addData( "req_tool", "oresandmetals:rune_axe",											{ "woodcutting": 50 } );
addData( "req_tool", "oresandmetals:adamant_pickaxe",									{ "mining": 35 } );
addData( "req_tool", "oresandmetals:adamant_shovel",									{ "excavation": 35 } );
addData( "req_tool", "oresandmetals:adamant_axe",										{ "woodcutting": 35 } );
addData( "req_tool", "oresandmetals:mithril_pickaxe",									{ "mining": 25 } );
addData( "req_tool", "oresandmetals:mithril_shovel",									{ "excavation": 25 } );
addData( "req_tool", "oresandmetals:mithril_axe",										{ "woodcutting": 25 } );
addData( "req_tool", "oresandmetals:steel_pickaxe",										{ "mining": 15 } );
addData( "req_tool", "oresandmetals:steel_shovel",										{ "excavation": 15 } );
addData( "req_tool", "oresandmetals:steel_axe",											{ "woodcutting": 15 } );
addData( "req_tool", "oresandmetals:bronze_pickaxe",									{ "mining": 5 } );
addData( "req_tool", "oresandmetals:bronze_shovel",										{ "excavation": 5 } );
addData( "req_tool", "oresandmetals:bronze_axe",										{ "woodcutting": 5 } );
addData( "req_weapon", "oresandmetals:elder_rune_pickaxe",								{ "combat": 90 } );
addData( "req_weapon", "oresandmetals:elder_rune_shovel",								{ "combat": 90 } );
addData( "req_weapon", "oresandmetals:elder_rune_axe",									{ "combat": 90 } );
addData( "req_weapon", "oresandmetals:elder_rune_sword",								{ "combat": 90 } );
addData( "req_weapon", "oresandmetals:banite_pickaxe",									{ "combat": 80 } );
addData( "req_weapon", "oresandmetals:banite_shovel",									{ "combat": 80 } );
addData( "req_weapon", "oresandmetals:banite_axe",										{ "combat": 80 } );
addData( "req_weapon", "oresandmetals:banite_sword",									{ "combat": 80 } );
addData( "req_weapon", "oresandmetals:necronium_pickaxe",								{ "combat": 70 } );
addData( "req_weapon", "oresandmetals:necronium_shovel",								{ "combat": 70 } );
addData( "req_weapon", "oresandmetals:necronium_axe",									{ "combat": 70 } );
addData( "req_weapon", "oresandmetals:necronium_sword",									{ "combat": 70 } );
addData( "req_weapon", "oresandmetals:orikalkum_pickaxe",								{ "combat": 60 } );
addData( "req_weapon", "oresandmetals:orikalkum_shovel",								{ "combat": 60 } );
addData( "req_weapon", "oresandmetals:orikalkum_axe",									{ "combat": 60 } );
addData( "req_weapon", "oresandmetals:orikalkum_sword",									{ "combat": 60 } );
addData( "req_weapon", "oresandmetals:rune_pickaxe",									{ "combat": 50 } );
addData( "req_weapon", "oresandmetals:rune_shovel",										{ "combat": 50 } );
addData( "req_weapon", "oresandmetals:rune_axe",										{ "combat": 50 } );
addData( "req_weapon", "oresandmetals:rune_sword",										{ "combat": 50 } );
addData( "req_weapon", "oresandmetals:adamant_pickaxe",									{ "combat": 35 } );
addData( "req_weapon", "oresandmetals:adamant_shovel",									{ "combat": 35 } );
addData( "req_weapon", "oresandmetals:adamant_axe",										{ "combat": 35 } );
addData( "req_weapon", "oresandmetals:adamant_sword",									{ "combat": 35 } );
addData( "req_weapon", "oresandmetals:mithril_pickaxe",									{ "combat": 25 } );
addData( "req_weapon", "oresandmetals:mithril_shovel",									{ "combat": 25 } );
addData( "req_weapon", "oresandmetals:mithril_axe",										{ "combat": 25 } );
addData( "req_weapon", "oresandmetals:mithril_sword",									{ "combat": 25 } );
addData( "req_weapon", "oresandmetals:steel_pickaxe",									{ "combat": 15 } );
addData( "req_weapon", "oresandmetals:steel_shovel",									{ "combat": 15 } );
addData( "req_weapon", "oresandmetals:steel_axe",										{ "combat": 15 } );
addData( "req_weapon", "oresandmetals:steel_sword",										{ "combat": 15 } );
addData( "req_weapon", "oresandmetals:bronze_pickaxe",									{ "combat": 5 } );
addData( "req_weapon", "oresandmetals:bronze_shovel",									{ "combat": 5 } );
addData( "req_weapon", "oresandmetals:bronze_axe",										{ "combat": 5 } );
addData( "req_weapon", "oresandmetals:bronze_sword",									{ "combat": 5 } );
}
{
addData( "req_wear", "doomweapon:astro_doom_helmet",									{ "endurance":  80, "combat":  70, "agility": 60 } );
addData( "req_wear", "doomweapon:astro_doom_chestplate",								{ "endurance":  80, "combat":  70, "agility": 60 } );
addData( "req_wear", "doomweapon:astro_doom_leggings",									{ "endurance":  80, "combat":  70, "agility": 60 } );
addData( "req_wear", "doomweapon:astro_doom_boots",										{ "endurance":  80, "combat":  70, "agility": 60 } );
addData( "req_wear", "doomweapon:classic_doom_helmet",									{ "endurance": 83, "combat": 70, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_doom_chestplate",								{ "endurance": 83, "combat": 70, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_doom_leggings",								{ "endurance": 83, "combat": 70, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_doom_boots",									{ "endurance": 83, "combat": 70, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_red_chestplate",								{ "endurance": 83, "combat": 70, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_red_leggings",									{ "endurance": 83, "combat": 73, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_black_chestplate",								{ "endurance": 83, "combat": 73, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_bronze_chestplate",							{ "endurance": 83, "combat": 73, "agility": 70 } );
addData( "req_wear", "doomweapon:classic_bronze_leggings",								{ "endurance": 83, "combat": 73, "agility": 70 } );
addData( "req_wear", "doomweapon:crimson_doom_helmet",									{ "endurance": 84, "combat": 74, "agility": 70 } );
addData( "req_wear", "doomweapon:crimson_doom_chestplate",								{ "endurance": 84, "combat": 74, "agility": 70 } );
addData( "req_wear", "doomweapon:crimson_doom_leggings",								{ "endurance": 84, "combat": 74, "agility": 70 } );
addData( "req_wear", "doomweapon:crimson_doom_boots",									{ "endurance": 84, "combat": 74, "agility": 70 } );
addData( "req_wear", "doomweapon:cultist_doom_helmet",									{ "endurance": 84, "combat": 74, "agility": 70 } );
addData( "req_wear", "doomweapon:cultist_doom_chestplate",								{ "endurance": 85, "combat": 75, "agility": 70 } );
addData( "req_wear", "doomweapon:cultist_doom_leggings",								{ "endurance": 85, "combat": 75, "agility": 70 } );
addData( "req_wear", "doomweapon:cultist_doom_boots",									{ "endurance": 85, "combat": 75, "agility": 70 } );
addData( "req_wear", "doomweapon:demonic_doom_helmet",									{ "endurance": 86, "combat": 76, "agility": 70 } );
addData( "req_wear", "doomweapon:demonic_doom_chestplate",								{ "endurance": 86, "combat": 76, "agility": 70 } );
addData( "req_wear", "doomweapon:demonic_doom_leggings",								{ "endurance": 86, "combat": 76, "agility": 70 } );
addData( "req_wear", "doomweapon:demonic_doom_boots",									{ "endurance": 86, "combat": 76, "agility": 70 } );
addData( "req_wear", "doomweapon:doomicorn_doom_helmet",								{ "endurance": 87, "combat": 77, "agility": 70 } );
addData( "req_wear", "doomweapon:doomicorn_doom_chestplate",							{ "endurance": 87, "combat": 77, "agility": 70 } );
addData( "req_wear", "doomweapon:doomicorn_doom_leggings",								{ "endurance": 87, "combat": 77, "agility": 70 } );
addData( "req_wear", "doomweapon:doomicorn_doom_boots",									{ "endurance": 87, "combat": 77, "agility": 70 } );
addData( "req_wear", "doomweapon:ember_doom_helmet",									{ "endurance": 88, "combat": 78, "agility": 70 } );
addData( "req_wear", "doomweapon:ember_doom_chestplate",								{ "endurance": 88, "combat": 78, "agility": 70 } );
addData( "req_wear", "doomweapon:ember_doom_leggings",									{ "endurance": 88, "combat": 78, "agility": 70 } );
addData( "req_wear", "doomweapon:ember_doom_boots",										{ "endurance": 88, "combat": 78, "agility": 70 } );
addData( "req_wear", "doomweapon:gold_doom_helmet",										{ "endurance": 89, "combat": 79, "agility": 70 } );
addData( "req_wear", "doomweapon:gold_doom_chestplate",									{ "endurance": 89, "combat": 79, "agility": 70 } );
addData( "req_wear", "doomweapon:gold_doom_leggings",									{ "endurance": 89, "combat": 79, "agility": 70 } );
addData( "req_wear", "doomweapon:gold_doom_boots",										{ "endurance": 89, "combat": 79, "agility": 70 } );
addData( "req_wear", "doomweapon:maykr_doom_helmet",									{ "endurance": 90, "combat": 80, "agility": 80 } );
addData( "req_wear", "doomweapon:maykr_doom_chestplate",								{ "endurance": 90, "combat": 80, "agility": 80 } );
addData( "req_wear", "doomweapon:maykr_doom_leggings",									{ "endurance": 90, "combat": 80, "agility": 80 } );
addData( "req_wear", "doomweapon:maykr_doom_boots",										{ "endurance": 90, "combat": 80, "agility": 80 } );
addData( "req_wear", "doomweapon:midnight_doom_helmet",									{ "endurance": 91, "combat": 81, "agility": 80 } );
addData( "req_wear", "doomweapon:midnight_doom_chestplate",								{ "endurance": 91, "combat": 81, "agility": 80 } );
addData( "req_wear", "doomweapon:midnight_doom_leggings",								{ "endurance": 91, "combat": 81, "agility": 80 } );
addData( "req_wear", "doomweapon:midnight_doom_boots",									{ "endurance": 91, "combat": 81, "agility": 80 } );
addData( "req_wear", "doomweapon:redneck_doom_leggings",								{ "endurance": 92, "combat": 82, "agility": 80 } );
addData( "req_wear", "doomweapon:redneck_doom_boots",									{ "endurance": 92, "combat": 82, "agility": 80 } );
addData( "req_wear", "doomweapon:nightmare_doom_helmet",								{ "endurance": 93, "combat": 83, "agility": 80 } );
addData( "req_wear", "doomweapon:nightmare_doom_chestplate",							{ "endurance": 93, "combat": 83, "agility": 80 } );
addData( "req_wear", "doomweapon:nightmare_doom_leggings",								{ "endurance": 93, "combat": 83, "agility": 80 } );
addData( "req_wear", "doomweapon:nightmare_doom_boots",									{ "endurance": 93, "combat": 83, "agility": 80 } );
addData( "req_wear", "doomweapon:painter_doom_helmet",									{ "endurance": 94, "combat": 84, "agility": 80 } );
addData( "req_wear", "doomweapon:painter_doom_chestplate",								{ "endurance": 94, "combat": 84, "agility": 80 } );
addData( "req_wear", "doomweapon:painter_doom_leggings",								{ "endurance": 94, "combat": 84, "agility": 80 } );
addData( "req_wear", "doomweapon:painter_doom_boots",									{ "endurance": 94, "combat": 84, "agility": 80 } );
addData( "req_wear", "doomweapon:phobos_doom_helmet",									{ "endurance": 95, "combat": 85, "agility": 80 } );
addData( "req_wear", "doomweapon:phobos_doom_chestplate",								{ "endurance": 95, "combat": 85, "agility": 80 } );
addData( "req_wear", "doomweapon:phobos_doom_leggings",									{ "endurance": 95, "combat": 85, "agility": 80 } );
addData( "req_wear", "doomweapon:phobos_doom_boots",									{ "endurance": 95, "combat": 85, "agility": 80 } );
addData( "req_wear", "doomweapon:praetor_doom_helmet",									{ "endurance": 96, "combat": 86, "agility": 80 } );
addData( "req_wear", "doomweapon:praetor_doom_chestplate",								{ "endurance": 96, "combat": 86, "agility": 80 } );
addData( "req_wear", "doomweapon:praetor_doom_leggings",								{ "endurance": 96, "combat": 86, "agility": 80 } );
addData( "req_wear", "doomweapon:praetor_doom_boots",									{ "endurance": 96, "combat": 86, "agility": 80 } );
addData( "req_wear", "doomweapon:purplepony_doom_helmet",								{ "endurance": 97, "combat": 87, "agility": 80 } );
addData( "req_wear", "doomweapon:purplepony_doom_chestplate",							{ "endurance": 97, "combat": 87, "agility": 80 } );
addData( "req_wear", "doomweapon:purplepony_doom_leggings",								{ "endurance": 97, "combat": 87, "agility": 80 } );
addData( "req_wear", "doomweapon:purplepony_doom_boots",								{ "endurance": 97, "combat": 87, "agility": 80 } );
addData( "req_wear", "doomweapon:sentinel_doom_helmet",									{ "endurance": 98, "combat": 88, "agility": 80 } );
addData( "req_wear", "doomweapon:sentinel_doom_chestplate",								{ "endurance": 98, "combat": 88, "agility": 80 } );
addData( "req_wear", "doomweapon:sentinel_doom_leggings",								{ "endurance": 98, "combat": 88, "agility": 80 } );
addData( "req_wear", "doomweapon:sentinel_doom_boots",									{ "endurance": 98, "combat": 88, "agility": 80 } );
addData( "req_wear", "doomweapon:zombie_doom_helmet",									{ "endurance":  99, "combat": 89, "agility": 90 } );
addData( "req_wear", "doomweapon:zombie_doom_chestplate",								{ "endurance":  99, "combat": 89, "agility": 90 } );
addData( "req_wear", "doomweapon:zombie_doom_leggings",									{ "endurance":  99, "combat": 89, "agility": 90 } );
addData( "req_wear", "doomweapon:zombie_doom_boots",									{ "endurance":  99, "combat": 89, "agility": 90 } );
addData( "req_tool", "doomweapon:argent_axe",											{ "woodcutting": 80 } );
addData( "req_tool", "doomweapon:argent_hoe",											{ "farming": 80 } );
addData( "req_tool", "doomweapon:argent_paxel",											{ "woodcutting": 80, "excavation": 80, "mining": 80 } );
addData( "req_tool", "doomweapon:argent_pickaxe",										{ "mining": 80 } );
addData( "req_tool", "doomweapon:argent_shovel",										{ "excavation": 80 } );
addData( "req_weapon", "doomweapon:cruciblesword",										{ "combat": 80, "endurance": 80, "agility": 90 } );
addData( "req_weapon", "doomweapon:argent_sword",										{ "combat": 90, "endurance": 90, "agility": 90 } );
addData( "req_weapon", "doomweapon:chainsaw",											{ "combat": 90, "endurance": 90, "agility": 90 } );
addData( "req_weapon", "doomweapon:cruciblesword_closed",								{ "combat": 80, "endurance": 80, "agility": 90 } );
addData( "req_weapon", "doomweapon:axe_marauder_open",									{ "combat": 80, "endurance": 80, "agility": 90 } );
addData( "req_weapon", "doomweapon:axe_marauder_closed",								{ "combat": 80, "endurance": 80, "agility": 90 } );
addData( "req_weapon", "doomweapon:supershotgun",										{ "combat": 80, "archery": 80 } );
addData( "req_weapon", "doomweapon:shotgun",											{ "combat": 90, "archery": 90 } );
addData( "req_weapon", "doomweapon:bfg9000",											{ "combat": 120, "archery": 99, "endurance": 99 } );
addData( "req_weapon", "doomweapon:plasmagun",											{ "combat": 90, "archery": 90, "endurance": 80 } );
addData( "req_weapon", "doomweapon:rocketlauncher",										{ "combat": 80, "archery": 80, "endurance": 80 } );
addData( "req_weapon", "doomweapon:ballista",											{ "combat": 80, "archery": 80, "endurance": 80 } );
addData( "req_weapon", "doomweapon:chaingun",											{ "combat": 80, "archery": 80, "endurance": 80 } );
addData( "req_weapon", "doomweapon:pistol",												{ "combat": 90, "archery": 90, "endurance": 90 } );
addData( "xp_value_trigger", "doomweapon.consume.inmortal",								{ "magic": 90 } );
addData( "xp_value_trigger", "doomweapon.consume.invisible",							{ "magic": 35 } );
addData( "xp_value_trigger", "doomweapon.consume.mega",									{ "magic": 105 } );
addData( "xp_value_trigger", "doomweapon.consume.power",								{ "magic": 60 } );
addData( "xp_value_trigger", "doomweapon.consume.soul",									{ "magic": 50 } );
}
{
addData( "req_place", "appliedenergistics2:controller",									{ "building": 20 } );
addData( "req_craft", "appliedenergistics2:controller",									{ "crafting": 40, "smithing": 20 } );
addData( "xp_value_craft", "appliedenergistics2:controller",							{ "crafting": 120, "smithing": 30 } );
addData( "req_place", "appliedenergistics2:drive",										{ "building": 25 } );
addData( "req_craft", "appliedenergistics2:drive",										{ "crafting": 50, "smithing": 25 } );
addData( "req_use", "appliedenergistics2:drive",										{ "crafting": 50, "smithing": 25 } );
addData( "xp_value_craft", "appliedenergistics2:drive",									{ "crafting": 90, "smithing": 35 } );
addData( "req_place", "appliedenergistics2:io_port",									{ "building": 35 } );
addData( "req_craft", "appliedenergistics2:io_port",									{ "crafting": 60, "smithing": 35 } );
addData( "req_use", "appliedenergistics2:io_port",										{ "crafting": 60, "smithing": 35 } );
addData( "xp_value_craft", "appliedenergistics2:io_port",								{ "crafting": 60, "smithing": 20 } );
addData( "req_place", "appliedenergistics2:terminal",									{ "building": 25 } );
addData( "req_craft", "appliedenergistics2:terminal",									{ "crafting": 35 } );
addData( "req_use", "appliedenergistics2:terminal",										{ "crafting": 35, "smithing": 25 } );
addData( "xp_value_craft", "appliedenergistics2:terminal",								{ "crafting": 35, "smithing": 15 } );
addData( "req_place", "appliedenergistics2:pattern_terminal",							{ "building": 30 } );
addData( "req_craft", "appliedenergistics2:pattern_terminal",							{ "crafting": 30 } );
addData( "req_use", "appliedenergistics2:pattern_terminal",								{ "crafting": 30, "smithing": 35 } );
addData( "xp_value_craft", "appliedenergistics2:pattern_terminal",						{ "crafting": 45, "smithing": 15 } );
addData( "req_place", "appliedenergistics2:crafting_terminal",							{ "building": 35 } );
addData( "req_craft", "appliedenergistics2:crafting_terminal",							{ "crafting": 35 } );
addData( "req_use", "appliedenergistics2:crafting_terminal",							{ "crafting": 35, "smithing": 30 } );
addData( "xp_value_craft", "appliedenergistics2:crafting_terminal",						{ "crafting": 45, "smithing": 15 } );
addData( "req_place", "appliedenergistics2:interface_terminal",							{ "building": 40 } );
addData( "req_craft", "appliedenergistics2:interface_terminal",							{ "crafting": 50, "smithing": 40 } );
addData( "req_use", "appliedenergistics2:interface_terminal",							{ "crafting": 40, "smithing": 40 } );
addData( "xp_value_craft", "appliedenergistics2:interface_terminal",					{ "crafting": 45, "smithing": 15 } );
addData( "req_place", "appliedenergistics2:fluid_terminal",								{ "building": 30 } );
addData( "req_craft", "appliedenergistics2:fluid_terminal",								{ "crafting": 40, "smithing": 30 } );
addData( "req_use", "appliedenergistics2:fluid_terminal",								{ "crafting": 40, "smithing": 30 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_terminal",						{ "crafting": 45, "smithing": 15 } );
addData( "req_place", "appliedenergistics2:annihilation_plane",							{ "building": 42 } );
addData( "req_craft", "appliedenergistics2:annihilation_plane",							{ "crafting": 50, "smithing": 42 } );
addData( "xp_value_craft", "appliedenergistics2:annihilation_plane",					{ "crafting": 50, "smithing": 42 } );
addData( "req_place", "appliedenergistics2:formation_plane",							{ "building": 40 } );
addData( "req_craft", "appliedenergistics2:formation_plane",							{ "crafting": 45, "smithing": 40 } );
addData( "xp_value_craft", "appliedenergistics2:formation_plane",						{ "crafting": 45, "smithing": 40 } );
addData( "req_place", "appliedenergistics2:fluid_annihilation_plane",					{ "building": 35 } );
addData( "req_craft", "appliedenergistics2:fluid_annihilation_plane",					{ "crafting": 40, "smithing": 35 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_annihilation_plane",				{ "crafting": 40, "smithing": 35 } );
addData( "req_place", "appliedenergistics2:fluid_formation_plane",						{ "building": 32 } );
addData( "req_craft", "appliedenergistics2:fluid_formation_plane",						{ "crafting": 40, "smithing": 32 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_formation_plane",					{ "crafting": 40, "smithing": 32 } );
addData( "req_place", "appliedenergistics2:interface",									{ "building": 40 } );
addData( "req_craft", "appliedenergistics2:interface",									{ "crafting": 50, "smithing": 40 } );
addData( "xp_value_craft", "appliedenergistics2:interface",								{ "crafting": 50, "smithing": 40 } );
addData( "req_place", "appliedenergistics2:fluid_interface",							{ "building": 30 } );
addData( "req_craft", "appliedenergistics2:fluid_interface",							{ "crafting": 40, "smithing": 30 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_interface",						{ "crafting": 40, "smithing": 30 } );
addData( "req_place", "appliedenergistics2:quartz_growth_accelerator",					{ "building": 30 } );
addData( "req_craft", "appliedenergistics2:quartz_growth_accelerator",					{ "crafting": 50, "smithing": 30 } );
addData( "req_use", "appliedenergistics2:quartz_growth_accelerator",					{ "crafting": 50, "smithing": 30 } );
addData( "xp_value_craft", "appliedenergistics2:quartz_growth_accelerator",				{ "crafting": 50, "smithing": 30 } );
addData( "req_place", "appliedenergistics2:crafting_accelerator",						{ "building": 30 } );
addData( "req_place", "appliedenergistics2:1k_crafting_storage",						{ "building": 20 } );
addData( "req_place", "appliedenergistics2:4k_crafting_storage",						{ "building": 30 } );
addData( "req_place", "appliedenergistics2:16k_crafting_storage",						{ "building": 40 } );
addData( "req_place", "appliedenergistics2:64k_crafting_storage",						{ "building": 50 } );
addData( "req_place", "appliedenergistics2:vibration_chamber",							{ "building": 10 } );
addData( "req_place", "appliedenergistics2:molecular_assembler",						{ "building": 40 } );
addData( "req_craft", "appliedenergistics2:4k_crafting_storage",						{ "crafting": 30, "smithing": 15 } );
addData( "req_craft", "appliedenergistics2:16k_crafting_storage",						{ "crafting": 40, "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:64k_crafting_storage",						{ "crafting": 50, "smithing": 35 } );
addData( "req_craft", "appliedenergistics2:vibration_chamber",							{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "appliedenergistics2:molecular_assembler",						{ "crafting": 40, "smithing": 30 } );
addData( "xp_value_craft", "appliedenergistics2:crafting_accelerator",					{ "crafting": 30, "smithing": 25 } );
addData( "xp_value_craft", "appliedenergistics2:1k_crafting_storage",					{ "crafting": 20, "smithing": 10 } );
addData( "xp_value_craft", "appliedenergistics2:4k_crafting_storage",					{ "crafting": 30, "smithing": 15 } );
addData( "xp_value_craft", "appliedenergistics2:16k_crafting_storage",					{ "crafting": 40, "smithing": 20 } );
addData( "xp_value_craft", "appliedenergistics2:64k_crafting_storage",					{ "crafting": 50, "smithing": 25 } );
addData( "xp_value_craft", "appliedenergistics2:vibration_chamber",						{ "crafting": 10, "smithing": 10 } );
addData( "xp_value_craft", "appliedenergistics2:molecular_assembler",					{ "crafting": 40, "smithing": 15 } );
addData( "req_craft", "appliedenergistics2:1k_cell_component",							{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "appliedenergistics2:4k_cell_component",							{ "crafting": 30, "smithing": 15 } );
addData( "req_craft", "appliedenergistics2:16k_cell_component",							{ "crafting": 40, "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:64k_cell_component",							{ "crafting": 50, "smithing": 35 } );
addData( "xp_value_craft", "appliedenergistics2:1k_cell_component",						{ "crafting": 20, "smithing": 10 } );
addData( "xp_value_craft", "appliedenergistics2:4k_cell_component",						{ "crafting": 30, "smithing": 15 } );
addData( "xp_value_craft", "appliedenergistics2:16k_cell_component",					{ "crafting": 40, "smithing": 25 } );
addData( "xp_value_craft", "appliedenergistics2:64k_cell_component",					{ "crafting": 50, "smithing": 35 } );
addData( "req_craft", "appliedenergistics2:1k_fluid_cell_component",					{ "crafting": 15, "smithing": 5 } );
addData( "req_craft", "appliedenergistics2:4k_fluid_cell_component",					{ "crafting": 25, "smithing": 10 } );
addData( "req_craft", "appliedenergistics2:16k_fluid_cell_component",					{ "crafting": 35, "smithing": 15 } );
addData( "req_craft", "appliedenergistics2:64k_fluid_cell_component",					{ "crafting": 45, "smithing": 25 } );
addData( "xp_value_craft", "appliedenergistics2:1k_fluid_cell_component",				{ "crafting": 15, "smithing": 5 } );
addData( "xp_value_craft", "appliedenergistics2:4k_fluid_cell_component",				{ "crafting": 25, "smithing": 10 } );
addData( "xp_value_craft", "appliedenergistics2:16k_fluid_cell_component",				{ "crafting": 35, "smithing": 15 } );
addData( "xp_value_craft", "appliedenergistics2:64k_fluid_cell_component",				{ "crafting": 45, "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:wireless_terminal",							{ "crafting": 80, "smithing": 50 } );
addData( "req_use", "appliedenergistics2:wireless_terminal",							{ "crafting": 70, "smithing": 50 } );
addData( "xp_value_craft", "appliedenergistics2:wireless_terminal",						{ "crafting": 250, "smithing": 80 } );
addData( "req_craft", "appliedenergistics2:wireless_booster",							{ "crafting": 35, "smithing": 30 } );
addData( "xp_value_craft", "appliedenergistics2:wireless_booster",						{ "crafting": 35, "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:wireless_access_point",						{ "crafting": 50, "smithing": 25 } );
addData( "req_place", "appliedenergistics2:wireless_access_point",						{ "building": 25 } );
addData( "xp_value_craft", "appliedenergistics2:wireless_access_point",					{ "crafting": 25 } );
addData( "req_craft", "appliedenergistics2:wireless_receiver",							{ "crafting": 50, "smithing": 25 } );
addData( "req_place", "appliedenergistics2:wireless_receiver",							{ "building": 25 } );
addData( "xp_value_craft", "appliedenergistics2:wireless_receiver",						{ "crafting": 25 } );
addData( "xp_value_craft", "appliedenergistics2:basic_card",							{ "crafting": 30 } );
addData( "xp_value_craft", "appliedenergistics2:advanced_card",							{ "crafting": 45 } );
addData( "xp_value_break", "appliedenergistics2:quartz_ore",							{ "mining": 8 } );
addData( "xp_value_break", "appliedenergistics2:charged_quartz_ore",					{ "mining": 20 } );
addData( "req_craft", "appliedenergistics2:inscriber",									{ "crafting": 45 } );
addData( "req_use", "appliedenergistics2:inscriber",									{ "crafting": 45, "smithing": 35 } );
addData( "xp_value_craft", "appliedenergistics2:inscriber",								{ "crafting": 140, "smithing": 50 } );
addData( "req_craft", "appliedenergistics2:charger",									{ "crafting": 50 } );
addData( "req_use", "appliedenergistics2:charger",										{ "crafting": 50, "smithing": 40 } );
addData( "xp_value_craft", "appliedenergistics2:charger",								{ "crafting": 60, "smithing": 25 } );
addData( "req_use", "appliedenergistics2:security_station",								{ "crafting": 35, "smithing": 15 } );
addData( "req_place", "appliedenergistics2:security_station",							{ "building": 15 } );
addData( "xp_value_craft", "appliedenergistics2:security_station",						{ "crafting": 250, "smithing": 40 } );
addData( "xp_value_craft", "appliedenergistics2:chest",									{ "crafting": 60, "smithing": 20 } );
addData( "req_craft", "appliedenergistics2:condenser",									{ "crafting": 55 } );
addData( "req_use", "appliedenergistics2:condenser",									{ "crafting": 55 } );
addData( "req_place", "appliedenergistics2:condenser",									{ "building": 35 } );
addData( "xp_value_craft", "appliedenergistics2:condenser",								{ "crafting": 25 } );
addData( "xp_value_smelt", "appliedenergistics2:gold_dust",								{ "smithing": 16 } );
addData( "info_smelt", "appliedenergistics2:gold_dust",									{ "extraChance": 0.5 } );
addData( "xp_value_smelt", "appliedenergistics2:iron_dust",								{ "smithing": 24 } );
addData( "info_smelt", "appliedenergistics2:iron_dust",									{ "extraChance": 1 } );
addData( "xp_value_smelt", "appliedenergistics2:nether_quartz_dust",					{ "smithing": 12 } );
addData( "info_smelt", "appliedenergistics2:nether_quartz_dust",						{ "extraChance": 1 } );
addData( "xp_value_smelt", "appliedenergistics2:certus_quartz_dust",					{ "smithing": 16 } );
addData( "info_smelt", "appliedenergistics2:certus_quartz_dust",						{ "extraChance": 1.2 } );
addData( "req_use", "appliedenergistics2:biometric_card",								{ "smithing": 30 } );
addData( "req_use", "appliedenergistics2:memory_card",									{ "smithing": 40 } );
addData( "req_use", "appliedenergistics2:network_tool",									{ "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:1k_storage_cell",							{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "appliedenergistics2:4k_storage_cell",							{ "crafting": 30, "smithing": 15 } );
addData( "req_craft", "appliedenergistics2:16k_storage_cell",							{ "crafting": 40, "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:64k_storage_cell",							{ "crafting": 50, "smithing": 35 } );
addData( "req_craft", "appliedenergistics2:1k_fluid_storage_cell",						{ "crafting": 15, "smithing": 5 } );
addData( "req_craft", "appliedenergistics2:4k_fluid_storage_cell",						{ "crafting": 25, "smithing": 10 } );
addData( "req_craft", "appliedenergistics2:16k_fluid_storage_cell",						{ "crafting": 35, "smithing": 15 } );
addData( "req_craft", "appliedenergistics2:64k_fluid_storage_cell",						{ "crafting": 45, "smithing": 25 } );
addData( "req_craft", "appliedenergistics2:spatial_pylon",								{ "crafting": 60, "smithing": 30 } );
addData( "req_place", "appliedenergistics2:spatial_pylon",								{ "building": 50 } );
addData( "req_use", "appliedenergistics2:spatial_io_port",								{ "crafting": 40, "smithing": 30 } );
addData( "req_craft", "appliedenergistics2:spatial_io_port",							{ "crafting": 40, "smithing": 30 } );
addData( "req_place", "appliedenergistics2:spatial_io_port",							{ "building": 30 } );
addData( "req_craft", "appliedenergistics2:2_cubed_spatial_storage_cell",				{ "crafting": 60 } );
addData( "req_craft", "appliedenergistics2:2_cubed_spatial_cell_component",				{ "crafting": 60 } );
addData( "req_craft", "appliedenergistics2:16_cubed_spatial_storage_cell",				{ "crafting": 65 } );
addData( "req_craft", "appliedenergistics2:16_cubed_spatial_cell_component",			{ "crafting": 65 } );
addData( "req_craft", "appliedenergistics2:128_cubed_spatial_storage_cell",				{ "crafting": 70 } );
addData( "req_craft", "appliedenergistics2:128_cubed_spatial_cell_component",			{ "crafting": 70 } );
addData( "req_place", "appliedenergistics2:storage_bus",								{ "building": 25 } );
addData( "req_place", "appliedenergistics2:fluid_storage_bus",							{ "building": 20 } );
addData( "req_place", "appliedenergistics2:import_bus",									{ "building": 35 } );
addData( "req_place", "appliedenergistics2:fluid_import_bus",							{ "building": 30 } );
addData( "req_place", "appliedenergistics2:export_bus",									{ "building": 35 } );
addData( "req_place", "appliedenergistics2:fluid_export_bus",							{ "building": 30 } );
addData( "xp_value_craft", "appliedenergistics2:storage_bus",							{ "crafting": 25 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_storage_bus",						{ "crafting": 20 } );
addData( "xp_value_craft", "appliedenergistics2:import_bus",							{ "crafting": 35 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_import_bus",						{ "crafting": 30 } );
addData( "xp_value_craft", "appliedenergistics2:export_bus",							{ "crafting": 35 } );
addData( "xp_value_craft", "appliedenergistics2:fluid_export_bus",						{ "crafting": 30 } );
addData( "req_weapon", "appliedenergistics2:certus_quartz_sword",						{ "combat": 30 } );
addData( "req_weapon", "appliedenergistics2:certus_quartz_axe",							{ "combat": 35 } );
addData( "req_weapon", "appliedenergistics2:certus_quartz_shovel",						{ "combat": 30 } );
addData( "req_weapon", "appliedenergistics2:certus_quartz_pickaxe",						{ "combat": 30 } );
addData( "req_tool", "appliedenergistics2:certus_quartz_axe",							{ "woodcutting": 30 } );
addData( "req_tool", "appliedenergistics2:certus_quartz_shovel",						{ "excavation": 30 } );
addData( "req_tool", "appliedenergistics2:certus_quartz_hoe",							{ "farming": 30 } );
addData( "req_tool", "appliedenergistics2:certus_quartz_pickaxe",						{ "mining": 30 } );
addData( "req_weapon", "appliedenergistics2:nether_quartz_sword",						{ "combat": 17 } );
addData( "req_weapon", "appliedenergistics2:nether_quartz_axe",							{ "combat": 23 } );
addData( "req_weapon", "appliedenergistics2:nether_quartz_shovel",						{ "combat": 17 } );
addData( "req_weapon", "appliedenergistics2:nether_quartz_pickaxe",						{ "combat": 17 } );
addData( "req_tool", "appliedenergistics2:nether_quartz_axe",							{ "woodcutting": 17 } );
addData( "req_tool", "appliedenergistics2:nether_quartz_shovel",						{ "excavation": 17 } );
addData( "req_tool", "appliedenergistics2:nether_quartz_hoe",							{ "farming": 17 } );
addData( "req_tool", "appliedenergistics2:nether_quartz_pickaxe",						{ "mining": 17 } );
addData( "xp_value_craft", "appliedenergistics2:certus_quartz_sword",					{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "appliedenergistics2:certus_quartz_axe",						{ "crafting": 90, "smithing": 18 } );
addData( "xp_value_craft", "appliedenergistics2:certus_quartz_shovel",					{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "appliedenergistics2:certus_quartz_hoe",						{ "crafting": 60, "smithing": 12 } );
addData( "xp_value_craft", "appliedenergistics2:certus_quartz_pickaxe",					{ "crafting": 90, "smithing": 18 } );
addData( "xp_value_craft", "appliedenergistics2:nether_quartz_sword",					{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "appliedenergistics2:nether_quartz_axe",						{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "appliedenergistics2:nether_quartz_shovel",					{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "appliedenergistics2:nether_quartz_hoe",						{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "appliedenergistics2:nether_quartz_pickaxe",					{ "crafting": 30, "smithing": 6 } );
}
{
addData( "req_use", "ironchest:iron_to_gold_chest_upgrade",								{ "building": 30 } );
addData( "req_craft", "ironchest:iron_to_gold_chest_upgrade",							{ "smithing": 30 } );
addData( "xp_value_craft", "ironchest:iron_to_gold_chest_upgrade",						{ "smithing": 30 } );
addData( "req_use", "ironchest:gold_to_diamond_chest_upgrade",							{ "building": 40 } );
addData( "req_craft", "ironchest:gold_to_diamond_chest_upgrade",						{ "smithing": 40 } );
addData( "xp_value_craft", "ironchest:gold_to_diamond_chest_upgrade",					{ "smithing": 40 } );
addData( "req_use", "ironchest:copper_to_silver_chest_upgrade",							{ "building": 20 } );
addData( "req_craft", "ironchest:copper_to_silver_chest_upgrade",						{ "smithing": 20 } );
addData( "xp_value_craft", "ironchest:copper_to_silver_chest_upgrade",					{ "smithing": 20 } );
addData( "req_use", "ironchest:silver_to_gold_chest_upgrade",							{ "building": 30 } );
addData( "req_craft", "ironchest:silver_to_gold_chest_upgrade",							{ "smithing": 30 } );
addData( "xp_value_craft", "ironchest:silver_to_gold_chest_upgrade",					{ "smithing": 30 } );
addData( "req_use", "ironchest:copper_to_iron_chest_upgrade",							{ "building": 20 } );
addData( "req_craft", "ironchest:copper_to_iron_chest_upgrade",							{ "smithing": 20 } );
addData( "xp_value_craft", "ironchest:copper_to_iron_chest_upgrade",					{ "smithing": 20 } );
addData( "req_use", "ironchest:diamond_to_crystal_chest_upgrade",						{ "building": 50 } );
addData( "req_craft", "ironchest:diamond_to_crystal_chest_upgrade",						{ "smithing": 50 } );
addData( "xp_value_craft", "ironchest:diamond_to_crystal_chest_upgrade",				{ "smithing": 50 } );
addData( "req_use", "ironchest:wood_to_iron_chest_upgrade",								{ "building": 20 } );
addData( "req_craft", "ironchest:wood_to_iron_chest_upgrade",							{ "smithing": 20 } );
addData( "xp_value_craft", "ironchest:wood_to_iron_chest_upgrade",						{ "smithing": 20 } );
addData( "req_use", "ironchest:wood_to_copper_chest_upgrade",							{ "building": 10 } );
addData( "req_craft", "ironchest:wood_to_copper_chest_upgrade",							{ "smithing": 10 } );
addData( "xp_value_craft", "ironchest:wood_to_copper_chest_upgrade",					{ "smithing": 10 } );
addData( "req_use", "ironchest:diamond_to_obsidian_chest_upgrade",						{ "building": 50 } );
addData( "req_craft", "ironchest:diamond_to_obsidian_chest_upgrade",					{ "smithing": 50 } );
addData( "xp_value_craft", "ironchest:diamond_to_obsidian_chest_upgrade",				{ "smithing": 50 } );
addData( "req_place", "ironchest:iron_chest",											{ "building": 20 } );
addData( "req_craft", "ironchest:iron_chest",											{ "smithing": 20 } );
addData( "req_use", "ironchest:iron_chest",												{ "building": 20 } );
addData( "xp_value_craft", "ironchest:iron_chest",										{ "smithing": 20 } );
addData( "req_place", "ironchest:gold_chest",											{ "building": 30 } );
addData( "req_craft", "ironchest:gold_chest",											{ "smithing": 30 } );
addData( "req_use", "ironchest:gold_chest",												{ "building": 30 } );
addData( "xp_value_craft", "ironchest:gold_chest",										{ "smithing": 30 } );
addData( "req_place", "ironchest:diamond_chest",										{ "building": 40 } );
addData( "req_craft", "ironchest:diamond_chest",										{ "smithing": 40 } );
addData( "req_use", "ironchest:diamond_chest",											{ "building": 40 } );
addData( "xp_value_craft", "ironchest:diamond_chest",									{ "smithing": 40 } );
addData( "req_place", "ironchest:copper_chest",											{ "building": 10 } );
addData( "req_craft", "ironchest:copper_chest",											{ "smithing": 10 } );
addData( "req_use", "ironchest:copper_chest",											{ "building": 10 } );
addData( "xp_value_craft", "ironchest:copper_chest",									{ "smithing": 10 } );
addData( "req_place", "ironchest:silver_chest",											{ "building": 20 } );
addData( "req_craft", "ironchest:silver_chest",											{ "smithing": 20 } );
addData( "req_use", "ironchest:silver_chest",											{ "building": 20 } );
addData( "xp_value_craft", "ironchest:silver_chest",									{ "smithing": 20 } );
addData( "req_place", "ironchest:crystal_chest",										{ "building": 50 } );
addData( "req_craft", "ironchest:crystal_chest",										{ "smithing": 50 } );
addData( "req_use", "ironchest:crystal_chest",											{ "building": 50 } );
addData( "xp_value_craft", "ironchest:crystal_chest",									{ "smithing": 50 } );
addData( "req_place", "ironchest:obsidian_chest",										{ "building": 50 } );
addData( "req_craft", "ironchest:obsidian_chest",										{ "smithing": 50 } );
addData( "req_use", "ironchest:obsidian_chest",											{ "building": 50 } );
addData( "xp_value_craft", "ironchest:obsidian_chest",									{ "smithing": 50 } );
}
{
addData( "req_craft", "enderstorage:ender_chest",										{ "smithing": 40 } );
addData( "req_place", "enderstorage:ender_chest",										{ "building": 30 } );
addData( "req_use", "enderstorage:ender_chest",											{ "building": 30 } );
addData( "xp_value_craft", "enderstorage:ender_chest",									{ "smithing": 80, "magic": 10 } );
addData( "req_craft", "enderstorage:ender_tank",										{ "smithing": 50 } );
addData( "req_place", "enderstorage:ender_tank",										{ "building": 40 } );
addData( "req_use", "enderstorage:ender_tank",											{ "building": 40 } );
addData( "xp_value_craft", "enderstorage:ender_tank",									{ "smithing": 40, "magic": 5 } );
addData( "req_craft", "enderstorage:ender_pouch",										{ "crafting": 50 } );
addData( "req_use", "enderstorage:ender_pouch",											{ "magic": 5 } );
addData( "xp_value_craft", "enderstorage:ender_pouch",									{ "crafting": 90, "magic": 15 } );
}
{
addData( "req_weapon", "minecolonies:chiefsword",										{ "combat": 35 } );
addData( "req_weapon", "minecolonies:iron_scimitar",									{ "combat": 15 } );
addData( "req_weapon", "minecolonies:pharaoscepter",									{ "archery": 75 } );
addData( "req_wear", "minecolonies:pirate_hat",											{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_top",											{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_leggins",										{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_boots",										{ "endurance": 30 } );
addData( "req_wear", "minecolonies:pirate_cap",											{ "endurance": 45 } );
addData( "req_wear", "minecolonies:pirate_chest",										{ "endurance": 45 } );
addData( "req_wear", "minecolonies:pirate_legs",										{ "endurance": 45 } );
addData( "req_wear", "minecolonies:pirate_shoes",										{ "endurance": 45 } );
addData( "req_use", "minecolonies:blockhuttownhall",									{ "mining": 15, "woodcutting": 15, "excavation": 15, "building": 15, "farming": 15, "fishing": 15, "combat": 15, "smithing": 15, "crafting": 15, "cooking": 15 } );
}
{
addData( "xp_value_craft", "create:zinc_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:zinc_ingot",											{ "crafting": 0 } );
addData( "xp_value_craft", "create:zinc_block",											{ "crafting": 0 } );
addData( "xp_value_craft", "create:brass_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:brass_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:brass_block",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:copper_nugget",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:copper_ingot",										{ "crafting": 0 } );
addData( "xp_value_craft", "create:copper_block",										{ "crafting": 0 } );
addData( "req_wear", "create:goggles",													{ "crafting": 25 } );
addData( "req_use", "create:wrench",													{ "crafting": 15 } );
addData( "req_tool", "create:deforester",												{ "woodcutting": 92 } );
addData( "req_weapon", "create:deforester",												{ "combat": 75 } );
addData( "req_craft", "create:redstone_link",											{ "crafting": 30, "building": 20 } );
addData( "req_place", "create:redstone_link",											{ "building": 20 } );
addData( "req_use", "create:redstone_link",												{ "crafting": 30 } );
addData( "xp_value_smelt", "create:copper_ore",											{ "smithing": 7 } );
addData( "info_smelt", "create:copper_ore",												{ "extraChance": 0.85 } );
addData( "xp_value_break", "create:copper_ore",											{ "mining": 7 } );
addData( "info_ore", "create:copper_ore",												{ "extraChance": 0.8 } );
addData( "xp_value_smelt", "create:zinc_ore",											{ "smithing": 16 } );
addData( "info_smelt", "create:zinc_ore",												{ "extraChance": 0.7 } );
addData( "xp_value_smelt", "create:crushed_iron_ore",									{ "smithing": 11 } );
addData( "info_smelt", "create:crushed_iron_ore",										{ "extraChance": 1.1 } );
addData( "xp_value_smelt", "create:crushed_gold_ore",									{ "smithing": 17 } );
addData( "info_smelt", "create:crushed_gold_ore",										{ "extraChance": 0.6 } );
addData( "xp_value_smelt", "create:crushed_copper_ore",									{ "smithing": 6.5 } );
addData( "info_smelt", "create:crushed_copper_ore",										{ "extraChance": 0.95 } );
addData( "xp_value_smelt", "create:crushed_zinc_ore",									{ "smithing": 15 } );
addData( "info_smelt", "create:crushed_zinc_ore",										{ "extraChance": 0.8 } );
addData( "xp_value_smelt", "create:crushed_brass_ore",									{ "smithing": 23.5 } );
addData( "info_smelt", "create:crushed_brass_ore",										{ "extraChance": 0.4 } );
addData( "xp_value_break", "create:zinc_ore",											{ "mining": 22 } );
addData( "info_ore", "create:zinc_ore",													{ "extraChance": 0.75 } );
addData( "xp_value_break", "create:dolomite",											{ "mining": 0.25 } );
addData( "xp_value_break", "create:polished_dolomite",									{ "mining": 0.25 } );
addData2( "salvage", "create:dolomite", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 55,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:gabbro",												{ "mining": 0.35 } );
addData( "xp_value_break", "create:polished_gabbro",									{ "mining": 0.35 } );
addData2( "salvage", "create:gabbro", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 40,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:limestone",											{ "mining": 0.3 } );
addData( "xp_value_break", "create:polished_limestone",									{ "mining": 0.3 } );
addData2( "salvage", "create:limestone", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 50,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:weathered_limestone",								{ "mining": 0.3 } );
addData( "xp_value_break", "create:polished_weathered_limestone",						{ "mining": 0.3 } );
addData2( "salvage", "create:weathered_limestone", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 40,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:scoria",												{ "mining": 0.35 } );
addData( "xp_value_break", "create:polished_scoria",									{ "mining": 0.35 } );
addData2( "salvage", "minecraft:scoria", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 55,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:dark_scoria",										{ "mining": 0.4 } );
addData( "xp_value_break", "create:polished_dark_scoria",								{ "mining": 0.4 } );
addData2( "salvage", "minecraft:dark_scoria", "minecraft:cobblestone",
{
	"salvageMax": 1,
	"baseChance": 55,
	"chancePerLevel": 1,
	"maxChance": 90,
	"xpPerItem": 0.1,
	"levelReq": 1
} );
addData( "xp_value_break", "create:natural_scoria",										{ "mining": 0.65 } );
{
addData2( "treasure", "create:dolomite", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "create:gabbro", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "create:limestone", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 2
} );
addData2( "treasure", "create:weathered_limestone", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 1
} );
addData2( "treasure", "create:scoria", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 1,
	"maxCount": 3
} );
addData2( "treasure", "create:dark_scoria", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 1,
	"endChance": 2,
	"endLevel": 150,
	"xpPerItem": 5,
	"minCount": 2,
	"maxCount": 2
} );
addData2( "treasure", "create:natural_scoria", "minecraft:iron_nugget",
{
	"startChance": 0.1,
	"startLevel": 25,
	"endChance": 2,
	"endLevel": 200,
	"xpPerItem": 5,
	"minCount": 2,
	"maxCount": 4
} );
}
addData( "req_craft", "create:schematicannon",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:schematic_table",											{ "crafting": 20 } );
addData( "req_craft", "create:shaft",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:cogwheel",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:large_cogwheel",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:encased_shaft",											{ "crafting": 20 } );
addData( "req_craft", "create:gearbox",													{ "crafting": 20 } );
addData( "req_craft", "create:vertical_gearbox",										{ "crafting": 20 } );
addData( "req_craft", "create:clutch",													{ "crafting": 20 } );
addData( "req_craft", "create:gearshift",												{ "crafting": 20 } );
addData( "req_craft", "create:encased_belt",											{ "crafting": 20 } );
addData( "req_craft", "create:adjustable_pulley",										{ "crafting": 25 } );
addData( "req_craft", "create:water_wheel",												{ "crafting": 20 } );
addData( "req_craft", "create:encased_fan",												{ "crafting": 20 } );
addData( "req_craft", "create:nozzle",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:turntable",												{ "crafting": 20 } );
addData( "req_craft", "create:hand_crank",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:cuckoo_clock",											{ "crafting": 20 } );
addData( "req_craft", "create:millstone",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_press",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_mixer",										{ "crafting": 20 } );
addData( "req_craft", "create:speedometer",												{ "crafting": 20 } );
addData( "req_craft", "create:basin",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:stressometer",											{ "crafting": 20 } );
addData( "req_craft", "create:mechanical_piston",										{ "crafting": 20 } );
addData( "req_craft", "create:sticky_mechanical_piston",								{ "crafting": 20 } );
addData( "req_craft", "create:piston_extension_pole",									{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_bearing",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:clockwork_bearing",										{ "crafting": 20 } );
addData( "req_craft", "create:rope_pulley",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:cart_assembler",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:linear_chassis",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:secondary_linear_chassis",								{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:radial_chassis",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_drill",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_saw",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:deployer",												{ "crafting": 20 } );
addData( "req_craft", "create:portable_storage_interface",								{ "crafting": 20 } );
addData( "req_craft", "create:mechanical_harvester",									{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_plough",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:andesite_casing",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:brass_casing",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:copper_casing",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:mechanical_crafter",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:sequenced_gearshift",										{ "crafting": 20 } );
addData( "req_craft", "create:rotation_speed_controller",								{ "crafting": 25 } );
addData( "req_craft", "create:redstone_contact",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:stockpile_switch",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:adjustable_crate",										{ "crafting": 20 } );
addData( "req_craft", "create:belt_observer",											{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:belt_tunnel",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:extractor",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:linked_extractor",										{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:funnel",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:transposer",												{ "crafting": 20 } );
addData( "req_craft", "create:linked_transposer",										{ "crafting": 20 } );
addData( "req_craft", "create:analog_lever",											{ "crafting": 20 } );
addData( "req_craft", "create:pulse_repeater",											{ "crafting": 20 } );
addData( "req_craft", "create:adjustable_repeater",										{ "crafting": 20 } );
addData( "req_craft", "create:adjustable_pulse_repeater",								{ "crafting": 25 } );
addData( "req_craft", "create:powered_latch",											{ "crafting": 20 } );
addData( "req_craft", "create:powered_toggle_latch",									{ "crafting": 20 } );
addData( "req_craft", "create:andesite_alloy",											{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:propeller",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:whisk",													{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:brass_hand",												{ "crafting": 20, "smithing": 10 } );
addData( "req_craft", "create:crafter_slot_cover",										{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:electron_tube",											{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:belt_connector",											{ "crafting": 10 } );
addData( "req_craft", "create:super_glue",												{ "crafting": 10 } );
addData( "req_craft", "create:sand_paper",												{ "crafting": 5 } );
addData( "req_craft", "create:red_sand_paper",											{ "crafting": 5 } );
addData( "req_craft", "create:wrench",													{ "crafting": 10, "smithing": 10 } );
addData( "req_craft", "create:goggles",													{ "crafting": 25, "smithing": 10 } );
addData( "req_craft", "create:filter",													{ "crafting": 10, "smithing": 5 } );
addData( "req_craft", "create:attribute_filter",										{ "crafting": 15, "smithing": 5 } );
addData( "req_craft", "create:tree_fertilizer",											{ "crafting": 10, "farming": 10 } );
addData( "req_craft", "create:deforester",												{ "crafting": 30, "smithing": 30 } );
addData( "req_craft", "create:wand_of_symmetry",										{ "crafting": 30, "smithing": 30 } );
addData( "req_craft", "create:empty_schematic",											{ "crafting": 5 } );
addData( "req_craft", "create:schematic_and_quill",										{ "crafting": 5 } );
addData( "req_craft", "create:handheld_blockzapper",									{ "crafting": 30, "smithing": 30 } );
addData( "xp_value_craft", "create:schematicannon",										{ "crafting": 50 } );
addData( "xp_value_craft", "create:schematic_table",									{ "crafting": 10.4 } );
addData( "xp_value_craft", "create:shaft",												{ "crafting": 3.25 } );
addData( "xp_value_craft", "create:cogwheel",											{ "crafting": 4.1 } );
addData( "xp_value_craft", "create:large_cogwheel",										{ "crafting": 6.2 } );
addData( "xp_value_craft", "create:encased_shaft",										{ "crafting": 5 } );
addData( "xp_value_craft", "create:gearbox",											{ "crafting": 5 } );
addData( "xp_value_craft", "create:clutch",												{ "crafting": 4 } );
addData( "xp_value_craft", "create:gearshift",											{ "crafting": 4 } );
addData( "xp_value_craft", "create:adjustable_pulley",									{ "crafting": 10.8 } );
addData( "xp_value_craft", "create:water_wheel",										{ "crafting": 14.5 } );
addData( "xp_value_craft", "create:encased_fan",										{ "crafting": 6 } );
addData( "xp_value_craft", "create:nozzle",												{ "crafting": 4.7 } );
addData( "xp_value_craft", "create:turntable",											{ "crafting": 5.3 } );
addData( "xp_value_craft", "create:hand_crank",											{ "crafting": 2 } );
addData( "xp_value_craft", "create:cuckoo_clock",										{ "crafting": 16.7 } );
addData( "xp_value_craft", "create:millstone",											{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:mechanical_press",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:mechanical_mixer",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:speedometer",										{ "crafting": 4 } );
addData( "xp_value_craft", "create:basin",												{ "crafting": 12 } );
addData( "xp_value_craft", "create:mechanical_piston",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:sticky_mechanical_piston",							{ "crafting": 12.3 } );
addData( "xp_value_craft", "create:piston_extension_pole",								{ "crafting": 3 } );
addData( "xp_value_craft", "create:mechanical_bearing",									{ "crafting": 6.4 } );
addData( "xp_value_craft", "create:clockwork_bearing",									{ "crafting": 6.4 } );
addData( "xp_value_craft", "create:rope_pulley",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:cart_assembler",										{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:linear_chassis",										{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:radial_chassis",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:mechanical_drill",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:mechanical_saw",										{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:deployer",											{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:portable_storage_interface",							{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:mechanical_harvester",								{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:mechanical_plough",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:andesite_casing",									{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:brass_casing",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:copper_casing",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:mechanical_crafter",									{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:sequenced_gearshift",								{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:rotation_speed_controller",							{ "crafting": 20.3 } );
addData( "xp_value_craft", "create:redstone_contact",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:redstone_link",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:stockpile_switch",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:adjustable_crate",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:belt_observer",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:belt_tunnel",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:extractor",											{ "crafting": 12.5 } );
addData( "xp_value_craft", "create:linked_extractor",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:funnel",												{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:transposer",											{ "crafting": 10 } );
addData( "xp_value_craft", "create:linked_transposer",									{ "crafting": 10 } );
addData( "xp_value_craft", "create:analog_lever",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:pulse_repeater",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:adjustable_repeater",								{ "crafting": 10 } );
addData( "xp_value_craft", "create:adjustable_pulse_repeater",							{ "crafting": 18 } );
addData( "xp_value_craft", "create:powered_latch",										{ "crafting": 8.8 } );
addData( "xp_value_craft", "create:powered_toggle_latch",								{ "crafting": 10.6 } );
addData( "xp_value_craft", "create:andesite_alloy",										{ "crafting": 3 } );
addData( "xp_value_craft", "create:propeller",											{ "crafting": 7 } );
addData( "xp_value_craft", "create:whisk",												{ "crafting": 7 } );
addData( "xp_value_craft", "create:brass_hand",											{ "crafting": 7 } );
addData( "xp_value_craft", "create:crafter_slot_cover",									{ "crafting": 3 } );
addData( "xp_value_craft", "create:electron_tube",										{ "crafting": 6 } );
addData( "xp_value_craft", "create:belt_connector",										{ "crafting": 10 } );
addData( "xp_value_craft", "create:super_glue",											{ "crafting": 5 } );
addData( "xp_value_craft", "create:sand_paper",											{ "crafting": 5 } );
addData( "xp_value_craft", "create:red_sand_paper",										{ "crafting": 5 } );
addData( "xp_value_craft", "create:wrench",												{ "crafting": 10 } );
addData( "xp_value_craft", "create:goggles",											{ "crafting": 10 } );
addData( "xp_value_craft", "create:filter",												{ "crafting": 6.5 } );
addData( "xp_value_craft", "create:attribute_filter",									{ "crafting": 6.5 } );
addData( "xp_value_craft", "create:tree_fertilizer",									{ "crafting": 10.4 } );
addData( "xp_value_craft", "create:deforester",											{ "crafting": 120 } );
addData( "xp_value_craft", "create:wand_of_symmetry",									{ "crafting": 100 } );
addData( "xp_value_craft", "create:empty_schematic",									{ "crafting": 6.2 } );
addData( "xp_value_craft", "create:schematic_and_quill",								{ "crafting": 8.5 } );
addData( "xp_value_craft", "create:handheld_blockzapper",								{ "crafting": 120 } );
addData( "req_place", "create:schematicannon",											{ "building": 20 } );
addData( "req_place", "create:schematic_table",											{ "building": 10 } );
addData( "req_place", "create:shaft",													{ "building": 10 } );
addData( "req_place", "create:cogwheel",												{ "building": 10 } );
addData( "req_place", "create:large_cogwheel",											{ "building": 10 } );
addData( "req_place", "create:encased_shaft",											{ "building": 10 } );
addData( "req_place", "create:gearbox",													{ "building": 10 } );
addData( "req_place", "create:vertical_gearbox",										{ "building": 10 } );
addData( "req_place", "create:clutch",													{ "building": 10 } );
addData( "req_place", "create:gearshift",												{ "building": 10 } );
addData( "req_place", "create:encased_belt",											{ "building": 10 } );
addData( "req_place", "create:adjustable_pulley",										{ "building": 10 } );
addData( "req_place", "create:water_wheel",												{ "building": 10 } );
addData( "req_place", "create:encased_fan",												{ "building": 10 } );
addData( "req_place", "create:nozzle",													{ "building": 10 } );
addData( "req_place", "create:turntable",												{ "building": 10 } );
addData( "req_place", "create:hand_crank",												{ "building": 10 } );
addData( "req_place", "create:cuckoo_clock",											{ "building": 10 } );
addData( "req_place", "create:millstone",												{ "building": 10 } );
addData( "req_place", "create:mechanical_press",										{ "building": 10 } );
addData( "req_place", "create:mechanical_mixer",										{ "building": 10 } );
addData( "req_place", "create:speedometer",												{ "building": 10 } );
addData( "req_place", "create:basin",													{ "building": 10 } );
addData( "req_place", "create:stressometer",											{ "building": 10 } );
addData( "req_place", "create:mechanical_piston",										{ "building": 10 } );
addData( "req_place", "create:sticky_mechanical_piston",								{ "building": 10 } );
addData( "req_place", "create:piston_extension_pole",									{ "building": 10 } );
addData( "req_place", "create:mechanical_bearing",										{ "building": 10 } );
addData( "req_place", "create:clockwork_bearing",										{ "building": 10 } );
addData( "req_place", "create:rope_pulley",												{ "building": 10 } );
addData( "req_place", "create:cart_assembler",											{ "building": 10 } );
addData( "req_place", "create:linear_chassis",											{ "building": 10 } );
addData( "req_place", "create:secondary_linear_chassis",								{ "building": 10 } );
addData( "req_place", "create:radial_chassis",											{ "building": 10 } );
addData( "req_place", "create:mechanical_drill",										{ "building": 10 } );
addData( "req_place", "create:mechanical_saw",											{ "building": 10 } );
addData( "req_place", "create:deployer",												{ "building": 10 } );
addData( "req_place", "create:portable_storage_interface",								{ "building": 10 } );
addData( "req_place", "create:mechanical_harvester",									{ "building": 10 } );
addData( "req_place", "create:mechanical_plough",										{ "building": 10 } );
addData( "req_place", "create:andesite_casing",											{ "building": 10 } );
addData( "req_place", "create:brass_casing",											{ "building": 10 } );
addData( "req_place", "create:copper_casing",											{ "building": 10 } );
addData( "req_place", "create:mechanical_crafter",										{ "building": 10 } );
addData( "req_place", "create:sequenced_gearshift",										{ "building": 10 } );
addData( "req_place", "create:rotation_speed_controller",								{ "building": 10 } );
addData( "req_place", "create:redstone_contact",										{ "building": 10 } );
addData( "req_place", "create:stockpile_switch",										{ "building": 10 } );
addData( "req_place", "create:adjustable_crate",										{ "building": 10 } );
addData( "req_place", "create:belt_observer",											{ "building": 10 } );
addData( "req_place", "create:belt_tunnel",												{ "building": 10 } );
addData( "req_place", "create:extractor",												{ "building": 10 } );
addData( "req_place", "create:linked_extractor",										{ "building": 10 } );
addData( "req_place", "create:funnel",													{ "building": 10 } );
addData( "req_place", "create:transposer",												{ "building": 10 } );
addData( "req_place", "create:linked_transposer",										{ "building": 10 } );
addData( "req_place", "create:analog_lever",											{ "building": 10 } );
addData( "req_place", "create:pulse_repeater",											{ "building": 10 } );
addData( "req_place", "create:adjustable_repeater",										{ "building": 10 } );
addData( "req_place", "create:adjustable_pulse_repeater",								{ "building": 10 } );
addData( "req_place", "create:powered_latch",											{ "building": 10 } );
addData( "req_place", "create:powered_toggle_latch",									{ "building": 10 } );
addData( "req_place", "create:belt_connector",											{ "building": 10 } );
addData( "req_place", "create:wand_of_symmetry",										{ "building": 20 } );
addData( "req_use", "create:sand_paper",												{ "smithing": 5 } );
addData( "req_use", "create:red_sand_paper",											{ "smithing": 5 } );
addData( "req_use", "create:tree_fertilizer",											{ "farming": 10 } );
addData( "req_use", "create:super_glue",												{ "building": 5 } );
}
{
addData( "xp_value_craft", "endreborn:wolframium_nugget",								{ "crafting": 0 } );
addData( "xp_value_craft", "endreborn:wolframium_ingot",								{ "crafting": 0 } );
addData( "xp_value_craft", "endreborn:wolframium_block",								{ "crafting": 0 } );
addData( "xp_value_craft", "endreborn:endorium_nugget",									{ "crafting": 0 } );
addData( "xp_value_craft", "endreborn:endorium_ingot",									{ "crafting": 0 } );
addData( "xp_value_craft", "endreborn:endorium_block",									{ "crafting": 0 } );
addData( "req_weapon", "endreborn:wolframium_sword",									{ "combat": 35 } );
addData( "req_weapon", "endreborn:wolframium_axe",										{ "combat": 45 } );
addData( "req_weapon", "endreborn:wolframium_shovel",									{ "combat": 35 } );
addData( "req_weapon", "endreborn:wolframium_pickaxe",									{ "combat": 35 } );
addData( "req_weapon", "endreborn:endorium_sword",										{ "combat": 60 } );
addData( "req_weapon", "endreborn:endorium_axe",										{ "combat": 60 } );
addData( "req_weapon", "endreborn:endorium_shovel",										{ "combat": 60 } );
addData( "req_weapon", "endreborn:endorium_pickaxe",									{ "combat": 60 } );
addData( "req_weapon", "endreborn:end_stone_sword",										{ "combat": 20 } );
addData( "req_weapon", "endreborn:end_stone_axe",										{ "combat": 20 } );
addData( "req_weapon", "endreborn:end_stone_shovel",									{ "combat": 20 } );
addData( "req_weapon", "endreborn:end_stone_pickaxe",									{ "combat": 20 } );
addData( "req_tool", "endreborn:wolframium_axe",										{ "woodcutting": 35 } );
addData( "req_tool", "endreborn:wolframium_shovel",										{ "excavation": 35 } );
addData( "req_tool", "endreborn:wolframium_hoe",										{ "farming": 35 } );
addData( "req_tool", "endreborn:wolframium_pickaxe",									{ "mining": 35 } );
addData( "req_tool", "endreborn:endorium_axe",											{ "woodcutting": 60 } );
addData( "req_tool", "endreborn:endorium_shovel",										{ "excavation": 60 } );
addData( "req_tool", "endreborn:endorium_hoe",											{ "farming": 60 } );
addData( "req_tool", "endreborn:endorium_pickaxe",										{ "mining": 60 } );
addData( "req_tool", "endreborn:end_stone_axe",											{ "woodcutting": 20 } );
addData( "req_tool", "endreborn:end_stone_shovel",										{ "excavation": 20 } );
addData( "req_tool", "endreborn:end_stone_hoe",											{ "farming": 20 } );
addData( "req_tool", "endreborn:end_stone_pickaxe",										{ "mining": 20 } );
addData( "xp_value_craft", "endreborn:wolframium_sword",								{ "crafting": 100, "smithing": 20 } );
addData( "xp_value_craft", "endreborn:wolframium_axe",									{ "crafting": 150, "smithing": 30 } );
addData( "xp_value_craft", "endreborn:wolframium_shovel",								{ "crafting": 50, "smithing": 10 } );
addData( "xp_value_craft", "endreborn:wolframium_hoe",									{ "crafting": 100, "smithing": 20 } );
addData( "xp_value_craft", "endreborn:wolframium_pickaxe",								{ "crafting": 150, "smithing": 30 } );
addData( "xp_value_craft", "endreborn:endorium_sword",									{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "endreborn:endorium_axe",									{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "endreborn:endorium_shovel",									{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "endreborn:endorium_hoe",									{ "crafting": 20, "smithing": 4 } );
addData( "xp_value_craft", "endreborn:endorium_pickaxe",								{ "crafting": 30, "smithing": 6 } );
addData( "xp_value_craft", "endreborn:end_stone_sword",									{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "endreborn:end_stone_axe",									{ "crafting": 15, "smithing": 3 } );
addData( "xp_value_craft", "endreborn:end_stone_shovel",								{ "crafting": 5, "smithing": 1 } );
addData( "xp_value_craft", "endreborn:end_stone_hoe",									{ "crafting": 10, "smithing": 2 } );
addData( "xp_value_craft", "endreborn:end_stone_pickaxe",								{ "crafting": 15, "smithing": 3 } );
addData( "xp_bonus_held", "endreborn:wolframium_hoe",									{ "farming": 15 } );
addData( "xp_bonus_held", "endreborn:endorium_hoe",										{ "farming": 30 } );
addData( "xp_bonus_held", "endreborn:end_stone_hoe",									{ "farming": 5 } );
addData( "req_wear", "endreborn:wolframium_helmet",										{ "endurance": 32 } );
addData( "req_wear", "endreborn:wolframium_chestplate",									{ "endurance": 32 } );
addData( "req_wear", "endreborn:wolframium_leggings",									{ "endurance": 32 } );
addData( "req_wear", "endreborn:wolframium_boots",										{ "endurance": 32 } );
addData( "req_wear", "endreborn:ender_boots",											{ "endurance": 45 } );
addData( "xp_value_craft", "endreborn:ender_boots",										{ "crafting": 100, "smithing": 20 } );
addData( "xp_value_craft", "endreborn:wolframium_helmet",								{ "crafting": 100, "smithing": 20 } );
addData( "xp_value_craft", "endreborn:wolframium_chestplate",							{ "crafting": 160, "smithing": 32 } );
addData( "xp_value_craft", "endreborn:wolframium_leggings",								{ "crafting": 140, "smithing": 28 } );
addData( "xp_value_craft", "endreborn:wolframium_boots",								{ "crafting": 80, "smithing": 16 } );
addData( "xp_value_smelt", "endreborn:wolframium_horse_armor",							{ "smithing": 20 } );
addData( "info_smelt", "endreborn:wolframium_horse_armor",								{ "extraChance": 50 } );
addData( "xp_value_smelt", "endreborn:quartz_ore",										{ "smithing": 13 } );
addData( "xp_value_break", "endreborn:quartz_ore",										{ "mining": 13 } );
addData( "info_ore", "endreborn:quartz_ore",											{ "extraChance": 0.9 } );
addData( "xp_value_break", "endreborn:obsidian_ore",									{ "mining": 50 } );
addData( "info_ore", "endreborn:obsidian_ore",											{ "extraChance": 0.8 } );
addData( "xp_value_smelt", "endreborn:wolframium_ore",									{ "smithing": 12 } );
addData( "xp_value_break", "endreborn:wolframium_ore",									{ "mining": 12 } );
addData( "info_ore", "endreborn:wolframium_ore",										{ "extraChance": 0.9 } );
addData( "xp_value_smelt", "endreborn:end_wolframium_ore",								{ "smithing": 14 } );
addData( "info_smelt", "endreborn:end_wolframium_ore",									{ "extraChance": 1.2 } );
addData( "xp_value_break", "endreborn:end_wolframium_ore",								{ "mining": 14 } );
addData( "info_ore", "endreborn:end_wolframium_ore",									{ "extraChance": 1.2 } );
addData( "req_craft", "endreborn:ender_transmitter",									{ "crafting": 80 } );
}
{
addData( "req_craft", "storagedrawers:controller",										{ "crafting": 40 } );
addData( "req_place", "storagedrawers:controller",										{ "building": 20 } );
addData( "req_use", "storagedrawers:controller",										{ "crafting": 40 } );
addData( "req_craft", "storagedrawers:controller_slave",								{ "crafting": 50 } );
addData( "req_place", "storagedrawers:controller_slave",								{ "building": 25 } );
addData( "req_use", "storagedrawers:controller_slave",									{ "crafting": 50 } );
addData( "req_craft", "storagedrawers:compacting_drawers_3",							{ "crafting": 30 } );
addData( "req_place", "storagedrawers:compacting_drawers_3",							{ "building": 15 } );
addData( "req_use", "storagedrawers:compacting_drawers_3",								{ "crafting": 30 } );
addData( "req_craft", "storagedrawers:obsidian_storage_upgrade",						{ "crafting": 10 } );
addData( "req_craft", "storagedrawers:iron_storage_upgrade",							{ "crafting": 20 } );
addData( "req_craft", "storagedrawers:gold_storage_upgrade",							{ "crafting": 30 } );
addData( "req_craft", "storagedrawers:diamond_storage_upgrade",							{ "crafting": 40 } );
addData( "req_craft", "storagedrawers:emerald_storage_upgrade",							{ "crafting": 50 } );
addData( "req_craft", "storagedrawers:void_upgrade",									{ "crafting": 20 } );
addData( "req_craft", "storagedrawers:conversion_upgrade",								{ "crafting": 25 } );
addData( "req_craft", "storagedrawers:illumination_upgrade",							{ "crafting": 25 } );
	
}
{
addData( "biome_effect_positive", "biomesoplenty:highland",								{ "minecraft:speed": 0 } );
addData( "xp_value_smelt", "biomesoplenty:mud_ball",									{ "smithing": 1.2 } );
addData( "info_smelt", "biomesoplenty:mud_ball",										{ "extraChance": 1.2 } );
addData( "req_place", "biomesoplenty:origin_sapling",									{ "farming": 10, "woodcutting": 15 } );
addData( "req_place", "biomesoplenty:flowering_oak_sapling",							{ "farming": 30, "woodcutting": 20 } );
addData( "req_place", "biomesoplenty:rainbow_birch_sapling",							{ "farming": 50, "woodcutting": 25 } );
addData( "req_place", "biomesoplenty:yellow_autumn_sapling",							{ "farming": 35, "woodcutting": 25 } );
addData( "req_place", "biomesoplenty:orange_autumn_sapling",							{ "farming": 45, "woodcutting": 25 } );
addData( "req_place", "biomesoplenty:maple_sapling",									{ "farming": 25, "woodcutting": 50 } );
addData( "req_place", "biomesoplenty:fir_sapling",										{ "farming": 35, "woodcutting": 35 } );
addData( "req_place", "biomesoplenty:redwood_sapling",									{ "farming": 30, "woodcutting": 60 } );
addData( "req_place", "biomesoplenty:white_cherry_sapling",								{ "farming": 35, "woodcutting": 25 } );
addData( "req_place", "biomesoplenty:pink_cherry_sapling",								{ "farming": 40, "woodcutting": 20 } );
addData( "req_place", "biomesoplenty:mahogany_sapling",									{ "farming": 25, "woodcutting": 35 } );
addData( "req_place", "biomesoplenty:jacaranda_sapling",								{ "farming": 45, "woodcutting": 20 } );
addData( "req_place", "biomesoplenty:palm_sapling",										{ "farming": 15, "woodcutting": 15 } );
addData( "req_place", "biomesoplenty:willow_sapling",									{ "farming": 30, "woodcutting": 45 } );
addData( "req_place", "biomesoplenty:dead_sapling",										{ "farming": 15, "woodcutting": 15 } );
addData( "req_place", "biomesoplenty:magic_sapling",									{ "farming": 45, "woodcutting": 45 } );
addData( "req_place", "biomesoplenty:umbran_sapling",									{ "farming": 30, "woodcutting": 55 } );
addData( "req_place", "biomesoplenty:hellbark_sapling",									{ "farming": 25, "woodcutting": 5 } );
addData( "xp_value_grow", "biomesoplenty:origin_sapling",								{ "farming": 5 } );
addData( "xp_value_grow", "biomesoplenty:flowering_oak_sapling",						{ "farming": 15 } );
addData( "xp_value_grow", "biomesoplenty:rainbow_birch_sapling",						{ "farming": 35 } );
addData( "xp_value_grow", "biomesoplenty:yellow_autumn_sapling",						{ "farming": 30 } );
addData( "xp_value_grow", "biomesoplenty:orange_autumn_sapling",						{ "farming": 30 } );
addData( "xp_value_grow", "biomesoplenty:maple_sapling",								{ "farming": 40 } );
addData( "xp_value_grow", "biomesoplenty:fir_sapling",									{ "farming": 20 } );
addData( "xp_value_grow", "biomesoplenty:redwood_sapling",								{ "farming": 25 } );
addData( "xp_value_grow", "biomesoplenty:white_cherry_sapling",							{ "farming": 35 } );
addData( "xp_value_grow", "biomesoplenty:pink_cherry_sapling",							{ "farming": 35 } );
addData( "xp_value_grow", "biomesoplenty:mahogany_sapling",								{ "farming": 40 } );
addData( "xp_value_grow", "biomesoplenty:jacaranda_sapling",							{ "farming": 30 } );
addData( "xp_value_grow", "biomesoplenty:palm_sapling",									{ "farming": 40 } );
addData( "xp_value_grow", "biomesoplenty:willow_sapling",								{ "farming": 35 } );
addData( "xp_value_grow", "biomesoplenty:dead_sapling",									{ "farming": 3 } );
addData( "xp_value_grow", "biomesoplenty:magic_sapling",								{ "farming": 20, "magic": 20 } );
addData( "xp_value_grow", "biomesoplenty:umbran_sapling",								{ "farming": 30 } );
addData( "xp_value_grow", "biomesoplenty:hellbark_sapling",								{ "farming": 25 } );
addData( "xp_value_break", "biomesoplenty:fir_wood",									{ "woodcutting": 8 } );
addData( "xp_value_break", "biomesoplenty:redwood_wood",								{ "woodcutting": 7 } );
addData( "xp_value_break", "biomesoplenty:cherry_wood",									{ "woodcutting": 15 } );
addData( "xp_value_break", "biomesoplenty:mahogany_wood",								{ "woodcutting": 8 } );
addData( "xp_value_break", "biomesoplenty:jacaranda_wood",								{ "woodcutting": 9 } );
addData( "xp_value_break", "biomesoplenty:palm_wood",									{ "woodcutting": 12 } );
addData( "xp_value_break", "biomesoplenty:willow_wood",									{ "woodcutting": 14 } );
addData( "xp_value_break", "biomesoplenty:dead_wood",									{ "woodcutting": 6 } );
addData( "xp_value_break", "biomesoplenty:magic_wood",									{ "woodcutting": 15, "magic": 5 } );
addData( "xp_value_break", "biomesoplenty:umbran_wood",									{ "woodcutting": 9 } );
addData( "xp_value_break", "biomesoplenty:hellbark_wood",								{ "woodcutting": 10 } );
addData( "xp_value_break", "biomesoplenty:fir_log",										{ "woodcutting": 8 } );
addData( "xp_value_break", "biomesoplenty:redwood_log",									{ "woodcutting": 7 } );
addData( "xp_value_break", "biomesoplenty:cherry_log",									{ "woodcutting": 15 } );
addData( "xp_value_break", "biomesoplenty:mahogany_log",								{ "woodcutting": 8 } );
addData( "xp_value_break", "biomesoplenty:jacaranda_log",								{ "woodcutting": 9 } );
addData( "xp_value_break", "biomesoplenty:palm_log",									{ "woodcutting": 12 } );
addData( "xp_value_break", "biomesoplenty:willow_log",									{ "woodcutting": 14 } );
addData( "xp_value_break", "biomesoplenty:dead_log",									{ "woodcutting": 6 } );
addData( "xp_value_break", "biomesoplenty:magic_log",									{ "woodcutting": 15, "magic": 5 } );
addData( "xp_value_break", "biomesoplenty:umbran_log",									{ "woodcutting": 9 } );
addData( "xp_value_break", "biomesoplenty:hellbark_log",								{ "woodcutting": 10 } );
addData( "xp_value_smelt", "biomesoplenty:fir_log",										{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:redwood_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:cherry_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:mahogany_log",								{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:jacaranda_log",								{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:palm_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:willow_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:dead_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:magic_log",									{ "smithing": 0.15, "magic": 0.05 } );
addData( "xp_value_smelt", "biomesoplenty:umbran_log",									{ "smithing": 0.25 } );
addData( "xp_value_smelt", "biomesoplenty:hellbark_log",								{ "smithing": 0.25 } );
addData( "info_log", "biomesoplenty:fir_wood",											{ "extraChance": 0.7 } );
addData( "info_log", "biomesoplenty:redwood_wood",										{ "extraChance": 0.8 } );
addData( "info_log", "biomesoplenty:cherry_wood",										{ "extraChance": 1 } );
addData( "info_log", "biomesoplenty:mahogany_wood",										{ "extraChance": 0.85 } );
addData( "info_log", "biomesoplenty:jacaranda_wood",									{ "extraChance": 1 } );
addData( "info_log", "biomesoplenty:palm_wood",											{ "extraChance": 1.5 } );
addData( "info_log", "biomesoplenty:willow_wood",										{ "extraChance": 1.25 } );
addData( "info_log", "biomesoplenty:dead_wood",											{ "extraChance": 1.75 } );
addData( "info_log", "biomesoplenty:magic_wood",										{ "extraChance": 1.2 } );
addData( "info_log", "biomesoplenty:umbran_wood",										{ "extraChance": 1 } );
addData( "info_log", "biomesoplenty:hellbark_wood",										{ "extraChance": 1.1 } );
addData( "info_log", "biomesoplenty:fir_log",											{ "extraChance": 0.7 } );
addData( "info_log", "biomesoplenty:redwood_log",										{ "extraChance": 0.8 } );
addData( "info_log", "biomesoplenty:cherry_log",										{ "extraChance": 1 } );
addData( "info_log", "biomesoplenty:mahogany_log",										{ "extraChance": 0.85 } );
addData( "info_log", "biomesoplenty:jacaranda_log",										{ "extraChance": 1 } );
addData( "info_log", "biomesoplenty:palm_log",											{ "extraChance": 1.5 } );
addData( "info_log", "biomesoplenty:willow_log",										{ "extraChance": 1.25 } );
addData( "info_log", "biomesoplenty:dead_log",											{ "extraChance": 1.75 } );
addData( "info_log", "biomesoplenty:magic_log",											{ "extraChance": 1.2 } );
addData( "info_log", "biomesoplenty:umbran_log",										{ "extraChance": 1 } );
addData( "info_log", "biomesoplenty:hellbark_log",										{ "extraChance": 1.1 } );
addData( "xp_value_break", "biomesoplenty:white_sand",									{ "excavation": 1.3 } );
addData( "xp_value_smelt", "biomesoplenty:white_sand",									{ "smithing": 1 } );
addData2( "treasure", "minecraft:sand", "biomesoplenty:white_sand",
{
	"startChance": 0.05,
	"startLevel": 1,
	"endChance": 1,
	"endLevel": 180,
	"xpPerItem": 2,
	"minCount": 1,
	"maxCount": 4
} );
}
{
addData( "req_place", "traverse:red_autumnal_sapling",									{ "farming": 35, "woodcutting": 25 } );
addData( "req_place", "traverse:brown_autumnal_sapling",								{ "farming": 30, "woodcutting": 30 } );
addData( "req_place", "traverse:orange_autumnal_sapling",								{ "farming": 25, "woodcutting": 35 } );
addData( "req_place", "traverse:yellow_autumnal_sapling",								{ "farming": 30, "woodcutting": 35 } );
addData( "req_place", "traverse:fir_sapling",											{ "farming": 35, "woodcutting": 60 } );
addData( "xp_value_grow", "traverse:red_autumnal_sapling",								{ "farming": 35 } );
addData( "xp_value_grow", "traverse:brown_autumnal_sapling",							{ "farming": 30 } );
addData( "xp_value_grow", "traverse:orange_autumnal_sapling",							{ "farming": 35 } );
addData( "xp_value_grow", "traverse:yellow_autumnal_sapling",							{ "farming": 30 } );
addData( "xp_value_grow", "traverse:fir_sapling",										{ "farming": 20 } );
addData( "xp_value_break", "traverse:fir_wood",											{ "woodcutting": 7 } );
addData( "xp_value_break", "traverse:fir_log",											{ "woodcutting": 7 } );
addData( "info_log", "traverse:fir_wood",												{ "extraChance": 0.8 } );
addData( "info_log", "traverse:fir_log",												{ "extraChance": 0.8 } );
}
{
addData( "req_place", "autumnity:red_maple_sapling",									{ "farming": 30, "woodcutting": 50 } );
addData( "req_place", "autumnity:orange_maple_sapling",									{ "farming": 35, "woodcutting": 45 } );
addData( "req_place", "autumnity:yellow_maple_sapling",									{ "farming": 30, "woodcutting": 40 } );
addData( "req_place", "autumnity:maple_sapling",										{ "farming": 25, "woodcutting": 35 } );
addData( "xp_value_grow", "autumnity:red_maple_sapling",								{ "farming": 30 } );
addData( "xp_value_grow", "autumnity:orange_maple_sapling",								{ "farming": 35 } );
addData( "xp_value_grow", "autumnity:yellow_maple_sapling",								{ "farming": 30 } );
addData( "xp_value_grow", "autumnity:maple_sapling",									{ "farming": 25 } );
addData( "xp_value_break", "autumnity:sappy_maple_wood",								{ "woodcutting": 13 } );
addData( "xp_value_break", "autumnity:maple_wood",										{ "woodcutting": 13 } );
addData( "xp_value_break", "autumnity:sappy_maple_log",									{ "woodcutting": 13 } );
addData( "xp_value_smelt", "autumnity:sappy_maple_log",									{ "smithing": 0.25 } );
addData( "xp_value_break", "autumnity:maple_log",										{ "woodcutting": 13 } );
addData( "xp_value_smelt", "autumnity:maple_log",										{ "smithing": 0.25 } );
addData( "info_log", "autumnity:sappy_maple_wood",										{ "extraChance": 1.35 } );
addData( "info_log", "autumnity:maple_wood",											{ "extraChance": 1.25 } );
addData( "info_log", "autumnity:sappy_maple_log",										{ "extraChance": 1.35 } );
addData( "info_log", "autumnity:maple_log",												{ "extraChance": 1.25 } );
}
{
addData( "req_weapon", "dungeons_gear:dagger",											{ "combat": 5 } );
addData( "req_weapon", "dungeons_gear:fang_of_frost",									{ "combat": 20 } );
addData( "req_weapon", "dungeons_gear:moon_dagger",										{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:sickle",											{ "combat": 10 } );
addData( "req_weapon", "dungeons_gear:nightmares_bite",									{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:the_last_laugh",									{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:gauntlet",										{ "combat": 10 } );
addData( "req_weapon", "dungeons_gear:fighters_binding",								{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:mauler",											{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:soul_fist",										{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:soul_scythe",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:frost_scythe",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:jailors_scythe",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:cutless",											{ "combat": 10 } );
addData( "req_weapon", "dungeons_gear:dancers_sword",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:nameless_blade",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:hawkbrand",										{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:battlestaff",										{ "combat": 10 } );
addData( "req_weapon", "dungeons_gear:battlestaff_of_terror",							{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:growing_staff",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:firebrand",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:highland_axe",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:double_axe",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:cursed_axe",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:whirlwind",										{ "combat": 55 } );
addData( "req_weapon", "dungeons_gear:mace",											{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:flail",											{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:suns_grace",										{ "combat": 50 } );
addData( "req_weapon", "dungeons_gear:great_hammer",									{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:hammer_of_gravity",								{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:stormlander",										{ "combat": 50 } );
addData( "req_weapon", "dungeons_gear:katana",											{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:soul_knife",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:dark_katana",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:masters_katana",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:eternal_knife",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:truthseeker",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:claymore",										{ "combat": 20 } );
addData( "req_weapon", "dungeons_gear:broadsword",										{ "combat": 20 } );
addData( "req_weapon", "dungeons_gear:heartstealer",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:spear",											{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:fortune_spear",									{ "combat": 25 } );
addData( "req_weapon", "dungeons_gear:glaive",											{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:glaive_bane",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:venom_glaive",									{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:whip",											{ "combat": 15 } );
addData( "req_weapon", "dungeons_gear:vine_whip",										{ "combat": 35 } );
addData( "req_weapon", "dungeons_gear:rapid_crossbow",									{ "archery": 15 } );
addData( "req_weapon", "dungeons_gear:betterfly_crossbow",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:auto_crossbow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:azure_seeker",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:the_slicer",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:heavy_crossbow",									{ "archery": 15 } );
addData( "req_weapon", "dungeons_gear:doom_crossbow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:slayer_crossbow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:soul_crossbow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:feral_soul_crossbow",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:voidcaller",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:scatter_crossbow",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:harp_crossbow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:lightning_harp_crossbow",							{ "archery": 35 } );
addData( "req_weapon", "dungeons_gear:exploding_crossbow",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:firebolt_thrower",								{ "archery": 35 } );
addData( "req_weapon", "dungeons_gear:dual_crossbow",									{ "archery": 15 } );
addData( "req_weapon", "dungeons_gear:baby_crossbow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:bonebow",											{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:twin_bow",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:bow_of_lost_souls",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:nocturnal_bow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:power_bow",										{ "archery": 15 } );
addData( "req_weapon", "dungeons_gear:elite_power_bow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:sabrewing",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:longbow",											{ "archery": 10 } );
addData( "req_weapon", "dungeons_gear:guardian_bow",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:red_snake",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:hunter_bow",										{ "archery": 10 } );
addData( "req_weapon", "dungeons_gear:hunters_promise",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:masters_bow",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:master_bow",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:shortbow",										{ "archery": 10 } );
addData( "req_weapon", "dungeons_gear:mechanical_shortbow",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:purple_storm",									{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:trickbow",										{ "archery": 15 } );
addData( "req_weapon", "dungeons_gear:the_green_menace",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:the_pink_scoundrel",								{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:snow_bow",										{ "archery": 25 } );
addData( "req_weapon", "dungeons_gear:winters_touch",									{ "archery": 25 } );
addData( "req_wear", "dungeons_gear:archers_vest",										{ "endurance": 20 } );
addData( "req_wear", "dungeons_gear:hunters_vest",										{ "endurance": 10 } );
addData( "req_wear", "dungeons_gear:archers_hood",										{ "endurance": 20 } );
addData( "req_wear", "dungeons_gear:battle_robe",										{ "endurance": 20 } );
addData( "req_wear", "dungeons_gear:splendid_robe",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:champions_chestplate",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:champions_helmet",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:heroes_chestplate",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:heroes_helmet",										{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:dark_chestplate",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:dark_helmet",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:royal_guard_chestplate",							{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:royal_guard_helmet",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:titans_shroud_chestplate",							{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:titans_shroud_helmet",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:evocation_robe",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:evocation_hat",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:ember_robe",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:ember_hat",											{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:grim_chestplate",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:grim_helmet",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:wither_chestplate",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:wither_helmet",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:guards_chestplate",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:guards_helmet",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:curious_chestplate",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:curious_helmet",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:mercenary_chestplate",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:mercenary_helmet",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:renegade_chestplate",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:renegade_helmet",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:ocelot_vest",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:ocelot_hood",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:shadow_walker_vest",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:shadow_walker_hood",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:phantom_chestplate",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:phantom_helmet",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:frost_bite_chestplate",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:frost_bite_helmet",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:plate_chestplate",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:plate_helmet",										{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:full_metal_chestplate",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:full_metal_helmet",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:reinforced_mail_chestplate",						{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:reinforced_mail_helmet",							{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:stalwart_chestplate",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:stalwart_helmet",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:scale_mail_chestplate",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:scale_mail_helmet",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:highland_chestplate",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:highland_helmet",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:snow_chestplate",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:snow_helmet",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:frost_chestplate",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:frost_helmet",										{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:soul_robe",											{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:soul_hood",											{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:souldancer_robe",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:souldancer_hood",									{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:spelunker_chestplate",								{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:spelunker_helmet",									{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:cave_crawler_chestplate",							{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:cave_crawler_helmet",								{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:thief_vest",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:thief_hood",										{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:spider_vest",										{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:spider_hood",										{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:wolf_vest",											{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:wolf_hood",											{ "endurance": 30 } );
addData( "req_wear", "dungeons_gear:fox_vest",											{ "endurance": 40 } );
addData( "req_wear", "dungeons_gear:fox_hood",											{ "endurance": 40 } );
addData( "xp_bonus_held", "dungeons_gear:soul_fist",									{ "agility": 20 } );
addData( "xp_bonus_held", "dungeons_gear:soul_scythe",									{ "hunter": 10 } );
addData( "xp_bonus_held", "dungeons_gear:frost_scythe",									{ "magic": 20 } );
addData( "xp_bonus_held", "dungeons_gear:jailors_scythe",								{ "hunter": 20 } );
addData( "xp_bonus_held", "dungeons_gear:soul_knife",									{ "hunter": 20 } );
addData( "xp_bonus_held", "dungeons_gear:eternal_knife",								{ "hunter": 40 } );
addData( "xp_bonus_held", "dungeons_gear:truthseeker",									{ "hunter": 20 } );
addData( "xp_bonus_held", "dungeons_gear:lightning_rod",								{ "hunter": 10 } );
addData( "xp_bonus_held", "dungeons_gear:harvester",									{ "hunter": 10, "magic": 10 } );
addData( "xp_bonus_held", "dungeons_gear:soul_healer",									{ "magic": 10, "hunter": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:dark_chestplate",								{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:dark_helmet",									{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:royal_guard_chestplate",						{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:royal_guard_helmet", {"slayer": 10}, );
addData( "xp_bonus_worn", "dungeons_gear:titans_shroud_chestplate",						{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:titans_shroud_helmet",							{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:grim_chestplate",								{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:grim_helmet",									{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:wither_chestplate",							{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:wither_helmet",								{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:phantom_chestplate",							{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:phantom_helmet",								{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:frost_bite_chestplate",						{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:frost_bite_helmet",							{ "slayer": 10 } );
addData( "xp_bonus_worn", "dungeons_gear:soul_robe",									{ "endurance": 5, "slayer": 10, "magic": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:soul_hood",									{ "endurance": 5, "slayer": 10, "magic": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:souldancer_robe",								{ "endurance": 10, "slayer": 10, "magic": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:souldancer_hood",								{ "endurance": 10, "slayer": 10, "magic": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:spelunker_chestplate",							{ "slayer": 5, "mining": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:spelunker_helmet",								{ "slayer": 5, "mining": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:cave_crawler_chestplate",						{ "slayer": 5 } );
addData( "xp_bonus_worn", "dungeons_gear:cave_crawler_helmet",							{ "slayer": 5 } );
addData( "fish_enchant_pool", "dungeons_gear:accelerate",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:radiance",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:rampaging",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:freezing",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:shockwave",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:tempo_theft",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:chains",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:altruistic",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:critical_hit",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:wild_rage",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:leeching",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:soul_siphon",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:fuse_shot",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:gravity",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:final_shout",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:fire_trail",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:bonus_shot",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:frenzied",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:gravity_pulse",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:committed",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:food_reserves",							{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:weakening",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:health_synergy",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:radiance_shot",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:burning",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:recycler",									{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:prospector",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:ricochet",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:potion_barrier",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:anima_conduit",							{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:speed_synergy",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:growing",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:chilling",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:supercharge",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:surprise_gift",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:enigma_resonator",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:echo",										{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:swiftfooted",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:exploding",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:cooldown",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:cowardice",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:snowball",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:poison_cloud",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:chain_reaction",							{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:replenish",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:stunning",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:thundering",								{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:swirling",									{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:electrified",								{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "dungeons_gear:deflect",									{ "levelReq": 25, "chancePerLevel": 1, "maxChance": 50 } );
}
{
{
addData2( "salvage", "aquaculture:iron_fishing_rod", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 45,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "aquaculture:gold_fishing_rod", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 45,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "aquaculture:diamond_fishing_rod", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 45,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData2( "salvage", "aquaculture:neptunium_fishing_rod", "minecraft:string",
{
	"salvageMax": 2,
	"baseChance": 45,
	"chancePerLevel": 2,
	"maxChance": 80,
	"xpPerItem": 7,
	"levelReq": 1
} );
addData( "fish_pool", "aquaculture:iron_fishing_rod",									{ "startWeight": 20, "startLevel": 1, "endWeight": 110, "endLevel": 110, "xp": 45, "enchantLevelReq": 10 } );
addData( "fish_pool", "aquaculture:gold_fishing_rod",									{ "startWeight": 10, "startLevel": 1, "endWeight": 120, "endLevel": 120, "xp": 55, "enchantLevelReq": 10 } );
addData( "fish_pool", "aquaculture:diamond_fishing_rod",								{ "startWeight": 5, "startLevel": 1, "endWeight": 130, "endLevel": 130, "xp": 65, "enchantLevelReq": 10 } );
addData( "fish_pool", "aquaculture:neptunium_fishing_rod",								{ "startWeight": 0, "startLevel": 1, "endWeight": 140, "endLevel": 140, "xp": 75, "enchantLevelReq": 10 } );
addData( "req_use", "aquaculture:iron_fishing_rod",										{ "fishing": 10 } );
addData( "req_use", "aquaculture:gold_fishing_rod",										{ "fishing": 15 } );
addData( "req_use", "aquaculture:diamond_fishing_rod",									{ "fishing": 20 } );
addData( "req_use", "aquaculture:neptunium_fishing_rod",								{ "fishing": 30 } );
}
addData( "xp_value_craft", "aquaculture:fishing_line",									{ "fishing": 10 } );
addData( "xp_value_craft", "aquaculture:bobber",										{ "fishing": 20 } );
{
addData( "req_tool", "aquaculture:neptunium_pickaxe",									{ "mining": 30 } );
addData( "req_tool", "aquaculture:neptunium_shovel",									{ "excavation": 30 } );
addData( "req_tool", "aquaculture:neptunium_axe",										{ "woodcutting": 30 } );
addData( "req_tool", "aquaculture:neptunium_hoe",										{ "farming": 40 } );
addData( "xp_value_craft", "aquaculture:neptunium_pickaxe",								{ "crafting": 600, "smithing": 120 } );
addData( "xp_value_craft", "aquaculture:neptunium_shovel",								{ "crafting": 200, "smithing": 40 } );
addData( "xp_value_craft", "aquaculture:neptunium_hoe",									{ "crafting": 400, "smithing": 80 } );
addData( "xp_value_craft", "aquaculture:neptunium_axe",									{ "crafting": 600, "smithing": 120 } );
addData( "xp_bonus_held", "aquaculture:neptunium_pickaxe",								{ "swimming": 2.5 } );
addData( "xp_bonus_held", "aquaculture:neptunium_shovel",								{ "swimming": 2.5 } );
addData( "xp_bonus_held", "aquaculture:neptunium_axe",									{ "swimming": 2.5 } );
addData( "xp_bonus_held", "aquaculture:neptunium_hoe",									{ "farming": 20, "swimming": 2.5 } );
addData( "fish_pool", "aquaculture:neptunium_shovel",									{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "aquaculture:neptunium_pickaxe",									{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "aquaculture:neptunium_axe",										{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "aquaculture:neptunium_hoe",										{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "req_weapon", "aquaculture:neptunium_axe",										{ "combat": 75 } );
addData( "req_wear", "aquaculture:neptunium_helmet",									{ "endurance": 45 } );
addData( "req_wear", "aquaculture:neptunium_chestplate",								{ "endurance": 45 } );
addData( "req_wear", "aquaculture:neptunium_leggings",									{ "endurance": 45 } );
addData( "req_wear", "aquaculture:neptunium_boots",										{ "endurance": 45 } );
addData( "xp_value_craft", "aquaculture:neptunium_helmet",								{ "crafting": 800, "smithing": 200 } );
addData( "xp_value_craft", "aquaculture:neptunium_chestplate",							{ "crafting": 1400, "smithing": 320 } );
addData( "xp_value_craft", "aquaculture:neptunium_leggings",							{ "crafting": 1200, "smithing": 280 } );
addData( "xp_value_craft", "aquaculture:neptunium_boots",								{ "crafting": 600, "smithing": 160 } );
addData( "fish_pool", "aquaculture:neptunium_helmet",									{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "aquaculture:neptunium_chestplate",								{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "aquaculture:neptunium_leggings",									{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "fish_pool", "aquaculture:neptunium_boots",									{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
addData( "req_use", "aquaculture:neptunium_bow",										{ "agility": 10, "archery": 15 } );
addData( "fish_pool", "aquaculture:neptunium_bow",										{ "startWeight": 50, "startLevel": 1, "endWeight": 25, "endLevel": 100, "xp": 35, "enchantLevelReq": 10 } );
addData( "req_weapon", "aquaculture:neptunium_sword",									{ "combat": 70 } );
addData( "xp_value_craft", "aquaculture:neptunium_sword",								{ "crafting": 500, "smithing": 90 } );
addData( "fish_pool", "aquaculture:neptunium_sword",									{ "startWeight": 0, "startLevel": 90, "endWeight": 4, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
}
{
addData( "xp_value_craft", "aquaculture:wooden_fillet_knife",							{ "crafting": 1 } );
addData( "xp_value_craft", "aquaculture:stone_fillet_knife",							{ "crafting": 5 } );
addData( "xp_value_craft", "aquaculture:iron_fillet_knife",								{ "crafting": 10, "smithing": 10 } );
addData( "xp_value_craft", "aquaculture:gold_fillet_knife",								{ "crafting": 15, "smithing": 10 } );
addData( "xp_value_craft", "aquaculture:diamond_fillet_knife",							{ "crafting": 20 } );
addData( "xp_value_craft", "aquaculture:neptunium_fillet_knife",						{ "crafting": 30, "smithing": 10 } );
addData( "req_weapon", "aquaculture:neptunium_fillet_knife",							{ "combat": 5 } );
}
addData( "xp_value_smelt", "aquaculture:tin_can",										{ "smithing": 12 } );
addData( "info_smelt", "aquaculture:tin_can",											{ "extraChance": 15 } );
addData2( "salvage", "aquaculture:tin_can", "minecraft:iron_nugget",
{
	"salvageMax": 12,
	"baseChance": 35,
	"chancePerLevel": 1.25,
	"maxChance": 90,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData( "xp_value_cook", "aquaculture:fish_fillet_raw",								{ "cooking": 7.5 } );
addData( "xp_value_cook", "aquaculture:frog_legs_raw",									{ "cooking": 7.5 } );
addData( "info_cook", "aquaculture:fish_fillet_raw",									{ "extraChance": 1.5 } );
addData( "info_cook", "aquaculture:frog_legs_raw",										{ "extraChance": 1.5 } );
addData( "xp_value_craft", "aquaculture:turtle_soup",									{ "cooking": 35 } );
addData( "xp_value_craft", "aquaculture:sushi",											{ "cooking": 15 } );
addData( "xp_value_brew", "aquaculture:jellyfish",										{ "alchemy": 6 } );
addData( "info_brew", "aquaculture:jellyfish",											{ "extraChance": 0.25 } );
addData( "xp_value_brew", "aquaculture:leech",											{ "alchemy": 6 } );
addData( "info_brew", "aquaculture:leech",												{ "extraChance": 0.25 } );
addData( "req_use", "aquaculture:tackle_box",											{ "fishing": 20 } );
addData( "xp_value_craft", "aquaculture:iron_hook",										{ "fishing": 5 } );
addData( "xp_value_craft", "aquaculture:gold_hook",										{ "fishing": 5 } );
addData( "xp_value_craft", "aquaculture:diamond_hook",									{ "fishing": 10 } );
addData( "xp_value_craft", "aquaculture:light_hook",									{ "fishing": 15 } );
addData( "xp_value_craft", "aquaculture:heavy_hook",									{ "fishing": 15 } );
addData( "xp_value_craft", "aquaculture:double_hook",									{ "fishing": 15 } );
addData( "xp_value_craft", "aquaculture:redstone_hook",									{ "fishing": 15 } );
addData( "xp_value_craft", "aquaculture:note_hook",										{ "fishing": 15 } );
addData( "xp_value_craft", "aquaculture:nether_star_hook",								{ "fishing": 20 } );
addData( "xp_value_general", "aquaculture:atlantic_cod",								{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:blackfish",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:pacific_halibut",								{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:atlantic_halibut",							{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:atlantic_herring",							{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:pink_salmon",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:pollock",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:rainbow_trout",								{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:bayad",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:boulti",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:capitaine",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:synodontis",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:smallmouth_bass",								{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:bluegill",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:brown_trout",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:carp",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:catfish",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:gar",											{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:minnow",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:muskellunge",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:perch",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:arapaima",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:piranha",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:tambaqui",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:brown_shrooma",								{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:red_shrooma",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:jellyfish",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:red_grouper",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:tuna",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:frog",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:leech",										{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:goldfish",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:box_turtle",									{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:arrau_turtle",								{ "fishing": 25 } );
addData( "xp_value_general", "aquaculture:starshell_turtle",							{ "fishing": 25 } );
}
{
addData( "req_place", "bountifulbaubles:water_candle",									{ "magic": 10 } );
addData( "req_wear", "bountifulbaubles:balloon",										{ "agility": 10 } );
addData( "req_wear", "bountifulbaubles:sunglasses",										{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:apple",											{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:vitamins",										{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:ring_overclocking",								{ "agility": 10 } );
addData( "req_wear", "bountifulbaubles:shulker_heart",									{ "agility": 10 } );
addData( "req_wear", "bountifulbaubles:ring_free_action",								{ "agility": 10 } );
addData( "req_wear", "bountifulbaubles:bezoar",											{ "endurance": 10 } );
addData( "req_wear", "bountifulbaubles:black_dragon_scale",								{ "endurance": 10 } );
addData( "req_wear", "bountifulbaubles:mixed_dragon_scale",								{ "endurance": 15 } );
addData( "req_wear", "bountifulbaubles:ankh_charm",										{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:obsidian_skull",									{ "endurance": 10 } );
addData( "req_wear", "bountifulbaubles:shield_cobalt",									{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:shield_obsidian",								{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:shield_ankh",									{ "endurance": 5 } );
addData( "req_wear", "bountifulbaubles:magic_mirror",									{ "magic": 2 } );
addData( "req_wear", "bountifulbaubles:lucky_horseshoe",								{ "endurance": 15 } );
addData( "req_wear", "bountifulbaubles:broken_heart",									{ "endurance": 15 } );
addData( "req_wear", "bountifulbaubles:phylactery_charm",								{ "magic": 20 } );
addData( "req_wear", "bountifulbaubles:amulet_cross",									{ "magic": 2 } );
addData( "req_wear", "bountifulbaubles:gloves_dexterity",								{ "agility": 5 } );
addData( "req_wear", "bountifulbaubles:gloves_digging_iron",							{ "endurance": 10, "excavation": 20, "woodcutting": 20, "mining": 20, "farming": 20 } );
addData( "req_wear", "bountifulbaubles:gloves_digging_diamond",							{ "endurance": 15, "excavation": 40, "woodcutting": 40, "mining": 40, "farming": 30 } );
addData( "xp_value_craft", "bountifulbaubles:disintegration_tablet",					{ "crafting": 20, "magic": 10 } );
addData( "xp_value_craft", "bountifulbaubles:spectral_silt",							{ "crafting": 5, "magic": 5 } );
}
{
addData( "fish_enchant_pool", "charm:curse_break",										{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "charm:homing",											{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "charm:salvage",											{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "fish_enchant_pool", "charm:magnetic",											{ "levelReq": 35, "chancePerLevel": 1, "maxChance": 50 } );
addData( "xp_value_break", "charm:nether_gold_deposit",									{ "mining": 2 } );
addData( "xp_value_break", "charm:pig_iron_ore",										{ "mining": 12 } );
addData( "xp_value_smelt", "charm:nether_gold_deposit",									{ "smithing": 22 } );
addData( "xp_value_smelt", "charm:pig_iron_ore",										{ "smithing": 22 } );
addData( "info_smelt", "charm:nether_gold_deposit",										{ "extraChance": 0.75 } );
addData( "info_smelt", "charm:pig_iron_ore",											{ "extraChance": 0.75 } );
addData( "info_ore", "charm:pig_iron_ore",												{ "extraChance": 0.75 } );
}
{
addData( "req_use", "combustivefishing:blazing_fishing_rod",							{ "fishing": 40 } );
addData( "req_weapon", "combustivefishing:searing_sword",								{ "combat": 60 } );
}
{
addData( "xp_value_kill", "betteranimalsplus:coyote",									{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:feralwolf",								{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:boar",										{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:tarantula",								{ "slayer": 20 } );
addData( "xp_value_kill", "betteranimalsplus:zotzpyre",									{ "slayer": 12 } );
addData( "xp_value_kill", "betteranimalsplus:shark",									{ "slayer": 30 } );
addData( "xp_value_kill", "betteranimalsplus:whale",									{ "slayer": 30 } );
addData( "xp_value_kill", "betteranimalsplus:hirschgeist",								{ "slayer": 100 } );
addData( "xp_value_kill", "betteranimalsplus:brownbear",								{ "slayer": 30 } );
addData( "xp_value_kill", "betteranimalsplus:blackbear",								{ "slayer": 30 } );
addData( "xp_value_kill", "betteranimalsplus:deer",										{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:lammergeier",								{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:goat",										{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:jellyfish",								{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:pheasant",									{ "slayer": 3 } );
addData( "xp_value_kill", "betteranimalsplus:reindeer",									{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:squirrel",									{ "slayer": 2 } );
addData( "xp_value_kill", "betteranimalsplus:songbird",									{ "slayer": 2 } );
addData( "xp_value_kill", "betteranimalsplus:badger",									{ "slayer": 30 } );
addData( "xp_value_kill", "betteranimalsplus:lamprey",									{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:nautilus",									{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:crab",										{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:horseshoecrab",							{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:moose",									{ "slayer": 10 } );
addData( "xp_value_kill", "betteranimalsplus:turkey",									{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:bobbit_worm",								{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:goose",									{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:eel_freshwater",							{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:eel_saltwater",							{ "slayer": 5 } );
addData( "xp_value_kill", "betteranimalsplus:walrus",									{ "slayer": 30 } );
}
{
	addData( "req_wear", "extendednether:netherite_helmet",									{ "endurance": 60 } );
	addData( "req_wear", "extendednether:netherite_chestplate",								{ "endurance": 60 } );
	addData( "req_wear", "extendednether:netherite_leggings",								{ "endurance": 60 } );
	addData( "req_wear", "extendednether:netherite_boots",									{ "endurance": 60 } );
	addData( "req_tool", "extendednether:netherite_pickaxe",								{ "mining": 60 } );
	addData( "req_tool", "extendednether:netherite_shovel",									{ "excavation": 60 } );
	addData( "req_tool", "extendednether:netherite_axe",									{ "woodcutting": 60 } );
	addData( "req_tool", "extendednether:netherite_hoe",									{ "farming": 40 } );
	addData( "req_weapon", "extendednether:netherite_pickaxe",								{ "combat": 60 } );
	addData( "req_weapon", "extendednether:netherite_shovel",								{ "combat": 60 } );
	addData( "req_weapon", "extendednether:netherite_axe",									{ "combat": 65 } );
	addData( "req_weapon", "extendednether:netherite_sword",								{ "combat": 60 } );
	addData( "xp_bonus_held", "extendednether:netherite_hoe",								{ "farming": 15 } );
	addData( "xp_value_craft", "extendednether:netherite_helmet",							{ "crafting": 1000, "smithing": 200 } );
	addData( "xp_value_craft", "extendednether:netherite_chestplate",						{ "crafting": 1600, "smithing": 320 } );
	addData( "xp_value_craft", "extendednether:netherite_leggings",							{ "crafting": 1400, "smithing": 280 } );
	addData( "xp_value_craft", "extendednether:netherite_boots",							{ "crafting": 800, "smithing": 160 } );
	addData( "xp_value_craft", "extendednether:netherite_pickaxe",							{ "crafting": 600, "smithing": 120 } );
	addData( "xp_value_craft", "extendednether:netherite_shovel",							{ "crafting": 200, "smithing": 40 } );
	addData( "xp_value_craft", "extendednether:netherite_hoe",								{ "crafting": 400, "smithing": 80 } );
	addData( "xp_value_craft", "extendednether:netherite_axe",								{ "crafting": 600, "smithing": 120 } );
	addData( "xp_value_craft", "extendednether:netherite_sword",							{ "crafting": 400, "smithing": 80 } );
	addData( "fish_pool", "extendednether:netherite_helmet",								{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_chestplate",							{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_leggings",								{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_boots",									{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_shovel",								{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_pickaxe",								{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_axe",									{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_sword",									{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
	addData( "fish_pool", "extendednether:netherite_hoe",									{ "startWeight": 0, "startLevel": 100, "endWeight": 3, "endLevel": 400, "xp": 350, "enchantLevelReq": 120 } );
}
{	
addData( "xp_value_craft", "extraanvils:stone_anvil",									{ "crafting": 20, "smithing": 10 } );
addData( "xp_value_craft", "extraanvils:diamond_anvil",									{ "crafting": 930, "smithing": 186 } );
addData( "xp_value_craft", "extraanvils:gold_anvil",									{ "crafting": 500, "smithing": 100 } );
addData2( "salvage", "extraanvils:diamond_anvil", "minecraft:diamond",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "extraanvils:diamond_anvil", "minecraft:diamond_block",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "extraanvils:chipped_diamond_anvil", "minecraft:diamond",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "extraanvils:chipped_diamond_anvil", "minecraft:diamond_block",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "extraanvils:damaged_diamond_anvil", "minecraft:diamond",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "extraanvils:damaged_diamond_anvil", "minecraft:diamond_block",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "extraanvils:gold_anvil", "minecraft:gold_ingot",
{
	"salvageMax": 4,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "extraanvils:gold_anvil", "minecraft:gold_block",
{
	"salvageMax": 3,
	"baseChance": 15,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 30
} );
addData2( "salvage", "extraanvils:chipped_gold_anvil", "minecraft:gold_ingot",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "extraanvils:chipped_gold_anvil", "minecraft:gold_block",
{
	"salvageMax": 2,
	"baseChance": 10,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 20
} );
addData2( "salvage", "extraanvils:damaged_gold_anvil", "minecraft:gold_ingot",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
addData2( "salvage", "extraanvils:damaged_gold_anvil", "minecraft:gold_block",
{
	"salvageMax": 1,
	"baseChance": 5,
	"chancePerLevel": 1,
	"maxChance": 75,
	"xpPerItem": 10,
	"levelReq": 10
} );
}
{
addData( "xp_value_craft", "foodexpansion:jelly",										{ "cooking": 15 } );
addData( "xp_value_craft", "foodexpansion:bacon_and_egg",								{ "cooking": 15 } );
addData( "xp_value_craft", "foodexpansion:carrot_seed_soup",							{ "cooking": 35 } );
addData( "xp_value_craft", "foodexpansion:compressed_flesh",							{ "cooking": 5 } );
addData( "xp_value_craft", "foodexpansion:chocolate_bar",								{ "cooking": 20 } );
addData( "xp_value_craft", "foodexpansion:spider_soup",									{ "cooking": 35 } );
addData( "xp_value_craft", "foodexpansion:nether_wart_soup",							{ "cooking": 35 } );
addData( "xp_value_craft", "foodexpansion:cactus_fruit",								{ "cooking": 10 } );
addData( "xp_value_craft", "foodexpansion:carrot_pie",									{ "cooking": 20 } );
addData( "xp_value_craft", "foodexpansion:melon_salad",									{ "cooking": 35 } );
addData( "xp_value_craft", "foodexpansion:dough",										{ "cooking": 10 } );
addData( "xp_value_craft", "foodexpansion:lollipop",									{ "cooking": 5 } );
addData( "xp_value_craft", "foodexpansion:beetroot_noodles",							{ "cooking": 35 } );
addData( "xp_value_craft", "foodexpansion:blaze_cream",									{ "cooking": 35 } );
addData( "xp_value_cook", "foodexpansion:bacon",										{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:egg",												{ "cooking": 7.5 } ); //for fried egg
addData( "xp_value_cook", "foodexpansion:squid",										{ "cooking": 7.5 } );
addData( "xp_value_cook", "foodexpansion:horse_meat",									{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:red_mushroom",										{ "cooking": 7.5 } ); //for cooked mushroom
addData( "xp_value_cook", "minecraft:brown_mushroom",									{ "cooking": 7.5 } ); //for cooked mushroom
addData( "xp_value_cook", "foodexpansion:bat_wing",										{ "cooking": 7.5 } );
addData( "xp_value_cook", "minecraft:beetroot_seed",									{ "cooking": 5 } ); //for roasted seeds
addData( "xp_value_cook", "minecraft:melon_seed",										{ "cooking": 5 } ); //for roasted seeds
addData( "xp_value_cook", "minecraft:pumpkin_seed",										{ "cooking": 5 } ); //for roasted seeds
addData( "xp_value_cook", "minecraft:wheat_seed",										{ "cooking": 5 } ); //for roasted seeds
addData( "xp_value_cook", "foodexpansion:dough",										{ "cooking": 7.5 } );
addData( "xp_value_cook", "foodexpansion:wolf_meat",									{ "cooking": 7.5 } );
addData( "xp_value_cook", "foodexpansion:ocelot_meat",									{ "cooking": 7.5 } );
addData( "xp_value_cook", "foodexpansion:parrot_meat",									{ "cooking": 7.5 } );
addData( "xp_value_cook", "foodexpansion:llama_meat",									{ "cooking": 7.5 } );
addData( "xp_value_cook", "foodexpansion:polar_bear_meat",								{ "cooking": 7.5 } );
addData( "info_cook", "foodexpansion:bacon",											{ "extraChance": 1.5 } );
addData( "info_cook", "minecraft:egg",													{ "extraChance": 1.5 } ); //for fried egg
addData( "info_cook", "foodexpansion:squid",											{ "extraChance": 1.5 } );
addData( "info_cook", "foodexpansion:horse_meat",										{ "extraChance": 1.5 } );
addData( "info_cook", "minecraft:red_mushroom",											{ "extraChance": 1.5 } ); //for cooked mushroom
addData( "info_cook", "minecraft:brown_mushroom",										{ "extraChance": 1.5 } ); //for cooked mushroom
addData( "info_cook", "foodexpansion:bat_wing",											{ "extraChance": 1.5 } );
addData( "info_cook", "minecraft:beetroot_seed",										{ "extraChance": 1.5 } ); //for roasted seeds
addData( "info_cook", "minecraft:melon_seed",											{ "extraChance": 1.5 } ); //for roasted seeds
addData( "info_cook", "minecraft:pumpkin_seed",											{ "extraChance": 1.5 } ); //for roasted seeds
addData( "info_cook", "minecraft:wheat_seed",											{ "extraChance": 1.5 } ); //for roasted seeds
addData( "info_cook", "foodexpansion:dough",											{ "extraChance": 1.5 } );
addData( "info_cook", "foodexpansion:wolf_meat",										{ "extraChance": 1.5 } );
addData( "info_cook", "foodexpansion:ocelot_meat",										{ "extraChance": 1.5 } );
addData( "info_cook", "foodexpansion:parrot_meat",										{ "extraChance": 1.5 } );
addData( "info_cook", "foodexpansion:llama_meat",										{ "extraChance": 1.5 } );
addData( "info_cook", "foodexpansion:polar_bear_meat",									{ "extraChance": 1.5 } );
}
{	
addData( "req_wear", "harcorebattletowers:evil_armorhelmet",							{ "endurance": 85 } );
addData( "req_wear", "harcorebattletowers:evil_armorbody",								{ "endurance": 85 } );
addData( "req_wear", "harcorebattletowers:evil_armorlegs",								{ "endurance": 85 } );
addData( "req_wear", "harcorebattletowers:evil_armorboots",								{ "endurance": 85 } );
addData( "req_weapon", "harcorebattletowers:double_headed_evil_axe",					{ "combat": 85 } );
addData( "req_weapon", "harcorebattletowers:evil_dagger",								{ "combat": 80 } );
}
{
	{
		addData( "req_weapon", "iceandfire:silver_sword",										{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:silver_shovel",										{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:silver_axe",											{ "combat": 25 } );
		addData( "req_weapon", "iceandfire:silver_pickaxe",										{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:copper_sword",										{ "combat": 15 } );
		addData( "req_weapon", "iceandfire:copper_shovel",										{ "combat": 15 } );
		addData( "req_weapon", "iceandfire:copper_axe",											{ "combat": 15 } );
		addData( "req_weapon", "iceandfire:copper_pickaxe",										{ "combat": 15 } );
		addData( "req_weapon", "iceandfire:dragonbone_sword",									{ "combat": 35 } );
		addData( "req_weapon", "iceandfire:dragonbone_shovel",									{ "combat": 35 } );
		addData( "req_weapon", "iceandfire:dragonbone_axe",										{ "combat": 35 } );
		addData( "req_weapon", "iceandfire:dragonbone_pickaxe",									{ "combat": 35 } );
		addData( "req_weapon", "iceandfire:dragonbone_sword_fire",								{ "combat": 50 } );
		addData( "req_weapon", "iceandfire:dragonbone_sword_ice",								{ "combat": 50 } );
		addData( "req_weapon", "iceandfire:dragonbone_sword_lightning",							{ "combat": 50 } );
		addData( "req_weapon", "iceandfire:hippogryph_sword",									{ "combat": 25 } );
		addData( "req_weapon", "iceandfire:myrmex_desert_sword",								{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:myrmex_desert_sword_venom",							{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:myrmex_jungle_sword",								{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:myrmex_jungle_sword_venom",							{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:tide_trident",										{ "combat": 50 } );
		addData( "req_weapon", "iceandfire:dragonsteel_fire_sword",								{ "combat": 60 } );
		addData( "req_weapon", "iceandfire:dragonsteel_ice_sword",								{ "combat": 60 } );
		addData( "req_weapon", "iceandfire:dragonsteel_lightning_sword",						{ "combat": 60 } );
		addData( "req_weapon", "iceandfire:dragonsteel_fire_axe",								{ "combat": 60 } );
		addData( "req_weapon", "iceandfire:dragonsteel_ice_axe",								{ "combat": 60 } );
		addData( "req_weapon", "iceandfire:dragonsteel_lightning_axe",							{ "combat": 60 } );
		addData( "req_weapon", "iceandfire:dread_sword",										{ "combat": 20 } );
		addData( "req_weapon", "iceandfire:dread_knight_sword",									{ "combat": 50 } );
		addData( "req_weapon", "iceandfire:dread_queen_sword",									{ "combat": 50 } );
		addData( "req_weapon", "iceandfire:troll_weapon_axe",									{ "combat": 30 } );
		addData( "req_weapon", "iceandfire:troll_weapon_column",								{ "combat": 30 } );
		addData( "req_weapon", "iceandfire:troll_weapon_column_forest",							{ "combat": 30 } );
		addData( "req_weapon", "iceandfire:troll_weapon_column_frost",							{ "combat": 30 } );
		addData( "req_weapon", "iceandfire:troll_weapon_hammer",								{ "combat": 30 } );
		addData( "req_weapon", "iceandfire:troll_weapon_trunk",									{ "combat": 30 } );
		addData( "req_weapon", "iceandfire:troll_weapon_trunk_frost",							{ "combat": 30 } );
	}
	{
		addData( "req_tool", "iceandfire:silver_pickaxe",										{ "mining": 15 } );
		addData( "req_tool", "iceandfire:silver_shovel",										{ "excavation": 15 } );
		addData( "req_tool", "iceandfire:silver_axe",											{ "woodcutting": 15 } );
		addData( "req_tool", "iceandfire:silver_hoe",											{ "farming": 15 } );
		addData( "req_tool", "iceandfire:copper_pickaxe",										{ "mining": 10 } );
		addData( "req_tool", "iceandfire:copper_shovel",										{ "excavation": 10 } );
		addData( "req_tool", "iceandfire:copper_axe",											{ "woodcutting": 10 } );
		addData( "req_tool", "iceandfire:copper_hoe",											{ "farming": 10 } );
		addData( "req_tool", "iceandfire:dragonbone_pickaxe",									{ "mining": 35 } );
		addData( "req_tool", "iceandfire:dragonbone_shovel",									{ "excavation": 35 } );
		addData( "req_tool", "iceandfire:dragonbone_axe",										{ "woodcutting": 35 } );
		addData( "req_tool", "iceandfire:dragonbone_hoe",										{ "farming": 35 } );
		addData( "req_tool", "iceandfire:myrmex_desert_pickaxe",								{ "mining": 15 } );
		addData( "req_tool", "iceandfire:myrmex_desert_shovel",									{ "excavation": 15 } );
		addData( "req_tool", "iceandfire:myrmex_desert_axe",									{ "woodcutting": 15 } );
		addData( "req_tool", "iceandfire:myrmex_desert_hoe",									{ "farming": 15 } );
		addData( "req_tool", "iceandfire:myrmex_jungle_pickaxe",								{ "mining": 15 } );
		addData( "req_tool", "iceandfire:myrmex_jungle_shovel",									{ "excavation": 15 } );
		addData( "req_tool", "iceandfire:mymrex_jungle_axe",									{ "woodcutting": 15 } );
		addData( "req_tool", "iceandfire:mymrex_jungle_hoe",									{ "farming": 15 } );
		addData( "req_tool", "iceandfire:dragonsteel_fire_pickaxe",								{ "mining": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_fire_shovel",								{ "excavation": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_fire_axe",									{ "woodcutting": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_fire_hoe",									{ "farming": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_ice_pickaxe",								{ "mining": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_ice_shovel",								{ "excavation": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_ice_axe",									{ "woodcutting": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_ice_hoe",									{ "farming": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_lightning_pickaxe",						{ "mining": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_lightning_shovel",							{ "excavation": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_lightning_axe",							{ "woodcutting": 35 } );
		addData( "req_tool", "iceandfire:dragonsteel_lightning_hoe",							{ "farming": 35 } );
	}
	{
		addData( "req_wear", "iceandfire:armor_silver_metal_helmet",							{ "endurance": 20 } );
		addData( "req_wear", "iceandfire:armor_silver_metal_chestplate",						{ "endurance": 20 } );
		addData( "req_wear", "iceandfire:armor_silver_metal_leggings",							{ "endurance": 20 } );
		addData( "req_wear", "iceandfire:armor_silver_metal_boots",								{ "endurance": 20 } );
		addData( "req_wear", "iceandfire:armor_copper_metal_helmet",							{ "endurance": 10 } );
		addData( "req_wear", "iceandfire:armor_copper_metal_chestplate",						{ "endurance": 10 } );
		addData( "req_wear", "iceandfire:armor_copper_metal_leggings",							{ "endurance": 10 } );
		addData( "req_wear", "iceandfire:armor_copper_metal_boots",								{ "endurance": 10 } );
		addData( "req_wear", "iceandfire:sheep_helmet",											{ "endurance": 5 } );
		addData( "req_wear", "iceandfire:sheep_chestplate",										{ "endurance": 5 } );
		addData( "req_wear", "iceandfire:sheep_leggings",										{ "endurance": 5 } );
		addData( "req_wear", "iceandfire:sheep_boots",											{ "endurance": 5 } );
		addData( "req_wear", "iceandfire:deathworm_yellow_helmet",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_yellow_chestplate",							{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_yellow_leggings",							{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_yellow_boots",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_white_helmet",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_white_chestplate",							{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_white_leggings",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_white_boots",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_red_helmet",									{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_red_chestplate",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_red_leggings",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:deathworm_red_boots",									{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_desert_helmet",									{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_desert_chestplate",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_desert_leggings",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_desert_boots",									{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_jungle_helmet",									{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_jungle_chestplate",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_jungle_leggings",								{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:myrmex_jungle_boots",									{ "endurance": 30 } );
		addData( "req_wear", "iceandfire:dragonsteel_fire_helmet",								{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_fire_chestplate",							{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_fire_leggings",							{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_fire_boots",								{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_ice_helmet",								{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_ice_chestplate",							{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_ice_leggings",								{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_ice_boots",								{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_lightning_helmet",							{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_lightning_chestplate",						{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_lightning_leggings",						{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:dragonsteel_lightning_boots",							{ "endurance": 70 } );
		addData( "req_wear", "iceandfire:armor_red_helmet",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_red_chestplate",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_red_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_red_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_green_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_green_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_green_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_green_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_blue_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_blue_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_blue_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_blue_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_bronze_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_bronze_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_bronze_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_bronze_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_gray_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_gray_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_gray_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_gray_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_white_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_white_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_white_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_white_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_sapphire_helmet",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_sapphire_chestplate",							{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_sapphire_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_sapphire_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_silver_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_silver_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_silver_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_silver_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_electric_helmet",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_electric_chestplate",							{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_electric_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_electric_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_amythest_helmet",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_amythest_chestplate",							{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_amythest_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_amythest_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_copper_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_copper_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_copper_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_copper_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_black_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_black_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_black_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:armor_black_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_blue_helmet",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_blue_chestplate",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_blue_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_blue_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_bronze_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_bronze_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_bronze_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_bronze_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_deepblue_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_deepblue_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_deepblue_leggings",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_deepblue_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_green_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_green_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_green_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_green_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_purple_helmet",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_purple_chestplate",								{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_purple_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_purple_boots",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_red_helmet",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_red_chestplate",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_red_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_red_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_teal_helmet",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_teal_chestplate",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_teal_leggings",									{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:tide_teal_boots",										{ "endurance": 60 } );
		addData( "req_wear", "iceandfire:forest_troll_leather_helmet",							{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:forest_troll_leather_chestplate",						{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:forest_troll_leather_leggings",						{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:forest_troll_leather_boots",							{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:frost_troll_leather_helmet",							{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:frost_troll_leather_chestplate",						{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:frost_troll_leather_leggings",							{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:frost_troll_leather_boots",							{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:mountain_troll_leather_helmet",						{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:mountain_troll_leather_chestplate",					{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:mountain_troll_leather_leggings",						{ "endurance": 25 } );
		addData( "req_wear", "iceandfire:mountain_troll_leather_boots",							{ "endurance": 25 } );
	}
	{
		addData( "xp_bonus_worn", "iceandfire:myrmex_jungle_helmet",							{ "agility": 5, "farming": 5, "combat": 5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_jungle_chestplate",						{ "agility": 5, "farming": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_jungle_leggings",							{ "agility": 5, "farming": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_jungle_boots",								{ "agility": 5, "farming": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_desert_helmet",							{ "agility": 5, "farming": 5, "combat": 5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_desert_chestplate",						{ "agility": 5, "farming": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_desert_leggings",							{ "agility": 5, "farming": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:myrmex_desert_boots",								{ "agility": 5, "farming": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_white_helmet",							{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_red_helmet",							{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_yellow_helmet",							{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_white_chestplate",						{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_red_chestplate",						{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_yellow_chestplate",						{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_white_leggings",						{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_red_leggings",							{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_yellow_leggings",						{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_white_boots",							{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_red_boots",								{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:deathworm_yellow_boots",							{ "agility": 5, "excavation": 5, "combat": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_copper_metal_helmet",						{ "combat": 5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_copper_metal_chestplate",					{ "combat": 5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_copper_metal_leggings",						{ "combat": 5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_copper_metal_boots",						{ "combat": 5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_silver_metal_helmet",						{ "endurance": 2.5, "combat": 5, "magic": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_silver_metal_chestplate",					{ "endurance": 2.5, "combat": 5, "magic": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_silver_metal_leggings",						{ "endurance": 2.5, "combat": 5, "magic": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:armor_silver_metal_boots",						{ "endurance": 2.5, "combat": 5, "magic": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:sheep_helmet",									{ "endurance": 2.5, "farming": 5, "woodcutting": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:sheep_chestplate",								{ "endurance": 2.5, "farming": 5, "woodcutting": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:sheep_leggings",									{ "endurance": 2.5, "farming": 5, "woodcutting": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:sheep_boots",										{ "endurance": 2.5, "farming": 5, "woodcutting": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:earplugs",										{ "endurance": 5, "farming": 2.5, "woodcutting": 2.5 } );
		addData( "xp_bonus_worn", "iceandfire:blindfold",										{ "endurance": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_bronze_helmet",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_bronze_chestplate",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_bronze_leggings",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_bronze_boots",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_green_helmet",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_green_chestplate",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_green_leggings",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_green_boots",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_red_helmet",									{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_red_chestplate",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_red_leggings",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_red_boots",									{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_purple_helmet",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_purple_chestplate",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_purple_leggings",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_purple_boots",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_blue_helmet",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_blue_chestplate",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_blue_leggings",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_blue_boots",									{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_deepblue_helmet",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_deepblue_chestplate",						{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_deepblue_leggings",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_deepblue_boots",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_teal_helmet",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_teal_chestplate",							{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_teal_leggings",								{ "swimming": 5 } );
		addData( "xp_bonus_worn", "iceandfire:tide_teal_boots",									{ "swimming": 5 } );
	}
	{
		addData( "xp_value_kill", "iceandfire:myrmex_worker",									{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:lightning_dragon",								{ "combat": 1000 } );
		addData( "xp_value_kill", "iceandfire:cockatrice",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:dread_beast",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:cyclops",											{ "combat": 100 } );
		addData( "xp_value_kill", "iceandfire:hippogryph",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:gorgon",											{ "combat": 40 } );
		addData( "xp_value_kill", "iceandfire:fire_dragon",										{ "combat": 1000 } );
		addData( "xp_value_kill", "iceandfire:dread_thrall",									{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:myrmex_swarmer",									{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:ice_dragon",										{ "combat": 1000 } );
		addData( "xp_value_kill", "iceandfire:deathworm",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:dread_horse",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:siren",											{ "combat": 40 } );
		addData( "xp_value_kill", "iceandfire:dread_lich_skull",								{ "combat": 50 } );
		addData( "xp_value_kill", "iceandfire:dread_lich",										{ "combat": 50 } );
		addData( "xp_value_kill", "iceandfire:sea_serpent",										{ "combat": 1000 } );
		addData( "xp_value_kill", "iceandfire:myrmex_royal",									{ "combat": 100 } );
		addData( "xp_value_kill", "iceandfire:dread_knight",									{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:hydra",											{ "combat": 100 } );
		addData( "xp_value_kill", "iceandfire:pixie",											{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:myrmex_queen",									{ "combat": 100 } );
		addData( "xp_value_kill", "iceandfire:troll",											{ "combat": 50 } );
		addData( "xp_value_kill", "iceandfire:myrmex_sentinel",									{ "combat": 45 } );
		addData( "xp_value_kill", "iceandfire:dread_scuttler",									{ "combat": 60 } );
		addData( "xp_value_kill", "iceandfire:amphithere",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:dread_ghoul",										{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:stymphalian_bird",								{ "combat": 35 } );
		addData( "xp_value_kill", "iceandfire:hippocampus",										{ "combat": 25 } );
		addData( "xp_value_kill", "iceandfire:myrmex_soldier",									{ "combat": 45 } );
	}
}
{
	addData( "xp_value_cook", "lycanitesmobs:raw_arisaur_meat",								{ "cooking": 40 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_silex_meat",								{ "cooking": 30 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_yale_meat",								{ "cooking": 35 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_pinky_meat",								{ "cooking": 40 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_ika_meat",									{ "cooking": 40 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_chupacabra_meat",							{ "cooking": 35 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_aspid_meat",								{ "cooking": 30 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_maka_meat",								{ "cooking": 40 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_yeti_meat",								{ "cooking": 40 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_concapede_meat",							{ "cooking": 40 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_joust_meat",								{ "cooking": 35 } );
	addData( "xp_value_cook", "lycanitesmobs:raw_krake_meat",								{ "cooking": 30 } );
	addData( "info_cook", "lycanitesmobs:raw_arisaur_meat", { "extraChance": 0.7 });
	addData( "info_cook", "lycanitesmobs:raw_silex_meat",									{ "extraChance": 0.7 } );
	addData( "info_cook", "lycanitesmobs:raw_yale_meat",									{ "extraChance": 0.7 } );
	addData( "info_cook", "lycanitesmobs:raw_pinky_meat", { "extraChance": 0.7 });
	addData( "info_cook", "lycanitesmobs:raw_ika_meat", { "extraChance": 0.7 });
	addData( "info_cook", "lycanitesmobs:raw_chupacabra_meat",								{ "extraChance": 0.7 } );
	addData( "info_cook", "lycanitesmobs:raw_aspid_meat",									{ "extraChance": 0.7 } );
	addData( "info_cook", "lycanitesmobs:raw_maka_meat", { "extraChance": 0.7 });
	addData( "info_cook", "lycanitesmobs:raw_yeti_meat", { "extraChance": 0.7 });
	addData( "info_cook", "lycanitesmobs:raw_concapede_meat", { "extraChance": 0.7 });
	addData( "info_cook", "lycanitesmobs:raw_joust_meat",									{ "extraChance": 0.7 } );
	addData( "info_cook", "lycanitesmobs:raw_krake_meat",									{ "extraChance": 0.7 } );
	{
		addData( "xp_value_kill", "lycanitesmobs:gorgomite",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:aglebemu",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:aspid",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:krake",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:afrit",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:arix",											{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:darkling",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:pixen",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:remobra",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:spriggan",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:calpod",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:chupacabra",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:clink",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:conba",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:dawon",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:eechetik",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:ent",											{ "woodcutting": 20 } );
		addData( "xp_value_kill", "lycanitesmobs:epion",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:eyewig",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:frostweaver",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:gnekk",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:jabberwock",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:lurker",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:reiver",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:tarantula",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:geist",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:ghoul",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:grue",											{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:barghest",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:erepede",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:feradon",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:geken",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:joustalpha",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:kobold",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:maug",											{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:quillbeast",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:ventoraptor",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:warg",											{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:geonach",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:sutiramu",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:wisp",											{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:banshee",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:cryptkeeper",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:herma",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:shambler",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:uvaraptor",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:vapula",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:volcan",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:wildkin",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:spectre",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:makaalpha",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:beholder",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:crusk",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:serpix",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:strider",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:sylph",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:triffid",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:troll",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:ettin",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:cockatrice",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:manticore",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:reaper",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:shade",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:cinder",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:djinn",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:tremor",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:xaphan",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:zephyr",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:argus",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:wendigo",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:vespid",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:vespidqueen",									{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:treant",										{ "combat": 10 } );
		addData( "xp_value_kill", "lycanitesmobs:abaia",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:abtu",											{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:raiko",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:roc",											{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:jengu",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:lacedon",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:ioray",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:roa",											{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:skylus",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:dweller",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:quetzodracl",									{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:thresher",										{ "combat": 30 } );
		addData( "xp_value_kill", "lycanitesmobs:zoataur",										{ "combat": 100 } );
		addData( "xp_value_kill", "lycanitesmobs:trite",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:cacodemon",									{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:lobber",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:archvile",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:wraith",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:salamander",									{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:belph",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:gorger",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:pinky",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:khalk",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:astaroth",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:behemoth",										{ "combat": 200 } );
		addData( "xp_value_kill", "lycanitesmobs:wraamon",										{ "combat": 250 } );
		addData( "xp_value_kill", "lycanitesmobs:morock",										{ "combat": 250 } );
		addData( "xp_value_kill", "lycanitesmobs:ignibus",										{ "combat": 500 } );
		addData( "xp_value_kill", "lycanitesmobs:amalgalich",									{ "combat": 900 } );
		addData( "xp_value_kill", "lycanitesmobs:asmodeus",										{ "combat": 900 } );
		addData( "xp_value_kill", "lycanitesmobs:rahovart",										{ "combat": 900 } );
		addData( "xp_value_kill", "lycanitesmobs:arisaur",										{ "farming": 20 } );
	}
	{
		addData( "req_use", "lycanitesmobs:whirlwindcharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:lightballcharge",									{ "combat": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:bloodsummoningstaff",								{ "magic": 50, "magic": 50, "combat": 50 } );
		addData( "req_use", "lycanitesmobs:crystalshardcharge",									{ "taming": 30, "crafting": 50 } );
		addData( "req_use", "lycanitesmobs:frostboltcharge",									{ "taming": 30, "magic": 20 } );
		addData( "req_use", "lycanitesmobs:tundracharge",										{ "taming": 30, "magic": 20 } );
		addData( "req_use", "lycanitesmobs:spectralboltcharge",									{ "taming": 30, "magic": 50 } );
		addData( "req_use", "lycanitesmobs:soulstone",											{ "taming": 30, "crafting": 50, "magic": 30 } );
		addData( "req_use", "lycanitesmobs:summoningstaff",										{ "magic": 10 } );
		addData( "req_use", "lycanitesmobs:venomshotcharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:planttreat",											{ "farming": 50, "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:dragontreat",										{ "combat": 50, "crafting": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:boulderblastcharge",									{ "mining": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:hellfireballcharge",									{ "taming": 30, "magic": 50 } );
		addData( "req_use", "lycanitesmobs:wormtreat",											{ "farming": 50, "taming": 30, "cooking": 35 } );
		addData( "req_use", "lycanitesmobs:beasttreat",											{ "taming": 30, "cooking": 50 } );
		addData( "req_use", "lycanitesmobs:throwingscythecharge",								{ "crafting": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:demonicblastcharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:bloodleechcharge",									{ "taming": 30, "magic": 50, "combat": 50 } );
		addData( "req_use", "lycanitesmobs:acidsplashcharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:savagesummoningstaff",								{ "magic": 50, "taming": 30, "combat": 50 } );
		addData( "req_use", "lycanitesmobs:lobdarklingscharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:undeadtreat",										{ "combat": 10, "crafting": 10, "taming": 10 } );
		addData( "req_use", "lycanitesmobs:soulkeydiamond",										{ "crafting": 50, "combat": 50 } );
		addData( "req_use", "lycanitesmobs:chaosorbcharge",										{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:stablesummoningstaff",								{ "taming": 30, "crafting": 50 } );
		addData( "req_use", "lycanitesmobs:aquatictreat",										{ "fishing": 10, "taming": 10, "crafting": 10 } );
		addData( "req_use", "lycanitesmobs:embercharge",										{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:demontreat",											{ "magic": 10, "farming": 10 } );
		addData( "req_use", "lycanitesmobs:soulgazer",											{ "crafting": 50, "combat": 50 } );
		addData( "req_use", "lycanitesmobs:soulkeyemerald",										{ "crafting": 60, "combat": 60 } );
		addData( "req_use", "lycanitesmobs:imptreat",											{ "cooking": 10, "taming": 10 } );
		addData( "req_use", "lycanitesmobs:lifedraincharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:devilstarcharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:aberrationtreat",									{ "combat": 10, "crafting": 10, "taming": 10 } );
		addData( "req_use", "lycanitesmobs:arthropodtreat",										{ "cooking": 10, "crafting": 10, "taming": 10 } );
		addData( "req_use", "lycanitesmobs:arcanelaserstormcharge",								{ "combat": 50, "taming": 30, "magic": 30 } );
		addData( "req_use", "lycanitesmobs:sturdysummoningstaff",								{ "smithing": 50, "taming": 30, "magic": 30 } );
		addData( "req_use", "lycanitesmobs:aetherwavecharge",									{ "magic": 50, "taming": 30 } );
		addData( "req_use", "lycanitesmobs:soulkey",											{ "crafting": 60, "combat": 60 } );
		addData( "req_use", "lycanitesmobs:aviantreat",											{ "cooking": 10, "crafting": 10 } );
		addData( "req_use", "lycanitesmobs:equipment_infuser",									{ "combat": 30, "magic": 30, "crafting": 30 } );
		addData( "req_use", "lycanitesmobs:equipmentforge_lesser",								{ "combat": 30, "crafting": 30 } );
		addData( "req_use", "lycanitesmobs:equipmentforge_master",								{ "combat": 60, "smithing": 60 } );
		addData( "req_use", "lycanitesmobs:equipmentforge_greater",								{ "combat": 70, "crafting": 70 } );
	}
	{
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_ironpaxel",						{ "smithing": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:whirlwindcharge",								{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lightballcharge",								{ "combat": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:immunizer",									{ "combat": 90, "crafting": 90 } );
		addData( "xp_value_craft", "lycanitesmobs:cleansingcrystal",							{ "combat": 90, "crafting": 90 } );
		addData( "xp_value_craft", "lycanitesmobs:bloodsummoningstaff",							{ "magic": 100, "magic": 100, "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:crystalshardcharge",							{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:frostboltcharge",								{ "magic": 100, "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:tundracharge",								{ "magic": 100, "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:spectralboltcharge",							{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulstone",									{ "taming": 100, "crafting": 100, "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:summoningstaff",								{ "magic": 100, "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_ironhilt",						{ "smithing": 60, "crafting": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:venomshotcharge",								{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:planttreat",									{ "farming": 100, "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_ironrod",						{ "smithing": 60, "crafting": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:dragontreat",									{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:boulderblastcharge",							{ "smithing": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:hellfireballcharge",							{ "taming": 100, "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:wormtreat",									{ "farming": 100, "cooking": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_goldscepterhead",				{ "crafting": 20 } );
		addData( "xp_value_craft", "lycanitesmobs:beasttreat",									{ "cooking": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:throwingscythecharge",						{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonicblastcharge",							{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:bloodleechcharge",							{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:acidsplashcharge",							{ "magic": 100, "taming": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:savagesummoningstaff",						{ "magic": 100, "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lobdarklingscharge",							{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:undeadtreat",									{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulkeydiamond",								{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:chaosorbcharge",								{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_woodenrod",						{ "crafting": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:stablesummoningstaff",						{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aquatictreat",								{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:embercharge",									{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demontreat",									{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_ironaxehead",					{ "smithing": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:soulgazer",									{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulkeyemerald",								{ "crafting": 150 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_woodenhilt",					{ "crafting": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:imptreat",									{ "cooking": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lifedraincharge",								{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:devilstarcharge",								{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_woodenpaxel",					{ "crafting": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:equipmentpart_ironpikejoint",					{ "smithing": 60 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrationtreat",								{ "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:arthropodtreat",								{ "cooking": 100, "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:arcanelaserstormcharge",						{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:sturdysummoningstaff",						{ "smithing": 100, "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aetherwavecharge",							{ "magic": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulkey",										{ "crafting": 200 } );
		addData( "xp_value_craft", "lycanitesmobs:aviantreat",									{ "cooking": 100, "crafting": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonebrick_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonebrick_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonebrick_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstone_stairs",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonetile_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonebrick_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonetile_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonebrick_fence",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonebrick_wall",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonepillar",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demoncrystal",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonetile_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowcrystal",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonebrick_fence",					{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonebrick_fence",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonepolished",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstone_stairs",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:summoningpedestal",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonechiseled",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonetile",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonepolished",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonechiseled",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstone",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonetile_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstone_slab",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonechiseled",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstone_slab",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonebrick_wall",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstone_slab",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonetile",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonepillar",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushcrystal",									{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstone_stairs",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertcrystal",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonebrick_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantcrystal",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstone_slab",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonebrick_fence",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonebrick_fence",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:propolis",									{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonepillar",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonechiseled",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulcubeaberrant",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonebrick_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulcubedemonic",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonebrick",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonepolished",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonebrick_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:soulcubeundead",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonetile_slab",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstone",									{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonebrick_wall",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonebrick_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonebrick_stairs",					{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstone_slab",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstone",									{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonepolished",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonebrick",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonetile",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonebrick_slab",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstone",									{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonepillar",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonepillar",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonebrick",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonebrick_wall",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonetile",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:desertstonebrick",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonetile_stairs",					{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstone_stairs",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonetile_slab",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonetile",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonetile_slab",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstone_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:shadowstonebrick_wall",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonebrick",								{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:veswax",										{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonepolished",							{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstonetile_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:lushstonetile_stairs",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:demonstone",									{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:aberrantstonechiseled",						{ "building": 100 } );
		addData( "xp_value_craft", "lycanitesmobs:pale_soup",									{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:explorers_risotto",							{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:searing_taco",								{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:paleo_salad",									{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:tropical_curry",								{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:devil_lasagna",								{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:battle_burrito",								{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:blood_chili",									{ "crafting": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:bulwark_burger",								{ "crafting": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:seashell_maki",								{ "crafting": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:amber_cake",									{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:lapis_fish_and_chips",						{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:caecilian_ramen",								{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:moss_pie",									{ "cooking": 50 } );
		addData( "xp_value_craft", "lycanitesmobs:peaks_kebab",									{ "cooking": 50 } );
	}
}
{
addData( "info_ore", "scalinghealth:heart_crystal_ore",									{ "extraChance": 0.25 } );
addData( "info_ore", "scalinghealth:power_crystal_ore",									{ "extraChance": 0.25 } );
}
{
addData( "req_tool", "treemendous:iron_lumber_axe",										{ "woodcutting": 25 } );
addData( "req_tool", "treemendous:golden_lumber_axe",									{ "woodcutting": 25 } );
addData( "req_tool", "treemendous:diamond_lumber_axe",									{ "woodcutting": 25 } );
addData( "req_tool", "treemendous:netherite_lumber_axe",								{ "woodcutting": 25 } );
addData( "req_place", "treemendous:douglas_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_break", "treemendous:douglas_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_grow", "treemendous:douglas_sapling",								{ "farming": 15 } );
addData( "xp_value_break", "treemendous:douglas_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:douglas_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:douglas_planks",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:douglas_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:douglas_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:douglas_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:douglas_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:douglas_wood",										{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:pine_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:pine_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:pine_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:pine_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:pine_wood",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:pine_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:pine_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:pine_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:pine_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:pine_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:pine_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:larch_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:larch_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:larch_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:larch_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:larch_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:larch_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:larch_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:larch_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:larch_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:larch_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:larch_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:fir_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:fir_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:fir_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:fir_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:fir_wood",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:fir_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:fir_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:fir_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:fir_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:fir_log",												{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:fir_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:maple_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:maple_sapling",									{ "farming": 15 } );
addData( "req_place", "treemendous:red_maple_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:red_maple_sapling",								{ "farming": 15 } );
addData( "req_place", "treemendous:brown_maple_sapling",								{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:brown_maple_sapling",							{ "farming": 15 } );
addData( "xp_value_break", "treemendous:maple_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:maple_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:maple_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:maple_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:maple_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_break", "treemendous:red_maple_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_break", "treemendous:brown_maple_leaves",							{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:maple_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:maple_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:maple_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:maple_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:japanese_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:japanese_sapling",								{ "farming": 15 } );
addData( "xp_value_break", "treemendous:japanese_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:japanese_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:japanese_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:japanese_planks",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:japanese_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:japanese_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:japanese_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:japanese_log",										{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:japanese_wood",										{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:beech_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:beech_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:beech_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:beech_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:beech_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:beech_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:beech_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:beech_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:beech_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:beech_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:beech_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:cherry_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:cherry_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:cherry_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:cherry_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:cherry_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:cherry_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:cherry_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:cherry_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:cherry_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:cherry_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:cherry_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:alder_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:alder_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:alder_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:alder_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:alder_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:alder_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:alder_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:alder_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:alder_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:alder_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:alder_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:chestnut_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:chestnut_sapling",								{ "farming": 15 } );
addData( "xp_value_break", "treemendous:chestnut_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:chestnut_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:chestnut_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:chestnut_planks",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:chestnut_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:chestnut_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:chestnut_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:chestnut_log",										{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:chestnut_wood",										{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:plane_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:plane_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:plane_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:plane_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:plane_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:plane_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:plane_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:plane_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:plane_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:plane_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:plane_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:ash_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:ash_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:ash_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:ash_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:ash_wood",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:ash_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:ash_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:ash_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:ash_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:ash_log",												{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:ash_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:linden_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:linden_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:linden_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:linden_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:linden_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:linden_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:linden_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:linden_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:linden_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:linden_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:linden_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:robinia_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:robinia_sapling",								{ "farming": 15 } );
addData( "xp_value_break", "treemendous:robinia_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:robinia_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:robinia_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:robinia_planks",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:robinia_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:robinia_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:robinia_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:robinia_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:robinia_wood",										{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:willow_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:willow_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:willow_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:willow_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:willow_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:willow_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:willow_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:willow_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:willow_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:willow_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:willow_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:pomegranate_sapling",								{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:pomegranate_sapling",							{ "farming": 15 } );
addData( "xp_value_break", "treemendous:pomegranate_sapling",							{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:pomegranate_log",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:pomegranate_wood",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:pomegranate_planks",							{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:pomegranate_leaves",							{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:pomegranate_log",								{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:pomegranate_log",									{ "extraChance": 1 } );
addData( "info_log", "treemendous:pomegranate_log",										{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:pomegranate_wood",									{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:magnolia_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:magnolia_sapling",								{ "farming": 15 } );
addData( "xp_value_break", "treemendous:magnolia_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:magnolia_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:magnolia_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:magnolia_planks",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:magnolia_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:magnolia_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:magnolia_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:magnolia_log",										{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:magnolia_wood",										{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:walnut_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:walnut_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:walnut_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:walnut_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:walnut_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:walnut_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:walnut_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:walnut_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:walnut_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:walnut_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:walnut_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:cedar_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:cedar_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:cedar_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:cedar_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:cedar_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:cedar_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:cedar_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:cedar_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:cedar_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:cedar_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:cedar_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:poplar_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:poplar_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:poplar_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:poplar_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:poplar_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:poplar_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:poplar_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:poplar_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:poplar_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:poplar_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:poplar_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:elm_sapling",										{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:elm_sapling",									{ "farming": 15 } );
addData( "xp_value_break", "treemendous:elm_sapling",									{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:elm_log",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:elm_wood",										{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:elm_planks",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:elm_leaves",									{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:elm_log",										{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:elm_log",											{ "extraChance": 1 } );
addData( "info_log", "treemendous:elm_log",												{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:elm_wood",											{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:rainbow_eucalyptus_sapling",							{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:rainbow_eucalyptus_sapling",						{ "farming": 15 } );
addData( "xp_value_break", "treemendous:rainbow_eucalyptus_sapling",					{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:rainbow_eucalyptus_log",						{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:rainbow_eucalyptus_wood",						{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:rainbow_eucalyptus_planks",						{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:rainbow_eucalyptus_leaves",						{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:rainbow_eucalyptus_log",						{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:rainbow_eucalyptus_log",							{ "extraChance": 1 } );
addData( "info_log", "treemendous:rainbow_eucalyptus_log",								{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:rainbow_eucalyptus_wood",								{ "extraChance": 0.65 } );
addData( "req_place", "treemendous:juniper_sapling",									{ "farming": 15, "woodcutting": 30 } );
addData( "xp_value_grow", "treemendous:juniper_sapling",								{ "farming": 15 } );
addData( "xp_value_break", "treemendous:juniper_sapling",								{ "woodcutting": 10 } );
addData( "xp_value_break", "treemendous:juniper_log",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:juniper_wood",									{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:juniper_planks",								{ "woodcutting": 5 } );
addData( "xp_value_break", "treemendous:juniper_leaves",								{ "woodcutting": 1.5 } );
addData( "xp_value_smelt", "treemendous:juniper_log",									{ "smithing": 0.25 } );
addData( "info_smelt", "treemendous:juniper_log",										{ "extraChance": 1 } );
addData( "info_log", "treemendous:juniper_log",											{ "extraChance": 0.65 } );
addData( "info_log", "treemendous:juniper_wood",										{ "extraChance": 0.65 } );
}
function addData2( dataKey, regKey, entryKey, entryObject, probe )
{
	if( probe != null )
		console.log( `Warning: addData has 1 too many arguments at "${dataKey}" -> ${regKey} -> ${entryKey} -> ${stringify( entryObject )}: ${probe}` );

	dataKey = dataKey.toString();
	regKey = regKey.toString();
	entryKey = entryKey.toString();

	if( entryObject.constructor != jsonConstructor )
	{
		console.log( `Error: "${stringify( entryObject )}" is not a json object! -> "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		return;
	}

	if( dataKey.includes( " " ) )
	{
		console.log( `Warning: "${dataKey}" has a space in it! "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		dataKey = dataKey.replace( / /g, "" );
	}
	if( regKey.includes( " " ) )
	{
		console.log( `Warning: "${regKey}" has a space in it! "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		regKey = regKey.replace( / /g, "" );
	}
	if( entryKey.includes( " " ) )
	{
		console.log( `Warning: "${entryKey}" has a space in it! "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
		entryKey = entryKey.replace( / /g, "" );
	}
	
	Object.keys( entryObject ).forEach( key =>
	{
		if( key.includes( " " ) )
		{
			console.log( `Warning: "${key}" has a space in it! -> "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
			entryObject[ key.replace( / /g, "" ) ] = entryObject[ key ];
			delete entryObject[ key ];
		}
	});

	if( validKeys2.includes( dataKey ) )
	{
		if( data2[ dataKey ] == null )
			data2[ dataKey ] = {};
		if( data2[ dataKey ][ regKey ] == null )
			data2[ dataKey ][ regKey ] = {};
		
		if( data2[ dataKey ][ regKey ][ entryKey ] != null )
			console.log( `${++dupes2} Warning: duplicate entry of ${entryKey} in ${regKey} in ${dataKey}` )
		data2[ dataKey ][ regKey ][ entryKey ] = entryObject;
	}
	else
		console.log( `invalid key "${dataKey}" -> "${regKey}" -> "${entryKey}" -> ${ stringify( entryObject ) }` );
}

function addData( dataKey, regKey, entryObject, probe )
{
	// Debug
	// if( /*dataKey == "req_wear" || dataKey == "req_tool" || dataKey == "req_weapon" ||*/ dataKey == "req_enchant" || dataKey == "req_craft" || dataKey == "req_place" || dataKey == "req_break" || dataKey == "req_kill" )
	// Object.keys( entryObject ).forEach( key =>
	// {
	// 	if( entryObject[ key ] >= 40 )
	// 		console.log( `${dataKey}, ${regKey}, ${key}: ${entryObject[ key ]}` );
	// });

	if( dataKey == "skills" )
		validSkills.push( regKey );

	if( probe != null )
		console.log( `Warning: addData has 1 too many arguments at "${dataKey}" -> "${regKey}" -> ${stringify( entryObject ) }: ${probe}` );

	dataKey = dataKey.toString();
	regKey = regKey.toString();

	if( entryObject.constructor != jsonConstructor )
	{
		console.log( `Error: "${stringify( entryObject )}" is not a json object! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
		return;
	}

	if( dataKey.includes( " " ) )
	{
		console.log( `Warning: "${dataKey}" has a space in it! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
		dataKey = dataKey.replace( / /g, "" );
	}
	if( regKey.includes( " " ) )
	{
		console.log( `Warning: "${regKey}" has a space in it! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
		regKey = regKey.replace( / /g, "" );
	}

	if( dataKey != "level_up_command" )
	{
		Object.keys( entryObject ).forEach( key =>
		{
			if( key.includes( " " ) )
			{
				console.log( `Warning: "${key}" has a space in it! -> "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
				entryObject[ key.replace( / /g, "" ) ] = entryObject[ key ];
				delete entryObject[ key ];
			}
		});
	}

	if( validKeys.includes( dataKey ) )
	{
		if( data[ dataKey ] == null )
		data[ dataKey ] = {};
	
		if( data[ dataKey ][ regKey ] != null )
			console.log( `${++dupes} Warning: duplicate entry of ${regKey} in ${dataKey}` );
		data[ dataKey ][ regKey ] = entryObject;
	}
	else
		console.log( `invalid key "${dataKey}" -> "${regKey}" -> ${ stringify( entryObject ) }` );
}

function stringify( object )
{
	return JSON.stringify( object, null, "\t" ).replace(/: {\n([\t]*)\t/g, ":\n$1{\n$1\t" );
}

validKeys.forEach( dataKey =>
{
	if( data[ dataKey ] != null )
	{
		Object.keys( data[ dataKey ] ).forEach( regKey =>
		{
			Object.keys( data[ dataKey ][ regKey ] ).forEach( entry =>
			{
				if( validInfoKeys.includes( dataKey ) )
				{
					if( !validInfo.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "biome_mob_multiplier" )
				{
					if( !validBiomeMobMultiplier.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "fish_pool" )
				{
					if( !validFishPool.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "fish_enchant_pool" )
				{
					if( !validFishEnchantPool.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "level_up_command" )
				{
					if( !validSkills.includes( regKey ) )
						console.log( `"${dataKey}" unexpected value "${regKey}" at "${dataKey}"` );
				}
				else if( dataKey == "player_specific" )
				{
					if( !validPlayerSpecific.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "block_specific" )
				{
					if( !validBlockSpecific.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "item_specific" )
				{
					if( !validItemSpecific.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "skills" )
				{
					if( !validSkillsInfo.includes( entry ) )
						console.log( `${dataKey} unexpected value "${entry}" at "${regKey}"` );
				}
				else if( dataKey == "vein_blacklist" || dataKey == "mob_rare_drop" || dataKey == "biome_effect_negative" || dataKey == "biome_effect_positive" )
				{
					
				}
				else
				{
					if( !validSkills.includes( entry ) )
						console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}"` );
				}
				if( entry != "salvageItem" && parseFloat( data[ dataKey ][ regKey ][ entry ] ).toString() == "NaN" )
					console.log( `"${dataKey}" not a valid number "${entry}" at "${regKey}"` );
			
				blacklistChars.forEach( blacklistChar =>
				{
					if( entry.includes( blacklistChar ) && dataKey != "level_up_command" )
						console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${entry}" at "${regKey}"` );
					if( regKey.includes( blacklistChar ) )
						console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${regKey}" at "${entry}" at "${regKey}"` );
					if( dataKey.includes( blacklistChar ) )
						console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${dataKey}" at "${entry}" at "${regKey}"` );
				});
			});
		});
	}
	else
		console.log( `You can also (optionally) use "${dataKey}".` );
});
validKeys2.forEach( dataKey =>
	{
		if( data2[ dataKey ] != null )
		{
			Object.keys( data2[ dataKey ] ).forEach( regKey =>
			{
				Object.keys( data2[ dataKey ][ regKey ] ).forEach( entryKey =>
				{
					Object.keys( data2[ dataKey ][ regKey ][ entryKey ] ).forEach( value =>
					{
						if( dataKey == "salvage" )
						{
							if( !validSalvage.includes( value ) )
								console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}" at ${entryKey}` );
						}
						else if( dataKey == "treasure" )
						{
							if( !validTreasure.includes( value ) )
								console.log( `"${dataKey}" unexpected value "${entry}" at "${regKey}" at ${entryKey}` );
						}
						else if( dataKey == "req_use_enchantment" )
						{
							if( isNaN( parseFloat( entryKey ) ) )
								console.log( `"${dataKey}" unexpected non-number value "${entryKey}" at "${regKey}"` );
							if( !validSkills.includes( value ) )
							console.log( `"${dataKey}" unexpected skill "${value}" at "${regKey}", "${entryKey}"` );
						}

						blacklistChars.forEach( blacklistChar =>
						{
							if( value.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${value}" at "${entryKey}" at "${regKey}"` );
							if( entryKey.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${entryKey}" at "${value}" at "${entryKey}" at "${regKey}"` );
							if( regKey.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${regKey}" at "${value}" at "${entryKey}" at "${regKey}"` );
							if( dataKey.includes( blacklistChar ) )
								console.log( `"${dataKey}" unexpected character '${blacklistChar}' in "${dataKey}" at "${value}" at "${entryKey}" at "${regKey}"` );
						});
					});
				});
			});
		}
		else
			console.log( `You can also (optionally) use "${dataKey}".` );
	});
Object.keys( data ).forEach( key =>
{
	if( !oldData[ key ] )
		oldData[ key ] = {};
	Object.keys( data[ key ] ).forEach( innerKey =>
	{
		oldData[ key ][ innerKey ] = data[ key ][ innerKey ];
	});
});
Object.keys( data2 ).forEach( key =>
{
	if( !oldData2[ key ] )
		oldData2[ key ] = {};
	Object.keys( data2[ key ] ).forEach( innerKey =>
	{
		oldData2[ key ][ innerKey ] = data2[ key ][ innerKey ];
	});
});
validKeys.forEach( key =>
{
	if( oldData[ key ] )
	{
		fs.writeFileSync( `./data/${key}.json`, stringify( oldData[ key ] ) );
	}
});
validKeys2.forEach( key =>
{
	if( oldData2[ key ] )
	{
		fs.writeFileSync( `./data/${key}.json`, stringify( oldData2[ key ] ) );
	}
});
console.log( "JSON Successfully built!" );

module.exports.data = data;
module.exports.data2 = data2;
