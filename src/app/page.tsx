"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Image from 'next/image';



  // 🎵 Playlist Array (Actual Audio Tracks)
  const playlist = [
    { title: "cassette Vibes ☕", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738346564/Cassetteski_zowc8m.mp3" },
    { title: "study Dreams 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738345514/studyski_vqivrj.mp3" },
    { title: "focus Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738345300/focuski_eqbdst.mp3" },
    { title: "chill Time 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738337991/chillski_mhtmln.mp3" },
    { title: "Chill Vibes ☕", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196209/csb5_mkgvbg.mp3" },
    { title: "Lofi Dreams 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196022/csb2_y7qffy.mp3" },
    { title: "Chill Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738202860/Chill_Study_Music_chill_lo-fi_hip_hop_beats_5_pgfz35.mp3" },
    { title: "Lofi Time 🌙", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738202770/vbeats_rbqh2w.mp3" },
    { title: "Night Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738195960/beats_nvkrgk.mp3" },
    { title: "Day Beats 🌆", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738196197/beats2_q2olzm.mp3" },
    { title: "Game Beats 🎮", url: "https://res.cloudinary.com/dkewu76nu/video/upload/v1738268132/gamers_wf07pg.mp3" },
  ];

  // 🍄 Fake "Now Playing" Track Titles
  const fakeTracks = [
    { song: "Spore Lo-Fi", artist: "Psilocybe Beats" },
    { song: "Enoki Dreams", artist: "Flammulina Grooves" },
    { song: "Mycelium Vibes", artist: "Hyphae Collective" },
    { song: "Shroomwave", artist: "Agaricus Flow" },
    { song: "Forest Floor Funk", artist: "Boletus Sound System" },
    { song: "Bioluminescent Beats", artist: "Panellus Strobe" },
    { song: "Truffle Shuffle", artist: "Tuber Dub" },
      { song: "Mystic Spores", artist: "Psathyrella Beats" },
      { song: "Electric Hyphae", artist: "Amanita Flow" },
      { song: "Golden Fruiting Bodies", artist: "Lentinula Sound System" },
      { song: "Hidden Gills", artist: "Cortinarius Groove" },
      { song: "Ethereal Clusters", artist: "Morchella Bass" },
      { song: "Bioluminescent Echoes", artist: "Hydnum Vibes" },
      { song: "Ancient Rhythms", artist: "Ganoderma Collective" },
      { song: "Psychedelic Roots", artist: "Pleurotus Sync" },
      { song: "Whispering Melodies", artist: "Lycoperdon Melody" },
      { song: "Wild Loops", artist: "Clavulina Beats" },
      { song: "Dreamy Beats", artist: "Trametes Sound System" },
      { song: "Shadow Undergrowth", artist: "Russula Flow" },
      { song: "Spore Shuffles", artist: "Xerocomus Groove" },
      { song: "Glowing Waves", artist: "Gymnopilus Bass" },
      { song: "Floating Tones", artist: "Marasmius Collective" },
      { song: "Enchanted Bass", artist: "Schizophyllum Vibes" },
      { song: "Twilight Grooves", artist: "Mycena Sound System" },
      { song: "Echoing Dreams", artist: "Panellus Flow" },
      { song: "Deep Dust", artist: "Boletus Groove" },
      { song: "Secret Synths", artist: "Volvariella Beats" },
      { song: "Velvet Night", artist: "Lactarius Soundwave" },
      { song: "Shroomy Echoes", artist: "Agaricus Tones" },
      { song: "Lichen Layers", artist: "Cantharellus Vibes" },
      { song: "Truffle Trance", artist: "Tuber Frequency" },
      { song: "Hidden Caps", artist: "Pluteus Beats" },
      { song: "Dancing Spores", artist: "Coprinus Club" },
      { song: "MycoJam", artist: "Hypholoma Sessions" },
      { song: "Misty Woods", artist: "Cerioporus Sound" },
      { song: "Gilled Shadows", artist: "Entoloma Groove" },
      { song: "Mushroom Sunrise", artist: "Chlorophyllum Dawn" },
      { song: "Cosmic Puffball", artist: "Calvatia Bass" },
      { song: "Stipe Swing", artist: "Pholiota Groove" },
      { song: "Fruiting Funk", artist: "Sarcodon Sound" },
      { song: "Forest Reverb", artist: "Auricularia Echo" },
      { song: "Blue Mycena", artist: "Cyanescens Melody" },
      { song: "Spore Drift", artist: "Lepiota Flow" },
      { song: "Gleba Grooves", artist: "Phallus Rhythms" },
      { song: "Basidio Bop", artist: "Basidiomycota Beats" },
      { song: "Cap & Stem", artist: "Mycological Funk" },
      { song: "Saprophyte Serenade", artist: "Decomposer Collective" },
      { song: "Mushroom March", artist: "Fomes Fanfare" },
      { song: "Puffball Pop", artist: "Bovista Beats" },
      { song: "Rusty Groove", artist: "Pisolithus Sounds" },
      { song: "Fairy Ring Dance", artist: "Marasmius Mystique" },
      { song: "Boletus Bounce", artist: "Edulis Rhythms" },
      { song: "Rainy Forage", artist: "Slippery Jack Vibes" },
      { song: "Velvet Foot", artist: "Flammulina Frequencies" },
      { song: "Glowing Mycelium", artist: "Omphalotus Aura" },
      { song: "Decayed Echoes", artist: "Xylaria Beats" },
      { song: "Fungal Funk", artist: "Gymnopus Groove" },
      { song: "Hymenium Harmony", artist: "Sporocarps Sound" },
      { song: "Rotten Rhythm", artist: "Stinkhorn Beats" },
      { song: "Shaggy Ink Swing", artist: "Coprinopsis Jazz" },
      { song: "Morel Mood", artist: "Morchella Sessions" },
      { song: "Polypore Pulse", artist: "Ganoderma Dub" },
      { song: "Gill Flow", artist: "Clitocybe Bass" },
      { song: "Earthstar Energy", artist: "Geastrum Groove" },
      { song: "Sclerotia Bounce", artist: "Rhizopogon Rhythms" },
      { song: "Fairy Inkcap", artist: "Coprinellus Chill" },
      { song: "Fungal Forest", artist: "Saprotrophic Sounds" },
      { song: "Wildwood Reverb", artist: "Decayer Collective" },
      { song: "Chanterelle Vibes", artist: "Cantharellus Chill" },
      { song: "Lichen Layers", artist: "Cladonia Echo" },
      { song: "Biofluorescent Beats", artist: "Panellus Neon" },
      { song: "Tremella Glow", artist: "Jelly Funk" },
      { song: "Rainforest Groove", artist: "Cordyceps Jungle" },
      { song: "Sporeprint Sessions", artist: "Lamella Lounge" },
      { song: "Symbiotic Swing", artist: "Mycorrhizal Jazz" },
      { song: "Brown Rot Bop", artist: "Serpula Groove" },
      { song: "Autumn Forage", artist: "Russula Rust" },
      { song: "Mycelial Melodies", artist: "Filamentous Flow" },
      { song: "Basidiocarp Beats", artist: "Fruiting Flow" },
      { song: "Cap and Fade", artist: "Delicatula Vibes" },
      { song: "Timber Decomposers", artist: "Fungal Recycler" },
      { song: "Glowing Gills", artist: "Luminous Lamella" },
      { song: "Shroomy Soundscapes", artist: "Fungi Frequency" },
      { song: "Deep Mycelium", artist: "Filamentous Funk" },
      { song: "Hyphal Rhythms", artist: "Cystidia Groove" },
      { song: "Forest Floor Echoes", artist: "Xerula Sounds" },
      { song: "Agaric Anthems", artist: "Basidiomycete Beats" },
      { song: "Fruiting Flux", artist: "Mycophile Flow" },
      { song: "Shroomy Trance", artist: "Mushroom Motion" },
      { song: "Forager's Ballad", artist: "Lentinus Loop" },
      { song: "Rainy Woods Beats", artist: "Pluvialis Soundscape" },
      { song: "Fairy Circle Funk", artist: "Marasmius Moves" },
      { song: "Gilled Funk", artist: "Lamella Flow" },
      { song: "Phantom Caps", artist: "Mystic Mycota" },
      { song: "Spore Trails", artist: "Hyphae Drift" },
      { song: "Ectomycorrhizal Jazz", artist: "Symbiosis Swing" },
      { song: "Mycohouse Vibes", artist: "Psilocybe Synth" },
    { song: "Misty Cap", artist: "Lepiota Lush" },
    { song: "Glistening Spores", artist: "Basidiomycota Bass" },
    { song: "Fungal Resonance", artist: "Hyphal Echo" },
    { song: "Cap & Stem Swing", artist: "Clitocybe Jazz" },
    { song: "Shroom Drift", artist: "Mycelium Motion" },
    { song: "Glowing Undergrowth", artist: "Omphalotus Flow" },
    { song: "Sporulating Synths", artist: "Agaricus Groove" },
    { song: "Boletus Breeze", artist: "Edulis Chill" },
    { song: "Saprobe Symphony", artist: "Xylariaceae Sounds" },
    { song: "Mushroom Reverie", artist: "Chanterellus Dream" },
    { song: "Ectomycorrhizal Flow", artist: "Pisolithus Funk" },
    { song: "Gilled Melancholy", artist: "Cortinarius Mood" },
    { song: "Puffball Pulse", artist: "Calvatia Vibe" },
    { song: "Truffle Tones", artist: "Tuber Tune" },
    { song: "Forager’s Lullaby", artist: "Boletales Sound" },
    { song: "Fungal Fade", artist: "Amanita Psy" },
    { song: "Basidiospores Boogie", artist: "Lentinula Bounce" },
    { song: "Underground Networks", artist: "Hyphae Hush" },
    { song: "Mushroom Rhapsody", artist: "Cantharellus Chorus" },
    { song: "Wood Rot Whisper", artist: "Serpula Soul" },
    { song: "Polypore Patterns", artist: "Ganoderma Groove" },
    { song: "Rhizomorphic Waves", artist: "Symbiotic Sound" },
    { song: "Sclerotia Shuffle", artist: "Fungal Formation" },
    { song: "Gilled Echoes", artist: "Pleurotus Psyche" },
    { song: "Fairy Lanterns", artist: "Bioluminescent Beats" },
    { song: "Forest Bassline", artist: "Mycorrhizal Moods" },
    { song: "Dewdrop Dance", artist: "Marasmius Flow" },
    { song: "Beneath the Canopy", artist: "Spore Sprout" },
    { song: "Silent Sprouters", artist: "Tricholoma Trance" },
    { song: "Wild Fungus Funk", artist: "Russula Resonance" },
    { song: "Hymenium Harmony", artist: "Basidiomycete Ballad" },
    { song: "Substrate Swing", artist: "Fomes Frenzy" },
    { song: "Cap Club", artist: "Myco House" },
    { song: "Filamentous Frequencies", artist: "Xylaria Waves" },
    { song: "Jelly Ear Echo", artist: "Auricularia Groove" },
    { song: "Deep Woods Drift", artist: "Saprotrophic Soul" },
    { song: "Hyphal Harmony", artist: "Mycelium Melodies" },
    { song: "Mushroom Waltz", artist: "Chanterelle Charm" },
    { song: "Fungal Forest Floor", artist: "Lycoperdon Loops" },
    { song: "Fairy Ring Reggae", artist: "Marasmius Movement" },
    { song: "Sporulating Swing", artist: "Agaric Anthems" },
    { song: "Forage Funk", artist: "Russula Revival" },
    { song: "Hymenial Hymns", artist: "Myco Mood" },
    { song: "Basidiocarp Bounce", artist: "Edulis Energy" },
    { song: "Glowing Myco Lights", artist: "Omphalotus Illumina" },
    { song: "Mushroom Rain", artist: "Pleurotus Paradise" },
    { song: "Forest Debris Funk", artist: "Lignicolous Love" },
    { song: "Shaggy Stipe Steps", artist: "Coprinopsis Crew" },
    { song: "Gilled House", artist: "Hypholoma Hustle" },
    { song: "Xylariaceae Xylophones", artist: "Decayer Dub" },
    { song: "Truffle Funk", artist: "Tuber Tunez" },
    { song: "MycoHype", artist: "Psathyrella Pop" },
    { song: "Golden Cap Chill", artist: "Flammulina Flow" },
    { song: "Boletus Boogie", artist: "Edulis Echo" },
    { song: "Deep Underground", artist: "Rhizomorph Rave" },
    { song: "Hygrocybe Harmonies", artist: "Waxy Cap Wonders" },
    { song: "Forager’s Lament", artist: "Cantharellus Cry" },
    { song: "Shroom Spirits", artist: "Mystic Myco" },
    { song: "Fungal Symbiosis", artist: "Mycorrhiza Groove" },
    { song: "Hyphae Horizons", artist: "Fungal Filaments" },
    { song: "Decomposer Dances", artist: "Saprobe Sounds" },
    { song: "Enoki Elevation", artist: "Flammulina Dream" },
    { song: "Fruiting Funkadelic", artist: "Sporeprint Studios" },
    { song: "Misty Mycelium", artist: "Lycoperdon Love" },
    { song: "Oyster Odyssey", artist: "Pleurotus Passage" },
    { song: "Pinewood Puff", artist: "Suillus Sound" },
    { song: "Sporeprint Soul", artist: "Basidiomycota Beats" },
    { song: "Cap Chords", artist: "Amanita Audio" },
    { song: "Mushroom Funkadelic", artist: "Saprophyte Swing" },
    { song: "Chitinous Chill", artist: "Gilled Groove" },
    { song: "Dancing Agarics", artist: "Fly Amanita Flow" },
    { song: "Bioluminescent Bass", artist: "Neon Shrooms" },
    { song: "Fruiting Swing", artist: "Boletus Bounce" },
    { song: "Spore Spray", artist: "Agaricus Rain" },
    { song: "Glowing Caps", artist: "Omphalotus Trance" },
    { song: "Truffle Tea", artist: "Tuber Treats" },
    { song: "Cap & Spore", artist: "Hyphal House" },
    { song: "Lignicolous Love", artist: "Decayer Dubstep" },
    { song: "Forager’s Groove", artist: "Hymenium Harmonies" },
    { song: "Pine Needle Percussion", artist: "Myco Mood" },
    { song: "Morel Moments", artist: "Morchella Medley" },
    { song: "Understory Unwind", artist: "Mycorrhizal Muse" },
    { song: "Saprophyte Soundwaves", artist: "Decomposers Dub" },
    { song: "Spores & Sparks", artist: "Shroom Shine" },
    { song: "Mystic Mycelium", artist: "Fungal Flow" },
    { song: "Truffle Trails", artist: "Tuber Tunes" },
    { song: "Fungal Reverberation", artist: "Basidiomycota Beatbox" },
    { song: "Lichens & Lattes", artist: "Fruticose Frequencies" },
    { song: "Spore Serenade", artist: "Myco Melodies" },
    { song: "Fungal Fireflies", artist: "Panellus Glow" },
    { song: "Shroomstep", artist: "Basidio Bass" },
    { song: "Hyphal Highs", artist: "Myco Motion" },
    { song: "Morel Moods", artist: "Morchella Melodics" },
    { song: "Glowcap Groove", artist: "Omphalotus Echo" },
    { song: "MycoJazz Nights", artist: "Chanterelle Collective" },
    { song: "Fungal Frequency", artist: "Psylo Sonic" },
    { song: "Cap & Stalk Chill", artist: "Agaric Atmosphere" },
    { song: "Puffball Beats", artist: "Lycoperdon Lounge" },
    { song: "Woodland Whispers", artist: "Forager Flow" },
    { song: "Spore Spread", artist: "Hyphae Haven" },
    { song: "Truffle Trap", artist: "Tuber Tempo" },
    { song: "Mycelium Maps", artist: "Networked Nodes" },
    { song: "Oyster Overdrive", artist: "Pleurotus Power" },
    { song: "Biolume Blues", artist: "Neon Fungi" },
    { song: "Decomposer Disco", artist: "Saprophyte Sounds" },
    { song: "Fungal Fizz", artist: "Xylaria Xtra" },
    { song: "Cap Chatter", artist: "Russula Radio" },
    { song: "Gilled Gold", artist: "Cantharellus Club" },
    { song: "Shaggy Ink Jam", artist: "Coprinus Crew" },
    { song: "Forest Frequency", artist: "Myco Mood" },
    { song: "Tremella Twang", artist: "Jelly Jam" },
    { song: "Porcini Parade", artist: "Boletus Boogie" },
    { song: "Sporeprint Soul", artist: "Agaric Anthems" },
    { song: "Mush Groove", artist: "Panaeolus Pulse" },
    { song: "Cap & Funk", artist: "Hypholoma Hustle" },
    { song: "Sclerotia Soul", artist: "Truffle Trance" },
    { song: "Forager’s Fable", artist: "Wild Harvest" },
    { song: "Saprobe Swing", artist: "Lignin Licks" },
    { song: "Dewdrop Dub", artist: "Marasmius Mix" },
    { song: "Pinecone Percussion", artist: "Resin Rhythms" },
    { song: "Hidden Hyphae", artist: "Myco Mystery" },
    { song: "Gilled Groove", artist: "Lamella Lounge" },
    { song: "Mushroom Moonlight", artist: "Chanterelle Chill" },
    { song: "Puffball Puffs", artist: "Calvatia Collective" },
    { song: "Rhizomorphic Rhythms", artist: "Symbiotic Sound" },
    { song: "Wood Ear Waves", artist: "Auricularia Audio" },
    { song: "Sporestream", artist: "Fungal Flow" },
    { song: "Dancing Decayers", artist: "Decomposer Daze" },
    { song: "Misty Mycelium", artist: "Dewdrop Dreams" },
    { song: "Shroom Sanctuary", artist: "Forest Forage" },
    { song: "Basidio Bounce", artist: "Cap & Club" },
    { song: "Cortinarius Cloud", artist: "Webcap Waves" },
    { song: "Truffle Tales", artist: "Buried Beats" },
    { song: "Forager Funk", artist: "Pine Needle Percussion" },
    { song: "Mushroom Madrigal", artist: "Myco Minstrels" },
    { song: "Hyphal Harmonies", artist: "Spore Symphony" },
    { song: "Oyster Orchestra", artist: "Pleurotus Players" },
    { song: "Sporangium Swing", artist: "Fungal Formation" },
    { song: "Stipe Steps", artist: "Cap & Stem Sound" },
    { song: "Glowing Gills", artist: "Omphalotus Orchestra" },
    { song: "Dancing Decay", artist: "Xylariaceae Xtra" },
    { song: "Myco Matrix", artist: "Spore Pixel" },
    { song: "Deep Underground Bass", artist: "Rhizomorph Rave" },
    { song: "Tremella Tones", artist: "Jelly Ear Echo" },
    { song: "Agaric Anthem", artist: "Basidiocarp Beats" },
    { song: "Forager’s Beat", artist: "Chanterelle Circuit" },
    { song: "Cap Lullaby", artist: "Fungal Fairies" },
    { song: "Spore Cloud Symphony", artist: "Windborne Waves" },
    { song: "Hidden Hyphae", artist: "Underground Frequencies" },
    { song: "Tuber Tranquility", artist: "Truffle Tranquil" },
    { song: "Saprophyte Serenade", artist: "Decay Dub" },
    { song: "Fairy Ring Dance", artist: "Myco Magic" },
    { song: "Puffball Pops", artist: "Calvatia Chorus" },
    { song: "Fungal Firelight", artist: "Glowcap Grooves" },
    { song: "Chitin Chords", artist: "Fungi Funk" },
    { song: "Hyphae Hopes", artist: "Spore Dreams" },
    { song: "Fungal Breeze", artist: "Cap Whisper" },
    { song: "Lignin Lounge", artist: "Wood Rot Waves" },
    { song: "Shroom Shadows", artist: "Forager’s Fantasy" },
    { song: "Rhizosphere Rave", artist: "Underground Pulse" },
    { song: "Agaricus Groove", artist: "Button Bass" },
    { song: "Mush Melody", artist: "Chanterelle Chords" },
    { song: "Pine Forest Pianos", artist: "Resin Rhythms" },
    { song: "Mycelium Mechanics", artist: "Hyphal Hustle" },
    { song: "Spores & Strings", artist: "Lamina Lull" },
    { song: "Fruiting Funk", artist: "Basidiomycota Bounce" },
    { song: "Mushroom Mosaic", artist: "Lichen Lounge" },
    { song: "Forager’s Anthem", artist: "Wild Harvest" },
    { song: "Glowing Spore Signals", artist: "Biolume Beats" },
    { song: "Forest Floor Phonics", artist: "Undergrowth Echo" },
    { song: "Decayer Disco", artist: "Xylariaceae Xylophone" },
    { song: "Strobing Stipes", artist: "Panaeolus Pulse" },
    { song: "Boletus Blues", artist: "Edulis Energy" },
    { song: "Gilled Goodness", artist: "Hymenium Harmonies" },
    { song: "Sporeburst", artist: "Fungal Flow" },
    { song: "Cap Serenade", artist: "Amanita Ambience" },
    { song: "Morel Mosaic", artist: "Morchella Medley" },
    { song: "Hidden Caps", artist: "Forager’s Fantasy" },
    { song: "Spore Drift", artist: "Puffball Echo" },
    { song: "Bioluminescent Bounce", artist: "Glowcap Jams" },
    { song: "Myco Cosmos", artist: "Symbiotic Sound" },
    { song: "Tuber Groove", artist: "Truffle Tunes" },
    { song: "Spore Symphony", artist: "Hyphal Harmonics" },
    { song: "Mycelium Moods", artist: "Fungal Frequencies" },
    { song: "Cap & Stem Swing", artist: "Agaric Acoustics" },
    { song: "Forest Floor Jazz", artist: "Canopy Collective" },
    { song: "Lichen Lullaby", artist: "Symbiotic Soundscape" },
    { song: "Gilled Groove", artist: "Lamella Legends" },
    { song: "Puffball Pulse", artist: "Lycoperdon Lounge" },
    { song: "Dewdrop Dance", artist: "Marasmius Medley" },
    { song: "Rhizome Rhythms", artist: "Underground Vibes" },
    { song: "Truffle Treasure", artist: "Tuber Tunes" },
    { song: "Myco Meditations", artist: "Hyphal Harmonizers" },
    { song: "Amanita Anthem", artist: "Toxic Tones" },
    { song: "Shroomsteps", artist: "Fruiting Body Beats" },
    { song: "Oyster Groove", artist: "Pleurotus Pulse" },
    { song: "Fairy Ring Waltz", artist: "Magic Cap Collective" },
    { song: "Gilled Jazz", artist: "Cantharellus Cool" },
    { song: "Sporulation Session", artist: "Basidiocarp Beats" },
    { song: "Morel Moments", artist: "Morchella Melodies" },
    { song: "Enchanted Spores", artist: "Mystic Mycelium" },
    { song: "Biolume Beats", artist: "Glowcap Groovers" },
    { song: "Cap & Stipe Soul", artist: "Agaricus Ambience" },
    { song: "Forest Echo", artist: "Moss & Myco" },
    { song: "Saprobe Swing", artist: "Lignin Lovers" },
    { song: "Hidden Hyphae", artist: "Symbiotic Jazz" },
    { song: "Wild Forager Flow", artist: "Pine Needle Percussion" },
    { song: "Myco Mirage", artist: "Desert Cap Dreams" },
    { song: "Glowing Gills", artist: "Omphalotus Orchestra" },
    { song: "Tremella Tides", artist: "Jelly Groove" },
    { song: "Shaggy Ink Chords", artist: "Coprinus Crew" },
    { song: "Fungal Fireflies", artist: "Nocturnal Spores" },
    { song: "Panaeolus Percussion", artist: "Dreamscape Shrooms" },
    { song: "Dancing Decayers", artist: "Saprophyte Serenade" },
    { song: "Fairy Tale Fungi", artist: "Whimsical Caps" },
    { song: "Xylariaceae Xylophone", artist: "Wood Rot Rhythms" },
    { song: "Tuber Tremors", artist: "Truffle Twang" },
    { song: "Boletus Bounce", artist: "Edulis Ensemble" },
    { song: "Hyphal Hypnosis", artist: "Myco Mesmerizers" },
    { song: "Decomposer Disco", artist: "Spore Spinners" },
    { song: "Puffball Party", artist: "Lycoperdon Lounge" },
    { song: "Underground Rave", artist: "Rhizomorph Reverb" },
    { song: "Lignin Lullaby", artist: "Woodland Dreamers" },
    { song: "Hypholoma Harmony", artist: "Sulfur Tuft Sounds" },
    { song: "Fungal Dreams", artist: "Amanita Ambience" },
    { song: "Shroom Spirit", artist: "Cap Connection" },
    { song: "Mystic Mushroom", artist: "Gnome's Garden" },
    { song: "Porcini Path", artist: "Boletus Beats" },
    { song: "Hyphal Highs", artist: "Networked Notes" },
    { song: "Marasmius Mellow", artist: "Tiny Cap Tunes" },
    { song: "Wood Ear Waves", artist: "Auricularia Audio" },
    { song: "Dewdrop Dub", artist: "Moist Earth Melodies" },
    { song: "Lichen Love", artist: "Symbiotic Strings" },
    { song: "Pine Spore Serenade", artist: "Resin Rhythms" },
    { song: "Rhizosphere Rhapsody", artist: "Underground Orchestra" },
    { song: "Fruiting Funk", artist: "Spore Streamers" },
    { song: "Mushroom Mirage", artist: "Fungal Fantasy" },
    { song: "Glowcap Groove", artist: "Neon Spore Jam" },
    { song: "Enoki Energy", artist: "Flammulina Flow" },
    { song: "Pinecone Percussion", artist: "Woodland Drummers" },
    { song: "Forager’s Lullaby", artist: "Wild Harvester" },
    { song: "Mycelium Mosaic", artist: "Interwoven Beats" },
    { song: "Basidio Bop", artist: "Cap & Stalk Sound" },
    { song: "Myco Mood", artist: "Fungal Frequencies" },
    { song: "Truffle Twinkle", artist: "Buried Beats" },
    { song: "Golden Gilled Grooves", artist: "Chanterelle Chorus" },
    { song: "Fungal Field Recordings", artist: "Forest Floor Jazz" },
    { song: "Lamina Lull", artist: "Cap & Stalk Symphony" },
    { song: "Spore Whispers", artist: "Airborne Audio" },
    { song: "Fungal Frequencies", artist: "Basidiomycota Bass" },
    { song: "Tremella Twang", artist: "Jelly Jam" },
    { song: "Canopy Capers", artist: "Tree Top Tunes" },
    { song: "Agaricus Acoustics", artist: "Button Bass Band" },
    { song: "Hymenium Harmonies", artist: "Gilled Orchestra" },
    { song: "Tuber Tones", artist: "Buried Soundscape" },
    { song: "Myco Magic", artist: "Enchanted Spores" },
    { song: "Puffball Puffs", artist: "Lycoperdon Loops" },
    { song: "Underground Uplift", artist: "Fungal Foundations" },
    { song: "Gnome’s Groove", artist: "Mystic Morels" },
    { song: "Oyster Opus", artist: "Pleurotus Project" },
    { song: "Truffle Rhythms", artist: "Deep Forest Flow" },
    { song: "Forager Funk", artist: "Chanterelle Circuit" },
    { song: "Decomposer Delight", artist: "Saprophyte Swing" },
    { song: "Lichen Light", artist: "Fungal Fusion" },
    { song: "Spores in the Wind", artist: "Airborne Beats" },
    { song: "Cap Dance", artist: "Lamella Legends" },
    { song: "Fungal Firelight", artist: "Glowcap Grooves" },
    { song: "Spore Drift", artist: "Windborne Vibes" },
    { song: "Rhizosphere Resonance", artist: "Mycelial Melodies" },
    { song: "Dancing Decayers", artist: "Xylariaceae Xtra" },
    { song: "Cap & Chords", artist: "Hyphal Harmonizers" },
    { song: "Boletus Bossa Nova", artist: "Edulis Ensemble" },
    { song: "Mushroom Mosaic", artist: "Lichen Lounge" },
    { song: "Hidden Hyphae", artist: "Symbiotic Jazz" },
    { song: "Gilled Goodness", artist: "Hymenium Harmonies" },
    { song: "Sporeburst", artist: "Fungal Flow" },
    { song: "Morel Mosaic", artist: "Morchella Medley" }
];

export default function Home() {
  //const [currentTrack, setCurrentTrack] = useState(Math.floor(Math.random() * playlist.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(Math.floor(Math.random() * fakeTracks.length));
  const audioRef = useRef<HTMLAudioElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  // 🌿 Ambient Sounds
  const [rainSound, setRainSound] = useState(false);
  const [windSound, setWindSound] = useState(false);
  const [forestSound, setForestSound] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setNowPlayingIndex((prevIndex) => (prevIndex + 1) % fakeTracks.length);
    }, 210000);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      const newIsPlaying = !isPlaying; // Toggle and store the new state
      setIsPlaying(newIsPlaying);       // Update state
  
      if (newIsPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
  
      if (logoRef.current) {
        logoRef.current.classList.toggle("is-playing", newIsPlaying); // Use the updated state
      }
    }
  }, [isPlaying]);
  

  useEffect(() => {
    const playAmbient = (id: string, condition: boolean) => {
      const audioElement = document.getElementById(id) as HTMLAudioElement;
      if (audioElement) {
        if (condition) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    };
  
    playAmbient("rain-audio", rainSound);
    playAmbient("wind-audio", windSound);
    playAmbient("forest-audio", forestSound);
  }, [rainSound, windSound, forestSound]);
  
  return (
    <main className="flex flex-col items-center space-y-6 bg-transparent text-white min-h-screen justify-center relative w-full">
      <Sidebar />

      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/mushroom_bg.mp4" type="video/mp4" />
      </video>

      {/* 🏷️ Title with Frosted Glass */}
      <div className="frosted-glass text-center">
        <div className="logo-container">
        <Image 
  src="/mushroomRadioLogo.png" 
  alt="Mushroom Radio Logo" 
  className="logo-image" 
  ref={logoRef}
  width={200}  // Adjust the width as needed
  height={200} // Adjust the height as needed
  priority      // Optional: improves LCP by prioritizing this image
/>
        </div>
      </div>

      {/* 🎵 Now Playing Section */}
      <div className="frosted-glass text-center">
        <p className="title-font text-2xl font-semibold text-blue-300">Now Playing:</p>
        <div className="relative w-64 h-10 bg-white/10 px-6 py-2 rounded-lg shadow-md overflow-hidden">
          <motion.div
            className="absolute left-0 w-max whitespace-nowrap"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            {fakeTracks[nowPlayingIndex].song} - {fakeTracks[nowPlayingIndex].artist}
          </motion.div>
        </div>
      </div>

      {/* 🎧 Audio Player */}
      <audio ref={audioRef} autoPlay>
        <source src={playlist[nowPlayingIndex % playlist.length].url} type="audio/mp3" />
      </audio>

      {/* 🎮 Play/Pause Button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={
          isPlaying
            ? {
                scale: [1, 1.1, 1],
                boxShadow: ["0px 0px 10px #ff00ff", "0px 0px 20px #ff9900", "0px 0px 10px #ff00ff"],
              }
            : {}
        }
        transition={isPlaying ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
        onClick={togglePlay}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 shadow-lg border-2 border-white"
      >
        {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
      </motion.button>

      {/* 🌿 Ambient Sound Toggles with Frosted Glass */}
      <div className="frosted-glass flex space-x-4 mt-4">
        {[
          { label: "Rain", state: rainSound, setState: setRainSound, id: "rain-audio" },
          { label: "Wind", state: windSound, setState: setWindSound, id: "wind-audio" },
          { label: "Forest", state: forestSound, setState: setForestSound, id: "forest-audio" },
        ].map(({ label, state, setState }, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={state}
    onChange={() => setState(!state)}
  />
  {/* Toggle background */}
  <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 peer-checked:bg-green-400 transition duration-300"></div>
  {/* Toggle circle */}
  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform transition-transform duration-300 peer-checked:translate-x-5"></div>
</label>


          </div>
        ))}
      </div>

      {/* 🎧 Ambient Audio Elements */}
      <audio id="rain-audio" loop>
        <source src="https://res.cloudinary.com/dkewu76nu/video/upload/v1738371461/rain_epwjpq.mp3" type="audio/mp3" />
      </audio>
      <audio id="wind-audio" loop>
        <source src="https://res.cloudinary.com/dkewu76nu/video/upload/v1738371452/wind_otfrvy.mp3" type="audio/mp3" />
      </audio>
      <audio id="forest-audio" loop>
        <source src="https://res.cloudinary.com/dkewu76nu/video/upload/v1738371462/forest_tb0i4y.mp3" type="audio/mp3" />
      </audio>
    </main>
  );
}
