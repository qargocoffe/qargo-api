'use strict';

const { importProductsFromCSV } = require("./api/coffee/services/cronjob");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap() {
    try {
      // Import products from CSV on Strapi start
      await importProductsFromCSV();
      console.log('CSV import triggered on Strapi startup.');
    } catch (error) {
      console.error('Error triggering CSV import:', error);
    }
  },
};
