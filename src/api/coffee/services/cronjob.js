const fs = require('fs');
const csv = require('csv-parse');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const filePath = path.resolve(__dirname, '../../../../info.csv'); // Replace with your CSV file path

module.exports = {
  async importProductsFromCSV() {
    try {
      const csvData = await fs.promises.readFile(filePath, 'utf8');
      const records = await csv.parse(csvData, { columns: true });

      for await (const record of records) {
        // Check if category exists by name
        let categories = await strapi.entityService.findMany('api::subcategory.subcategory',{ 
          filters:{title: record.Category },
          populate: { coffees: true }
        });

        let category = categories[0] ? categories[0] : false;

        if (!category) {
          // Category does not exist, create it
          category = await strapi.entityService.create('api::subcategory.subcategory', {
            data: {
              title: record.Category,
              slug: record.Category.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
            }
          });
        }

        // // Download and upload image if linkPhotos is provided
        // let uploadedImage = null;
        // if (record['Photos']) {
        //   const imageUrl = record['Photos'];

        //   try {
        //     // Download image from provided URL
        //     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        //     const imageData = Buffer.from(response.data, 'binary');

        //     // Create FormData for image upload to Strapi media library
        //     const formData = new FormData();
        //     formData.append('files', imageData, {
        //       filename: record.Product.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),  // Adjust filename as needed
        //     });

        //   } catch (error) {
        //     console.error(`Error downloading/uploading image for ${record.Product}:`, error);
        //   }
        // }

        // Create the coffee (article) entry and associate with the category
        let coffee = await strapi.entityService.create('api::coffee.coffee', {
          data: {
            title: record.Product,
            nutritionalFacts: record['Nutritional'],
            description: record['Description'],
            nameForVlookup: record['Vlookup'],
            subcategory: category.id,  // Establish relationship with subcategory
          }
        });

        // Update category to connect with the newly created coffee
        await strapi.entityService.update('api::subcategory.subcategory', category.id, {
          data: {
            coffees: {
              connect: [coffee.id],
            },
          },
        });
      }

      console.log('Import successful!');
    } catch (error) {
      console.error('Error importing CSV:', error);
    }
  },
};
