// Auto-generated index file

// This file exports all content from all folders

import ai_in_app_development, { slugs as ai_in_app_development_slugs } from "./ai-in-app-development";
import android_development, { slugs as android_development_slugs } from "./android-development";
import careers_salaries, { slugs as careers_salaries_slugs } from "./careers-salaries";
import cost_pricing, { slugs as cost_pricing_slugs } from "./cost-pricing";
import cross_platform_flutter_rn, { slugs as cross_platform_flutter_rn_slugs } from "./cross-platform-flutter-rn";
import general_mobile_app_development, { slugs as general_mobile_app_development_slugs } from "./general-mobile-app-development";
import hiring_agencies_money_pages, { slugs as hiring_agencies_money_pages_slugs } from "./hiring-agencies-money-pages";
import how_to_build_an_app, { slugs as how_to_build_an_app_slugs } from "./how-to-build-an-app";
import industry_ecommerce, { slugs as industry_ecommerce_slugs } from "./industry-ecommerce";
import industry_fintech, { slugs as industry_fintech_slugs } from "./industry-fintech";
import industry_healthcare, { slugs as industry_healthcare_slugs } from "./industry-healthcare";
import ios_development, { slugs as ios_development_slugs } from "./ios-development";
import learning_courses, { slugs as learning_courses_slugs } from "./learning-courses";
import no_code_app_builders, { slugs as no_code_app_builders_slugs } from "./no-code-app-builders";
import testing_qa_maintenance, { slugs as testing_qa_maintenance_slugs } from "./testing-qa-maintenance";
import tools_frameworks_software, { slugs as tools_frameworks_software_slugs } from "./tools-frameworks-software";
import ui_ux_design, { slugs as ui_ux_design_slugs } from "./ui-ux-design";
import web_pwa_development, { slugs as web_pwa_development_slugs } from "./web-pwa-development";

// Export everything as named exports
export { default as ai_in_app_development } from "./ai-in-app-development";
export { default as android_development } from "./android-development";
export { default as careers_salaries } from "./careers-salaries";
export { default as cost_pricing } from "./cost-pricing";
export { default as cross_platform_flutter_rn } from "./cross-platform-flutter-rn";
export { default as general_mobile_app_development } from "./general-mobile-app-development";
export { default as hiring_agencies_money_pages } from "./hiring-agencies-money-pages";
export { default as how_to_build_an_app } from "./how-to-build-an-app";
export { default as industry_ecommerce } from "./industry-ecommerce";
export { default as industry_fintech } from "./industry-fintech";
export { default as industry_healthcare } from "./industry-healthcare";
export { default as ios_development } from "./ios-development";
export { default as learning_courses } from "./learning-courses";
export { default as no_code_app_builders } from "./no-code-app-builders";
export { default as testing_qa_maintenance } from "./testing-qa-maintenance";
export { default as tools_frameworks_software } from "./tools-frameworks-software";
export { default as ui_ux_design } from "./ui-ux-design";
export { default as web_pwa_development } from "./web-pwa-development";

// Also export as a single combined object
export const allData = {
  ai_in_app_development,
  android_development,
  careers_salaries,
  cost_pricing,
  cross_platform_flutter_rn,
  general_mobile_app_development,
  hiring_agencies_money_pages,
  how_to_build_an_app,
  industry_ecommerce,
  industry_fintech,
  industry_healthcare,
  ios_development,
  learning_courses,
  no_code_app_builders,
  testing_qa_maintenance,
  tools_frameworks_software,
  ui_ux_design,
  web_pwa_development,
};

// All slugs across all folders
export const allSlugs = [
  ...ai_in_app_development_slugs,
  ...android_development_slugs,
  ...careers_salaries_slugs,
  ...cost_pricing_slugs,
  ...cross_platform_flutter_rn_slugs,
  ...general_mobile_app_development_slugs,
  ...hiring_agencies_money_pages_slugs,
  ...how_to_build_an_app_slugs,
  ...industry_ecommerce_slugs,
  ...industry_fintech_slugs,
  ...industry_healthcare_slugs,
  ...ios_development_slugs,
  ...learning_courses_slugs,
  ...no_code_app_builders_slugs,
  ...testing_qa_maintenance_slugs,
  ...tools_frameworks_software_slugs,
  ...ui_ux_design_slugs,
  ...web_pwa_development_slugs,
];

export function getAllContent() {
  return [
    ...ai_in_app_development,
    ...android_development,
    ...careers_salaries,
    ...cost_pricing,
    ...cross_platform_flutter_rn,
    ...general_mobile_app_development,
    ...hiring_agencies_money_pages,
    ...how_to_build_an_app,
    ...industry_ecommerce,
    ...industry_fintech,
    ...industry_healthcare,
    ...ios_development,
    ...learning_courses,
    ...no_code_app_builders,
    ...testing_qa_maintenance,
    ...tools_frameworks_software,
    ...ui_ux_design,
    ...web_pwa_development,
  ];
}

export function getContentBySlug(slug: string) {
  return getAllContent().find((item) => item.slug === slug);
}

export function getCategoryForSlug(slug: string) {
  const categories = {
    ai_in_app_development: ai_in_app_development_slugs,
    android_development: android_development_slugs,
    careers_salaries: careers_salaries_slugs,
    cost_pricing: cost_pricing_slugs,
    cross_platform_flutter_rn: cross_platform_flutter_rn_slugs,
    general_mobile_app_development: general_mobile_app_development_slugs,
    hiring_agencies_money_pages: hiring_agencies_money_pages_slugs,
    how_to_build_an_app: how_to_build_an_app_slugs,
    industry_ecommerce: industry_ecommerce_slugs,
    industry_fintech: industry_fintech_slugs,
    industry_healthcare: industry_healthcare_slugs,
    ios_development: ios_development_slugs,
    learning_courses: learning_courses_slugs,
    no_code_app_builders: no_code_app_builders_slugs,
    testing_qa_maintenance: testing_qa_maintenance_slugs,
    tools_frameworks_software: tools_frameworks_software_slugs,
    ui_ux_design: ui_ux_design_slugs,
    web_pwa_development: web_pwa_development_slugs,
  } as const;

  for (const [category, slugs] of Object.entries(categories)) {
    if (slugs.includes(slug)) {
      return category;
    }
  }

  return "general_mobile_app_development";
}
