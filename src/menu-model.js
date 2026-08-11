export const courseDefinitions = Object.freeze([
  Object.freeze({ id: "starter", label: "Starter", labelZh: "前菜" }),
  Object.freeze({
    id: "main-course",
    label: "Main Course",
    labelZh: "主菜",
  }),
  Object.freeze({ id: "dessert", label: "Dessert", labelZh: "甜点" }),
  Object.freeze({ id: "drinks", label: "Drinks", labelZh: "饮品" }),
]);

export const MAX_DISHES_PER_MENU = 6;
export const DISH_TITLE_LATIN_SOFT_LIMIT = 60;
export const DISH_TITLE_CJK_SOFT_LIMIT = 24;
export const DESCRIPTION_LATIN_SOFT_LIMIT = 100;
export const DESCRIPTION_CJK_SOFT_LIMIT = 45;

const chineseCharacterPattern =
  /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u;

export function getValidDishes(course) {
  return course.dishes.filter((dish) => dish.name.trim() !== "");
}

export function validateDishDescriptions(menu) {
  return menu.courses.flatMap((course) =>
    course.dishes.flatMap((dish, dishIndex) => {
      const hasName = dish.name.trim() !== "";
      const hasDescription = dish.description.trim() !== "";

      return !hasName && hasDescription
        ? [`${course.label} — Dish ${dishIndex + 1}`]
        : [];
    }),
  );
}

export function hasValidDish(menu) {
  return menu.courses.some((course) => getValidDishes(course).length > 0);
}

export function getTotalValidDishCount(menu) {
  return menu.courses.reduce(
    (total, course) => total + getValidDishes(course).length,
    0,
  );
}

function exceedsSoftLimit(value, latinLimit, cjkLimit) {
  const counts = Array.from(value.trim()).reduce(
    (result, character) => {
      if (chineseCharacterPattern.test(character)) {
        result.cjk += 1;
      } else {
        result.latin += 1;
      }

      return result;
    },
    { latin: 0, cjk: 0 },
  );

  return counts.latin > latinLimit || counts.cjk > cjkLimit;
}

export function getContentLengthWarnings(menu) {
  return menu.courses.flatMap((course) =>
    course.dishes.flatMap((dish, dishIndex) => {
      const dishLabel = `${course.label} — Dish ${dishIndex + 1}`;
      const warnings = [];

      if (
        exceedsSoftLimit(
          dish.name,
          DISH_TITLE_LATIN_SOFT_LIMIT,
          DISH_TITLE_CJK_SOFT_LIMIT,
        )
      ) {
        warnings.push(
          `${dishLabel}: keep the Dish Title within about 60 English or 24 Chinese characters.`,
        );
      }

      if (
        exceedsSoftLimit(
          dish.description,
          DESCRIPTION_LATIN_SOFT_LIMIT,
          DESCRIPTION_CJK_SOFT_LIMIT,
        )
      ) {
        warnings.push(
          `${dishLabel}: keep the Description within about 100 English or 45 Chinese characters.`,
        );
      }

      return warnings;
    }),
  );
}
