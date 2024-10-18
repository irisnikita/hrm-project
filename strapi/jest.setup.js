// jest.setup.js
global.strapi = {
  // Mock Strapi global object
  query: jest.fn(),
  // Add other Strapi methods/properties as needed
  service: jest.fn(),
};
