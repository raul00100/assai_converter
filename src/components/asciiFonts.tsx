import figlet from "figlet";

// importing fonts form figlet package
import Standard from "figlet/importable-fonts/Standard.js";
import Ghost from "figlet/importable-fonts/Ghost.js";
import Slant from "figlet/importable-fonts/Slant.js";
import Big from "figlet/importable-fonts/Big.js";
import Banner from "figlet/importable-fonts/Banner.js";
import Doom from "figlet/importable-fonts/Doom.js";

// registering them
figlet.parseFont("Standard", Standard);
figlet.parseFont("Ghost", Ghost);
figlet.parseFont("Slant", Slant);
figlet.parseFont("Big", Big);
figlet.parseFont("Banner", Banner);
figlet.parseFont("Doom", Doom);

export const availableFonts = ["Standard", "Ghost", "Slant", "Banner"];

// exporting figlet with downloaded fonts
export default figlet;
