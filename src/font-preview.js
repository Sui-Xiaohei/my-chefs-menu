const sample = "周六晚餐松露意面黑松露酱汁帕玛森芝士与新鲜香草";

await document.fonts.ready;

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const localFamilies = new Set(["Noto Serif SC", "Noto Sans SC"]);

function measure(family) {
  context.font = `72px ${family}`;
  return context.measureText(sample).width;
}

function isInstalled(family) {
  if (localFamilies.has(family)) {
    return document.fonts.check(`400 16px "${family}"`, sample);
  }

  const candidate = measure(`"${family}", monospace`);
  const monospace = measure("monospace");
  const candidateSerif = measure(`"${family}", serif`);
  const serif = measure("serif");
  return candidate !== monospace || candidateSerif !== serif;
}

document.querySelectorAll("[data-font]").forEach((status) => {
  const family = status.dataset.font;
  const available = isInstalled(family);
  status.textContent = available ? "Available" : "Unavailable";
  status.classList.add(available ? "available" : "unavailable");
  status.closest(".menu-card")?.classList.toggle("font-unavailable", !available);
});
