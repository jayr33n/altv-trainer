import WeaponHash from "../enums/weaponHash"

interface WeaponObject {
    name: string
    description?: string
}

// https://gist.github.com/root-cause/3f29d38179b12245a003fb4fff615335
export default class WeaponCollection {
    weapons: Record<number, WeaponObject> = {}

    constructor() {
        this.weapons[WeaponHash.Dagger] = { name: "wt_dagger", description: "wtd_dagger" }
        this.weapons[WeaponHash.Bat] = { name: "wt_bat", description: "wtd_bat" }
        this.weapons[WeaponHash.Bottle] = { name: "wt_bottle", description: "wtd_bottle" }
        this.weapons[WeaponHash.Crowbar] = { name: "wt_crowbar", description: "wtd_crowbar" }
        this.weapons[WeaponHash.Unarmed] = { name: "wt_unarmed" }
        this.weapons[WeaponHash.Flashlight] = { name: "wt_flashlight", description: "wtd_flashlight" }
        this.weapons[WeaponHash.GolfClub] = { name: "wt_golfclub", description: "wtd_golfclub" }
        this.weapons[WeaponHash.Hammer] = { name: "wt_hammer", description: "wtd_hammer" }
        this.weapons[WeaponHash.Hatchet] = { name: "wt_hatchet", description: "wtd_hatchet" }
        this.weapons[WeaponHash.KnuckleDusters] = { name: "wt_knuckle", description: "wtd_knuckle" }
        this.weapons[WeaponHash.Knife] = { name: "wt_knife", description: "wtd_knife" }
        this.weapons[WeaponHash.Machete] = { name: "wt_machete", description: "wtd_machete" }
        this.weapons[WeaponHash.Switchblade] = { name: "wt_swblade", description: "wtd_swblade" }
        this.weapons[WeaponHash.Nightstick] = { name: "wt_ngtstk", description: "wtd_ngtstk" }
        this.weapons[WeaponHash.PipeWrench] = { name: "wt_wrench", description: "wtd_wrench" }
        this.weapons[WeaponHash.BattleAxe] = { name: "wt_battleaxe", description: "wtd_battleaxe" }
        this.weapons[WeaponHash.PoolCue] = { name: "wt_poolcue", description: "wtd_poolcue" }
        this.weapons[WeaponHash.StoneHatchet] = { name: "wt_shatchet", description: "wtd_shatchet" }
        this.weapons[WeaponHash.Pistol] = { name: "wt_pist", description: "wt_pist_desc" }
        this.weapons[WeaponHash.PistolMk2] = { name: "wt_pist2", description: "wtd_pist2" }
        this.weapons[WeaponHash.CombatPistol] = { name: "wt_pist_cbt", description: "wtd_pist_cbt" }
        this.weapons[WeaponHash.APPistol] = { name: "wt_pist_ap", description: "wtd_pist_ap" }
        this.weapons[WeaponHash.StunGun] = { name: "wt_stun", description: "wtd_stun" }
        this.weapons[WeaponHash.Pistol50] = { name: "wt_pist_50", description: "wtd_pist_50" }
        this.weapons[WeaponHash.SNSPistol] = { name: "wt_snspistol", description: "wtd_snspistol" }
        this.weapons[WeaponHash.SNSPistolMk2] = { name: "wt_snspistol2", description: "wtd_snspistol2" }
        this.weapons[WeaponHash.HeavyPistol] = { name: "wt_hvypistol", description: "wtd_hvypistol" }
        this.weapons[WeaponHash.VintagePistol] = { name: "wt_vpistol", description: "wtd_vpistol" }
        this.weapons[WeaponHash.FlareGun] = { name: "wt_flaregun", description: "wtf_flaregun" }
        this.weapons[WeaponHash.MarksmanPistol] = { name: "wt_mkpistol", description: "wtd_mkpistol" }
        this.weapons[WeaponHash.HeavyRevolver] = { name: "wt_revolver", description: "wtd_revolver" }
        this.weapons[WeaponHash.HeavyRevolverMk2] = { name: "wt_revolver2", description: "wtd_revolver2" }
        this.weapons[WeaponHash.DoubleActionRevolver] = { name: "wt_rev_da", description: "wtd_rev_da" }
        this.weapons[WeaponHash.UpNAtomizer] = { name: "wt_raypistol", description: "wtd_raypistol" }
        this.weapons[WeaponHash.CeramicPistol] = { name: "wt_cerpst", description: "wtd_cerpst" }
        this.weapons[WeaponHash.NavyRevolver] = { name: "wt_rev_nv", description: "wtd_rev_nv" }
        this.weapons[WeaponHash.MicroSMG] = { name: "wt_smg_mcr", description: "wtd_smg_mcr" }
        this.weapons[WeaponHash.SMG] = { name: "wt_smg", description: "wtd_smg" }
        this.weapons[WeaponHash.SMGMk2] = { name: "wt_smg2", description: "wtd_smg2" }
        this.weapons[WeaponHash.AssaultSMG] = { name: "wt_smg_asl", description: "wtd_smg_asl" }
        this.weapons[WeaponHash.CombatPDW] = { name: "wt_combatpdw", description: "wtd_combatpdw" }
        this.weapons[WeaponHash.MachinePistol] = { name: "wt_mchpist", description: "wtd_mchpist" }
        this.weapons[WeaponHash.MiniSMG] = { name: "wt_minismg", description: "wtd_minismg" }
        this.weapons[WeaponHash.UnholyHellbringer] = { name: "wt_raycarbine", description: "wtd_raycarbine" }
        this.weapons[WeaponHash.PumpShotgun] = { name: "wt_sg_pmp", description: "wtd_sg_pmp" }
        this.weapons[WeaponHash.PumpShotgunMk2] = { name: "wt_sg_pmp2", description: "wtd_sg_pmp2" }
        this.weapons[WeaponHash.SawedOffShotgun] = { name: "wt_sg_sof", description: "wtd_sg_sof" }
        this.weapons[WeaponHash.AssaultShotgun] = { name: "wt_smg_asl", description: "wtd_smg_asl" }
        this.weapons[WeaponHash.BullpupShotgun] = { name: "wt_sg_blp", description: "wtd_sg_blp" }
        this.weapons[WeaponHash.Musket] = { name: "wt_musket", description: "wtd_musket" }
        this.weapons[WeaponHash.HeavyShotgun] = { name: "wt_hvyshgn", description: "wtd_hvyshgn" }
        this.weapons[WeaponHash.DoubleBarrelShotgun] = { name: "wt_dbshgn", description: "wtd_dbshgn" }
        this.weapons[WeaponHash.SweeperShotgun] = { name: "wt_autoshgn", description: "wtd_autoshgn" }
        this.weapons[WeaponHash.AssaultRifle] = { name: "wt_rifle_asl", description: "wtd_rifle_asl" }
        this.weapons[WeaponHash.AssaultRifleMk2] = { name: "wt_rifle_asl2", description: "wtd_rifle_asl2" }
        this.weapons[WeaponHash.CarbineRifle] = { name: "wt_rifle_cbn", description: "wtd_rifle_cbn" }
        this.weapons[WeaponHash.CarbineRifleMk2] = { name: "wt_rifle_cbn2", description: "wtd_rifle_cbn2" }
        this.weapons[WeaponHash.AdvancedRifle] = { name: "wt_rifle_adv", description: "wtd_rifle_adv" }
        this.weapons[WeaponHash.SpecialCarbine] = { name: "wt_spcarbine", description: "wtd_spcarbine" }
        this.weapons[WeaponHash.SpecialCarbineMk2] = { name: "wt_spcarbine2", description: "wtd_spcarbine2" }
        this.weapons[WeaponHash.BullpupRifle] = { name: "wt_bullrifle", description: "wtd_bullrifle" }
        this.weapons[WeaponHash.BullpupRifleMk2] = { name: "wt_bullrifle2", description: "wtd_bullrifle2" }
        this.weapons[WeaponHash.CompactRifle] = { name: "wt_cmprifle", description: "wtd_cmprifle" }
        this.weapons[WeaponHash.MG] = { name: "wt_mg", description: "wtd_mg" }
        this.weapons[WeaponHash.CombatMG] = { name: "wt_mg_cbt", description: "wtd_mg_cbt" }
        this.weapons[WeaponHash.CombatMGMk2] = { name: "wt_mg_cbt2", description: "wtd_mg_cbt2" }
        this.weapons[WeaponHash.Gusenberg] = { name: "wt_gusnbrg", description: "wtd_gusnbrg" }
        this.weapons[WeaponHash.SniperRifle] = { name: "wt_snip_rif", description: "wtd_snip_rif" }
        this.weapons[WeaponHash.HeavySniper] = { name: "wt_snip_hvy", description: "wtd_snip_hvy" }
        this.weapons[WeaponHash.HeavySniperMk2] = { name: "wt_snip_hvy2", description: "wtd_snip_hvy2" }
        this.weapons[WeaponHash.MarksmanRifle] = { name: "wt_mkrifle", description: "wtd_mkrifle" }
        this.weapons[WeaponHash.MarksmanRifleMk2] = { name: "wt_mkrifle2", description: "wtd_mkrifle2" }
        this.weapons[WeaponHash.RPG] = { name: "wt_rpg", description: "wtd_rpg" }
        this.weapons[WeaponHash.GrenadeLauncher] = { name: "wt_cmpgl", description: "wtd_cmpgl" }
        this.weapons[WeaponHash.TearGasLauncher] = { name: "wt_gl_smoke", description: "wtd_gl_smoke" }
        this.weapons[WeaponHash.Minigun] = { name: "wt_minigun", description: "wtd_minigun" }
        this.weapons[WeaponHash.FireworkLauncher] = { name: "wt_firewrk", description: "wtd_firewrk" }
        this.weapons[WeaponHash.Railgun] = { name: "wt_railgun", description: "wtd_railgun" }
        this.weapons[WeaponHash.HomingLauncher] = { name: "wt_homlnch", description: "wtd_homlnch" }
        this.weapons[WeaponHash.CompactGrenadeLauncher] = { name: "wt_cmpgl", description: "wtd_cmpgl" }
        this.weapons[WeaponHash.Widowmaker] = { name: "wt_rayminigun", description: "wtd_rayminigun" }
        this.weapons[WeaponHash.Grenade] = { name: "wt_gnade", description: "wtd_gnade" }
        this.weapons[WeaponHash.BZGas] = { name: "wt_bzgas", description: "wtd_bzgas" }
        this.weapons[WeaponHash.TearGas] = { name: "wt_gnade_smk", description: "wtd_gnade_smk" }
        this.weapons[WeaponHash.Flare] = { name: "wt_flare", description: "wtd_flare" }
        this.weapons[WeaponHash.Molotov] = { name: "wt_molotov", description: "wtd_molotov" }
        this.weapons[WeaponHash.StickyBomb] = { name: "wt_gnade_stk", description: "wtd_gnade_stk" }
        this.weapons[WeaponHash.ProximityMine] = { name: "wt_prxmine", description: "wtd_prxmine" }
        this.weapons[WeaponHash.Snowball] = { name: "wt_snwball", description: "wtd_snwball" }
        this.weapons[WeaponHash.PipeBomb] = { name: "wt_pipebomb", description: "wtd_pipebomb" }
        this.weapons[WeaponHash.Ball] = { name: "wt_ball", description: "wtd_ball" }
        this.weapons[WeaponHash.JerryCan] = { name: "wt_petrol", description: "wtd_petrol" }
        this.weapons[WeaponHash.FireExtinguisher] = { name: "wt_fire", description: "wtd_fire" }
        //this.weapons[WeaponHash.Parachute] = { name: "", description: "" }
        this.weapons[WeaponHash.HazardousJerryCan] = { name: "wt_hazardcan", description: "wtd_hazardcan" }
    }
}
