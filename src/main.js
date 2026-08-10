import { toPng } from "html-to-image";

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1350;

const generateButton = document.querySelector("#generate-button");
const formError = document.querySelector("#form-error");
const emptyPreview = document.querySelector("#preview-empty");
const menuPreview = document.querySelector("#preview-content");
const previewTitle = document.querySelector("#preview-title");
const menuPreviewCard = document.querySelector("#menu-preview-card");
const themePicker = document.querySelector("#theme-picker");
const themePickerTrigger = document.querySelector("#theme-picker-trigger");
const themePickerCurrent = document.querySelector("#theme-picker-current");
const themePickerList = document.querySelector("#theme-picker-list");
let themeButtons = [];
const exportButton = document.querySelector("#export-button");
const exportStatus = document.querySelector("#export-status");
const mobileExportPreview = document.querySelector("#mobile-export-preview");
const mobileExportImage = document.querySelector("#mobile-export-image");
const mobileExportClose = document.querySelector("#mobile-export-close");

const chineseCharacterPattern =
  /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u;
const latinCharacterPattern = /[A-Za-z]/;

const themes = {
  michelin: {
    label: "Michelin Fine Dining",
    className: "theme-michelin",
    menuLabel: "Chef’s Selection",
  },
  "modern-european": {
    label: "Modern European",
    className: "theme-modern-european",
    menuLabel: "Chef’s Selection",
  },
  "romantic-dinner": {
    label: "Romantic Dinner",
    className: "theme-romantic-dinner",
    menuLabel: "A Special Menu",
  },
};

const DEFAULT_THEME_ID = "michelin";

const themeClassNames = Object.values(themes).map(
  (theme) => theme.className,
);

const inputFields = {
  title: document.querySelector("#menu-title"),
  starter: document.querySelector("#starter"),
  starterDescription: document.querySelector("#starter-description"),
  mainCourse: document.querySelector("#main-course"),
  mainCourseDescription: document.querySelector("#main-course-description"),
  dessert: document.querySelector("#dessert"),
  dessertDescription: document.querySelector("#dessert-description"),
  drinks: document.querySelector("#drinks"),
  drinksDescription: document.querySelector("#drinks-description"),
};

const previewCourses = {
  starter: {
    row: document.querySelector("#preview-starter-row"),
    text: document.querySelector("#preview-starter"),
    description: document.querySelector("#preview-starter-description"),
  },
  mainCourse: {
    row: document.querySelector("#preview-main-course-row"),
    text: document.querySelector("#preview-main-course"),
    description: document.querySelector("#preview-main-course-description"),
  },
  dessert: {
    row: document.querySelector("#preview-dessert-row"),
    text: document.querySelector("#preview-dessert"),
    description: document.querySelector("#preview-dessert-description"),
  },
  drinks: {
    row: document.querySelector("#preview-drinks-row"),
    text: document.querySelector("#preview-drinks"),
    description: document.querySelector("#preview-drinks-description"),
  },
};

const dishValidationRules = [
  {
    nameKey: "starter",
    descriptionKey: "starterDescription",
    label: "Starter",
  },
  {
    nameKey: "mainCourse",
    descriptionKey: "mainCourseDescription",
    label: "Main Course",
  },
  {
    nameKey: "dessert",
    descriptionKey: "dessertDescription",
    label: "Dessert",
  },
  {
    nameKey: "drinks",
    descriptionKey: "drinksDescription",
    label: "Drinks",
  },
];

function applyTitleLengthClass(title) {
  const visualLength = Array.from(title).reduce((length, character) => {
    if (chineseCharacterPattern.test(character)) {
      return length + 2.5;
    }

    if (/\s/u.test(character)) {
      return length + 0.35;
    }

    return length + 1;
  }, 0);

  if (visualLength > 52) {
    previewTitle.classList.add("is-extra-long-title");
  } else if (visualLength > 30) {
    previewTitle.classList.add("is-long-title");
  }
}

function formatPreviewTitle() {
  if (previewTitle.querySelector(".title-primary")) {
    return;
  }

  const title = previewTitle.textContent.trim();
  const firstChineseCharacter = title.match(chineseCharacterPattern);

  previewTitle.classList.remove("is-long-title", "is-extra-long-title");
  previewTitle.removeAttribute("aria-label");
  applyTitleLengthClass(title);

  if (!firstChineseCharacter) {
    return;
  }

  const splitIndex = firstChineseCharacter.index;
  const englishTitle = title
    .slice(0, splitIndex)
    .trim()
    .replace(/[|/·—–-]+$/u, "")
    .trim();
  const chineseSubtitle = title.slice(splitIndex).trim();

  if (!latinCharacterPattern.test(englishTitle) || chineseSubtitle === "") {
    return;
  }

  const primaryTitle = document.createElement("span");
  const secondaryTitle = document.createElement("span");

  primaryTitle.className = "title-primary";
  primaryTitle.textContent = englishTitle;
  secondaryTitle.className = "title-secondary";
  secondaryTitle.lang = "zh-CN";
  secondaryTitle.textContent = chineseSubtitle;

  previewTitle.setAttribute("aria-label", title);
  previewTitle.replaceChildren(primaryTitle, secondaryTitle);
}

const previewTitleObserver = new MutationObserver(formatPreviewTitle);

previewTitleObserver.observe(previewTitle, {
  childList: true,
  subtree: true,
});

function readMenuForm() {
  return {
    title: inputFields.title.value.trim(),
    starter: inputFields.starter.value.trim(),
    starterDescription: inputFields.starterDescription.value.trim(),
    mainCourse: inputFields.mainCourse.value.trim(),
    mainCourseDescription: inputFields.mainCourseDescription.value.trim(),
    dessert: inputFields.dessert.value.trim(),
    dessertDescription: inputFields.dessertDescription.value.trim(),
    drinks: inputFields.drinks.value.trim(),
    drinksDescription: inputFields.drinksDescription.value.trim(),
  };
}

function updateCoursePreview(coursePreview, name, description) {
  coursePreview.text.textContent = name;
  coursePreview.text.hidden = name === "";
  coursePreview.description.textContent = description;
  coursePreview.description.hidden = name === "" || description === "";
  coursePreview.row.hidden = name === "";
}

function validateDishDescriptions(menu) {
  const invalidDishLabels = [];

  dishValidationRules.forEach((rule) => {
    const hasName = menu[rule.nameKey] !== "";
    const hasDescription = menu[rule.descriptionKey] !== "";

    if (!hasName && hasDescription) {
      invalidDishLabels.push(rule.label);
    }
  });

  return invalidDishLabels;
}

function generateMenuPreview() {
  const menu = readMenuForm();
  const invalidDishLabels = validateDishDescriptions(menu);

  if (invalidDishLabels.length > 0) {
    formError.textContent =
      "Please enter dish names before adding descriptions: " +
      invalidDishLabels.join(", ");
    formError.hidden = false;
    return;
  }

  const hasDishContent = dishValidationRules.some(
    (rule) =>
      menu[rule.nameKey] !== "" || menu[rule.descriptionKey] !== "",
  );

  if (!hasDishContent) {
    formError.textContent =
      "Your menu is empty. Please add at least one dish before generating.";
    formError.hidden = false;
    return;
  }

  formError.hidden = true;

  previewTitle.textContent = menu.title || "Chef’s Menu";
  updateCoursePreview(
    previewCourses.starter,
    menu.starter,
    menu.starterDescription,
  );
  updateCoursePreview(
    previewCourses.mainCourse,
    menu.mainCourse,
    menu.mainCourseDescription,
  );
  updateCoursePreview(
    previewCourses.dessert,
    menu.dessert,
    menu.dessertDescription,
  );
  updateCoursePreview(
    previewCourses.drinks,
    menu.drinks,
    menu.drinksDescription,
  );

  emptyPreview.hidden = true;
  menuPreview.hidden = false;
  themeButtons.forEach((button) => {
    button.disabled = false;
  });
  exportButton.disabled = false;
}

function renderThemePickerOptions() {
  const options = document.createDocumentFragment();

  Object.entries(themes).forEach(([themeId, theme]) => {
    const option = document.createElement("button");
    const checkmark = document.createElement("span");
    const label = document.createElement("span");

    option.className = "theme-picker-option";
    option.type = "button";
    option.dataset.theme = themeId;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.tabIndex = -1;
    option.disabled = true;

    checkmark.className = "theme-picker-check";
    checkmark.setAttribute("aria-hidden", "true");
    checkmark.textContent = "✓";

    label.textContent = theme.label;
    option.append(checkmark, label);
    options.append(option);
  });

  themePickerList.replaceChildren(options);
  themeButtons = themePickerList.querySelectorAll("[data-theme]");
}

function isThemePickerAvailable() {
  return Array.from(themeButtons).some((button) => !button.disabled);
}

function syncThemePickerAvailability() {
  themePickerTrigger.setAttribute(
    "aria-disabled",
    String(!isThemePickerAvailable()),
  );
}

function updateThemePickerSelection(themeId) {
  const theme = themes[themeId];

  if (!theme) {
    return;
  }

  themePickerCurrent.textContent = theme.label;

  themeButtons.forEach((button) => {
    const isSelected = button.dataset.theme === themeId;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-selected", String(isSelected));
  });
}

function openThemePicker(focusLastOption = false) {
  if (!isThemePickerAvailable()) {
    return;
  }

  themePickerList.hidden = false;
  themePickerTrigger.setAttribute("aria-expanded", "true");

  const enabledOptions = Array.from(themeButtons).filter(
    (button) => !button.disabled,
  );
  const selectedOption = enabledOptions.find(
    (button) => button.getAttribute("aria-selected") === "true",
  );
  const optionToFocus = focusLastOption
    ? enabledOptions.at(-1)
    : selectedOption || enabledOptions[0];

  optionToFocus?.focus();
}

function closeThemePicker(restoreFocus = false) {
  themePickerList.hidden = true;
  themePickerTrigger.setAttribute("aria-expanded", "false");

  if (restoreFocus) {
    themePickerTrigger.focus();
  }
}

function toggleThemePicker() {
  if (themePickerList.hidden) {
    openThemePicker();
  } else {
    closeThemePicker();
  }
}

function moveThemePickerFocus(direction) {
  const enabledOptions = Array.from(themeButtons).filter(
    (button) => !button.disabled,
  );
  const currentIndex = enabledOptions.indexOf(document.activeElement);
  const nextIndex =
    (currentIndex + direction + enabledOptions.length) % enabledOptions.length;

  enabledOptions[nextIndex]?.focus();
}

function applyTheme(themeId) {
  const theme = themes[themeId];

  if (!theme) {
    return;
  }

  menuPreviewCard.classList.remove(...themeClassNames);
  menuPreviewCard.classList.add(theme.className);
  menuPreviewCard.querySelectorAll(".menu-label").forEach((menuLabel) => {
    menuLabel.textContent = theme.menuLabel;
  });

  updateThemePickerSelection(themeId);
}

function createExportFileName() {
  const safeTitle = previewTitle.textContent
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

  return `${safeTitle || "my-chefs-menu"}.png`;
}

function createExportCard() {
  const exportStage = document.createElement("div");
  const exportCard = menuPreviewCard.cloneNode(true);

  exportStage.className = "export-stage";
  exportStage.setAttribute("aria-hidden", "true");
  exportCard.removeAttribute("id");
  exportCard.querySelectorAll("[id]").forEach((element) => {
    element.removeAttribute("id");
  });
  exportCard.classList.add("export-canvas");
  exportStage.append(exportCard);
  document.body.append(exportStage);

  return { exportCard, exportStage };
}

async function waitForImageReady(image) {
  if (!image.complete) {
    await new Promise((resolve, reject) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", reject, { once: true });
    });
  }

  if (typeof image.decode === "function") {
    try {
      await image.decode();
    } catch (error) {
      if (!image.complete || image.naturalWidth === 0) {
        throw error;
      }
    }
  }

  if (image.naturalWidth === 0) {
    throw new Error("IMAGE_LOAD_FAILED");
  }
}

async function waitForExportImages(exportCard) {
  const images = Array.from(exportCard.querySelectorAll("img"));

  await Promise.all(images.map(waitForImageReady));
}

function isMobileSafari() {
  const userAgent = navigator.userAgent;
  const isAppleMobileDevice = /iPhone|iPad|iPod/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent);
  const isOtherIosBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);

  return isAppleMobileDevice && isSafari && !isOtherIosBrowser;
}

function showMobileExportPreview(dataUrl) {
  mobileExportImage.src = dataUrl;
  mobileExportPreview.hidden = false;
  mobileExportClose.focus();
}

function closeMobileExportPreview() {
  mobileExportPreview.hidden = true;
  mobileExportImage.removeAttribute("src");
  exportButton.focus();
}

async function exportMenuAsPng() {
  exportButton.disabled = true;
  exportButton.classList.add("is-saving");
  exportButton.textContent = "Saving...";
  exportStatus.hidden = true;

  const { exportCard, exportStage } = createExportCard();

  try {
    await Promise.all([
      document.fonts.ready,
      waitForExportImages(exportCard),
    ]);

    if (exportCard.scrollHeight > EXPORT_HEIGHT) {
      throw new Error("MENU_CONTENT_TOO_LONG");
    }

    const dataUrl = await toPng(exportCard, {
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
      canvasWidth: EXPORT_WIDTH,
      canvasHeight: EXPORT_HEIGHT,
      pixelRatio: 1,
      cacheBust: true,
      style: {
        position: "static",
        top: "auto",
        left: "auto",
        zIndex: "auto",
        transform: "none",
      },
    });

    if (isMobileSafari()) {
      showMobileExportPreview(dataUrl);
      exportStatus.textContent = "菜单图片已生成，请长按图片保存或分享。";
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.download = createExportFileName();
      downloadLink.href = dataUrl;
      downloadLink.click();
      exportStatus.textContent = "菜单已保存。";
    }

    exportStatus.classList.remove("is-error");
    exportStatus.hidden = false;
  } catch (error) {
    exportStatus.textContent =
      error.message === "MENU_CONTENT_TOO_LONG"
        ? "菜单内容过长，请精简文字后重试。"
        : "菜单保存失败，请稍后重试。";
    exportStatus.classList.add("is-error");
    exportStatus.hidden = false;
  } finally {
    exportStage.remove();
    exportButton.classList.remove("is-saving");
    exportButton.disabled = false;
    exportButton.textContent = "Save Menu";
  }
}

renderThemePickerOptions();
applyTheme(DEFAULT_THEME_ID);
syncThemePickerAvailability();

const themeAvailabilityObserver = new MutationObserver(
  syncThemePickerAvailability,
);

themeButtons.forEach((button) => {
  themeAvailabilityObserver.observe(button, {
    attributes: true,
    attributeFilter: ["disabled"],
  });
});

generateButton.addEventListener("click", generateMenuPreview);
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);
    closeThemePicker(true);
  });
});
themePickerTrigger.addEventListener("click", toggleThemePicker);
themePickerTrigger.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    openThemePicker(event.key === "ArrowUp");
  }
});
themePickerList.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    moveThemePickerFocus(event.key === "ArrowDown" ? 1 : -1);
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    const enabledOptions = Array.from(themeButtons).filter(
      (button) => !button.disabled,
    );
    const optionToFocus =
      event.key === "Home" ? enabledOptions[0] : enabledOptions.at(-1);

    optionToFocus?.focus();
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeThemePicker(true);
  } else if (event.key === "Tab") {
    closeThemePicker();
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!themePicker.contains(event.target)) {
    closeThemePicker();
  }
});
exportButton.addEventListener("click", exportMenuAsPng);
mobileExportClose.addEventListener("click", closeMobileExportPreview);
