export const prompterOptions = {
  styles: [
    { label: "Octane 3D Render", value: "3D render, Octane render, unreal engine 5, 8k resolution, stylized but detailed" },
    { label: "Photorealistic Cinematic", value: "photorealistic, cinematic film capture, professional photography, shallow depth of field, 8k, prime lens" },
    { label: "Vibrant Digital Art", value: "digital illustration, concept art, rich vivid colors, sharp details, trendy artstation style, highly detailed" },
    { label: "Cyberpunk/Synthwave Illustration", value: "retrofuturistic digital sketch, bold linework, cyber neon aesthetics, high contrast, clean vectors" }
  ],
  lighting: [
    { label: "Bioluminescent Glow", value: "bioluminescent glowing plants, magical fairy light sparkles, soft ambient green and cyan glow" },
    { label: "Laser Show & Strobe", value: "vibrant neon laser beams, strobe light reflections, purple and blue dramatic lighting" },
    { label: "Neon Campfire & Spotlights", value: "warm magenta campfire embers, sharp cyan spotlights, high-contrast shadows" },
    { label: "Retro Wireframe Sun", value: "neon-backlit sunset, warm glowing horizon line, wireframe grids reflecting neon light" }
  ],
  camera: [
    { label: "Wide Angle Landscape", value: "panoramic ultra-wide angle view, showing the full campus courtyard layout" },
    { label: "Low Angle Dynamic", value: "dynamic low-angle shot, making the campus structures look grand and heroic" },
    { label: "Isometric View", value: "isometric perspective, miniature 3D diorama style, neat and organized layout" },
    { label: "Eye-level Group Shot", value: "close eye-level shot, focusing on a group of smiling, laughing freshers in the foreground" }
  ],
  atmosphere: [
    { label: "Energetic & Hype", value: "electrifying atmosphere, high-energy party vibes, particles and confetti floating in the air" },
    { label: "Cozy & Mystical", value: "whimsical, cozy, intimate, and magical atmosphere, warm and friendly vibes" },
    { label: "Futuristic & Cybernetic", value: "cutting-edge futuristic vibes, glitch effects, digital holograms projecting coordinates" }
  ]
};

export function buildPrompt(basePrompt, selections) {
  const parts = [basePrompt];

  if (selections.style) parts.push(`Style: ${selections.style}`);
  if (selections.palette) parts.push(`Color Palette: ${selections.palette}`);
  if (selections.lighting) parts.push(`Lighting: ${selections.lighting}`);
  if (selections.camera) parts.push(`Camera angle: ${selections.camera}`);
  if (selections.atmosphere) parts.push(`Atmosphere: ${selections.atmosphere}`);

  return parts.join(". ").trim();
}

export function pickRandomPromptTags() {
  const styles = prompterOptions.styles;
  const lightings = prompterOptions.lighting;
  const cameras = prompterOptions.camera;
  const atmospheres = prompterOptions.atmosphere;

  return {
    style: styles[Math.floor(Math.random() * styles.length)].value,
    lighting: lightings[Math.floor(Math.random() * lightings.length)].value,
    camera: cameras[Math.floor(Math.random() * cameras.length)].value,
    atmosphere: atmospheres[Math.floor(Math.random() * atmospheres.length)].value
  };
}
