import { toPng } from "html-to-image";

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1350;

const generateButton = document.querySelector("#generate-button");
const formError = document.querySelector("#form-error");
const emptyPreview = document.querySelector("#preview-empty");
const menuPreview = document.querySelector("#preview-content");
const previewTitle = document.querySelector("#preview-title");
const menuPreviewCard = document.querySelector("#menu-preview-card");
const michelinTemplateButton = document.querySelector(
  "#michelin-template-button",
);
const exportButton = document.querySelector("#export-button");
const exportStatus = document.querySelector("#export-status");
const mobileExportPreview = document.querySelector("#mobile-export-preview");
const mobileExportImage = document.querySelector("#mobile-export-image");
const mobileExportClose = document.querySelector("#mobile-export-close");

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
  michelinTemplateButton.disabled = false;
  exportButton.disabled = false;
}

function applyMichelinTemplate() {
  menuPreviewCard.classList.add("template-michelin");
  michelinTemplateButton.classList.add("is-selected");
  michelinTemplateButton.setAttribute("aria-pressed", "true");
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
    await document.fonts.ready;

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

generateButton.addEventListener("click", generateMenuPreview);
michelinTemplateButton.addEventListener("click", applyMichelinTemplate);
exportButton.addEventListener("click", exportMenuAsPng);
mobileExportClose.addEventListener("click", closeMobileExportPreview);
