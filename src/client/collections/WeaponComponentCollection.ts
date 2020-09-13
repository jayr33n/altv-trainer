import WeaponHash from "../enums/WeaponHash"

interface WeaponComponent {
    key: string
    name: string
    description?: string
}

// https://gist.github.com/root-cause/3f29d38179b12245a003fb4fff615335
export default class WeaponComponentCollection {
    components: { [id: number]: WeaponComponent[] } = {}

    constructor() {
        this.components[WeaponHash.KnuckleDusters] = [
            { key: "component_knuckle_varmod_pimp", name: "wct_knuck_02" },
            { key: "component_knuckle_varmod_ballas", name: "wct_knuck_bg" },
            { key: "component_knuckle_varmod_dollar", name: "wct_knuck_dlr" },
            { key: "component_knuckle_varmod_diamond", name: "wct_knuck_dmd" },
            { key: "component_knuckle_varmod_hate", name: "wct_knuck_ht" },
            { key: "component_knuckle_varmod_love", name: "wct_knuck_lv" },
            { key: "component_knuckle_varmod_player", name: "wct_knuck_pc" },
            { key: "component_knuckle_varmod_king", name: "wct_knuck_slg" },
            { key: "component_knuckle_varmod_vagos", name: "wct_knuck_vg" }
        ]
        this.components[WeaponHash.Switchblade] = [
            { key: "component_switchblade_varmod_var1", name: "wct_sb_var1" },
            { key: "component_switchblade_varmod_var2", name: "wct_sb_var2" }
        ]
        this.components[WeaponHash.Pistol] = [
            { key: "component_pistol_clip_02", name: "wct_clip2", description: "wcd_p_clip2" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_supp_02", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_pistol_varmod_luxe", name: "wct_var_gold" }
        ]
        this.components[WeaponHash.PistolMk2] = [
            { key: "component_pistol_mk2_clip_02", name: "wct_clip2", description: "wcd_clip2" },
            { key: "component_pistol_mk2_clip_tracer", name: "wct_clip_tr", description: "wcd_clip_tr" },
            { key: "component_pistol_mk2_clip_incendiary", name: "wct_clip_inc", description: "wcd_clip_inc" },
            { key: "component_pistol_mk2_clip_hollowpoint", name: "wct_clip_hp", description: "wcd_clip_hp" },
            { key: "component_pistol_mk2_clip_fmj", name: "wct_clip_fmj", description: "wcd_clip_fmj" },
            { key: "component_at_pi_rail", name: "wct_scope_pi", description: "wcd_scope_pi" },
            { key: "component_at_pi_flsh_02", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_supp_02", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_at_pi_comp", name: "wct_comp", description: "wcd_comp" }
        ]
        this.components[WeaponHash.CombatPistol] = [
            { key: "component_combatpistol_clip_02", name: "wct_clip2", description: "wcd_cp_clip2" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_combatpistol_varmod_lowrider", name: "wct_var_gold" }
        ]
        this.components[WeaponHash.Pistol50] = [
            { key: "component_pistol50_clip_02", name: "wct_clip2", description: "wcd_p50_clip2" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_ar_supp_02", name: "wct_supp", description: "wcd_ar_supp2" },
            { key: "component_pistol50_varmod_luxe", name: "wct_var_sil" }
        ]
        this.components[WeaponHash.SNSPistol] = [
            { key: "component_snspistol_clip_02", name: "wct_clip2", description: "wcd_snsp_clip2" },
            { key: "component_snspistol_varmod_lowrider", name: "wct_var_wood" }
        ]
        this.components[WeaponHash.SNSPistolMk2] = [
            { key: "component_snspistol_mk2_clip_02", name: "wct_clip2", description: "wcd_clip2" },
            { key: "component_snspistol_mk2_clip_tracer", name: "wct_clip_tr", description: "wcd_clip_tr_rv" },
            { key: "component_snspistol_mk2_clip_incendiary", name: "wct_clip_inc", description: "wcd_clip_inc_ns" },
            { key: "component_snspistol_mk2_clip_hollowpoint", name: "wct_clip_hp", description: "wcd_clip_hp_rv" },
            { key: "component_snspistol_mk2_clip_fmj", name: "wct_clip_fmj", description: "wcd_clip_fmj_rv" },
            { key: "component_at_pi_flsh_03", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_rail_02", name: "wct_scope_pi", description: "wcd_scope_pi" },
            { key: "component_at_pi_supp_02", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_at_pi_comp_02", name: "wct_comp", description: "wcd_comp" }
        ]
        this.components[WeaponHash.HeavyPistol] = [
            { key: "component_heavypistol_clip_02", name: "wct_clip2", description: "wcd_hpst_clip2" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_heavypistol_varmod_luxe", name: "wct_var_wood" }
        ]
        this.components[WeaponHash.VintagePistol] = [
            { key: "component_vintagepistol_clip_02", name: "wct_clip2", description: "wcd_vpst_clip2" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" }
        ]
        this.components[WeaponHash.CeramicPistol] = [
            { key: "component_ceramicpistol_clip_02", name: "wct_clip2", description: "wcd_clip2" },
            { key: "component_ceramicpistol_supp", name: "wct_supp", description: "wcd_pi_supp" }
        ]
        this.components[WeaponHash.HeavyRevolver] = [
            { key: "component_revolver_varmod_boss", name: "wct_rev_varb" },
            { key: "component_revolver_varmod_goon", name: "wct_rev_varg" }
        ]
        this.components[WeaponHash.HeavyRevolverMk2] = [
            { key: "component_revolver_mk2_clip_tracer", name: "wct_clip_tr", description: "wcd_clip_tr_rv" },
            { key: "component_revolver_mk2_clip_incendiary", name: "wct_clip_inc", description: "wcd_clip_inc_rv" },
            { key: "component_revolver_mk2_clip_hollowpoint", name: "wct_clip_hp", description: "wcd_clip_hp_rv" },
            { key: "component_revolver_mk2_clip_fmj", name: "wct_clip_fmj", description: "wcd_clip_fmj_rv" },
            { key: "component_at_sights", name: "wct_holo", description: "wcd_holo" },
            { key: "component_at_scope_macro_mk2", name: "wct_scope_mac2", description: "wcd_scope_mac" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_comp_03", name: "wct_comp", description: "wcd_comp" }
        ]
        this.components[WeaponHash.APPistol] = [
            { key: "component_appistol_clip_02", name: "wct_clip2", description: "wcd_ap_clip2" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_appistol_varmod_luxe", name: "wct_var_metal" }
        ]
        this.components[WeaponHash.UpNAtomizer] = [
            { key: "component_raypistol_varmod_xmas18", name: "wct_var_ray18", description: "wcd_var_ray18" }
        ]
        this.components[WeaponHash.MicroSMG] = [
            { key: "component_microsmg_clip_02", name: "wct_clip2", description: "wcdmsmg_clip2" },
            { key: "component_at_pi_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_scope_macro", name: "wct_scope_mac", description: "wcd_scope_mac" },
            { key: "component_at_ar_supp_02", name: "wct_supp", description: "wcd_ar_supp2" },
            { key: "component_microsmg_varmod_luxe", name: "wct_var_gold" }
        ]
        this.components[WeaponHash.MachinePistol] = [
            { key: "component_machinepistol_clip_02", name: "wct_clip2", description: "wcd_mchp_clip2" },
            { key: "component_machinepistol_clip_03", name: "wct_clip_drm", description: "wcd_clip3" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" }
        ]
        this.components[WeaponHash.MiniSMG] = [
            { key: "component_minismg_clip_02", name: "wct_clip2", description: "wcd_mimg_clip2" }
        ]
        this.components[WeaponHash.SMG] = [
            { key: "component_smg_clip_02", name: "wct_clip2", description: "wcd_smg_clip2" },
            { key: "component_smg_clip_03", name: "wct_clip_drm", description: "wcd_clip3" },
            { key: "component_at_ar_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_scope_macro_02", name: "wct_scope_mac", description: "wcd_scope_mac" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_smg_varmod_luxe", name: "wct_var_gold" }
        ]
        this.components[WeaponHash.SMGMk2] = [
            { key: "component_smg_mk2_clip_02", name: "wct_clip2", description: "wcd_clip2" },
            { key: "component_smg_mk2_clip_tracer", name: "wct_clip_tr", description: "wcd_clip_tr" },
            { key: "component_smg_mk2_clip_incendiary", name: "wct_clip_inc", description: "wcd_clip_inc" },
            { key: "component_smg_mk2_clip_hollowpoint", name: "wct_clip_hp", description: "wcd_clip_hp" },
            { key: "component_smg_mk2_clip_fmj", name: "wct_clip_fmj", description: "wcd_clip_fmj" },
            { key: "component_at_ar_flsh", name: "wct_flash", description: "wcd_flash" },
            { key: "component_at_sights_smg", name: "wct_holo", description: "wcd_holo" },
            { key: "component_at_scope_macro_02_smg_mk2", name: "wct_scope_mac2", description: "wcd_scope_mac" },
            { key: "component_at_scope_small_smg_mk2", name: "wct_scope_sml2", description: "wcd_scope_sml" },
            { key: "component_at_pi_supp", name: "wct_supp", description: "wcd_pi_supp" },
            { key: "component_at_muzzle_01", name: "wct_muzz1", description: "wcd_muzz" },
            { key: "component_at_muzzle_02", name: "wct_muzz2", description: "wct_muzz2" },
            { key: "component_at_muzzle_03", name: "wct_muzz3", description: "wcd_muzz" },
            { key: "component_at_muzzle_04", name: "wct_muzz4", description: "wcd_muzz" },
            { key: "component_at_muzzle_05", name: "wct_muzz5", description: "wcd_muzz" },
            { key: "component_at_muzzle_06", name: "wct_muzz6", description: "wcd_muzz" },
            { key: "component_at_muzzle_07", name: "wct_muzz7", description: "wcd_muzz" },
            { key: "component_at_sb_barrel_01", name: "wct_barr", description: "wcd_barr" },
            { key: "component_at_sb_barrel_02", name: "wct_barr2", description: "wcd_barr2" }
        ]
        this.components[WeaponHash.MG] = [
            { key: "component_mg_clip_02", name: "wct_clip2", description: "wcd_mg_clip2" },
            { key: "component_at_scope_small_02", name: "wct_scope_sml", description: "wcd_scope_sml" },
            { key: "component_mg_varmod_lowrider", name: "wct_var_gold", description: "wcd_var_mg" }
        ]
    }
}
