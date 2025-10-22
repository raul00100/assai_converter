import figlet from "figlet";

// importing fonts form figlet package
import Standard from "figlet/importable-fonts/Standard.js";
import Ghost from "figlet/importable-fonts/Ghost.js";
import Slant from "figlet/importable-fonts/Slant.js";
import Banner from "figlet/importable-fonts/Banner.js";
import Block from "figlet/importable-fonts/Block.js";
import Isometric1 from "figlet/importable-fonts/Isometric1.js";
import Mini from "figlet/importable-fonts/Mini.js";
import Script from "figlet/importable-fonts/Script.js";

// registering them
figlet.parseFont("Standard", Standard);
figlet.parseFont("Ghost", Ghost);
figlet.parseFont("Slant", Slant);
figlet.parseFont("Banner", Banner);
figlet.parseFont("Block", Block);
figlet.parseFont("Isometric1", Isometric1);
figlet.parseFont("Mini", Mini);
figlet.parseFont("Script", Script);

export const availableFonts = [
  "Standard",
  "Ghost",
  "Slant",
  "Banner",
  "Block",
  "Isometric1",
  "Mini",
  "Script",
];

export default figlet;
