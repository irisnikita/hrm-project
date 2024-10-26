/**
 * auth service
 */

export default () => ({
  async validateToken() {
    try {
      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
});
