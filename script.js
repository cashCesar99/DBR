// Variable de estado para el rol actual ("survivor" o "killer")
let rolActual = "survivor";

function abrirCerrarMenu() {
    const menu = document.getElementById("MenuFiltros");
    const filtro = document.getElementById("ContenedorFiltro");
    
    menu.classList.toggle("abierto");

    // Si el menú tiene la clase 'abierto', el filtro deja de recibir clics
    if (menu.classList.contains("abierto")) {
        filtro.style.pointerEvents = "none";
    } else {
        filtro.style.pointerEvents = "auto";
    }
}

// Esta función cambia la variable de estado, actualiza la interfaz y recarga el menú
function alternarRol() {
    // 1. Cambiamos el estado del rol
    if (rolActual === "survivor") {
        rolActual = "killer";
    } else {
        rolActual = "survivor";
    }

    // 2. Localizamos elementos clave en el HTML
    const btnRol = document.getElementById("BtnCambioRol");
    const retratoSpin = document.getElementById("RetratoRandom");
    const imgArriba = document.getElementById("Arriba");
    const imgIzquierda = document.getElementById("Izquierda");
    const imgDerecha = document.getElementById("Derecha");
    const imgAbajo = document.getElementById("Abajo");

    // 3. Reiniciamos los iconos Y LIMPIAMOS LOS TEXTOS (Aquí estaba el error)
    const interrogacion = "./Resources/Images/Perks/Random/Random.png";
    const textoDefault = "Press Shuffle to reveal the perk.";
    
    [imgArriba, imgIzquierda, imgDerecha, imgAbajo].forEach(img => {
        if (img) {
            img.src = interrogacion;
            // ESTO ELIMINA EL FANTASMA:
            img.setAttribute("data-nombre", "Uknown");
            img.setAttribute("data-desc", textoDefault);
        }
    });

    // 4. Actualizamos el título y el distintivo visual del botón
    if (rolActual === "killer") {
        btnRol.innerText = "Killers";
        btnRol.classList.add("distintivo-asesino");
        retratoSpin.src = Asesinos[0].Retrato;
    } else {
        btnRol.innerText = "Survivors";
        btnRol.classList.remove("distintivo-asesino");
        retratoSpin.src = Sobrevivientes[0].Retrato;
    }

    // 5. Recargamos el menú lateral
    CargarMenu();
    RevisarEstadoSwitch();

    // 6. Mostrar/Ocultar el Filtro Inteligente
    const contenedorFiltro = document.getElementById("ContenedorFiltro");
    if (rolActual === "killer") {
        contenedorFiltro.style.display = "none"; 
    } else {
        contenedorFiltro.style.display = "flex";
    }
}

// Aquí guardamos toda la información de los personajes
const Sobrevivientes = [
    {
        Nombre: "Dwight",
        Retrato: "Resources/Images/Perks/Survivor/Dwight/S01_DwightFairfield_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { 
                Nombre: "Bond", 
                imagen: "Resources/Images/Perks/Survivor/Dwight/Bond2.webp", 
                activa: true,
                descripción: "Unlocks potential in one's aura reading ability. Allies' auras are revealed to you when they are within a 36-meter range."
            },
            { 
                Nombre: "Leader", 
                imagen: "Resources/Images/Perks/Survivor/Dwight/Leader2.webp", 
                activa: true, 
                descripción: "Increases the action speed of other survivors healing, sabotaging, unhooking, or opening exit gates when they are near you."
            },
            { Nombre: "Prove thyself", 
                imagen: "Resources/Images/Perks/Survivor/Dwight/Prove thyself2.webp", 
                activa: true,
                descripción: "Increases repair speed for every other survivor working on the same generator as you."
            },
        ]
    },
    {
        Nombre: "Meg",
        Retrato: "Resources/Images/Perks/Survivor/Meg/S02_MegThomas_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { 
                Nombre: "Adrenaline", 
                imagen: "Resources/Images/Perks/Survivor/Meg/Adrenaline2.webp", 
                activa: true,
                descripción: "Instantly heals one health state and causes you to sprint at 150% of your normal running speed for 5 seconds when the exit gates are powered."
            },
            { Nombre: "Quick and quiet", 
                imagen: "Resources/Images/Perks/Survivor/Meg/Quick and quite2.webp", 
                activa: true,
                descripción: "Suppresses the loud noise notification for fast vaulting or hiding in lockers (has a cooldown)."
            },
            { Nombre: "Sprint", 
                imagen: "Resources/Images/Perks/Survivor/Meg/Sprint2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "When starting to run, sprint at 150% of your normal running speed for 3 seconds. Causes Exhaustion."
            },
        ]
    },
    {
        Nombre: "Claudette",
        Retrato: "Resources/Images/Perks/Survivor/Claudette/S03_ClaudetteMorel_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            {  
                Nombre: "Bonay knowledge", 
                imagen: "Resources/Images/Perks/Survivor/Claudette/Botany knowledge2.webp", 
                activa: true,
                descripción: "Significantly increases your healing speed and the efficiency of healing items."
            },
            {   Nombre: "Empathy", 
                imagen: "Resources/Images/Perks/Survivor/Claudette/Empathy2.webp", 
                activa: true,
                descripción: "Reveals the auras of dying or injured survivors anywhere on the map."
            },
            {   Nombre: "Self care", 
                imagen: "Resources/Images/Perks/Survivor/Claudette/Self care2.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "Unlocks the ability to heal yourself without a med-kit, but at a heavily reduced speed."
            },
        ]   
    },
    {
        Nombre: "Jake",
        Retrato: "Resources/Images/Perks/Survivor/Jake/S04_JakePark_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            {  
                Nombre: "Calm spirit", 
                imagen: "Resources/Images/Perks/Survivor/Jake/Calm spirit2.png", 
                activa: true,
                categoria: "Scream",
                descripción: "Prevents you from screaming and alerts fewer crows when passing by them."
            },
            {   Nombre: "Iron will", 
                imagen: "Resources/Images/Perks/Survivor/Jake/Iron will2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "Reduces the volume of grunts of pain while you are in the injured state."
            },
            {   Nombre: "Saboteur", 
                imagen: "Resources/Images/Perks/Survivor/Jake/Saboteur2.webp", 
                activa: true,
                descripción: "See the auras of hooks while the killer is carrying a survivor. Unlocks the ability to sabotage hooks without a toolbox."
            },
        ]
    },
    {
        Nombre: "Bill",
        Retrato: "Resources/Images/Perks/Survivor/Bill/S08_WilliamBillOverbeck_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            {   Nombre: "Borrowed time", 
                imagen: "Resources/Images/Perks/Survivor/Bill/Borrowed time2.webp", 
                activa: true,
                descripción: "Extends the duration of the Endurance status effect for the survivor you unhook."
            },
            { 
                Nombre: "Left behind", 
                imagen: "Resources/Images/Perks/Survivor/Bill/Left behind2.webp", 
                activa: true,
                descripción: "If you are the last survivor remaining in the trial, the aura of the hatch is revealed to you.",
        },
            {
                Nombre: "Unbreakable", 
                imagen: "Resources/Images/Perks/Survivor/Bill/Unbreakable.webp", 
                activa: true,
                descripción: "Grants the ability to fully recover from the dying state once per trial and increases recovery speed."
            },
        ]
    },
    {
        Nombre: "Nea",
        Retrato: "Resources/Images/Perks/Survivor/Nea/S05_NeaKarlsson_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { 
                Nombre: "Balance landing", 
                imagen: "Resources/Images/Perks/Survivor/Nea/Balance landing2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "Stagger duration from falls is reduced. Upon landing, you sprint at 150% of your normal running speed for 3 seconds. Causes Exhaustion."
            },
            { 
                Nombre: "Streetwise", 
                imagen: "Resources/Images/Perks/Survivor/Nea/Streetwise2.webp", 
                activa: true,
                descripción: "The first time you deplete an Item with charges, see the Killer's Aura for 8 seconds & items with charges retrieved from Chests have +60/70/80% charges."},
            { 
                Nombre: "Urban evasion", 
                imagen: "Resources/Images/Perks/Survivor/Nea/Urban evasion2.webp", 
                activa: true,
                descripción: "Your movement speed while crouching is significantly increased."
            },
        ]
    },
    {
        Nombre: "David",
        Retrato: "Resources/Images/Perks/Survivor/David/S10_DavidKing_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { 
                Nombre: "Dead hard", 
                imagen: "Resources/Images/Perks/Survivor/David/Dead hard2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "When injured, press the active ability button while running to gain the Endurance status effect for 0.5 seconds. Causes Exhaustion."
            },
            { 
                Nombre: "No mither", 
                imagen: "Resources/Images/Perks/Survivor/David/No mither2.webp", 
                activa: true,
                categoria: "Broken",
                descripción: "You suffer from the Broken status effect for the entire trial, but you leave no pools of blood, grunt less, and can fully recover from the dying state infinitely."
            },
            { 
                Nombre: "Were gonna live forever", 
                imagen: "Resources/Images/Perks/Survivor/David/Were gonna live forever2.webp", 
                activa: true,
                descripción: "Increases healing speed on dying survivors. Grants Endurance to a survivor you heal from the dying state."
            },
        ]
    },
    {
        Nombre: "Laurie",
        Retrato: "Resources/Images/Perks/Survivor/Laurie/S06_LaurieStrode_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Decisive strike", 
                imagen: "Resources/Images/Perks/Survivor/Laurie/Decisive strike.webp", 
                activa: true,
                descripción: "After being unhooked, if the killer grabs or picks you up, succeed a skill check to automatically escape their grasp and stun them."
            },
            { 
                Nombre: "Object of obssesion", 
                imagen: "Resources/Images/Perks/Survivor/Laurie/Object of obsession.webp", 
                activa: true,
                descripción: "Whenever the killer reads your aura, their aura is revealed to you, and you gain a slight action speed bonus."
            },
            { 
                Nombre: "Sole survivor", 
                imagen: "Resources/Images/Perks/Survivor/Laurie/Sole survivor.webp", 
                activa: true,
                descripción: "Hides your aura from the killer within a certain range that increases as other survivors are killed or sacrificed."
            }
        ]   
    },
    {
        Nombre: "Ace",
        Retrato: "Resources/Images/Perks/Survivor/Ace/S07_AceVisconti_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Ace in the hole", 
                imagen: "Resources/Images/Perks/Survivor/Ace/Ace in the hole2.webp", 
                activa: true,
                descripción: "When retrieving an item from a chest, there is a chance it will have add-ons attached to it."
            },
            { 
                Nombre: "Open Handed", 
                imagen: "Resources/Images/Perks/Survivor/Ace/Open handed2.webp", 
                activa: true,
                descripción: "Strengthens the potential of you and your team's aura-reading abilities by increasing the aura-reading ranges."
            },
            { 
                Nombre: "Up the ante", 
                imagen: "Resources/Images/Perks/Survivor/Ace/Up the ante2.webp", 
                activa: true,
                descripción: "Boosts the luck of all remaining survivors in the trial."
            }
        ]
    },
    {
        Nombre: "Feng",
        Retrato: "Resources/Images/Perks/Survivor/Feng/S09_FengMin_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Alert", 
                imagen: "Resources/Images/Perks/Survivor/Feng/Alert2.webp", 
                activa: true,
                descripción: "When the killer breaks a pallet, breakable wall, or damages a generator, their aura is revealed to you for a few seconds."
            },
            { 
                Nombre: "Lithe", 
                imagen: "Resources/Images/Perks/Survivor/Feng/Lithe2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "After performing a rushed vault, sprint at 150% of your normal running speed for 3 seconds. Causes Exhaustion."
            },
            { 
                Nombre: "Technician", 
                imagen: "Resources/Images/Perks/Survivor/Feng/Technician2.webp", 
                activa: true,
                descripción: "Reduces the hearing distance of your generator repairs. Failing a skill check prevents the generator explosion but applies an extra regression penalty."
            }
        ]
    },
    {
        Nombre: "Quentin",
        Retrato: "Resources/Images/Perks/Survivor/Quentin/S11_QuentinSmith_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Pharmacy", 
                imagen: "Resources/Images/Perks/Survivor/Quentin/Pharmacy2.webp", 
                activa: true,
                descripción: "Unlocking chests is faster and guarantees an emergency med-kit on your first completed search."
            },
            { 
                Nombre: "Vigil", 
                imagen: "Resources/Images/Perks/Survivor/Quentin/Vigil2.webp", 
                activa: true,
                descripción: "You and nearby allies recover from negative status effects (like Exhaustion, Hemorrhage, or Blindness) much faster."
            },
            { 
                Nombre: "Wake up", 
                imagen: "Resources/Images/Perks/Survivor/Quentin/Wake up2.webp", 
                activa: true,
                descripción: "Reveals the auras of exit gates when powered, and allows you to open them faster."
            }
        ]
    },
    {
        Nombre: "Tapp",
        Retrato: "Resources/Images/Perks/Survivor/Tapp/S12_DetectiveDavidTapp_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Detectives hunsh", 
                imagen: "Resources/Images/Perks/Survivor/Tapp/Detectives hunsh2.webp", 
                activa: true,
                descripción: "When a generator is completed, the auras of generators, chests, and totems in range are revealed to you for several seconds."
            },
            { 
                Nombre: "Stake out", 
                imagen: "Resources/Images/Perks/Survivor/Tapp/Stake out2.webp", 
                activa: true,
                descripción: "Getting close to the killer without being in a chase grants tokens. Tokens consume themselves to turn good skill checks into great skill checks."
            },
            { 
                Nombre: "Tenacity", 
                imagen: "Resources/Images/Perks/Survivor/Tapp/Tenacity2.webp", 
                activa: true,
                descripción: "Allows you to crawl faster and recover at the same time while in the dying state."
            }
        ]   
    },
    {
        Nombre: "Kate",
        Retrato: "Resources/Images/Perks/Survivor/Kate/S13_KateDenson_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Boil over", 
                imagen: "Resources/Images/Perks/Survivor/Kate/Boil over2.webp", 
                activa: true,
                descripción: "Increases your struggling effects on the killer and obscures the auras of hooks within range from the killer."
            },
            { 
                Nombre: "Dance with me", 
                imagen: "Resources/Images/Perks/Survivor/Kate/Dance with me2.webp", 
                activa: true,
                descripción: "When performing a fast vault or leaving a locker in a sprint, you leave no scratch marks for 3 seconds."
            },
            { 
                Nombre: "Windows of opportunity", 
                imagen: "Resources/Images/Perks/Survivor/Kate/Windows of opportunity2.webp", 
                activa: true,
                descripción: "Unlocks potential in one's aura reading ability. Auras of breakable walls, pallets, and windows are revealed to you."
            }
        ]
    },
    {
        Nombre: "Adam",
        Retrato: "Resources/Images/Perks/Survivor/Adam/S14_AdamFrancis_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Autodidact", 
                imagen: "Resources/Images/Perks/Survivor/Adam/Autodidact2.webp", 
                activa: true,
                descripción: "You start the trial with a massive penalty to healing progression on skill checks, but gain tokens for successful checks that eventually grant a massive progression bonus."
            },
            { 
                Nombre: "Deliverance", 
                imagen: "Resources/Images/Perks/Survivor/Adam/Deliverance2.png", 
                activa: true,
                descripción: "After performing a safe hook rescue on another survivor, you have a 100% chance to unhook yourself during your first hook stage."
            },
            { 
                Nombre: "Diversion", 
                imagen: "Resources/Images/Perks/Survivor/Adam/Diversion2.webp", 
                activa: true,
                descripción: "After staying in the killer's terror radius for a duration, throw a pebble to create a loud noise notification to distract the killer."
            }
        ]   
    },
    {
        Nombre: "Jeff",
        Retrato: "Resources/Images/Perks/Survivor/Jeff/S15_JeffJohansen_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Aftercare", 
                imagen: "Resources/Images/Perks/Survivor/Jeff/Aftercare2.webp", 
                activa: true,
                descripción: "You see the aura of every survivor that you rescue from a hook, complete a heal on, or who does the same for you."
            },
            { 
                Nombre: "Breakdown", 
                imagen: "Resources/Images/Perks/Survivor/Jeff/Breakdown2.webp", 
                activa: true,
                descripción: "Any time you are unhooked or unhook yourself, the hook breaks and the killer's aura is shown to you for a few seconds."
            },
            { 
                Nombre: "Distortion", 
                imagen: "Resources/Images/Perks/Survivor/Jeff/Distortion2.webp", 
                activa: true,
                descripción: "Start the trial with tokens. When your aura would be shown to the killer, a token is consumed, hiding your aura and scratch marks for a short duration."
            }
        ]
    },
    {
        Nombre: "Jane",
        Retrato: "Resources/Images/Perks/Survivor/Jane/S16_JaneRomero_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Head on", 
                imagen: "Resources/Images/Perks/Survivor/Jane/Head on2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "While standing in a locker for 3 seconds, rushing out of it stuns the killer if they are standing within range. Causes Exhaustion."
            },
            { 
                Nombre: "Poised", 
                imagen: "Resources/Images/Perks/Survivor/Jane/Poised2.webp", 
                activa: true,
                descripción: "After a generator is completed, you leave no scratch marks for several seconds."
            },
            { 
                Nombre: "Solidarity", 
                imagen: "Resources/Images/Perks/Survivor/Jane/Solidarity2.webp", 
                activa: true,
                categoria: "SolidarityConflict",
                descripción: "While injured, healing another survivor without using a med-kit also heals you for a percentage of that healing progression."
            }
        ]
    },
    {
        Nombre: "Ashley",
        Retrato: "Resources/Images/Perks/Survivor/Ashley/S17_AshleyJWilliams_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Buckle up", 
                imagen: "Resources/Images/Perks/Survivor/Ashley/Buckle up2.webp", 
                activa: true,
                descripción: "You can determine the recovery progress of dying survivors. Healing a survivor from the dying state grants both of you Endurance for a short time."
            },
            { 
                Nombre: "Flip flop", 
                imagen: "Resources/Images/Perks/Survivor/Ashley/Flip flop2.webp", 
                activa: true,
                descripción: "A portion of your recovery progression in the dying state is converted into wiggle progression when picked up by the killer."
            },
            { 
                Nombre: "Mettle of man", 
                imagen: "Resources/Images/Perks/Survivor/Ashley/Mettle of man2.webp", 
                activa: true,
                descripción: "After taking enough protection hits, the next hit that would put you into the dying state is ignored."
            }
        ]
    },
    {
        Nombre: "Steve",
        Retrato: "Resources/Images/Perks/Survivor/Steve/S18_SteveHarrington_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Babysitter", 
                imagen: "Resources/Images/Perks/Survivor/Steve/Babysitter2.webp", 
                activa: true,
                descripción: "The survivor you unhook leaves no scratch marks or blood pools for a few seconds, and you briefly see the killer's aura."
            },
            { 
                Nombre: "Camaraderie", 
                imagen: "Resources/Images/Perks/Survivor/Steve/Camaraderie2.webp", 
                activa: true,
                descripción: "If another survivor is within range while you are struggling on the hook, the hook timer pauses briefly."
            },
            { 
                Nombre: "Second wind", 
                imagen: "Resources/Images/Perks/Survivor/Steve/Second wind2.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "After healing another survivor, the next time you are unhooked you will automatically heal one health state after a delay, provided you don't take damage."
            }
        ]   
    },
    {
        Nombre: "Nancy",
        Retrato: "Resources/Images/Perks/Survivor/Nancy/T_UI_S19_NancyWheeler_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Better together", 
                imagen: "Resources/Images/Perks/Survivor/Nancy/Better together2.webp", 
                activa: true,
                descripción: "The aura of the generator you are repairing is revealed to all other survivors."
            },
            { 
                Nombre: "Fixated", 
                imagen: "Resources/Images/Perks/Survivor/Nancy/Fixated2.webp", 
                activa: true,
                descripción: "You can see your own scratch marks and walk 20% faster while uninjured."
            },
            { 
                Nombre: "Inner Strenght", 
                imagen: "Resources/Images/Perks/Survivor/Nancy/Inner strength2.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "After cleansing a totem, hiding inside a locker for a few seconds automatically heals you one health state."
            }
        ]
    },
    {
        Nombre: "Yui",
        Retrato: "Resources/Images/Perks/Survivor/Yui/S20_YuiKimura_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Any means necessary", 
                imagen: "Resources/Images/Perks/Survivor/Yui/Any means necessary2.webp", 
                activa: true,
                descripción: "You see the auras of dropped pallets and can press the active ability button to pull them back up."
            },
            { 
                Nombre: "Breakout", 
                imagen: "Resources/Images/Perks/Survivor/Yui/Breakout2.webp", 
                activa: true,
                descripción: "When within range of a carried survivor, you gain a haste effect and the carried survivor wiggles free faster."
            },
            { 
                Nombre: "Lucky break", 
                imagen: "Resources/Images/Perks/Survivor/Yui/Lucky break2.webp", 
                activa: true,
                descripción: "Whenever you are injured, you leave no pools of blood or scratch marks for a limited total duration."
            }
        ]
    },
    {
        Nombre: "Zarina",
        Retrato: "Resources/Images/Perks/Survivor/Zarina/S21_ZarinaKassir_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "For the people", 
                imagen: "Resources/Images/Perks/Survivor/Zarina/For the people2.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "While fully healed, press the active ability button while healing another survivor to instantly heal them. You become injured and Broken."
            },
            { 
                Nombre: "Off the record", 
                imagen: "Resources/Images/Perks/Survivor/Zarina/Off the record2.webp", 
                activa: true,
                descripción: "After being unhooked, you gain the Endurance status effect, your aura is hidden, and grunts of pain are silenced for a duration."
            },
            { 
                Nombre: "Red herring", 
                imagen: "Resources/Images/Perks/Survivor/Zarina/Red herring2.webp", 
                activa: true,
                descripción: "Repairing a generator highlights it for you. Entering a locker triggers a loud noise notification at that generator's location."
            }
        ]
    },
    {
        Nombre: "Cherryl",
        Retrato: "Resources/Images/Perks/Survivor/Cheryl/S22_CherylMason_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Blood pact", 
                imagen: "Resources/Images/Perks/Survivor/Cheryl/Blood pact2.webp", 
                activa: true,
                descripción: "When you or the Obsession are injured, you see each other's auras. After healing each other, you both gain a speed boost."
            },
            { 
                Nombre: "Repressed alliance", 
                imagen: "Resources/Images/Perks/Survivor/Cheryl/Repressed alliance2.png", 
                activa: true,
                descripción: "After repairing generators for a certain amount of time, you can block the generator you are repairing, preventing killer regression."
            },
            { 
                Nombre: "Soul guard", 
                imagen: "Resources/Images/Perks/Survivor/Cheryl/Soul guard2.webp", 
                activa: true,
                descripción: "Gain Endurance after being healed or recovering from the dying state. You can fully recover from the dying state if a Hex is active."
            }
        ]
    },
    {
        Nombre: "Felix",
        Retrato: "Resources/Images/Perks/Survivor/Felix/S23_FelixRichter_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Built to last", 
                imagen: "Resources/Images/Perks/Survivor/Felix/Built to last2.webp", 
                activa: true,
                descripción: "Hiding inside a locker for a few seconds while carrying a depleted item restores a significant portion of its charges."
            },
            { 
                Nombre: "Desperate meansures", 
                imagen: "Resources/Images/Perks/Survivor/Felix/Desperate measures2.webp", 
                activa: true,
                descripción: "Increases healing and unhooking speeds for each injured, hooked, or dying survivor."
            },
            { 
                Nombre: "Visionary", 
                imagen: "Resources/Images/Perks/Survivor/Felix/Visionary2.webp", 
                activa: true,
                descripción: "You see the auras of generators within a certain range."
            }
        ]   
    },
    {
        Nombre: "Élodie",
        Retrato: "Resources/Images/Perks/Survivor/Élodie/S24_ElodieRakoto_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Appraisal", 
                imagen: "Resources/Images/Perks/Survivor/Élodie/Appraisal2.webp", 
                activa: true,
                descripción: "Start with tokens. You can consume a token to search an already opened chest for an extra item."
            },
            { 
                Nombre: "Deception", 
                imagen: "Resources/Images/Perks/Survivor/Élodie/Deception2.webp", 
                activa: true,
                descripción: "Interacting with a locker while sprinting triggers a loud noise notification but you do not enter it, and your scratch marks are hidden for a few seconds."
            },
            { 
                Nombre: "Power struggle", 
                imagen: "Resources/Images/Perks/Survivor/Élodie/Power struggle2.webp", 
                activa: true,
                descripción: "While being carried by the killer, reaching a certain wiggle progression allows you to drop a nearby pallet to stun the killer and escape."
            }
        ]
    },
    {
        Nombre: "Yun",
        Retrato: "Resources/Images/Perks/Survivor/Yun/S25_YunJinLee_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Fast track", 
                imagen: "Resources/Images/Perks/Survivor/Yun/Fast track2.webp", 
                activa: true,
                descripción: "Whenever another survivor is hooked, you gain tokens. Consume all tokens after hitting a great skill check on a generator for a massive progression bonus."
            },
            { 
                Nombre: "self preservation", 
                imagen: "Resources/Images/Perks/Survivor/Yun/Self preservation2.webp", 
                activa: true,
                descripción: "Whenever another survivor is hit by a basic or special attack near you, your scratch marks, blood pools, and grunts of pain are hidden."
            },
            { 
                Nombre: "Smash hit", 
                imagen: "Resources/Images/Perks/Survivor/Yun/Smash hit2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "After stunning the killer with a pallet, you sprint at 150% of your normal running speed for 3 seconds. Causes Exhaustion."
            }
        ]
    },
    {
        Nombre: "Jill",
        Retrato: "Resources/Images/Perks/Survivor/Jill/S26_JillValentine_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Blast mine", 
                imagen: "Resources/Images/Perks/Survivor/Jill/Blast mine2.webp", 
                activa: true,
                descripción: "After repairing generators for a certain amount of time, install a trap on a generator. If the killer kicks it, they are blinded and stunned."
            },
            { 
                Nombre: "Counterforce", 
                imagen: "Resources/Images/Perks/Survivor/Jill/Counterforce2.png", 
                activa: true,
                descripción: "Cleansing totems is faster. After cleansing a totem, the aura of the furthest totem from you is revealed for a few seconds."
            },
            { 
                Nombre: "Resurgence", 
                imagen: "Resources/Images/Perks/Survivor/Jill/Resurgence2.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "Gain 50% healing progress instantly after being unhooked or unhooking yourself."
            }
        ]
    },
    {
        Nombre: "Leon",
        Retrato: "Resources/Images/Perks/Survivor/Leon/S27_LeonSKennedy_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Bite the bullet", 
                imagen: "Resources/Images/Perks/Survivor/Leon/Bite the bullet2.webp", 
                activa: true,
                descripción: "You make no noise while healing or being healed. Failing a healing skill check makes no noise and only applies a small regression penalty."
            },
            { 
                Nombre: "Flashbang", 
                imagen: "Resources/Images/Perks/Survivor/Leon/Flashbang2.webp", 
                activa: true,
                descripción: "After repairing generators for a certain amount of time, enter a locker to craft a flash grenade that can blind or distract the killer."
            },
            { 
                Nombre: "Rookie spirit", 
                imagen: "Resources/Images/Perks/Survivor/Leon/Rookie spirit2.webp", 
                activa: true,
                descripción: "Complete good or great skill checks on generators to activate this perk, revealing the auras of all regressing generators on the map."
            }
        ]
    },
    {
        Nombre: "Mikaela",
        Retrato: "Resources/Images/Perks/Survivor/Mikaela/S28_MikaelaReid_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Boon circle of healling", 
                imagen: "Resources/Images/Perks/Survivor/Mikaela/Boon circle of healling2.webp", 
                activa: true,
                descripción: "Bless a dull or hex totem to create a boon area where all survivors heal much faster."
            },
            { 
                Nombre: "Boon shadow step", 
                imagen: "Resources/Images/Perks/Survivor/Mikaela/Boon shadow step2.webp", 
                activa: true,
                descripción: "Bless a dull or hex totem to create a boon area where scratch marks and auras of survivors are hidden from the killer."
            },
            { 
                Nombre: "Claivoyance", 
                imagen: "Resources/Images/Perks/Survivor/Mikaela/clairvoyance2.webp", 
                activa: true,
                descripción: "After cleansing a totem, press the active ability button while empty-handed to see the auras of exit gate switches, generators, hooks, and chests in a large area."
            }
        ]
    },
    {
        Nombre: "Jonah",
        Retrato: "Resources/Images/Perks/Survivor/Jonah/S29_JonahVasquez_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Boon exponential", 
                imagen: "Resources/Images/Perks/Survivor/Jonah/Boon exponential2.webp", 
                activa: true,
                descripción: "Bless a dull or hex totem to create a boon area where survivors recover much faster from the dying state and can fully pick themselves up."
            },
            { 
                Nombre: "Corrective action", 
                imagen: "Resources/Images/Perks/Survivor/Jonah/Corrective action2.webp", 
                activa: true,
                descripción: "You start the trial with tokens. When another survivor cooperating with you fails a skill check, a token is consumed to turn it into a good skill check."
            },
            { 
                Nombre: "Overcome", 
                imagen: "Resources/Images/Perks/Survivor/Jonah/Overcome2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "Whenever you become injured, you retain the movement speed bonus for an additional 2 seconds. Causes Exhaustion."
            }
        ]   
    },
    {
        Nombre: "Yoichi",
        Retrato: "Resources/Images/Perks/Survivor/Yoichi/S30_YoichiAsakawa_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Boon dark theory", 
                imagen: "Resources/Images/Perks/Survivor/Yoichi/Boon dark theory2.webp", 
                activa: true,
                descripción: "Bless a dull or hex totem to create a boon area where all survivors gain a 2% Haste status effect."
            },
            { 
                Nombre: "Empathic connection", 
                imagen: "Resources/Images/Perks/Survivor/Yoichi/Empathic connection2.webp", 
                activa: true,
                descripción: "Your aura is revealed to injured survivors within range. You heal other survivors faster."
            },
            { 
                Nombre: "Paretal guidance", 
                imagen: "Resources/Images/Perks/Survivor/Yoichi/Parental guidance2.webp", 
                activa: true,
                descripción: "After stunning the killer by any means, your scratch marks, pools of blood, and grunts of pain are hidden for a short duration."
            }
        ]
    },
    {
        Nombre: "Haddie",
        Retrato: "Resources/Images/Perks/Survivor/Haddie/S31_HaddieKaur_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Inner focus", 
                imagen: "Resources/Images/Perks/Survivor/Haddie/Inner focus2.webp", 
                activa: true,
                descripción: "You can see the scratch marks of other survivors. If another survivor loses a health state nearby, the killer's aura is revealed to you."
            },
            { 
                Nombre: "Overzealous", 
                imagen: "Resources/Images/Perks/Survivor/Haddie/Overzealous2.webp", 
                activa: true,
                descripción: "Cleansing or blessing a totem grants a repair speed bonus that lasts until you lose a health state."
            },
            { 
                Nombre: "Residual manifest", 
                imagen: "Resources/Images/Perks/Survivor/Haddie/Residual manifest2.webp", 
                activa: true,
                descripción: "After successfully blinding the killer, they suffer from the Blindness status effect. Guarantee a basic flashlight when searching an opened chest."
            }
        ]
    },
    {
        Nombre: "Ada",
        Retrato: "Resources/Images/Perks/Survivor/Ada/S32_AdaWong_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Low profile", 
                imagen: "Resources/Images/Perks/Survivor/Ada/Low profile.webp", 
                activa: true,
                descripción: "When you are the only survivor left in the trial who is not dead, hooked, or dying, your scratch marks, blood pools, and grunts of pain are hidden."
            },
            { 
                Nombre: "Reactive healling", 
                imagen: "Resources/Images/Perks/Survivor/Ada/Reactive healing.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "When another survivor loses a health state near you while you are injured, you instantly gain a percentage of healing progression."
            },
            { 
                Nombre: "Wiretap", 
                imagen: "Resources/Images/Perks/Survivor/Ada/Wiretap.webp", 
                activa: true,
                descripción: "After repairing generators for a bit, you can install a wiretap. If the killer comes near the trapped generator, their aura is revealed to all survivors."
            }
        ]
    },
    {
        Nombre: "Rebecca",
        Retrato: "Resources/Images/Perks/Survivor/Rebecca/S33_RebeccaChambers_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Better than new", 
                imagen: "Resources/Images/Perks/Survivor/Rebecca/Better than new.webp", 
                activa: true,
                descripción: "Upon completing a healing action on another survivor, they receive an action speed boost to healing, unlocking chests, cleansing, and blessing totems until they are injured again."
            },
            { 
                Nombre: "Hyperfocus", 
                imagen: "Resources/Images/Perks/Survivor/Rebecca/Hyperfocus.webp", 
                activa: true,
                descripción: "Hitting a great skill check grants a token. Each token increases the skill check trigger odds, rotation speed, and bonus progression for great skill checks."
            },
            { 
                Nombre: "Ressurance", 
                imagen: "Resources/Images/Perks/Survivor/Rebecca/Reassurance.webp", 
                activa: true,
                descripción: "When near a hooked survivor, press the active ability button to pause their struggle phase timer for a duration."
            }
        ]
    },
    {
        Nombre: "Vittorio",
        Retrato: "Resources/Images/Perks/Survivor/Vittorio/S34_VittorioToscano_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Fogwise", 
                imagen: "Resources/Images/Perks/Survivor/Vittorio/Fogwise2.webp", 
                activa: true,
                descripción: "Hitting a great skill check while repairing a generator reveals the killer's aura to you for a few seconds."
            },
            { 
                Nombre: "Potential energy", 
                imagen: "Resources/Images/Perks/Survivor/Vittorio/Potential energy2.webp", 
                activa: true,
                descripción: "After repairing a generator uninterrupted for a short time, you can divert repair progress into tokens instead. Tokens can be instantly deposited into another generator."
            },
            { 
                Nombre: "Quick gambit", 
                imagen: "Resources/Images/Perks/Survivor/Vittorio/Quick gambit2.webp", 
                activa: true,
                descripción: "When you are being chased within range of a generator being repaired, the survivors repairing it get a repair speed boost."
            }
        ]
    },
    {
        Nombre: "Thalita",
        Retrato: "Resources/Images/Perks/Survivor/Thalita/S35_ThalitaLyra_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Cut loose", 
                imagen: "Resources/Images/Perks/Survivor/Thalita/Cut loose2.webp", 
                activa: true,
                descripción: "After performing a rushed vault, your next rushed vaults within a short time frame are silent and refresh the duration."
            },
            { 
                Nombre: "Friendly competition", 
                imagen: "Resources/Images/Perks/Survivor/Thalita/Friendly competition2.webp", 
                activa: true,
                descripción: "After you complete a generator with at least one other survivor, you both gain a repair speed bonus for a limited time."
            },
            { 
                Nombre: "Teamwork power of two", 
                imagen: "Resources/Images/Perks/Survivor/Thalita/Teamwork power of two2.webp", 
                activa: true,
                descripción: "Whenever you finish healing another survivor, you both gain a movement speed boost as long as you stay within a certain range of each other."
            }
        ]   
    },
    {
        Nombre: "Renato",
        Retrato: "Resources/Images/Perks/Survivor/Renato/S36_RenatoLyra_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Background player", 
                imagen: "Resources/Images/Perks/Survivor/Renato/Background player2.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "When the killer picks up another survivor, you sprint at 150% of your normal running speed for a few seconds. Causes Exhaustion."
            },
            { 
                Nombre: "Blood rush", 
                imagen: "Resources/Images/Perks/Survivor/Renato/Blood rush2.webp", 
                activa: true,
                descripción: "Once per trial, if you are one hook away from death, you can press the active ability button to instantly recover from Exhaustion at the cost of being Broken."
            },
            { 
                Nombre: "Teamwork collective", 
                imagen: "Resources/Images/Perks/Survivor/Renato/Teamwork collective2.webp", 
                activa: true,
                descripción: "Whenever another survivor finishes healing you, neither of you leave scratch marks as long as you stay close to each other."
            }
        ]
    },
    {
        Nombre: "Gabriel",
        Retrato: "Resources/Images/Perks/Survivor/Gabriel/S37_GabrielSoma_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Made for it", 
                imagen: "Resources/Images/Perks/Survivor/Gabriel/Made for it.webp", 
                activa: true,
                descripción: "Gain a movement speed boost while you have the Deep Wound status effect. Healing another survivor grants you Endurance for a short time."
            },
            { 
                Nombre: "Scavenger", 
                imagen: "Resources/Images/Perks/Survivor/Gabriel/Scavenger.webp", 
                activa: true,
                descripción: "Hitting great skill checks on generators grants tokens. Reaching max tokens automatically recharges a depleted toolbox at the cost of a temporary repair speed penalty."
            },
            { 
                Nombre: "Troubleshooter", 
                imagen: "Resources/Images/Perks/Survivor/Gabriel/Troubleshooter.webp", 
                activa: true,
                descripción: "When chased by the killer, the aura of the generator with the most progress is revealed to you. Dropping a pallet shows the killer's aura briefly."
            }
        ]
    },
    {
        Nombre: "Nicolas",
        Retrato: "Resources/Images/Perks/Survivor/Nicolas/S38_NicolasCage_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Dramaturgy", 
                imagen: "Resources/Images/Perks/Survivor/Nicolas/Dramaturgy.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "While healthy, run with high knees to gain a burst of speed and a random effect (Exposed, a random item, or healing). Causes Exhaustion."
            },
            { 
                Nombre: "Plot twist", 
                imagen: "Resources/Images/Perks/Survivor/Nicolas/Plot twist.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "When injured, you can voluntarily enter the dying state silently. While in this state, you leave no blood and can fully recover to a healthy state."
            },
            { 
                Nombre: "Scene partner", 
                imagen: "Resources/Images/Perks/Survivor/Nicolas/Scene partner.webp", 
                activa: true,
                categoria: "Scream",
                descripción: "When looking at the killer inside their terror radius, you scream, and the killer's aura is revealed to you for a few seconds."
            }
        ]
    },
    {
        Nombre: "Ellen",
        Retrato: "Resources/Images/Perks/Survivor/Ellen/S39_EllenRipley_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Chemical trap", 
                imagen: "Resources/Images/Perks/Survivor/Ellen/Chemical trap.webp", 
                activa: true,
                descripción: "After repairing generators for a certain amount of time, install a trap on a dropped pallet. If the killer breaks it, they are slowed down."
            },
            { 
                Nombre: "Light footed", 
                imagen: "Resources/Images/Perks/Survivor/Ellen/Light footed.webp", 
                activa: true,
                categoria: "Heal",
                descripción: "While you are healthy, your running footsteps are completely silent."
            },
            { 
                Nombre: "Lucky star", 
                imagen: "Resources/Images/Perks/Survivor/Ellen/Lucky star.webp", 
                activa: true,
                descripción: "When you hide in a locker, you drop no blood pools and make no pain grunts for a duration. Exiting the locker reveals all other survivors' auras to you."
            }
        ]   
    },
    {
        Nombre: "Alan",
        Retrato: "Resources/Images/Perks/Survivor/Alan/S40_AlanWake_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Boon illumination", 
                imagen: "Resources/Images/Perks/Survivor/Alan/Boon Illumination.webp", 
                activa: true,
                descripción: "Bless a dull or hex totem to create a boon area where all chests and generators are highlighted in blue. Cleansing and blessing speeds are increased."
            },
            { 
                Nombre: "Champion of light", 
                imagen: "Resources/Images/Perks/Survivor/Alan/Champion of light.webp", 
                activa: true,
                descripción: "You move faster while shining a flashlight. Successfully blinding the killer slows them down for a few seconds."
            },
            { 
                Nombre: "Deadline", 
                imagen: "Resources/Images/Perks/Survivor/Alan/Deadline.webp", 
                activa: true,
                descripción: "When you are injured, skill checks appear much more frequently and in random places on your screen."
            }
        ]
    },
    {
        Nombre: "Sable",
        Retrato: "Resources/Images/Perks/Survivor/Sable/S41_SableWard_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Invocation weaving spider", 
                imagen: "Resources/Images/Perks/Survivor/Sable/Invocation weaving spiders.webp", 
                activa: true,
                descripción: "Perform an invocation in the basement. Completing it permanently reduces the required repair charges of all generators, but leaves you injured and Broken."
            },
            { 
                Nombre: "Strength shadow", 
                imagen: "Resources/Images/Perks/Survivor/Sable/Strength shadows.webp", 
                activa: true,
                descripción: "Unlocks the ability to heal yourself at a highly increased speed while in the basement. Doing so reveals the killer's aura."
            },
            { 
                Nombre: "Wicked", 
                imagen: "Resources/Images/Perks/Survivor/Sable/Wicked.webp", 
                activa: true,
                descripción: "Your self-unhook attempts in the basement always succeed. Whenever you are unhooked, the killer's aura is revealed to you for a short time."
            }
        ]
    },
    {
        Nombre: "Aestri",
        Retrato: "Resources/Images/Perks/Survivor/Aestri/S42_TheTroupe_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Bardic Inspiration", 
                imagen: "Resources/Images/Perks/Survivor/Aestri/Bardic inspiration.webp", 
                activa: true,
                descripción: "Perform a song to inspire nearby allies. Roll a d20 to grant them a buff that adds extra progression to their generator skill checks."
            },
            { 
                Nombre: "Mirrored Illusion", 
                imagen: "Resources/Images/Perks/Survivor/Aestri/Mirrored illusion.webp", 
                activa: true,
                descripción: "After repairing a generator for a set duration, spawn a static illusion of yourself working on a generator, chest, or totem."
            },
            { 
                Nombre: "Still sight", 
                imagen: "Resources/Images/Perks/Survivor/Aestri/Still sight.webp", 
                activa: true,
                descripción: "Standing completely still for a few seconds reveals the auras of the killer and all generators within a medium range."
            }
        ]
    },
    {
        Nombre: "Lara",
        Retrato: "Resources/Images/Perks/Survivor/Lara/S43_LaraCroft_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Finesse", 
                imagen: "Resources/Images/Perks/Survivor/Lara/Finesse.webp", 
                activa: true,
                descripción: "While healthy, your fast vaults are 20% faster. Has a cooldown after use."
            },
            { 
                Nombre: "Handened", 
                imagen: "Resources/Images/Perks/Survivor/Lara/Handened.webp", 
                activa: true,
                descripción: "When you would normally scream, you instead do not scream and the killer's aura is revealed to you."
            },
            { 
                Nombre: "Specialist", 
                imagen: "Resources/Images/Perks/Survivor/Lara/Specialist.webp", 
                activa: true,
                descripción: "Opening chests or cleansing totems grants tokens. Hitting great skill checks on generators consumes tokens to permanently reduce the generator's maximum required charges."
            }
        ]
    },
    {
        Nombre: "Trevor",
        Retrato: "Resources/Images/Perks/Survivor/Trevor/S44_TrevorBelmont_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Exultation", 
                imagen: "Resources/Images/Perks/Survivor/Trevor/Exultation.webp", 
                activa: true,
                descripción: "Stunning the killer with a pallet upgrades the item you are currently holding to the next rarity tier and recharges it."
            },
            { 
                Nombre: "Eye of belmont", 
                imagen: "Resources/Images/Perks/Survivor/Trevor/Eye of belmont.webp", 
                activa: true,
                descripción: "When a generator is completed, the killer's aura is revealed to you. Any time the killer's aura is shown to you, the duration is extended."
            },
            { 
                Nombre: "Moment of glory", 
                imagen: "Resources/Images/Perks/Survivor/Trevor/Moment of glory.webp", 
                activa: true,
                descripción: "After opening chests, this perk activates. The next time you take damage, you will automatically heal one health state after a delay if you avoid going down."
            }
        ]   
    },
    {
        Nombre: "Taurie",
        Retrato: "Resources/Images/Perks/Survivor/Taurie/S45_TaurieCain_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Clean break", 
                imagen: "Resources/Images/Perks/Survivor/Taurie/Clean break.webp", 
                activa: true,
                categoria: "SolidarityConflict",
                descripción: "After finishing a heal or unhooking yourself, you break into a quick sprint and leave no scratch marks for a short time."
            },
            { 
                Nombre: "Invocation treacherous crows", 
                imagen: "Resources/Images/Perks/Survivor/Taurie/invocation treacherous crows.webp", 
                activa: true,
                descripción: "Perform an invocation to startle crows map-wide, revealing the killer's aura, at the cost of permanent vulnerability."
            },
            { 
                Nombre: "Shoulder the  burden", 
                imagen: "Resources/Images/Perks/Survivor/Taurie/Shoulder the burden.webp", 
                activa: true,
                descripción: "Take on the negative status effects of an injured survivor to grant them a burst of speed and remove their afflictions."
            }
        ]
    },
    {
        Nombre: "Orela",
        Retrato: "Resources/Images/Perks/Survivor/Orela/S46_OrelaRose_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Do no harm", 
                imagen: "Resources/Images/Perks/Survivor/Orela/Do no harm.webp", 
                activa: true,
                categoria: "Exhaustion",
                descripción: "Healing survivors without a med-kit is significantly faster but causes you to suffer from Exhaustion."
            },
            { 
                Nombre: "Duty of care", 
                imagen: "Resources/Images/Perks/Survivor/Orela/Duty of care.webp", 
                activa: true,
                descripción: "Taking a protection hit grants you and the rescued survivor a temporary speed boost and hides your auras."
            },
            { 
                Nombre: "Rapid response", 
                imagen: "Resources/Images/Perks/Survivor/Orela/Rapid response.webp", 
                activa: true,
                descripción: "You gain a movement speed bonus when running directly towards a hooked survivor."
            }
        ]
    },
    {
        Nombre: "Michonne",
        Retrato: "Resources/Images/Perks/Survivor/Michonne/S48_MichonneGrimes_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Conviction", 
                imagen: "Resources/Images/Perks/Survivor/Michonne/Conviction.webp", 
                activa: true,
                descripción: "Generator regression from killer kicks is heavily reduced if you were working on the generator recently."
            },
            { 
                Nombre: "Last stand", 
                imagen: "Resources/Images/Perks/Survivor/Michonne/Last stand.webp", 
                activa: true,
                descripción: "You recover significantly faster while in the dying state and have a small chance to break free from the killer's grasp instantly."
            },
            { 
                Nombre: "Teamwork throw down", 
                imagen: "Resources/Images/Perks/Survivor/Michonne/Temwork throw down.webp", 
                activa: true,
                descripción: "Pallet drop animations are faster and stun durations are increased when another survivor is nearby."
            }
        ]
    },
    {
        Nombre: "Rick",
        Retrato: "Resources/Images/Perks/Survivor/Rick/S47_RickGrimes_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Apocalyptic ingenuity", 
                imagen: "Resources/Images/Perks/Survivor/Rick/Apocalyptic ingenuity.webp", 
                activa: true,
                descripción: "Scavenging opened chests yields spare parts that can be applied to generators for an instant burst of progress."
            },
            { 
                Nombre: "Come and get me", 
                imagen: "Resources/Images/Perks/Survivor/Rick/Come and get me.webp", 
                activa: true,
                descripción: "Willingly reveal your aura to the killer to grant all other survivors a massive repair speed boost for a short duration."
            },
            { 
                Nombre: "Teamwork toughen up", 
                imagen: "Resources/Images/Perks/Survivor/Rick/Teamwork toughen up.webp", 
                activa: true,
                descripción: "Healing an ally grants both of you temporary immunity to the Hemorrhage and Mangled status effects as long as you stay close."
            }
        ]   
    },
    {
        Nombre: "Jim",
        Retrato: "Resources/Images/Perks/Survivor/Jim/guys-what-does-jim-mean-v0-v8kje4dboghf1.webp",
        PersonajeActivo: true,
        SiempreActivo: false,
        SinPerks: true,
        Perks: [
            { Nombre: "", imagen: "", activa: false },
            { Nombre: "", imagen: "", activa: false },
            { Nombre: "", imagen: "", activa: false }
        ]
    },
    {
        Nombre: "Vee",
        Retrato: "Resources/Images/Perks/Survivor/Vee/T_UI_S49_VeeBoonyasak_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Ghost notes", 
                imagen: "Resources/Images/Perks/Survivor/Vee/Ghost notes.webp", 
                activa: true,
                descripción: "Performing rushed actions while outside the killer's terror radius creates no loud noise notifications."
            },
            { 
                Nombre: "One two trhee four", 
                imagen: "Resources/Images/Perks/Survivor/Vee/One two three four.webp", 
                activa: true,
                descripción: "Hitting 4 good or great skill checks in a row grants a token that speeds up your next healing or repairing action."
            },
            { 
                Nombre: "road life", 
                imagen: "Resources/Images/Perks/Survivor/Vee/Road life.webp", 
                activa: true,
                descripción: "Walking or crouching near the very edges of the map increases your movement speed significantly."
            }
        ]
    },
    {
        Nombre: "Dustin",
        Retrato: "Resources/Images/Perks/Survivor/Dustin/T_UI_S50_DustinHenderson_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Bada bada boom", 
                imagen: "Resources/Images/Perks/Survivor/Dustin/Bada bada boom.webp", 
                activa: true,
                descripción: "Sabotaging a hook rigs it to explode, blinding the killer if they attempt to hook someone on it."
            },
            { 
                Nombre: "Change of plan", 
                imagen: "Resources/Images/Perks/Survivor/Dustin/Change of plan.webp", 
                activa: true,
                descripción: "If the killer closes the hatch, the aura of the exit gate switches are revealed and you open them significantly faster."
            },
            { 
                Nombre: "Teamwork full circuit", 
                imagen: "Resources/Images/Perks/Survivor/Dustin/Teamwork full circuit.webp", 
                activa: true,
                descripción: "Repairing a generator with an ally prevents it from exploding even if a skill check is failed, as long as you stay near each other."
            }
        ]
    },
    {
        Nombre: "Eleven",
        Retrato: "Resources/Images/Perks/Survivor/Eleven/T_UI_S51_Eleven_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "Extrasensory perception", 
                imagen: "Resources/Images/Perks/Survivor/Eleven/Extrasensory perception.webp", 
                activa: true,
                descripción: "After crouching for 4s: You see Auras in an expanding radius up to 44m. You gain Elusive. You gain Oblivious. When you stop crouching, or after 11s, cooldown: 60/50/40s."
            },
            { 
                Nombre: "Teamwork soft spoken", 
                imagen: "Resources/Images/Perks/Survivor/Eleven/Teamwork soft spoken.webp", 
                activa: true,
                descripción: "Healing or repairing with another survivor reduces the audibility of those actions to 0 meters."
            },
            { 
                Nombre: "We see you", 
                imagen: "Resources/Images/Perks/Survivor/Eleven/We see you.webp", 
                activa: true,
                descripción: "If a survivor's aura is revealed to you, the killer's aura is also briefly revealed."
            }
        ]
    },
    {
        Nombre: "Tae-Young",
        Retrato: "Resources/Images/Perks/Survivor/Kwon Tae-Young/T_UI_S52_KwonTaeYoung_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { 
                Nombre: "A place for us", 
                imagen: "Resources/Images/Perks/Survivor/Kwon Tae-Young/a-place-for-us.webp", 
                activa: true,
                descripción: "Action speeds are increased when inside main buildings or the basement."
            },
            { 
                Nombre: "Five moves ahead", 
                imagen: "Resources/Images/Perks/Survivor/Kwon Tae-Young/five-moves-ahead.webp", 
                activa: true,
                descripción: "You are alerted when the killer reads your aura, and your aura is projected in a false location."
            },
            { 
                Nombre: "Flow state", 
                imagen: "Resources/Images/Perks/Survivor/Kwon Tae-Young/flow-state.webp", 
                activa: true,
                descripción: "Chaining multiple fast vaults in a chase gives you a small, stacking movement speed bonus."
            }
        ]
    },
    {
        Nombre: "",
        Retrato: "",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "", imagen: "", activa: true },
            { Nombre: "", imagen: "", activa: true },
            { Nombre: "", imagen: "", activa: true },
        ]
    },
];

const Asesinos = [
    {
        Nombre: "Trapper",
        Retrato: "./Resources/Images/Perks/Killer/Trapper/K01_TheTrapper_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { Nombre: "Agitation", imagen: "./Resources/Images/Perks/Killer/Trapper/Agitation.webp", activa: true, descripcion: "Increases your movement speed while carrying a Survivor and increases your Terror Radius." },
            { Nombre: "Brutal Strength", imagen: "./Resources/Images/Perks/Killer/Trapper/Brutal strength.webp", activa: true, descripcion: "Destroys Pallets, Breakable Walls, and Generators much faster." },
            { Nombre: "Unnerving Presence", imagen: "./Resources/Images/Perks/Killer/Trapper/Unnerving presence.webp", activa: true, descripcion: "Survivors within your Terror Radius have a greater chance of triggering Skill Checks with a smaller success zone." }
        ]
    },
    {
        Nombre: "Wraith",
        Retrato: "./Resources/Images/Perks/Killer/Wraith/K02_TheWraith_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { Nombre: "Bloodhound", imagen: "./Resources/Images/Perks/Killer/Wraith/Bloodhound.webp", activa: true, descripcion: "Fresh Blood Stains are considerably more discernible and can be tracked for longer than normal." },
            { Nombre: "Predator", imagen: "./Resources/Images/Perks/Killer/Wraith/Predator.webp", activa: true, descripcion: "Scratch Marks left by Survivors will spawn considerably closer together." },
            { Nombre: "Shadowborn", imagen: "./Resources/Images/Perks/Killer/Wraith/Shadowborn.webp", activa: true, descripcion: "When you are blinded by any means, gain a Haste status effect for a few seconds." }
        ]
    },
    {
        Nombre: "Hillbilly",
        Retrato: "./Resources/Images/Perks/Killer/Hillbilly/K03_TheHillbilly_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { Nombre: "Enduring", imagen: "./Resources/Images/Perks/Killer/Hillbilly/Enduring.webp", activa: true, descripcion: "Reduces the duration of Pallet Stuns significantly." },
            { Nombre: "Lightborn", imagen: "./Resources/Images/Perks/Killer/Hillbilly/Lightborn.webp", activa: true, descripcion: "Grants immunity to being blinded by Flashlights, Firecrackers, Flashbangs, or Blast Mines." },
            { Nombre: "Tinkerer", imagen: "./Resources/Images/Perks/Killer/Hillbilly/Tinkerer.webp", activa: true, descripcion: "When a Generator is repaired to 70%, it triggers a Loud Noise notification and you gain the Undetectable status effect." }
        ]
    },
    {
        Nombre: "Nurse",
        Retrato: "./Resources/Images/Perks/Killer/Nurse/K04_TheNurse_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { Nombre: "A nurse calling", imagen: "./Resources/Images/Perks/Killer/Nurse/A nurses calling.webp", activa: true, descripcion: "The Auras of Survivors who are healing or being healed are revealed to you within a specific range." },
            { Nombre: "Stridor", imagen: "./Resources/Images/Perks/Killer/Nurse/Stridor.webp", activa: true, descripcion: "The breathing and grunts of pain from Survivors are significantly louder." },
            { Nombre: "Thanatophobia", imagen: "./Resources/Images/Perks/Killer/Nurse/Thanatophobia.webp", activa: true, descripcion: "For each injured, dying, or hooked Survivor, all Survivors receive a penalty to Repairing, Sabotaging, and Cleansing speeds." }
        ]
    },
    {
        Nombre: "Huntress",
        Retrato: "./Resources/Images/Perks/Killer/Huntress/K08_TheHuntress_Portrait.png",
        PersonajeActivo: true,
        SiempreActivo: true,
        Perks: [
            { Nombre: "Beast of prey", imagen: "./Resources/Images/Perks/Killer/Huntress/Beast of prey.webp", activa: true, descripcion: "Upon gaining Bloodlust Tier I, you gain the Undetectable status effect." },
            { Nombre: "Hex huntress lullaby", imagen: "./Resources/Images/Perks/Killer/Huntress/Hex huntress lullaby.webp", activa: true, descripcion: "Survivors receive a regression penalty when missing Skill Checks. Each Hook increases the effectiveness by shortening the warning sound." },
            { Nombre: "Territorial imprerative", imagen: "./Resources/Images/Perks/Killer/Huntress/Territorial imperative.webp", activa: true, descripcion: "The Aura of a Survivor entering the Basement is revealed to you when you are far away." }
        ]
    },
    {
        Nombre: "Shape",
        Retrato: "Resources/Images/Perks/Killer/Shape/K06_TheShape_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Dying light", imagen: "Resources/Images/Perks/Killer/Shape/Dying light.webp", activa: true, descripcion: "Your Obsession gains a speed bonus to Altruistic actions, but other Survivors receive a repair/heal penalty for each hook stack." },
            { Nombre: "Play with your food", imagen: "./Resources/Images/Perks/Killer/Shape/Play with your food.webp", activa: true, descripcion: "Each time you let your Obsession escape after a chase, you receive a stackable Haste status effect." },
            { Nombre: "Save the best for the last", imagen: "./Resources/Images/Perks/Killer/Shape/Save the best for last.webp", activa: true, descripcion: "Gain a stack for each Basic Attack on non-Obsessions, reducing the cool-down of Basic Attacks." }
        ]
    },
    {
        Nombre: "Hag",
        Retrato: "Resources/Images/Perks/Killer/Hag/K05_TheHag_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "_Hex devour hope", imagen: "./Resources/Images/Perks/Killer/Hag/Hex devour hope.webp", activa: true, descripcion: "If Survivors are rescued from hooks while you are away, gain tokens that eventually allow you to insta-down and kill Survivors." },
            { Nombre: "Hex ruin", imagen: "Resources/Images/Perks/Killer/Hag/Hex ruin.webp", activa: true, descripcion: "All Generators are affected by Hex: Ruin. While not being repaired, they automatically regress at 100% of the normal regression speed." },
            { Nombre: "Hex the third seal", imagen: "./Resources/Images/Perks/Killer/Hag/Hex the third seal.webp", activa: true, descripcion: "Hitting a Survivor with a Basic Attack applies the Blindness status effect while the Totem is active." }
        ]
    },
    {
        Nombre: "Doctor",
        Retrato: "Resources/Images/Perks/Killer/Doctor/K07_TheDoctor_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Monitor abuse", imagen: "Resources/Images/Perks/Killer/Doctor/Monitor abuse.webp", activa: true, descripcion: "While in a chase, your Terror Radius is increased. Otherwise, it is decreased and your Field of View is increased." },
            { Nombre: "Overcharge", imagen: "Resources/Images/Perks/Killer/Doctor/Overcharge.webp", activa: true, descripcion: "Overcharge a Generator by kicking it. The next Survivor to interact with it faces a difficult Skill Check." },
            { Nombre: "Overwhelming presence", imagen: "Resources/Images/Perks/Killer/Doctor/Overwhelming presence.webp", activa: true, descripcion: "Survivors within your Terror Radius suffer from an increased Item Consumption rate." }
        ]
    },
    {
        Nombre: "Cannibal",
        Retrato: "Resources/Images/Perks/Killer/Cannibal/K09_TheCannibal_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Barbecue chili", imagen: "Resources/Images/Perks/Killer/Cannibal/Barbecue chili.webp", activa: true, descripcion: "After hooking a Survivor, all other Survivors' Auras are revealed to you for a few seconds if they are far away." },
            { Nombre: "Franklins demise", imagen: "Resources/Images/Perks/Killer/Cannibal/Franklins demise.webp", activa: true, descripcion: "Your Basic Attacks cause Survivors to drop their Items. The dropped items lose charges over time." },
            { Nombre: "Knock out", imagen: "Resources/Images/Perks/Killer/Cannibal/Knock out.webp", activa: true, descripcion: "Survivors put into the Dying State by Basic Attacks have their Aura hidden from other Survivors at distance." }
        ]
    },
    {
        Nombre: "Nightmare",
        Retrato: "Resources/Images/Perks/Killer/Nightmare/K10_TheNightmare_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Blood Warden", imagen: "Resources/Images/Perks/Killer/Nightmare/Blood warden.webp", activa: true, descripcion: "Once the Exit Gates are opened, hooking a Survivor blocks the exits for all Survivors for a limited time." },
            { Nombre: "Fire up", imagen: "Resources/Images/Perks/Killer/Nightmare/Fire up.webp", activa: true, descripcion: "Each time a Generator is completed, you gain a stackable speed bonus to Picking Up, Dropping, Pallet breaking, and Vaulting." },
            { Nombre: "Remember me", imagen: "Resources/Images/Perks/Killer/Nightmare/Remember me.webp", activa: true, descripcion: "Hitting your Obsession increases the opening time of the Exit Gates for other Survivors." }
        ]
    },
    {
        Nombre: "Pig",
        Retrato: "Resources/Images/Perks/Killer/Pig/K11_ThePig_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Make your choice", imagen: "Resources/Images/Perks/Killer/Pig/Make your choice.webp", activa: true, descripcion: "When a Survivor rescues another from a hook far away, the rescuer suffers from the Exposed status effect." },
            { Nombre: "Scourge hook hangmans trick", imagen: "Resources/Images/Perks/Killer/Pig/Scourge hook hangmans trick.webp", activa: true, descripcion: "Gain a notification when a Survivor starts sabotaging a hook. Aura of Survivors are shown near Scourge Hooks." },
            { Nombre: "Suveillance", imagen: "Resources/Images/Perks/Killer/Pig/Surveillance.webp", activa: true, descripcion: "Regressing Generators are highlighted in white. If the regression is interrupted, the Generator is highlighted in yellow." }
        ]
    },
    {
        Nombre: "Clown",
        Retrato: "Resources/Images/Perks/Killer/Clown/K12_TheClown_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Bamboozle", imagen: "Resources/Images/Perks/Killer/Clown/Bamboozle.webp", activa: true, descripcion: "Vaulting is faster and temporarily blocks that window for Survivors." },
            { Nombre: "Coulrophobia", imagen: "Resources/Images/Perks/Killer/Clown/Coulrophobia.webp", activa: true, descripcion: "Survivors within your Terror Radius have their Healing speed significantly reduced." },
            { Nombre: "Pop goes the weasel", imagen: "Resources/Images/Perks/Killer/Clown/Pop goes the weasel.webp", activa: true, descripcion: "After hooking a Survivor, the next Generator you kick instantly loses a large chunk of its progress." }
        ]
    },
    {
        Nombre: "Spirit",
        Retrato: "Resources/Images/Perks/Killer/Spirit/K13_TheSpirit_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Hex haunted ground", imagen: "Resources/Images/Perks/Killer/Spirit/Hex haunted ground.webp", activa: true, descripcion: "Two trapped Hex Totems spawn. If one is cleansed, all Survivors suffer from the Exposed status effect." },
            { Nombre: "Rancor", imagen: "Resources/Images/Perks/Killer/Spirit/Rancor.webp", activa: true, descripcion: "Each time a generator is completed, you see all Survivors' locations and the Obsession sees yours. Once all gens are done, you can kill the Obsession." },
            { Nombre: "Spirit fury", imagen: "Resources/Images/Perks/Killer/Spirit/Spirit fury.webp", activa: true, descripcion: "After breaking a certain amount of Pallets, the next time you are stunned by one, The Entity instantly breaks it." }
        ]
    },
    {
        Nombre: "Legion",
        Retrato: "Resources/Images/Perks/Killer/Legion/K14_TheLegion_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Discordance", imagen: "Resources/Images/Perks/Killer/Legion/Discordance.webp", activa: true, descripcion: "Any Generator within range being repaired by two or more Survivors is highlighted in yellow." },
            { Nombre: "Iron maiden", imagen: "Resources/Images/Perks/Killer/Legion/Iron maiden.webp", activa: true, descripcion: "You open Lockers faster. Survivors who exit Lockers suffer from the Exposed status effect and reveal their location." },
            { Nombre: "Mad grit", imagen: "Resources/Images/Perks/Killer/Legion/Mad grit.webp", activa: true, descripcion: "While carrying a Survivor, you suffer no cool-down for missed attacks and hitting another Survivor pauses the wiggle timer." }
        ]
    },
    {
        Nombre: "Plague",
        Retrato: "Resources/Images/Perks/Killer/Plague/K15_ThePlague_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Corrupt intervention", imagen: "Resources/Images/Perks/Killer/Plague/Corrupt intervention.webp", activa: true, descripcion: "At the start of the Trial, the three Generators farthest from you are blocked by The Entity for a limited time." },
            { Nombre: "Dark devotion", imagen: "Resources/Images/Perks/Killer/Plague/Dark devotion.webp", activa: true, descripcion: "Hitting your Obsession with a Basic Attack causes them to emit your Terror Radius, while you become Undetectable." },
            { Nombre: "Infectious fright", imagen: "Resources/Images/Perks/Killer/Plague/Infectious fright.png", activa: true, descripcion: "When putting a Survivor into the Dying State with a Basic Attack, all other Survivors in your Terror Radius scream." }
        ]
    },
    {
        Nombre: "Ghost face",
        Retrato: "Resources/Images/Perks/Killer/Ghost face/K16_TheGhostface_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Furtive chase", imagen: "Resources/Images/Perks/Killer/Ghost face/Furtive chase.webp", activa: true, descripcion: "When you hook your Obsession, you gain Undetectable and Haste for a short duration." },
            { Nombre: "Im all ears", imagen: "Resources/Images/Perks/Killer/Ghost face/Im all ears.webp", activa: true, descripcion: "The Aura of a Survivor performing a rushed action near you is revealed for a few seconds." },
            { Nombre: "Thrilling tremors", imagen: "Resources/Images/Perks/Killer/Ghost face/Thrilling tremors.webp", activa: true, descripcion: "After picking up a Survivor, all Generators not being repaired are blocked by The Entity." }
        ]
    },
    {
        Nombre: "Demogorgon",
        Retrato: "Resources/Images/Perks/Killer/Demogorgon/K17_TheDemogorgon_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Cruel limits", imagen: "Resources/Images/Perks/Killer/Demogorgon/Cruel limits.webp", activa: true, descripcion: "Each time a Generator is completed, all Vault locations near it are blocked for all Survivors." },
            { Nombre: "Mindbreaker", imagen: "Resources/Images/Perks/Killer/Demogorgon/Mindbreaker.webp", activa: true, descripcion: "Survivors repairing Generators suffer from the Blindness and Exhausted status effects." },
            { Nombre: "Surge", imagen: "Resources/Images/Perks/Killer/Demogorgon/Surge.webp", activa: true, descripcion: "Putting a Survivor into the Dying State with a Basic Attack causes all Generators in range to explode and regress." }
        ]
    },
    {
        Nombre: "Oni",
        Retrato: "Resources/Images/Perks/Killer/Oni/K18_TheOni_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Blood echo", imagen: "Resources/Images/Perks/Killer/Oni/blood-echo.webp", activa: true, descripcion: "When a Survivor is hooked, all other injured Survivors suffer from Hemorrhage and Exhausted status effects." },
            { Nombre: "Nemesis", imagen: "Resources/Images/Perks/Killer/Oni/nemesis.webp", activa: true, descripcion: "A Survivor who stuns or blinds you becomes the Obsession and suffers from the Oblivious status effect." },
            { Nombre: "Zanshin tactics", imagen: "Resources/Images/Perks/Killer/Oni/zanshin-tactics.webp", activa: true, descripcion: "The Auras of all Breakable Walls, Pallets, and Vault locations are revealed to you within range." }
        ]
    },
    {
        Nombre: "Deathslinger",
        Retrato: "Resources/Images/Perks/Killer/Deathslinger/K19_TheDeathslinger_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Dead mans switch", imagen: "Resources/Images/Perks/Killer/Deathslinger/dead-mans-switch.webp", activa: true, descripcion: "After hooking a Survivor, any Survivor who stops repairing a Generator before it is finished causes The Entity to block it." },
            { Nombre: "Gearhead", imagen: "Resources/Images/Perks/Killer/Deathslinger/gearhead.webp", activa: true, descripcion: "After a Survivor loses a health state, the next time a Survivor performs a Great Skill Check, the Generator's Aura is revealed." },
            { Nombre: "Hex retribution", imagen: "Resources/Images/Perks/Killer/Deathslinger/hex-retribution.webp", activa: true, descripcion: "Survivors who cleanse or bless any Totem suffer from the Oblivious status effect." }
        ]
    },
    {
        Nombre: "Executioner",
        Retrato: "Resources/Images/Perks/Killer/Executioner/K20_TheExecutioner_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Deathbound", imagen: "Resources/Images/Perks/Killer/Executioner/deathbound.png", activa: true, descripcion: "When a Survivor heals another Survivor far away, the healer screams and triggers Oblivious when near the healed." },
            { Nombre: "Forced penance", imagen: "Resources/Images/Perks/Killer/Executioner/forced-penance.webp", activa: true, descripcion: "Survivors who take a Protection Hit suffer from the Broken status effect for a long duration." },
            { Nombre: "Trail of torment", imagen: "Resources/Images/Perks/Killer/Executioner/trail-of-torment.webp", activa: true, descripcion: "After kicking a Generator, you become Undetectable until the Generator stops regressing or a Survivor is put in Dying State." }
        ]
    },
    {
        Nombre: "Blight",
        Retrato: "Resources/Images/Perks/Killer/Blight/K21_TheBlight_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Dragons grip", imagen: "Resources/Images/Perks/Killer/Blight/dragons-grip.webp", activa: true, descripcion: "After kicking a Generator, the first Survivor to interact with it screams and suffers from the Exposed status effect." },
            { Nombre: "Hex blood favor", imagen: "Resources/Images/Perks/Killer/Blight/hex-blood-favor.webp", activa: true, descripcion: "When a Survivor is hit, Pallets within a certain range are held in place by The Entity and cannot be pulled down." },
            { Nombre: "Hex undying", imagen: "Resources/Images/Perks/Killer/Blight/hex-undying.webp", activa: true, descripcion: "While active, the Auras of Survivors near any Totem are revealed. It also protects other Hexes by transferring them to this Totem." }
        ]
    },
    {
        Nombre: "Twins",
        Retrato: "Resources/Images/Perks/Killer/Twins/K22_TheTwins_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Coup de grace", imagen: "Resources/Images/Perks/Killer/Twins/coup-de-grace.webp", activa: true, descripcion: "Each time a Generator is completed, you gain a token. Consume a token to increase the distance of your next Lunge Attack." },
            { Nombre: "Hoarder", imagen: "Resources/Images/Perks/Killer/Twins/hoarder.webp", activa: true, descripcion: "Receive a Loud Noise notification when a Survivor interacts with a Chest or picks up an Item within range." },
            { Nombre: "Oppression", imagen: "Resources/Images/Perks/Killer/Twins/oppression.webp", activa: true, descripcion: "When you kick a Generator, up to three other random Generators also begin to regress." }
        ]
    },
    {
        Nombre: "Trickster",
        Retrato: "Resources/Images/Perks/Killer/Trickster/K23_TheTrickster_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Hex crowd control", imagen: "Resources/Images/Perks/Killer/Trickster/hex-crowd-control.webp", activa: true, descripcion: "The Entity blocks a window for a few seconds after a Survivor performs a rushed vault through it." },
            { Nombre: "No way out", imagen: "Resources/Images/Perks/Killer/Trickster/no-way-out.webp", activa: true, descripcion: "When a Survivor interacts with an Exit Gate switch, you receive a notification and the gates are blocked for a duration based on tokens." },
            { Nombre: "Starstruck", imagen: "Resources/Images/Perks/Killer/Trickster/starstruck.webp", activa: true, descripcion: "While carrying a Survivor, all other Survivors within your Terror Radius suffer from the Exposed status effect." }
        ]
    },
    {
        Nombre: "Nemesis",
        Retrato: "Resources/Images/Perks/Killer/Nemesis/K24_TheNemesis_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Eruption", imagen: "Resources/Images/Perks/Killer/Nemesis/eruption.webp", activa: true, descripcion: "After kicking a Generator, its Aura is highlighted. Putting a Survivor in Dying State causes all highlighted gens to explode." },
            { Nombre: "Hysteria", imagen: "Resources/Images/Perks/Killer/Nemesis/hysteria.webp", activa: true, descripcion: "Whenever a healthy Survivor is put into the Injured state by any means, all injured Survivors suffer from the Oblivious status effect." },
            { Nombre: "Lethal pursuer", imagen: "Resources/Images/Perks/Killer/Nemesis/lethal-pursuer.webp", activa: true, descripcion: "At the start of the Trial, the Auras of all Survivors are revealed to you for a few seconds. Increases the duration of other Aura reveals." }
        ]
    },
    {
        Nombre: "Cenobite",
        Retrato: "Resources/Images/Perks/Killer/Cenobite/K25_TheCenobite_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Deadlock", imagen: "Resources/Images/Perks/Killer/Cenobite/deadlock.webp", activa: true, descripcion: "After a Generator is completed, The Entity blocks the Generator with the most progress for a limited time." },
            { Nombre: "Hex plaything", imagen: "Resources/Images/Perks/Killer/Cenobite/hex-plaything.webp", activa: true, descripcion: "The first time you hook a Survivor, a Hex Totem is activated, making that Survivor Oblivious until it is cleansed." },
            { Nombre: "Scourge hook gift of pain", imagen: "Resources/Images/Perks/Killer/Cenobite/scourge-hook-gift-of-pain.png", activa: true, descripcion: "Survivors unhooked from a Scourge Hook suffer from Hemorrhage and Mangled. Once healed, they receive a speed penalty." }
        ]
    },
    {
        Nombre: "Artist",
        Retrato: "Resources/Images/Perks/Killer/Artist/K26_TheArtist_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Grim embrace", imagen: "Resources/Images/Perks/Killer/Artist/grim-embrace.webp", activa: true, descripcion: "Each time a Survivor is hooked for the first time, you gain a token. At 4 tokens, all Generators are blocked by The Entity." },
            { Nombre: "Hex pentimento", imagen: "Resources/Images/Perks/Killer/Artist/hex-pentimento.webp", activa: true, descripcion: "You can see the Auras of destroyed Totems and perform a ritual to create a Resurrected Totem with various penalties for Survivors." },
            { Nombre: "Scourge hook pain resonance", imagen: "Resources/Images/Perks/Killer/Artist/scourge-hook-pain-resonance.webp", activa: true, descripcion: "Whenever a Survivor is hooked on a Scourge Hook, the Generator with the most progress explodes and loses progress." }
        ]
    },
    {
        Nombre: "Sadako",
        Retrato: "Resources/Images/Perks/Killer/Onryo/K27_TheOnryo_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Call of brine", imagen: "Resources/Images/Perks/Killer/Onryo/call-of-brine.webp", activa: true, descripcion: "After kicking a Generator, it regresses at 200% speed and you receive a notification if a Survivor hits a Good Skill Check on it." },
            { Nombre: "Merciless storm", imagen: "Resources/Images/Perks/Killer/Onryo/merciless-storm.webp", activa: true, descripcion: "When a Generator reaches 90% progress, Survivors face continuous Skill Checks. If they miss or stop, the Generator is blocked." },
            { Nombre: "Scourge hook floods of rage", imagen: "Resources/Images/Perks/Killer/Onryo/scourge-hook-floods-of-rage.webp", activa: true, descripcion: "When a Survivor is unhooked from a Scourge Hook, the Auras of all other Survivors are revealed for a few seconds." }
        ]
    },
    {
        Nombre: "Dredge",
        Retrato: "Resources/Images/Perks/Killer/Dredge/K28_TheDredge_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Darkness revealed", imagen: "Resources/Images/Perks/Killer/Dredge/darkness-revealed.webp", activa: true, descripcion: "When you search a Locker, the Auras of all Survivors near any Locker are revealed for a few seconds." },
            { Nombre: "Dissolution", imagen: "Resources/Images/Perks/Killer/Dredge/dissolution.webp", activa: true, descripcion: "After injuring a Survivor, if a Survivor performs a fast vault over a Pallet in your Terror Radius, it is destroyed." },
            { Nombre: "Septic touch", imagen: "Resources/Images/Perks/Killer/Dredge/septic-touch.webp", activa: true, descripcion: "Survivors performing a Healing action within your Terror Radius suffer from Blindness and Exhausted status effects." }
        ]
    },
    {
        Nombre: "Mastermind",
        Retrato: "Resources/Images/Perks/Killer/Mastermind/K29_TheMasterMind_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Awakened awareness", imagen: "Resources/Images/Perks/Killer/Mastermind/awakened-awareness.webp", activa: true, descripcion: "While carrying a Survivor, the Auras of all Survivors within your Terror Radius are revealed to you." },
            { Nombre: "Superior anatomy", imagen: "Resources/Images/Perks/Killer/Mastermind/superior-anatomy.webp", activa: true, descripcion: "When a Survivor performs a fast vault within range, your next vault speed is significantly increased." },
            { Nombre: "Terminus", imagen: "Resources/Images/Perks/Killer/Mastermind/terminus.webp", activa: true, descripcion: "Once the Exit Gates are powered, all injured, downed, or hooked Survivors suffer from the Broken status effect." }
        ]
    },
    {
        Nombre: "Knight",
        Retrato: "Resources/Images/Perks/Killer/Knight/K30_TheKnight_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Hex face the darkness", imagen: "Resources/Images/Perks/Killer/Knight/hex-face-the-darkness.webp", activa: true, descripcion: "Injuring a Survivor creates a Hex that causes all other Survivors outside your Terror Radius to scream periodically." },
            { Nombre: "Hubris", imagen: "Resources/Images/Perks/Killer/Knight/hubris.webp", activa: true, descripcion: "Whenever you are stunned by a Survivor, that Survivor suffers from the Exposed status effect for a limited time." },
            { Nombre: "Nowhere to hide", imagen: "Resources/Images/Perks/Killer/Knight/nowhere-to-hide.webp", activa: true, descripcion: "Whenever you kick a Generator, the Auras of all Survivors within a certain range are revealed to you." }
        ]
    },
    {
        Nombre: "Skull Merchant",
        Retrato: "Resources/Images/Perks/Killer/Skull merchant/K31_TheSkullMerchant_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Game afoot", imagen: "Resources/Images/Perks/Killer/Skull merchant/game-afoot.webp", activa: true, descripcion: "While chasing your Obsession, kicking a Generator or breaking a Pallet/Wall grants a Haste status effect." },
            { Nombre: "Leverage", imagen: "Resources/Images/Perks/Killer/Skull merchant/leverage.webp", activa: true, descripcion: "Each time you hook a Survivor, gain a token. Each token reduces the speed at which Survivors heal for a limited time." },
            { Nombre: "Thwack", imagen: "Resources/Images/Perks/Killer/Skull merchant/thwack.webp", activa: true, descripcion: "After hooking a Survivor, breaking a Pallet or Wall causes Survivors within range to scream and reveal their Aura." }
        ]
    },
    {
        Nombre: "Singularity",
        Retrato: "Resources/Images/Perks/Killer/Singularity/K32_TheSingularity_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Forced hesitation", imagen: "Resources/Images/Perks/Killer/Singularity/forced-hesitation.webp", activa: true, descripcion: "When a Survivor is put in the Dying State, all other Survivors in proximity suffer from the Hindered status effect." },
            { Nombre: "Genetic limits", imagen: "Resources/Images/Perks/Killer/Singularity/genetic-limits.webp", activa: true, descripcion: "When a Survivor finishes a Healing action, they suffer from the Exhausted status effect for a limited duration." },
            { Nombre: "Machine learning", imagen: "Resources/Images/Perks/Killer/Singularity/machine-learning.webp", activa: true, descripcion: "After kicking a Generator, it becomes compromised. When it's completed, you gain Haste and Undetectable." }
        ]
    },
    {
        Nombre: "Xenomorph",
        Retrato: "Resources/Images/Perks/Killer/Xenomorph/K33_TheXenomorph_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Alien instinct", imagen: "Resources/Images/Perks/Killer/Xenomorph/alien-instinct.webp", activa: true, descripcion: "After hooking a Survivor, the Aura of the farthest injured Survivor is revealed and they suffer from Oblivious." },
            { Nombre: "Rapid brutality", imagen: "Resources/Images/Perks/Killer/Xenomorph/rapid-brutality.webp", activa: true, descripcion: "You no longer gain Bloodlust. However, hitting a Survivor with a Basic Attack grants you a Haste status effect." },
            { Nombre: "Ultimate weapon", imagen: "Resources/Images/Perks/Killer/Xenomorph/ultimate-weapon.webp", activa: true, descripcion: "After searching a Locker, Survivors entering your Terror Radius scream and suffer from Blindness for a duration." }
        ]
    },
    {
        Nombre: "Good guy",
        Retrato: "Resources/Images/Perks/Killer/Good guy/K34_TheYerkes_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Batteries included", imagen: "Resources/Images/Perks/Killer/Good guy/batteries-included.webp", activa: true, descripcion: "While near a completed Generator, you gain a Haste status effect." },
            { Nombre: "Friends til the end", imagen: "Resources/Images/Perks/Killer/Good guy/friends-til-the-end.webp", activa: true, descripcion: "Hooking a Survivor reveals the Obsession's Aura. Hooking the Obsession exposes a random Survivor." },
            { Nombre: "Hex two can play", imagen: "Resources/Images/Perks/Killer/Good guy/hex-two-can-play.webp", activa: true, descripcion: "Any Survivor who stuns or blinds you a certain number of times activates this Hex, which blinds them back." }
        ]
    },
    {
        Nombre: "Unknown",
        Retrato: "Resources/Images/Perks/Killer/Unknown/K35_TheUnknown_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Unbound", imagen: "Resources/Images/Perks/Killer/Unknown/unbound.webp", activa: true, descripcion: "After injuring a Survivor by any means, vaulting a window grants a Haste status effect." },
            { Nombre: "Undone", imagen: "Resources/Images/Perks/Killer/Unknown/undone.webp", activa: true, descripcion: "When Survivors miss a Skill Check, you gain tokens. Kicking a Generator consumes tokens to increase regression." },
            { Nombre: "Unforeseen", imagen: "Resources/Images/Perks/Killer/Unknown/unforeseen.webp", activa: true, descripcion: "Kicking a Generator transfers your Terror Radius to it and grants you the Undetectable status effect." }
        ]
    },
    {
        Nombre: "Lich",
        Retrato: "Resources/Images/Perks/Killer/Lich/K36_TheLich_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Dark arrogance", imagen: "Resources/Images/Perks/Killer/Lich/dark-arrogance.webp", activa: true, descripcion: "Increases your vault speed but also increases the duration of stuns and blinds against you." },
            { Nombre: "Languid touch", imagen: "Resources/Images/Perks/Killer/Lich/languid-touch.webp", activa: true, descripcion: "When a Survivor scares a Crow near you, they suffer from the Exhausted status effect." },
            { Nombre: "Weave attunement", imagen: "Resources/Images/Perks/Killer/Lich/weave-attunement.webp", activa: true, descripcion: "When an item is depleted or dropped, it reveals the Auras of nearby Survivors. Survivors picking up items are revealed." }
        ]
    },
    {
        Nombre: "Dark lord",
        Retrato: "Resources/Images/Perks/Killer/Dark lord/K37_TheDracula_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Dominance", imagen: "Resources/Images/Perks/Killer/Dark lord/dominance.webp", activa: true, descripcion: "The first time each Totem or Chest is interacted with by a Survivor, it is blocked by The Entity temporarily." },
            { Nombre: "Hex wretched fate", imagen: "Resources/Images/Perks/Killer/Dark lord/hex-wretched-fate.webp", activa: true, descripcion: "After a Generator is completed, one random Survivor becomes Obsession and suffers from a massive repair penalty." },
            { Nombre: "Human greed", imagen: "Resources/Images/Perks/Killer/Dark lord/human-greed.webp", activa: true, descripcion: "You see the Auras of unopened Chests. When a Survivor interacts with a Chest, you receive a notification." }
        ]
    },
    {
        Nombre: "Houndmaster",
        Retrato: "Resources/Images/Perks/Killer/Houndmaster/K38_TheHoundmaster_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "All shaking thunder", imagen: "Resources/Images/Perks/Killer/Houndmaster/all-shaking-thunder.webp", activa: true, descripcion: "Falling from a height causes all Survivors within range to scream and reveal their locations." },
            { Nombre: "No quarter", imagen: "Resources/Images/Perks/Killer/Houndmaster/no-quarter.webp", activa: true, descripcion: "Injured Survivors who are not being chased suffer from the Broken status effect for a duration." },
            { Nombre: "Scourge hook jagged compass", imagen: "Resources/Images/Perks/Killer/Houndmaster/scourge-hook-jagged-compass.webp", activa: true, descripcion: "After hooking a Survivor on a Scourge Hook, the Aura of the Generator with the most progress is revealed." }
        ]
    },
    {
        Nombre: "Ghoul",
        Retrato: "Resources/Images/Perks/Killer/Ghoul/K39_TheGhoul_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Forever entwined", imagen: "Resources/Images/Perks/Killer/Ghoul/forever-entwined.webp", activa: true, descripcion: "When a Survivor heals another Survivor, their Auras are revealed to you for a short time." },
            { Nombre: "Hex nothing but misery", imagen: "Resources/Images/Perks/Killer/Ghoul/hex-nothing-but-misery.webp", activa: true, descripcion: "While active, Survivors suffer from a Hindered status effect whenever they are within your Terror Radius." },
            { Nombre: "None are free", imagen: "Resources/Images/Perks/Killer/Ghoul/none-are-free.webp", activa: true, descripcion: "Each time you hook a unique Survivor, all Survivors receive a stackable penalty to action speeds." }
        ]
    },
    {
        Nombre: "Animatronic",
        Retrato: "Resources/Images/Perks/Killer/Animatronic/K40_TheAnimatronic_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Haywire", imagen: "Resources/Images/Perks/Killer/Animatronic/haywire.webp", activa: true, descripcion: "Kicking a Generator causes Skill Checks to trigger more frequently and with reversed rotation." },
            { Nombre: "Help wanted", imagen: "Resources/Images/Perks/Killer/Animatronic/help-wanted.webp", activa: true, descripcion: "While a Survivor is hooked, you see the Aura of any Survivor interacting with a Generator." },
            { Nombre: "Phantom fear", imagen: "Resources/Images/Perks/Killer/Animatronic/phantom-fear.webp", activa: true, descripcion: "Survivors who are Oblivious scream and reveal their location when you come within range." }
        ]
    },
    {
        Nombre: "Krasue",
        Retrato: "Resources/Images/Perks/Killer/Krasue/T_UI_K41_TheKrasue_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Hex overture of doom", imagen: "Resources/Images/Perks/Killer/Krasue/hex-overture-of-doom.webp", activa: true, descripcion: "While the Hex is active, all Generators regress at a percentage of their normal speed constantly." },
            { Nombre: "Ravenous", imagen: "Resources/Images/Perks/Killer/Krasue/ravenous.webp", activa: true, descripcion: "After eating/breaking a pallet, you gain a temporary speed boost to your next attack." },
            { Nombre: "Wandering eye", imagen: "Resources/Images/Perks/Killer/Krasue/wandering-eye.webp", activa: true, descripcion: "The Auras of Survivors who are standing still are revealed to you periodically." }
        ]
    },
    {
        Nombre: "First",
        Retrato: "Resources/Images/Perks/Killer/First/T_UI_K42_TheFirst_Portrait.png",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "Hex hive mind", imagen: "Resources/Images/Perks/Killer/First/hex-hive-mind.png", activa: true, descripcion: "Survivors working on the same Generator suffer from the Exposed status effect." },
            { Nombre: "Secret project", imagen: "Resources/Images/Perks/Killer/First/secret-project.png", activa: true, descripcion: "Kicking a Generator locks it, preventing any progress for a limited time." },
            { Nombre: "Turn back the clock", imagen: "Resources/Images/Perks/Killer/First/turn-back-the-clock.webp", activa: true, descripcion: "Whenever a Survivor is healed, you see their Aura and they suffer from the Hemorrhage status effect." }
        ]
    },
    {
        Nombre: "",
        Retrato: "",
        PersonajeActivo: true,
        Perks: [
            { Nombre: "", imagen: "", activa: true },
            { Nombre: "", imagen: "", activa: true },
            { Nombre: "", imagen: "", activa: true },
        ]
    },
]

// Esta función lee la lista correcta según el rol y crea las imágenes en el menú lateral
function CargarMenu() {
    // 1. Decidimos qué base de datos usar
    let baseDeDatos;
    if (rolActual === "killer") {
        baseDeDatos = Asesinos;
    } else {
        baseDeDatos = Sobrevivientes;
    }

    const contenedor = document.getElementById("ContenedorSobreviviente");
    contenedor.innerHTML = ""; // Limpia el menú antes de volver a dibujar

    // 2. Recorremos cada personaje de la base de datos elegida
    baseDeDatos.forEach((personaje, index) => {
        if (personaje.Nombre === "") return; // Si no tiene nombre, se lo salta

        // Determina el color (verde si está activo, gris si está inactivo)
        const colorP = personaje.PersonajeActivo ? "#0f0" : "#555";
        const filtroP = personaje.PersonajeActivo ? "none" : "grayscale(100%) opacity(0.4)";

        // Hace lo mismo de los colores y filtros para cada una de las 3 perks
        const colorPk0 = personaje.Perks[0].activa ? "#0f0" : "#555";
        const filtroPk0 = personaje.Perks[0].activa ? "none" : "grayscale(100%) opacity(0.4)";

        const colorPk1 = personaje.Perks[1].activa ? "#0f0" : "#555";
        const filtroPk1 = personaje.Perks[1].activa ? "none" : "grayscale(100%) opacity(0.4)";

        const colorPk2 = personaje.Perks[2].activa ? "#0f0" : "#555";
        const filtroPk2 = personaje.Perks[2].activa ? "none" : "grayscale(100%) opacity(0.4)";

        // Arma el bloque de código HTML de cada personaje
        const diseñoHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 5px; width: 90px;">
                
                <img src="${personaje.Retrato}" onclick="TogglePersonaje(${index})" style="width: 90px; height: 110px; border: 0px solid ${colorP}; border-radius: 5px; background: black; cursor: pointer; filter: ${filtroP}; transition: filter 0.2s; object-fit: cover;">
                
                <span style="font-size: 13px; font-weight: bold; color: ${personaje.PersonajeActivo ? 'white' : '#888'}; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">${personaje.Nombre}</span>
                
                ` + (personaje.SinPerks ? `
                <div style="height: 25px;"></div>
                ` : `
                <div style="display: flex; justify-content: center; gap: 4px;">
                    <img src="${personaje.Perks[0].imagen}" onclick="TogglePerk(${index}, 0)" style="width: 25px; height: 25px; cursor: pointer; border-bottom: 0px solid ${colorPk0}; filter: ${filtroPk0}; transition: filter 0.2s;">
                    <img src="${personaje.Perks[1].imagen}" onclick="TogglePerk(${index}, 1)" style="width: 25px; height: 25px; cursor: pointer; border-bottom: 0px solid ${colorPk1}; filter: ${filtroPk1}; transition: filter 0.2s;">
                    <img src="${personaje.Perks[2].imagen}" onclick="TogglePerk(${index}, 2)" style="width: 25px; height: 25px; cursor: pointer; border-bottom: 0px solid ${colorPk2}; filter: ${filtroPk2}; transition: filter 0.2s;">
                </div>
                `) + `

            </div>
        `;
        
        // Pega el código de este personaje en la pantalla
        contenedor.innerHTML += diseñoHTML;
    });
}

// Esta función revisa si el interruptor azul debe estar encendido o gris
function RevisarEstadoSwitch() {
    // 1. Decidimos qué base de datos usar
    let baseDeDatos = rolActual === "killer" ? Asesinos : Sobrevivientes;
    
    // Comprueba si hay al menos UN personaje (que no sea SiempreActivo) encendido
    const hayAlgunoEncendido = baseDeDatos.some(p => p.SiempreActivo !== true && p.Nombre !== "" && p.PersonajeActivo === true);

    const switchAll = document.getElementById("switchAll");
    const dot = document.getElementById("sliderDot");
    const bg = dot.parentElement;

    // Si hay alguno encendido, pinta el switch del color del rol
    if(hayAlgunoEncendido) {
        switchAll.checked = true;
        // Si es killer lo pinta rojo, si no, azul
        bg.style.backgroundColor = rolActual === "killer" ? "#f44336" : "#2196F3"; 
        dot.style.left = "28px";
    } 
    // Si todos están apagados, lo pinta de gris
    else {
        switchAll.checked = false;
        bg.style.backgroundColor = "#ccc";
        dot.style.left = "4px";
    }
}

// Cuando tocas el retrato de un personaje para apagarlo/encenderlo
function TogglePersonaje(index) {
    // 1. Decidimos qué base de datos usar
    let baseDeDatos = rolActual === "killer" ? Asesinos : Sobrevivientes;

    if (baseDeDatos[index].SiempreActivo === true) return; // Si es intocable, se sale de la función
    
    // Cambia el estado del personaje (Si estaba en True pasa a False y viceversa)
    baseDeDatos[index].PersonajeActivo = !baseDeDatos[index].PersonajeActivo;
    const estado = baseDeDatos[index].PersonajeActivo;
    
    // Iguala el estado de las 3 perks al del personaje
    baseDeDatos[index].Perks[0].activa = estado;
    baseDeDatos[index].Perks[1].activa = estado;
    baseDeDatos[index].Perks[2].activa = estado;

    // Vuelve a dibujar el menú para que se vean los colores nuevos
    CargarMenu();
    RevisarEstadoSwitch();
}

// Cuando tocas una sola perk debajo del personaje
function TogglePerk(indexPersonaje, indexPerk) {
    // 1. Decidimos qué base de datos usar
    let baseDeDatos = rolActual === "killer" ? Asesinos : Sobrevivientes;

    if (baseDeDatos[indexPersonaje].SiempreActivo === true) return;
    
    const p = baseDeDatos[indexPersonaje];
    // Cambia el estado solo de la perk que tocaste
    p.Perks[indexPerk].activa = !p.Perks[indexPerk].activa;

    // REGLA: Si apagas las 3 perks, el personaje se apaga automáticamente
    if (!p.Perks[0].activa || !p.Perks[1].activa || !p.Perks[2].activa) {
        p.PersonajeActivo = false;
    }
    
    CargarMenu();
    RevisarEstadoSwitch();
}

// Cuando tocas el Switch azul maestro arriba
function ToggleTodos(estado) {
    const dot = document.getElementById("sliderDot");
    const bg = dot.parentElement;

    // Cambia visualmente el color del switch dependiendo del rol
    if(estado) {
        bg.style.backgroundColor = rolActual === "killer" ? "#f44336" : "#2196F3";
        dot.style.left = "28px";
    } else {
        bg.style.backgroundColor ='#ccc';
        dot.style.left = "4px";
    }

    // 1. Decidimos qué base de datos usar
    let baseDeDatos = rolActual === "killer" ? Asesinos : Sobrevivientes;

    // Recorre toda la lista y apaga o enciende a todos los que se dejen
    baseDeDatos.forEach((personaje) => {
        if (personaje.SiempreActivo !== true && personaje.Nombre !== "") {
            personaje.PersonajeActivo = estado;
            personaje.Perks[0].activa = estado;
            personaje.Perks[1].activa = estado;
            personaje.Perks[2].activa = estado;
        }
    });
    CargarMenu();
}

// Llama a estas dos funciones al abrir la página por primera vez
CargarMenu();
RevisarEstadoSwitch();

// Lista de perks universales
// Lista de perks universales
// Lista de perks universales de Sobrevivientes
const PerksUniversales = [
    { Nombre: "Deja vu", imagen: "Resources/Images/Perks/Survivor/Universal/Deja vu.webp", activa: true, descripción: "Reveals the auras of the 3 closest generators to each other and grants a repair speed bonus when working on them." },
    { Nombre: "Hope", imagen: "Resources/Images/Perks/Survivor/Universal/Hope.webp", activa: true, descripción: "As soon as the exit gates are powered, you gain a permanent 7% Haste status effect." },
    { Nombre: "Kindred", imagen: "Resources/Images/Perks/Survivor/Universal/Kindred.webp", activa: true, descripción: "While you are on the hook, all survivors' auras are revealed to one another, and the killer's aura is revealed if they are near the hook." },
    { Nombre: "Lightweight", imagen: "Resources/Images/Perks/Survivor/Universal/Lightweight.webp", activa: true, descripción: "Your scratch marks fade much faster than normal and are spaced further apart." },
    { Nombre: "No one left behind", imagen: "Resources/Images/Perks/Survivor/Universal/No one left behind.webp", activa: true, descripción: "Once the exit gates are powered, you unhook and heal allies significantly faster, and grant them a speed boost." },
    { Nombre: "Plunderer's instinct", imagen: "Resources/Images/Perks/Survivor/Universal/Plunderers instinct.webp", activa: true, descripción: "The auras of unopened chests and dropped items are revealed to you, and you have a much higher chance of finding items of a higher rarity." },
    { Nombre: "Premonition", imagen: "Resources/Images/Perks/Survivor/Universal/Premonition.webp", activa: true, descripción: "You receive an auditory warning when looking in the direction of the killer within a certain range." },
    { Nombre: "Resilience", imagen: "Resources/Images/Perks/Survivor/Universal/Resilience.webp", activa: true, descripción: "Grants a 9% speed bonus to repairing, healing, sabotaging, unhooking, vaulting, cleansing, and opening exit gates while injured." },
    { Nombre: "Slippery meat", imagen: "Resources/Images/Perks/Survivor/Universal/Slippery meat.webp", activa: true, descripción: "Grants additional self-unhook attempts and increases the chance to free yourself from Bear Traps." },
    { Nombre: "Small game", imagen: "Resources/Images/Perks/Survivor/Universal/Small game.webp", activa: true, descripción: "You receive an auditory warning when looking in the direction of killer traps or totems." },
    { Nombre: "Spine chill", imagen: "Resources/Images/Perks/Survivor/Universal/Spine chill.webp", activa: true, descripción: "The perk lights up when the killer is looking in your direction and is within range. Increases vault speed slightly." },
    { Nombre: "This is not happening", imagen: "Resources/Images/Perks/Survivor/Universal/This is not happening.webp", activa: true, descripción: "The success zones of great skill checks are significantly larger when you are injured." },
    { Nombre: "We'll make it", imagen: "Resources/Images/Perks/Survivor/Universal/Well make it.webp", activa: true, descripción: "For 90 seconds after rescuing a survivor from a hook, your healing speed on others is increased by 100%." }
];

// Lista temporal de perks universales de Asesino (las convertí a objetos para que no den error)
const PerksUniversalesAsesino = [
    { Nombre: "Bitter Murmur", imagen: "Resources/Images/Perks/Killer/Universal/bitter-murmur.webp", activa: true, descripción: "When a generator is completed, auras of survivors nearby are revealed. When the last is completed, all auras are revealed." },
    { Nombre: "Dark Sense", imagen: "Resources/Images/Perks/Killer/Universal/dark-sense.webp", activa: true, descripción: "Unlocks potential in one's aura-reading ability. When a generator is completed, the Killer's aura is revealed to you." }, // Nota: Dark sense suele ser de sobreviviente, pero le dejo su descripción real.
    { Nombre: "Deerstalker", imagen: "Resources/Images/Perks/Killer/Universal/deerstalker.webp", activa: true, descripción: "Reveals the auras of dying survivors when they are within range." },
    { Nombre: "Distressing", imagen: "Resources/Images/Perks/Killer/Universal/distressing.webp", activa: true, descripción: "Increases your Terror Radius and grants more Bloodpoints in the Deviousness category." },
    { Nombre: "NOED", imagen: "Resources/Images/Perks/Killer/Universal/hex-no-one-escapes-death.webp", activa: true, descripción: "Once the exit gates are powered, if there is a dull totem remaining, you gain increased movement speed and survivors suffer from the Exposed status effect." },
    { Nombre: "Thrill of the Hunt", imagen: "Resources/Images/Perks/Killer/Universal/hex-thrill-of-the-hunt.webp", activa: true, descripción: "For each dull and hex totem remaining, gain a stackable bonus to Bloodpoints and reduce survivors' cleansing/blessing speed." },
    { Nombre: "Insidious", imagen: "Resources/Images/Perks/Killer/Universal/insidious.webp", activa: true, descripción: "Standing still for a few seconds grants you the Undetectable status effect." },
    { Nombre: "Iron Grasp", imagen: "Resources/Images/Perks/Killer/Universal/iron-grasp.webp", activa: true, descripción: "Reduces the effects of survivor struggling and increases the time required for them to wiggle free." },
    { Nombre: "Monstrous Shrine", imagen: "Resources/Images/Perks/Killer/Universal/scourge-hook-monstrous-shrine.webp", activa: true, descripción: "The basement hooks become Scourge Hooks. Grants faster Entity progression if the killer is far away." },
    { Nombre: "Shattered Hope", imagen: "Resources/Images/Perks/Killer/Universal/shattered-hope.webp", activa: true, descripción: "Destroying a Boon totem permanently removes it from the trial and reveals the auras of survivors inside its range." },
    { Nombre: "Sloppy Butcher", imagen: "Resources/Images/Perks/Killer/Universal/sloppy-butcher.webp", activa: true, descripción: "Basic attacks inflict the Mangled and Hemorrhage status effects, increasing healing time and causing blood pools to drop faster." },
    { Nombre: "Spies From the Shadows", imagen: "Resources/Images/Perks/Killer/Universal/spies-from-the-shadows.webp", activa: true, descripción: "Crows startled by survivors alert you with a visual cue when you are within range." },
    { Nombre: "Unrelenting", imagen: "Resources/Images/Perks/Killer/Universal/unrelenting.webp", activa: true, descripción: "Reduces the cooldown of missed basic attacks." },
    { Nombre: "Whispers", imagen: "Resources/Images/Perks/Killer/Universal/whispers.webp", activa: true, descripción: "You hear the Entity's whispers when at least one survivor is within a certain radius." }
];

// Función que se ejecuta al darle clic a "Shuffle"
// Función que se ejecuta al darle clic a "Shuffle"
function MezclarPerks() {
    const izq = document.getElementById("Izquierda");
    const arr = document.getElementById("Arriba");
    const aba = document.getElementById("Abajo");
    const der = document.getElementById("Derecha");

    let perksUniversalesAUsar = rolActual === "killer" ? PerksUniversalesAsesino : PerksUniversales;
    let baseDeDatos = rolActual === "killer" ? Asesinos : Sobrevivientes;

    let perksDisponibles = [...perksUniversalesAUsar];

    // Recolectar todas las perks activas
    baseDeDatos.forEach((personaje) => {
        if (personaje.Nombre === "" || personaje.SinPerks === true) return;
        personaje.Perks.forEach((perk) => {
            if (perk.activa === true && perk.imagen !== "") {
                perksDisponibles.push(perk);
            }
        });
    });

    // Revolvemos TODA la lista disponible primero
    perksDisponibles.sort(() => 0.5 - Math.random());

    // Revisa si el switch del Smart Filter está encendido
    const filtroActivado = document.getElementById("switchFiltro") ? document.getElementById("switchFiltro").checked : false;

    let perksElegidas = [];
    let categoriasElegidas = []; // Aquí guardaremos las categorías que ya salieron para no repetirlas
    let tieneBroken = false; // Flag especial para No Mither

    // Empezamos a sacar perks de la tómbola revuelta
    for (let i = 0; i < perksDisponibles.length; i++) {
        if (perksElegidas.length === 4) break; // Ya tenemos las 4, dejamos de buscar

        let perkCandidata = perksDisponibles[i];
        let aceptarPerk = true;

        // === REGLAS DEL SMART FILTER (SOLO PARA SOBREVIVIENTES) ===
        if (filtroActivado && rolActual === "survivor" && perkCandidata.categoria) {
            const cat = perkCandidata.categoria;

            // 1. Evitar más de un Agotamiento (Exhaustion)
            if (cat === "Exhaustion" && categoriasElegidas.includes("Exhaustion")) {
                aceptarPerk = false;
            }
            
            // 2. Evitar que "Solidarity" y "Clean break" salgan juntas
            if (cat === "SolidarityConflict" && categoriasElegidas.includes("SolidarityConflict")) {
                aceptarPerk = false;
            }

            // 3. Choque de Gritos (Calm Spirit te calla, Scene Partner te obliga a gritar)
            if (cat === "Scream" && categoriasElegidas.includes("Scream")) {
                aceptarPerk = false;
            }

            // 4. Choque de No Mither (Roto/Broken) vs Perks de Curación
            // Si sale No Mither, no pueden salir perks de curación.
            if (cat === "Broken") {
                if (categoriasElegidas.includes("Heal")) {
                    aceptarPerk = false; // Si ya salió una de curar, rechaza No Mither
                } else {
                    tieneBroken = true; // Marca que tienes Broken
                }
            }
            
            // Si es una de curación, y ya tienes No Mither, se rechaza
            if (cat === "Heal" && tieneBroken) {
                aceptarPerk = false;
            }
        }

        // Si pasó el filtro (o si el filtro está apagado), la guardamos
        if (aceptarPerk) {
            perksElegidas.push(perkCandidata);
            if (perkCandidata.categoria) {
                categoriasElegidas.push(perkCandidata.categoria);
            }
        }
    }

    // Por si no había suficientes perks activas para juntar 4 (evita errores visuales)
    while (perksElegidas.length < 4) {
        perksElegidas.push({ imagen: "./Resources/Images/Perks/Random/Random.png", Nombre: "Faltan Perks", descripción: "Activa más personajes o apaga el filtro." });
    }

    // Asignamos las imágenes al rombo
    izq.src = perksElegidas[0].imagen;
    arr.src = perksElegidas[1].imagen;
    aba.src = perksElegidas[2].imagen;
    der.src = perksElegidas[3].imagen;

    // Asignamos los textos para las descripciones flotantes
    console.log("Intentando asignar imágenes...");
    AsignarDatosTooltip(izq, perksElegidas[0]);
    AsignarDatosTooltip(arr, perksElegidas[1]);
    AsignarDatosTooltip(aba, perksElegidas[2]);
    AsignarDatosTooltip(der, perksElegidas[3]);
}

function AsignarDatosTooltip(elementoHTML, datosPerk) {
    if(datosPerk && datosPerk.Nombre) {
        elementoHTML.setAttribute("data-nombre", datosPerk.Nombre);
        elementoHTML.setAttribute("data-desc", datosPerk.descripción || datosPerk.descripcion || "Sin descripción.");
    } else {
        elementoHTML.setAttribute("data-nombre", "???");
        elementoHTML.setAttribute("data-desc", "Descripción no disponible.");
    }
}

//LÓGICA DE LAS DESCRIPCIONES FLOTANTES
const cajaTooltip = document.getElementById("caja-tooltip");
const tituloTooltip = document.getElementById("tooltip-titulo");
const descTooltip = document.getElementById("tooltip-desc");

document.querySelectorAll('.carta-perk').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const nombre = img.getAttribute("data-nombre");
        if(!nombre) return;

        tituloTooltip.innerText = nombre;
        descTooltip.innerText = img.getAttribute("data-desc");

        cajaTooltip.style.display = "block"; 
        cajaTooltip.style.left = e.pageX + 15 + "px"; 
        cajaTooltip.style.top = e.pageY + 15 + "px"; 
    });

    img.addEventListener('mouseleave', () => {
        cajaTooltip.style.display = "none"; 
    });
});

// Función que se ejecuta al darle clic a "Spin"
function MezclarSobreviviente() {
    const imgRetrato = document.getElementById("RetratoRandom");
    let baseDeDatos = rolActual === "killer" ? Asesinos : Sobrevivientes;
    let candidatosDisponibles = [];
    
    baseDeDatos.forEach((personaje) => {
        if (personaje.PersonajeActivo === true && personaje.Nombre !== "" && personaje.Retrato !== "") {
            candidatosDisponibles.push(personaje.Retrato);
        }
    });
    
    if (candidatosDisponibles.length > 0) {
        const aleatorio = candidatosDisponibles[Math.floor(Math.random() * candidatosDisponibles.length)];
        imgRetrato.src = aleatorio;
    }
}

// AUTO-COMPLETAR SHRINE OF SECRETS (POR IMAGEN)
function CargarShrine() {
    const shrineImgs = document.querySelectorAll('.santuario-wrapper .carta-perk');
    
    // Unimos todas las bases de datos en una sola lista gigante
    let todasLasPerks = [];
    [...Sobrevivientes, ...Asesinos].forEach(p => {
        if (p.Perks) todasLasPerks.push(...p.Perks);
    });
    todasLasPerks.push(...PerksUniversales, ...PerksUniversalesAsesino);

    // Por cada imagen en el Shrine, extrae su ruta y busca coincidencias
    shrineImgs.forEach(img => {
        const rutaImagen = img.getAttribute("src");
        
        // Busca en la base de datos una perk cuya imagen coincida (ignorando si tiene "./" al inicio)
        const perkEncontrada = todasLasPerks.find(p => p.imagen && rutaImagen.endsWith(p.imagen.replace('./', '')));

        if (perkEncontrada) {
            img.setAttribute("data-nombre", perkEncontrada.Nombre || "Uknown");
            img.setAttribute("data-desc", perkEncontrada.descripción || perkEncontrada.descripcion || "Sin descripción.");
        } else {
            img.setAttribute("data-nombre", "???");
            img.setAttribute("data-desc", "Perk no encontrada en la base de datos.");
        }
    });
}

CargarShrine();

function posicionarFiltroFinal() {
    const filtro = document.getElementById('ContenedorFiltro');
    const retrato = document.getElementById('RetratoRandom');
    const titulo = document.querySelector(".titulo-principal");
    
    if (filtro && retrato && titulo) {
        const rectRetrato = retrato.getBoundingClientRect();
        const rectTitulo = titulo.getBoundingClientRect();
        
        const centroRetrato = rectRetrato.left + (rectRetrato.width / 2);
        filtro.style.left = (centroRetrato - (filtro.offsetWidth / 2)) + "px";
        filtro.style.top = (rectTitulo.top + 10) + "px"; 
        filtro.style.opacity = "1"; 
    }
}

window.addEventListener('load', () => {
    // 2. DIBUJO: Ahora que los Arrays están actualizados, pintamos la interfaz
    posicionarFiltroFinal();

    // 3. Código del tooltip del "?"
    const infoFiltro = document.querySelector("#ContenedorFiltro .carta-perk");
    if(infoFiltro) {
        const tituloTooltip = document.getElementById("tooltip-titulo");
        const descTooltip = document.getElementById("tooltip-desc");
        const cajaTooltip = document.getElementById("caja-tooltip");

        infoFiltro.addEventListener('mouseenter', () => {
            tituloTooltip.innerText = infoFiltro.getAttribute("data-nombre");
            descTooltip.innerText = infoFiltro.getAttribute("data-desc");
            cajaTooltip.style.display = "block";
        });
        infoFiltro.addEventListener('mousemove', (e) => {
            cajaTooltip.style.left = e.pageX + 15 + "px";
            cajaTooltip.style.top = e.pageY + 15 + "px";
        });
        infoFiltro.addEventListener('mouseleave', () => {
            cajaTooltip.style.display = "none";
        });
    }
    // Activar tooltip para el icono de ayuda dentro del menú
const ayudaMenu = document.querySelector(".icono-ayuda-menu");
if(ayudaMenu) {
    const tituloTooltip = document.getElementById("tooltip-titulo");
    const descTooltip = document.getElementById("tooltip-desc");
    const cajaTooltip = document.getElementById("caja-tooltip");

    ayudaMenu.addEventListener('mouseenter', () => {
        tituloTooltip.innerText = ayudaMenu.getAttribute("data-nombre");
        descTooltip.innerText = ayudaMenu.getAttribute("data-desc");
        cajaTooltip.style.display = "block";
    });

    ayudaMenu.addEventListener('mousemove', (e) => {
        cajaTooltip.style.left = e.pageX + 15 + "px";
        cajaTooltip.style.top = e.pageY + 15 + "px";
    });

    ayudaMenu.addEventListener('mouseleave', () => {
        cajaTooltip.style.display = "none";
    });
}
});

window.addEventListener('resize', posicionarFiltroFinal);